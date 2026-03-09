import { format, startOfToday } from "date-fns";
import { DB_DATE_FORMAT } from "../../../utils/constants";
import type { PatientApi, PatientFormType } from "../../../services/apiTypes.ts";

export const getPatientFormDefaultValues = (patient?: PatientApi): PatientFormType => ({
    id: patient?.id,
    username: patient?.user.username ?? "",
    firstname: patient?.user.firstname ?? "",
    lastname: patient?.user.lastname ?? "",
    patient_subscription_plan: patient?.patient_subscription_plan ?? "",
    gender: patient?.user.gender ?? "",
    date_of_birth: patient?.user.date_of_birth ?? format(startOfToday(), DB_DATE_FORMAT),
    address: patient?.user.address ?? "",
    phone_number: patient?.user.phone_number ?? "",
    nationality: patient?.user.nationality ?? "",
    start_date: patient?.start_date ?? format(startOfToday(), DB_DATE_FORMAT),
    document_id: patient?.user.document_id ?? "",
});
