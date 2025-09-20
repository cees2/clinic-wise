import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styled, { css } from "styled-components";
import { getDateFilterFromRoomsFilters, getDayOffsetStringDate, getDaysOffsetFromADate } from "../../utils/utils.ts";
import { useRoomsContext } from "../../utils/RoomsContext.tsx";
import { RoomsFilterIds } from "../../../../utils/projectTypes.ts";
import { format } from "date-fns";

const StyledDayController = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 25rem;
    margin-bottom: 4.8rem;
`;

const Arrow = styled.div<{ $disabled?: boolean }>`
    ${({ $disabled }) => {
        if ($disabled)
            return css`
                color: var(--color-gray-400);
            `;
    }}
    
    
    &:hover {
        ${({ $disabled }) => {
            if (!$disabled) {
                return css`
                    cursor: pointer;
                    transform: scale(120%);
                    transition: all 200ms;
                `;
            }
        }}
`;

const DayController = () => {
    const { setFilters, filters } = useRoomsContext();
    const dateFilter = getDateFilterFromRoomsFilters(filters);
    const { value: dateFilterValue } = dateFilter ?? {};
    const dateFilterDateObject = new Date(dateFilterValue ?? Date.now());
    const daysDifference = getDaysOffsetFromADate(dateFilterValue);
    const formattedDate = format(dateFilterDateObject, "dd MMMM, yyyy");
    const dayOfWeek = format(dateFilterDateObject, "EEEE");
    const disablePrevDay = daysDifference === 0;

    const updateDateFilter = (updatedDaysDifference: number) => {
        const newDayOffsetStringDate = getDayOffsetStringDate(updatedDaysDifference);
        const newRoomsFilters = [...filters];
        const dateFilter = newRoomsFilters.find((filter) => filter.id === RoomsFilterIds.DATE);

        if (!dateFilter) return;

        dateFilter.value = newDayOffsetStringDate;

        setFilters(newRoomsFilters);
    };

    const nextDayClickHandler = () => {
        const updatedDaysDifference = daysDifference + 1;

        updateDateFilter(updatedDaysDifference);
    };

    const previousDayClickHandler = () => {
        if (daysDifference === 0) return;

        const updatedDaysDifference = daysDifference - 1;

        updateDateFilter(updatedDaysDifference);
    };

    return (
        <StyledDayController>
            <div>
                <h6 className="font-bold">{dayOfWeek}</h6>
                <small>{formattedDate}</small>
            </div>
            <div className="flex gap-x-6">
                <Arrow onClick={previousDayClickHandler} as={FaChevronLeft} $disabled={disablePrevDay} />
                <Arrow onClick={nextDayClickHandler} as={FaChevronRight} />
            </div>
        </StyledDayController>
    );
};

export default DayController;
