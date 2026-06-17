import type { TableDataResourceType, TableDataState } from "../../../../utils/projectTypes";

export const tableDataConfigInitialValue: TableDataState<TableDataResourceType> = {
    selectedFilters: [],
    selectedPage: 1,
    selectedSorts: [],
    selectedPaginationSize: 20,
};
