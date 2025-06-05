import { useForm } from "react-hook-form";
import { useTableDataContext } from "../../utils/TableDataContext";
import {
    FilterType,
    TableDataActionsEnum,
    type TextFilterCondition,
    type TextFilterForm,
} from "../../../../../utils/projectTypes";
import { Dropdown } from "../../../../common/Dropdown/Dropdown";
import { TextInput } from "../../../../common/Input/TextInput";
import { getFilterDefaultValue, getFiltersConditionsWithValue } from "../../utils/filters/filtersUtils";

interface Props {
    filterId: string;
}

const numberFilterConditions: TextFilterCondition[] = ["e", "c"];

const TextFilter = ({ filterId }: Props) => {
    const {
        dispatch,
        tableDataState: { selectedFilters },
    } = useTableDataContext();
    const {
        register,
        watch,
        setValue,
        formState: { isDirty },
    } = useForm<TextFilterForm>({
        defaultValues: getFilterDefaultValue(filterId, numberFilterConditions, selectedFilters),
    });

    const getFilterLabel = (condition: TextFilterCondition) => {
        switch (condition) {
            case "e":
                return "Equals";
            case "c":
                return "Contains";
            default:
                return null;
        }
    };

    const hideDropdownHandler = () => {
        if (!isDirty) return;

        const filterState = getFiltersConditionsWithValue(watch(), FilterType.TEXT);

        if (!filterState) {
            dispatch({ type: TableDataActionsEnum.REMOVE_FILTER, payload: filterId });
            return;
        }

        const { filterValue, filterCondition } = filterState;

        const selectedFilter = { id: filterId, filterValue, filterCondition, filterType: FilterType.TEXT };

        dispatch({ type: TableDataActionsEnum.REPLACE_FILTER, payload: selectedFilter });
    };

    return (
        <Dropdown.Menu onHideDropdown={hideDropdownHandler}>
            {numberFilterConditions.map((filterCondition) => {
                const onChange = () => {
                    const conditionValueToClear: TextFilterCondition = filterCondition === "e" ? "c" : "e";

                    setValue(conditionValueToClear, "");
                };

                return (
                    <Dropdown.Item key={filterCondition}>
                        <TextInput
                            register={register}
                            registerName={filterCondition}
                            label={getFilterLabel(filterCondition) ?? ""}
                            rules={{ onChange }}
                        />
                    </Dropdown.Item>
                );
            })}
        </Dropdown.Menu>
    );
};

export default TextFilter;
