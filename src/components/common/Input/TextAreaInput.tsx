import type { FieldPath, RegisterOptions, UseFormRegister } from "react-hook-form";
import { InputLabel, StyledInput } from "./common/InputCommon";
import type { TextareaHTMLAttributes } from "react";

interface Props<FormType extends Record<string, any>> extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    register: UseFormRegister<FormType>;
    registerName: FieldPath<FormType>;
    label: string;
    rules?: Omit<RegisterOptions<FormType>, "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate">;
}

export const TextAreaInput = <FormType extends Record<string, any>>({
    label,
    register,
    rules,
    registerName,
    ...restProps
}: Props<FormType>) => {
    return (
        <StyledInput>
            <InputLabel htmlFor={registerName}>{label}</InputLabel>
            <textarea id={registerName} {...register(registerName, rules)} {...restProps} />
        </StyledInput>
    );
};
