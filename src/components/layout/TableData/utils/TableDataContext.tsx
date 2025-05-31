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

const tableDataConfigInitialValue: TableDataState = {
    selectedFilters: [],
    selectedPage: 0,
    selectedSort: "",
    selectedPaginationSize: 20,
};

const TableDataContextProvider = <T extends TableDataConfigGenericExtend>({
    children,
    config,
    resources,
}: Pick<TableDataContextType<T>, "config"> & {
    children: React.ReactNode;
    resources: T[];
}) => {
    const [state, dispatch] = useReducer<TableDataState>(
        tableDataContextReducer,
        tableDataConfigInitialValue,
    );
    const memoizedContextValue = useMemo(
        () => ({
            config,
            tableDataState: state,
            dispatch,
            resources,
        }),
        [state, resources, config],
    );

    return (
        <TableDataContext value={memoizedContextValue}>
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
