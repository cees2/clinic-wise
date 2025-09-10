import styled from "styled-components";
import { AppColorMode, type MainNavigationConfigItem } from "../../../utils/projectTypes";
import { NavLink } from "react-router-dom";
import { useDarkMode } from "../../../utils/hooks/useDarkMode.ts";

interface Props {
    navigationItem: MainNavigationConfigItem;
}

const StyledMainNavigationItem = styled.a<{ appMode: AppColorMode }>`
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
`;

const MainNavigationItem = ({ navigationItem }: Props) => {
    const { title, icon, to, visible } = navigationItem;
    const { appMode } = useDarkMode();

    if (visible === false) return null;

    return (
        <StyledMainNavigationItem as={NavLink} to={to} appMode={appMode}>
            {icon}
            {title}
        </StyledMainNavigationItem>
    );
};

export default MainNavigationItem;
