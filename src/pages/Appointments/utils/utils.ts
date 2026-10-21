import { formatISO, startOfToday } from "date-fns";
import type { AppointmentApi, AppointmentFormType } from "../../../services/apiTypes.ts";

export const getAppointmentFormDefaultValues = (
    appointmentData?: AppointmentApi
):Partial<AppointmentFormType> => ({
    id: appointmentData?.id,
    additional_note: appointmentData?.additional_note,
    duration: appointmentData?.duration,
    employee_id: appointmentData?.employee.id,
    patient_id: appointmentData?.patient.id,
    start_date: appointmentData?.start_date ?? formatISO(startOfToday()),
});
