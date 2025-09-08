import { createContext, use, useEffect, useMemo, useState } from "react";
import type { AuthContextType, Children } from "../projectTypes";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { useGetUser } from "../../services/hooks/user/useGetUser";
import type { User } from "@supabase/supabase-js";

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    user: undefined,
    setUser: () => {},
});

export const AuthContextProvider = ({ children }: Children) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<undefined | User>(undefined);
    const { isLoading, data } = useGetUser();

    useEffect(() => {
        setIsAuthenticated(data?.isAuthenticated ?? false);
        setUser(data?.user);
    }, [data?.isAuthenticated, data?.user]);

    const memoizedAuthContext = useMemo(
        () => ({
            isAuthenticated,
            setIsAuthenticated,
            user,
            setUser,
        }),
        [isAuthenticated, setIsAuthenticated, user, setUser],
    );

    if (isLoading) return <LoadingSpinner forceDarkText />;

    return <AuthContext value={memoizedAuthContext}>{children}</AuthContext>;
};

export const useAuthContext = () => {
    const context = use(AuthContext);

    if (!context) {
        throw new Error("Context used outside its scope");
    }

    return context;
};
