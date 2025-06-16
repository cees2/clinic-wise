import React, { createContext, use, useCallback, useMemo, useState } from "react";
import type { ConfirmationContextType, ConfirmationType } from "./projectTypes";
import { Modal } from "../components/common/Modal/Modal";
import { Button } from "../components/layout/Button";
import styled from "styled-components";

const ConfirmationContext = createContext<ConfirmationContextType>({ confirmation: () => {} });

const ConfirmationFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    column-gap: 1.2rem;
`;

export const ConfirmationProvider = ({ children }: { children: React.ReactNode }) => {
    const [confirmationState, setConfirmationState] = useState<ConfirmationType | undefined>(undefined);
    const shouldDisplayModal = Boolean(confirmationState);
    const { onConfirm, onReject, title, caption } = confirmationState ?? {};
    const onHideModal = useCallback(() => {
        setConfirmationState(undefined);
    }, []);
    const onConfirmConfirmation = () => {
        onConfirm?.();
        onHideModal();
    };
    const onRejectConfirmation = () => {
        onReject?.();
        onHideModal();
    };
    const memoizedContextValue = useMemo(
        () => ({
            confirmation: (newConfirmationState: ConfirmationType) => {
                setConfirmationState(newConfirmationState);
            },
        }),
        [],
    );

    return (
        <ConfirmationContext value={memoizedContextValue}>
            {children}
            <Modal showModal={shouldDisplayModal} onHide={onHideModal} closeable>
                <Modal.Header>
                    <Modal.Title>{title ?? "Confirmation"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{caption ?? "Are you sure you want to perform this action?"}</Modal.Body>
                <Modal.Footer>
                    <ConfirmationFooter>
                        <Button onClick={onConfirmConfirmation} variant="danger">
                            Yes
                        </Button>
                        <Button onClick={onRejectConfirmation} variant="cancel">
                            No
                        </Button>
                    </ConfirmationFooter>
                </Modal.Footer>
            </Modal>
        </ConfirmationContext>
    );
};

export const useConfirmation = () => {
    const confirmationContext = use(ConfirmationContext);

    if (!confirmationContext) {
        throw new Error("Confirmation context used outside its scope");
    }

    return confirmationContext;
};
