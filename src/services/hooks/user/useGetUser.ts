import { useQuery } from "@tanstack/react-query";
import { useAuthentication } from "../authentication/useAuthentication";

export const useGetUser = () => {
    const { checkIfUserIsLoggedIn } = useAuthentication();

    const query = useQuery({
        queryFn: checkIfUserIsLoggedIn,
        queryKey: ["user"],
    });

    return query;
};
