import { useTableDataContext } from "../utils/TableDataContext";
import { LiaLongArrowAltDownSolid, LiaLongArrowAltUpSolid } from "react-icons/lia";
import {
    SortColumnType,
    TableDataActionsEnum,
    type TableDataColumn,
    type TableDataResourceType,
} from "../../../../utils/projectTypes";
import { LuArrowDownUp } from "react-icons/lu";

const TableDataSorts = <TableDataResource extends TableDataResourceType>({
    column,
}: {
    column: TableDataColumn<TableDataResource>;
}) => {
    const {
        tableDataState: { selectedSorts },
        dispatch,
    } = useTableDataContext();
    const { id: columnId, disableSorting } = column;
    const sortingSVGClassnames =
        "cursor-pointer hover:scale-110 transition-all duration-100 w-[1.6rem] h-[1.6rem] flex-shrink-0";
    const currentColumnSorted = selectedSorts.find((sort) => sort.id === columnId);

    const sortColumnHandler = (sortType: SortColumnType) => {
        switch (sortType) {
            case SortColumnType.ASCENDING:
            case SortColumnType.DESCENDING:
                dispatch({
                    type: TableDataActionsEnum.REPLACE_OR_ADD_SORT,
                    payload: { id: columnId, sortType },
                });
                break;
            case SortColumnType.NONE:
            default:
                dispatch({ type: TableDataActionsEnum.REMOVE_SORT, payload: columnId });
        }
    };

    if (disableSorting) return null;

    if (currentColumnSorted) {
        if (currentColumnSorted.sortType === SortColumnType.ASCENDING) {
            return (
                <LiaLongArrowAltUpSolid
                    onClick={() => sortColumnHandler(SortColumnType.DESCENDING)}
                    className={sortingSVGClassnames}
                />
            );
        }
        return (
            <LiaLongArrowAltDownSolid
                onClick={() => sortColumnHandler(SortColumnType.NONE)}
                className={sortingSVGClassnames}
            />
        );
    }

    return (
        <LuArrowDownUp onClick={() => sortColumnHandler(SortColumnType.ASCENDING)} className={sortingSVGClassnames} />
    );
};

export default TableDataSorts;
