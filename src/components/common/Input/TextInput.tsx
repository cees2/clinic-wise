import {
    useFormState,
    type Control,
    type FieldPath,
    type FieldValues,
    type RegisterOptions,
    type UseFormRegister,
} from "react-hook-form";
import { InputLabel, StyledInput } from "./common/InputCommon";
import { getInputFieldErrorName } from "../utils/inputs";
import { ErrorMessage } from "./common/ErrorMessage";
import { InputHelp } from "./common/InputHelp";

interface Props<FormType extends Record<string, any>> {
    register: UseFormRegister<FormType>;
    registerName: FieldPath<FormType>;
    label: string;
    rules?: RegisterOptions<FieldValues, string>;
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
}: Props<FormType>) => {
    const { errors } = useFormState<FormType>({ control, name: registerName });
    const isRequired = rules?.required;
    const inputErrorName = getInputFieldErrorName(errors, registerName);

    return (
        <StyledInput>
            <InputLabel htmlFor={registerName}>{`${label}${isRequired ? " *" : ""}`}</InputLabel>
            {helpText && <InputHelp>{helpText}</InputHelp>}
            <input type="text" id={registerName} {...register(registerName, rules)} />
            {inputErrorName && <ErrorMessage>{inputErrorName}</ErrorMessage>}
        </StyledInput>
    );
};
