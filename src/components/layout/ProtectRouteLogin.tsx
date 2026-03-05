import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../utils/contexts/AuthContext";
import type { Children } from "../../utils/projectTypes";

export const ProtectRouteLogin = ({ children }: Children) => {
    const { isAuthenticated } = useAuthContext();
    const location = useLocation();

    if (!isAuthenticated) return <Navigate to="/login" replace state={location.pathname}/>;

    return children;
};
