import { useTableDataContext } from "../utils/TableDataContext";
import { LiaLongArrowAltDownSolid, LiaLongArrowAltUpSolid } from "react-icons/lia";
import { SortTableEnum, TableDataActionsEnum } from "../../../../utils/projectTypes";
import { LuArrowDownUp } from "react-icons/lu";

interface Props {
    columnName: string;
}

const TableDataSorts = ({ columnName }: Props) => {
    const {
        tableDataState: { selectedSort },
        dispatch,
    } = useTableDataContext();

    const sortColumnHandler = (sortType: SortTableEnum) => {
        switch (sortType) {
            case SortTableEnum.ASCENDING:
                dispatch({ type: TableDataActionsEnum.SET_SORT, payload: columnName });
                break;
            case SortTableEnum.DESCENDING:
                dispatch({ type: TableDataActionsEnum.SET_SORT, payload: `-${columnName}` });
                break;
            case SortTableEnum.NONE:
            default:
                dispatch({ type: TableDataActionsEnum.SET_SORT, payload: "" });
        }
    };

    if (selectedSort.includes(columnName)) {
        if (selectedSort.includes("-")) {
            return (
                <LiaLongArrowAltDownSolid
                    onClick={() => {
                        sortColumnHandler(SortTableEnum.NONE);
                    }}
                />
            );
        }
        return (
            <LiaLongArrowAltUpSolid
                onClick={() => {
                    sortColumnHandler(SortTableEnum.DESCENDING);
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
