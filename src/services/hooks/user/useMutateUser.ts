import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updatePassword, updateUser } from "../../api";
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

    const mutatePassword = useMutation({
        mutationFn: updatePassword,
        onSuccess: () => {
            toast.success("The password updated successfully");
        },
        onError: () => {
            toast.error("Could not update the password");
        },
    });

    return { mutateUpdate, mutatePassword };
};
