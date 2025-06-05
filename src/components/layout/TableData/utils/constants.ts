import type { TableDataState } from "../../../../utils/projectTypes";

export const tableDataConfigInitialValue: TableDataState<{id: number}> = {
    selectedFilters: [],
    selectedPage: 1,
    selectedSort: null,
    selectedPaginationSize: 20,
};
