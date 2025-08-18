import { useQuery } from "@tanstack/react-query"
import { getRoomsOccupancies } from "../../api"
import type { RoomsFilter } from "../../../utils/projectTypes"

export const useGetRoomsOccupancies = (filters: RoomsFilter[]) => {
    const query = useQuery({
        queryFn:() =>  getRoomsOccupancies(filters),
        queryKey: ["roomsOccupancies", filters]
    })

    return query
}