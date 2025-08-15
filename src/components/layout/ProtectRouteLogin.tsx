import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../utils/contexts/AuthContext";
import type { Children } from "../../utils/projectTypes";

export const ProtectRouteLogin = ({ children }: Children) => {
    const { isAuthenticated } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkLoggedIn = async () => {
            if (!isAuthenticated) {
                await navigate("/login", { state: location.pathname });
            }
        };

        void checkLoggedIn();
    }, [isAuthenticated, navigate, location]);

    if (!isAuthenticated) return null;

    return children;
};
