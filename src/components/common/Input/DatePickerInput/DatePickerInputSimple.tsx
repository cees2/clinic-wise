import { Calendar, CalendarProps } from "react-date-range";
import TimePicker from "./TimePicker.tsx";
import type { TimePickerProps } from "../../../../utils/projectTypes.ts";
import { StyledDatePickerInput } from "./StyledDatePickerInput.tsx";

interface Props extends CalendarProps, TimePickerProps {
    withTimePicker?: boolean;
}

export const DatePickerInputSimple = (props: Props) => {
    const { value, onChange } = props;

    return (
        <StyledDatePickerInput>
            <Calendar date={value} onChange={onChange} {...props} />
            {props.withTimePicker && <TimePicker value={value} onChange={onChange} />}
        </StyledDatePickerInput>
    );
};
