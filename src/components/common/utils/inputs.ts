import { add, endOfDay, startOfDay, startOfYear } from "date-fns";
import type { FieldErrors, FieldPath } from "react-hook-form";
import type { CSSObjectWithLabel, GetOptionValue, OnChangeValue, StylesConfig } from "react-select";
import { AppColorMode } from "../../../utils/projectTypes.ts";

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
        case "pattern":
            return "Wrong pattern provided";
        default:
            return null;
    }
};

export const getFormSelectValue = <OptionsType, isMulti extends boolean>(
    option: OnChangeValue<OptionsType, isMulti>,
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

export const selectInputsStyles = (isDarkMode: boolean): StylesConfig => ({
    control: (baseStyles, { isFocused }) => {
        const additionalStyles: CSSObjectWithLabel = {
            border: "1px solid var(--color-gray-400)",
            backgroundColor: "var(--color-background-tertiary)",
        };

        if (isFocused) {
            additionalStyles.borderColor = "var(--color-primary)";
            additionalStyles.boxShadow = "0px 0px 3px 0px var(--color-primary)";
        }

        return {
            ...baseStyles,
            ...additionalStyles,
        };
    },
    option: (baseStyles, { isSelected, isFocused }) => {
        const additionalStyles: CSSObjectWithLabel = {
            backgroundColor: "var(--color-background-tertiary)",
        };

        if (isSelected) {
            additionalStyles.backgroundColor = "var(--color-primary)";
            additionalStyles.color = "var(--color-gray-50)";
        } else if (isFocused) {
            additionalStyles.background = "var(--color-background-primary)";
        }

        return { ...baseStyles, ...additionalStyles };
    },
    menu: (baseStyles) => ({ ...baseStyles, backgroundColor: "var(--color-background-tertiary)" }),
    input: (baseStyles) => {
        return { ...baseStyles, boxShadow: "none", color: "var(--color-font-primary)" };
    },
    placeholder: (baseStyles) => {
        return { ...baseStyles, color: "var(--color-font-primary)" };
    },
    valueContainer: (baseStyles) => ({ ...baseStyles, color: "var(--color-font-primary)" }),
    singleValue: (baseStyles) => ({ ...baseStyles, color: "var(--color-font-primary)" }),
    noOptionsMessage: (baseStyles) => ({ ...baseStyles, color: "var(--color-font-primary)" }),
});

export const getDefaultMinDate = (minDate?: Date | "current", withTimePicker?: true): Date => {
    if (minDate === "current") {
        if (withTimePicker) return new Date();

        return startOfDay(new Date());
    }

    if (minDate) return minDate;

    return startOfYear(new Date("1950-01-01"));
};

export const getDefaultMaxDate = (maxDate?: Date | "current", withTimePicker?: true) => {
    if (maxDate === "current") {
        if (withTimePicker) return new Date();

        return endOfDay(new Date());
    }

    if (maxDate) return maxDate;

    return add(new Date(), { years: 1 });
};
