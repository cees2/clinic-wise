import { UserRole } from "./projectTypes";
import { capitalizeFirstLetter } from "./utils";

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

export const genderFormOptions = [
    {
        label: "Male",
        value: "male",
    },
    {
        label: "Female",
        value: "female",
    },
];

export const rolesFormOptions = Object.values(UserRole)
    .filter((role) => role !== UserRole.ADMIN)
    .map((role) => ({ value: role, label: capitalizeFirstLetter(role) }));

export const nationalityOptions = Object.values(SUPPORTED_NATIONALITIES).map((nationality) => ({
    label: nationality,
    value: nationality,
}));

export const emailPattern = /^\S+@\S+\.\S+$/;
