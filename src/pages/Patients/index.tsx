import { Header } from "../../components/common/Header/Header";
import TableDataRenderer from "../../components/layout/TableData/TableData";
import { TableLayout } from "../../components/layout/TableData/TableLayout";
import type { Tables } from "../../services/database.types";
import type { TableDataConfig } from "../../utils/projectTypes";

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
            },
            {
                id: "gender",
                name: "Gender",
            },
            {
                id: "nationality",
                name: "Nationality",
            },
            {
                id: "phone_number",
                name: "Phone number",
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
