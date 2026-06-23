import { Header } from "../../../components/common/Header/Header.tsx";
import { getDashboardTimeFilter, parseDashboardDateFilterToLayoutValue } from "../utils";
import type { HeaderButton } from "../../../utils/projectTypes.ts";
import { DashboardFilterId, DashboardStateActions, dashboardTimeFilterOptions } from "../utils/types.ts";
import { useDashboardContext } from "../utils/context.ts";
import { format } from "date-fns";

export const DashboardHeader = () => {
    const {
        dashboardState: { selectedFilters },
        dispatch,
    } = useDashboardContext();
    const selectedTimeFilter = getDashboardTimeFilter(selectedFilters);
    const headerButtons: HeaderButton[] = dashboardTimeFilterOptions.map((filterValue) => ({
        id: filterValue,
        title: parseDashboardDateFilterToLayoutValue(filterValue),
        variant: selectedTimeFilter?.value === filterValue ? "primary" : "inactive",
        onClick: () =>
            dispatch({
                type: DashboardStateActions.UPDATE_FILTER,
                payload: { id: DashboardFilterId.TIME, value: filterValue },
            }),
    }));
    const formattedTodayDate = format(new Date(), "eeee, dd MMMM R")

    return <Header as="h3" title="Dashbaord" buttons={headerButtons} subtitle={formattedTodayDate} />;
};
