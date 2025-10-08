import React, { useEffect, type MouseEvent, useRef, useState } from "react";
import type { Children } from "../../../utils/projectTypes";
import styled from "styled-components";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";

const ModalBackdrop = styled.div`
    position: fixed;
    z-index: 100;
    backdrop-filter: blur(3px);
    width: 100%;
    height: 100vh;
`;

const StyledModal = styled.div`
    @keyframes display-modal {
        0% {
            opacity: 10%;
            transform: translate(-50%, -100%);
            top: 0;
        }
        80% {
            top: 70%;
        }
        100% {
            transform: translate(-50%, -50%);
            opacity: 100%;
            top: 50%;
        }
    }

    @keyframes hide-modal {
        0% {
            opacity: 100%;
            transform: translate(-50%, -50%);
            top: 50%;
        }
        20% {
            transform: translate(-50%, -100%);
            top: 70%;
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -100%);
            top: 0;
        }
    }

    left: 50%;
    top: 50%;
    position: fixed;
    width: 90vw;
    transform: translate(-50%, -50%);
    background-color: var(--background-secondary);
    padding: 2.4rem;
    border-radius: var(--radius-2xl);
    animation: display-modal var(--duration-default) ease-out;

    &.hide-modal {
        animation: hide-modal var(--duration-default) ease-out;
    }

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

    @media (min-width: 40em) {
        width: 50vw;
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
    const [showModalInternal, setShowModalInternal] = useState(showModal);
    const [isHiding, setIsHiding] = useState(false);
    const closeModalTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const modalIndexElement = document.querySelector("#modal");

    const hideModal = () => {
        setIsHiding(true);
        closeModalTimeoutRef.current = setTimeout(() => {
            setIsHiding(false);
            onHide();
            setShowModalInternal(false);
        }, 300);
    };

    const keyDownEventHandler = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            hideModal();
        }
    };

    useEffect(() => {
        if (!showModal) {
            hideModal();
        } else {
            window.addEventListener("keydown", keyDownEventHandler);
            setShowModalInternal(true);
        }

        return () => {
            if (closeModalTimeoutRef.current) {
                clearTimeout(closeModalTimeoutRef.current);
            }
            window.addEventListener("keydown", keyDownEventHandler);
        };
    }, [showModal]);

    const onBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) hideModal();
    };

    if (!modalIndexElement || !showModalInternal) return null;

    return createPortal(
        <ModalBackdrop onClick={onBackdropClick}>
            <StyledModal
                aria-modal="true"
                role="dialog"
                className={isHiding ? "hide-modal" : ""}
                aria-hidden={!showModal}
            >
                {closeable && <IoMdClose className="close-button" onClick={hideModal} />}
                {children}
            </StyledModal>
        </ModalBackdrop>,
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
