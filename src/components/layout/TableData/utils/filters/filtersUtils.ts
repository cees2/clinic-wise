import {
    type FilterCondition,
    type TableDataFilterState,
    type DateFilterCondition,
    type TextFilterCondition,
    FilterType,
    type TableDataEnumFilterState,
    type TableDataNumberFilterState,
    type TableDataTextFilterState,
} from "../../../../../utils/projectTypes";

export const dateFilterTypesArray: DateFilterCondition[] = ["gte", "lte"];

export const getDateFilterOptionName = (dateFilterType: DateFilterCondition) => {
    switch (dateFilterType) {
        case "lte":
            return "To";
        case "gte":
        default:
            return "From";
    }
};

const getDateFilter = (selectedFilters: TableDataFilterState[], filterId: string) =>
    selectedFilters.find((filter) => filter.id === filterId);

export const getDateFilterDefaultValue = (selectedFilters: TableDataFilterState[], filterId: string) => {
    const selectedFilter = getDateFilter(selectedFilters, filterId);

    if (!selectedFilter) return selectedFilter;

    return new Date(selectedFilter.filterValue);
};

export const getDateFilterDefaultType = (
    selectedFilters: TableDataFilterState[],
    filterId: string,
): DateFilterCondition => {
    const selectedFilter = getDateFilter(selectedFilters, filterId);

    const { filterCondition } = selectedFilter ?? {};

    return filterCondition === "gte" || filterCondition === "lte" ? filterCondition : "gte";
};

export const getEnumFilterInitialState = (filters: TableDataFilterState[], filterId: string) => {
    const enumFilters = filters.filter(
        (filter): filter is { id: string } & TableDataEnumFilterState => filter.filterType === FilterType.ENUM,
    );

    const selectedFilter = enumFilters.find((filter) => filter.id === filterId);

    return selectedFilter ? selectedFilter.filterValue.split(",") : [];
};

export const getNumberFilterInitialState = (filters: TableDataFilterState[], filterId: string) => {
    const numberFilters = filters.filter(
        (filter): filter is { id: string } & TableDataNumberFilterState => filter.filterType === FilterType.NUMBER,
    );

    const selectedFilter = numberFilters.find((filter) => filter.id === filterId);

    if (!selectedFilter) return selectedFilter;

    const { filterValue, filterCondition } = selectedFilter;

    return { filterValue, filterCondition };
};

export const getTextFilterInitialState = (filters: TableDataFilterState[], filterId: string) => {
    const textFilters = filters.filter(
        (filter): filter is { id: string } & TableDataTextFilterState => filter.filterType === FilterType.TEXT,
    );

    const selectedFilter = textFilters.find((filter) => filter.id === filterId);

    if (!selectedFilter) return selectedFilter;

    const { filterValue, filterCondition } = selectedFilter;

    return { filterValue, filterCondition };
};

export const getNumberFilterConditionLabel = (filterCondition: Exclude<FilterCondition, "c">) => {
    switch (filterCondition) {
        case "e":
            return "Equals";
        case "ne":
            return "Does not equal";
        case "gt":
            return "Greater than";
        case "gte":
            return "Greater than or equal to";
        case "lt":
            return "Less than";
        case "lte":
            return "Less than or equal to";
        default:
            return "";
    }
};
export const getTextFilterConditionLabel = (condition: TextFilterCondition) => {
    switch (condition) {
        case "e":
            return "Equals";
        case "c":
            return "Contains";
        default:
            return null;
    }
};
