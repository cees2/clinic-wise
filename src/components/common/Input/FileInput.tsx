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
import { useRef, type ChangeEvent, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { DragState } from "../../../utils/projectTypes.ts";

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
    border: 2px dashed var(--color-primary);
    align-items: center;
    padding: 0.4rem 0;

    &:hover {
        cursor: pointer;
    }

    & > svg {
        width: 4.8rem;
        height: 4.8rem;
        color: var(--color-primary);
    }

    & > input[type="file"] {
        display: none;

        &::file-selector-button {
            text-align: center;
        }
    }

    //& > input[type="file"]::file-selector-button {
    //    background-color: var(--color-primary);
    //    padding: 0.4rem 0.8rem;
    //    border-radius: 0.6rem;
    //    color: var(--color-gray-200);
    //    font-size: 1.4rem;
    //    transition: var(--duration-fast) ease-out;
    //    margin-right: 0.8rem;
    //
    //    &:hover {
    //        cursor: pointer;
    //        transform: scale(105%);
    //    }
    //
    //    & > .dropzone {
    //    }
    //}
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
    const [dragState, setDragState] = useState<DragState>(DragState.NOT_DRAGGING);
    const { errors } = useFormState<FormType>({ control, name: registerName });
    const {
        field: { onChange, onBlur, value },
    } = useController({ name: registerName, control, rules });
    const isRequired = rules?.required;
    const inputErrorName = getInputFieldErrorName(errors, registerName);
    const inputRef = useRef<HTMLInputElement>(null);
    const dragCounter = useRef<number>(0);

    const getFileCaption = () => {
        if(dragState === DragState.DRAG_ENTER) {
            return "Drop file here";
        }

        if(value instanceof FileList) {
            return value[0].name;
        }

        return "Click or drop a file";
    }

    const onChangeInternal = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.files);
    };

    const inputWrapperClickHandler = () => inputRef.current?.click();

    const onDrop = (event: React.DragEvent<HTMLInputElement>) => {
        onChange(event.dataTransfer.files);
        setDragState(DragState.NOT_DRAGGING);
    };

    const onDragOver = (event: React.DragEvent<HTMLInputElement>) => {
        event.preventDefault();
    };

    const onDragEnter = () => {
        dragCounter.current++;

        if(dragCounter.current === 1) {
            setDragState(DragState.DRAG_ENTER);
        }
    };

    const onDragLeave = () => {
        dragCounter.current--;

        if(dragCounter.current === 0) {
            setDragState(DragState.DRAG_LEAVE);
        }
    };

    return (
        <StyledFileInput
            className={className ?? ""}
            onClick={inputWrapperClickHandler}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
        >
            <label htmlFor={registerName}>{`${label}${isRequired ? " *" : ""}`}</label>
            <IoCloudUploadOutline />
            <input type="file" id={registerName} onChange={onChangeInternal} onBlur={onBlur} ref={inputRef} />
            <span>{getFileCaption()}</span>
            {inputErrorName && <ErrorMessage error={inputErrorName} />}
            {/*{withClearButton && setValue && (*/}
            {/*    <ClearButton type="button" onClick={clearFileInputHandler}>*/}
            {/*        <CiCircleRemove />*/}
            {/*        Clear*/}
            {/*    </ClearButton>*/}
            {/*)}*/}
        </StyledFileInput>
    );
};
