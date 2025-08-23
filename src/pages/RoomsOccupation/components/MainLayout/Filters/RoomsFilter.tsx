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
    const [selectedRoomNames, setSelectedRoomName] = useState<string[] | undefined>(undefined);
    const { setFilters } = useRoomsContext();

    const onRoomClick = ({ id, name }: Omit<Tables<"rooms">, "created_at">) => {
        setSelectedRoomName((prevRoomNames) => {
            if (!prevRoomNames) return [name];

            const newPrevRoomNames = [...prevRoomNames];
            const indexOfClickedRoomName = prevRoomNames?.indexOf(name);

            if (indexOfClickedRoomName !== -1) {
                newPrevRoomNames.splice(indexOfClickedRoomName, 1);
                return newPrevRoomNames;
            }

            return [...newPrevRoomNames, name];
        });
        setFilters((prevFilters) => {
            const roomsFilter = getRoomFilterFromRoomsFilters(prevFilters);
            const roomsFilterNewValue = updateRoomFilterValue(id.toString(), roomsFilter);
            const newFilter: RoomsFilter = { id: RoomsFilterIds.ROOM, value: roomsFilterNewValue };

            return updateRoomsFilters(prevFilters, newFilter);
        });
    };
    const toggleString = `Rooms${selectedRoomNames && selectedRoomNames.length > 0 ? `: ${selectedRoomNames.join(", ")}` : ""}`;

    return (
        <Dropdown autoClose={false}>
            <Dropdown.Toggle>
                <Dropdown.Toggle.Label>{toggleString}</Dropdown.Toggle.Label>
            </Dropdown.Toggle>
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
