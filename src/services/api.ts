import { add, compareAsc, format } from "date-fns";
import type {
    AppointmentFormType,
    AppointmentGenerateType,
    EmployeeFormType,
    LoginApi,
    PatientFormType,
    RoomFormType,
    RoomOccupancyFormType,
    RoomsFilterType,
    RoomsOccupanciesResponseType,
    SingleAppointmentResponseType,
    UpdateUserCompleteInfo,
    UpdateUserRequestType
} from "../utils/projectTypes";
import { DB_DATE_FORMAT_WITH_TIME } from "../utils/constants";
import type { DashboardRemoteData, DashboardState } from "../pages/Dashboard/utils/types.ts";
import { getTimeFilterDates } from "../pages/Dashboard/utils";
import axios from "axios";

// TODO: Change based on the environment
const restApi = axios.create({
    baseURL: "http://localhost:8080/api"
});


// TODO: Change return types in API functions
// TODO: Generating fake data should be done in the backend
// APPOINTMENT
export const uploadFakeAppointments = async (appointments: AppointmentGenerateType[]) => {
    const { data } = await restApi.post("/appointments/generate", appointments);

    return data;
};

export const removeAppointment = async (appointmentId: number) => {
    const { data } = await restApi.delete(`/appointments/${appointmentId}`);

    return data;
};

export const createAppointment = async (appointment: AppointmentFormType) => {
    const { data } = await restApi.post(`/appointments`, appointment);

    return data;
};

export const getAppointment = async (appointmentId: string): Promise<SingleAppointmentResponseType> => {
    const { data } = await restApi.get(`/appointments/${appointmentId}`);

    return data;
};

// TODO: fix
export const updateAppointment = async (appointment: AppointmentFormType) => {
    const { data } = await restApi.patch(`/appointments/${appointment.id}`, appointment);

    return data;
};

export const cancelAppointment = async (appointmentId: number) => {
    const { data } = await restApi.patch(`/appointments/${appointmentId}/cancel`);

    return data;
};

export const scheduleAppointment = async (appointmentId: number) => {
    const { data } = await restApi.patch(`/appointments/${appointmentId}/schedule`);

    return data;
};

// EMPLOYEE

export const createEmployee = async (employee: EmployeeFormType) => {
    const { data } = await restApi.post("/employees", employee);

    return data;
};

export const getEmployee = async (employeeId: string) => {
    const { data } = await restApi.get(`/employees/${employeeId}`);

    return data;
};

export const removeEmployee = async (employeeId: number) => {
    const { data } = await restApi.delete(`/employees/${employeeId}`);

    return data;
};

export const uploadFakeEmployees = async (employees: EmployeeFormType[]) => {
    const { data } = await restApi.post("/employees/generate", employees);

    return data;
};

// TODO: fix
export const getEmployeesSelect = async (inputValue: string): Promise<EmployeeSelect[]> => {
    const { data } = await restApi.get(`/employees/search_select?input=${inputValue}`);

    return data;
};

export const updateEmployee = async (employee: EmployeeFormType) => {
    const { data } = await restApi.patch(`/employees/${employee.id}`, employee);

    return data;
};

// PATIENT

export const createPatient = async (patient: PatientFormType) => {
    const { data } = await restApi.post("/patients", patient);

    return data;
};

export const updatePatient = async (patient: PatientFormType) => {
    const { data } = await restApi.patch(`/patients/${patient.id}`, patient);

    return data;
};

export const removePatient = async (patientId: number) => {
    const { data } = await restApi.delete(`/patients/${patientId}`);

    return data;
};

export const getPatientsSelect = async (inputValue: string) => {
    const { data, error } = await restApi.get(`/patients/search_select?input=${inputValue}`);

    return data;
};

export const uploadFakePatients = async (patients: PatientFormType[]) => {
    const { data } = await restApi.post("/patients/generate", patients);

    return data;
};

export const getPatient = async (patientId: string) => {
    const { data } = await restApi.get(`/patients/${patientId}`);

    return data;
};

// AUTHENTICATION

export const loginUser = async (loginData: LoginApi): Promise<{ token: string }> => {
    const { data } = await restApi.post("/login", loginData);

    return data;
};

export const registerUser = async (registerData: SignUpWithPasswordCredentials) => {
    const { data } = await restApi.post("/register", registerData);

    return data;
};

export const logoutUser = async () => {
    await restApi.post("/logout");
};

// USER

export const updateUser = async (
    userCompleteData: UpdateUserRequestType,
    userId: string
) => {
    const { data } = await restApi.patch(`/users/${userId}`, userCompleteData);

    return data;
};

export const updatePassword = async (newPassword: string) => {
    const { data } = await restApi.patch("/auth/update-password", { newPassword });

    return data;
};

// ROOMS

export const getRooms = async () => {
    const { data } = await restApi.get("/rooms");

    return data;
};

