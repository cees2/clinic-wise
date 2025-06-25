import { useQuery } from "@tanstack/react-query";
import { getAppointment } from "../../api";

export const useGetAppointment = (appointmentId: string) => {
    const query = useQuery({
        queryFn: () => getAppointment(appointmentId),
        queryKey: ["appointment", appointmentId],
    });

    return query;
};
