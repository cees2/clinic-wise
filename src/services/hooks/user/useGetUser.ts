import { useQuery } from "@tanstack/react-query";
import { useAuthentication } from "../authentication/useAuthentication";

export const useGetUser = (pathname: string) => {
    const { checkIfUserIsLoggedIn } = useAuthentication();

    const queryFn = () => {
        if (pathname === "/login" || pathname === "/register") return null;

        return checkIfUserIsLoggedIn();
    };

    return useQuery({
        queryFn,
        queryKey: ["me"],
    });
};