export const createRoom = async (room: RoomFormType) => {
    const { data } = await restApi.post("/rooms", room);

    return data;
};

export const getRoomsSelect = async (inputValue: string): Promise<RoomSelect[]> => {
    const { data } = await restApi.get(`/rooms/search_select?input=${inputValue}`);

    return data;
};

// ROOMS OCCUPANCIES

export const uploadFakeRoomsOccupancy = async (rooms: RoomOccupancyFormType[]) => {
    const { data } = await restApi.post("/rooms_occupancy/generate", rooms);

    return data;
};

export const getRoomsOccupancies = async (
    dateFilter?: RoomsFilterType,
    roomFilter?: RoomsFilterType
): Promise<RoomsOccupanciesResponseType[]> => {
    // if (dateFilter) {
    //     const endDate = add(new Date(dateFilter.value), { days: 1 });
    //     const formattedEndDate = format(endDate, DB_DATE_FORMAT_WITH_TIME);
    //
    //     query = query.gte("start", dateFilter.value).lte("end", formattedEndDate);
    // }
    //
    // if (roomFilter) {
    //     const queryFilter = roomFilter.value.split(",").map((filterValue) => Number(filterValue));
    //
    //     query = query.in("room_id", queryFilter);
    // }

    const { data } = await restApi.get("/rooms_occupancy");

    return data;
};

export const createRoomOccupancy = async (roomOccupancy: RoomOccupancyFormType) => {
    const { data } = await restApi.post("/rooms_occupancy", roomOccupancy);

    return data;
};

export const getRoomOccupancy = async (roomOccupancyId: number): Promise<RoomsOccupanciesResponseType> => {
    const { data } = await restApi.get(`/rooms_occupancy/${roomOccupancyId}`);

    return data;
};

// DASHBOARD

export const getDashboardData = async (dashboardState: DashboardState): Promise<DashboardRemoteData> => {
    const [startDate, endDate] = getTimeFilterDates(dashboardState.selectedFilters) ?? [];

    if (!startDate || !endDate) {
        throw new Error("Invalid date filter");
    }

    // const numberOfAppointmentsRequest = supabase
    //     .from("appointments")
    //     .select("id.count()", { count: "exact" })
    //     .gte("start_date", startDate)
    //     .lte("start_date", endDate);
    // const workedMinutesRequest = supabase
    //     .from("appointments")
    //     .select("duration.sum()")
    //     .gte("start_date", startDate)
    //     .lte("start_date", endDate);
    // const completedAppointmentsRequest = supabase
    //     .from("appointments")
    //     .select("id.count()", { count: "exact" })
    //     .eq("status", "COMPLETED")
    //     .gte("start_date", startDate)
    //     .lte("start_date", endDate);
    // const cancelledAppointmentsRequest = supabase
    //     .from("appointments")
    //     .select("id.count()", { count: "exact" })
    //     .eq("status", "CANCELLED")
    //     .gte("start_date", startDate)
    //     .lte("start_date", endDate);
    // const appointmentsChartDataRequest = supabase
    //     .from("appointments")
    //     .select("label:start_date::date,count()", { count: "exact" })
    //     .gte("start_date", startDate)
    //     .lte("start_date", endDate);
    // const nextAppointmentsRequest = supabase
    //     .from("appointments")
    //     .select("id,start_date,duration,status", { count: "exact" })
    //     .gte("start_date", format(new Date(), DB_DATE_FORMAT_WITH_TIME))
    //     .order("start_date", { ascending: true })
    //     .limit(7);
    //
    // const [
    //     numberOfAppointments,
    //     workedMinutes,
    //     completedAppointments,
    //     cancelledAppointments,
    //     appointmentsChartData,
    //     nextAppointments
    // ] = await Promise.all([
    //     numberOfAppointmentsRequest,
    //     workedMinutesRequest,
    //     completedAppointmentsRequest,
    //     cancelledAppointmentsRequest,
    //     appointmentsChartDataRequest,
    //     nextAppointmentsRequest
    // ]);
    //
    // if (
    //     numberOfAppointments.error ||
    //     workedMinutes.error ||
    //     completedAppointments.error ||
    //     cancelledAppointments.error ||
    //     appointmentsChartData.error ||
    //     nextAppointments.error
    // ) {
    //     throw new Error("Could not fetch the dashboard data");
    // }
    //
    // const sortedAppointmentsChartData = appointmentsChartData.data.sort((prevDate, nextDate) => {
    //     const { label: prevDateDay } = prevDate;
    //     const { label: nextDateDay } = nextDate;
    //
    //     return compareAsc(new Date(prevDateDay), new Date(nextDateDay));
    // });

    return {
        numberOfAppointments: 0,
        workedMinutes: 0,
        completedAppointments: 0,
        cancelledAppointments: 0,
        appointmentsChartData: [],
        nextAppointments: []
    };
};
