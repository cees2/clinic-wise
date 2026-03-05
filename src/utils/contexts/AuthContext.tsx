import { createContext, use, useEffect, useMemo, useState } from "react";
import type { AuthContextType, Children } from "../projectTypes";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { useGetUser } from "../../services/hooks/user/useGetUser";
import type { UserApi } from "../../services/apiTypes.ts";
import { useLocation } from "react-router-dom";

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    token: undefined,
    setToken: () => {},
    user: undefined,
    setUser: () => {},
});

export const AuthContextProvider = ({ children }: Children) => {
    const [token, setToken] = useState<string | undefined>();
    const [user, setUser] = useState<undefined | UserApi>(undefined);
    const isAuthenticated = Boolean(token && user);
    const {pathname} = useLocation();
    const { isLoading, data } = useGetUser(pathname);

    useEffect(() => {
        if(data){
            setUser(data.user);
            setToken(data.token)
        }
    }, [data?.token, data?.user]);

    const memoizedAuthContext = useMemo(
        () => ({
            isAuthenticated,
            user,
            setUser,
            token,
            setToken,
        }),
        [isAuthenticated, user, setUser, token, setToken],
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
