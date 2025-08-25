import { useForm } from "react-hook-form";
import { Dropdown } from "../../../../common/Dropdown/Dropdown";
import { CheckboxInput } from "../../../../common/Input/CheckboxInput/CheckboxInput.tsx";
import { useTableDataContext } from "../../utils/TableDataContext";
import { FilterType, TableDataActionsEnum, type TableDataResourceType } from "../../../../../utils/projectTypes";
import { getEnumFilterDefaultValue, getFiltersConditionsWithValue } from "../../utils/filters/filtersUtils";

interface Props<T extends TableDataResourceType> {
    filterId: keyof T;
    options: Record<string, string>;
}

const EnumFilter = <T extends TableDataResourceType>({ filterId, options }: Props<T>) => {
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
        defaultValues: getEnumFilterDefaultValue<T>(filterId, selectedFilters, options),
    });
    const optionsAsEntries = Object.entries(options);

    const hideDropdownHandler = () => {
        if (!isDirty) return;

        const filterState = getFiltersConditionsWithValue(watch(), FilterType.ENUM);

        if (!filterState) {
            dispatch({ type: TableDataActionsEnum.REMOVE_FILTER, payload: filterId });
            return;
        }

        const { filterValue, filterCondition } = filterState;

        const selectedFilter = { id: filterId, filterValue, filterCondition, filterType: FilterType.ENUM };

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
