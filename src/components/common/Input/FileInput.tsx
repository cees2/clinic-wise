import {
    useController,
    useFormState,
    type Control,
    type FieldPath,
    type RegisterOptions,
    type UseFormRegister,
    type UseFormSetValue,
} from "react-hook-form";
import styled from "styled-components";
import { ErrorMessage } from "./common/ErrorMessage";
import { getInputFieldErrorName } from "../utils/inputs";
import { CiCircleRemove } from "react-icons/ci";
import { useRef, type ChangeEvent } from "react";

interface Props<FormType extends Record<string, any>> extends React.ComponentProps<"input"> {
    register: UseFormRegister<FormType>;
    registerName: FieldPath<FormType>;
    label: string;
    rules?: Omit<RegisterOptions<FormType>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs">;
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
    registerName,
    label,
    rules,
    control,
    withClearButton,
    setValue,
    className,
}: Props<FormType>) => {
    const { errors } = useFormState<FormType>({ control, name: registerName });
    const {
        field: { onChange, onBlur },
    } = useController({ name: registerName, control, rules });
    const isRequired = rules?.required;
    const inputErrorName = getInputFieldErrorName(errors, registerName);
    const inputRef = useRef<HTMLInputElement>(null);

    const clearFileInputHandler = () => {
        onChange(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const onChangeInternal = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.files);
    };

    return (
        <StyledFileInput className={className ?? ""}>
            <label htmlFor={registerName}>{`${label}${isRequired ? " *" : ""}`}</label>
            <input type="file" id={registerName} ref={inputRef} onChange={onChangeInternal} onBlur={onBlur} />
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
