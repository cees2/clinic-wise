import type React from "react";
import styled, { css } from "styled-components";

interface Props {
    children: React.ReactNode;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    variant?: "primary" | "danger" | "cancel";
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
        background-color: var(--color-primary-dark);
    }

    ${({ variant }) => {
        switch (variant) {
            case "cancel":
                return css`
                    background-color: var(--color-gray-200);
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

export const Button = ({ children, onClick, variant }: Props) => {
    return (
        <StyledButton onClick={onClick} variant={variant}>
            {children}
        </StyledButton>
    );
};
