import { createContext, use, useMemo } from "react";
import type { TableDataResourceType, TableDataContextType, Children } from "../../../../utils/projectTypes";

const TableDataContext = createContext<TableDataContextType<TableDataResourceType>>({
    config: { columns: [], resourceName: "appointments" },
    tableDataState: {
        selectedSorts: [],
        selectedFilters: [],
        selectedPage: 1,
        selectedPaginationSize: 10,
        search: ""
    },
    dispatch: () => {},
    resources: [],
    hasMore: false
});

const TableDataContextProvider = <TableDataResource extends TableDataResourceType>({
    children,
    config,
    resources,
    tableDataState,
    dispatch,
    hasMore,
}: TableDataContextType<TableDataResource> & Children) => {
    const memoizedContextValue = useMemo<TableDataContextType<TableDataResource>>(
        () => ({
            config,
            tableDataState,
            dispatch,
            resources,
            hasMore,
        }),
        [tableDataState, resources, config, dispatch, hasMore],
    );

    return (
        <TableDataContext value={memoizedContextValue as TableDataContextType<TableDataResourceType>}>
            {children}
        </TableDataContext>
    );
};

export const useTableDataContext = () => {
    const context = use(TableDataContext);

    if (!context) throw new Error("TableDataContext used outside its scope");

    return context;
};

export default TableDataContextProvider;
