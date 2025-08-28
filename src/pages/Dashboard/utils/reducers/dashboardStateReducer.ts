import {
    type DashboardChartData,
    type DashboardFilter,
    type DashboardState,
    type DashboardStateAction,
    DashboardStateActions,
} from "../types.ts";

const dashboardStateReducer = (state: DashboardState, action: DashboardStateAction) => {
    switch (action.type) {
        case DashboardStateActions.ADD_FILTER:
            return { ...state, selectedFilters: [...state.selectedFilters, action.payload] };
        case DashboardStateActions.REMOVE_FILTER: {
            const newSelectedFilters = [...state.selectedFilters];
            const selectedFilterIndex = newSelectedFilters.findIndex(
                (selectedFilter) => selectedFilter.id === action.payload,
            );

            if (selectedFilterIndex === -1) {
                return state;
            }

            newSelectedFilters.splice(selectedFilterIndex, 1);

            return { ...state, selectedFilters: [...newSelectedFilters] };
        }
        case DashboardStateActions.UPDATE_FILTER: {
            const newSelectedFilters = [...state.selectedFilters];
            const selectedFilterIndex = newSelectedFilters.findIndex(
                (selectedFilter) => selectedFilter.id === action.payload.id,
            );

            if (selectedFilterIndex === -1) {
                return state;
            }

            newSelectedFilters.splice(selectedFilterIndex, 1);

            return { ...state, selectedFilters: [...newSelectedFilters, action.payload] };
        }
        case DashboardStateActions.SET_FILTERS:
            return { ...state, filters: action.payload };
        case DashboardStateActions.SET_DATA:
            return action.payload;
        default:
            return state;
    }
};

export default dashboardStateReducer;
