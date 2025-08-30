import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../../../services/api.ts";
import { useDashboardContext } from "../utils/context.ts";

export const useDashboardQuery = () => {
    const { dashboardState } = useDashboardContext();

    const query = useQuery({
        queryFn: () => getDashboardData(dashboardState),
        queryKey: ["dashboardData", dashboardState],
        staleTime: 1000 * 60 * 3,
    });

    return query;
};
