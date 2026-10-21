import { useEffect, useRef } from "react";
import { type FormSelectInputAsyncProps } from "../../../../utils/projectTypes";
import { useController } from "react-hook-form";
import type { OnChangeValue } from "react-select";
import { getFormSelectValue, selectInputsStyles } from "../../utils/inputs";
import { AsyncPaginate } from "react-select-async-paginate";
import type { SearchSelectDataItemApi } from "../../../../services/apiTypes.ts";

const AsyncSelectInput = <
    OptionsType extends Record<string, any>,
    isMulti extends boolean,
    FormType extends Record<string, any>,
>(
    props: FormSelectInputAsyncProps<OptionsType, isMulti, FormType>,
) => {
    const { control, registerName, rules, getOptionValue, defaultValue } = props;
    const {
        field: { onChange, value, onBlur },
    } = useController({ name: registerName, control, rules });
    const selectedValueFullObject = useRef<OnChangeValue<OptionsType, isMulti> | null>(null);
    const hasMore = useRef(true);
    const inputValueRef = useRef("");

    useEffect(() => {
        if (!value) {
            selectedValueFullObject.current = null;
        }
    }, [value]);

    const onChangeInternal = (newValue: OnChangeValue<OptionsType, isMulti>) => {
        selectedValueFullObject.current = newValue;

        if (Array.isArray(newValue)) {
            const newValues = newValue.map((value) => getFormSelectValue(value, getOptionValue));
            onChange(newValues);
        } else {
            const newUpdatedValue = getFormSelectValue(newValue, getOptionValue);
            onChange(newUpdatedValue);
        }
    };

    const getAsyncSelectValue = () => {
        if (selectedValueFullObject.current) {
            return selectedValueFullObject.current;
        }

        const inputValueFromDefaultValue = getFormSelectValue(defaultValue as OptionsType, getOptionValue);

        if (inputValueFromDefaultValue?.toString() === value?.toString()) {
            return defaultValue;
        }

        return null;
    };

    const loadOptionsInternal = async (inputValue: string, options: SearchSelectDataItemApi[], additional: any) => {
        inputValueRef.current = inputValue;

        const { data, has_more } = await props.loadOptions({
            inputValue: inputValueRef.current,
            params: {size: additional.size, page: additional.page},
        });
        hasMore.current = has_more;

        return { options: data, hasMore: has_more, additional: { page: additional.page + 1, size: additional.size } };
    }

    return (
        <AsyncPaginate
            {...props}
            value={getAsyncSelectValue() ?? value}
            onChange={onChangeInternal}
            onBlur={onBlur}
            defaultOptions
            name={registerName}
            isClearable
            styles={selectInputsStyles<OptionsType, isMulti>()}
            loadOptions={loadOptionsInternal}
            additional={{page: 0, size: props.size ?? 20}}
            debounceTimeout={300}
        />
    );
};

export default AsyncSelectInput;
