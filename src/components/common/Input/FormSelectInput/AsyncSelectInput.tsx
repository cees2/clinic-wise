import { useEffect, useRef } from "react";
import type { FormSelectInputAsyncProps } from "../../../../utils/projectTypes";
import { useController } from "react-hook-form";
import type { OnChangeValue } from "react-select";
import { getFormSelectValue, selectInputsStyles } from "../../utils/inputs";
import AsyncSelect from "react-select/async";

const AsyncSelectInput = <
    OptionsType extends Record<string, any>,
    isMulti extends boolean,
    FormType extends Record<string, any>,
>(
    props: FormSelectInputAsyncProps<OptionsType, isMulti, FormType>,
) => {
    const { control, registerName, rules, getOptionValue, defaultValue } = props;
    const {
        field: { onChange, value, onBlur },
    } = useController({ name: registerName, control, rules });
    const selectedValueFullObject = useRef<OptionsType | null>(null);

    useEffect(() => {
        if (!value) {
            selectedValueFullObject.current = null;
        }
    }, [value]);

    const onChangeInternal = (newValue: OnChangeValue<OptionsType, isMulti>) => {
        selectedValueFullObject.current = newValue;
        const newUpdatedValue = getFormSelectValue(newValue, getOptionValue);

        onChange(newUpdatedValue);
    };

    const getAsyncSelectValue = () => {
        if (selectedValueFullObject.current) {
            return selectedValueFullObject.current;
        }

        const inputValueFromDefaultValue = getFormSelectValue(defaultValue, getOptionValue);

        if (inputValueFromDefaultValue?.toString() === value?.toString()) {
            return defaultValue;
        }

        return null;
    };

    return (
        <AsyncSelect
            {...props}
            value={getAsyncSelectValue() ?? value}
            onChange={onChangeInternal}
            onBlur={onBlur}
            defaultOptions
            name={registerName}
            isClearable
            styles={selectInputsStyles}
        />
    );
};

export default AsyncSelectInput;
