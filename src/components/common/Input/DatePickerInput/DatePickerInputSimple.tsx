import { Calendar, type CalendarProps } from "react-date-range";
import TimePicker from "./TimePicker.tsx";
import type { TimePickerProps } from "../../../../utils/projectTypes.ts";
import { StyledDatePickerInput } from "./StyledDatePickerInput.tsx";
import * as React from "react";

interface Props extends React.Component<CalendarProps>, TimePickerProps {
    withTimePicker?: boolean;
}

export const DatePickerInputSimple = (props: Props) => {
    const { value, onChange } = props;

    return (
        <StyledDatePickerInput>
            <Calendar date={value} {...props} />
            {props.withTimePicker && <TimePicker value={value} onChange={onChange} />}
        </StyledDatePickerInput>
    );
};
