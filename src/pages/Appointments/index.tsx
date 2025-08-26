import { Link } from "react-router-dom";
import { Header } from "../../components/common/Header/Header";
import TableDataRenderer from "../../components/layout/TableData/TableData";
import { ContentLayout } from "../../components/layout/ContentLayout";
import type { Tables } from "../../services/database.types";
import { useMutateAppointment } from "../../services/hooks/appointments/useMutateAppointment";
import { FilterType, type HeaderButton, type TableDataConfig } from "../../utils/projectTypes";
import { useConfirmation } from "../../utils/useConfirmation";
import { Status } from "../../components/common/Status";
import { format } from "date-fns";
import { DISPLAY_DATE_FORMAT_MINUTES } from "../../utils/constants";
import { capitalizeFirstLetter } from "../../utils/utils";

const Appointments = () => {
    const { mutationRemove: removeAppointment } = useMutateAppointment();
    const { confirmation } = useConfirmation();

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
                render: (item) => <Status status={item.status}>{capitalizeFirstLetter(item.status)}</Status>,
            },
            {
                id: "start_date",
                name: "Start date",
                render: (item) => format(new Date(item.start_date), DISPLAY_DATE_FORMAT_MINUTES),
            },
            {
                id: "additional_note",
                name: "Additional note",
            },
            {
                id: "patient_id",
                name: "Patient",
                foreignTableColumnsName: ["name", "surname", "id"],
                render: (item) => (
                    <Link to={`/patients/${item.patient_id.id}/edit`} className="text-green-600 font-bold">
                        {`${item.patient_id.name} ${item.patient_id.surname}`}
                    </Link>
                ),
            },
            {
                id: "employee_id",
                name: "Employee",
                foreignTableColumnsName: ["name", "surname", "id"],
                render: (item) => (
                    <Link
                        to={`/employees/${item.employee_id.id}/edit`}
                        className="text-green-600 font-bold"
                    >{`${item.employee_id.name} ${item.employee_id.surname}`}</Link>
                ),
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
                options: [
                    { value: "SCHEDULED", name: "Scheduled" },
                    { value: "COMPLETED", name: "Completed" },
                    { value: "CANCELLED", name: "Cancelled" },
                ],
            },
            {
                id: "additional_note",
                name: "Additional note",
                type: FilterType.TEXT,
            },
            {
                id: "start_date",
                name: "Start date",
                type: FilterType.DATE,
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
                path: (item) => `/appointments/${item.id}/edit`,
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
        <ContentLayout>
            <Header as="h3" title="Appointments" buttons={buttons} />
            <TableDataRenderer config={config} />
        </ContentLayout>
    );
};

export default Appointments;
