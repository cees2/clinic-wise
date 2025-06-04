import { useForm } from "react-hook-form";
import { Dropdown } from "../../../../common/Dropdown/Dropdown";
import { CheckboxInput } from "../../../../common/Input/CheckboxInput";
import { useTableDataContext } from "../../utils/TableDataContext";
import { FilterType, TableDataActionsEnum } from "../../../../../utils/projectTypes";
import { getFiltersConditionsWithValue } from "../../utils/filters/filtersUtils";

interface Props {
    filterId: string;
    options: Record<string, string>;
}

const EnumFilter = ({ filterId, options }: Props) => {
    const { dispatch, tableDataState } = useTableDataContext();
    // TODO: useForm generic type ???
    const {
        register,
        watch,
        formState: { isDirty },
    } = useForm<Record<string, string>>();
    const optionsAsEntries = Object.entries(options);

    const renderOptions = ([filterValue, filterTitle]: [string, string]) => {
        return <CheckboxInput label={filterTitle} name={filterValue} register={register} />;
    };

    const hideDropdownHandler = () => {
        if (!isDirty) return;

        const { filterValue, filterCondition } = getFiltersConditionsWithValue(watch(), FilterType.ENUM);

        const selectedFilter = { id: filterId, filterValue, filterCondition };

        dispatch({ type: TableDataActionsEnum.REPLACE_FILTER, payload: selectedFilter });
    };

    return (
        <Dropdown.Menu onHideDropdown={hideDropdownHandler}>
            <Dropdown.Items items={optionsAsEntries} render={renderOptions} />
        </Dropdown.Menu>
    );
};

export default EnumFilter;
