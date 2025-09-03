import styled from "styled-components";
import type { DashboardNextAppointment } from "../../../utils/types.ts";
import { format } from "date-fns";
import { DISPLAY_DATE_FORMAT_MINUTES } from "../../../../../utils/constants.ts";
import { Status } from "../../../../../components/common/Status.tsx";
import { capitalizeFirstLetter } from "../../../../../utils/utils.ts";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

interface Props {
    appointment: DashboardNextAppointment;
}

const StyledAppointmentsBoxItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-gray-200);
`;

export const AppointmentsBoxItem = ({ appointment }: Props) => {
    const { start_date, duration, status, id } = appointment;

    return (
        <StyledAppointmentsBoxItem>
            <span>{format(new Date(start_date), DISPLAY_DATE_FORMAT_MINUTES)}</span>
            <span>{`${duration} mins`}</span>
            <Status status={status}>{capitalizeFirstLetter(status)}</Status>
            <Link to={`/appointments/${id}/edit`} className="text-green-600">
                See more
                <FaArrowRightLong className="inline ms-4" />
            </Link>
        </StyledAppointmentsBoxItem>
    );
};
