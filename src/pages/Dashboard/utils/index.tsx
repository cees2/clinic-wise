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
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

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
                { light: "--color-violet-300", dark: "--color-violet-800", iconLight: "--color-violet-500", iconDark: "--color-violet-500" },
            ];
        case DashboardStatisticsType.CANCELLED_APPOINTMENTS:
            return [
                <VscError />,
                dashboardData.cancelledAppointments,
                { light: "--color-red-300", dark: "--color-red-700", iconDark: "--color-red-500", iconLight: "--color-red-500" },
            ];
        case DashboardStatisticsType.COMPLETED_APPOINTMENTS:
            return [
                <IoIosCheckmarkCircleOutline />,
                dashboardData.completedAppointments,
                { light: "--color-lime-500", dark: "--color-green-600", iconLight: "--color-green-500", iconDark: "--color-green-500" },
            ];
        case DashboardStatisticsType.NUMBER_OF_APPOINTMENTS:
        default:
            return [
                <IoBriefcaseOutline />,
                dashboardData.numberOfAppointments,
                { light: "--color-indigo-300", dark: "--color-indigo-800", iconLight: "--color-indigo-500", iconDark: "--color-indigo-500" },
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
