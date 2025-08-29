import { type DashboardFilter, DashboardFilterId, DashboardTimeFilter } from "./types.ts";
import {
    endOfToday,
    endOfWeek,
    endOfYesterday,
    format,
    startOfToday,
    startOfWeek,
    startOfYesterday,
    sub,
} from "date-fns";
import { DB_DATE_FORMAT_WITH_TIME } from "../../../utils/constants.ts";

export const getDashboardTimeFilter = (selectedFilters: DashboardFilter[]) => {
    return selectedFilters.find((selectedFilter) => selectedFilter.id === DashboardFilterId.TIME);
};

export const getTimeFilterDates = (selectedFilters: DashboardFilter[]): null | [string, string] => {
    const timeFilter = getDashboardTimeFilter(selectedFilters);

    if (!timeFilter) return null;

    let startDate: Date | null = null;
    let endDate: Date | null = null;

    switch (timeFilter.value) {
        case DashboardTimeFilter.LAST_30_DAYS: {
            startDate = sub(startOfToday(), { days: 30 });
            endDate = endOfToday();
            break;
        }
        case DashboardTimeFilter.LAST_7_DAYS: {
            startDate = sub(startOfToday(), { days: 7 });
            endDate = endOfToday();
            break;
        }
        case DashboardTimeFilter.THIS_WEEK: {
            startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
            endDate = endOfWeek(new Date(), { weekStartsOn: 1 });
            break;
        }
        case DashboardTimeFilter.YESTERDAY: {
            startDate = startOfYesterday();
            endDate = endOfYesterday();
            break;
        }
        case DashboardTimeFilter.TODAY:
        default:
            startDate = startOfToday();
            endDate = endOfToday();
    }

    return [format(startDate, DB_DATE_FORMAT_WITH_TIME), format(endDate, DB_DATE_FORMAT_WITH_TIME)];
};
