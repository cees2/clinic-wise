import { useState } from "react";
import { Dropdown } from "../../../../common/Dropdown/Dropdown";
import { useTableDataContext } from "../../utils/TableDataContext";
import { Calendar } from "react-date-range";
import {
    type DateFilterType,
    FilterType,
    TableDataActionsEnum,
    type TableDataResourceType,
} from "../../../../../utils/projectTypes";
import {
    dateFilterTypesArray,
    getDateFilterDefaultType,
    getDateFilterDefaultValue,
    getDateFilterOptionName,
} from "../../utils/filters/filtersUtils";
import { format } from "date-fns";
import { UNIVERSAL_DATE_FORMAT } from "../../../../../utils/constants";

// TODO: Wrong types
const DateFilter = <T extends TableDataResourceType>({ filterId }: { filterId: keyof T }) => {
    const {
        dispatch,
        tableDataState: { selectedFilters },
    } = useTableDataContext();
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(() =>
        getDateFilterDefaultValue(selectedFilters, filterId),
    );
    const [filterCondition, setFilterCondition] = useState<DateFilterType>(() =>
        getDateFilterDefaultType(selectedFilters, filterId),
    );

    const onChange = (newSelectedDate: Date) => {
        setSelectedDate(newSelectedDate);
    };

    const onHideDropdown = () => {
        if (!selectedDate) return;

        const formattedDate = format(selectedDate, UNIVERSAL_DATE_FORMAT);

        dispatch({
            type: TableDataActionsEnum.REPLACE_FILTER,
            payload: { id: filterId, filterValue: formattedDate, filterCondition, filterType: FilterType.DATE },
        });
    };

    return (
        <Dropdown.Menu onHideDropdown={onHideDropdown} className="px-3 py-2">
            {dateFilterTypesArray.map((dateFilterType) => {
                return (
                    <Dropdown.Item
                        key={dateFilterType}
                        onClick={() => {
                            setFilterCondition(dateFilterType);
                        }}
                    >
                        <div className="flex gap-x-4 items-center">
                            <input
                                type="radio"
                                id={dateFilterType.toString()}
                                name="date-filter-option"
                                checked={dateFilterType === filterCondition}
                            />
                            <label htmlFor={dateFilterType.toString()} className="mr-2">
                                {getDateFilterOptionName(dateFilterType)}
                            </label>
                        </div>
                        {filterCondition === dateFilterType && <Calendar date={selectedDate} onChange={onChange} />}
                    </Dropdown.Item>
                );
            })}
        </Dropdown.Menu>
    );
};

export default DateFilter;
