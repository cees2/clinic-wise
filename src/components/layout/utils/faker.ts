import { fakerEN, faker } from "@faker-js/faker";
import type { AppointmentFormType, EmployeeFormType, PatientFormType, Person } from "../../../utils/projectTypes";

const createMockPerson = (): Person => {
    const gender = faker.person.sexType();

    return {
        name: fakerEN.person.firstName(gender),
        surname: fakerEN.person.lastName(),
        date_of_birth: faker.date.birthdate().toISOString(),
        nationality: fakerEN.helpers.arrayElement([
            "United States",
            "Canada",
            "Mexico",
            "Germany",
            "Poland",
            "France",
            "Norway",
            "Italy",
        ]),
        address: `${fakerEN.location.streetAddress({ useFullAddress: false })} ${fakerEN.location.city()}, ${fakerEN.location.state()}`,
        gender,
        phone_number: faker.phone.number(),
    };
};

export const generateFakeAppointments = () => {
    const mockAppointments: AppointmentFormType[] = [];
    for (let i = 0; i < 50; i++) {
        const newMockAppointment: AppointmentFormType = {
            start_date: faker.date.recent().toISOString(),
            patient_id: 1,
            employee_id: 1,
            duration: faker.number.int({ min: 10, max: 90, multipleOf: 5 }),
            status: faker.helpers.arrayElement(["confirmed", "unconfirmed"]),
            additional_note: faker.lorem.sentence({ min: 3, max: 10 }),
            number_of_patients: faker.number.int({ min: 1, max: 2 }),
        };

        mockAppointments.push(newMockAppointment);
    }

    return mockAppointments;
};

export const generateFakePatients = () => {
    const mockPatients: PatientFormType[] = [];
    for (let i = 0; i < 20; i++) {
        const newMockPatient: PatientFormType = {
            ...createMockPerson(),
            appointment_ids: 98,
        };

        mockPatients.push(newMockPatient);
    }

    return mockPatients;
};

export const generateFakeEmployees = () => {
    const mockEmployees: EmployeeFormType[] = [];
    for (let i = 0; i < 20; i++) {
        const newEmployee: EmployeeFormType = {
            ...createMockPerson(),
            appointment_ids: 98,
            document_id: `${faker.string.alpha(3)} ${faker.number.int({ min: 10, max: 99 })}`,
            start_date: faker.date.past({ years: 4 }).toISOString(),
        };

        mockEmployees.push(newEmployee);
    }

    return mockEmployees;
};
