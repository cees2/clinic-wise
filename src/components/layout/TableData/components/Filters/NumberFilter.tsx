import type { FilterCondition, NumberFilterForm } from "../../../../../utils/projectTypes";
import { Dropdown } from "../../../../common/Dropdown/Dropdown";
import { useForm } from "react-hook-form";
import { NumberInput } from "../../../../common/Input/NumberInput";

const numberFilterConditions: Exclude<FilterCondition, "c">[] = ["e", "ne", "gt", "gte", "lt", "lte"];

const NumberFilter = () => {
    const { control, watch, setValue } = useForm<NumberFilterForm>();
    const getFilterLabel = (filterType: Exclude<FilterCondition, "c">) => {
        switch (filterType) {
            case "e":
                return "Equals";
            case "ne":
                return "Does not equal";
            case "gt":
                return "Greater than";
            case "gte":
                return "Greater than or equal to";
            case "lt":
                return "Less than";
            case "lte":
                return "Less than or equal to";
            default:
                return "";
        }
    };

    return (
        <>
            {numberFilterConditions.map((condition) => {
                const onChange = () => {
                    const restConditions = numberFilterConditions.filter(
                        (filterCondition) => condition !== filterCondition,
                    );

                    restConditions.forEach((restCondition) => {
                        setValue(restCondition, "");
                    });
                };

                return (
                    <Dropdown.Item key={condition}>
                        <NumberInput
                            label={getFilterLabel(condition)}
                            control={control}
                            registerName={condition}
                            rules={{ onChange }}
                            allowNegative={false}
                        />
                    </Dropdown.Item>
                );
            })}
        </>
    );
};

export default NumberFilter;
