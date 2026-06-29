import styled from "styled-components";
import type { AppointmentApi } from "../../../../../services/apiTypes.ts";
import { FiCalendar } from "react-icons/fi";
import { format } from "date-fns";
import { capitalizeFirstLetter } from "../../../../../utils/utils.ts";
import { Link } from "react-router-dom";

interface Props {
    appointment: AppointmentApi;
}

const StyledAppointmentsBoxItem = styled.li`
    border: 1px solid var(--color-gray-600);
    border-radius: var(--radius-xl);
    transition: var(--duration-fast);

    &:hover {
        background-color: var(--background-tertiary);
    }

    .appointments-box-item {
        &__link {
            display: flex;
            justify-content: space-between;
            align-items: center;
            column-gap: 1.2rem;
            padding: 1.2rem;
            color: inherit;
            text-decoration: none;
            cursor: pointer;
        }

        &__icon {
            box-sizing: content-box;
            width: 2.4rem;
            height: 2.4rem;
            stroke: var(--color-primary);
            background-color: var(--background-tertiary);
            padding: 1rem;
            border-radius: var(--radius-3xl);
        }

        &__duration {
            background-color: var(--background-tertiary);
            padding: 0.2rem 0.8rem;
            border-radius: var(--radius-4xl);
            font-size: 1.2rem;
        }

        &__additional-info {
            font-size: 1.2rem;
            color: var(--color-gray-400);
        }
    }
`;

export const AppointmentsBoxItem = ({ appointment }: Props) => {
    const { start_date, duration, status, id, patient } = appointment;
    const formattedStartDate = format(new Date(start_date), "MMM M");
    const formattedStartDatetime = format(new Date(start_date), "hh:mm aa");

    return (
        <StyledAppointmentsBoxItem>
            <Link className="appointments-box-item__link" to={`/appointments/${id}/edit`}>
                <FiCalendar className="appointments-box-item__icon" />
                <div className="flex flex-col grow">
                    <div className="flex justify-between">
                        <span className="font-bold text-2xl">{`${patient.user.firstname} ${patient.user.lastname}`}</span>
                        <div className="appointments-box-item__duration">{`${duration}m`}</div>
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <span className="appointments-box-item__additional-info">{`${formattedStartDate} · ${formattedStartDatetime}`}</span>
                        <span className="appointments-box-item__additional-info">{capitalizeFirstLetter(status)}</span>
                    </div>
                </div>
            </Link>
        </StyledAppointmentsBoxItem>
    );
};
