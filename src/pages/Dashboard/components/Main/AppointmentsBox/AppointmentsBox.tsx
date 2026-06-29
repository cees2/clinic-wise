import styled from "styled-components";
import { useDashboardQuery } from "../../../hooks/useDashboardQuery.ts";
import { AppointmentsBoxItem } from "./AppointmentsBoxItem.tsx";

const StyledAppointmentsBox = styled.div`
    grid-column: 1 / span 1;
    border-radius: var(--radius-2xl);
    padding: 2.4rem;
    background-color: var(--background-secondary);
    overflow-x: hidden;

    & > .appointments-box__title {
        font-weight: var(--font-weight-bold);
        font-size: 1.8rem;
        
    }
    
    & > .appointments-box__subtitle {
        font-size: 1.4rem;
    }

    @media (min-width: 48em) {
        grid-column: 4 / -1;
    }
`;

const AppointmentsList = styled.ul`
    display: flex;
    flex-direction: column;
    row-gap: 1.6rem;
    margin-top: 2.4rem;
    text-wrap: nowrap;
    overflow-x: auto;
`;

export const AppointmentsBox = () => {
    const { data } = useDashboardQuery();
    const { nextFiveAppointments } = data ?? {};

    if (!nextFiveAppointments) return null;

    return (
        <StyledAppointmentsBox>
            <h5 className="appointments-box__title">Up next</h5>
            <span className="appointments-box__subtitle text-gray-300">Your next scheduled appointments</span>
            <AppointmentsList>
                {nextFiveAppointments.map((appointment) => (
                    <AppointmentsBoxItem key={appointment.start_date} appointment={appointment} />
                ))}
            </AppointmentsList>
        </StyledAppointmentsBox>
    );
};
