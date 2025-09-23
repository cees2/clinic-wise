import styled from "styled-components";
import { Button } from "../Button";
import { StyledHeader } from "../../common/Header/Header";
import { LoadingSpinner } from "../../common/LoadingSpinner";
import { useFakeAppointments } from "../../../services/hooks/faker/useFakeAppointments";
import { useFakePatients } from "../../../services/hooks/faker/useFakePatients";
import { generateFakeAppointments, generateFakePatients, generateFakeRoomsOccupancy } from "../utils/faker";
import { useQueryClient } from "@tanstack/react-query";
import { getEmployeesIds, getPatientsIds, getRoomsIds } from "../../../services/api";
import { useFakeRoomsOccupancy } from "../../../services/hooks/faker/useFakeRoomsOccupancy";

const StyledFaker = styled.div`
    margin: auto 1.6rem 1.6rem;
    padding: 1.2rem 3.6rem;
    background-color: var(--background-tertiary);
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 3.2rem;
    width: max-content;
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
    const { isPending: pendingRoomsOccupancy, mutate: mutateRoomsOccupancy } = useFakeRoomsOccupancy();
    const isPending = pendingAppointments || pendingPatients || pendingRoomsOccupancy;

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

    const uploadRoomsOccupancy = async () => {
        const [roomsIds, employeesIds] = await Promise.all([
            queryClient.fetchQuery({ queryKey: ["roomsIds", 20], queryFn: () => getRoomsIds(20) }),
            queryClient.fetchQuery({ queryKey: ["employeesIds", 20], queryFn: () => getEmployeesIds(20) }),
        ]);
        const mockRoomsOccupancy = generateFakeRoomsOccupancy(roomsIds, employeesIds);
        mutateRoomsOccupancy(mockRoomsOccupancy);
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
                    <Button onClick={() => void uploadRoomsOccupancy()}>Upload rooms occupancy</Button>
                </FakerButtons>
            )}
        </StyledFaker>
    );
};

export default FakerComponent;
