import Select, { type OnChangeValue } from "react-select";
import { AppColorMode, type FormSelectInputSimpleProps } from "../../../../utils/projectTypes";
import { useController } from "react-hook-form";
import { getFormSelectValue, selectInputsStyles } from "../../utils/inputs";
import { useDarkMode } from "../../../../utils/hooks/useDarkMode.ts";

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
    const { addMode } = useDarkMode();

    const onChangeInternal = (updatedValue: OnChangeValue<OptionsType, isMulti>) => {
        const newValue = getFormSelectValue(updatedValue, getOptionValue);
        onChange(newValue);
    };

    return (
        <Select
            {...restProps}
            value={selectedOption}
            onChange={onChangeInternal}
            onBlur={onBlur}
            options={options}
            styles={selectInputsStyles(addMode === AppColorMode.DARK)}
        />
    );
};

export default SimpleSelectInput;
