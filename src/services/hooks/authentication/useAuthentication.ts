import { useMutation } from "@tanstack/react-query";
import type { LoginApi } from "../../../utils/projectTypes";
import { getSession, getUser, loginUser, logoutUser, registerUser } from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../utils/contexts/AuthContext";

export const useAuthentication = () => {
    const { setIsAuthenticated } = useAuthContext();
    const navigate = useNavigate();

    const login = useMutation({
        mutationFn: (loginData: LoginApi) => loginUser(loginData),
        onError: () => {
            toast.error("Wrong credentials provided");
        },
        onSuccess: () => {
            setIsAuthenticated(true);
            void navigate("/dashboard", { replace: true });
        },
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
        onSuccess: () => {
            setIsAuthenticated(false);
            void navigate("/login");
        },
    });

    const checkIfUserIsLoggedIn = async () => {
        let isAuthenticated = false;

        const { session: sessionData } = await getSession();

        if (sessionData?.user.role === "authenticated") isAuthenticated = true;

        const { user } = await getUser();

        if (!isAuthenticated && user.role === "authenticated") isAuthenticated = true;

        return { isAuthenticated, user };
    };

    return { login, register, logout, checkIfUserIsLoggedIn };
};
