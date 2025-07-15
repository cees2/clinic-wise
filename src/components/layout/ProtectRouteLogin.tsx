import type React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../utils/contexts/AuthContext";

export const ProtectRouteLogin = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoggedIn = async () => {
            if (!isAuthenticated) {
                await navigate("/login");
            }
        };

        void checkLoggedIn();
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) return null;

    return children;
};
