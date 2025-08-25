import styled from "styled-components";

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
    return (
        <StyledCheckboxInput>
            <input type="checkbox" id={id} {...restProps} />
            <label htmlFor={id}>{label}</label>
        </StyledCheckboxInput>
    );
};
