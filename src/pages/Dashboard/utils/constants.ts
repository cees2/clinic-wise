import type { DashboardReducer } from "./types.ts";

export const DASHBOARD_INITIAL_STATE: DashboardReducer = {
    data: {
        general: {
            numberOfPatients: 0,
            numberOfAppointments: 0,
            workedHours: 0,
            averageNumberOfPatients: 0,
        },
        appointments: [],
    },
    state: {
        selectedFilters: [],
    },
};
