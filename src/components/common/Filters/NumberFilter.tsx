import { type FilterState, type NumberFilterConditionType } from "../../../utils/projectTypes.ts";
import { Dropdown } from "../Dropdown/Dropdown.tsx";
import type { NumericFormatProps } from "react-number-format";
import { NumberInputSimple } from "../Input/NumberInput/NumberInputSimple.tsx";
import { getNumberFilterConditionLabel } from "../../layout/TableData/utils/filters/filtersUtils.ts";
import { useState } from "react";
import type { NumberFormatValues } from "react-number-format/types/types";

const numberFilterConditions: NumberFilterConditionType[] = ["e", "ne", "gt", "gte", "lt", "lte"];

interface Props extends NumericFormatProps {
    filterId: string;
    onHideDropdown: (filterData?: FilterState<number, NumberFilterConditionType>) => void;
}

const NumberFilter = ({ filterId, onHideDropdown, ...restProps }: Props) => {
    const [selectedFilterState, setSelectedFilterState] = useState<
        FilterState<number, NumberFilterConditionType> | undefined
    >(undefined);

    console.log("NUMBER", selectedFilterState);
    return (
        <Dropdown.Menu onHideDropdown={() => onHideDropdown(selectedFilterState)}>
            {numberFilterConditions.map((condition) => {
                const onChange = ({ floatValue }: NumberFormatValues) => {
                    if (!floatValue) return;

                    setSelectedFilterState({
                        filterValue: floatValue ?? 0,
                        filterCondition: condition,
                    });
                };
                const value = selectedFilterState?.filterCondition === condition ? selectedFilterState.filterValue : "";

                return (
                    <Dropdown.Item key={condition}>
                        <NumberInputSimple
                            label={getNumberFilterConditionLabel(condition)}
                            id={condition}
                            onValueChange={onChange}
                            value={value}
                            valueIsNumericString
                            {...restProps}
                        />
                    </Dropdown.Item>
                );
            })}
        </Dropdown.Menu>
    );
};

export default NumberFilter;
