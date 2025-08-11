import { useQueryClient } from "@tanstack/react-query";
import { add, format } from "date-fns";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styled from "styled-components";

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
    const [dayOffset, setDayOffset] = useState(0);
    const dateToDisplay = add(new Date(), { days: dayOffset });
    const formattedDate = format(dateToDisplay, "dd MMMM, yyyy");
    const dayOfWeek = format(dateToDisplay, "EEEE");
    const queryClient = useQueryClient();

    const nextDayClickHander = () => {
        setDayOffset((prevOffset) => ++prevOffset);
    };

    const previousDayClickHander = () => {
        setDayOffset((prevOffset) => {
            if (prevOffset === 0) return prevOffset;

            return --prevOffset;
        });
    };

    return (
        <StyledDayController>
            <div>
                <h6 className="font-bold">{dayOfWeek}</h6>
                <small>{formattedDate}</small>
            </div>
            <div className="flex gap-x-6">
                <Arrow onClick={previousDayClickHander} as={FaChevronLeft} />
                <Arrow onClick={nextDayClickHander} as={FaChevronRight} />
            </div>
        </StyledDayController>
    );
};

export default DayController;
