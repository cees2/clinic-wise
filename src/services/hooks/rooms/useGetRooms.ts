import { useQuery } from "@tanstack/react-query"
import { getRooms } from "../../api"

export const useGetRooms = () => {
    const query = useQuery({
        queryFn: getRooms,
        queryKey: ["rooms"]
    })

    return query
}