import { useParams } from "react-router-dom";
import { Header } from "../../../components/common/Header/Header";
import { AppointmentForm } from "../components/AppointmentForm";
import { FormLayout } from "../../../components/common/Form/FormLayout";

const EditAppointment = () => {
    const { appointmentId } = useParams<{ appointmentId: string }>();

    return (
        <FormLayout>
            <Header as="h3" title="Edit appointment" />
            <AppointmentForm />
        </FormLayout>
    );
};

export default EditAppointment;
