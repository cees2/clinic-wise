import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../../services/hooks/authentication/useAuthentication";

export const ProtectRouteLogin = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const { checkIfUserIsLoggedIn } = useAuthentication();

    const checkLoggedIn = useCallback(async () => {
        const authenticated = await checkIfUserIsLoggedIn();

        if (authenticated) {
            setIsAuthenticated(authenticated);
        } else {
            await navigate("/login");
        }
    }, []);

    useEffect(() => void checkLoggedIn(), [checkLoggedIn]);

    if (!isAuthenticated) return null;

    return children;
};
