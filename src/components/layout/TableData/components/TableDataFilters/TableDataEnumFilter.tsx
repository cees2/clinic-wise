import {
    type EnumFilterOption,
    type FilterState,
    FilterType,
    TableDataActionsEnum,
} from "../../../../../utils/projectTypes.ts";
import EnumFilter from "../../../../common/Filters/EnumFilter.tsx";
import { useTableDataContext } from "../../utils/TableDataContext.tsx";
import { getEnumFilterInitialState, getFiltersConditionsWithValue } from "../../utils/filters/filtersUtils.ts";

interface Props {
    filterId: string;
    options: EnumFilterOption[];
}

export const TableDataEnumFilter = ({ options, filterId }: Props) => {
    const {
        dispatch,
        tableDataState: { selectedFilters },
    } = useTableDataContext();
    const defaultValue = getEnumFilterInitialState(selectedFilters, filterId);

    const onHideDropdown = (selectedFilterState: FilterState<string[], "e">) => {
        const { filterValue, filterCondition } = selectedFilterState;

        if (filterValue.length === 0) {
            dispatch({ type: TableDataActionsEnum.REMOVE_FILTER, payload: filterId });
            return;
        }

        const selectedFilter = { id: filterId, filterValue, filterCondition, filterType: FilterType.ENUM };

        dispatch({ type: TableDataActionsEnum.REPLACE_FILTER, payload: selectedFilter });
    };

    return (
        <EnumFilter options={options} filterId={filterId} onHideDropdown={onHideDropdown} defaultValue={defaultValue} />
    );
};
