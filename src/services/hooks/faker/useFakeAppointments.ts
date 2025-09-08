import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { uploadFakeAppointments } from "../../api";

export const useFakeAppointments = () => {
    const queryClient = useQueryClient();

    const mutationConfig = useMutation({
        mutationFn: (appointments: Tables<"appointments">[]) => uploadFakeAppointments(appointments),
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

    return mutationConfig;
};
