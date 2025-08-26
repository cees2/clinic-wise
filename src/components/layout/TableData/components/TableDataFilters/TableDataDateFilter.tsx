import * as React from "react";
import { CalendarProps } from "react-date-range";
import DateFilter from "../../../../common/Filters/DateFilter.tsx";
import { useTableDataContext } from "../../utils/TableDataContext.tsx";
import { getDateFilterDefaultType, getDateFilterDefaultValue } from "../../utils/filters/filtersUtils.ts";
import {
    type DateFilterCondition,
    type FilterState,
    FilterType,
    TableDataActionsEnum,
    type TableDataResourceType,
} from "../../../../../utils/projectTypes.ts";
import { format } from "date-fns";
import { DB_DATE_FORMAT } from "../../../../../utils/constants.ts";

interface Props extends React.Component<CalendarProps> {
    filterId: string;
}

const TableDataDateFilter = ({ filterId, ...restProps }: Props) => {
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
            defaultFilterCondition={getDateFilterDefaultType(selectedFilters, filterId)}
            onHideDropdown={onHideDropdown}
            {...restProps}
        />
    );
};

export default TableDataDateFilter;
