import { NumericFormat, type NumericFormatProps } from "react-number-format";
import { InputLabel, StyledInput } from "./common/InputCommon";
import { Controller, type Control, type FieldPath, type FieldValues, type RegisterOptions } from "react-hook-form";

interface Props<T> extends NumericFormatProps {
    label: string;
    control: Control<T>;
    registerName: FieldPath<T>;
    rules?: Omit<RegisterOptions<FieldValues, string>, "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate">;
}

export const NumberInput = <T extends Record<string, any>>({
    label,
    control,
    registerName,
    rules,
    ...restProps
}: Props<T>) => {
    return (
        <Controller
            render={({ field: { onChange, value, onBlur } }) => {
                return (
                    <StyledInput>
                        <InputLabel htmlFor={registerName}>{label}</InputLabel>
                        <NumericFormat
                            id={registerName}
                            onChange={onChange}
                            value={value}
                            onBlur={onBlur}
                            {...restProps}
                        />
                    </StyledInput>
                );
            }}
            control={control}
            rules={rules}
            name={registerName}
        />
    );
};
