import { addMinutes, isWithinInterval, minutesToHours } from "date-fns";
import Table from "../../../../components/common/Table/Table.tsx";
import type { Tables } from "../../../../services/database.types.ts";
import { TableVariant } from "../../../../utils/projectTypes.ts";
import { useRoomsContext } from "../../utils/RoomsContext.tsx";
import { getDateFilterFromRoomsFilters, getFilteredRooms } from "../../utils/utils.ts";

interface Props {
    roomOccupancies: Tables<"rooms_occupancy">[];
    rooms: Tables<"rooms">[];
}

const SUPPORTED_HOURS_LENGTH = 14;
const HOUR_6_AM_AS_MINUTES = 60 * 6;
const MINUTES_OF_DAYS = Array.from(
    { length: SUPPORTED_HOURS_LENGTH * 2 },
    (_, index) => HOUR_6_AM_AS_MINUTES + index * 30,
);

const RoomsTable = ({ roomOccupancies, rooms }: Props) => {
    const { filters } = useRoomsContext();
    const dateFilter = getDateFilterFromRoomsFilters(filters);
    const filteredRooms = getFilteredRooms(filters, rooms);

    const getMinuteMatchesRoomOccupancy = (minute: number, room: Tables<"rooms">) => {
        if (!dateFilter?.value) return;

        const dateFilterWithMinutes = addMinutes(new Date(dateFilter.value), minute);

        return roomOccupancies.some((roomOccupancy) => {
            const {
                start: startDateAsString,
                end: endDateAsString,
                rooms: { name: roomName },
            } = roomOccupancy;
            const start = new Date(startDateAsString);
            const end = new Date(endDateAsString);

            if (isWithinInterval(dateFilterWithMinutes, { start, end }) && roomName === room.name) {
                return true;
            }

            return false;
        });
    };

    return (
        <Table numberOfColumns={filteredRooms.length + 1} variant={TableVariant.BARE}>
            <Table.TableRow>
                <Table.TableHeaderCell columnIndex={0} />
                {filteredRooms.map(({ name }, index) => (
                    <Table.TableHeaderCell key={name} columnIndex={index + 1}>
                        {name}
                    </Table.TableHeaderCell>
                ))}
            </Table.TableRow>
            {MINUTES_OF_DAYS.map((minute) => {
                const hour = minutesToHours(minute);
                const hourMinute = minute % 60 === 30 ? "30" : "00";
                const currentTimeString = `${hour}:${hourMinute}`;

                return (
                    <Table.TableRow key={minute}>
                        <Table.TableRowCell>{currentTimeString}</Table.TableRowCell>
                        {filteredRooms.map((room) => {
                            let className = "";
                            const roomOccupancyMatchingCurrentMinute = getMinuteMatchesRoomOccupancy(minute, room);

                            if (roomOccupancyMatchingCurrentMinute) {
                                className = "bg-red-500 h-full";
                            }

                            return (
                                <Table.TableRowCell key={room.name} className={className}>
                                    <div />
                                </Table.TableRowCell>
                            );
                        })}
                    </Table.TableRow>
                );
            })}
        </Table>
    );
};

export default RoomsTable;
