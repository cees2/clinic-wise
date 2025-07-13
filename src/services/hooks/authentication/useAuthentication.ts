import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LoginApi } from "../../../utils/projectTypes";
import { getUser, loginUser, registerUser } from "../../api";
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
        onSuccess: () => void navigate("/dashboard"),
    });

    const register = useMutation({
        mutationFn: (registerData) => registerUser(registerData),
        onError: () => {
            toast.error("Wrong credentials provided");
        },
        onSuccess: () => void navigate("/dashboard"),
    });

    const logout = useMutation({
        mutationFn: (registerData) => registerUser(registerData),
        onError: () => {
            toast.error("Could not log out");
        },
        onSuccess: () => void navigate("/login"),
    });

    const checkIfUserIsLoggedIn = useCallback(async () => {
        const { user } = await queryClient.fetchQuery({
            queryFn: getUser,
            queryKey: ["user"],
        });

        return user?.role === "authenticated";
    }, [queryClient]);

    return { login, register, logout, checkIfUserIsLoggedIn };
};
