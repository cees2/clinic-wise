import { useQuery } from "@tanstack/react-query"
import { getRoomsOccupancyIds } from "../../api"

export const useGetRoomsOccupancy = () => {
    const query = useQuery({
        queryFn: getRoomsOccupancyIds,
        queryKey: ["rooms"]
    })

    return query
}