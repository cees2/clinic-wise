import type { Tables } from "../../../services/database.types.ts";

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
    | { type: DashboardStateActions.REMOVE_FILTER; payload: string }
    | { type: DashboardStateActions.UPDATE_FILTER; payload: DashboardFilter }
    | { type: DashboardStateActions.SET_FILTERS; payload: DashboardFilter[] };

export enum DashboardTimeFilter {
    TODAY = "Today",
    YESTERDAY = "Yesterday",
    THIS_WEEK = "This week",
    LAST_7_DAYS = "Last 7 days",
    LAST_30_DAYS = "Last 30 days",
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

export type DashboardNextAppointment = Pick<Tables<"appointments">, "start_date" | "duration" | "status" | "id">;

export interface DashboardRemoteData {
    numberOfAppointments: number | null;
    workedMinutes: number | null | undefined;
    completedAppointments: number | null;
    cancelledAppointments: number | null;
    appointmentsChartData: DashboardChartData[];
    nextAppointments: DashboardNextAppointment[];
}

export interface StatisticsBoxColorConfig {
    dark: string;
    light: string;
}
