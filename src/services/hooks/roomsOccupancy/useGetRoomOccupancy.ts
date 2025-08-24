import { useQuery } from "@tanstack/react-query";
import { getRoomOccupancy } from "../../api.ts";

export const useGetRoomOccupancy = (roomOccupancyId: number) => {
    const query = useQuery({
        queryFn: () => getRoomOccupancy(roomOccupancyId),
        queryKey: ["roomOccupancy", roomOccupancyId],
    });

    return query;
};
