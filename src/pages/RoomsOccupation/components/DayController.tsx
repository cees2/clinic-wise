import { add, differenceInDays, format, startOfToday } from "date-fns";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styled from "styled-components";
import { getDateFilterFromRoomsFilters, getDayOffsetStringDate, getDaysOffsetFromADate } from "../utils/utils";
import { useRoomsContext } from "../utils/RoomsContext";
import { RoomsFilterIds } from "../../../utils/projectTypes";

const StyledDayController = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 25rem;
    margin-bottom: 4.8rem;
`;

const Arrow = styled.div`
    &:hover {
        cursor: pointer;
        transform: scale(120%);
        transition: all 200ms;
    }
`;

const DayController = () => {
    const { setFilters, filters } = useRoomsContext();
    const dateFilter = getDateFilterFromRoomsFilters(filters);

    if (!dateFilter) return null;

    const { value: dateFilterValue } = dateFilter;
    const dateFilterDateObject = new Date(dateFilterValue);
    const daysDifference = getDaysOffsetFromADate(dateFilterValue);
    const formattedDate = format(dateFilterDateObject, "dd MMMM, yyyy");
    const dayOfWeek = format(dateFilterDateObject, "EEEE");

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
                <Arrow onClick={previousDayClickHandler} as={FaChevronLeft} />
                <Arrow onClick={nextDayClickHandler} as={FaChevronRight} />
            </div>
        </StyledDayController>
    );
};

export default DayController;
