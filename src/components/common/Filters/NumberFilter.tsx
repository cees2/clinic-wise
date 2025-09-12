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
    onHideDropdown: (filterData: FilterState<number | undefined, NumberFilterConditionType>) => void;
    filterDefaultValue?: FilterState<number | undefined, NumberFilterConditionType>;
}

const NumberFilter = ({ filterId, onHideDropdown, filterDefaultValue, ...restProps }: Props) => {
    const [selectedFilterState, setSelectedFilterState] = useState<
        FilterState<number | undefined, NumberFilterConditionType>
    >({
        filterValue: filterDefaultValue?.filterValue,
        filterCondition: filterDefaultValue?.filterCondition ?? "e",
    });

    return (
        <Dropdown.Menu onHideDropdown={() => onHideDropdown(selectedFilterState)}>
            {numberFilterConditions.map((condition) => {
                const onChange = ({ floatValue }: NumberFormatValues) => {
                    if (!floatValue && condition !== selectedFilterState.filterCondition) return;

                    setSelectedFilterState({
                        filterValue: floatValue,
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
