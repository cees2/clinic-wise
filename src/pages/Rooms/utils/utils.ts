import { RoomsFilterIds, RoomsTimeFilterOptionsArray, type RoomsFilter } from "../../../utils/projectTypes";

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