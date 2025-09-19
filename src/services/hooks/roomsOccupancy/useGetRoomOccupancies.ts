import { usePrefetchQuery, useQuery } from "@tanstack/react-query";
import { getRoomsOccupancies } from "../../api";
import { RoomsFilterIds, type RoomsFilterType } from "../../../utils/projectTypes";
import {
    getDateFilterFromRoomsFilters,
    getRoomFilterFromRoomsFilters,
} from "../../../pages/RoomsOccupancy/utils/utils.ts";
import { add, format } from "date-fns";
import { DB_DATE_FORMAT_WITH_TIME } from "../../../utils/constants.ts";

export const useGetRoomsOccupancies = (filters: RoomsFilterType[]) => {
    const dateFilter = getDateFilterFromRoomsFilters(filters);
    const roomFilter = getRoomFilterFromRoomsFilters(filters);
    const filterNextDay = dateFilter?.value ? add(new Date(dateFilter.value), { days: 1 }) : "";
    const formattedFilterNextDay = filterNextDay ? format(filterNextDay, DB_DATE_FORMAT_WITH_TIME) : "";
    const nextDayFilter = { id: RoomsFilterIds.DATE, value: formattedFilterNextDay };

    const query = useQuery({
        queryFn: () => getRoomsOccupancies(dateFilter, roomFilter),
        queryKey: ["roomOccupancies", { date: dateFilter?.value, rooms: roomFilter?.value }],
    });

    usePrefetchQuery({
        queryFn: () => getRoomsOccupancies(nextDayFilter, roomFilter),
        queryKey: ["roomOccupancies", { date: formattedFilterNextDay, rooms: roomFilter?.value }],
    });

    return query;
};
