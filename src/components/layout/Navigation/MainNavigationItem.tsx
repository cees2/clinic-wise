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
    transition: var(--duration-fast);
    color: var(--color-gray-600);
  }

  & > svg {
    height: 2rem;
    width: 2rem;
  }

  &:hover,
  &.active {
    transform: scale(102%);
    color: var(--color-gray-800);
    font-weight: var(--font-weight-normal);
  }

  &:hover > svg,
  &.active > svg {
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
