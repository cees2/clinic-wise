import type { FieldPath, FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";
import { InputLabel } from "./common/InputCommon";
import type { TextareaHTMLAttributes } from "react";

interface Props<FormType extends Record<string, any>> extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    register: UseFormRegister<FormType>;
    registerName: FieldPath<FormType>;
    label: string;
    rules?: RegisterOptions<FieldValues, string>;
}

export const TextAreaInput = <FormType extends Record<string, any>>({
    label,
    register,
    rules,
    registerName,
    ...restProps
}: Props<FormType>) => {
    return (
        <div className="flex flex-col">
            <InputLabel htmlFor={registerName}>{label}</InputLabel>
            <textarea id={registerName} {...register(registerName, rules)} {...restProps} />
        </div>
    );
};
