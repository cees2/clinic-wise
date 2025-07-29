import { fakerEN, faker } from "@faker-js/faker";
import type { AppointmentFormType, EmployeeFormType, PatientFormType, Person } from "../../../utils/projectTypes";
import type { Tables } from "../../../services/database.types";
import { format } from "date-fns";
import { DB_DATE_FORMAT, DB_DATE_FORMAT_WITH_TIME } from "../../../utils/constants";

const createMockPerson = (): Person => {
    const gender = faker.person.sexType();

    return {
        name: fakerEN.person.firstName(gender),
        surname: fakerEN.person.lastName(),
        date_of_birth: format(faker.date.birthdate(), DB_DATE_FORMAT),
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
        document_id: `${faker.string.alpha(3)} ${faker.number.int({ min: 10, max: 99 })}`,
    };
};

const getMinutes15Multiplicity = () => faker.helpers.arrayElement([0, 15, 30, 45]);
const getRandomWorkingHour = () => faker.helpers.arrayElement(Array.from({ length: 8 }, (_, index) => index + 8));

export const generateFakeAppointments = (patients: Tables<"patients">, employees: Tables<"employees">) => {
    const mockAppointments: AppointmentFormType[] = [];
    for (let i = 0; i < 50; i++) {
        const startDateObject = faker.date.recent({ days: 5 });
        startDateObject.setMinutes(getMinutes15Multiplicity());
        startDateObject.setSeconds(0);
        startDateObject.setHours(getRandomWorkingHour());
        const startDate = format(startDateObject, DB_DATE_FORMAT_WITH_TIME);

        const newMockAppointment: AppointmentFormType = {
            start_date: startDate,
            patient_id: patients[i % 20].id,
            employee_id: employees[i % 20].id,
            duration: faker.number.int({ min: 10, max: 90, multipleOf: 5 }),
            status: faker.helpers.arrayElement(["SCHEDULED", "CANCELLED", "COMPLETED"]),
            additional_note: faker.lorem.sentence({ min: 3, max: 10 }),
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
            start_date: format(faker.date.past({ years: 4 }), DB_DATE_FORMAT),
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
            start_date: format(faker.date.past({ years: 4 }), DB_DATE_FORMAT),
            role: faker.helpers.arrayElement(["REGISTRATION", "DOCTOR"]),
            email: faker.internet.email(),
        };

        mockEmployees.push(newEmployee);
    }

    return mockEmployees;
};
