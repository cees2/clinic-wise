import type { DashboardReducer } from "../types.ts";
import dashboardStateReducer from "./dashboardStateReducer.ts";
import dashboardDataReducer from "./dashboardDataReducer.ts";

export const dashboardReducer = (dashboardState: DashboardReducer, action:) => ({
    data: dashboardDataReducer(dashboardState.data, action),
    state: dashboardStateReducer(dashboardState.state, action),
});
