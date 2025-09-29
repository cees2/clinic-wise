import { Button } from "../../../../../components/layout/Button.tsx";
import type { Tables } from "../../../../../services/database.types.ts";
import {
    RoomsFilterIds,
    RoomsTimeFilterOptionsArray,
    type RoomsFilterType,
} from "../../../../../utils/projectTypes.ts";
import { useRoomsContext } from "../../../utils/RoomsContext.tsx";
import {
    getDateValueFromPredefinedTimeFilters,
    getIsPredefinedTimeFilterSelected,
    updateRoomsFilters,
} from "../../../utils/utils.ts";
import RoomsFilter from "./RoomsFilter.tsx";
import { RoomsCustomDateFilter } from "./RoomsCustomDateFilter.tsx";

interface Props {
    rooms: Omit<Tables<"rooms">, "created_at">[];
}

const RoomsFilters = ({ rooms }: Props) => {
    const { filters, setFilters } = useRoomsContext();

    return (
        <div role="group" className="flex gap-4 mb-6 flex-wrap">
            {RoomsTimeFilterOptionsArray.map((timeFilter) => {
                const isSelected = getIsPredefinedTimeFilterSelected(filters, timeFilter);
                const variant = isSelected ? "primary" : "inactive";

                const onClick = () => {
                    const newTimeFilter: RoomsFilterType = {
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
            <RoomsFilter rooms={rooms} />
        </div>
    );
};

export default RoomsFilters;
