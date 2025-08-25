const CLINIC_START_HOUR = 6;
const CLINIC_END_HOUR = 20;
export const ROOM_OCCUPATION_HOURS = Array.from(
    { length: CLINIC_END_HOUR - CLINIC_START_HOUR },
    (_, index) => index + CLINIC_START_HOUR,
);
export const ROOM_OCCUPATION_MINUTES = [0, 30];
