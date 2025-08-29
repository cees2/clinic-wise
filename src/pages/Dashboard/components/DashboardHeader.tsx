import { Header } from "../../../components/common/Header/Header.tsx";
import { getDashboardTimeFilter } from "../utils";
import type { HeaderButton } from "../../../utils/projectTypes.ts";
import { DashboardFilterId, DashboardStateActions, dashboardTimeFilterOptions } from "../utils/types.ts";
import { useDashboardContext } from "../utils/context.ts";

export const DashboardHeader = () => {
    const {
        dashboardState: { selectedFilters },
        dispatch,
    } = useDashboardContext();
    const selectedTimeFilter = getDashboardTimeFilter(selectedFilters);
    const headerButtons: HeaderButton[] = dashboardTimeFilterOptions.map((filterValue) => ({
        id: filterValue,
        title: filterValue,
        variant: selectedTimeFilter?.value === filterValue ? "primary" : "inactive",
        onClick: () =>
            dispatch({
                type: DashboardStateActions.UPDATE_FILTER,
                payload: { id: DashboardFilterId.TIME, value: filterValue },
            }),
    }));

    return <Header as="h3" title="Dashbaord" buttons={headerButtons} />;
};
