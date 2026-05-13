import { FilterType, type TableDataFilterState } from "../../utils/projectTypes.ts";
import { dateFilterMapper } from "./dateFilterMapper.ts";

export const filterMapper = (filters: TableDataFilterState[]) => {
    return filters.reduce((filterStringValue, currentFilter) => {
        const { filterType } = currentFilter;

        switch (filterType) {
            case FilterType.DATE:
                return dateFilterMapper(currentFilter);
            case FilterType.ENUM:
            case FilterType.TEXT:
            case FilterType.NUMBER:
            default:
                return filterStringValue;
        }
    }, "");
};
