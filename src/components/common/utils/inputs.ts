import type { FieldErrors, FieldPath } from "react-hook-form";
import type { GetOptionValue, OnChangeValue } from "react-select";

export const getInputFieldErrorName = <FormType extends Record<string, any>>(
    errors: FieldErrors<FormType>,
    fieldName: FieldPath<FormType>,
) => {
    const errorConfig = errors[fieldName];

    if (!errorConfig) return null;

    if (errorConfig.message && typeof errorConfig.message === "string") return errorConfig.message;

    switch (errorConfig.type) {
        case "required":
            return "This field is required";
        default:
            return null;
    }
};

export const getFormSelectValue = <OptionsType, isMulti extends boolean>(
    option: OnChangeValue<OptionsType, isMulti>,
    getOptionValue: GetOptionValue<OptionsType> | undefined,
    isMulti?: boolean,
) => {
    if (Array.isArray(option) && isMulti) {
        const fieldValue = [];

        option.forEach((option) => {
            if (getOptionValue) {
                fieldValue.push(getOptionValue(option));
            } else if ("value" in option) {
                fieldValue.push(option.value);
            } else {
                fieldValue.push(option);
            }
        });

        return fieldValue;
    }

    if (getOptionValue) {
        return getOptionValue(option);
    } else if ("value" in option) {
        return option.value;
    } else {
        return option;
    }
};
