import { Dropdown } from "../Dropdown/Dropdown.tsx";
import { type EnumFilterOption, type FilterState } from "../../../utils/projectTypes.ts";
import { useState } from "react";
import { MdOutlineDone } from "react-icons/md";

interface Props extends React.ComponentProps<"input"> {
    options: EnumFilterOption[];
    onHideDropdown: (enumFilterState: FilterState<string[], "e">) => void;
    defaultValue?: string[];
}

const EnumFilter = ({ options, onHideDropdown, defaultValue }: Props) => {
    const [selectedFilterState, setSelectedFilterState] = useState<FilterState<string[], "e">>({
        filterValue: defaultValue ?? [],
        filterCondition: "e",
    });

    const onChange = (selectedOption: string) => {
        setSelectedFilterState((prevSelectedFilterState) => {
            const { filterValue: prevSelectedOptions } = prevSelectedFilterState;

            if (prevSelectedOptions.includes(selectedOption)) {
                const checkedOptions = prevSelectedOptions.filter((option) => option !== selectedOption);
                return { ...prevSelectedFilterState, filterValue: checkedOptions };
            }

            return { ...prevSelectedFilterState, filterValue: Array.from(new Set([...prevSelectedOptions, selectedOption])) };
        });
    };

    if (options.length === 0) return null;

    return (
        <Dropdown.Menu onHideDropdown={() => onHideDropdown(selectedFilterState)}>
            {options.map(({ value, name }) => {
                const checked = selectedFilterState.filterValue.includes(value);

                return (
                    <Dropdown.Item key={name} onClick={() => onChange(value)} className="flex items-center gap-x-4">
                        <MdOutlineDone className={checked ? "" : "opacity-0 invisible"}/>
                        <span>{name}</span>
                    </Dropdown.Item>
                );
            })}
        </Dropdown.Menu>
    );
};

export default EnumFilter;
