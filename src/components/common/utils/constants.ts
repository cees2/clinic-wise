import { TimePickerMode } from "../../../utils/projectTypes";

export const getPossibleHours = () => Array.from({ length: 24 }, (_, index) => index);

export const getPossibleMinutes = () => Array.from({ length: 60 }, (_, index) => index);

export const timePickerModes = [TimePickerMode.HOURS, TimePickerMode.MINUTES];
