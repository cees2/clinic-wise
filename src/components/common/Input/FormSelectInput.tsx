import { Controller, type Control, type FieldPath } from "react-hook-form";
import Select from "react-select";
import type { OnChangeValue, Props as SelectProps } from "react-select";
import AsyncSelect from "react-select/async";
import { InputLabel } from "./common/InputCommon";
interface Props<OptionsType extends Record<string, any>, isMulti extends boolean, FormType extends Record<string, any>>
    extends SelectProps<OptionsType, isMulti> {
    options?: OptionsType[];
    loadOptions?: (inputValue: string) => Promise<OptionsType[]>;
    control: Control<FormType>;
    registerName: FieldPath<FormType>;
    label: string;
}

export const FormSelectInput = <
    OptionsType extends Record<string, any>,
    isMulti extends boolean,
    FormType extends Record<string, any>,
>(
    props: Props<OptionsType, isMulti, FormType>,
) => {
    const { control, registerName, label } = props;
    const hasPredefinedOptions = Boolean(props.options);

    return (
        <Controller
            render={({ field: { onChange, value, onBlur } }) => {
                const onChangeInternal = (updatedValue: OnChangeValue<OptionsType, isMulti>) => {
                    let newUpdatedValue;

                    if (props.getOptionValue) {
                        newUpdatedValue = props.getOptionValue(updatedValue);
                    } else if (updatedValue && "value" in updatedValue) {
                        newUpdatedValue = updatedValue.value;
                    } else {
                        newUpdatedValue = updatedValue;
                    }

                    onChange(newUpdatedValue);
                };

                return (
                    <div>
                        <InputLabel htmlFor={registerName}>{label}</InputLabel>
                        {hasPredefinedOptions ? (
                            <Select {...props} value={value} onChange={onChangeInternal} onBlur={onBlur} />
                        ) : (
                            <AsyncSelect
                                {...props}
                                value={value}
                                onChange={onChangeInternal}
                                onBlur={onBlur}
                                defaultOptions
                                name={registerName}
                            />
                        )}
                    </div>
                );
            }}
            name={registerName}
            control={control}
        />
    );
};
