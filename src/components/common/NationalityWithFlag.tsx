import { capitalizeFirstLetter, getCountryShortName } from "../../utils/utils";
import { SUPPORTED_NATIONALITY } from "../../utils/constants.ts";

export const NationalityWithFlag = ({ nationality }: { nationality?: SUPPORTED_NATIONALITY | null }) => {
    if (!nationality) return null;

    const nationalityBeautified = capitalizeFirstLetter(nationality).replace("_", " ");

    return (
        <div className="flex items-center gap-x-4">
            <span className="shrink-0">{nationalityBeautified}</span>
            <img
                src={`https://flagcdn.com/w20/${getCountryShortName(nationality)}.png`}
                alt={`${nationality ?? ""} flag`}
            />
        </div>
    );
};
