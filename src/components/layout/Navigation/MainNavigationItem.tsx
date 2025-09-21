import styled, { css } from "styled-components";
import { type MainNavigationConfigItem, MainNavigationState } from "../../../utils/projectTypes";
import { NavLink } from "react-router-dom";

interface Props {
    navigationItem: MainNavigationConfigItem;
    navigationState: MainNavigationState;
}

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

    ${({ $navigationState }) => {
        return $navigationState === MainNavigationState.OPEN && css``;
    }}
`;

const MainNavigationItem = ({ navigationItem, navigationState }: Props) => {
    const { title, icon, to, visible } = navigationItem;

    if (visible === false) return null;

    return (
        <StyledMainNavigationItem as={NavLink} to={to} $navigationState={navigationState}>
            {icon}
            {navigationState === MainNavigationState.OPEN && title}
        </StyledMainNavigationItem>
    );
};

export default MainNavigationItem;
