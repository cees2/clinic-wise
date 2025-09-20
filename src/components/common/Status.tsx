import styled, { css } from "styled-components";
import { AppColorMode, type Children } from "../../utils/projectTypes";
import { useDarkMode } from "../../utils/hooks/useDarkMode.ts";

type status = "SCHEDULED" | "CANCELLED" | "COMPLETED";
type variant = "error" | "warning" | "info" | "success";

interface Props extends Children {
    status: status;
}

const StyledStatus = styled.span<{ $variant: variant; $appMode: AppColorMode }>`
    padding: 0.4rem 0.8rem;
    font-size: 1.2rem;
    border-radius: var(--radius-lg);
    font-weight: var(--font-weight-semibold);

    ${({ $variant, $appMode }) => {
        if ($variant === "success") {
            return $appMode === AppColorMode.DARK
                ? css`
                      background-color: var(--color-green-600);
                  `
                : css`
                      background-color: var(--color-green-300);
                  `;
        }

        if ($variant === "info") {
            return $appMode === AppColorMode.DARK
                ? css`
                      background-color: var(--color-blue-600);
                  `
                : css`
                      background-color: var(--color-blue-300);
                  `;
        }

        if ($variant === "warning") {
            return $appMode === AppColorMode.DARK
                ? css`
                      background-color: var(--color-yellow-600);
                  `
                : css`
                      background-color: var(--color-yellow-200);
                  `;
        }

        if ($variant === "error") {
            return $appMode === AppColorMode.DARK
                ? css`
                      background-color: var(--color-red-600);
                  `
                : css`
                      background-color: var(--color-red-300);
                  `;
        }
    }}
`;

const getVariant = (status: status): variant => {
    switch (status) {
        case "SCHEDULED":
            return "info";
        case "CANCELLED":
            return "error";
        case "COMPLETED":
        default:
            return "success";
    }
};

export const Status = ({ children, status }: Props) => {
    const variant = getVariant(status);
    const { appMode } = useDarkMode();

    return (
        <StyledStatus $variant={variant} $appMode={appMode}>
            {children}
        </StyledStatus>
    );
};
