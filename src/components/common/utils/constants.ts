import { TimePickerMode } from "../../../utils/projectTypes";

export const getTimePickerItemsToMap = (mode: TimePickerMode, customTime?: number[]) => {
    if (customTime) return customTime;

    if (mode === TimePickerMode.HOURS) {
        return getPossibleHours();
    }

    return getPossibleMinutes();
};

const getPossibleHours = () => Array.from({ length: 24 }, (_, index) => index);

const getPossibleMinutes = () => Array.from({ length: 60 }, (_, index) => index);

export const timePickerModes = [TimePickerMode.HOURS, TimePickerMode.MINUTES];
