import styled, { css } from "styled-components";

export const StyledInput = styled.div<{ $disabled?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    column-gap: 0.8rem;

    & > input,
    & > textarea {
        background-color: var(--color-background-tertiary);
        width: 100%;
        border: 1px solid var(--color-gray-400);
        border-radius: var(--radius-lg);
        padding: 0.5rem 1.2rem;
        color: var(--color-font-primary);

        ${({ $disabled }) => {
            return (
                $disabled &&
                css`
                    background-color: var(--background-tertiary);

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
