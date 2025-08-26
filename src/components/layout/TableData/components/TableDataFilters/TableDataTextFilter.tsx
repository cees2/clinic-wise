import TextFilter from "../../../../common/Filters/TextFilter.tsx";
import { useTableDataContext } from "../../utils/TableDataContext.tsx";
import {
    type FilterState,
    FilterType,
    TableDataActionsEnum,
    type TextFilterCondition,
} from "../../../../../utils/projectTypes.ts";

interface Props {
    filterId: string;
}

export const TableDataTextFilter = ({ filterId }: Props) => {
    const { dispatch } = useTableDataContext();

    const hideDropdownHandler = (textFilterState?: FilterState<string, TextFilterCondition>) => {
        if (!textFilterState) {
            dispatch({ type: TableDataActionsEnum.REMOVE_FILTER, payload: filterId });
            return;
        }

        const { filterValue, filterCondition } = textFilterState;

        const selectedFilter = { id: filterId, filterValue, filterCondition, filterType: FilterType.TEXT };

        dispatch({ type: TableDataActionsEnum.REPLACE_FILTER, payload: selectedFilter });
    };

    return <TextFilter filterId={filterId} onHideDropdown={hideDropdownHandler} />;
};
