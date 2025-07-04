import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { uploadFakeEmployees } from "../../api";
import type { EmployeeFormType } from "../../../utils/projectTypes";

export const useFakeEmployees = () => {
    const mutationConfig = useMutation({
        mutationFn: (employees: EmployeeFormType[]) => uploadFakeEmployees(employees),
        onSuccess: () => {
            toast.success("Clients have been successfully uploaded");
        },
        onError: () => {
            toast.error("Could not upload employees");
        },
    });

    return mutationConfig;
};
