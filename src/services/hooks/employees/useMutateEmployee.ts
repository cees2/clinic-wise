import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEmployee, removeEmployee, updateEmployee } from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import type { EmployeeFormType } from "../../apiTypes.ts";

export const useMutateEmployee = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const mutationCreate = useMutation({
        mutationFn: (employee: EmployeeFormType) => createEmployee(employee),
        onSuccess: async (employee) => {
            toast.success("The employee created successfully");
            await navigate(`/employees/${employee.id}/edit`);
        },
        onError: () => {
            toast.error("Could not create the employee");
        },
    });

    const mutationUpdate = useMutation({
        mutationFn: (employee: EmployeeFormType) => updateEmployee(employee),
        onSuccess: () => {
            toast.success("The employee updated successfully");
        },
        onError: () => {
            toast.error("Could not update the employee");
        },
    });

    const mutationRemove = useMutation({
        mutationFn: ({ employeeId }: { employeeId: number }) => removeEmployee(employeeId),
        onSuccess: () => {
            toast.success("The employee removed successfully");
            void queryClient.invalidateQueries({ queryKey: ["employees"] });
        },
        onError: () => {
            toast.error("Could not remove the employee");
        },
    });

    return { mutationCreate, mutationRemove, mutationUpdate };
};
