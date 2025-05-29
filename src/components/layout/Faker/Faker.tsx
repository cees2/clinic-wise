import styled from "styled-components";
import { Button } from "../Button";
import { StyledHeader } from "../../common/Header/Header";
import { faker } from "@faker-js/faker";
import type { Tables } from "../../../services/database.types";
import { LoadingSpinner } from "../../common/LoadingSpinner";
import { useFakeAppointments } from "../../../services/hooks/Faker/useFakeAppointments";

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

const Faker = () => {
  const { isPending, mutate } = useFakeAppointments();

  const uploadAppointments = () => {
    const mockAppointments: Tables<"appointments">[] = [];
    for (let i = 0; i < 20; i++) {
      const newMockAppointment: Tables<"appointments"> = {
        start_date: faker.date.recent().toString(),
        patient_id: 1,
        employee_id: 1,
        duration: faker.number.int({ min: 10, max: 90, multipleOf: 5 }),
        status: faker.helpers.arrayElement(["Confirmed", "Unconfirmed"]),
        additional_note: faker.lorem.sentence({ min: 3, max: 10 }),
        number_of_patients: faker.number.int({ min: 1, max: 2 }),
      };

      mockAppointments.push(newMockAppointment);
    }

    mutate(mockAppointments);
  };

  return (
    <StyledFaker>
      <FakerHeader as="h5">Upload fake data</FakerHeader>
      {isPending ? (
        <LoadingSpinner />
      ) : (
        <div>
          <Button onClick={uploadAppointments}>Upload appointments</Button>
        </div>
      )}
    </StyledFaker>
  );
};

export default Faker;
