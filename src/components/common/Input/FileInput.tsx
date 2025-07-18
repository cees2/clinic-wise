import {
    useFormState,
    type Control,
    type FieldPath,
    type FieldValues,
    type RegisterOptions,
    type UseFormRegister,
} from "react-hook-form";
import styled from "styled-components";
import { ErrorMessage } from "./common/ErrorMessage";
import { getInputFieldErrorName } from "../utils/inputs";

interface Props<FormType extends Record<string, any>> extends InputHTMLAttributes<HTMLInputElement> {
    register: UseFormRegister<FormType>;
    registerName: FieldPath<FormType>;
    label: string;
    rules?: RegisterOptions<FieldValues, string>;
    control: Control<FormType, any, FormType>;
}

const StyledFileInput = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    & > input {
        padding: 0;
        max-width: 24rem;
    }

    & > input[type="file"]::file-selector-button {
        background-color: var(--color-primary);
        padding: 0.4rem 0.8rem;
        border-radius: 0.6rem;
        color: var(--color-gray-200);
        font-size: 1.4rem;
        transition: var(--duration-fast) ease-out;
        margin-right: 0.8rem;

        &:hover {
            cursor: pointer;
            transform: scale(105%);
        }
    }

    padding: 0;
`;

export const FileInput = <FormType extends Record<string, any>>({
    register,
    registerName,
    label,
    rules,
    control,
}: Props<FormType>) => {
    const { errors } = useFormState<FormType>({ control, name: registerName });
    const isRequired = rules?.required;
    const inputErrorName = getInputFieldErrorName(errors, registerName);

    return (
        <StyledFileInput>
            <label htmlFor={registerName}>{`${label}${isRequired ? " *" : ""}`}</label>
            <input type="file" id={registerName} {...register(registerName, rules)} />
            {inputErrorName && <ErrorMessage>{inputErrorName}</ErrorMessage>}
        </StyledFileInput>
    );
};
