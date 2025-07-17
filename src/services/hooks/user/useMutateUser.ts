import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateUser } from "../../api";
import { useAuthContext } from "../../../utils/contexts/AuthContext";

export const useMutateUser = () => {
    const { setUser } = useAuthContext();

    const mutateUpdate = useMutation({
        mutationFn: updateUser,
        onSuccess: ({ user }) => {
            toast.success("The user updated successfully");
            setUser(user);
        },
        onError: () => {
            toast.error("Could not update the user");
        },
    });

    return { mutateUpdate };
};
