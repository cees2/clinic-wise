import { format, startOfToday } from "date-fns";
import type { PatientFormType } from "../../../utils/projectTypes";
import { DB_DATE_FORMAT } from "../../../utils/constants";

export const getPatientFormDefaultValues = (patient?: PatientFormType): PatientFormType => ({
    id: patient?.id,
    name: patient?.name ?? "",
    surname: patient?.surname ?? "",
    gender: patient?.gender ?? "",
    date_of_birth: patient?.date_of_birth ?? format(startOfToday(), DB_DATE_FORMAT),
    address: patient?.address ?? "",
    phone_number: patient?.phone_number ?? "",
    nationality: patient?.nationality ?? "",
    start_date: patient?.start_date ?? format(startOfToday(), DB_DATE_FORMAT),
    document_id: patient?.document_id ?? "",
});
