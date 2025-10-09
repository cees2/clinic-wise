import styled, { css } from "styled-components";
import { type MainNavigationConfigItem, MainNavigationState } from "../../../utils/projectTypes";
import { NavLink } from "react-router-dom";
import type { Dispatch, SetStateAction } from "react";

const StyledMainNavigationItem = styled.a<{ $navigationState: MainNavigationState }>`
    &:visited,
    &:link {
        display: flex;
        align-items: center;
        column-gap: 1.6rem;
        padding: 0.8rem 1.6rem;
        transition: var(--duration-fast);
    }

    & > svg {
        height: 2.4rem;
        width: 2.4rem;
    }

    &:hover,
    &.active {
        transform: scale(102%);
        color: var(--color-primary);
        font-weight: var(--font-weight-medium);
    }

    &:hover > svg,
    &.active > svg {
        color: var(--color-primary);
    }

    & > .nav-item {
        transition: all var(--duration-fast) 100ms;

        ${({ $navigationState }) => {
            return css`
                opacity: ${$navigationState === MainNavigationState.OPEN ? "1" : "0"};
                visibility: ${$navigationState === MainNavigationState.OPEN ? "visible" : "hidden"};
            `;
        }};
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
        <StyledMainNavigationItem as={NavLink} to={to} $navigationState={navigationState} onClick={clickHandler}>
            {icon}
            <span className="nav-item">{navigationState === MainNavigationState.OPEN && title}1</span>
        </StyledMainNavigationItem>
    );
};

export default MainNavigationItem;
