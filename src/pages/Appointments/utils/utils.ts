import { format } from "date-fns";
import type { Tables } from "../../../services/database.types";
import type { AppointmentFormType } from "../../../utils/projectTypes";
import { DB_DATE_FORMAT_WITH_TIME } from "../../../utils/constants";

export const getAppointmentFormDefaultValues = (
    appointmentData?: Tables<"appointments">,
): Partial<AppointmentFormType> => ({
    additional_note: appointmentData?.additional_note,
    duration: appointmentData?.duration,
    employee_id: appointmentData?.employee_id,
    patient_id: appointmentData?.patient_id,
    start_date: appointmentData?.start_date ?? format(new Date(), DB_DATE_FORMAT_WITH_TIME),
});
