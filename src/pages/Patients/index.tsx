import { format } from "date-fns";
import { Header } from "../../components/common/Header/Header";
import TableDataRenderer from "../../components/layout/TableData/TableData";
import { ContentLayout } from "../../components/layout/ContentLayout";
import type { Tables } from "../../services/database.types";
import { FilterType, type HeaderButton, type TableDataConfig } from "../../utils/projectTypes";
import { SUPPORTED_NATIONALITIES, SUPPORTED_NATIONALITIES_ENTRIES } from "../../utils/constants";
import { capitalizeFirstLetter } from "../../utils/utils";
import { NationalityWithFlag } from "../../components/common/NationalityWithFlag";
import { useConfirmation } from "../../utils/hooks/useConfirmation.tsx";
import { useMutatePatient } from "../../services/hooks/patients/useMutatePatient";

const Patients = () => {
    const { confirmation } = useConfirmation();
    const { mutationRemove } = useMutatePatient();

    const config: TableDataConfig<Tables<"patients">> = {
        columns: [
            {
                id: "name",
                name: "Name",
                customInclude: "name,surname",
                render: (patient) => `${patient.name} ${patient.surname}`,
            },
            {
                id: "date_of_birth",
                name: "Date of birth",
                render: (patient) => format(new Date(patient.date_of_birth), "dd.MM.yyyy"),
            },
            {
                id: "gender",
                name: "Gender",
                render: (patient) => capitalizeFirstLetter(patient.gender),
            },
            {
                id: "nationality",
                name: "Nationality",
                render: (patient) => {
                    return <NationalityWithFlag nationality={patient.nationality} />;
                },
            },
            {
                id: "phone_number",
                name: "Phone number",
            },
            {
                id: "document_id",
                name: "Document ID",
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
            {
                id: "name",
                name: "Name",
                type: FilterType.TEXT,
            },
            {
                id: "date_of_birth",
                name: "Date of birth",
                type: FilterType.DATE,
            },
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
