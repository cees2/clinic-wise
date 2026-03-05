import { format } from "date-fns";
import { Header } from "../../components/common/Header/Header";
import TableDataRenderer from "../../components/layout/TableData/TableData";
import { ContentLayout } from "../../components/layout/ContentLayout";
import { FilterType, type HeaderButton, type TableDataConfig } from "../../utils/projectTypes";
import { SUPPORTED_NATIONALITIES_ENTRIES } from "../../utils/constants";
import { capitalizeFirstLetter } from "../../utils/utils";
import { NationalityWithFlag } from "../../components/common/NationalityWithFlag";
import { useConfirmation } from "../../utils/hooks/useConfirmation.tsx";
import { useMutatePatient } from "../../services/hooks/patients/useMutatePatient";
import type { PatientApi } from "../../services/apiTypes.ts";

const Patients = () => {
    const { confirmation } = useConfirmation();
    const { mutationRemove } = useMutatePatient();

    const config: TableDataConfig<PatientApi> = {
        columns: [
            {
                id: "name",
                name: "Name",
                render: (patient) => `${patient.user.firstname} ${patient.user.lastname}`,
            },
            {
                id: "date_of_birth",
                name: "Date of birth",
                render: (patient) => format(new Date(patient.user.date_of_birth), "dd.MM.yyyy"),
            },
            {
                id: "gender",
                name: "Gender",
                render: (patient) => capitalizeFirstLetter(patient.user.gender),
            },
            {
                id: "nationality",
                name: "Nationality",
                render: (patient) => {
                    return <NationalityWithFlag nationality={patient.user.nationality} />;
                },
            },
            {
                id: "phone_number",
                name: "Phone number",
                disableSorting: true,
                render: (patient) => patient.user.phone_number,
            },
            {
                id: "document_id",
                name: "Document ID",
                render: (patient) => patient.user.document_id,
            },
        ],
        actions: [
            {
                id: "remove",
                name: "Remove",
                action: (patient) => {
                    confirmation({
                        onConfirm: () => {
                            mutationRemove.mutate(patient.id);
                        },
                    });
                },
            },
            {
                id: "edit",
                name: "Edit",
                path: (patient) => `/patients/${patient.id}/edit`,
            },
        ],
        filters: [
            { id: "name", name: "Name", type: FilterType.TEXT },
            { id: "surname", name: "Surname", type: FilterType.TEXT },
            { id: "date_of_birth", name: "Date of birth", type: FilterType.DATE },
            {
                id: "gender",
                name: "Gender",
                type: FilterType.ENUM,
                options: [
                    { name: "Female", value: "female" },
                    { name: "Male", value: "male" },
                ],
            },
            {
                id: "nationality",
                name: "Nationality",
                type: FilterType.ENUM,
                options: SUPPORTED_NATIONALITIES_ENTRIES.map(([value, name]) => ({ name, value })),
            },
        ],
        resourceName: "patients",
    };

    const buttons: HeaderButton[] = [
        {
            title: "Add new",
            path: "/patients/new",
        },
    ];

    return (
        <ContentLayout>
            <Header as="h3" title="Patients" buttons={buttons} />
            <TableDataRenderer config={config} />
        </ContentLayout>
    );
};

export default Patients;
