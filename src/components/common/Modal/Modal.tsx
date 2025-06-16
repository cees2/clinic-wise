import React, { createContext, useEffect, useMemo, type MouseEvent } from "react";
import type { ModalContextType } from "../../../utils/projectTypes";
import styled from "styled-components";
import { createPortal } from "react-dom";
import { IoMdCloseCircleOutline } from "react-icons/io";

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
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50vw;
    background-color: var(--color-gray-200);
    padding: 2.4rem;
    border-radius: var(--border-radius-bg);

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
    font-weight: var(--font-weight-bold);
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
    closeable: boolean;
    onHide: () => void;
}) => {
    const memoizedContextValue = useMemo(() => ({ showModal, onHide }), [showModal, onHide]);
    const modalIndexElement = document.querySelector("#modal");

    useEffect(() => {
        if (!showModal) {
            onHide();
        }
    }, [showModal, onHide]);

    const onModalClick = (event: MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) onHide();
    };

    if (!modalIndexElement || !showModal) return null;

    return createPortal(
        <ModalContext value={memoizedContextValue}>
            <ModalBackdrop onClick={onModalClick}>
                <StyledModal aria-modal="true" role="dialog">
                    {children}
                    {closeable && <IoMdCloseCircleOutline className="close-button" onClick={onHide} />}
                </StyledModal>
            </ModalBackdrop>
        </ModalContext>,
        modalIndexElement,
    );
};

const ModalHeader = ({ children }: { children: React.ReactNode }) => {
    return <StyledModalHeader>{children}</StyledModalHeader>;
};

const ModalTitle = ({ children }: { children: React.ReactNode }) => {
    return <StyledModalTitle>{children}</StyledModalTitle>;
};

const ModalBody = ({ children }: { children: React.ReactNode }) => {
    return <StyledModalBody>{children}</StyledModalBody>;
};

const ModalFooter = ({ children }: { children: React.ReactNode }) => {
    return <StyledModalFooter>{children}</StyledModalFooter>;
};

Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
