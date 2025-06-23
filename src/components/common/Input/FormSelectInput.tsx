import {
    useController,
    useFormState,
    type Control,
    type FieldPath,
    type Path,
    type RegisterOptions,
} from "react-hook-form";
import Select from "react-select";
import type { OnChangeValue, Props as SelectProps } from "react-select";
import AsyncSelect from "react-select/async";
import { InputLabel } from "./common/InputCommon";
import { useEffect, useRef } from "react";
import { getInputFieldErrorName } from "../utils/inputs";
import { ErrorMessage } from "./common/ErrorMessage";
interface Props<OptionsType extends Record<string, any>, isMulti extends boolean, FormType extends Record<string, any>>
    extends SelectProps<OptionsType, isMulti> {
    options?: OptionsType[];
    loadOptions?: (inputValue: string) => Promise<OptionsType[]>;
    control: Control<FormType>;
    registerName: FieldPath<FormType>;
    label: string;
    rules?: Omit<
        RegisterOptions<OptionsType, Path<OptionsType>>,
        "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
    >;
}

export const FormSelectInput = <
    OptionsType extends Record<string, any>,
    isMulti extends boolean,
    FormType extends Record<string, any>,
>(
    props: Props<OptionsType, isMulti, FormType>,
) => {
    const { control, registerName, label, rules } = props;
    const {
        field: { onChange, value, onBlur },
    } = useController({ name: registerName, control, rules });
    const hasPredefinedOptions = Boolean(props.options);
    const selectedValueFullObject = useRef<OptionsType | null>(null);
    const isRequired = rules?.required;
    const { errors } = useFormState<FormType>({ control });
    const inputErrorName = getInputFieldErrorName(errors, registerName);

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
            <InputLabel htmlFor={registerName}>{`${label}${isRequired ? " *" : ""}`}</InputLabel>
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
            {inputErrorName && <ErrorMessage>{inputErrorName}</ErrorMessage>}
        </div>
    );
};
