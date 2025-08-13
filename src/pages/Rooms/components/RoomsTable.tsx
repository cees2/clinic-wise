import { minutesToHours } from "date-fns";
import Table from "../../../components/common/Table/Table";
import type { Tables } from "../../../services/database.types";

interface Props {
    roomsOccupancies: Tables<"rooms_occupancy">[];
    rooms: Tables<"rooms">[];
}

const SUPPORTED_HOURS_LENGTH = 14;
const HOUR_6_AM_AS_MINUTES = 60 * 6;
const MINUTES_OF_DAYS = Array.from(
    { length: SUPPORTED_HOURS_LENGTH * 2 },
    (_, index) => HOUR_6_AM_AS_MINUTES + index * 30,
);

const RoomsTable = ({ roomsOccupancies, rooms }: Props) => {
    console.log(roomsOccupancies);
    console.log(rooms);
    const tableColumns = [{ name: "empty" }, ...rooms];

    return (
        <Table numberOfColumns={tableColumns.length}>
            <Table.TableRow>
                {tableColumns.map(({ name }, index) => (
                    <Table.TableHeaderCell key={name} columnIndex={index}>
                        {name === "empty" ? "" : name}
                    </Table.TableHeaderCell>
                ))}
            </Table.TableRow>
            {MINUTES_OF_DAYS.map((minute) => {
                const hour = minutesToHours(minute);
                const hourMinute = minute % 60 === 30 ? "30" : "00";
                const currentTimeString = `${hour}:${hourMinute}`;

                return (
                    <Table.TableRow key={minute}>
                        {tableColumns.map((column, index) => {
                            const isTimeCell = index === 0;
                            let cellContent = "ddd";

                            if (isTimeCell) {
                                cellContent = currentTimeString;
                            }

                            return <Table.TableRowCell key={column.name}>{cellContent}</Table.TableRowCell>;
                        })}
                    </Table.TableRow>
                );
            })}
        </Table>
    );
};

export default RoomsTable;
