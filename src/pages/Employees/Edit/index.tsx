import { useNavigate, useParams } from "react-router-dom";
import { useGetEmployee } from "../../../services/hooks/employees/useGetEmployee";
import { LoadingSpinner } from "../../../components/common/LoadingSpinner";
import { EmployeeForm } from "../components/EmployeeForm";
import { FormLayout } from "../../../components/common/Form/FormLayout";
import { Header } from "../../../components/common/Header/Header";
import { useEffect } from "react";
import { toast } from "react-toastify";

const EditEmployee = () => {
    const { employeeId } = useParams<{ employeeId: string }>();
    const { isLoading, data, error } = useGetEmployee(employeeId ?? "");
    const fetchingWentWrong = !employeeId || error || (!isLoading && !data);
    const navigate = useNavigate();

    useEffect(() => {
        if (fetchingWentWrong) {
            toast.error("Could not fetch the employee with given ID. Please choose a valid employee");
            void navigate("/employees");
        }
    }, [navigate, fetchingWentWrong]);

    if (fetchingWentWrong) {
        return null;
    }

    if (isLoading) {
        return <LoadingSpinner />;
    }

    console.log("EXEC");

    return (
        <FormLayout>
            <Header as="h3" title={`Edit employee "${data.name} ${data?.surname}"`} />
            <EmployeeForm employeeData={data} />
        </FormLayout>
    );
};

export default EditEmployee;
