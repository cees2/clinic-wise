import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { uploadFakeEmployees } from "../../api";

export const useFakeEmployees = () => {
    const mutationConfig = useMutation({
        mutationFn: () => uploadFakeEmployees(),
        onSuccess: () => {
            toast.success("Employees have been successfully uploaded");
        },
        onError: () => {
            toast.error("Could not upload employees");
        },
    });

    return mutationConfig;
};
