import React, { createContext, useEffect, useMemo, type MouseEvent } from "react";
import type { Children, ModalContextType } from "../../../utils/projectTypes";
import styled from "styled-components";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";

const ModalContext = createContext<ModalContextType>({
    showModal: false,
    onHide: () => {},
});

const ModalBackdrop = styled.div`
    position: fixed;
    z-index: 100;
    backdrop-filter: blur(3px);
    width: 100%;
    height: 100vh;
`;

const StyledModal = styled.div`
    @keyframes display-modal {
        from {
            opacity: 50%;
            transform: scale(60%) translate(-50%, -50%);
        }
        to {
            transform: scale(100%) translate(-50%, -50%);
            opacity: 100%;
        }
    }

    position: fixed;
    top: 50%;
    left: 50%;
    width: 50vw;
    transform: translate(-50%, -50%);
    background-color: var(--color-gray-200);
    padding: 2.4rem;
    border-radius: var(--radius-2xl);
    animation: display-modal var(--duration-fast) ease-out;

    & > .close-button {
        position: absolute;
        right: 0;
        top: 0;
        transform: translate(-40%, 40%);
        width: 3rem;
        height: 3rem;
        transition: var(--duration-fast);

        &:hover {
            transform: translate(-40%, 40%) scale(110%);
            cursor: pointer;
        }
    }
`;

const StyledModalHeader = styled.div`
    margin-bottom: 2.4rem;
`;

const StyledModalTitle = styled.h3`
    font-size: 2.4rem;
    font-weight: var(--font-weight-semibold);
`;

const StyledModalBody = styled.div`
    font-size: 1.8rem;
`;

const StyledModalFooter = styled.div`
    margin-top: 2.4rem;
`;

export const Modal = ({
    children,
    showModal,
    closeable,
    onHide,
}: {
    children: React.ReactNode;
    showModal: boolean;
    closeable?: boolean;
    onHide: () => void;
}) => {
    const memoizedContextValue = useMemo(() => ({ showModal, onHide }), [showModal, onHide]);
    const modalIndexElement = document.querySelector("#modal");

    useEffect(() => {
        if (!showModal) {
            onHide();
        }
    }, [showModal, onHide]);

    const onBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) onHide();
    };

    if (!modalIndexElement || !showModal) return null;

    return createPortal(
        <ModalContext value={memoizedContextValue}>
            <ModalBackdrop onClick={onBackdropClick}>
                <StyledModal aria-modal="true" role="dialog">
                    {children}
                    {closeable && <IoMdClose className="close-button" onClick={onHide} />}
                </StyledModal>
            </ModalBackdrop>
        </ModalContext>,
        modalIndexElement,
    );
};

const ModalHeader = ({ children }: Children) => {
    return <StyledModalHeader>{children}</StyledModalHeader>;
};

const ModalTitle = ({ children }: Children) => {
    return <StyledModalTitle>{children}</StyledModalTitle>;
};

const ModalBody = ({ children }: Children) => {
    return <StyledModalBody>{children}</StyledModalBody>;
};

const ModalFooter = ({ children }: Children) => {
    return <StyledModalFooter>{children}</StyledModalFooter>;
};

Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
