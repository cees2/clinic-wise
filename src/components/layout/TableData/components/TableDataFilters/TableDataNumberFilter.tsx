import NumberFilter from "../../../../common/Filters/NumberFilter.tsx";
import { useTableDataContext } from "../../utils/TableDataContext.tsx";
import {
    FilterType,
    type FilterState,
    TableDataActionsEnum,
    type NumberFilterConditionType,
    type TableDataFilterState,
} from "../../../../../utils/projectTypes.ts";
import { getNumberFilterInitialState } from "../../utils/filters/filtersUtils.ts";

interface Props {
    filterId: string;
}

export const TableDataNumberFilter = ({ filterId }: Props) => {
    const {
        dispatch,
        tableDataState: { selectedFilters },
    } = useTableDataContext();

    const hideDropdownHandler = (numberFilterState: FilterState<number | undefined, NumberFilterConditionType>) => {
        if (!numberFilterState.filterValue) {
            dispatch({ type: TableDataActionsEnum.REMOVE_FILTER, payload: filterId });
            return;
        }

        const { filterValue, filterCondition } = numberFilterState;
        const selectedFilter: TableDataFilterState = {
            id: filterId,
            filterValue,
            filterCondition,
            filterType: FilterType.NUMBER,
        };

        dispatch({ type: TableDataActionsEnum.REPLACE_FILTER, payload: selectedFilter });
    };

    return (
        <NumberFilter
            filterId={filterId}
            onHideDropdown={hideDropdownHandler}
            decimalScale={0}
            filterDefaultValue={getNumberFilterInitialState(selectedFilters, filterId)}
        />
    );
};
