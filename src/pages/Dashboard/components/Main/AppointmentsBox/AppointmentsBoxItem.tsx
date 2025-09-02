import styled from "styled-components";
import type { DashboardNextAppointment } from "../../../utils/types.ts";
import { format } from "date-fns";
import { DISPLAY_DATE_FORMAT_MINUTES } from "../../../../../utils/constants.ts";
import { Status } from "../../../../../components/common/Status.tsx";
import { capitalizeFirstLetter } from "../../../../../utils/utils.ts";

interface Props {
    appointment: DashboardNextAppointment;
}

const StyledAppointmentsBoxItem = styled.li`
    display: flex;
    justify-content: space-between;
`;

export const AppointmentsBoxItem = ({ appointment }: Props) => {
    const { start_date, duration, status } = appointment;

    return (
        <StyledAppointmentsBoxItem>
            <span>{format(new Date(start_date), DISPLAY_DATE_FORMAT_MINUTES)}</span>
            <span>{`${duration}mins`}</span>
            <Status status={status}>{capitalizeFirstLetter(status)}</Status>
        </StyledAppointmentsBoxItem>
    );
};
