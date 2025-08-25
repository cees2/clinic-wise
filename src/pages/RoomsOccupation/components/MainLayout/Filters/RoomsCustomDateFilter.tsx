import { useRoomsContext } from "../../../utils/RoomsContext.tsx";
import { Dropdown } from "../../../../../components/common/Dropdown/Dropdown.tsx";
import { DatePickerInputSimple } from "../../../../../components/common/Input/DatePickerInput/DatePickerInputSimple.tsx";
import { useEffect, useRef, useState } from "react";
import { updateRoomsFilters } from "../../../utils/utils.ts";
import { DB_DATE_FORMAT_WITH_TIME, DISPLAY_DATE_FORMAT } from "../../../../../utils/constants.ts";
import { compareAsc, format, startOfToday } from "date-fns";
import { RoomsFilterIds } from "../../../../../utils/projectTypes.ts";

export const RoomsCustomDateFilter = () => {
    const { setFilters, filters } = useRoomsContext();
    const [selectedDate, setSelectedDate] = useState<Date | string>("");
    const menuOpened = useRef<boolean>(false);

    useEffect(() => {
        const dateFilter = filters.find((filter) => filter.id === RoomsFilterIds.DATE);

        if (dateFilter && selectedDate && !menuOpened.current) {
            const areDatesEqual = compareAsc(new Date(dateFilter.value), selectedDate) === 0;

            if (!areDatesEqual) {
                setSelectedDate("");
            }
        }
    }, [filters, selectedDate]);

    const hideDropdownHandler = () => {
        const newDateFilter = { id: RoomsFilterIds.DATE, value: format(selectedDate, DB_DATE_FORMAT_WITH_TIME) };

        setFilters((prevFilters) => {
            return updateRoomsFilters(prevFilters, newDateFilter);
        });
        menuOpened.current = false;
    };

    const onCalendarDateChange = (date: Date) => {
        menuOpened.current = true;
        setSelectedDate(date);
    };

    return (
        <Dropdown>
            <Dropdown.Toggle>
                <Dropdown.Toggle.Label>{`Custom date${`${selectedDate ? `: ${format(selectedDate, DISPLAY_DATE_FORMAT)}` : ""}`}`}</Dropdown.Toggle.Label>
            </Dropdown.Toggle>
            <Dropdown.Menu onHideDropdown={hideDropdownHandler}>
                <DatePickerInputSimple value={selectedDate} onChange={onCalendarDateChange} minDate={startOfToday()} />
            </Dropdown.Menu>
        </Dropdown>
    );
};
