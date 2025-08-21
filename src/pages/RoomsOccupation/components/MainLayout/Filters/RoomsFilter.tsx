import { useState } from "react";
import { Dropdown } from "../../../../../components/common/Dropdown/Dropdown.tsx";
import type { Tables } from "../../../../../services/database.types.ts";
import { RoomsFilterIds, type RoomsFilter } from "../../../../../utils/projectTypes.ts";
import { useRoomsContext } from "../../../utils/RoomsContext.tsx";
import { getRoomFilterFromRoomsFilters, updateRoomFilterValue, updateRoomsFilters } from "../../../utils/utils.ts";

interface Props {
    rooms: Omit<Tables<"rooms">, "created_at">[];
}

const RoomsFilter = ({ rooms }: Props) => {
    const [selectedRoomName, setSelectedRoomName] = useState<string | undefined>(undefined);
    const { setFilters } = useRoomsContext();

    const onRoomClick = ({ id, name }: Omit<Tables<"rooms">, "created_at">) => {
        setSelectedRoomName(name);
        setFilters((prevFilters) => {
            const roomsFilter = getRoomFilterFromRoomsFilters(prevFilters);
            const roomsFilterNewValue = updateRoomFilterValue(id.toString(), roomsFilter);
            const newFilter: RoomsFilter = { id: RoomsFilterIds.ROOM, value: roomsFilterNewValue };

            return updateRoomsFilters(prevFilters, newFilter);
        });
    };

    return (
        <Dropdown>
            <Dropdown.Toggle>{selectedRoomName ?? "Rooms"}</Dropdown.Toggle>
            <Dropdown.Menu>
                {rooms.map((room) => {
                    return (
                        <Dropdown.Item
                            key={room.name}
                            onClick={() => {
                                onRoomClick(room);
                            }}
                        >
                            {room.name}
                        </Dropdown.Item>
                    );
                })}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default RoomsFilter;
