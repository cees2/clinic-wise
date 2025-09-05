import styled from "styled-components";
import { Button } from "../Button";
import { StyledHeader } from "../../common/Header/Header";
import { LoadingSpinner } from "../../common/LoadingSpinner";
import { useFakeAppointments } from "../../../services/hooks/faker/useFakeAppointments";
import { useFakePatients } from "../../../services/hooks/faker/useFakePatients";
import { generateFakeAppointments, generateFakePatients, generateFakeRoomsOccupation } from "../utils/faker";
import { useQueryClient } from "@tanstack/react-query";
import { getEmployeesIds, getPatientsIds, getRoomsIds } from "../../../services/api";
import { useFakeRoomsOccupation } from "../../../services/hooks/faker/useFakeRoomsOccupation";

const StyledFaker = styled.div`
    margin: auto 1.6rem 1.6rem;
    padding-top: 1.2rem;
    background-color: var(--background-tertiary);
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 3.2rem;
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
    const queryClient = useQueryClient();
    const { isPending: pendingAppointments, mutate: mutateAppointments } = useFakeAppointments();
    const { isPending: pendingPatients, mutate: mutatePatients } = useFakePatients();
    const { isPending: pendingRoomsOccupation, mutate: mutateRoomsOccupation } = useFakeRoomsOccupation();
    const isPending = pendingAppointments || pendingPatients || pendingRoomsOccupation;

    const uploadAppointments = async () => {
        const [patientsIds, employeesIds] = await Promise.all([
            queryClient.fetchQuery({ queryKey: ["patientsIds", 20], queryFn: () => getPatientsIds(20) }),
            queryClient.fetchQuery({ queryKey: ["employeesIds", 20], queryFn: () => getEmployeesIds(20) }),
        ]);

        const mockAppointments = generateFakeAppointments(patientsIds, employeesIds);
        mutateAppointments(mockAppointments);
    };

    const uploadPatients = () => {
        const mockPatients = generateFakePatients();
        mutatePatients(mockPatients);
    };

    const uploadRoomsOccupation = async () => {
        const [roomsIds, employeesIds] = await Promise.all([
            queryClient.fetchQuery({ queryKey: ["roomsIds", 20], queryFn: () => getRoomsIds(20) }),
            queryClient.fetchQuery({ queryKey: ["employeesIds", 20], queryFn: () => getEmployeesIds(20) }),
        ]);
        const mockRoomsOccupation = generateFakeRoomsOccupation(roomsIds, employeesIds);
        mutateRoomsOccupation(mockRoomsOccupation);
    };

    return (
        <StyledFaker>
            <FakerHeader as="h5">Upload fake data</FakerHeader>
            {isPending ? (
                <LoadingSpinner />
            ) : (
                <FakerButtons>
                    <Button onClick={() => void uploadAppointments()}>Upload appointments</Button>
                    <Button onClick={uploadPatients}>Upload patients</Button>
                    <Button onClick={() => void uploadRoomsOccupation()}>Upload rooms occupation</Button>
                </FakerButtons>
            )}
        </StyledFaker>
    );
};

export default FakerComponent;
