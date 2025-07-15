import { createContext, use, useEffect, useMemo, useState } from "react";
import type { AuthContextType } from "../projectTypes";
import { useAuthentication } from "../../services/hooks/authentication/useAuthentication";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import type { User } from "@supabase/supabase-js";

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    user: undefined,
    setUser: () => {},
});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isCheckingAuthentication, setIsCheckingAuthentication] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<undefined | User>(undefined);
    const { checkIfUserIsLoggedIn } = useAuthentication();

    useEffect(() => {
        const checkLogin = async () => {
            const { isAuthenticated, user: fetchedUser } = await checkIfUserIsLoggedIn();

            setIsAuthenticated(isAuthenticated);
            setIsCheckingAuthentication(false);
            setUser(fetchedUser);
        };

        void checkLogin();
    }, [setIsAuthenticated, checkIfUserIsLoggedIn, setIsCheckingAuthentication, setUser]);

    const memoizedAuthContext = useMemo(
        () => ({
            isAuthenticated,
            setIsAuthenticated,
            user,
            setUser,
        }),
        [isAuthenticated, setIsAuthenticated, user, setUser],
    );

    if (isCheckingAuthentication) return <LoadingSpinner />;

    return <AuthContext value={memoizedAuthContext}>{children}</AuthContext>;
};

export const useAuthContext = () => {
    const context = use(AuthContext);

    if (!context) {
        throw new Error("Context used outside its scope");
    }

    return context;
};
