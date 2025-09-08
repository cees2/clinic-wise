import { useTableDataContext } from "../utils/TableDataContext";
import { LiaLongArrowAltDownSolid, LiaLongArrowAltUpSolid } from "react-icons/lia";
import { SortTableEnum, TableDataActionsEnum, type TableDataColumn } from "../../../../utils/projectTypes";
import { LuArrowDownUp } from "react-icons/lu";

const TableDataSorts = <T extends Record<string, any>>({ column }: { column: TableDataColumn<T> }) => {
    const {
        tableDataState: { selectedSort },
        dispatch,
    } = useTableDataContext();
    const { id: columnId, disableSorting } = column;
    const sortingSVGClassnames = "cursor-pointer hover:scale-110 transition-all duration-100";

    const sortColumnHandler = (sortType: SortTableEnum) => {
        switch (sortType) {
            case SortTableEnum.ASCENDING:
                dispatch({ type: TableDataActionsEnum.SET_SORT, payload: { id: columnId, isAscending: true } });
                break;
            case SortTableEnum.DESCENDING:
                dispatch({ type: TableDataActionsEnum.SET_SORT, payload: { id: columnId, isAscending: false } });
                break;
            case SortTableEnum.NONE:
            default:
                // TODO here and in the above code change type. For now I can pass "" as a payload and there is no TS error
                dispatch({ type: TableDataActionsEnum.SET_SORT, payload: null });
        }
    };

    if (disableSorting) return null;

    if (selectedSort && selectedSort.id === columnId) {
        if (selectedSort.isAscending) {
            return (
                <LiaLongArrowAltDownSolid
                    onClick={() => {
                        sortColumnHandler(SortTableEnum.DESCENDING);
                    }}
                    className={sortingSVGClassnames}
                />
            );
        }
        return (
            <LiaLongArrowAltUpSolid
                onClick={() => {
                    sortColumnHandler(SortTableEnum.NONE);
                }}
                className={sortingSVGClassnames}
            />
        );
    }

    return (
        <LuArrowDownUp
            onClick={() => {
                sortColumnHandler(SortTableEnum.ASCENDING);
            }}
            className={sortingSVGClassnames}
        />
    );
};

export default TableDataSorts;
