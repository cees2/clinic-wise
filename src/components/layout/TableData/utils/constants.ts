import type { TableDataState } from "../../../../utils/projectTypes";

export const tableDataConfigInitialValue: TableDataState = {
    selectedFilters: [],
    selectedPage: 1,
    selectedSort: "",
    selectedPaginationSize: 20,
};
