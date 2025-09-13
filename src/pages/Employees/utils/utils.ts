import { format } from "date-fns";
import type { Database, Tables } from "../../../services/database.types";
import type { EmployeeFormType } from "../../../utils/projectTypes";
import { DB_DATE_FORMAT } from "../../../utils/constants";

export const getEmployeeFormDefaultValues = (appointmentData?: Tables<"employees">): EmployeeFormType => {
    return {
        id: appointmentData?.id,
        start_date: appointmentData?.start_date ?? format(new Date(), DB_DATE_FORMAT),
        name: appointmentData?.name ?? "",
        surname: appointmentData?.surname ?? "",
        gender: appointmentData?.gender ?? "",
        date_of_birth: appointmentData?.date_of_birth ?? format(new Date(), DB_DATE_FORMAT),
        nationality: appointmentData?.nationality ?? "",
        document_id: appointmentData?.document_id ?? "",
        address: appointmentData?.address ?? "",
        phone_number: appointmentData?.phone_number ?? "",
        email: appointmentData?.email ?? "",
        user_id: appointmentData?.user_id ?? "",
        role: appointmentData?.role as Database["public"]["Enums"]["UserRole"],
    };
};
