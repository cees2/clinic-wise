import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateFakePatients } from "../../api";
import { toast } from "react-toastify";

export const useFakePatients = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: generateFakePatients,
        onError: () => toast.error("Could not upload patients"),
        onSuccess: async () => {
            toast.success("Patients have been successfully uploaded");
            await queryClient.invalidateQueries({ queryKey: ["patients"] });
        },
    });
};
