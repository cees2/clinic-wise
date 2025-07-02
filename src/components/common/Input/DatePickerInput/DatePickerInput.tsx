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
    type UseFormWatch,
} from "react-hook-form";
import TimePicker from "./TimePicker";
import styled from "styled-components";
import { InputLabel } from "../common/InputCommon";
import { ErrorMessage } from "../common/ErrorMessage";
import { getInputFieldErrorName } from "../../utils/inputs";

interface Props<FormType extends Record<string, any>> {
    minDate?: Date;
    maxDate?: Date;
    control: Control<FormType>;
    registerName: FieldPath<FormType>;
    withTimePicker?: true;
    asString?: true;
    watch: UseFormWatch<FormType>;
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
    asString,
    label,
    watch,
    rules,
}: Props<FormType>) => {
    const calendarMinDate = minDate ?? new Date();
    const calendarMaxDate = maxDate ?? add(new Date(), { years: 1 });
    const currentDate = new Date();
    const defaultValue = asString ? currentDate.toISOString() : currentDate;
    const inputValue = watch(registerName);
    const formattedDate = format(new Date(inputValue || Date.now()), "dd.MM.yyyy kk:mm");
    const isRequired = rules?.required;
    const {
        field: { onChange, value },
    } = useController<FormType>({ control, name: registerName, rules, defaultValue });
    const { errors } = useFormState<FormType>({ control });
    const inputErrorName = getInputFieldErrorName(errors, registerName);

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
                </Dropdown.Menu>
            </Dropdown>
            {inputErrorName && <ErrorMessage>{inputErrorName}</ErrorMessage>}
        </div>
    );
};
