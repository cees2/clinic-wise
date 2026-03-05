import { capitalizeFirstLetter } from "./utils";
import { UserAuthority } from "../services/apiTypes.ts";

export const DB_DATE_FORMAT = "yyyy-MM-dd";
export const DB_DATE_FORMAT_WITH_TIME = "yyyy-MM-dd HH:mm:ss";
export const DISPLAY_DATE_FORMAT = "dd.MM.yyyy";
export const DISPLAY_DATE_FORMAT_WITH_TIME = "dd.MM.yyyy HH:mm:ss";
export const DISPLAY_DATE_FORMAT_MINUTES = "dd.MM.yyyy, HH:mm";

export const SUPPORTED_NATIONALITIES = {
    "United States": "United States",
    Canada: "Canada",
    Mexico: "Mexico",
    Germany: "Germany",
    Poland: "Poland",
    France: "France",
    Norway: "Norway",
    Italy: "Italy",
};

export const SUPPORTED_NATIONALITIES_ENTRIES = Object.entries(SUPPORTED_NATIONALITIES);

export const genderFormOptions = [
    {
        label: "Male",
        value: "MALE",
    },
    {
        label: "Female",
        value: "FEMALE",
    },
];

export const rolesFormOptions = Object.values(UserAuthority)
    .filter((role) => role !== UserAuthority.ADMIN)
    .map((role) => ({ value: role, label: capitalizeFirstLetter(role) }));

export const nationalityOptions = Object.values(SUPPORTED_NATIONALITIES).map((nationality) => ({
    label: nationality,
    value: nationality,
}));

export const emailPattern = /^\S+@\S+\.\S+$/;

const CLINIC_START_HOUR = 6;
const CLINIC_END_HOUR = 20;
export const CLINIC_WORKING_HOURS = Array.from(
    { length: CLINIC_END_HOUR - CLINIC_START_HOUR },
    (_, index) => index + CLINIC_START_HOUR,
);
export const EVERY_15_MINUTES = [0, 15, 30, 45];
export const EVERY_30_MINUTES = [0, 30];

export const SM_BREAKPOINT = "40rem";
export const MD_BREAKPOINT = "48rem";
export const LG_BREAKPOINT = "64rem";
export const XL_BREAKPOINT = "80rem";
export const xXL_BREAKPOINT = "96rem";
