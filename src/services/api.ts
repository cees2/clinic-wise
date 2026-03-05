import type {
    AppointmentFormType,
    EmployeeFormType,
    LoginFormType,
    PatientFormType,
    RoomFormType,
    RoomOccupancyFormType,
    RoomsFilterType,
    RoomsOccupanciesResponseType,
    SingleAppointmentResponseType,
    UpdateUserRequestType,
} from "../utils/projectTypes";
import type { DashboardRemoteData, DashboardState } from "../pages/Dashboard/utils/types.ts";
import { getTimeFilterDates } from "../pages/Dashboard/utils";
import axios from "axios";
import type { LoginApi, UserApi } from "./apiTypes.ts";

// TODO: Change based on the environment
const restApi = axios.create({
    baseURL: "http://localhost:8080/api",
});

restApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
});

// TODO: Change return types in API functions
// TODO: Generating fake data should be done in the backend
// APPOINTMENT
export const generateFakeAppointments = async () => {
    const { data } = await restApi.post("/appointments/generate");

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

// TODO: fix type
export const getEmployeesSelect = async (inputValue: string): Promise<Record<string, any>[]> => {
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
    const { data } = await restApi.get(`/patients/search_select?input=${inputValue}`);

    return data;
};

export const generateFakePatients = async (patients: PatientFormType[]) => {
    const { data } = await restApi.post("/patients/generate", patients);

    return data;
};

export const getPatient = async (patientId: string) => {
    const { data } = await restApi.get(`/patients/${patientId}`);

    return data;
};

// AUTHENTICATION

export const loginUser = async (loginData: LoginFormType): Promise<LoginApi> => {
    const { data } = await restApi.post("/security/login", loginData);

    return data;
};

export const logoutUser = async () => {
    await restApi.post("/logout");
};

export const getUser = async (token: string): Promise<UserApi> => {
    const { data } = await restApi.get("/security/me", { headers: { Authorization: `Bearer ${token}` } });

    return data;
};

// USER

export const updateUser = async (userCompleteData: UpdateUserRequestType, userId: string) => {
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

// TODO: fix type
export const getRoomsSelect = async (inputValue: string): Promise<Record<string, any>[]> => {
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
    roomFilter?: RoomsFilterType,
): Promise<RoomsOccupanciesResponseType[]> => {
    if (dateFilter) {
        //     const endDate = add(new Date(dateFilter.value), { days: 1 });
        //     const formattedEndDate = format(endDate, DB_DATE_FORMAT_WITH_TIME);
        //
        //     query = query.gte("start", dateFilter.value).lte("end", formattedEndDate);
    }
    //
    if (roomFilter) {
        //     const queryFilter = roomFilter.value.split(",").map((filterValue) => Number(filterValue));
        //
        //     query = query.in("room_id", queryFilter);
    }

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
        nextAppointments: [],
    };
};

// LIST RESOURCE
// TODO: resourceType type
export const getResourceListData = async (resourceData: string) => {
    const { data } = await restApi.get(`/${resourceData}`);

    return data;
};
