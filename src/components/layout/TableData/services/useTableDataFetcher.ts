import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import {
    FilterType,
    type TableDataColumn,
    type TableDataConfig,
    type TableDataResourceType,
    type TableDataState,
} from "../../../../utils/projectTypes";
import { supabase } from "../../../../services/services";

export const useTableDataFetcher = <TableDataResource extends TableDataResourceType>(
    config: TableDataConfig<TableDataResource>,
    tableDataState: TableDataState<TableDataResource>,
): UseQueryResult<{ resources: TableDataResource[]; count?: number | null }> => {
    const { resourceName } = config;
    const { selectedPage, selectedPaginationSize, selectedFilters, selectedSort } = tableDataState;

    return useQuery({
        queryFn: () => getResource(config, tableDataState),
        queryKey: [resourceName, selectedFilters, selectedSort, selectedPage, selectedPaginationSize],
    });
};

const getSelectString = <TableDataResource extends TableDataResourceType>(
    columns: TableDataColumn<TableDataResource>[],
): string => {
    let select = "id";

    columns.forEach((column) => {
        const separator = select === "" ? "" : ",";

        if (column.foreignTableColumnsName) {
            const foreignColumns = column.foreignTableColumnsName.join(",");
            select += `${separator}${column.id}(${foreignColumns})`;
        } else if (column.customInclude) {
            select += `${separator}${column.customInclude}`;
        } else {
            select += `${separator}${column.id}`;
        }
    });

    return select;
};

export const getResource = async <TableDataResource extends TableDataResourceType>(
    config: TableDataConfig<TableDataResource>,
    tableDataState: TableDataState<TableDataResource>,
): Promise<{ resources: TableDataResource[]; count: number | null }> => {
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

    const { data, error, count } = await query.returns<TableDataResource[]>();

    if (error) {
        throw new Error(error.message);
    }

    return { resources: data ?? [], count };
};
