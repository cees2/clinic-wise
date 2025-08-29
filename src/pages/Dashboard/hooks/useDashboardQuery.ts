import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../../../services/api.ts";
import type { DashboardState } from "../utils/types.ts";

export const useDashboardQuery = (dashboardState: DashboardState) => {
    const query = useQuery({
        queryFn: () => getDashboardData(dashboardState),
        queryKey: ["dashboardData", dashboardState],
    });

    return query;
};
