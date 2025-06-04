import { FilterType, type FilterCondition, type TableDataFilterState } from "../../../../../utils/projectTypes";

export const getFiltersConditionsWithValue = (
    filterState: Record<string, any>,
    filterType?: FilterType,
): { filterValue: string; filterCondition: FilterCondition } => {
    const filterStateEntries = Object.entries(filterState);
    const filterConditionsWithTruthyValues = filterStateEntries.filter(([_, filterValue]) => Boolean(filterValue));

    if (filterType === FilterType.ENUM) {
        const selectedEnums = filterConditionsWithTruthyValues.map(([filterValue]) => filterValue);
        return { filterValue: selectedEnums.join(","), filterCondition: "e" };
    }

    const [selectedFilter] = filterConditionsWithTruthyValues;
    const [filterCondition, filterValue] = selectedFilter;

    return { filterValue, filterCondition };
};

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

export const getFilterDefaultValue = <T extends Record<string, any>>(
    filterId: string,
    filterConditions: (keyof T)[],
    selectedFilters: TableDataFilterState[],
): T => {
    const defaultValues = filterConditions.reduce<T>((defaultValuesObject, filterCondition) => {
        const newDefaultValuesObject: T = { ...defaultValuesObject };

        newDefaultValuesObject[filterCondition] = undefined;

        return newDefaultValuesObject;
    }, {} as T);

    const selectedFilter = getAlreadySelectedFilter(filterId, selectedFilters);

    if (!selectedFilter) {
        return defaultValues;
    }

    const { filterValue, filterCondition } = selectedFilter;

    defaultValues[filterCondition] = filterValue;

    return defaultValues;
};

export const getEnumFilterDefaultValue = (
    filterId: string,
    selectedFilters: TableDataFilterState[],
    options: Record<string, string>,
) => {
    const optionsKeys = Object.keys(options);
    const defaultValues = optionsKeys.reduce<Record<string, string>>((defaultValuesObject, optionKey) => {
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
