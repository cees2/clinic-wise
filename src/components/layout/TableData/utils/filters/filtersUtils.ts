import {
    FilterType,
    type FilterCondition,
    type TableDataResourceType,
    type TableDataFilterState,
    type DateFilterType,
} from "../../../../../utils/projectTypes";

export const getFiltersConditionsWithValue = (
    filterState: Record<string, any>,
    filterType: FilterType,
): { filterValue: string; filterCondition: FilterCondition } | null => {
    const filterStateEntries = Object.entries(filterState);
    const filterConditionsWithTruthyValues = filterStateEntries.filter(([_, filterValue]) => Boolean(filterValue));

    if (filterConditionsWithTruthyValues.length === 0) return null;

    if (filterType === FilterType.ENUM) {
        const selectedEnums = filterConditionsWithTruthyValues.map(([filterValue]) => filterValue);
        return { filterValue: selectedEnums.join(","), filterCondition: "e" };
    }

    const [selectedFilter] = filterConditionsWithTruthyValues;
    const [filterCondition, filterValue] = selectedFilter;

    return { filterValue, filterCondition };
};

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

export const getFilterDefaultValue = <T extends TableDataResourceType>(
    filterId: keyof T,
    filterConditions: FilterCondition[],
    selectedFilters: TableDataFilterState<T>[],
) => {
    const defaultValues = filterConditions.reduce<Partial<Record<FilterCondition, string | undefined>>>(
        (defaultValuesObject, filterCondition) => {
            const newDefaultValuesObject = { ...defaultValuesObject };

            newDefaultValuesObject[filterCondition] = undefined;

            return newDefaultValuesObject;
        },
        {},
    );

    const selectedFilter = getAlreadySelectedFilter(filterId, selectedFilters);

    if (!selectedFilter) {
        return defaultValues;
    }

    const { filterValue, filterCondition } = selectedFilter;

    defaultValues[filterCondition] = filterValue;

    return defaultValues;
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

export const dateFilterTypesArray: DateFilterType[] = ["gte", "lte"];

export const getDateFilterOptionName = (dateFilterType: DateFilterType) => {
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
): DateFilterType => {
    const selectedFilter = getDateFilter(selectedFilters, filterId);

    if (!selectedFilter) return "gte";

    return selectedFilter.filterCondition;
};
