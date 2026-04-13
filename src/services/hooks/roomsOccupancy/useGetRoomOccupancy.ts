import { useQuery } from "@tanstack/react-query";
import { getRoomOccupancy } from "../../api.ts";

export const useGetRoomOccupancy = (roomOccupancyId: number) => {
    return useQuery({
        queryFn: () => getRoomOccupancy(roomOccupancyId),
        queryKey: ["roomOccupancy", roomOccupancyId],
    });
};
