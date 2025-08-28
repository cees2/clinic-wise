import {
    type FilterCondition,
    type TableDataResourceType,
    type TableDataFilterState,
    type DateFilterCondition,
    type TextFilterCondition,
} from "../../../../../utils/projectTypes";

const getAlreadySelectedFilter = <T extends TableDataResourceType>(
    filterId: keyof T,
    selectedFilters: TableDataFilterState<T>[],
): TableDataFilterState<T> | null => {
    const selectedFilter = selectedFilters.find((selectedFilter) => selectedFilter.id === filterId);
    const filterAlreadySelected = selectedFilter === undefined;

    if (filterAlreadySelected) {
        return null;
    }

    return selectedFilter;
};

export const getEnumFilterDefaultValue = <T extends TableDataResourceType>(
    filterId: keyof T,
    selectedFilters: TableDataFilterState<T>[],
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

const getDateFilter = <T extends TableDataResourceType>(selectedFilters: TableDataFilterState<T>[], filterId: number) =>
    selectedFilters.find((filter) => filter.id === filterId);

export const getDateFilterDefaultValue = <T extends TableDataResourceType>(
    selectedFilters: TableDataFilterState<T>[],
    filterId: number,
): Date | undefined => {
    const selectedFilter = getDateFilter(selectedFilters, filterId);

    if (!selectedFilter) return selectedFilter;

    return selectedFilter.filterValue;
};

export const getDateFilterDefaultType = <T extends TableDataResourceType>(
    selectedFilters: TableDataFilterState<T>[],
    filterId: number,
): DateFilterCondition => {
    const selectedFilter = getDateFilter(selectedFilters, filterId);

    if (!selectedFilter) return "gte";

    return selectedFilter.filterCondition;
};

export const getEnumFilterInitialState = <T extends TableDataResourceType>(
    filters: TableDataFilterState<T>[],
    filterId: string,
) => {
    const selectedFilter = filters.find((filter) => filter.id === filterId);

    return selectedFilter ? selectedFilter.filterValue.split(",") : [];
};

export const getFilterDefaultValue = <T extends TableDataResourceType>(
    filters: TableDataFilterState<T>[],
    filterId: string,
) => {
    return filters.find((filter) => filter.id === filterId);
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
