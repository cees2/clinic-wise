import {
    useFormState,
    type Control,
    type FieldPath,
    type RegisterOptions,
    type UseFormRegister,
} from "react-hook-form";
import { InputLabel, StyledInput } from "../common/InputCommon.tsx";
import { getInputFieldErrorName } from "../../utils/inputs.ts";
import { ErrorMessage } from "../common/ErrorMessage.tsx";
import { InputHelp } from "../common/InputHelp.tsx";

interface Props<FormType extends Record<string, any>> extends React.ComponentProps<"input"> {
    register: UseFormRegister<FormType>;
    registerName: FieldPath<FormType>;
    label: string;
    rules?: Omit<RegisterOptions<FormType>, "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate">;
    control: Control<FormType, any, FormType>;
    helpText?: string;
}

export const TextInput = <FormType extends Record<string, any>>({
    register,
    registerName,
    label,
    rules,
    control,
    helpText,
    className,
    disabled,
    ...restProps
}: Props<FormType>) => {
    const { errors } = useFormState<FormType>({ control, name: registerName });
    const isRequired = rules?.required;
    const inputErrorName = getInputFieldErrorName(errors, registerName);

    return (
        <StyledInput className={className} $disabled={disabled}>
            <InputLabel htmlFor={registerName}>{`${label}${isRequired ? " *" : ""}`}</InputLabel>
            {helpText && <InputHelp>{helpText}</InputHelp>}
            <input
                type="text"
                id={registerName}
                {...register(registerName, rules)}
                disabled={disabled}
                {...restProps}
                className="dark:text-gray-800"
            />
            {inputErrorName && <ErrorMessage>{inputErrorName}</ErrorMessage>}
        </StyledInput>
    );
};
