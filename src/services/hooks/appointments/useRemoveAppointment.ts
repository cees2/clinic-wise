import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeAppointment } from "../../api";
import { toast } from "react-toastify";

export const useRemoveAppointment = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (appointmentId: number) => removeAppointment(appointmentId),
        onError: () => {
            toast.error("Could not remove the appointment");
        },
        onSuccess: async () => {
            toast.success("The appointment removed successfully");
            await queryClient.invalidateQueries({ queryKey: ["appointments"] });
        },
    });

    return mutation;
};
