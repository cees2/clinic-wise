import { format } from "date-fns";
import { Header } from "../../components/common/Header/Header";
import TableDataRenderer from "../../components/layout/TableData/TableData";
import { TableLayout } from "../../components/layout/TableData/TableLayout";
import type { Tables } from "../../services/database.types";
import { FilterType, type HeaderButton, type TableDataConfig } from "../../utils/projectTypes";
import { SUPPORTED_NATIONALITIES } from "../../utils/constants";
import { capitalizeFirstLetter } from "../../utils/utils";
import { NationalityWithFlag } from "../../components/common/NationalityWithFlag";

const Patients = () => {
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
        ],
        actions: [
            {
                id: "remove",
                name: "Remove",
                action: () => {},
            },
            {
                id: "edit",
                name: "Edit",
                path: (item) => `/appointments/${item.id}/edit`,
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
