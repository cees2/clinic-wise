import { useController, type Control, type FieldPath } from "react-hook-form";
import Select from "react-select";
import type { OnChangeValue, Props as SelectProps } from "react-select";
import AsyncSelect from "react-select/async";
import { InputLabel } from "./common/InputCommon";
import { useEffect, useRef } from "react";
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
    const {
        field: { onChange, value, onBlur },
    } = useController({ name: registerName, control });
    const hasPredefinedOptions = Boolean(props.options);
    const selectedValueFullObject = useRef<OptionsType | null >(null);

    useEffect(() => {
        if (!value) {
            selectedValueFullObject.current = null;
        }
    }, [value]);

    const onChangeInternal = (newValue: OnChangeValue<OptionsType, isMulti>) => {
        selectedValueFullObject.current = newValue;
        let newUpdatedValue;

        if (props.getOptionValue) {
            newUpdatedValue = props.getOptionValue(newValue);
        } else if (newValue && "value" in newValue) {
            newUpdatedValue = newValue.value;
        } else {
            newUpdatedValue = newValue;
        }

        onChange(newUpdatedValue);
    };

    return (
        <div>
            <InputLabel htmlFor={registerName}>{label}</InputLabel>
            {hasPredefinedOptions ? (
                <Select
                    {...props}
                    value={selectedValueFullObject.current ?? value}
                    onChange={onChangeInternal}
                    onBlur={onBlur}
                />
            ) : (
                <AsyncSelect
                    {...props}
                    value={selectedValueFullObject.current ?? value}
                    onChange={onChangeInternal}
                    onBlur={onBlur}
                    defaultOptions
                    name={registerName}
                    isClearable
                />
            )}
        </div>
    );
};
