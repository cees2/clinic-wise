import { useQuery } from "@tanstack/react-query"
import { getRoomsOccupancies } from "../../api"

export const useGetRoomsOccupancies = (dateFilterValue?:string) => {
    const query = useQuery({
        queryFn:() =>  getRoomsOccupancies(dateFilterValue),
        queryKey: ["roomsOccupancies", dateFilterValue]
    })

    return query
}