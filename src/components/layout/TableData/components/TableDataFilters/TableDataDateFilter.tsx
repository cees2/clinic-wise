import DateFilter from "../../../../common/Filters/DateFilter.tsx";
import { useTableDataContext } from "../../utils/TableDataContext.tsx";
import { getDateFilterDefaultType, getDateFilterDefaultValue } from "../../utils/filters/filtersUtils.ts";
import {
    type DateFilterCondition,
    type FilterState,
    FilterType,
    TableDataActionsEnum,
} from "../../../../../utils/projectTypes.ts";
import { format } from "date-fns";
import { DB_DATE_FORMAT } from "../../../../../utils/constants.ts";

interface Props {
    filterId: string;
}

const TableDataDateFilter = ({ filterId }: Props) => {
    const {
        dispatch,
        tableDataState: { selectedFilters },
    } = useTableDataContext();

    const onHideDropdown = ({ filterValue, filterCondition }: FilterState<Date | undefined, DateFilterCondition>) => {
        if (!filterValue) return;

        const formattedDate = format(filterValue, DB_DATE_FORMAT);

        dispatch({
            type: TableDataActionsEnum.REPLACE_FILTER,
            payload: { id: filterId, filterValue: formattedDate, filterCondition, filterType: FilterType.DATE },
        });
    };

    return (
        <DateFilter
            defaultDate={getDateFilterDefaultValue(selectedFilters, filterId)}
            defaultCondition={getDateFilterDefaultType(selectedFilters, filterId)}
            onHideDropdown={onHideDropdown}
        />
    );
};

export default TableDataDateFilter;
