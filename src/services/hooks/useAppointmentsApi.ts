import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../api";

export const useAppointmentsApi = () => {
  const appointmentsRequestSetup = useQuery({
    queryFn: getAppointments,
    queryKey: ["appointments"],
  });

  return appointmentsRequestSetup;
};
