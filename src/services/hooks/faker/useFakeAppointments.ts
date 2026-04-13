import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { generateFakeAppointments } from "../../api";

export const useFakeAppointments = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: generateFakeAppointments,
        onSuccess: async () => {
            toast.success("Appointments have been uploaded successfully");
            const invalidateQueries = [
                queryClient.invalidateQueries({ queryKey: ["appointments"] }),
                queryClient.invalidateQueries({ queryKey: ["dashboardData"] }),
            ];
            await Promise.all(invalidateQueries);
        },
        onError: () => {
            toast.error("Appointments could not be uploaded");
        },
    });
};
