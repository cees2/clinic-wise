import styled from "styled-components";
import { useRef } from "react";

interface Props extends React.ComponentProps<"input"> {
    label: string;
    id: string;
}

const StyledCheckboxInput = styled.div`
    display: flex;
    align-items: center;
    column-gap: 1.2rem;
`;

export const CheckboxInputSimple = ({ label, id, ...restProps }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const checkboxOptionClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.currentTarget === event.target) {
            inputRef.current?.click();
        }
    };

    return (
        <StyledCheckboxInput onClick={checkboxOptionClickHandler}>
            <input type="checkbox" id={id} ref={inputRef} {...restProps} />
            <label htmlFor={id}>{label}</label>
        </StyledCheckboxInput>
    );
};
