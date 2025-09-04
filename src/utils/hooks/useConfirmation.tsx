import { use } from "react";
import { ConfirmationContext } from "../contexts/ConfirmationContext.tsx";

export const useConfirmation = () => {
    const confirmationContext = use(ConfirmationContext);

    if (!confirmationContext) {
        throw new Error("Confirmation context used outside its scope");
    }

    return confirmationContext;
};
