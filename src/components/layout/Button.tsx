import styled, { css } from "styled-components";
import { type ButtonProps, type ButtonVariant } from "../../utils/projectTypes";

const StyledButton = styled.button<{ $variant?: ButtonVariant; $disabled: boolean }>`
    padding: 0.8rem 1.6rem;
    color: var(--color-gray-200);
    font-size: 1.4rem;
    border: none;
    border-radius: 6px;
    font-weight: var(--font-weight-semibold);
    transition: var(--duration-fastest) linear;

    &:hover {
        cursor: pointer;
        ${({ $variant }) => {
            switch ($variant) {
                case "danger":
                    return css`
                        background-color: var(--color-red-800);
                    `;
                case "inactive":
                    return css`
                        background-color: var(--color-background-primary);
                    `;
                case "primary":
                default:
                    return css`
                        background-color: var(--color-green-700);
                    `;
            }
        }}
    }

    ${({ $variant }) => {
        switch ($variant) {
            case "danger":
                return css`
                    background-color: var(--color-red-700);
                `;
            case "inactive":
                return css`
                    background-color: var(--color-background-tertiary);
                    color: var(--font-tertiary);
                `;
            case "primary":
            default:
                return css`
                    background-color: var(--color-primary);
                `;
        }
    }}

    ${({ $disabled }) => {
        return (
            $disabled &&
            css`
                opacity: 0.7;

                &:hover {
                    cursor: not-allowed;
                }
            `
        );
    }}
`;

export const Button = ({ children, onClick, variant, disabled, ...restProps }: ButtonProps) => {
    return (
        <StyledButton onClick={onClick} $variant={variant} $disabled={disabled} {...restProps}>
            {children}
        </StyledButton>
    );
};
