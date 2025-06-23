import { NumericFormat, type NumericFormatProps } from "react-number-format";
import { InputLabel, StyledInput } from "./common/InputCommon";
import {
    useController,
    useFormState,
    type Control,
    type FieldPath,
    type Path,
    type RegisterOptions,
} from "react-hook-form";
import { getInputFieldErrorName } from "../utils/inputs";
import { ErrorMessage } from "./common/ErrorMessage";

interface Props<T extends Record<string, any>> extends NumericFormatProps {
    label: string;
    control: Control<T>;
    registerName: FieldPath<T>;
    rules?: Omit<RegisterOptions<T, Path<T>>, "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate">;
}

export const NumberInput = <T extends Record<string, any>>({
    label,
    control,
    registerName,
    rules,
    ...restProps
}: Props<T>) => {
    const {
        field: { onChange, value, onBlur },
    } = useController<T>({ control, rules, name: registerName });
    const { errors } = useFormState<T>({ control, name: registerName });
    const isRequired = rules?.required;
    const inputErrorName = getInputFieldErrorName(errors, registerName);

    return (
        <StyledInput>
            <InputLabel htmlFor={registerName}>{`${label}${isRequired ? " *" : ""}`}</InputLabel>
            <NumericFormat id={registerName} onChange={onChange} value={value} onBlur={onBlur} {...restProps} />
            {inputErrorName && <ErrorMessage>{inputErrorName}</ErrorMessage>}
        </StyledInput>
    );
};
