import type { Tables } from "../../../services/database.types";
import type { AppointmentFormType } from "../../../utils/projectTypes";

export const getAppointmentFormDefaultValues = (appointmentData?: Tables<"appointments">): AppointmentFormType => ({
    additional_note: appointmentData?.additional_note ?? "",
    duration: appointmentData?.duration ?? 0,
    employee_id: appointmentData?.employee_id ?? 0,
    number_of_patients: appointmentData?.number_of_patients ?? 0,
    patient_id: appointmentData?.patient_id ?? 0,
    start_date: appointmentData?.start_date ?? "",
    status: appointmentData?.status ?? "",
});
