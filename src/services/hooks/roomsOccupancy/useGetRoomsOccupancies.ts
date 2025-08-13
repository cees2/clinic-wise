import { useQuery } from "@tanstack/react-query"
import { getRoomsOccupancies } from "../../api"

export const useGetRoomsOccupancies = () => {
    const query = useQuery({
        queryFn: getRoomsOccupancies,
        queryKey: ["roomsOccupancies"]
    })

    return query
}