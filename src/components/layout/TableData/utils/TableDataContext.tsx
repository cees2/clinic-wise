import React, { createContext, use, useMemo, useReducer } from "react";
import type {
    TableDataConfigGenericExtend,
    TableDataContextType,
    TableDataState,
} from "../../../../utils/projectTypes";
import tableDataContextReducer from "./reducer";

const TableDataContext = createContext<TableDataContextType<T>>({
    config: {},
    tableDataState: {},
    dispatch: () => {},
    resources: [],
});

const TableDataContextProvider = <T extends TableDataConfigGenericExtend>({
    children,
    config,
    resources,
    tableDataState,
    dispatch,
    itemsCount,
}: Pick<TableDataContextType<T>, "config"> & {
    children: React.ReactNode;
    resources: T[];
    tableDataState: TableDataState;
    dispatch: React.ActionDispatch<React.AnyActionArg>;
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
