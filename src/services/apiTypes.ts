import { PatientSubscriptionPlan } from "../utils/projectTypes.ts";

export interface ResponseApi<T> {
    data: T;
}

export interface ListResponseApi<T> extends ResponseApi<T[]> {
    size: number;
}

interface OptionalID {
    id?: number;
}

enum Gender {
    MALE="Male",
    FEMALE="Female",
}

export enum UserAuthority {
    ADMIN = "ROLE_ADMIN",
    REGISTRATION = "ROLE_REGISTRATION",
    DOCTOR = "ROLE_DOCTOR",
}

export interface UserApi {
    username: string;
    firstname: string;
    lastname: string;
    gender: Gender;
    address: string;
    date_of_birth: string;
    document_id: string;
    enabled: boolean;
    nationality: string;
    phone_number: string;
    authorities: UserAuthority[];
}

export interface LoginApi {
    token: string;
    user: UserApi;
}

export interface PatientApi {
    id: number;
    startDate: string;
    patientSubscriptionPlan: PatientSubscriptionPlan;
    user: UserApi;
}

export type PatientFormType = {
    firstname: string;
    lastname: string;
    gender: Gender;
    address: string;
    date_of_birth: string;
    document_id: string;
    email: string;
    enabled: boolean;
    nationality: string;
    phone_number: string;
} & OptionalID;

export enum EmployeeRole {
    ADMIN = "ADMIN",
    REGISTRATION = "REGISTRATION",
    DOCTOR = "DOCTOR",
}

export interface EmployeeApi {
    id: number;
    role: EmployeeRole;
    start_date: string;
    user: UserApi
}

export interface EmployeeFormType extends Omit<UserApi, "enabled">, OptionalID{
    start_date: string;
    role: EmployeeRole;
}

export enum AppointmentStatus {
    SCHEDULED = "SCHEDULED",
    CANCELLED = "CANCELLED",
    COMPLETED = "COMPLETED",
}

export interface AppointmentApi{
    id: number;
    additional_note:string;
    created_at: string;
    duration: number;
    employee: EmployeeApi;
    patient:PatientApi;
    start_date: string;
    status: AppointmentStatus;
}