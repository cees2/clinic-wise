import {
    type FilterCondition,
    type TableDataFilterState,
    type DateFilterCondition,
    type TextFilterCondition,
    FilterType,
    type TableDataEnumFilterState,
} from "../../../../../utils/projectTypes";

const getAlreadySelectedFilter = (
    filterId: string,
    selectedFilters: TableDataFilterState[],
): TableDataFilterState | null => {
    const selectedFilter = selectedFilters.find((selectedFilter) => selectedFilter.id === filterId);
    const filterAlreadySelected = selectedFilter === undefined;

    if (filterAlreadySelected) {
        return null;
    }

    return selectedFilter;
};

export const getEnumFilterDefaultValue = (
    filterId: string,
    selectedFilters: TableDataFilterState[],
    options: Record<string, string>,
) => {
    const optionsKeys = Object.keys(options);
    const defaultValues = optionsKeys.reduce<Record<string, boolean>>((defaultValuesObject, optionKey) => {
        const newDefaultValuesObject = { ...defaultValuesObject };

        newDefaultValuesObject[optionKey] = false;

        return newDefaultValuesObject;
    }, {});

    const selectedFilter = getAlreadySelectedFilter(filterId, selectedFilters);

    if (!selectedFilter) {
        return defaultValues;
    }

    const { filterValue } = selectedFilter;
    const selectedValuesArray = filterValue.split(",");

    selectedValuesArray.forEach((selectedValue) => {
        defaultValues[selectedValue] = true;
    });

    return defaultValues;
};

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
    const selectedFilter = filters.find((filter) => filter.id === filterId && filter.filterType === FilterType.ENUM);

    return selectedFilter ? selectedFilter.filterValue.split(",") : [];
};

export const getFilterDefaultValue = (filters: TableDataFilterState[], filterId: string) => {
    const selectedFilter = filters.find((filter) => filter.id === filterId);

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
