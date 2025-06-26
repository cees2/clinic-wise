import { useEffect, useRef } from "react";
import type { FormSelectInputAsyncProps } from "../../../../utils/projectTypes";
import { useController } from "react-hook-form";
import type { OnChangeValue } from "react-select";
import { getFormSelectValue } from "../../utils/inputs";
import AsyncSelect, { useAsync } from "react-select/async";

const AsyncSelectInput = <
    OptionsType extends Record<string, any>,
    isMulti extends boolean,
    FormType extends Record<string, any>,
>(
    props: FormSelectInputAsyncProps<OptionsType, isMulti, FormType>,
) => {
    const { control, registerName, rules, getOptionValue } = props;
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

    return (
        <AsyncSelect
            {...props}
            value={selectedValueFullObject.current ?? value}
            onChange={onChangeInternal}
            onBlur={onBlur}
            defaultOptions
            name={registerName}
            isClearable
        />
    );
};

export default AsyncSelectInput;
