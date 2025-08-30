import {
    type DashboardFilter,
    DashboardFilterId,
    type DashboardRemoteData,
    DashboardStatisticsType,
    DashboardTimeFilter,
} from "./types.ts";
import {
    add,
    endOfWeek,
    format,
    intervalToDuration,
    minutesToHours,
    startOfToday,
    startOfTomorrow,
    startOfWeek,
    startOfYesterday,
    sub,
} from "date-fns";
import { DB_DATE_FORMAT_WITH_TIME } from "../../../utils/constants.ts";
import { IoBriefcaseOutline } from "react-icons/io5";
import { CiTimer } from "react-icons/ci";
import { VscError } from "react-icons/vsc";
import { BsCheck2Circle } from "react-icons/bs";
import { JSX } from "react";

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
            endDate = startOfTomorrow();
            break;
        }
        case DashboardTimeFilter.LAST_7_DAYS: {
            startDate = sub(startOfToday(), { days: 7 });
            endDate = startOfTomorrow();
            break;
        }
        case DashboardTimeFilter.THIS_WEEK: {
            startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
            endDate = add(endOfWeek(new Date(), { weekStartsOn: 1 }), { days: 1 });
            break;
        }
        case DashboardTimeFilter.YESTERDAY: {
            startDate = startOfYesterday();
            endDate = startOfToday();
            break;
        }
        case DashboardTimeFilter.TODAY:
        default:
            startDate = startOfToday();
            endDate = startOfTomorrow();
    }

    return [format(startDate, DB_DATE_FORMAT_WITH_TIME), format(endDate, DB_DATE_FORMAT_WITH_TIME)];
};

const getWorkedTime = (workedMinutes: number | undefined | null) => {
    if (!workedMinutes) return "";

    const { hours, minutes } = intervalToDuration({ start: 0, end: workedMinutes * 60 * 1000 });

    return `${hours}h ${minutes}min`;
};

export const getStatisticsBoxData = (
    name: DashboardStatisticsType,
    dashboardData?: DashboardRemoteData,
): [JSX.Element, number | string | null | undefined, string] | null => {
    if (!dashboardData || !name) return null;

    switch (name) {
        case DashboardStatisticsType.WORKED_MINUTES:
            return [<CiTimer />, getWorkedTime(dashboardData.workedMinutes), "--color-violet-300"];
        case DashboardStatisticsType.CANCELLED_APPOINTMENTS:
            return [<VscError />, dashboardData.cancelledAppointments, "--color-red-300"];
        case DashboardStatisticsType.COMPLETED_APPOINTMENTS:
            return [<BsCheck2Circle />, dashboardData.completedAppointments, "--color-green-400"];
        case DashboardStatisticsType.NUMBER_OF_APPOINTMENTS:
        default:
            return [<IoBriefcaseOutline />, dashboardData.numberOfAppointments, "--color-indigo-300"];
    }
};
