import { add, differenceInDays, format, isToday, isTomorrow, startOfDay, startOfToday } from "date-fns";
import { RoomDateFilters, RoomsFilterIds, type RoomsFilter } from "../../../utils/projectTypes";
import { DB_DATE_FORMAT_WITH_TIME } from "../../../utils/constants";

export const getDateValueFromPredefinedTimeFilters = (timeFilter: RoomDateFilters, customDate?: Date) => {
    let date: Date | null = null;

    switch(timeFilter){
        case RoomDateFilters.CUSTOM: {
            if(!customDate){
                date = startOfToday();
            } else {
                date = startOfDay(customDate);
            }

            break;
        }
        case RoomDateFilters.TOMORROW: {
            date = startOfDay(add(new Date, {days: 1}));
            break;
        }
        case RoomDateFilters.TODAY:
        default: {
            date = startOfToday();
            break;
        }
    }

    return format(date, DB_DATE_FORMAT_WITH_TIME);
}

export const updateRoomsFilters = (filters: RoomsFilter[], newFilter: RoomsFilter)  => {
    const newFilters = [...filters]
    const indexOfFilterWithGivenId = filters.findIndex(filter => filter.id === newFilter.id);

    if(indexOfFilterWithGivenId !== -1){
        newFilters.splice(indexOfFilterWithGivenId, 1);
    }

    newFilters.push(newFilter)

    return  newFilters;
}

export const getDayOffsetStringDate = (dayOffset: number) => {
    const todayStart = startOfToday();
    const startOfOffsetDay = add(todayStart, {days: dayOffset});

    return format(startOfOffsetDay, DB_DATE_FORMAT_WITH_TIME)
}

export const getDaysOffsetFromADate = (dateFilter: string) => {
return differenceInDays(new Date(dateFilter), startOfToday())
}

export const getDateFilterFromRoomsFilters = (filters: RoomsFilter[]) => {
    return filters.find(filter => filter.id === RoomsFilterIds.DATE)
}

export const getIsPredefinedTimeFilterSelected = (filters: RoomsFilter[], timeFilter: RoomDateFilters) => {
    const dateFilter = filters.find(filter => filter.id === RoomsFilterIds.DATE)

    if(!dateFilter) return false;

    const {value} = dateFilter;
    const filterValueAsDate = new Date(value)
    
    switch(timeFilter){
        case RoomDateFilters.TOMORROW:{
            return isTomorrow(filterValueAsDate)
        }
        case RoomDateFilters.TODAY: {
            return isToday(filterValueAsDate)
        }
        case RoomDateFilters.CUSTOM:
        default: {
            return false
        }
    }
}