import { add, differenceInDays, format, startOfToday } from "date-fns";
import { RoomsFilterIds, RoomsTimeFilterOptionsArray, type RoomsFilter } from "../../../utils/projectTypes";
import { DB_DATE_FORMAT_WITH_TIME } from "../../../utils/constants";

export const updateRoomsFilters = (filters: RoomsFilter[], newFilter: RoomsFilterIds) => {
    const newFilters = [...filters]
    const isNewFilterATimeFilter = RoomsTimeFilterOptionsArray.includes(newFilter)

    if(isNewFilterATimeFilter){
        RoomsTimeFilterOptionsArray.forEach((timeFilter) => {
            const timeFilterIndex = newFilters.findIndex(filter => filter.id === timeFilter);
            const timeFilterAlreadySelected = timeFilterIndex !== -1

            if(timeFilterAlreadySelected){
                newFilters.splice(timeFilterIndex, 1);
            }
        })

        const newFilterObject = {id: newFilter}
        // if(newFilter === RoomsFilterIds.CUSTOM){
        //     newFilterObject.value
        // }

        newFilters.push(newFilterObject)
    }   

    return newFilters;
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