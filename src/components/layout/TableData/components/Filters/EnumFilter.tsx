import { useForm } from "react-hook-form";
import { Dropdown } from "../../../../common/Dropdown/Dropdown";
import { CheckboxInput } from "../../../../common/Input/CheckboxInput";
import { useTableDataContext } from "../../utils/TableDataContext";
import { TableDataActionsEnum } from "../../../../../utils/projectTypes";

interface Props {
    filterId: string;
    options: Record<string, string>;
}

const EnumFilter = ({ filterId, options }: Props) => {
    const { dispatch } = useTableDataContext();
    const { register, watch } = useForm<Record<string, string>>();
    const optionsAsEntries = Object.entries(options);

    const renderOptions = ([filterValue, filterTitle]: [string, string]) => {
        return <CheckboxInput label={filterTitle} name={filterValue} register={register} />;
    };

    const hideDropdownHandler = () => {
        const filterState = watch();
        const filterStateAsEntries = Object.entries(filterState);
        const filterWithFilteredValue = filterStateAsEntries.filter(([_, filterValue]) => Boolean(filterValue));
        const selectedOptions = filterWithFilteredValue.map(([option]) => option).join(",");

        const selectedFilter = { id: filterId, filterValue: selectedOptions, filterCondition: "e" };

        dispatch({ type: TableDataActionsEnum.REPLACE_FILTER, payload: selectedFilter });
    };

    return (
        <Dropdown.Menu onHideDropdown={hideDropdownHandler}>
            <Dropdown.Items items={optionsAsEntries} render={renderOptions} />
        </Dropdown.Menu>
    );
};

export default EnumFilter;
