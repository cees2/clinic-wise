import { NumericFormat, type NumericFormatProps } from "react-number-format";
import { InputLabel, StyledInput } from "../common/InputCommon.tsx";
import {
    useController,
    useFormState,
    type Control,
    type FieldPath,
    type Path,
    type RegisterOptions,
} from "react-hook-form";
import { getInputFieldErrorName } from "../../utils/inputs.ts";
import { ErrorMessage } from "../common/ErrorMessage.tsx";

interface Props<FormType extends Record<string, any>> extends NumericFormatProps {
    label: string;
    control: Control<FormType>;
    registerName: FieldPath<FormType>;
    rules?: Omit<
        RegisterOptions<FormType, Path<FormType>>,
        "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
    >;
}

export const NumberInput = <FormType extends Record<string, any>>({
    label,
    control,
    registerName,
    rules,
    ...restProps
}: Props<FormType>) => {
    const {
        field: { onChange, value, onBlur },
    } = useController<FormType>({ control, rules, name: registerName });
    const { errors } = useFormState<FormType>({ control, name: registerName });
    const isRequired = rules?.required;
    const inputErrorName = getInputFieldErrorName(errors, registerName);

    return (
        <StyledInput>
            <InputLabel htmlFor={registerName}>{`${label}${isRequired ? " *" : ""}`}</InputLabel>
            <NumericFormat id={registerName} onChange={onChange} value={value} onBlur={onBlur} {...restProps} />
            <ErrorMessage error={inputErrorName} />
        </StyledInput>
    );
};
