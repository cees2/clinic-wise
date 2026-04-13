import { useQuery } from "@tanstack/react-query"
import { getRooms } from "../../api"

export const useGetRooms = () => {
    return useQuery({
        queryFn: getRooms,
        queryKey: ["rooms"]
    })
}