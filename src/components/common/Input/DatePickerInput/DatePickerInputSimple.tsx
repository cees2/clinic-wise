import { Calendar, CalendarProps } from "react-date-range";

interface Props extends CalendarProps{
    value: Date;
    onChange: (value: Date) => void;
}

export const DatePickerInputSimple = (props: Props) => {
    const { value, onChange: onChangeProps } = props;

    return <Calendar date={value} onChange={onChangeProps} {...props} />
}
