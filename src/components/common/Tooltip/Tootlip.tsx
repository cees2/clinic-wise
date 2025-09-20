import { useState } from "react";
import styled, { css } from "styled-components";
import type { TooltipOverlayProps, tooltipPlacement, TooltipProps } from "../../../utils/projectTypes.ts";

const StyledTooltipOverlay = styled.div`
    position: relative;
`;

const StyledTooltip = styled.div.attrs({ role: "tooltip" })<{ $placement?: tooltipPlacement }>`
    position: absolute;
    padding: 1.2rem;
    background-color: var(--color-background-tertiary);
    border-radius: var(--radius-lg);

    ${({ $placement }) => {
        switch ($placement) {
            case "left":
                return css`
                    left: -0.8rem;
                    top: 50%;
                    transform: translate(-100%, -50%);
                `;
            case "right":
                return css`
                    right: -0.8rem;
                    top: 50%;
                    transform: translate(100%, -50%);
                `;
            case "bottom":
                return css`
                    bottom: -0.8rem;
                    left: 50%;
                    transform: translate(-50%, 100%);
                `;
            case "top":
            default:
                return css`
                    top: -0.8rem;
                    left: 50%;
                    transform: translate(-50%, -100%);
                `;
        }
    }};

    &::before {
        content: "";
        position: absolute;
        height: 0;
        width: 0;
        
        ${({ $placement }) => {
            switch ($placement) {
                case "left":
                    return css`
                        border-top: 0.8rem solid transparent;
                        border-bottom: 0.8rem solid transparent;
                        border-left: 0.8rem solid var(--color-gray-300);
                        right: 0;
                        top: 50%;
                        transform: translate(100%, -50%);
                    `;
                case "right":
                    return css`
                        border-top: 0.8rem solid transparent;
                        border-bottom: 0.8rem solid transparent;
                        border-right: 0.8rem solid var(--color-gray-300);
                        left: 0;
                        top: 50%;
                        transform: translate(-100%, -50%);
                    `;
                case "bottom":
                    return css`
                        top: 0;
                        left: 50%;
                        transform: translate(-50%, -100%);
                        border-left: 0.8rem solid transparent;
                        border-right: 0.8rem solid transparent;
                        border-bottom: 0.8rem solid var(--color-gray-300);
                    `;
                case "top":
                default:
                    return css`
                        border-left: 0.8rem solid transparent;
                        border-right: 0.8rem solid transparent;
                        border-top: 0.8rem solid var(--color-gray-300);
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
    return (
        <StyledTooltip $placement={placement} className={className}>
            {children}
        </StyledTooltip>
    );
};
