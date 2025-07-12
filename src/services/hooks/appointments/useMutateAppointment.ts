import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAppointment, removeAppointment, updateAppointment } from "../../api";
import { toast } from "react-toastify";
import type { AppointmentFormType } from "../../../utils/projectTypes";
import { useNavigate } from "react-router-dom";

export const useMutateAppointment = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutationRemove = useMutation({
        mutationFn: (appointmentId: number) => removeAppointment(appointmentId),
        onError: () => {
            toast.error("Could not remove the appointment");
        },
        onSuccess: async () => {
            toast.success("The appointment removed successfully");
            await queryClient.invalidateQueries({ queryKey: ["appointments"] });
        },
    });

    const mutationUpdate = useMutation({
        mutationFn: (appointment: AppointmentFormType) => updateAppointment(appointment),
        onSuccess: async (data) => {
            toast.success("The appointment updated successfully");
            await queryClient.invalidateQueries({ queryKey: ["appointmentss"] });
            await navigate(`/appointments/${data.id}/edit`);
        },
        onError: () => {
            toast.error("Could not create the appointment");
        },
    });

    const mutationCreate = useMutation({
        mutationFn: (appointment: AppointmentFormType) => createAppointment(appointment),
        onError: () => {
            toast.error("Could not create the appointment");
        },
        onSuccess: async (data) => {
            toast.success("The appointment created successfully");
            await queryClient.invalidateQueries({ queryKey: ["appointments"] });
            await navigate(`/appointments/${data.id}/edit`);
        },
    });

    return { mutationRemove, mutationCreate, mutationUpdate };
};
