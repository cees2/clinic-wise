import React, { createContext, use, useCallback, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import type {
    DropdownContextType,
    DropdownItemsProps,
    DropdownPlacementType,
    StyledDropdownMenuProps,
} from "../../../utils/projectTypes";
import styled, { css } from "styled-components";
import { IoMdArrowDropdown } from "react-icons/io";

const DropdownContext = createContext<DropdownContextType>({
    open: false,
    setOpen: () => {},
    dropdownToggleRef: { current: {} },
    setDropdownToggleRef: () => {},
});

const StyledDropdown = styled.div`
    position: relative;
`;

const StyledDropdownToggle = styled.button`
    background-color: var(--color-gray-200);
    cursor: pointer;
    display: flex;
    align-items: center;
    column-gap: 2px;
    padding: 1rem 1.6rem;
    border-radius: var(--border-radius-sm);
    border: none;
`;

const StyledDropdownMenu = styled.ul.attrs({
    role: "menu",
})<StyledDropdownMenuProps>`
    position: absolute;
    min-width: 12rem;
    border-radius: var(--border-radius-sm);
    background-color: var(--color-gray-200);
    ${({ toggleHeight, toggleWidth, placement }) => {
        switch (placement) {
            case "top": {
                const translateValue = `-100% - ${toggleHeight}px`;
                return `transform: translateY(calc(${translateValue}));`;
            }
            case "left": {
                return css`
                    transform: translateX(-100%);
                    top: 0;
                `;
            }
            case "right":
                return css`
                    left: ${`${toggleWidth}px`};
                    top: 0;
                `;
            case "bottom":
            default:
                return css`
                    top: ${`${toggleHeight}px`};
                `;
        }
    }}
`;

const StyledDropdownItem = styled.li.attrs({ role: "menuitem" })`
    padding: 0.8rem 1.2rem;
    transition: var(--duration-fast);

    &:hover {
        cursor: pointer;
        background-color: var(--color-gray-100);
    }
`;

export const Dropdown = ({ children, placement }: { children: React.ReactNode; placement?: DropdownPlacementType }) => {
    const [open, setOpen] = useState(false);
    const dropdownToggleRef: RefObject<HTMLButtonElement> | null = useRef<HTMLButtonElement>(null);

    const setDropdownToggleRef = useCallback((originalDropdownToggleRef: RefObject<HTMLButtonElement> | null) => {
        if (dropdownToggleRef && originalDropdownToggleRef) {
            dropdownToggleRef.current = originalDropdownToggleRef.current;
        }
    }, []);
    const memoizedContextState = useMemo(
        () => ({ open, setOpen, dropdownToggleRef, setDropdownToggleRef, placement: placement ?? "bottom" }),
        [open, setOpen, dropdownToggleRef, setDropdownToggleRef, placement],
    );

    return (
        <DropdownContext value={memoizedContextState}>
            <StyledDropdown>{children}</StyledDropdown>
        </DropdownContext>
    );
};

const DropdownToggle = ({ children }: { children: React.ReactNode }) => {
    const { setOpen, open, setDropdownToggleRef } = use(DropdownContext);
    const originalDropdownToggleRef = useRef<HTMLButtonElement>(null);

    const toggleDropdown = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const clickOutsideHandler = useCallback(
        (event: MouseEvent) => {
            if (!open) return;

            if (!originalDropdownToggleRef.current?.contains(event.target)) {
                setOpen(false);
            }
        },
        [open, setOpen],
    );

    useEffect(() => {
        window.addEventListener("click", clickOutsideHandler);

        return () => {
            window.removeEventListener("click", clickOutsideHandler);
        };
    }, [clickOutsideHandler]);

    useEffect(() => {
        setDropdownToggleRef(originalDropdownToggleRef);
    }, [originalDropdownToggleRef, setDropdownToggleRef]);

    return (
        <StyledDropdownToggle onClick={toggleDropdown} ref={originalDropdownToggleRef}>
            {children}
            <IoMdArrowDropdown />
        </StyledDropdownToggle>
    );
};

const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
    const dropdownMenuRef = useRef<HTMLUListElement>(null);
    const { open, dropdownToggleRef, placement } = use(DropdownContext);

    if (!open || !dropdownToggleRef) return null;

    const { height: toggleHeight, width: toggleWidth } = dropdownToggleRef.current.getBoundingClientRect();

    return (
        <StyledDropdownMenu
            toggleHeight={toggleHeight}
            toggleWidth={toggleWidth}
            ref={dropdownMenuRef}
            placement={placement ?? "bottom"}
        >
            {children}
        </StyledDropdownMenu>
    );
};

const DropdownItems = <T,>({ render, items, onClick }: DropdownItemsProps<T>) => {
    return (
        <>
            {items.map((item) => {
                return (
                    <StyledDropdownItem key={crypto.randomUUID()} onClick={onClick}>
                        {render(item)}
                    </StyledDropdownItem>
                );
            })}
        </>
    );
};

const DropdownItem = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => {
    return <StyledDropdownItem onClick={onClick}>{children}</StyledDropdownItem>;
};

Dropdown.Toggle = DropdownToggle;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;
Dropdown.Items = DropdownItems;
