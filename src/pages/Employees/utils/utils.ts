import { format, startOfToday } from "date-fns";
import { DB_DATE_FORMAT } from "../../../utils/constants";
import { type EmployeeApi, type EmployeeFormType } from "../../../services/apiTypes.ts";

export const getEmployeeFormDefaultValues = (employeeData?: EmployeeApi): EmployeeFormType => {
    return {
        id: employeeData?.id,
        username: employeeData?.user.username ?? "",
        firstname: employeeData?.user.firstname ?? "",
        lastname: employeeData?.user.lastname ?? "",
        start_date: employeeData?.start_date ?? format(startOfToday(), DB_DATE_FORMAT),
        gender: employeeData?.user.gender,
        date_of_birth: employeeData?.user.date_of_birth ?? format(startOfToday(), DB_DATE_FORMAT),
        nationality: employeeData?.user.nationality ?? "",
        document_id: employeeData?.user.document_id ?? "",
        address: employeeData?.user.address ?? "",
        phone_number: employeeData?.user.phone_number ?? "",
        role: employeeData?.role,
        authorities: employeeData?.user.authorities
    };
};
