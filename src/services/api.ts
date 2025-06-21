import type { AppointmentFormType, EmployeeFormType, PatientFormType } from "../utils/projectTypes";
import { supabase } from "./services";

// TODO: possible refactor

export const uploadFakeAppointments = async (appointmentsToBeUploaded: AppointmentFormType[]) => {
    await supabase.from("appointments").delete().neq("id", 98);

    const { data, error } = await supabase.from("appointments").insert(appointmentsToBeUploaded);

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

export const uploadFakePatients = async (patientsToBeUploaded: PatientFormType[]) => {
    await supabase.from("patients").delete().gt("id", 0);

    const { data, error } = await supabase.from("patients").insert(patientsToBeUploaded);

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const uploadEmployees = async (employees: EmployeeFormType[]) => {
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

export const getEmployeesSelect = async (inputValue: string) => {
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
