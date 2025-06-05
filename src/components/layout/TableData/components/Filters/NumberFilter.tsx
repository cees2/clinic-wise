import {
    FilterType,
    TableDataActionsEnum,
    type FilterCondition,
    type NumberFilterForm,
} from "../../../../../utils/projectTypes";
import { Dropdown } from "../../../../common/Dropdown/Dropdown";
import { useForm } from "react-hook-form";
import { NumberInput } from "../../../../common/Input/NumberInput";
import { useTableDataContext } from "../../utils/TableDataContext";
import { getFilterDefaultValue, getFiltersConditionsWithValue } from "../../utils/filters/filtersUtils";

interface Props {
    filterId: string;
}

const numberFilterConditions: Exclude<FilterCondition, "c">[] = ["e", "ne", "gt", "gte", "lt", "lte"];

const NumberFilter = ({ filterId }: Props) => {
    const {
        dispatch,
        tableDataState: { selectedFilters },
    } = useTableDataContext();
    const {
        control,
        setValue,
        watch,
        formState: { isDirty },
    } = useForm<NumberFilterForm>({
        defaultValues: getFilterDefaultValue(filterId, numberFilterConditions, selectedFilters),
    });
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
        if (!isDirty) return;

        const filterState = getFiltersConditionsWithValue(watch(), FilterType.NUMBER);

        if (!filterState) {
            dispatch({ type: TableDataActionsEnum.REMOVE_FILTER, payload: filterId });
            return;
        }

        const { filterValue, filterCondition } = filterState;

        const selectedFilter = { id: filterId, filterValue, filterCondition };

        dispatch({ type: TableDataActionsEnum.REPLACE_FILTER, payload: selectedFilter, filterType: FilterType.NUMBER });
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
