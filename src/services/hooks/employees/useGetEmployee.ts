import { useQuery } from "@tanstack/react-query";
import { getEmployee } from "../../api";

export const useGetEmployee = (employeeId: string) => {
    const query = useQuery({
        queryFn: () => getEmployee(employeeId),
        queryKey: ["employee", employeeId],
    });

    return query;
};
