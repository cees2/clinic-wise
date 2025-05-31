import type {
    TableDataConfig,
    TableDataConfigGenericExtend,
} from "../../../utils/projectTypes";
import { LoadingSpinner } from "../../common/LoadingSpinner";
import TableDataFilters from "./components/TableDataFilters";
import TableDataPagination from "./components/TableDataPagination";
import TableDataSorts from "./components/TableDataSorts";
import TableDataTable from "./components/TableDataTable";
import TableDataContextProvider from "./utils/TableDataContext";

const TableDataRenderer = <T extends TableDataConfigGenericExtend>({
    config,
}: {
    config: TableDataConfig<T>;
}) => {
    const { isLoading, data: resources } = config.getResources();

    if (isLoading) return <LoadingSpinner />;
    if (!resources) return <div>EMPTY PAGE</div>;

    return (
        <TableData config={config} resources={resources}>
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
}: {
    children: React.ReactNode;
    config: TableDataConfig<T>;
    resources: T[];
}) => {
    return (
        <TableDataContextProvider config={config} resources={resources}>
            {children}
        </TableDataContextProvider>
    );
};

TableData.Table = TableDataTable;
TableData.Pagination = TableDataPagination;
TableData.Filters = TableDataFilters;
TableData.Sorts = TableDataSorts;

export default TableDataRenderer;
