import styled, { css } from "styled-components";

export const StyledInput = styled.div<{ disabled?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    column-gap: 0.8rem;

    & > input,
    & > textarea {
        width: 100%;
        background-color: #fff;
        border: 1px solid var(--color-gray-400);
        border-radius: var(--radius-lg);
        padding: 0.5rem 1.2rem;

        ${({ disabled }) => {
            return (
                disabled &&
                css`
                    background-color: var(--color-gray-200);

                    &:hover {
                        cursor: not-allowed;
                    }
                `
            );
        }}
    }
`;

export const InputLabel = styled.label`
    margin-bottom: 1rem;
    display: block;
`;
