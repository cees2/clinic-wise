import { TableDataActionsEnum, type FilterCondition, type NumberFilterForm } from "../../../../../utils/projectTypes";
import { Dropdown } from "../../../../common/Dropdown/Dropdown";
import { useForm } from "react-hook-form";
import { NumberInput } from "../../../../common/Input/NumberInput";
import { useTableDataContext } from "../../utils/TableDataContext";

interface Props {
    filterId: string;
}

const numberFilterConditions: Exclude<FilterCondition, "c">[] = ["e", "ne", "gt", "gte", "lt", "lte"];

const NumberFilter = ({ filterId }: Props) => {
    const { dispatch } = useTableDataContext();
    const { control, setValue, watch } = useForm<NumberFilterForm>();
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

    const hideDropdownHandler = () => {
        const filterState = watch();
        const filterStateAsEntries = Object.entries(filterState);
        const filterWithValue = filterStateAsEntries.filter(([_, filterValue]) => Boolean(filterValue));

        if (filterWithValue.length !== 1) return;

        const [filterCondition, filterValue] = filterWithValue.at(0);

        const selectedFilter = { id: filterId, filterValue, filterCondition };

        dispatch({ type: TableDataActionsEnum.REPLACE_FILTER, payload: selectedFilter });
    };

    return (
        <Dropdown.Menu onHideDropdown={hideDropdownHandler}>
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
        </Dropdown.Menu>
    );
};

export default NumberFilter;
