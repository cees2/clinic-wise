import type { TableDataFilterState, TableDataResourceType, TableDataState } from "../utils/projectTypes.ts";
import { FILTER_CONDITION_VALUE_SEPARATOR, FILTER_VALUE_SEPARATOR } from "../utils/constants.ts";

export const parseApiData = <T>(data: { data: T }): T => data.data;

export const createTableDataParams = <TableDataResource extends TableDataResourceType>(
    tableDataState: TableDataState<TableDataResource>,
) => {
    const { selectedFilters, selectedPage, selectedPaginationSize } = tableDataState;

    return { page: selectedPage - 1, size: selectedPaginationSize, ...parseSelectedFilters(selectedFilters) };
};

const parseSelectedFilters = (selectedFilters: TableDataFilterState[]) => {
    return selectedFilters.reduce<Record<string, string>>((filterParams, selectedFilter) => {
        const { filterValue, id, filterCondition } = selectedFilter;
        const parsedFilterValue = Array.isArray(filterValue) ? filterValue.join(FILTER_VALUE_SEPARATOR) : filterValue;

        filterParams[id] = `${filterCondition}${FILTER_CONDITION_VALUE_SEPARATOR}${parsedFilterValue}`;
        return filterParams;
    }, {});
};
