import { format } from "date-fns";
import { Header } from "../../components/common/Header/Header";
import TableDataRenderer from "../../components/layout/TableData/TableData";
import { TableLayout } from "../../components/layout/TableData/TableLayout";
import type { Tables } from "../../services/database.types";
import type { TableDataConfig } from "../../utils/projectTypes";
import { UNIVERSAL_DATE_FORMAT } from "../../utils/constants";
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
                render: (patient) => format(new Date(patient.date_of_birth), UNIVERSAL_DATE_FORMAT),
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
        resourceName: "patients",
    };

    return (
        <TableLayout>
            <Header as="h3" title="Patients" />
            <TableDataRenderer config={config} />
        </TableLayout>
    );
};

export default Patients;
