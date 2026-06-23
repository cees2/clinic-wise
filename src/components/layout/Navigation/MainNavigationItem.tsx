import styled, { css } from "styled-components";
import { type MainNavigationConfigItem, MainNavigationState } from "../../../utils/projectTypes";
import { NavLink } from "react-router-dom";
import type { Dispatch, SetStateAction } from "react";

const StyledMainNavigationAnchor = styled.a<{ $navigationState: MainNavigationState }>`
    &:visited,
    &:link {
        display: flex;
        column-gap: 1.2rem;
        align-items: center;
        transition: var(--duration-fastest);
        font-size: 1.4rem;
        border-radius: var(--radius-2xl);
        padding: 0.4rem 1.2rem;

        ${({ $navigationState }) => {
            if ($navigationState === MainNavigationState.CLOSED) {
                return css`
                    padding: 0;
                    justify-content: center;
                    gap: 0;
                `;
            }
        }}
    }

    & > svg {
        height: 1.8rem;
        width: 1.8rem;
    }

    &:hover,
    &.active {
        background-color: var(--background-tertiary);

        > svg {
            color: var(--color-primary);

            ${({ $navigationState }) => {
                if ($navigationState === MainNavigationState.CLOSED) {
                    return css`
                        background-color: var(--background-tertiary);
                        border-radius: var(--radius-lg);
                        box-sizing: content-box;
                        padding: 0 0.8rem;
                    `;
                }
            }}
        }

        ${({ $navigationState }) => {
            if ($navigationState === MainNavigationState.CLOSED) {
                return css`
                    background-color: transparent;
                `;
            }
        }}
    }
`;

interface Props {
    navigationItem: MainNavigationConfigItem;
    navigationState: MainNavigationState;
    setNavigationState: Dispatch<SetStateAction<MainNavigationState>>;
}

const MainNavigationItem = ({ navigationItem, navigationState, setNavigationState }: Props) => {
    const { title, icon, to, visible } = navigationItem;

    const clickHandler = () => {
        const shouldHide = window.innerWidth < 768;

        if (shouldHide) {
            setNavigationState(MainNavigationState.CLOSED);
        }
    };

    if (visible === false) return null;

    return (
        <li className="w-full">
            <StyledMainNavigationAnchor as={NavLink} to={to} $navigationState={navigationState} onClick={clickHandler}>
                {icon}
                <span className="nav-item">{navigationState === MainNavigationState.OPEN && title}</span>
            </StyledMainNavigationAnchor>
        </li>
    );
};

export default MainNavigationItem;
