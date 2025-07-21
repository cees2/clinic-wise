import {
    useFormState,
    type Control,
    type FieldPath,
    type FieldValues,
    type RegisterOptions,
    type UseFormRegister,
    type UseFormSetValue,
} from "react-hook-form";
import styled from "styled-components";
import { ErrorMessage } from "./common/ErrorMessage";
import { getInputFieldErrorName } from "../utils/inputs";
import { CiCircleRemove } from "react-icons/ci";
import { useRef } from "react";

interface Props<FormType extends Record<string, any>> extends InputHTMLAttributes<HTMLInputElement> {
    register: UseFormRegister<FormType>;
    registerName: FieldPath<FormType>;
    label: string;
    rules?: RegisterOptions<FieldValues, string>;
    control: Control<FormType, any, FormType>;
    withClearButton?: true;
    setValue?: UseFormSetValue<FormType>;
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

const ClearButton = styled.button`
    border: 1px solid var(--color-red-600);
    color: var(--color-red-600);
    padding: 0.2rem 0.4rem;
    font-size: 1.2rem;
    border-radius: 0.6rem;
    display: flex;
    align-items: center;
    column-gap: 1rem;
    width: max-content;
`;

export const FileInput = <FormType extends Record<string, any>>({
    register,
    registerName,
    label,
    rules,
    control,
    withClearButton,
    setValue,
}: Props<FormType>) => {
    const { errors } = useFormState<FormType>({ control, name: registerName });
    const isRequired = rules?.required;
    const inputErrorName = getInputFieldErrorName(errors, registerName);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const clearFileInputHandler = () => {
        if (setValue) {
            setValue(registerName, null);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <StyledFileInput>
            <label htmlFor={registerName}>{`${label}${isRequired ? " *" : ""}`}</label>
            <input
                type="file"
                id={registerName}
                {...register(registerName, rules)}
                ref={(element) => {
                    register(registerName, rules).ref(element);
                    fileInputRef.current = element;
                }}
            />
            {inputErrorName && <ErrorMessage>{inputErrorName}</ErrorMessage>}
            {withClearButton && setValue && (
                <ClearButton type="button" onClick={clearFileInputHandler}>
                    <CiCircleRemove />
                    Clear
                </ClearButton>
            )}
        </StyledFileInput>
    );
};
