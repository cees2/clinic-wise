import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "../../api";

export const useEmployees = (size: number) => {
    const { refetch, isLoading } = useQuery({
        queryFn: () => getEmployees(size),
        queryKey: ["employees", size],
    });

    return { refetch, isLoading };
};
