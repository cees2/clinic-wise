import { type ActionDispatch, createContext, type ReactNode, use, useMemo } from "react";
import type {
    TableDataResourceType,
    TableDataContextType,
    TableDataState,
    TableDataActionsType,
} from "../../../../utils/projectTypes";

const TableDataContext = createContext<TableDataContextType<Record<string, any> & { id: number }>>({
    config: { columns: [], resourceName: "appointments" },
    tableDataState: {
        selectedSort: { id: "1", isAscending: true },
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
    itemsCount,
}: Pick<TableDataContextType<TableDataResource>, "config"> & {
    children: ReactNode;
    resources: TableDataResource[];
    tableDataState: TableDataState<TableDataResource>;
    dispatch: ActionDispatch<[action: TableDataActionsType<TableDataResource>]>;
    itemsCount?: number | null;
}) => {
    const memoizedContextValue = useMemo(
        () => ({
            config,
            tableDataState,
            dispatch,
            resources,
            itemsCount,
        }),
        [tableDataState, resources, config, dispatch, itemsCount],
    );

    return <TableDataContext value={memoizedContextValue}>{children}</TableDataContext>;
};

export const useTableDataContext = () => {
    const context = use(TableDataContext);

    if (!context) throw new Error("TableDataContext used outside its scope");

    return context;
};

export default TableDataContextProvider;
