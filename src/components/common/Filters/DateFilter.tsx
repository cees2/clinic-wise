import { useState } from "react";
import { Dropdown } from "../Dropdown/Dropdown.tsx";
import { Calendar, type CalendarProps } from "react-date-range";
import { type DateFilterCondition, type FilterState } from "../../../utils/projectTypes.ts";
import { dateFilterTypesArray, getDateFilterOptionName } from "../../layout/TableData/utils/filters/filtersUtils.ts";
import * as React from "react";

interface Props extends React.Component<CalendarProps> {
    defaultDate?: Date;
    defaultCondition?: DateFilterCondition;
    onHideDropdown: (selectedFilterState: FilterState<Date | undefined, DateFilterCondition>) => void;
}

const DateFilter = ({ defaultDate, defaultCondition, onHideDropdown }: Props) => {
    const [selectedFilterState, setSelectedFilterState] = useState<FilterState<Date | undefined, DateFilterCondition>>({
        filterValue: defaultDate,
        filterCondition: defaultCondition ?? "gte",
    });

    const onChange = (newSelectedDate: Date) => {
        setSelectedFilterState((prevFilterState) => ({
            filterValue: newSelectedDate,
            filterCondition: prevFilterState?.filterCondition ?? defaultCondition ?? "gte",
        }));
    };

    const dropdownItemClickHandler = (dateFilterType: DateFilterCondition) => {
        setSelectedFilterState((prevFilterState) => {
            return { ...prevFilterState, filterCondition: dateFilterType };
        });
    };

    const shouldDisplayCalendar = (dateFilterType: DateFilterCondition) =>
        selectedFilterState.filterCondition === dateFilterType;

    return (
        <Dropdown.Menu onHideDropdown={() => onHideDropdown?.(selectedFilterState)} className="px-3 py-2">
            {dateFilterTypesArray.map((dateFilterType) => {
                return (
                    <Dropdown.Item key={dateFilterType} onClick={() => dropdownItemClickHandler(dateFilterType)}>
                        <div className="flex gap-x-4 items-center">
                            <input
                                type="radio"
                                id={dateFilterType.toString()}
                                name="date-filter-option"
                                checked={dateFilterType === selectedFilterState?.filterCondition}
                            />
                            <label htmlFor={dateFilterType.toString()} className="mr-2">
                                {getDateFilterOptionName(dateFilterType)}
                            </label>
                        </div>
                        {shouldDisplayCalendar(dateFilterType) && (
                            <Calendar date={selectedFilterState?.filterValue} onChange={onChange} />
                        )}
                    </Dropdown.Item>
                );
            })}
        </Dropdown.Menu>
    );
};

export default DateFilter;
