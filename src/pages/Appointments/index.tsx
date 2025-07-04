import { useNavigate } from "react-router-dom";
import { Header } from "../../components/common/Header/Header";
import TableDataRenderer from "../../components/layout/TableData/TableData";
import { TableLayout } from "../../components/layout/TableData/TableLayout";
import type { Tables } from "../../services/database.types";
import { useMutateAppointment } from "../../services/hooks/appointments/useMutateAppointment";
import { FilterType, type HeaderButton, type TableDataConfig } from "../../utils/projectTypes";
import { useConfirmation } from "../../utils/useConfirmation";
import { Status } from "../../components/common/Status";
import { format } from "date-fns";
import { UNIVERSAL_DATE_FORMAT } from "../../utils/constants";

const Appointments = () => {
    const { mutationRemove: removeAppointment } = useMutateAppointment();
    const { confirmation } = useConfirmation();
    const navigate = useNavigate();

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
                render: (item) => (
                    <Status status={item.status}>
                        {`${item.status?.charAt(0).toUpperCase() ?? ""}${item.status?.substring(1).toLowerCase() ?? ""}`}
                    </Status>
                ),
            },
            {
                id: "start_date",
                name: "Start date",
                render: (item) => format(new Date(item.start_date), UNIVERSAL_DATE_FORMAT),
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
                    SCHEDULED: "Scheduled",
                    COMPLETED: "Completed",
                    CANCELLED: "Cancelled",
                },
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
                    confirmation({
                        onConfirm: () => {
                            removeAppointment.mutate(item.id);
                        },
                    });
                },
            },
            {
                id: "edit",
                name: "Edit",
                action: (item) => {
                    void navigate(`/appointments/${item.id}/edit`);
                },
            },
        ],
    };

    const buttons: HeaderButton[] = [
        {
            title: "Add new",
            path: "/appointments/new",
        },
    ];

    return (
        <TableLayout>
            <Header as="h3" title="Appointments" buttons={buttons} />
            <TableDataRenderer config={config} />
        </TableLayout>
    );
};

export default Appointments;
