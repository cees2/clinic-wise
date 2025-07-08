import { add, format } from "date-fns";
import { Calendar } from "react-date-range";
import { Dropdown } from "../../Dropdown/Dropdown";
import {
    useController,
    useFormState,
    type Control,
    type FieldPath,
    type Path,
    type RegisterOptions,
} from "react-hook-form";
import TimePicker from "./TimePicker";
import styled from "styled-components";
import { InputLabel } from "../common/InputCommon";
import { ErrorMessage } from "../common/ErrorMessage";
import { getInputFieldErrorName } from "../../utils/inputs";
import { DB_DATE_FORMAT } from "../../../../utils/constants";

interface Props<FormType extends Record<string, any>> {
    minDate?: Date;
    maxDate?: Date;
    control: Control<FormType>;
    registerName: FieldPath<FormType>;
    withTimePicker?: true;
    label: string;
    rules?: Omit<
        RegisterOptions<FormType, Path<FormType>>,
        "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
    >;
}

const StyledDatePickerInput = styled.div`
    display: flex;
    align-items: flex-start;
    column-gap: 0.8rem;
    height: 291px;
    background-color: #fff;
    position: relative;
    z-index: 1;
`;

export const DatePickerInput = <FormType extends Record<string, any>>({
    minDate,
    maxDate,
    control,
    registerName,
    withTimePicker,
    label,
    rules,
}: Props<FormType>) => {
    const calendarMinDate = minDate ?? new Date();
    const calendarMaxDate = maxDate ?? add(new Date(), { years: 1 });
    const isRequired = rules?.required;
    const {
        field: { onChange, value },
    } = useController<FormType>({ control, name: registerName, rules });
    const formattedDate = format(new Date(value || Date.now()), "dd.MM.yyyy kk:mm");
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
                        {withTimePicker && <TimePicker value={value} onChange={onChange} />}
                    </StyledDatePickerInput>
                </Dropdown.Menu>
            </Dropdown>
            {inputErrorName && <ErrorMessage>{inputErrorName}</ErrorMessage>}
        </div>
    );
};
