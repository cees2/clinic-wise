import { useQuery } from "@tanstack/react-query";
import type { TableDataState } from "../../../../utils/projectTypes";
import { supabase } from "../../../../services/services";
import type { Database } from "../../../../services/database.types";

export const useTableDataFetcher = (
    resourceName: keyof Database["public"]["Tables"],
    tableDataState: TableDataState,
) => {
    const { selectedPage, selectedPaginationSize, selectedFilters, selectedSort } = tableDataState;

    const resourceRequestSetup = useQuery({
        queryFn: () => getResource(resourceName, tableDataState),
        queryKey: [resourceName, selectedFilters, selectedSort, selectedPage, selectedPaginationSize],
    });

    return resourceRequestSetup;
};

export const getResource = async (resourceName: keyof Database["public"]["Tables"], tableDataState: TableDataState) => {
    const { selectedPage, selectedPaginationSize } = tableDataState;
    const rangeStart = (selectedPage - 1) * selectedPaginationSize;
    const rangeEnd = selectedPage * selectedPaginationSize - 1;
    const query = supabase.from(resourceName).select("*").range(rangeStart, rangeEnd);

    const { data, error } = await query;

    if (error) {
        throw new Error(error.message);
    }

    return data;
};
