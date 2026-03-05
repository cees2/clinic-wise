import { createContext, use, useMemo } from "react";
import type { TableDataResourceType, TableDataContextType, Children } from "../../../../utils/projectTypes";

const TableDataContext = createContext<TableDataContextType<TableDataResourceType>>({
    config: { columns: [], resourceName: "appointments" },
    tableDataState: {
        selectedSort: null,
        selectedFilters: [],
        selectedPage: 1,
        selectedPaginationSize: 10,
    },
    dispatch: () => {},
    resources: [],
});

const TableDataContextProvider = <TableDataResource extends TableDataResourceType>({
    children,
    config,
    resources,
    tableDataState,
    dispatch,
    size,
}: TableDataContextType<TableDataResource> & Children) => {
    const memoizedContextValue = useMemo<TableDataContextType<TableDataResource>>(
        () => ({
            config,
            tableDataState,
            dispatch,
            resources,
            size,
        }),
        [tableDataState, resources, config, dispatch, size],
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
