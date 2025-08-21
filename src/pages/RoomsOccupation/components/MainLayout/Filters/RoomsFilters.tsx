import { Button } from "../../../../../components/layout/Button.tsx";
import type { Tables } from "../../../../../services/database.types.ts";
import { RoomsFilterIds, RoomsTimeFilterOptionsArray, type RoomsFilter } from "../../../../../utils/projectTypes.ts";
import { useRoomsContext } from "../../../utils/RoomsContext.tsx";
import {
    getDateValueFromPredefinedTimeFilters,
    getIsPredefinedTimeFilterSelected,
    updateRoomsFilters,
} from "../../../utils/utils.ts";
import RoomsFilterComponent from "./RoomsFilter.tsx";
import { RoomsCustomDateFilter } from "./RoomsCustomDateFilter.tsx";

interface Props {
    rooms: Omit<Tables<"rooms">, "created_at">[];
}

const RoomsFilters = ({ rooms }: Props) => {
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
            <RoomsCustomDateFilter />
            <RoomsFilterComponent rooms={rooms} />
        </div>
    );
};

export default RoomsFilters;
