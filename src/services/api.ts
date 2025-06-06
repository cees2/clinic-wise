import type { AppointmentFormType, EmployeeFormType, PatientFormType } from "../utils/projectTypes";
import { supabase } from "./services";

export const uploadFakeAppointments = async (appointmentsToBeUploaded: AppointmentFormType[]) => {
    await supabase.from("appointments").delete().gt("id", 0);

    const { data, error } = await supabase.from("appointments").insert(appointmentsToBeUploaded);

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
