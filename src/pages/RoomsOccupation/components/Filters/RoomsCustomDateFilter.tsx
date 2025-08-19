import { useRoomsContext } from "../../utils/RoomsContext.tsx";
import { Dropdown } from "../../../../components/common/Dropdown/Dropdown.tsx";
import { DatePickerInputSimple } from "../../../../components/common/Input/DatePickerInput/DatePickerInputSimple.tsx";
import { useState } from "react";
import { getDateFilterFromRoomsFilters, updateRoomsFilters } from "../../utils/utils.ts";
import { DB_DATE_FORMAT_WITH_TIME } from "../../../../utils/constants.ts";
import { format } from "date-fns";
import { type RoomsFilter, RoomsFilterIds } from "../../../../utils/projectTypes.ts";

const getSelectedDateInitialValue = (filters: RoomsFilter[]) => {
    const dateFilter = getDateFilterFromRoomsFilters(filters);

    if(!dateFilter) return new Date();

    const {value} = dateFilter;

    return new Date(value)
}


export const RoomsCustomDateFilter = () => {
    const {setFilters, filters} = useRoomsContext();
    const [selectedDate, setSelectedDate] = useState<Date>(() => getSelectedDateInitialValue(filters));

    const hideDropdownHandler = () => {
        const newDateFilter = {id: RoomsFilterIds.DATE, value: format(selectedDate, DB_DATE_FORMAT_WITH_TIME)}

        setFilters(prevFilters => {
            return updateRoomsFilters(prevFilters, newDateFilter);
        })
    }

    const onCalendarDateChange = (date: Date) => {
        setSelectedDate(date);
    }

    return <Dropdown>
        <Dropdown.Toggle>Custom date</Dropdown.Toggle>
        <Dropdown.Menu onHideDropdown={hideDropdownHandler}>
            <DatePickerInputSimple value={selectedDate} onChange={onCalendarDateChange} />
        </Dropdown.Menu>
    </Dropdown>;
};