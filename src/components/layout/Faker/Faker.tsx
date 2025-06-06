import styled from "styled-components";
import { Button } from "../Button";
import { StyledHeader } from "../../common/Header/Header";
import { LoadingSpinner } from "../../common/LoadingSpinner";
import { useFakeAppointments } from "../../../services/hooks/Faker/useFakeAppointments";
import { useFakePatients } from "../../../services/hooks/Faker/useFakePatients";
import { generateFakeAppointments, generateFakeEmployees, generateFakePatients } from "../utils/faker";
import { useFakeEmployees } from "../../../services/hooks/Faker/useFakeEmployees";

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
    font-weight: var(--font-weight-bold);
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
    const { isPending: pendingAppointments, mutate: mutateAppointments } = useFakeAppointments();
    const { isPending: pendingPatients, mutate: mutatePatients } = useFakePatients();
    const { isPending: pendingEmployees, mutate: mutateEmployees } = useFakeEmployees();
    const isPending = pendingAppointments || pendingPatients || pendingEmployees;

    const uploadAppointments = () => {
        const mockAppointments = generateFakeAppointments();
        mutateAppointments(mockAppointments);
    };

    const uploadPatients = () => {
        const mockPatients = generateFakePatients();
        mutatePatients(mockPatients);
    };

    const uploadEmployees = () => {
        const mockEmployees = generateFakeEmployees();
        console.log(mockEmployees);
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
