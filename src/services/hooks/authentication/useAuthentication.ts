import { useMutation } from "@tanstack/react-query";
import { getUser, loginUser, logoutUser } from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../utils/contexts/AuthContext";
import type { AuthenticationResult, LoginFormType } from "../../../utils/projectTypes.ts";
import { UserAuthority } from "../../apiTypes.ts";
import { AxiosError } from "axios";

export const useAuthentication = () => {
    const { setToken, setUser, user } = useAuthContext();
    const navigate = useNavigate();

    const login = useMutation({
        mutationFn: (loginData: LoginFormType) => loginUser(loginData),
        onError: () => {
            toast.error("Wrong credentials provided");
        },
        onSuccess: ({ token, user }) => {
            setToken(token);
            setUser(user);
            localStorage.setItem("token", token);
            void navigate("/dashboard", { replace: true });
        },
    });

    const logout = useMutation({
        mutationFn: logoutUser,
        onError: () => {
            toast.error("Could not log out");
        },
        onSuccess: () => {
            setUser(undefined);
            setToken(undefined);
            localStorage.removeItem("token");
            void navigate("/login");
        },
    });

    const checkIfUserIsLoggedIn = async (): Promise<AuthenticationResult | null> => {
        const savedToken = localStorage.getItem("token");

        if (!savedToken) return null;

        try {
            const user = await getUser(savedToken);

            return { user, token: savedToken };
        } catch (err) {
            if (err instanceof AxiosError && err.status === 401) {
                localStorage.removeItem("token");
                return null;
            }

            throw err;
        }
    };

    const hasAuthority = (authorities: UserAuthority[]) =>
        user?.authorities?.includes(UserAuthority.ADMIN) ||
        authorities.some((authority) => user?.authorities.includes(authority));

    return { login, logout, checkIfUserIsLoggedIn, hasAuthority };
};
