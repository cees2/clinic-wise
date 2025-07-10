import type { Tables } from "../../../services/database.types";
import type { AppointmentFormType } from "../../../utils/projectTypes";

export const getAppointmentFormDefaultValues = (
    appointmentData?: Tables<"appointments">,
): Partial<AppointmentFormType> => ({
    additional_note: appointmentData?.additional_note,
    duration: appointmentData?.duration,
    employee_id: appointmentData?.employee_id,
    patient_id: appointmentData?.patient_id,
    start_date: appointmentData?.start_date,
    status: appointmentData?.status,
});
