import { type DashboardDataAction, type DashboardData, DashboardDataActions } from "../types.ts";

const dashboardDataReducer = (data: DashboardData, action: DashboardDataAction) => {
    switch (action.type) {
        case DashboardDataActions.SET_APPOINTMENTS_DATA:
            return { ...data, appointments: action.payload };
        case DashboardDataActions.SET_GENERAL_DATA:
            return { ...data, general: action.payload };
        case DashboardDataActions.SET_DATA:
            return action.payload;
        default:
            return data;
    }
};

export default dashboardDataReducer;
