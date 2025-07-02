import styled, { css } from "styled-components";
import type { ButtonProps } from "../../utils/projectTypes";

const StyledButton = styled.button<ButtonProps>`
    padding: 0.8rem 1.6rem;
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

export const Button = ({ children, onClick, variant, disabled, ...restProps }: ButtonProps) => {
    return (
        <StyledButton onClick={onClick} variant={variant} disabled={disabled} {...restProps}>
            {children}
        </StyledButton>
    );
};
