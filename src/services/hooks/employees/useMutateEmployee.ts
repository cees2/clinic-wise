import { useMutation } from "@tanstack/react-query";
import type { EmployeeFormType, EmployeeUpdateType } from "../../../utils/projectTypes";
import { createEmployee, removeEmployee, updateEmployee } from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useMutateEmployee = () => {
    const navigate = useNavigate();

    const mutationCreate = useMutation({
        mutationFn: (employee: EmployeeFormType) => createEmployee(employee),
        onSuccess: async ({ uploadedEmployeeData }) => {
            toast.success("The employee created successfully");
            await navigate(`/employees/${uploadedEmployeeData.id}/edit`);
        },
        onError: () => {
            toast.error("Could not create the employee");
        },
    });

    const mutationUpdate = useMutation({
        mutationFn: (employee: EmployeeUpdateType) => updateEmployee(employee),
        onSuccess: async (data) => {
            toast.success("The employee updated successfully");
            await navigate(`/employees/${data.id}/edit`);
        },
        onError: () => {
            toast.error("Could not create the employee");
        },
    });

    const mutationRemove = useMutation({
        mutationFn: (employeeId: number) => removeEmployee(employeeId),
        onSuccess: () => {
            toast.success("The employee removed successfully");
        },
        onError: () => {
            toast.error("Could not remove the employee");
        },
    });

    return { mutationCreate, mutationRemove, mutationUpdate };
};
