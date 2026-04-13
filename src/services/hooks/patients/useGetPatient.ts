import { useQuery } from "@tanstack/react-query";
import { getPatient } from "../../api";

export const useGetPatient = (patientId: string) => {
    return useQuery({
        queryFn: () => getPatient(patientId),
        queryKey: ["patient", patientId],
    });
};
