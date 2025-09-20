import { FiInfo } from "react-icons/fi";
import { MdWarningAmber } from "react-icons/md";
import styled, { css } from "styled-components";
import { VscError } from "react-icons/vsc";
import type { AlertProps, AlertWarning } from "../../utils/projectTypes.ts";

const StyledAlert = styled.div.attrs({ role: "status", "aria-live": "polite" })<{
    $variant?: AlertWarning;
}>`
    padding: 2rem;
    display: flex;
    align-items: flex-start;
    column-gap: 2rem;

    & > svg {
        width: 3.2rem;
        height: 3.2rem;

        ${({ $variant }) => {
            switch ($variant) {
                case "error":
                    return css`
                        fill: var(--color-red-500);
                    `;
                case "warning":
                    return css`
                        fill: var(--color-yellow-600);
                    `;
                case "info":
                default:
                    return css`
                        stroke: var(--color-teal-500);
                    `;
            }
        }}
    }

    ${({ $variant }) => {
        switch ($variant) {
            case "error":
                return css`
                    background-color: var(--color-red-100);
                    border-top: 4px solid var(--color-red-500);
                `;
            case "warning":
                return css`
                    background-color: var(--color-yellow-100);
                    border-top: 4px solid var(--color-yellow-500);
                `;
            case "info":
            default:
                return css`
                    background-color: var(--color-teal-100);
                    border-top: 4px solid var(--color-teal-500);
                `;
        }
    }}
`;

export const Alert = ({ variant, className, title, message }: AlertProps) => {
    const getSVG = () => {
        switch (variant) {
            case "error":
                return <VscError />;
            case "warning":
                return <MdWarningAmber />;
            case "info":
            default:
                return <FiInfo />;
        }
    };

    return (
        <StyledAlert className={className} $variant={variant}>
            {getSVG()}
            <div>
                {title && <h4 className="font-bold">{title}</h4>}
                {message && <span>{message}</span>}
            </div>
        </StyledAlert>
    );
};
