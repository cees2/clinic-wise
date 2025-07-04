import styled from "styled-components";
import { Button } from "../Button";
import { StyledHeader } from "../../common/Header/Header";
import { LoadingSpinner } from "../../common/LoadingSpinner";
import { useFakeAppointments } from "../../../services/hooks/faker/useFakeAppointments";
import { useFakePatients } from "../../../services/hooks/faker/useFakePatients";
import { generateFakeAppointments, generateFakeEmployees, generateFakePatients } from "../utils/faker";
import { useFakeEmployees } from "../../../services/hooks/faker/useFakeEmployees";
import { useQueryClient } from "@tanstack/react-query";
import { getEmployees, getPatients } from "../../../services/api";

const StyledFaker = styled.div`
    margin: auto 1.6rem 1.6rem;
    padding-top: 1.2rem;
    background-color: var(--color-gray-200);
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
    const { isPending: pendingEmployees, mutate: mutateEmployees } = useFakeEmployees();
    const isPending = pendingAppointments || pendingPatients || pendingEmployees;

    const uploadAppointments = async () => {
        const [patients, employees] = await Promise.all([
            queryClient.fetchQuery({ queryKey: ["patients", 20], queryFn: () => getPatients(20) }),
            queryClient.fetchQuery({ queryKey: ["employees", 20], queryFn: () => getEmployees(20) }),
        ]);

        const mockAppointments = generateFakeAppointments(patients, employees);
        mutateAppointments(mockAppointments);
    };

    const uploadPatients = () => {
        const mockPatients = generateFakePatients();
        mutatePatients(mockPatients);
    };

    const uploadEmployees = () => {
        const mockEmployees = generateFakeEmployees();
        mutateEmployees(mockEmployees);
    };

    return (
        <StyledFaker>
            <FakerHeader as="h5">Upload fake data</FakerHeader>
            {isPending ? (
                <LoadingSpinner />
            ) : (
                <FakerButtons>
                    <Button onClick={uploadAppointments}>Upload appointments</Button>
                    <Button onClick={uploadPatients}>Upload patients</Button>
                    <Button onClick={uploadEmployees}>Upload employees</Button>
                </FakerButtons>
            )}
        </StyledFaker>
    );
};

export default FakerComponent;
