import TextFilter from "../../../../common/Filters/TextFilter.tsx";
import { useTableDataContext } from "../../utils/TableDataContext.tsx";
import {
    type FilterState,
    FilterType,
    TableDataActionsEnum,
    type TextFilterCondition,
} from "../../../../../utils/projectTypes.ts";
import { getFilterDefaultValue } from "../../utils/filters/filtersUtils.ts";

interface Props {
    filterId: string;
}

export const TableDataTextFilter = ({ filterId }: Props) => {
    const {
        dispatch,
        tableDataState: { selectedFilters },
    } = useTableDataContext();

    const hideDropdownHandler = (textFilterState: FilterState<string | undefined, TextFilterCondition>) => {
        if (!textFilterState.filterValue) {
            dispatch({ type: TableDataActionsEnum.REMOVE_FILTER, payload: filterId });
            return;
        }

        const { filterValue, filterCondition } = textFilterState;

        const selectedFilter = { id: filterId, filterValue, filterCondition, filterType: FilterType.TEXT };

        dispatch({ type: TableDataActionsEnum.REPLACE_FILTER, payload: selectedFilter });
    };

    return (
        <TextFilter
            filterId={filterId}
            onHideDropdown={hideDropdownHandler}
            filterDefaultValue={getFilterDefaultValue(selectedFilters, filterId)}
        />
    );
};
