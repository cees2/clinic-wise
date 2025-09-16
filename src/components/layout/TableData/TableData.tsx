import { useReducer } from "react";
import type { TableDataProps, TableDataRendererProps, TableDataResourceType } from "../../../utils/projectTypes";
import { LoadingSpinner } from "../../common/LoadingSpinner";
import TableDataFilters from "./components/TableDataFilters.tsx";
import TableDataPagination from "./components/TableDataPagination";
import TableDataSorts from "./components/TableDataSorts";
import TableDataTable from "./components/TableDataTable";
import TableDataContextProvider from "./utils/TableDataContext";
import tableDataContextReducer from "./utils/reducer";
import { tableDataConfigInitialValue } from "./utils/constants";
import { useTableDataFetcher } from "./services/useTableDataFetcher";

const TableDataRenderer = <TableDataResource extends TableDataResourceType>({
    config,
}: TableDataRendererProps<TableDataResource>) => {
    const [tableDataState, dispatch] = useReducer(tableDataContextReducer, tableDataConfigInitialValue);
    const { isLoading, data: resources, count } = useTableDataFetcher(config, tableDataState);

    if (isLoading) return <LoadingSpinner />;

    return (
        <TableData<TableDataResource>
            config={config}
            resources={resources}
            tableDataState={tableDataState}
            dispatch={dispatch}
            itemsCount={count}
        >
            <TableData.Filters />
            <TableData.Table />
            <TableData.Pagination />
        </TableData>
    );
};

export const TableData = <TableDataResource extends TableDataResourceType>({
    children,
    config,
    resources,
    tableDataState,
    dispatch,
    itemsCount,
}: TableDataProps<TableDataResource>) => {
    return (
        <TableDataContextProvider
            config={config}
            resources={resources}
            tableDataState={tableDataState}
            dispatch={dispatch}
            itemsCount={itemsCount}
        >
            {children}
        </TableDataContextProvider>
    );
};

TableData.Table = TableDataTable;
TableData.Pagination = TableDataPagination;
TableData.Filters = TableDataFilters;
TableData.Sorts = TableDataSorts;

export default TableDataRenderer;
