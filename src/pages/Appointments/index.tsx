import { Header } from "../../components/common/Header/Header";
import TableDataRenderer from "../../components/layout/TableData/TableData";
import { TableLayout } from "../../components/layout/TableData/TableLayout";
import type { Tables } from "../../services/database.types";
import { FilterType, type TableDataConfig } from "../../utils/projectTypes";

const Appointments = () => {
    const config: TableDataConfig<Tables<"appointments">> = {
        columns: [
            {
                id: "duration",
                name: "Duration",
                render: (item) => `${item.duration} min.`,
            },
            {
                id: "status",
                name: "Status",
                render: (item) => `${item.status?.charAt(0).toUpperCase() ?? ""}${item.status?.substring(1) ?? ""}`,
            },
            {
                id: "start_date",
                name: "Start date",
            },
            {
                id: "number_of_patients",
                name: "Number of patients",
            },
            {
                id: "additional_note",
                name: "Additional note",
            },
            {
                id: "patient_id",
                name: "Patient",
                foreignTableColumnsName: ["name", "surname"],
                render: (item) => `${item.patient_id.name} ${item.patient_id.surname}`,
            },
            {
                id: "employee_id",
                name: "Employee",
                foreignTableColumnsName: ["name", "surname"],
                render: (item) => `${item.employee_id.name} ${item.employee_id.surname}`,
            },
        ],
        resourceName: "appointments",
        filters: [
            {
                id: "duration",
                name: "Duration",
                type: FilterType.NUMBER,
            },
            {
                id: "status",
                name: "Status",
                type: FilterType.ENUM,
                options: {
                    confirmed: "Confirmed",
                    unconfirmed: "Unconfirmed",
                },
            },
            {
                id: "number_of_patients",
                name: "Number of patients",
                type: FilterType.NUMBER,
            },
            {
                id: "additional_note",
                name: "Additional note",
                type: FilterType.TEXT,
            },
        ],
        actions: [
            {
                id: "remove",
                name: "Remove",
                action: (item) => {
                    console.log(item.number_of_patients);
                },
            },
        ],
    };

    return (
        <TableLayout>
            <Header as="h3" title="Appointments" />
            <TableDataRenderer config={config} />
        </TableLayout>
    );
};

export default Appointments;
