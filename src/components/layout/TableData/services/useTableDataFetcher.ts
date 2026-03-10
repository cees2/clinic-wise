import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import {
    type TableDataConfig,
    type TableDataResourceType,
    type TableDataState,
} from "../../../../utils/projectTypes";
import { getResourceListData } from "../../../../services/api.ts";
import type { ListResponseApi } from "../../../../services/apiTypes.ts";

export const useTableDataFetcher = <TableDataResource extends TableDataResourceType>(
    config: TableDataConfig<TableDataResource>,
    tableDataState: TableDataState<TableDataResource>,
): UseQueryResult<ListResponseApi<TableDataResource>> => {
    const { resourceName } = config;
    const { selectedPage, selectedPaginationSize, selectedFilters, selectedSort } = tableDataState;

    return useQuery({
        queryFn: () => getResourceListData<TableDataResource>(resourceName),
        queryKey: [resourceName, selectedFilters, selectedSort, selectedPage, selectedPaginationSize],
    });
};