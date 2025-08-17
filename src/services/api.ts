import { add, format } from "date-fns";
import type {
    AppointmentFormType,
    AppointmentUpdateType,
    EmployeeFormType,
    EmployeeUpdateType,
    LoginApi,
    PatientFormType,
    PatientUpdateType,
    UpdateUserCompleteInfo,
    UpdateUserRequestType,
} from "../utils/projectTypes";
import type { EmployeeSelect } from "./apiTypes";
import { supabase, supabaseURL } from "./services";
import { DB_DATE_FORMAT_WITH_TIME } from "../utils/constants";

// TODO: possible refactor

// APPOINTMENT
export const uploadFakeAppointments = async (appointments: AppointmentFormType[]) => {
    await supabase.from("appointments").delete().gte("id", 0);

    const { data, error } = await supabase.from("appointments").insert(appointments);

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const removeAppointment = async (appointmentId: number) => {
    const { data, error } = await supabase.from("appointments").delete().eq("id", appointmentId);

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const createAppointment = async (appointment: AppointmentFormType) => {
    const { data, error } = await supabase.from("appointments").insert(appointment).select().single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const getAppointment = async (appointmentId: string) => {
    const { data, error } = await supabase
        .from("appointments")
        .select("*,patient:patient_id(id, name, surname),employee:employee_id(id, name, surname)")
        .eq("id", Number(appointmentId))
        .single();

    if (error) {
        throw new Error(error.details);
    }

    return data;
};

export const updateAppointment = async (appointment: AppointmentUpdateType) => {
    const { data, error } = await supabase
        .from("appointments")
        .update(appointment)
        .eq("id", appointment.id)
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

// EMPLOYEE

export const createEmployee = async (employee: EmployeeFormType) => {
    const newEmployeeData = { ...employee };
    const { email, password, role, name, surname } = employee;
    const userData = {
        email,
        password,
        user_metadata: { role, fullName: `${name} ${surname}` },
    };
    delete newEmployeeData.password;
    delete newEmployeeData.confirmPassword;

    const { data: uploadedUserData, error: uploadUserError } = await supabase.functions.invoke("create-employee-user", {
        body: userData,
    });

    if (uploadUserError) {
        throw new Error(uploadUserError.message);
    }

    const { data: uploadedEmployeeData, error: uploadEmployeeError } = await supabase
        .from("employees")
        .insert(newEmployeeData)
        .select()
        .single();

    if (uploadEmployeeError) {
        throw new Error(uploadEmployeeError.message);
    }

    return { uploadedUserData, uploadedEmployeeData };
};

export const getEmployee = async (employeeId: string) => {
    const { data, error } = await supabase.from("employees").select("*").eq("id", Number(employeeId)).single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const removeEmployee = async (employeeId: number) => {
    const { data, error } = await supabase.from("employees").delete().eq("id", Number(employeeId));

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const uploadFakeEmployees = async (employees: EmployeeFormType[]) => {
    await supabase.from("employees").delete().gte("id", 0);

    const { data, error } = await supabase.from("employees").insert(employees);

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const getEmployeesIds = async (size: number) => {
    const { data, error } = await supabase
        .from("employees")
        .select("id")
        .range(0, size - 1);

    if (error) {
        throw new Error(error.message);
    }

    const employeesIds = data.map(data => data.id)

    return employeesIds;
};

export const getEmployeesSelect = async (inputValue: string): Promise<EmployeeSelect[]> => {
    const { data, error } = await supabase.from("employees").select("id,name,surname").ilike("name", `${inputValue}%`);

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const updateEmployee = async (employee: EmployeeUpdateType) => {
    const userData = {
        role: employee.role,
        fullName: `${employee.name} ${employee.surname}`,
        user_id: employee.user_id
    }

    const {data: updatedUserData, error: updateUserError} = await supabase.functions.invoke("update-employee-user", {
        body: userData,
    });

    if(updateUserError){
        throw new Error(updateUserError.message);
    }

    const { data, error } = await supabase.from("employees").update(employee).eq("id", employee.id).select().single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

// PATIENT

export const createPatient = async (patient: PatientFormType) => {
    const { data, error } = await supabase.from("patients").insert(patient).select().single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const updatePatient = async (patient: PatientUpdateType) => {
    const { data, error } = await supabase.from("patients").update(patient).eq("id", patient.id).select().single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const removePatient = async (patientId: number) => {
    const { data, error } = await supabase.from("patients").delete().eq("id", Number(patientId));

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const getPatientsSelect = async (inputValue: string) => {
    const { data, error } = await supabase.from("patients").select("id,name,surname").ilike("name", `${inputValue}%`);

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const uploadFakePatients = async (patients: PatientFormType[]) => {
    await supabase.from("patients").delete().gte("id", 0);

    const { data, error } = await supabase.from("patients").insert(patients);

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const getPatientsIds = async (size: number) => {
    const { data, error } = await supabase
        .from("patients")
        .select("id")
        .range(0, size - 1);

    if (error) {
        throw new Error(error.message);
    }

    const patientsIds = data.map(patient => patient.id)

    return patientsIds;
};

export const getPatient = async (patientId: string) => {
    const { data, error } = await supabase.from("patients").select("*").eq("id", Number(patientId)).single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

// AUTHENTICATION

export const loginUser = async (loginData: LoginApi) => {
    const { data, error } = await supabase.auth.signInWithPassword(loginData);

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const registerUser = async (registerData) => {
    const { data, error } = await supabase.auth.signUp(registerData);

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const logoutUser = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw new Error(error.message);
    }
};

export const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

// USER

const updateUserData = async (
    userCompleteData: UpdateUserRequestType,
    userId:string,
    uploadedAvatarFullPath?: string,
    previousAvatarName?: string,
) => {
    const [name, surname] = userCompleteData.data.fullName.split(" ")
    const { error: updateEmployeeError} = await supabase.from("employees").update({name, surname}).eq("user_id", userId)

    if(updateEmployeeError){
        throw new Error(updateEmployeeError.message)
    }

    const { data, error } = await supabase.auth.updateUser(userCompleteData);
    const userClearedAvatarInput = !userCompleteData.data.avatarURL;
    const userChangedAvatar = Boolean(uploadedAvatarFullPath);


    if ((userChangedAvatar || userClearedAvatarInput) && previousAvatarName) {
        await supabase.storage.from("user-avatars").remove([previousAvatarName]);
    }

    if (error && uploadedAvatarFullPath) {
        await supabase.storage.from("user-avatars").remove([uploadedAvatarFullPath]);
    }

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const updateUser = async (updatedUser: UpdateUserCompleteInfo) => {
    const { avatar, userId, previousAvatarName } = updatedUser;
    const userDidNotChangeAvatar = typeof avatar === "string";
    const userClearedAvatar = !avatar;

    if (userDidNotChangeAvatar) {
        const userCompleteData = {
            email: updatedUser.email,
            data: {
                fullName: updatedUser.fullName,
                avatarURL: avatar,
                role: updatedUser.role,
            },
        };

        return updateUserData(userCompleteData, updatedUser.userId);
    } else if (userClearedAvatar) {
        const userCompleteData = {
            email: updatedUser.email,
            data: {
                fullName: updatedUser.fullName,
                avatarURL: null,
                role: updatedUser.role,
            },
        };

        return updateUserData(userCompleteData, updatedUser.userId,undefined, previousAvatarName);
    } else {
        const newAvatarName = `user-${userId}-avatar-${Date.now()}`;
        const avatarURL = `${supabaseURL}/storage/v1/object/public/user-avatars/${newAvatarName}`;
        const avatarItem = avatar.item(0);
        let updateUserAvatarsBucketData;

        if (avatarItem) {
            const { error, data } = await supabase.storage.from("user-avatars").upload(newAvatarName, avatarItem);

            if (error) {
                throw new Error(error.message);
            }

            updateUserAvatarsBucketData = data;
        }

        const { fullPath } = updateUserAvatarsBucketData ?? {};
        const userCompleteData = {
            email: updatedUser.email,
            data: {
                fullName: updatedUser.fullName,
                avatarURL,
                role: updatedUser.role,
            },
        };

        return updateUserData(userCompleteData,updatedUser.userId, fullPath, previousAvatarName);
    }
};

export const updatePassword = async (newPassword: string) => {
    const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
};


// ROOMS

export const getRoomsIds =async  (size: number) => {
    const {data, error} = await supabase.from("rooms").select("id").range(0, size - 1);

    if(error){
        throw new Error(error.message);
    }
    
    const roomsIds = data.map(room => room.id);

    return roomsIds;
}

export const getRooms = async  () => {
    const {data, error} = await supabase.from("rooms").select("name,id")

    if(error){
        throw new Error(error.message);
    }
    
    return data;
}

// ROOMS OCCUPANCIES

export const uploadFakeRoomsOccupation = async (rooms: RoomFormType[]) => {
    await supabase.from("rooms_occupancy").delete().gte("id", 0);

    const { data, error } = await supabase.from("rooms_occupancy").insert(rooms);

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const getRoomsOccupancies = async  (dateFilterValue?: string) => {
    let query = supabase.from("rooms_occupancy").select("start,end,employees:employee_id(id, name, surname),rooms:room_id(name)")

    if(dateFilterValue){
        const endDate = add(new Date(dateFilterValue), {days: 1});
        const formattedEndDate = format(endDate, DB_DATE_FORMAT_WITH_TIME)

        query = query.gte("start",dateFilterValue).lte("end", formattedEndDate);

    }

    const {data, error} = await query

    if(error){
        throw new Error(error.message);
    }
    
    return data;
}