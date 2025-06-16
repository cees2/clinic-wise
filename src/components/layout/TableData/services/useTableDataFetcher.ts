import { useQuery } from "@tanstack/react-query";
import {
    FilterType,
    type TableDataColumn,
    type TableDataConfig,
    type TableDataResourceType,
    type TableDataState,
} from "../../../../utils/projectTypes";
import { supabase } from "../../../../services/services";

export const useTableDataFetcher = <T extends TableDataResourceType>(
    config: TableDataConfig<T>,
    tableDataState: TableDataState<T>,
) => {
    const { resourceName } = config;
    const { selectedPage, selectedPaginationSize, selectedFilters, selectedSort } = tableDataState;

    const resourceRequestSetup = useQuery({
        queryFn: () => getResource(config, tableDataState),
        queryKey: [resourceName, selectedFilters, selectedSort, selectedPage, selectedPaginationSize],
    });
    const { data, count } = resourceRequestSetup.data ?? {};

    return { ...resourceRequestSetup, data, count };
};

const getSelectString = (columns: TableDataColumn<T>[]): string => {
    let select = "*";

    columns.forEach((column) => {
        if (!column.foreignTableColumnsName) return;

        const foreignColumns = column.foreignTableColumnsName.join(",");
        select += `, ${column.id} (${foreignColumns})`;
    });

    return select;
};

export const getResource = async <T extends TableDataResourceType>(
    config: TableDataConfig<T>,
    tableDataState: TableDataState<T>,
) => {
    const { resourceName, columns } = config;
    const { selectedPage, selectedPaginationSize, selectedFilters, selectedSort } = tableDataState;
    const rangeStart = (selectedPage - 1) * selectedPaginationSize;
    const rangeEnd = selectedPage * selectedPaginationSize - 1;
    const selectString = getSelectString(columns);
    let query = supabase.from(resourceName).select(selectString, { count: "estimated" });

    selectedFilters.forEach((selectedFilter) => {
        const { id: filterId, filterValue, filterType, filterCondition } = selectedFilter;

        if (filterType === FilterType.ENUM) {
            const values = filterValue.split(",");
            query = query.in(filterId, values);

            return;
        }

        switch (filterCondition) {
            case "e":
                query = query.eq(filterId, filterValue);
                break;
            case "c":
                query = query.textSearch(filterId, filterValue);
                break;
            case "ne":
                query = query.neq(filterId, filterValue);
                break;
            case "gt":
            case "gte":
            case "lte":
            case "lt":
                query = query[filterCondition](filterId, filterValue);
                break;
        }
    });

    if (selectedSort) {
        const { isAscending, id } = selectedSort;
        query = query.order(id, { ascending: isAscending });
    }

    query = query.range(rangeStart, rangeEnd);

    const { data, error, count } = await query;

    if (error) {
        throw new Error(error.message);
    }

    return { data, count };
};
