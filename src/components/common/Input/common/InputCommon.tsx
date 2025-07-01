import styled from "styled-components";

export const StyledInput = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    column-gap: 0.8rem;

    & > input,
    & > textarea {
        width: 100%;
        background-color: #fff;
        border: 1px solid var(--color-gray-400);
        border-radius: var(--border-radius-sm);
        padding: 0.5rem 1.2rem;
    }
`;

export const InputLabel = styled.label`
    margin-bottom: 1rem;
    display: block;
`;
