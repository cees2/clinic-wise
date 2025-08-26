import NumberFilter from "../../../../common/Filters/NumberFilter.tsx";
import { useTableDataContext } from "../../utils/TableDataContext.tsx";
import {
    FilterType,
    type FilterState,
    TableDataActionsEnum,
    type NumberFilterConditionType,
} from "../../../../../utils/projectTypes.ts";

interface Props {
    filterId: string;
}

export const TableDataNumberFilter = ({ filterId }: Props) => {
    const { dispatch } = useTableDataContext();

    const hideDropdownHandler = (numberFilterState?: FilterState<number, NumberFilterConditionType>) => {
        if (!numberFilterState) {
            dispatch({ type: TableDataActionsEnum.REMOVE_FILTER, payload: filterId });
            return;
        }

        const { filterValue, filterCondition } = numberFilterState;

        const selectedFilter = { id: filterId, filterValue, filterCondition };

        dispatch({ type: TableDataActionsEnum.REPLACE_FILTER, payload: selectedFilter, filterType: FilterType.NUMBER });
    };

    return <NumberFilter filterId={filterId} onHideDropdown={hideDropdownHandler} decimalScale={0} />;
};
