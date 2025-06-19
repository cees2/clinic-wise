import { Controller, type Control, type FieldPath } from "react-hook-form";
import Select from "react-select";
import type { Props as SelectProps } from "react-select";
import AsyncSelect from "react-select/async";
interface Props<OptionsType extends Record<string, any>, isMulti extends boolean, FormType extends Record<string, any>>
    extends SelectProps<OptionsType, isMulti> {
    options?: OptionsType[];
    loadOptions?: (inputValue: string) => Promise<OptionsType[]>;
    control: Control<FormType>;
    registerName: FieldPath<FormType>;
}

export const FormSelectInput = <
    OptionsType extends Record<string, any>,
    isMulti extends boolean,
    FormType extends Record<string, any>,
>(
    props: Props<OptionsType, isMulti, FormType>,
) => {
    const { control, registerName } = props;
    const hasPredefinedOptions = Boolean(props.options);

    return (
        <Controller
            render={({ field: { onChange, value, onBlur } }) => {
                return hasPredefinedOptions ? (
                    <Select {...props} value={value} onChange={onChange} onBlur={onBlur} />
                ) : (
                    <AsyncSelect
                        {...props}
                        value={value}
                        onChange={(updatedValue) => {
                            const newUpdatedValue = props.getOptionValue?.(updatedValue) ?? updatedValue;
                            onChange(newUpdatedValue);
                        }}
                        onBlur={onBlur}
                    />
                );
            }}
            name={registerName}
            control={control}
        />
    );
};
