import { useState } from "react";
import { Header } from "../../components/common/Header/Header";
import { Modal } from "../../components/common/Modal/Modal";
import TableDataRenderer from "../../components/layout/TableData/TableData";
import { TableLayout } from "../../components/layout/TableData/TableLayout";
import type { Tables } from "../../services/database.types";
import { useRemoveAppointment } from "../../services/hooks/appointments/useRemoveAppointment";
import { FilterType, type TableDataConfig } from "../../utils/projectTypes";
import { Button } from "../../components/layout/Button";

const Appointments = () => {
    const [showModal, setShowModal] = useState(true);
    const { mutate: removeAppointment } = useRemoveAppointment();

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
                    removeAppointment(item.id);
                },
            },
        ],
    };

    return (
        <TableLayout>
            <Modal
                showModal={showModal}
                closeable
                onHide={() => {
                    console.log("EXEC");
                    setShowModal(false);
                }}
            >
                <Modal.Header>
                    <Modal.Title>Potwierdzenie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur fugit magni perferendis
                    perspiciatis minima illum reiciendis quod hic ipsa earum ratione fugiat sequi, vero et harum
                    accusantium quisquam iusto pariatur. Veniam provident alias, deserunt saepe minima vitae tempore nam
                    soluta omnis perferendis esse nihil obcaecati odit minus facilis, expedita quod quasi non quos ab ex
                    at. Magnam natus sunt vel. Repellat ipsum aut, eveniet omnis soluta esse unde delectus, ad
                    laudantium incidunt alias debitis praesentium explicabo odio consequuntur cum molestiae deserunt
                    cupiditate suscipit dolorum necessitatibus! Aspernatur ut deleniti tempora molestiae. Cumque omnis
                    sint quisquam quasi tempore aliquid? Molestiae in vitae libero, exercitationem alias hic dolorum
                    veritatis repudiandae ad placeat vel veniam eum itaque praesentium deserunt ipsa perferendis
                    reprehenderit amet magnam? Officiis omnis dolore obcaecati repellat recusandae ad. Quae, maiores
                    tempora aperiam aliquid repudiandae, esse exercitationem animi nulla asperiores doloremque earum
                    praesentium voluptatibus reprehenderit non dicta officiis vel, recusandae odio quo?
                </Modal.Body>
                <Modal.Footer>
                    <Button>dd</Button>
                </Modal.Footer>
            </Modal>
            <Header as="h3" title="Appointments" />
            <TableDataRenderer config={config} />
        </TableLayout>
    );
};

export default Appointments;
