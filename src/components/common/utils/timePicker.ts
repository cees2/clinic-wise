import { TimePickerMode } from "../../../utils/projectTypes";
import { add } from "date-fns";

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

export function getUpdatedTimeValue(value: string | Date, newSelectedValue: number, mode: TimePickerMode) {
    if (typeof value === "string") {
        let updatedDate;

        if (mode === TimePickerMode.HOURS) {
            updatedDate = add(new Date(value), { hours: Number(newSelectedValue) });
        } else {
            updatedDate = add(new Date(value), { minutes: Number(newSelectedValue) });
        }

        return updatedDate;
    }

    const newDate = new Date(value);

    if (mode === TimePickerMode.HOURS) {
        newDate.setHours(newSelectedValue);
    } else {
        newDate.setMinutes(newSelectedValue);
    }

    return newDate;
}
