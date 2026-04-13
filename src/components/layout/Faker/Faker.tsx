import styled from "styled-components";
import { Button } from "../Button";
import { StyledHeader } from "../../common/Header/Header";
import { LoadingSpinner } from "../../common/LoadingSpinner";
import { useFakeAppointments } from "../../../services/hooks/faker/useFakeAppointments";
import { useFakePatients } from "../../../services/hooks/faker/useFakePatients";
import { useFakeRoomsOccupancy } from "../../../services/hooks/faker/useFakeRoomsOccupancy";
import { useFakeEmployees } from "../../../services/hooks/faker/useFakeEmployees.ts";

const StyledFaker = styled.div`
    margin: auto 1.6rem 1.6rem;
    padding: 1.2rem 3.6rem;
    background-color: var(--background-tertiary);
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 3.2rem;
    width: max-content;

    @media (min-width: 48em) {
        padding: 1.2rem 1.8rem;
        margin: auto 0.6rem 0;
    }
`;

const FakerHeader = styled(StyledHeader)`
    letter-spacing: 0;
    font-weight: var(--font-weight-semibold);
    display: flex;
    flex-direction: column;
    row-gap: 1.2rem;
`;

const FakerButtons = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1.2rem;
`;

const FakerComponent = () => {
    const { isPending: pendingPatients, mutate: mutatePatients } = useFakePatients();
    const { isPending: pendingEmployees, mutate: mutateEmployees } = useFakeEmployees();
    const { isPending: pendingAppointments, mutate: mutateAppointments } = useFakeAppointments();
    const { isPending: pendingRoomsOccupancy, mutate: mutateRoomsOccupancy } = useFakeRoomsOccupancy();
    const isPending = pendingAppointments || pendingPatients || pendingRoomsOccupancy || pendingEmployees;

    return (
        <StyledFaker>
            <FakerHeader as="h5">Upload fake data</FakerHeader>
            {isPending ? (
                <LoadingSpinner />
            ) : (
                <FakerButtons>
                    <Button onClick={() => mutatePatients()}>Upload patients</Button>
                    <Button onClick={() => mutateEmployees()}>Upload employees</Button>
                    <Button onClick={() => mutateAppointments()}>Upload appointments</Button>
                    <Button onClick={() => mutateRoomsOccupancy()}>Upload rooms occupancy</Button>
                </FakerButtons>
            )}
        </StyledFaker>
    );
};

export default FakerComponent;
