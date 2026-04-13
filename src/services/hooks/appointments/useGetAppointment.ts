import { useQuery } from "@tanstack/react-query";
import { getAppointment } from "../../api";

export const useGetAppointment = (appointmentId: string) => {
    return useQuery({
        queryFn: () => getAppointment(appointmentId),
        queryKey: ["appointment", appointmentId],
    });
};
