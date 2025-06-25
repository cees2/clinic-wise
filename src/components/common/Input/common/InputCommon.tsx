import styled from "styled-components";

export const StyledInput = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    column-gap: 0.8rem;

    & > input {
        width: 100%;
    }
`;

export const InputLabel = styled.label`
    margin-bottom: 1.2rem;
`;
