import { Calendar, type CalendarProps } from "react-date-range";
import TimePicker from "./TimePicker.tsx";
import type { TimePickerProps } from "../../../../utils/projectTypes.ts";
import { StyledDatePickerInput } from "./StyledDatePickerInput.tsx";

interface Props extends CalendarProps, Partial<TimePickerProps> {
    withTimePicker?: boolean;
}

export const DatePickerInputSimple = (props: Props) => {
    const { value, onChange } = props;

    return (
        <StyledDatePickerInput>
            <Calendar date={new Date(value || Date.now())} {...props} />
            {props.withTimePicker && value && onChange && <TimePicker value={value} onChangeTimePicker={onChange} />}
        </StyledDatePickerInput>
    );
};
