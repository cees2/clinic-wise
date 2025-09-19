import type { FieldPath, UseFormRegister } from "react-hook-form";
import styled from "styled-components";

interface Props<FormType extends Record<string, any>> extends React.ComponentProps<"input"> {
    label: string;
    name: FieldPath<FormType>;
    register: UseFormRegister<FormType>;
}

const StyledCheckboxInput = styled.div`
    display: flex;
    align-items: center;
    column-gap: 1.2rem;
`;

export const CheckboxInput = <FormType extends Record<string, any>>({ label, name, register }: Props<FormType>) => {
    return (
        <StyledCheckboxInput>
            <input type="checkbox" id={name} {...register(name)} />
            <label htmlFor={name}>{label}</label>
        </StyledCheckboxInput>
    );
};
