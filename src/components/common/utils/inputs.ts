import type { FieldErrors, FieldPath } from "react-hook-form";
import type { GetOptionValue } from "react-select";

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

export const getFormSelectValue = <OptionsType>(
    option: OptionsType,
    getOptionValue: GetOptionValue<OptionsType> | undefined,
) => {
    if (getOptionValue) {
        return getOptionValue(option);
    } else if ("value" in option) {
        return option.value;
    } else {
        return option;
    }
};
