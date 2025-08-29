import type { DashboardReducer, DashboardStateAction } from "../types.ts";
import dashboardStateReducer from "./dashboardStateReducer.ts";

export const dashboardReducer = (state: DashboardReducer, action: DashboardStateAction) => ({
    dashboardState: dashboardStateReducer(state.dashboardState, action),
});
