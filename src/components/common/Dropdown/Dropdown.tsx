import React, {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { DropdownContextType } from "../../../utils/projectTypes";
import styled from "styled-components";
import { IoMdArrowDropdown } from "react-icons/io";

const DropdownContext = createContext<DropdownContextType>({
  open: false,
  setOpen: () => {},
});

const StyledDropdownToggle = styled.div`
  background-color: var(--color-gray-200);
  cursor: pointer;
  display: flex;
  align-items: center;
  column-gap: 2px;
  padding: 0.6rem 1.2rem;
  border-radius: var(--border-radius-sm);
`;

export const Dropdown = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  const memoizedContextState = useMemo(
    () => ({ open, setOpen }),
    [open, setOpen]
  );

  return (
    <DropdownContext value={memoizedContextState}>{children}</DropdownContext>
  );
};

const DropdownToggle = ({ children }: { children: React.ReactNode }) => {
  const { setOpen, open } = use(DropdownContext);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const clickOutsideHandler = useCallback(
    (event: MouseEvent) => {
      if (!open) return;

      if (event.target && !event.target.contains(dropdownRef.current)) {
        setOpen(false);
      }
    },
    [open, setOpen]
  );

  useEffect(() => {
    window.addEventListener("click", clickOutsideHandler);

    return () => {
      window.addEventListener("click", clickOutsideHandler);
    };
  }, [clickOutsideHandler]);

  return (
    <StyledDropdownToggle onClick={toggleDropdown} ref={dropdownRef}>
      {children}
      <IoMdArrowDropdown />
    </StyledDropdownToggle>
  );
};

const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
  const { open } = use(DropdownContext);

  if (!open) return null;

  return <ul>{children}</ul>;
};

const DropdownItems = <T,>({
  render,
  items,
}: {
  render: (item: T) => React.ReactNode;
  items: T[];
}) => {
  return (
    <>
      {items.map((item) => {
        return <li key={crypto.randomUUID()}>{render(item)}</li>;
      })}
    </>
  );
};

const DropdownItem = ({ children }: { children: React.ReactNode }) => {
  return <li>{children}</li>;
};

Dropdown.Toggle = DropdownToggle;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;
Dropdown.Items = DropdownItems;
