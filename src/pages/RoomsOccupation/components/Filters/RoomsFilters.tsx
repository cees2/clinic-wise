import { Button } from "../../../../components/layout/Button";
import type { Tables } from "../../../../services/database.types";
import { RoomsFilterIds, RoomsTimeFilterOptionsArray, type RoomsFilter } from "../../../../utils/projectTypes";
import { useRoomsContext } from "../../utils/RoomsContext";
import {
    getDateValueFromPredefinedTimeFilters,
    getIsPredefinedTimeFilterSelected,
    updateRoomsFilters,
} from "../../utils/utils";
import RoomsFilterComponent from "./RoomsFilter";

interface Props{
    rooms: Omit<Tables<"rooms">, "created_at">[]
}

const RoomsFilters = ({rooms}: Props) => {
    const { filters, setFilters } = useRoomsContext();

    return (
        <div role="group" className="flex gap-x-4 mb-6">
            {RoomsTimeFilterOptionsArray.map((timeFilter) => {
                const isSelected = getIsPredefinedTimeFilterSelected(filters, timeFilter);
                const variant = isSelected ? "primary" : "cancel";

                const onClick = () => {
                    const newTimeFilter: RoomsFilter = {
                        id: RoomsFilterIds.DATE,
                        value: getDateValueFromPredefinedTimeFilters(timeFilter),
                    };

                    setFilters((filters) => {
                        return updateRoomsFilters(filters, newTimeFilter);
                    });
                };

                return (
                    <Button key={timeFilter} variant={variant} onClick={onClick}>
                        {timeFilter}
                    </Button>
                );
            })}
            <RoomsFilterComponent rooms={rooms}/>
        </div>
    );
};

export default RoomsFilters;
