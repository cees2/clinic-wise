import type { FieldPath, UseFormRegister } from "react-hook-form";
import styled from "styled-components";

interface Props<T> {
    label: string;
    name: FieldPath<T>;
    register: UseFormRegister<T>;
}

const StyledCheckboxInput = styled.div`
    display: flex;
    align-items: center;
    column-gap: 1.2rem;
`;

export const CheckboxInput = <T extends Record<string, any>>({ label, name, register }: Props<T>) => {
    return (
        <StyledCheckboxInput>
            <input type="checkbox" id={name} {...register(name)} />
            <label htmlFor={name}>{label}</label>
        </StyledCheckboxInput>
    );
};
