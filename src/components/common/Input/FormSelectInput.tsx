import { useController, type Control, type FieldPath } from "react-hook-form";
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
    const {
        field: { onChange, value, onBlur },
    } = useController({ name: registerName, control });
    const hasPredefinedOptions = Boolean(props.options);

    return (
        <div>
            <InputLabel htmlFor={registerName}>{label}</InputLabel>
            {hasPredefinedOptions ? (
                <Select {...props} value={value} onChange={onChange} onBlur={onBlur} />
            ) : (
                <AsyncSelect
                    {...props}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    defaultOptions
                    name={registerName}
                />
            )}
        </div>
    );
};
