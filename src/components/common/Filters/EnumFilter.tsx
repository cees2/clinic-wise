import { Dropdown } from "../Dropdown/Dropdown.tsx";
import { type EnumFilterOption, type FilterState } from "../../../utils/projectTypes.ts";
import { CheckboxInputSimple } from "../Input/CheckboxInput/CheckboxInputSimple.tsx";
import { useState } from "react";

interface Props extends React.ComponentProps<"input"> {
    filterId: string;
    options: EnumFilterOption[];
    onHideDropdown: (enumFilterState: FilterState<string[], "e">) => void;
    defaultValue?: string[];
}

const EnumFilter = ({ filterId, options, onHideDropdown, defaultValue, ...restProps }: Props) => {
    const [selectedFilterState, setSelectedFilterState] = useState<FilterState<string[], "e">>({
        filterValue: defaultValue ?? [],
        filterCondition: "e",
    });

    const onChange = (selectedOption: string) => {
        setSelectedFilterState((prevSelectedFilterState) => {
            const { filterValue: prevSelectedOptions } = prevSelectedFilterState;
            const updatedSelectedOptions = [...prevSelectedOptions];

            if (updatedSelectedOptions.includes(selectedOption)) {
                const checkedOptions = updatedSelectedOptions.filter((option) => option !== selectedOption);
                return { ...prevSelectedFilterState, filterValue: checkedOptions };
            }

            return { ...prevSelectedFilterState, filterValue: [...updatedSelectedOptions, selectedOption] };
        });
    };

    if (options.length === 0) return null;

    return (
        <Dropdown.Menu onHideDropdown={() => onHideDropdown(selectedFilterState)}>
            {options.map(({ value, name }) => {
                const checked = selectedFilterState.filterValue.includes(value);

                return (
                    <Dropdown.Item key={name} onClick={() => onChange(value)}>
                        <CheckboxInputSimple
                            label={name}
                            id={name}
                            value={value}
                            onChange={() => onChange(value)}
                            checked={checked}
                            {...restProps}
                        />
                    </Dropdown.Item>
                );
            })}
        </Dropdown.Menu>
    );
};

export default EnumFilter;
