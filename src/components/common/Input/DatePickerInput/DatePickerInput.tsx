import { format } from "date-fns";
import { Calendar } from "react-date-range";
import { Dropdown } from "../../Dropdown/Dropdown";
import { useController, useFormState, type Control, type FieldPath, type RegisterOptions } from "react-hook-form";
import TimePicker from "./TimePicker";
import { InputLabel } from "../common/InputCommon";
import { ErrorMessage } from "../common/ErrorMessage";
import {
    getDatePickerFormatDate,
    getDefaultMaxDate,
    getDefaultMinDate,
    getInputFieldErrorName,
} from "../../utils/inputs";
import { DB_DATE_FORMAT } from "../../../../utils/constants";
import { StyledDatePickerInput } from "./StyledDatePickerInput.tsx";
import type { TimePickerProps } from "../../../../utils/projectTypes.ts";

interface Props<FormType extends Record<string, any>> extends Partial<TimePickerProps> {
    minDate?: Date | "current";
    maxDate?: Date | "current";
    control: Control<FormType>;
    registerName: FieldPath<FormType>;
    withTimePicker?: true;
    label: string;
    rules?: Omit<RegisterOptions<FormType>, "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate">;
    dateFormat?: string;
}

export const DatePickerInput = <FormType extends Record<string, any>>({
    minDate,
    maxDate,
    control,
    registerName,
    withTimePicker,
    label,
    rules,
    customHours,
    customMinutes,
    dateFormat,
}: Props<FormType>) => {
    const calendarMinDate = getDefaultMinDate(minDate, withTimePicker);
    const calendarMaxDate = getDefaultMaxDate(maxDate, withTimePicker);
    const isRequired = rules?.required;
    const {
        field: { onChange, value },
    } = useController<FormType>({
        control,
        name: registerName,
        rules,
    });
    const formattedDate = format(new Date(value || Date.now()), getDatePickerFormatDate(dateFormat, withTimePicker));
    const { errors } = useFormState<FormType>({ control });
    const inputErrorName = getInputFieldErrorName(errors, registerName);

    const onInternalChange = (selectedDate: Date) => {
        const currentDate = new Date(value);

        selectedDate.setHours(currentDate.getHours());
        selectedDate.setMinutes(currentDate.getMinutes());
        onChange(format(selectedDate, DB_DATE_FORMAT));
    };

    return (
        <div>
            <InputLabel htmlFor={registerName}>{`${label}${isRequired ? " *" : ""}`}</InputLabel>
            <Dropdown>
                <Dropdown.Toggle hideDefaultIcon isForm>
                    {formattedDate}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <StyledDatePickerInput>
                        <Calendar
                            date={value}
                            onChange={onInternalChange}
                            color="#16a34a"
                            dateDisplayFormat="dd.mm.yyyy"
                            minDate={calendarMinDate}
                            maxDate={calendarMaxDate}
                        />
                        {withTimePicker && (
                            <TimePicker
                                value={value}
                                onChangeTimePicker={onChange}
                                customHours={customHours}
                                customMinutes={customMinutes}
                            />
                        )}
                    </StyledDatePickerInput>
                </Dropdown.Menu>
            </Dropdown>
            {inputErrorName && <ErrorMessage>{inputErrorName}</ErrorMessage>}
        </div>
    );
};
