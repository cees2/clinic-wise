import type { FieldPath, FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";
import { InputLabel, StyledInput } from "./common/InputCommon";

interface Props<T extends Record<string, any>> {
    register: UseFormRegister<T>;
    registerName: FieldPath<T>;
    label: string;
    rules?: RegisterOptions<FieldValues, string>;
}

export const TextInput = <T extends Record<string, any>>({ register, registerName, label, rules }: Props<T>) => {
    return (
        <StyledInput>
            <InputLabel htmlFor={registerName}>{label}</InputLabel>
            <input type="text" id={registerName} {...register(registerName, rules)} />
        </StyledInput>
    );
};
