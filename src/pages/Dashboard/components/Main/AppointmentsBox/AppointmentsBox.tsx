import styled from "styled-components";
import { useDashboardQuery } from "../../../hooks/useDashboardQuery.ts";
import { AppointmentsBoxItem } from "./AppointmentsBoxItem.tsx";

const StyledAppointmentsBox = styled.div`
    grid-column: 1 / span 2;
    border-radius: var(--radius-2xl);
    padding: 2.4rem;
    background-color: var(--background-tertiary);

    & > .appointments-box__title {
        font-weight: var(--font-weight-bold);
        font-size: 1.8rem;
        text-align: center;
    }
`;

const AppointmentsList = styled.ul`
    display: flex;
    flex-direction: column;
    row-gap: 1.6rem;
    margin-top: 2.4rem;
`;

export const AppointmentsBox = () => {
    const { data } = useDashboardQuery();
    const { nextAppointments } = data ?? {};

    if (!nextAppointments) return null;

    return (
        <StyledAppointmentsBox>
            <h5 className="appointments-box__title">Next appointments</h5>
            <AppointmentsList>
                {nextAppointments.map((appointment) => (
                    <AppointmentsBoxItem key={appointment.start_date} appointment={appointment} />
                ))}
            </AppointmentsList>
        </StyledAppointmentsBox>
    );
};
