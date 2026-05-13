import {
    type DashboardFilter,
    DashboardFilterId,
    type DashboardRemoteData,
    DashboardStatisticsType,
    DashboardTimeFilter,
    type StatisticsBoxColorConfig,
} from "./types.ts";
import { intervalToDuration } from "date-fns";
import { IoBriefcaseOutline, IoTimeOutline } from "react-icons/io5";
import { VscError } from "react-icons/vsc";
import { BsCheck2Circle } from "react-icons/bs";

export const getDashboardTimeFilter = (selectedFilters: DashboardFilter[]) => {
    return selectedFilters.find((selectedFilter) => selectedFilter.id === DashboardFilterId.TIME);
};

const getWorkedTime = (workedMinutes: number | undefined | null) => {
    if (!workedMinutes) return "";

    const { hours, minutes } = intervalToDuration({ start: 0, end: workedMinutes * 60 * 1000 });

    return `${hours ? `${hours}h` : ""} ${minutes ? `${minutes}min` : ""}`;
};

export const getStatisticsBoxData = (
    name: DashboardStatisticsType,
    dashboardData?: DashboardRemoteData,
): [React.ReactNode, number | string | null | undefined, StatisticsBoxColorConfig] | null => {
    if (!dashboardData || !name) return null;

    switch (name) {
        case DashboardStatisticsType.WORKED_MINUTES:
            return [
                <IoTimeOutline />,
                getWorkedTime(dashboardData.workedMinutes),
                { light: "--color-violet-300", dark: "--color-violet-800" },
            ];
        case DashboardStatisticsType.CANCELLED_APPOINTMENTS:
            return [
                <VscError />,
                dashboardData.cancelledAppointments,
                { light: "--color-red-300", dark: "--color-red-700" },
            ];
        case DashboardStatisticsType.COMPLETED_APPOINTMENTS:
            return [
                <BsCheck2Circle />,
                dashboardData.completedAppointments,
                { light: "--color-green-400", dark: "--color-green-600" },
            ];
        case DashboardStatisticsType.NUMBER_OF_APPOINTMENTS:
        default:
            return [
                <IoBriefcaseOutline />,
                dashboardData.numberOfAppointments,
                { light: "--color-indigo-300", dark: "--color-indigo-800" },
            ];
    }
};

export const parseDashboardDateFilterToLayoutValue = (filterValue: DashboardTimeFilter) => {
    switch (filterValue) {
        case DashboardTimeFilter.LAST_30_DAYS:
            return "Last 30 days";
        case DashboardTimeFilter.LAST_7_DAYS:
            return "Last 7 days";
        case DashboardTimeFilter.THIS_WEEK:
            return "This week";
        case DashboardTimeFilter.YESTERDAY:
            return "Yesterday";
        case DashboardTimeFilter.TODAY:
            return "Today";
    }
};
