import type { AppointmentFormType, EmployeeFormType, PatientFormType } from "../utils/projectTypes";
import type { EmployeeSelect } from "./apiTypes";
import { supabase } from "./services";

// TODO: possible refactor

export const uploadFakeAppointments = async (appointments: AppointmentFormType[]) => {
    await supabase.from("appointments").delete().gte("id", 0);

    const { data, error } = await supabase.from("appointments").insert(appointments);

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

export const removeAppointment = async (appointmentId: number) => {
    const { data, error } = await supabase.from("appointments").delete().eq("id", appointmentId);

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

export const getPatients = async (size: number) => {
    const { data, error } = await supabase
        .from("patients")
        .select("*")
        .range(0, size - 1);

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const getEmployees = async (size: number) => {
    const { data, error } = await supabase
        .from("employees")
        .select("*")
        .range(0, size - 1);

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const getEmployeesSelect = async (inputValue: string): Promise<EmployeeSelect[]> => {
    const { data, error } = await supabase.from("employees").select("id,name,surname").ilike("name", `${inputValue}%`);

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

export const createEmployee = async (employee: EmployeeFormType) => {
    const { data, error } = await supabase.from("employees").insert(employee).select().single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
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

    console.log("ERROR", error);
    if (error) {
        throw new Error(error.message);
    }

    return data;
};
