import { fakerEN, faker } from "@faker-js/faker";
import { UserRole, type AppointmentFormType, type EmployeeFormType, type PatientFormType, type Person, type RoomFormType, type RoomOccupationFormType } from "../../../utils/projectTypes";
import { add, format, startOfHour } from "date-fns";
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
        phone_number: `${faker.string.numeric({length: 3})}-${faker.string.numeric({length: 3})}-${faker.string.numeric({length: 3})}`,
        document_id: `${faker.string.alpha(3)} ${faker.number.int({ min: 10, max: 99 })}`,
    };
};

const getMinutes15Multiplicity = () => faker.helpers.arrayElement([0, 15, 30, 45]);
const getRandomWorkingHour = () => faker.helpers.arrayElement(Array.from({ length: 8 }, (_, index) => index + 8));

export const generateFakeAppointments = (patients: number[], employeesIds: number[]) => {
    const mockAppointments: AppointmentFormType[] = [];

    for (let i = 0; i < 50; i++) {
        const startDateObject = faker.date.recent({ days: 5 });
        startDateObject.setMinutes(getMinutes15Multiplicity());
        startDateObject.setSeconds(0);
        startDateObject.setHours(getRandomWorkingHour());
        const startDate = format(startDateObject, DB_DATE_FORMAT_WITH_TIME);

        const newMockAppointment: AppointmentFormType = {
            start_date: startDate,
            patient_id: faker.helpers.arrayElement(patients),
            employee_id: faker.helpers.arrayElement(employeesIds),
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
            role: faker.helpers.arrayElement([UserRole.REGISTRATION, UserRole.DOCTOR]),
            email: faker.internet.email(),
        };

        mockEmployees.push(newEmployee);
    }

    return mockEmployees;
};

export const generateFakeRoomsOccupation = (roomsIds: number[], employeesIds: number[]) => {
    const mockRooms: RoomOccupationFormType[] = [];
    const ROOM_OCCUPATION_START_MIN = 6;
    const ROOM_OCCUPATION_START_MAX = 15
    const SUPPORTED_NUMBER_OF_HOURS = ROOM_OCCUPATION_START_MAX - ROOM_OCCUPATION_START_MIN

    for(let i = 0; i < 50; i++){
        const randomHour = faker.helpers.arrayElement(Array.from({length: SUPPORTED_NUMBER_OF_HOURS}, (_,index) => index + ROOM_OCCUPATION_START_MIN))
        const startDate = startOfHour(faker.date.soon({days:10}))
        startDate.setHours(randomHour)
        startDate.setMinutes(faker.helpers.arrayElement([0,30]));
        const occupancyPossibleDurations = Array.from({length: 10}, (_, index) => index * 30);
        const occupancyRandomDuration = faker.helpers.arrayElement(occupancyPossibleDurations)
        const endDate = add(startDate, {minutes: occupancyRandomDuration}).toISOString()
        const newRoom: RoomOccupationFormType = {
            start: startDate.toISOString(),
            end: endDate,
            room_id: faker.helpers.arrayElement(roomsIds),
            employee_id: faker.helpers.arrayElement(employeesIds)
        }

        mockRooms.push(newRoom)
    }

    return mockRooms
}