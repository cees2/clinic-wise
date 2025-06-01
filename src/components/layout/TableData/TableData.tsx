import { useReducer } from "react";
import type { TableDataConfig, TableDataConfigGenericExtend, TableDataState } from "../../../utils/projectTypes";
import { LoadingSpinner } from "../../common/LoadingSpinner";
import TableDataFilters from "./components/TableDataFilters";
import TableDataPagination from "./components/TableDataPagination";
import TableDataSorts from "./components/TableDataSorts";
import TableDataTable from "./components/TableDataTable";
import TableDataContextProvider from "./utils/TableDataContext";
import tableDataContextReducer from "./utils/reducer";
import { tableDataConfigInitialValue } from "./utils/constants";
import { useTableDataFetcher } from "./services/useTableDataFetcher";

const TableDataRenderer = <T extends TableDataConfigGenericExtend>({ config }: { config: TableDataConfig<T> }) => {
    const [tableDataState, dispatch] = useReducer<TableDataState>(tableDataContextReducer, tableDataConfigInitialValue);
    const { isLoading, data: resources } = useTableDataFetcher(config.resourceName, tableDataState);

    if (isLoading) return <LoadingSpinner />;

    return (
        <TableData config={config} resources={resources} tableDataState={tableDataState} dispatch={dispatch}>
            <TableData.Filters />
            <TableData.Sorts />
            <TableData.Table />
            <TableData.Pagination />
        </TableData>
    );
};

const TableData = <T extends TableDataConfigGenericExtend>({
    children,
    config,
    resources,
    tableDataState,
    dispatch,
}: {
    children: React.ReactNode;
    config: TableDataConfig<T>;
    resources: T[];
    tableDataState: TableDataState;
    dispatch: React.ActionDispatch<React.AnyActionArg>;
}) => {
    return (
        <TableDataContextProvider
            config={config}
            resources={resources}
            tableDataState={tableDataState}
            dispatch={dispatch}
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
