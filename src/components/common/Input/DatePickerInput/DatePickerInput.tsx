import { add } from "date-fns";
import { Calendar } from "react-date-range";
import { Dropdown } from "../../Dropdown/Dropdown";
import { Controller, type Control, type FieldPath } from "react-hook-form";
import TimePicker from "./TimePicker";
import styled from "styled-components";

interface Props<T extends Record<string, any>> {
    minDate?: Date;
    maxDate?: Date;
    control: Control<T>;
    registerName: FieldPath<T>;
    withTimePicker?: true;
    asString?: true;
}

const StyledDatePickerInput = styled.div`
    display: flex;
    align-items: flex-start;
    column-gap: 0.8rem;
    height: 291px;
    background-color: #fff;
`;

export const DatePickerInput = <T extends Record<string, any>>({
    minDate,
    maxDate,
    control,
    registerName,
    withTimePicker,
    asString,
}: Props<T>) => {
    const calendarMinDate = minDate ?? new Date();
    const calendarMaxDate = maxDate ?? add(new Date(), { years: 1 });
    const currentDate = new Date();
    const defaultValue = asString ? currentDate.toISOString() : currentDate;

    return (
        <Dropdown>
            <Dropdown.Toggle hideDefaultIcon>ddd</Dropdown.Toggle>
            <Dropdown.Menu>
                <Controller
                    control={control}
                    name={registerName}
                    defaultValue={defaultValue}
                    render={({ field: { onChange, value } }) => (
                        <StyledDatePickerInput>
                            <Calendar
                                date={value}
                                onChange={(dateRange: Date) => {
                                    onChange(asString ? dateRange.toISOString() : dateRange);
                                }}
                                color="#16a34a"
                                dateDisplayFormat="dd.mm.yyyy"
                                minDate={calendarMinDate}
                                maxDate={calendarMaxDate}
                            />
                            {withTimePicker && <TimePicker value={value} onChange={onChange} />}
                        </StyledDatePickerInput>
                    )}
                />
            </Dropdown.Menu>
        </Dropdown>
    );
};
