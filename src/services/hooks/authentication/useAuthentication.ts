import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LoginApi } from "../../../utils/projectTypes";
import { getSession, getUser, loginUser, logoutUser, registerUser } from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export const useAuthentication = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const login = useMutation({
        mutationFn: (loginData: LoginApi) => loginUser(loginData),
        onError: () => {
            toast.error("Wrong credentials provided");
        },
        onSuccess: () => void navigate("/dashboard", { replace: true }),
    });

    const register = useMutation({
        mutationFn: (registerData) => registerUser(registerData),
        onError: () => {
            toast.error("Wrong credentials provided");
        },
        onSuccess: () => void navigate("/dashboard"),
    });

    const logout = useMutation({
        mutationFn: logoutUser,
        onError: () => {
            toast.error("Could not log out");
        },
        onSuccess: () => void navigate("/login"),
    });

    const checkIfUserIsLoggedIn = useCallback(async () => {
        const { session } = await queryClient.fetchQuery({
            queryFn: getSession,
            queryKey: ["session"],
        });

        if (!session) return false;

        if (session.user.role === "authenticated") return true;

        const { user } = await queryClient.fetchQuery({
            queryFn: getUser,
            queryKey: ["user"],
        });

        return user.role === "authenticated";
    }, [queryClient]);

    return { login, register, logout, checkIfUserIsLoggedIn };
};
