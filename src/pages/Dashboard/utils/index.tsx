import {
    type DashboardChartData,
    type DashboardFilter,
    DashboardFilterId,
    type DashboardRemoteData,
    DashboardStatisticsType,
    DashboardTimeFilter,
} from "./types.ts";
import {
    add,
    compareAsc,
    endOfWeek,
    format,
    intervalToDuration,
    startOfToday,
    startOfTomorrow,
    startOfWeek,
    startOfYesterday,
    sub,
} from "date-fns";
import { DB_DATE_FORMAT_WITH_TIME, DISPLAY_DATE_FORMAT } from "../../../utils/constants.ts";
import { IoBriefcaseOutline, IoTimeOutline } from "react-icons/io5";
import { VscError } from "react-icons/vsc";
import { BsCheck2Circle } from "react-icons/bs";

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
            return [<IoTimeOutline />, getWorkedTime(dashboardData.workedMinutes), "--color-violet-300"];
        case DashboardStatisticsType.CANCELLED_APPOINTMENTS:
            return [<VscError />, dashboardData.cancelledAppointments, "--color-red-300"];
        case DashboardStatisticsType.COMPLETED_APPOINTMENTS:
            return [<BsCheck2Circle />, dashboardData.completedAppointments, "--color-green-400"];
        case DashboardStatisticsType.NUMBER_OF_APPOINTMENTS:
        default:
            return [<IoBriefcaseOutline />, dashboardData.numberOfAppointments, "--color-indigo-300"];
    }
};

const getTimeFilterDaysArray = (filterValue: string) => {
    switch (filterValue) {
        case DashboardTimeFilter.LAST_30_DAYS:
            return Array.from({ length: 30 }, (_, i) => sub(startOfToday(), { days: i })).reverse();
        case DashboardTimeFilter.THIS_WEEK:
            return Array.from({ length: 7 }, (_, i) => add(startOfWeek(new Date(), { weekStartsOn: 1 }), { days: i }));
        case DashboardTimeFilter.LAST_7_DAYS:
            return Array.from({ length: 7 }, (_, i) => sub(startOfToday(), { days: i })).reverse();
        case DashboardTimeFilter.YESTERDAY:
            return [startOfYesterday()];
        case DashboardTimeFilter.TODAY:
        default:
            return [startOfToday()];
    }
};

const getAppointmentsChartData = (selectedFilters: DashboardFilter[], appointmentsChartData?: DashboardChartData[]) => {
    const timeFilter = getDashboardTimeFilter(selectedFilters);

    if (!timeFilter || !appointmentsChartData) return [];

    const { value } = timeFilter;

    const datesArrayForGivenTimeFilter = getTimeFilterDaysArray(value);
    return datesArrayForGivenTimeFilter.map((stringDate) => {
        const dateObject = new Date(stringDate);
        const matchingDateWithChartData = appointmentsChartData.find((chartDataItem) => {
            const chartDateObject = new Date(chartDataItem.label);
            return compareAsc(dateObject, chartDateObject) === 0;
        });

        if (!matchingDateWithChartData) return { count: 0, label: format(stringDate, DISPLAY_DATE_FORMAT) };

        return {
            count: matchingDateWithChartData.count,
            date: format(new Date(matchingDateWithChartData.label), DISPLAY_DATE_FORMAT),
        };
    });
};

const getAppointmentsChartDatasets = (
    selectedFilters: DashboardFilter[],
    appointmentsChartData?: DashboardChartData[],
) => {
    if (selectedFilters.length === 0 || !appointmentsChartData) return [];

    return [
        {
            data: getAppointmentsChartData(selectedFilters, appointmentsChartData),
            parsing: { yAxisKey: "count", xAxisKey: "date" },
            backgroundColor: "#16a34a",
        },
    ];
};

const getAppointmentsChartLabels = (selectedFilters: DashboardFilter[]) => {
    const timeFilter = getDashboardTimeFilter(selectedFilters);

    if (!timeFilter) return [];

    return getTimeFilterDaysArray(timeFilter.value).map((date) => format(new Date(date), DISPLAY_DATE_FORMAT));
};

export const getAppointmentsChartDataset = (
    selectedFilters: DashboardFilter[],
    appointmentsChartData?: DashboardChartData[],
) => {
    return {
        labels: getAppointmentsChartLabels(selectedFilters),
        datasets: getAppointmentsChartDatasets(selectedFilters, appointmentsChartData),
    };
};
