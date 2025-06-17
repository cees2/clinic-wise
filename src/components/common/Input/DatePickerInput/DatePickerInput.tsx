import { add } from "date-fns";
import { Calendar } from "react-date-range";
import { Dropdown } from "../../Dropdown/Dropdown";
import { Controller, type Control, type FieldPath } from "react-hook-form";
import TimePicker from "./TimePicker";

interface Props<T extends Record<string, any>> {
    minDate?: Date;
    maxDate?: Date;
    control: Control<T>;
    registerName: FieldPath<T>;
    withTimePicker?: true;
}

export const DatePickerInput = <T extends Record<string, any>>({
    minDate,
    maxDate,
    control,
    registerName,
    withTimePicker,
}: Props<T>) => {
    const calendarMinDate = minDate ?? new Date();
    const calendarMaxDate = maxDate ?? add(new Date(), { years: 1 });

    return (
        <Dropdown>
            <Dropdown.Toggle hideDefaultIcon>ddd</Dropdown.Toggle>
            <Dropdown.Menu>
                <Controller
                    control={control}
                    name={registerName}
                    render={({ field: { onChange, value } }) => (
                        <>
                            <Calendar
                                date={value}
                                onChange={(dateRange: Date) => {
                                    onChange(dateRange);
                                }}
                                color="#16a34a"
                                dateDisplayFormat="dd.mm.yyyy"
                                minDate={calendarMinDate}
                                maxDate={calendarMaxDate}
                            />
                            {withTimePicker && <TimePicker />}
                        </>
                    )}
                />
            </Dropdown.Menu>
        </Dropdown>
    );
};
