import {
    type EnumFilterOption,
    type FilterState,
    FilterType,
    TableDataActionsEnum,
} from "../../../../../utils/projectTypes.ts";
import EnumFilter from "../../../../common/Filters/EnumFilter.tsx";
import { useTableDataContext } from "../../utils/TableDataContext.tsx";
import { getEnumFilterInitialState } from "../../utils/filters/filtersUtils.ts";

interface Props {
    filterId: string;
    options?: EnumFilterOption[];
}

export const TableDataEnumFilter = ({ options, filterId }: Props) => {
    const {
        dispatch,
        tableDataState: { selectedFilters },
    } = useTableDataContext();

    const onHideDropdown = (selectedFilterState: FilterState<string[], "e">) => {
        const { filterValue, filterCondition } = selectedFilterState;

        if (filterValue.length === 0) {
            dispatch({ type: TableDataActionsEnum.REMOVE_FILTER, payload: filterId });
            return;
        }

        const selectedFilter = {
            id: filterId,
            filterValue: filterValue.join(","),
            filterCondition,
            filterType: FilterType.ENUM,
        };

        dispatch({ type: TableDataActionsEnum.REPLACE_FILTER, payload: selectedFilter });
    };

    if (!options) return null;

    return (
        <EnumFilter
            options={options}
            filterId={filterId}
            onHideDropdown={onHideDropdown}
            defaultValue={getEnumFilterInitialState(selectedFilters, filterId)}
        />
    );
};
