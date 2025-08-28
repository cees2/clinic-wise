import { type FilterState, type TextFilterCondition } from "../../../utils/projectTypes.ts";
import { Dropdown } from "../Dropdown/Dropdown.tsx";
import { TextInputSimple } from "../Input/TextInput/TextInputSimple.tsx";
import { type ChangeEvent, useState } from "react";
import { getTextFilterConditionLabel } from "../../layout/TableData/utils/filters/filtersUtils.ts";

interface Props extends React.ComponentProps<"input"> {
    filterId: string;
    onHideDropdown: (textFilterState: FilterState<string | undefined, TextFilterCondition>) => void;
    defaultValue?: FilterState<string | undefined, TextFilterCondition>;
}

const numberFilterConditions: TextFilterCondition[] = ["e", "c"];

const TextFilter = ({ filterId, onHideDropdown, defaultValue, ...restProps }: Props) => {
    const [selectedFilterState, setSelectedFilterState] = useState<
        FilterState<string | undefined, TextFilterCondition>
    >({ filterValue: defaultValue?.filterValue, filterCondition: defaultValue?.filterCondition ?? "e" });

    return (
        <Dropdown.Menu onHideDropdown={() => onHideDropdown(selectedFilterState)}>
            {numberFilterConditions.map((filterCondition) => {
                const onChange = (event: ChangeEvent<HTMLInputElement>) => {
                    setSelectedFilterState({ filterValue: event.target.value, filterCondition });
                };
                const value =
                    selectedFilterState?.filterCondition === filterCondition ? selectedFilterState.filterValue : "";

                return (
                    <Dropdown.Item key={filterCondition}>
                        <TextInputSimple
                            id={filterCondition}
                            label={getTextFilterConditionLabel(filterCondition) ?? ""}
                            onChange={onChange}
                            value={value}
                            {...restProps}
                        />
                    </Dropdown.Item>
                );
            })}
        </Dropdown.Menu>
    );
};

export default TextFilter;
