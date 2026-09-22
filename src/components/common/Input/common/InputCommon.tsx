import styled, { css } from "styled-components";

export const StyledInput = styled.div<{ $disabled?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    column-gap: 0.8rem;
    position: relative;

    & > input,
    & > textarea {
        background-color: var(--color-background-tertiary);
        width: 100%;
        border: 1px solid var(--color-gray-400);
        border-radius: var(--radius-lg);
        padding: 0.5rem 2.4rem;
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

export const IconWrapper = styled.div`
    position: relative;
    
    & > svg {
        position: absolute;
        left: 1rem;
        top: 50%;
        width: 1.6rem;
        height: 1.6rem;
        transform: translateY(-50%);
    }
    
    & > input {
        padding-left: 3.6rem;
    }
`;

export const InputLabel = styled.label`
    margin-bottom: 1rem;
    display: block;
`;
