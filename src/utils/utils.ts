import type { SupportedCountriesShortNames } from "./projectTypes";

export const getCountryShortName = (countryName: string): SupportedCountriesShortNames => {
    switch (countryName) {
        case "Poland":
            return "pl";
        case "Italy":
            return "it";
        case "Canada":
            return "ca";
        case "Germany":
            return "de";
        case "France":
            return "fr";
        case "Mexico":
            return "mx";
        case "NOrway":
            return "no";
        case "United states":
        default:
            return "us";
    }
};

export const capitalizeFirstLetter = (word: string) =>
    `${word.charAt(0).toUpperCase()}${word.substring(1).toLowerCase()}`;
