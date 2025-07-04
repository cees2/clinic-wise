import { getCountryShortName } from "../../utils/utils";

export const NationalityWithFlag = ({ nationality }: { nationality: string }) => {
    return (
        <div className="flex items-center gap-x-4">
            <span>{nationality}</span>
            <img
                src={`https://flagcdn.com/w20/${getCountryShortName(nationality)}.png`}
                alt={`${nationality ?? ""} flag`}
            />
        </div>
    );
};
