import { Button } from "../../../../components/layout/Button";
import { RoomsTimeFilterOptionsArray } from "../../../../utils/projectTypes";
import RoomsFilter from "./RoomsFilter";
import { useRoomsContext } from "../../utils/RoomsContext";
import { updateRoomsFilters } from "../../utils/utils";

// TODO: Add custom date picker
const RoomsFilters = () => {
    const { filters, setFilters } = useRoomsContext();

    return (
        <div role="group" className="flex gap-x-4 mb-6">
            {RoomsTimeFilterOptionsArray.map((timeFilter) => {
                const isSelected = filters.some((filter) => filter.id === timeFilter);
                const variant = isSelected ? "primary" : "cancel";

                const onClick = () => {
                    const selectedFilterClicked = filters.find((filter) => filter.id === timeFilter);

                    if (selectedFilterClicked) return;

                    setFilters(updateRoomsFilters(filters, timeFilter));
                };

                return (
                    <Button key={timeFilter} variant={variant} onClick={onClick}>
                        {timeFilter}
                    </Button>
                );
            })}
            <RoomsFilter />
        </div>
    );
};

export default RoomsFilters;
