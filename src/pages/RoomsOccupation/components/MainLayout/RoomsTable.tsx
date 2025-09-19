import { addMinutes, isWithinInterval, minutesToHours } from "date-fns";
import Table from "../../../../components/common/Table/Table.tsx";
import { type RoomsOccupanciesResponseType, type RoomsResponseType } from "../../../../utils/projectTypes.ts";
import { useRoomsContext } from "../../utils/RoomsContext.tsx";
import { getDateFilterFromRoomsFilters, getFilteredRooms } from "../../utils/utils.ts";
import { LoadingSpinner } from "../../../../components/common/LoadingSpinner.tsx";
import { Tooltip, TooltipOverlay } from "../../../../components/common/Tooltip/Tootlip.tsx";
import { useNavigate } from "react-router-dom";

interface Props {
    roomOccupancies?: RoomsOccupanciesResponseType[];
    rooms?: RoomsResponseType[];
    roomOccupanciesLoading: boolean;
    roomsLoading: boolean;
}

const SUPPORTED_HOURS_LENGTH = 14;
const HOUR_6_AM_AS_MINUTES = 60 * 6;
const MINUTES_OF_DAYS = Array.from(
    { length: SUPPORTED_HOURS_LENGTH * 2 },
    (_, index) => HOUR_6_AM_AS_MINUTES + index * 30,
);

const RoomsTable = ({ roomOccupancies, rooms, roomOccupanciesLoading, roomsLoading }: Props) => {
    const { filters } = useRoomsContext();
    const dateFilter = getDateFilterFromRoomsFilters(filters);
    const filteredRooms = getFilteredRooms(filters, rooms);
    const navigate = useNavigate();

    const getRoomOccupancyMatchesCurrentData = (minute: number, room: RoomsResponseType) => {
        if (!dateFilter?.value) return;

        const dateFilterWithMinutes = addMinutes(new Date(dateFilter.value), minute);

        return roomOccupancies?.find((roomOccupancy) => {
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
        });
    };

    if (roomOccupanciesLoading || roomsLoading) return <LoadingSpinner />;

    return (
        <Table gridTemplateColumns={`7rem repeat(${filteredRooms?.length ?? 0}, 1fr)`}>
            <Table.TableRow>
                <Table.TableHeaderCell columnIndex={0} />
                {filteredRooms?.map(({ name }, index) => (
                    <Table.TableHeaderCell key={name} columnIndex={index + 1} className="text-center">
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
                            const roomOccupancyMatchingCurrentMinute = getRoomOccupancyMatchesCurrentData(minute, room);

                            const currentCellClickHandler = async () => {
                                if (!roomOccupancyMatchingCurrentMinute) return;

                                const { id } = roomOccupancyMatchingCurrentMinute;

                                await navigate(`/room-occupancies/${id}/edit`);
                            };

                            if (roomOccupancyMatchingCurrentMinute) {
                                const tableCellClassName =
                                    "bg-red-500 h-full hover:cursor-pointer hover:bg-red-400 hover:transition-all hover:duration-100";
                                const tooltip = (
                                    <Tooltip>
                                        <span className="text-xl text-nowrap">
                                            Employee
                                            <span className="text-green-700">
                                                {`: ${roomOccupancyMatchingCurrentMinute.employees.name} ${roomOccupancyMatchingCurrentMinute.employees.surname}`}
                                            </span>
                                        </span>
                                    </Tooltip>
                                );

                                return (
                                    <TooltipOverlay
                                        Tooltip={tooltip}
                                        key={`${room.name}_${room.id}_${minute}`}
                                        showOnHover
                                    >
                                        <Table.TableRowCell
                                            className={tableCellClassName}
                                            onClick={() => void currentCellClickHandler()}
                                        >
                                            &nbsp;
                                        </Table.TableRowCell>
                                    </TooltipOverlay>
                                );
                            }

                            return (
                                <Table.TableRowCell key={`${room.name}_${room.id}_${minute}`}>
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
