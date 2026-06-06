import { AppColorMode, type SupportedCountriesShortNames } from "./projectTypes";
import { SUPPORTED_NATIONALITY } from "./constants.ts";

export const getCountryShortName = (countryName: SUPPORTED_NATIONALITY): SupportedCountriesShortNames => {
    console.log(countryName);
    switch (countryName) {
        case SUPPORTED_NATIONALITY.POLAND:
            return "pl";
        case SUPPORTED_NATIONALITY.ITALY:
            return "it";
        case SUPPORTED_NATIONALITY.CANADA:
            return "ca";
        case SUPPORTED_NATIONALITY.GERMANY:
            return "de";
        case SUPPORTED_NATIONALITY.FRANCE:
            return "fr";
        case SUPPORTED_NATIONALITY.MEXICO:
            return "mx";
        case SUPPORTED_NATIONALITY.NORWAY:
            return "no";
        case SUPPORTED_NATIONALITY["UNITED STATES"]:
        default:
            return "us";
    }
};

export function capitalizeFirstLetter(word: string) {
    return `${word.charAt(0).toUpperCase()}${word.substring(1).toLowerCase()}`;
}

export const toggleHTMLElementColorMode = (appMode: AppColorMode) => {
    const htmlElement: HTMLHtmlElement | null = document.querySelector("html");

    if (htmlElement) {
        if (appMode === AppColorMode.LIGHT) {
            htmlElement.classList.remove(AppColorMode.DARK);
            htmlElement.classList.add(AppColorMode.LIGHT);
        } else {
            htmlElement.classList.remove(AppColorMode.LIGHT);
            htmlElement.classList.add(AppColorMode.DARK);
        }
    }
};
