import { createContext, use, useEffect, useMemo, useState } from "react";
import type { AuthContextType } from "../projectTypes";
import { useAuthentication } from "../../services/hooks/authentication/useAuthentication";

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { checkIfUserIsLoggedIn } = useAuthentication();

    useEffect(() => {
        const checkLogin = async () => {
            const isLoggedIn = await checkIfUserIsLoggedIn();

            setIsAuthenticated(isLoggedIn);
        };

        void checkLogin();
    }, [setIsAuthenticated, checkIfUserIsLoggedIn]);

    const memoizedAuthContext = useMemo(
        () => ({
            isAuthenticated,
            setIsAuthenticated,
        }),
        [isAuthenticated, setIsAuthenticated],
    );

    return <AuthContext value={memoizedAuthContext}>{children}</AuthContext>;
};

export const useAuthContext = () => {
    const context = use(AuthContext);

    if (!context) {
        throw new Error("Context used outside its scope");
    }

    return context;
};
