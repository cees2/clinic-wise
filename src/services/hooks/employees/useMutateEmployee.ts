import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { EmployeeFormType } from "../../../utils/projectTypes";
import { createEmployee, removeEmployee } from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useMutateEmployee = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutationCreate = useMutation({
        mutationFn: (employee: EmployeeFormType) => createEmployee(employee),
        onSuccess: async (data) => {
            toast.success("The appointment created successfully");
            await queryClient.refetchQueries({ queryKey: ["employees"] });
            await navigate(`/employees/${data.id}/edit`);
        },
        onError: () => {
            toast.error("Could not create the employee");
        },
    });

    const mutationRemove = useMutation({
        mutationFn: (employeeId: number) => removeEmployee(employeeId),
        onSuccess: async () => {
            toast.success("The appointment removed successfully");
            await queryClient.invalidateQueries({ queryKey: ["employees"] });
        },
        onError: () => {
            toast.error("Could not remove the appointment");
        },
    });

    return { mutationCreate, mutationRemove };
};
