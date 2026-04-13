import type {
    LoginFormType,
    RoomFormType,
    RoomOccupancyFormType,
    RoomsFilterType,
    TableDataResourceType,
    UpdateUserRequestType,
} from "../utils/projectTypes";
import type { DashboardRemoteData, DashboardState } from "../pages/Dashboard/utils/types.ts";
import { getTimeFilterDates } from "../pages/Dashboard/utils";
import axios from "axios";
import type {
    AppointmentApi,
    AppointmentFormType,
    EmployeeApi,
    EmployeeFormType,
    ListResponseApi,
    LoginApi,
    PatientApi,
    PatientFormType,
    ResponseApi,
    RoomApi,
    RoomOccupancyApi,
    SearchSelectApi,
    UserApi,
} from "./apiTypes.ts";
import { parseApiData } from "./services.ts";

// TODO: Change based on the environment
const restApi = axios.create({
    baseURL: "http://localhost:8080/api",
});

restApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token && !config.url?.includes("/security")) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// TODO: Change return types in API functions
// TODO: Generating fake data should be done in the backend
// APPOINTMENT
export const generateFakeAppointments = async () => {
    const { data } = await restApi.post<ResponseApi<AppointmentApi[]>>("/appointments/generate");

    return data;
};

export const removeAppointment = async (appointmentId: number) => {
    await restApi.delete(`/appointments/${appointmentId}`);
};

export const createAppointment = async (appointment: AppointmentFormType) => {
    const { data } = await restApi.post<ResponseApi<AppointmentApi>>(`/appointments`, appointment);

    return parseApiData(data);
};

export const getAppointment = async (appointmentId: string) => {
    const { data } = await restApi.get<ResponseApi<AppointmentApi>>(`/appointments/${appointmentId}`);

    return parseApiData(data);
};

// TODO: fix
export const updateAppointment = async (appointment: AppointmentFormType) => {
    const { data } = await restApi.patch<ResponseApi<AppointmentApi>>(`/appointments/${appointment.id}`, appointment);

    return parseApiData(data);
};

export const cancelAppointment = async (appointmentId: number) => {
    const { data } = await restApi.patch<ResponseApi<AppointmentApi>>(`/appointments/${appointmentId}/cancel`);

    return parseApiData(data);
};

export const scheduleAppointment = async (appointmentId: number) => {
    const { data } = await restApi.patch<ResponseApi<AppointmentApi>>(`/appointments/${appointmentId}/schedule`);

    return parseApiData(data);
};

// EMPLOYEE

export const createEmployee = async (employee: EmployeeFormType) => {
    const { data } = await restApi.post<ResponseApi<EmployeeApi>>("/employees", employee);

    return parseApiData(data);
};

export const getEmployee = async (employeeId: string) => {
    const { data } = await restApi.get<ResponseApi<EmployeeApi>>(`/employees/${employeeId}`);

    return parseApiData(data);
};

export const removeEmployee = async (employeeId: number) => {
    await restApi.delete(`/employees/${employeeId}`);
};

export const uploadFakeEmployees = async () => {
    const { data } = await restApi.post<EmployeeApi[]>("/employees/generate");

    return data;
};

// TODO: fix type
export const getEmployeesSelect = async (inputValue: string) => {
    const { data } = await restApi.get<ResponseApi<SearchSelectApi[]>>(`/employees/search_select?input=${inputValue}`);

    return parseApiData(data);
};

export const updateEmployee = async (employee: EmployeeFormType) => {
    const { data } = await restApi.patch<ResponseApi<EmployeeApi>>(`/employees/${employee.id}`, employee);

    return parseApiData(data);
};

// PATIENT

export const createPatient = async (patient: PatientFormType) => {
    const { data } = await restApi.post<ResponseApi<PatientApi>>("/patients", patient);

    return parseApiData(data);
};

export const updatePatient = async (patient: PatientFormType) => {
    const { data } = await restApi.patch<ResponseApi<PatientApi>>(`/patients/${patient.id}`, patient);

    return parseApiData(data);
};

export const removePatient = async (patientId: number) => {
    await restApi.delete(`/patients/${patientId}`);
};

export const getPatientsSelect = async (inputValue: string) => {
    const { data } = await restApi.get<ResponseApi<SearchSelectApi[]>>(`/patients/search_select?input=${inputValue}`);

    return parseApiData(data);
};

export const generateFakePatients = async () => {
    const { data } = await restApi.post<ResponseApi<PatientApi>>("/patients/generate");

    return parseApiData(data);
};

export const getPatient = async (patientId: string) => {
    const { data } = await restApi.get<ResponseApi<PatientApi>>(`/patients/${patientId}`);

    return parseApiData(data);
};

// AUTHENTICATION

export const loginUser = async (loginData: LoginFormType) => {
    const { data } = await restApi.post<LoginApi>("/security/login", loginData);

    return data;
};

export const logoutUser = async () => {
    await restApi.post("/logout");
};

export const getUser = async (token: string) => {
    const { data } = await restApi.get<UserApi>("/security/me", { headers: { Authorization: `Bearer ${token}` } });

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
    const { data } = await restApi.get<ListResponseApi<RoomApi>>("/rooms");

    return parseApiData(data);
};

export const createRoom = async (room: RoomFormType) => {
    const { data } = await restApi.post<ResponseApi<RoomApi>>("/rooms", room);

    return parseApiData(data);
};

// TODO: fix type
export const getRoomsSelect = async (inputValue: string) => {
    const { data } = await restApi.get<ResponseApi<SearchSelectApi[]>>(`/rooms/search_select?input=${inputValue}`);

    return parseApiData(data);
};

// ROOMS OCCUPANCIES

export const uploadFakeRoomsOccupancy = async () => {
    const { data } = await restApi.post<ResponseApi<RoomOccupancyApi>[]>("/room_occupancies/generate");

    return data;
};

export const getRoomsOccupancies = async (dateFilter?: RoomsFilterType, roomFilter?: RoomsFilterType) => {
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

    const { data } = await restApi.get<ListResponseApi<RoomOccupancyApi>>("/room_occupancies");

    return parseApiData(data);
};

export const createRoomOccupancy = async (roomOccupancy: RoomOccupancyFormType) => {
    const { data } = await restApi.post<ResponseApi<RoomOccupancyApi>>("/room_occupancies", roomOccupancy);

    return parseApiData(data);
};

export const getRoomOccupancy = async (roomOccupancyId: number) => {
    const { data } = await restApi.get<ResponseApi<RoomOccupancyApi>>(`/room_occupancies/${roomOccupancyId}`);

    return parseApiData(data);
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
export const getResourceListData = async <TableDataResource extends TableDataResourceType>(resourceData: string) => {
    const { data } = await restApi.get<ListResponseApi<TableDataResource>>(`/${resourceData}`);

    return data;
};
