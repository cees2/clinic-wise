import Select, { type OnChangeValue } from "react-select";
import type { FormSelectInputSimpleProps } from "../../../../utils/projectTypes";
import { useController } from "react-hook-form";
import { getFormSelectValue } from "../../utils/inputs";

const SimpleSelectInput = <
    OptionsType extends Record<string, any>,
    isMulti extends boolean,
    FormType extends Record<string, any>,
>({
    registerName,
    control,
    rules,
    getOptionValue,
    options,
    ...restProps
}: FormSelectInputSimpleProps<OptionsType, isMulti, FormType>) => {
    const {
        field: { onChange, value, onBlur },
    } = useController({ name: registerName, control, rules });
    const selectedOption = options.find((option) => getFormSelectValue(option, getOptionValue) === value);

    const onChangeInternal = (updatedValue: OnChangeValue<OptionsType, isMulti>) => {
        const newValue = getFormSelectValue(updatedValue, getOptionValue);
        onChange(newValue);
    };

    return (
        <Select {...restProps} value={selectedOption} onChange={onChangeInternal} onBlur={onBlur} options={options} />
    );
};

export default SimpleSelectInput;
