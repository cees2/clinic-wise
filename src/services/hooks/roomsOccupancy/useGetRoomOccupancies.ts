import { usePrefetchQuery, useQuery } from "@tanstack/react-query";
import { getRoomsOccupancies } from "../../api";
import { type RoomsFilterType } from "../../../utils/projectTypes";
import {
    getDateFilterFromRoomsFilters,
    getRoomFilterFromRoomsFilters,
} from "../../../pages/RoomsOccupancy/utils/utils.ts";
import { add, format } from "date-fns";
import { DB_DATE_FORMAT } from "../../../utils/constants.ts";

export const useGetRoomsOccupancies = (filters: RoomsFilterType[]) => {
    const dateFilter = getDateFilterFromRoomsFilters(filters);
    const roomFilter = getRoomFilterFromRoomsFilters(filters);
    const filterNextDay = format(add(new Date(dateFilter), { days: 1 }), DB_DATE_FORMAT)

    const query = useQuery({
        queryFn: () => getRoomsOccupancies(dateFilter, roomFilter),
        queryKey: ["roomOccupancies", { date: dateFilter, rooms: roomFilter }],
    });

    usePrefetchQuery({
        queryFn: () => getRoomsOccupancies(filterNextDay, roomFilter),
        queryKey: ["roomOccupancies", { date: filterNextDay, rooms: roomFilter }],
    });

    return query;
};
