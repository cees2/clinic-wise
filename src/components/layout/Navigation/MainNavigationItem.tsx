import styled from "styled-components";
import type { MainNavigationConfigItem } from "../../../utils/projectTypes";
import { NavLink } from "react-router-dom";

interface Props {
  navigationItem: MainNavigationConfigItem;
}

const StyledMainNavigationItem = styled.a`
  &:visited,
  &:link {
    display: flex;
    align-items: center;
    column-gap: 1.6rem;
    padding: 0 1.6rem;
    font-size: 2rem;
    transition: var(--duration-fast);
    color: var(--color-gray-600);
  }

  &:hover,
  &:active {
    cursor: pointer;
    transform: scale(102%);
  }

  & > svg {
    height: 2.4rem;
    width: 2.4rem;
  }

  &:hover > svg,
  &.active {
    color: var(--color-primary);
  }
`;

const MainNavigationItem = ({ navigationItem }: Props) => {
  const { title, icon, to } = navigationItem;

  return (
    <StyledMainNavigationItem as={NavLink} to={to}>
      {icon}
      {title}
    </StyledMainNavigationItem>
  );
};

export default MainNavigationItem;
