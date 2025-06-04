import { useForm } from "react-hook-form";
import { Dropdown } from "../../../../common/Dropdown/Dropdown";
import { CheckboxInput } from "../../../../common/Input/CheckboxInput";
import { useTableDataContext } from "../../utils/TableDataContext";
import { FilterType, TableDataActionsEnum } from "../../../../../utils/projectTypes";
import { getEnumFilterDefaultValue, getFiltersConditionsWithValue } from "../../utils/filters/filtersUtils";

interface Props {
    filterId: string;
    options: Record<string, string>;
}

const EnumFilter = ({ filterId, options }: Props) => {
    const {
        dispatch,
        tableDataState: { selectedFilters },
    } = useTableDataContext();
    // TODO: useForm generic type ???
    const {
        register,
        watch,
        formState: { isDirty },
    } = useForm<Record<string, string>>({
        defaultValues: getEnumFilterDefaultValue(filterId, selectedFilters, options),
    });
    const optionsAsEntries = Object.entries(options);

    const hideDropdownHandler = () => {
        if (!isDirty) return;

        const { filterValue, filterCondition } = getFiltersConditionsWithValue(watch(), FilterType.ENUM);

        const selectedFilter = { id: filterId, filterValue, filterCondition };

        dispatch({ type: TableDataActionsEnum.REPLACE_FILTER, payload: selectedFilter });
    };

    return (
        <Dropdown.Menu onHideDropdown={hideDropdownHandler}>
            {optionsAsEntries.map(([filterValue, filterTitle]) => {
                return (
                    <Dropdown.Item key={filterTitle}>
                        <CheckboxInput label={filterTitle} name={filterValue} register={register} />
                    </Dropdown.Item>
                );
            })}
        </Dropdown.Menu>
    );
};

export default EnumFilter;
