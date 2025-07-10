import { FormLayout } from "../../../components/common/Form/FormLayout";
import { Header } from "../../../components/common/Header/Header";
import { EmployeeForm } from "../components/EmployeeForm";

const NewEmployee = () => {
    return (
        <FormLayout>
            <Header title="New employee" as="h3" />
            <EmployeeForm />
        </FormLayout>
    );
};

export default NewEmployee;
