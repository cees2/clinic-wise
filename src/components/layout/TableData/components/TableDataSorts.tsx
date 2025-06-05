import { useTableDataContext } from "../utils/TableDataContext";
import { LiaLongArrowAltDownSolid, LiaLongArrowAltUpSolid } from "react-icons/lia";
import { SortTableEnum, TableDataActionsEnum } from "../../../../utils/projectTypes";
import { LuArrowDownUp } from "react-icons/lu";

interface Props {
    columnId: string;
}

const TableDataSorts = ({ columnId }: Props) => {
    const {
        tableDataState: { selectedSort },
        dispatch,
    } = useTableDataContext();

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

    if (selectedSort && selectedSort.id === columnId) {
        if (selectedSort.isAscending) {
            return (
                <LiaLongArrowAltDownSolid
                    onClick={() => {
                        sortColumnHandler(SortTableEnum.DESCENDING);
                    }}
                />
            );
        }
        return (
            <LiaLongArrowAltUpSolid
                onClick={() => {
                    sortColumnHandler(SortTableEnum.NONE);
                }}
            />
        );
    }

    return (
        <LuArrowDownUp
            onClick={() => {
                sortColumnHandler(SortTableEnum.ASCENDING);
            }}
        />
    );
};

export default TableDataSorts;
