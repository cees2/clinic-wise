import type { FieldPath, FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";
import { InputLabel, StyledInput } from "./common/InputCommon";
import { getInputFieldErrorName } from "../utils/inputs";
import { ErrorMessage } from "./common/ErrorMessage";

interface Props<FormType extends Record<string, any>> {
    register: UseFormRegister<FormType>;
    registerName: FieldPath<FormType>;
    label: string;
    rules?: RegisterOptions<FieldValues, string>;
}

export const TextInput = <FormType extends Record<string, any>>({
    register,
    registerName,
    label,
    rules,
}: Props<FormType>) => {
    const inputErrorName = getInputFieldErrorName(errors, registerName);

    return (
        <StyledInput>
            <InputLabel htmlFor={registerName}>{label}</InputLabel>
            <input type="text" id={registerName} {...register(registerName, rules)} />{" "}
            {inputErrorName && <ErrorMessage>{inputErrorName}</ErrorMessage>}
        </StyledInput>
    );
};
