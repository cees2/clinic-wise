import { useQuery } from "@tanstack/react-query";
import { getPatients } from "../../api";

export const usePatients = (size: number) => {
    const { isLoading, refetch } = useQuery({
        queryFn: () => getPatients(size),
        queryKey: ["patients", size],
        enabled: false,
    });

    return { isLoading, refetch };
};
