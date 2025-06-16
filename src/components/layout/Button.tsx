import type React from "react";
import styled, { css } from "styled-components";

interface Props {
    children: React.ReactNode;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    variant?: "primary" | "danger" | "cancel";
    disabled?: boolean;
}

const StyledButton = styled.button<Pick<Props, "variant">>`
    padding: 0.8rem 1.6rem;
    background-color: var(--color-primary);
    color: var(--color-gray-200);
    font-size: 1.4rem;
    border: none;
    border-radius: 6px;
    font-weight: var(--font-weight-bold);
    transition: var(--duration-fastest) linear;

    &:hover {
        cursor: pointer;
        ${({ variant }) => {
            switch (variant) {
                case "cancel":
                    return css`
                        background-color: var(--color-gray-300);
                    `;
                case "danger":
                    return css`
                        background-color: var(--color-danger-dark);
                    `;
                case "primary":
                default:
                    return css`
                        background-color: var(--color-primary-dark);
                    `;
            }
        }}
    }

    ${({ variant }) => {
        switch (variant) {
            case "cancel":
                return css`
                    background-color: var(--color-gray-100);
                    color: var(--color-gray-800);
                `;
            case "danger":
                return css`
                    background-color: var(--color-danger);
                `;
            case "primary":
            default:
                return css`
                    background-color: var(--color-primary);
                `;
        }
    }}
`;

export const Button = ({ children, onClick, variant, disabled }: Props) => {
    return (
        <StyledButton onClick={onClick} variant={variant} disabled={disabled}>
            {children}
        </StyledButton>
    );
};
