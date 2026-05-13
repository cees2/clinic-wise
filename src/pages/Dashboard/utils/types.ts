import type { AppointmentApi } from "../../../services/apiTypes.ts";

export interface DashboardReducer {
    dashboardState: DashboardState;
}

export interface DashboardChartData {
    count: number;
    label: string;
}

export interface DashboardState {
    selectedFilters: DashboardFilter[];
}

export enum DashboardFilterId {
    TIME,
}

export interface DashboardFilter {
    id: DashboardFilterId;
    value: string;
}

export enum DashboardStateActions {
    SET_DATA,
    ADD_FILTER,
    REMOVE_FILTER,
    UPDATE_FILTER,
    SET_FILTERS,
}

export type DashboardStateAction =
    | { type: DashboardStateActions.SET_DATA; payload: DashboardState }
    | { type: DashboardStateActions.ADD_FILTER; payload: DashboardFilter }
    | { type: DashboardStateActions.REMOVE_FILTER; payload: DashboardFilterId }
    | { type: DashboardStateActions.UPDATE_FILTER; payload: DashboardFilter }
    | { type: DashboardStateActions.SET_FILTERS; payload: DashboardFilter[] };

export enum DashboardTimeFilter {
    TODAY = "TODAY",
    YESTERDAY = "YESTERDAY",
    THIS_WEEK = "THIS_WEEK",
    LAST_7_DAYS = "LAST_7_DAYS",
    LAST_30_DAYS = "LAST_30_DAYS",
}

export const dashboardTimeFilterOptions = Object.values(DashboardTimeFilter);

export interface DashboardContextType extends DashboardReducer {
    dispatch: React.Dispatch<DashboardStateAction>;
}

export enum DashboardStatisticsType {
    NUMBER_OF_APPOINTMENTS = "Number of appointments",
    WORKED_MINUTES = "Work Time",
    COMPLETED_APPOINTMENTS = "Completed appointments",
    CANCELLED_APPOINTMENTS = "Cancelled appointments",
}

export const dashboardStatisticsOptions = Object.values(DashboardStatisticsType);

export interface DashboardRemoteData {
    numberOfAppointments: number | null;
    workedMinutes: number | null | undefined;
    completedAppointments: number | null;
    cancelledAppointments: number | null;
    chartData: DashboardChartData[];
    nextFiveAppointments: AppointmentApi[];
}

export interface StatisticsBoxColorConfig {
    dark: string;
    light: string;
}
