import styled, { css } from "styled-components";

type status = "SCHEDULED" | "CANCELLED" | "COMPLETED";
type variant = "error" | "warning" | "info" | "success";

interface Props {
    children: React.ReactNode;
    status: status;
}

const StyledStatus = styled.span<{ variant: variant }>`
    padding: 0.4rem 0.8rem;
    font-size: 1.2rem;
    border-radius: var(--border-radius-sm);

    ${({ variant }) => {
        if (variant === "success") {
            return css`
                background-color: var(--color-green-300);
            `;
        }

        if (variant === "info") {
            return css`
                background-color: var(--color-blue-300);
            `;
        }

        if (variant === "warning") {
            return css`
                background-color: var(--color-yellow-200);
            `;
        }
    }}
`;

const getVariant = (status: status): variant => {
    switch (status) {
        case "SCHEDULED":
            return "info";
        case "CANCELLED":
            return "warning";
        case "COMPLETED":
        default:
            return "success";
    }
};

export const Status = ({ children, status }: Props) => {
    const variant = getVariant(status);

    return <StyledStatus variant={variant}>{children}</StyledStatus>;
};
