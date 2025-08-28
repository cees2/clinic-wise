export interface DashboardReducer {
    data: DashboardData;
    state: DashboardState;
}

export interface DashboardData {
    general: DashboardStateGeneral;
    appointments: DashboardChartData[];
}

export interface DashboardStateGeneral {
    numberOfPatients: number;
    numberOfAppointments: number;
    workedHours: number;
    averageNumberOfPatients: number;
}

export interface DashboardChartData {
    count: number;
    date: string;
}

export enum DashboardDataActions {
    SET_DATA,
    SET_GENERAL_DATA,
    SET_APPOINTMENTS_DATA,
}

export type DashboardDataAction =
    | { type: DashboardDataActions.SET_DATA; payload: DashboardData }
    | { type: DashboardDataActions.SET_GENERAL_DATA; payload: DashboardStateGeneral }
    | { type: DashboardDataActions.SET_APPOINTMENTS_DATA; payload: DashboardChartData[] };

export interface DashboardState {
    selectedFilters: DashboardFilter[];
}

export interface DashboardFilter {
    id: string;
    value: string;
}

export enum DashboardStateActions {
    SET_DATA,
    ADD_FILTER,
    REMOVE_FILTER,
    UPDATE_FILTER,
    SET_FILTERS,
}

export type DashboardDataAction =
    | { type: DashboardDataActions.SET_DATA; payload: DashboardData }
    | { type: DashboardDataActions.SET_GENERAL_DATA; payload: DashboardStateGeneral }
    | { type: DashboardDataActions.SET_APPOINTMENTS_DATA; payload: DashboardChartData[] };

export type DashboardStateAction =
    | { type: DashboardStateActions.SET_DATA; payload: DashboardState }
    | { type: DashboardStateActions.ADD_FILTER; payload: DashboardFilter }
    | { type: DashboardStateActions.REMOVE_FILTER; payload: string }
    | { type: DashboardStateActions.UPDATE_FILTER; payload: DashboardFilter }
    | { type: DashboardStateActions.SET_FILTERS; payload: DashboardFilter[] };
