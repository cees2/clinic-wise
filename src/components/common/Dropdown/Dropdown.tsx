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
    isOpening: false,
    setIsOpening: () => {},
    placement: "bottom",
    autoClose: true,
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

export const Dropdown = ({
    children,
    placement,
    autoClose,
}: {
    children: React.ReactNode;
    placement?: DropdownPlacementType;
    autoClose?: boolean;
}) => {
    const [open, setOpen] = useState(false);
    const [isOpening, setIsOpening] = useState(false);
    const dropdownToggleRef: RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>(null);

    const setDropdownToggleRef = useCallback((originalDropdownToggleRef: RefObject<HTMLButtonElement> | null) => {
        if (originalDropdownToggleRef) {
            dropdownToggleRef.current = originalDropdownToggleRef.current;
        }
    }, []);

    const memoizedContextState = useMemo(
        () => ({
            open,
            setOpen,
            dropdownToggleRef,
            setDropdownToggleRef,
            placement: placement ?? "bottom",
            isOpening,
            setIsOpening,
            autoClose: autoClose ?? true,
        }),
        [open, setOpen, dropdownToggleRef, setDropdownToggleRef, placement, isOpening, setIsOpening, autoClose],
    );

    return (
        <DropdownContext value={memoizedContextState}>
            <StyledDropdown>{children}</StyledDropdown>
        </DropdownContext>
    );
};

const DropdownToggle = ({ children }: { children: React.ReactNode }) => {
    const { setOpen, setDropdownToggleRef, setIsOpening } = use(DropdownContext);
    const originalDropdownToggleRef = useRef<HTMLButtonElement>(null);

    const toggleDropdown = () => {
        setOpen((prevOpen) => !prevOpen);
        setIsOpening(true);
    };

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

const DropdownMenu = ({ children, onHideDropdown }: { children: React.ReactNode; onHideDropdown?: () => void }) => {
    const dropdownMenuRef = useRef<HTMLUListElement>(null);
    const { open, setOpen, isOpening, setIsOpening, dropdownToggleRef, placement } = use(DropdownContext);

    const clickOutsideHandler = useCallback(
        (event: MouseEvent) => {
            if (!open) return;

            if (!isOpening && !dropdownMenuRef.current?.contains(event.target as Node)) {
                onHideDropdown?.();
                setOpen(false);
            }

            setIsOpening(false);
        },
        [open, setOpen, isOpening, setIsOpening, onHideDropdown],
    );

    useEffect(() => {
        window.addEventListener("click", clickOutsideHandler);

        return () => {
            window.removeEventListener("click", clickOutsideHandler);
        };
    }, [clickOutsideHandler]);

    if (!open || !dropdownToggleRef) return null;

    const { height: toggleHeight, width: toggleWidth } = dropdownToggleRef.current.getBoundingClientRect();

    return (
        <StyledDropdownMenu
            toggleHeight={toggleHeight}
            toggleWidth={toggleWidth}
            ref={dropdownMenuRef}
            placement={placement}
        >
            {children}
        </StyledDropdownMenu>
    );
};

const DropdownItems = <T,>({ render, items, onClick }: DropdownItemsProps<T>) => {
    const { autoClose, setOpen } = use(DropdownContext);

    const onClickInternal = (event: React.MouseEvent<HTMLLIElement>) => {
        onClick?.(event);
        if (autoClose) {
            setOpen(false);
        }
    };

    return (
        <>
            {items.map((item) => {
                return (
                    <StyledDropdownItem key={crypto.randomUUID()} onClick={onClickInternal}>
                        {render(item)}
                    </StyledDropdownItem>
                );
            })}
        </>
    );
};

const DropdownItem = ({
    children,
    onClick,
}: {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLLIElement>) => void;
}) => {
    const { autoClose, setOpen } = use(DropdownContext);

    const onClickInternal = (event: React.MouseEvent<HTMLLIElement>) => {
        onClick?.(event);
        if (autoClose) {
            setOpen(false);
        }
    };

    return <StyledDropdownItem onClick={onClickInternal}>{children}</StyledDropdownItem>;
};

Dropdown.Toggle = DropdownToggle;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;
Dropdown.Items = DropdownItems;
