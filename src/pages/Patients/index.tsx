import { format } from "date-fns";
import { Header } from "../../components/common/Header/Header";
import TableDataRenderer from "../../components/layout/TableData/TableData";
import { TableLayout } from "../../components/layout/TableData/TableLayout";
import type { Tables } from "../../services/database.types";
import { FilterType, type HeaderButton, type TableDataConfig } from "../../utils/projectTypes";
import { SUPPORTED_NATIONALITIES } from "../../utils/constants";
import { capitalizeFirstLetter } from "../../utils/utils";
import { NationalityWithFlag } from "../../components/common/NationalityWithFlag";
import { useConfirmation } from "../../utils/useConfirmation";
import { useMutatePatient } from "../../services/hooks/patients/useMutatePatient";

const Patients = () => {
    const { confirmation } = useConfirmation();
    const { mutationRemove } = useMutatePatient();

    const config: TableDataConfig<Tables<"patients">> = {
        columns: [
            {
                id: "name",
                name: "Name",
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
                options: {
                    female: "Female",
                    male: "Male",
                },
            },
            {
                id: "nationality",
                name: "Nationality",
                type: FilterType.ENUM,
                options: SUPPORTED_NATIONALITIES,
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
        <TableLayout>
            <Header as="h3" title="Patients" buttons={buttons} />
            <TableDataRenderer config={config} />
        </TableLayout>
    );
};

export default Patients;
