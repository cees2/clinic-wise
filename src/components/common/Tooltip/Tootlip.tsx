import { useState } from "react";
import styled, { css } from "styled-components";
import type { TooltipOverlayProps, tooltipPlacement, TooltipProps } from "../../../utils/projectTypes.ts";
import { getTooltipTriangleIcon } from "../utils/tooltip.ts";

const StyledTooltipOverlay = styled.div`
    position: relative;
`;

const StyledTooltip = styled.div.attrs({ role: "tooltip" })<{ placement?: tooltipPlacement }>`
    position: absolute;
    padding: 1.2rem;
    background-color: var(--color-gray-200);
    border-radius: var(--radius-lg);

    ${({ placement }) => {
        switch (placement) {
            case "left":
                return css`
                    left: -1.6rem;
                    top: 50%;
                    transform: translate(-100%, -50%);
                `;
            case "right":
                return css`
                    right: -1.6rem;
                    top: 50%;
                    transform: translate(100%, -50%);
                `;
            case "bottom":
                return css`
                    bottom: -1.6rem;
                    left: 50%;
                    transform: translate(-50%, 100%);
                `;
            case "top":
            default:
                return css`
                    top: -1.6rem;
                    left: 50%;
                    transform: translate(-50%, -100%);
                `;
        }
    }};

    & > .tooltip-triangle-icon {
        position: absolute;
        height: 2.4rem;
        width: 2.4rem;

        ${({ placement }) => {
            switch (placement) {
                case "left":
                    return css`
                        right: 0;
                        top: 50%;
                        transform: translate(100%, -50%);
                    `;
                case "right":
                    return css`
                        left: 0;
                        top: 50%;
                        transform: translate(-100%, -50%);
                    `;
                case "bottom":
                    return css`
                        top: 0;
                        left: 50%;
                        transform: translate(-50%, -100%);
                    `;
                case "top":
                default:
                    return css`
                        left: 50%;
                        bottom: 0;
                        transform: translate(-50%, 100%);
                    `;
            }
        }}
`;

export const TooltipOverlay = ({ children, Tooltip, className, show, showOnHover }: TooltipOverlayProps) => {
    const [hoverShow, setHoverShow] = useState(false);

    const mouseEnterHandler = () => {
        if (showOnHover) {
            setHoverShow(true);
        }
    };

    const mouseLeaveHandler = () => {
        if (hoverShow) {
            setHoverShow(false);
        }
    };

    return (
        <StyledTooltipOverlay className={className} onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
            {children}
            {(show || hoverShow) && Tooltip}
        </StyledTooltipOverlay>
    );
};

export const Tooltip = ({ placement, children, className }: TooltipProps) => {
    const TriangleIcon = getTooltipTriangleIcon(placement);

    return (
        <StyledTooltip placement={placement} className={className}>
            <TriangleIcon className="tooltip-triangle-icon" />
            {children}
        </StyledTooltip>
    );
};
