import { FormLayout } from "../../../components/common/Form/FormLayout";
import { Header } from "../../../components/common/Header/Header";
import { PatientForm } from "../components/PatientsForm";

const NewPatient = () => {
    return (
        <FormLayout>
            <Header title="New patient" as="h3" />
            <PatientForm />
        </FormLayout>
    );
};

export default NewPatient;
