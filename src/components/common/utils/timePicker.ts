import { TimePickerMode } from "../../../utils/projectTypes";

export const getSelectedHourBasedOnValue = (value: string | Date): number => {
    if (typeof value === "string") {
        return Number(value.substring(11, 13));
    }

    return value.getHours();
};

export const getSelectedMinuteBasedOnValue = (value: string | Date): number => {
    if (typeof value === "string") {
        return Number(value.substring(14, 16));
    }

    return value.getMinutes();
};

export function getUpdatedTimeValue(
    value: string,
    newSelectedValue: number,
    mode: TimePickerMode,
): string;
export function getUpdatedTimeValue(value: Date, newSelectedValue: number, mode: TimePickerMode): Date;
export function getUpdatedTimeValue(
    value: string | Date,
    newSelectedValue: number,
    mode: TimePickerMode
) {
    if (typeof value === "string") {
        let valueToBeUpdated = newSelectedValue.toString();

        if (valueToBeUpdated.length === 1) valueToBeUpdated = valueToBeUpdated.padStart(2, "0");

        let updatedISODate = "";
        if (mode === TimePickerMode.HOURS) {
            updatedISODate = `${value.slice(0, 11)}${valueToBeUpdated}${value.slice(13)}`;
        } else {
            updatedISODate = `${value.slice(0, 14)}${valueToBeUpdated}${value.slice(16)}`;
        }

        return updatedISODate;
    }

    const newDate = new Date(value);

    if (mode === TimePickerMode.HOURS) {
        newDate.setHours(newSelectedValue);
    } else {
        newDate.setMinutes(newSelectedValue);
    }

    return newDate;
}
