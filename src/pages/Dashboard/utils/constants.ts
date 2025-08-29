import { DashboardFilterId, type DashboardReducer, DashboardTimeFilter } from "./types.ts";

export const DASHBOARD_INITIAL_STATE: DashboardReducer = {
    dashboardState: {
        selectedFilters: [
            {
                id: DashboardFilterId.TIME,
                value: DashboardTimeFilter.TODAY,
            },
        ],
    },
};
