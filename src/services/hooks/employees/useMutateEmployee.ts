import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { EmployeeFormType, EmployeeUpdateType } from "../../../utils/projectTypes";
import { createEmployee, removeEmployee, updateEmployee } from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useMutateEmployee = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutationCreate = useMutation({
        mutationFn: (employee: EmployeeFormType) => createEmployee(employee),
        onSuccess: async (data) => {
            toast.success("The employee created successfully");
            await queryClient.invalidateQueries({ queryKey: ["employees"] });
            await navigate(`/employees/${data.id}/edit`);
        },
        onError: () => {
            toast.error("Could not create the employee");
        },
    });

    const mutationUpdate = useMutation({
        mutationFn: (employee: EmployeeUpdateType) => updateEmployee(employee),
        onSuccess: async (data) => {
            toast.success("The employee updated successfully");
            await queryClient.invalidateQueries({ queryKey: ["employeess"] });
            await navigate(`/employees/${data.id}/edit`);
        },
        onError: () => {
            toast.error("Could not create the employee");
        },
    });

    const mutationRemove = useMutation({
        mutationFn: (employeeId: number) => removeEmployee(employeeId),
        onSuccess: async () => {
            toast.success("The employee removed successfully");
            await queryClient.invalidateQueries({ queryKey: ["employees"] });
        },
        onError: () => {
            toast.error("Could not remove the employee");
        },
    });

    return { mutationCreate, mutationRemove, mutationUpdate };
};
