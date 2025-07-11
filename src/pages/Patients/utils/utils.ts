import { format } from "date-fns";
import type { PatientFormType } from "../../../utils/projectTypes";
import { DB_DATE_FORMAT } from "../../../utils/constants";

export const getPatientFormDefaultValues = (patient?: PatientFormType): PatientFormType => ({
    name: patient?.name ?? "",
    surname: patient?.surname ?? "",
    gender: patient?.gender ?? "",
    date_of_birth: patient?.date_of_birth ?? format(new Date(), DB_DATE_FORMAT),
    address: patient?.address ?? "",
    phone_number: patient?.phone_number ?? "",
    nationality: patient?.nationality ?? "",
    start_date: patient?.start_date ?? format(new Date(), DB_DATE_FORMAT),
});
