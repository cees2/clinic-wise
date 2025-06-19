import Select from "react-select";
import type { Props as SelectProps } from "react-select";
import AsyncSelect from "react-select/async";
interface Props<OptionsType extends Record<string, any>, isMulti extends boolean>
    extends SelectProps<OptionsType, isMulti> {
    options?: OptionsType[];
    loadOptions?: (inputValue: string) => Promise<OptionsType[]>;
}

export const FormSelectInput = <OptionsType extends Record<string, any>, isMulti extends boolean>(
    props: Props<OptionsType, isMulti>,
) => {
    const hasPredefinedOptions = Boolean(props.options);

    return hasPredefinedOptions ? (
        <Select {...props} />
    ) : (
        <AsyncSelect
            {...props}
            onMenuOpen={() => {
                console.log("EXEc");
            }}
        />
    );
};
