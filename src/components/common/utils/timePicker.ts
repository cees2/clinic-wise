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
