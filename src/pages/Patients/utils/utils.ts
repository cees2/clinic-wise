import { format, startOfToday } from "date-fns";
import type { PatientApi, PatientFormType } from "../../../utils/projectTypes";
import { DB_DATE_FORMAT } from "../../../utils/constants";

export const getPatientFormDefaultValues = (patient?: PatientApi): PatientFormType => ({
    id: patient?.id,
    firstname: patient?.user.firstname ?? "",
    lastname: patient?.user.lastname ?? "",
    gender: patient?.user.gender ?? "",
    date_of_birth: patient?.user.date_of_birth ?? format(startOfToday(), DB_DATE_FORMAT),
    address: patient?.user.address ?? "",
    phone_number: patient?.user.phone_number ?? "",
    nationality: patient?.user.nationality ?? "",
    start_date: patient?.user.start_date ?? format(startOfToday(), DB_DATE_FORMAT),
    document_id: patient?.user.document_id ?? "",
});
