import { InputLabel } from "../common/InputCommon";
import { getInputFieldErrorName } from "../../utils/inputs";
import { ErrorMessage } from "../common/ErrorMessage";
import SimpleSelectInput from "./SimpleSelectInput";
import AsyncSelectInput from "./AsyncSelectInput";
import type { FormSelectInputProps } from "../../../../utils/projectTypes";
import { useFormState } from "react-hook-form";

export const FormSelectInput = <
    OptionsType extends Record<string, any>,
    isMulti extends boolean,
    FormType extends Record<string, any>,
>(
    props: FormSelectInputProps<OptionsType, isMulti, FormType>,
) => {
    const { registerName, label, control } = props;
    const hasPredefinedOptions = Boolean(props.options);
    const isRequired = props.rules?.required;
    const { errors } = useFormState<FormType>({ control, name: registerName });
    const inputErrorName = getInputFieldErrorName(errors, registerName);

    return (
        <div>
            <InputLabel htmlFor={registerName}>{`${label}${isRequired ? " *" : ""}`}</InputLabel>
            {hasPredefinedOptions ? <SimpleSelectInput {...props} /> : <AsyncSelectInput {...props} />}
            {inputErrorName && <ErrorMessage>{inputErrorName}</ErrorMessage>}
        </div>
    );
};
