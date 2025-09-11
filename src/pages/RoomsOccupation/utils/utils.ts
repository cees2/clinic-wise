import { add, differenceInDays, endOfToday, format, isToday, isTomorrow, startOfDay, startOfToday } from "date-fns";
import {
    RoomDateFilters,
    RoomsFilterIds,
    type RoomOccupationFormType,
    type RoomsFilterType,
    type RoomsResponseType,
} from "../../../utils/projectTypes";
import { DB_DATE_FORMAT_WITH_TIME } from "../../../utils/constants";
import type { Tables } from "../../../services/database.types";

export const getDateValueFromPredefinedTimeFilters = (timeFilter: RoomDateFilters) => {
    let date: Date | null = null;

    switch (timeFilter) {
        case RoomDateFilters.TOMORROW: {
            date = startOfDay(add(new Date(), { days: 1 }));
            break;
        }
        case RoomDateFilters.TODAY:
        default: {
            date = startOfToday();
            break;
        }
    }

    return format(date, DB_DATE_FORMAT_WITH_TIME);
};

export const updateRoomsFilters = (filters: RoomsFilterType[], newFilter: RoomsFilterType) => {
    const newFilters = [...filters];
    const indexOfFilterWithGivenId = filters.findIndex((filter) => filter.id === newFilter.id);

    if (indexOfFilterWithGivenId !== -1) {
        newFilters.splice(indexOfFilterWithGivenId, 1);
    }

    newFilters.push(newFilter);

    return newFilters;
};

export const getDayOffsetStringDate = (dayOffset: number) => {
    const todayStart = startOfToday();
    const startOfOffsetDay = add(todayStart, { days: dayOffset });

    return format(startOfOffsetDay, DB_DATE_FORMAT_WITH_TIME);
};

export const getDaysOffsetFromADate = (dateFilter?: string) => {
    return differenceInDays(new Date(dateFilter ?? Date.now()), startOfToday());
};

export const getDateFilterFromRoomsFilters = (filters: RoomsFilterType[]) => {
    return filters.find((filter) => filter.id === RoomsFilterIds.DATE);
};
export const getRoomFilterFromRoomsFilters = (filters: RoomsFilterType[]) => {
    return filters.find((filter) => filter.id === RoomsFilterIds.ROOM);
};

export const getIsPredefinedTimeFilterSelected = (filters: RoomsFilterType[], timeFilter: RoomDateFilters) => {
    const dateFilter = filters.find((filter) => filter.id === RoomsFilterIds.DATE);

    if (!dateFilter) return false;

    const { value } = dateFilter;
    const filterValueAsDate = new Date(value);

    switch (timeFilter) {
        case RoomDateFilters.TOMORROW: {
            return isTomorrow(filterValueAsDate);
        }
        case RoomDateFilters.TODAY: {
            return isToday(filterValueAsDate);
        }
        default: {
            return false;
        }
    }
};

export const getFilteredRooms = (filters: RoomsFilterType[], rooms?: RoomsResponseType[]): RoomsResponseType[] => {
    const roomsFilter = getRoomFilterFromRoomsFilters(filters);

    if (!roomsFilter) return rooms ?? [];

    const roomsIds = roomsFilter.value.split(",");

    return rooms?.filter((room) => roomsIds.includes(room.id.toString())) ?? [];
};

export const updateRoomFilterValue = (id: string, roomsFilter?: RoomsFilterType) => {
    if (!roomsFilter) return id;

    const { value } = roomsFilter;
    const roomsIdsArray = value.split(",");
    const indexOfId = roomsIdsArray.indexOf(id);

    if (indexOfId === -1) {
        roomsIdsArray.push(id);
    } else {
        roomsIdsArray.splice(indexOfId, 1);
    }

    return roomsIdsArray.join(",");
};

export const getRoomsOccupancyFormDefaultValues = (
    roomsOccupancyData?: Tables<"rooms_occupancy">,
): Partial<RoomOccupationFormType> => {
    return {
        room_id: roomsOccupancyData?.room_id,
        start: roomsOccupancyData?.start ?? format(startOfToday(), DB_DATE_FORMAT_WITH_TIME),
        end: roomsOccupancyData?.end ?? format(endOfToday(), DB_DATE_FORMAT_WITH_TIME),
        employee_id: roomsOccupancyData?.employee_id,
    };
};
