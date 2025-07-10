import { Header } from "../../../components/common/Header/Header";
import { AppointmentForm } from "../components/AppointmentForm";
import { FormLayout } from "../../../components/common/Form/FormLayout";

const NewAppointment = () => {
    return (
        <FormLayout>
            <Header as="h3" title="New appointment" />
            <AppointmentForm />
        </FormLayout>
    );
};

export default NewAppointment;
