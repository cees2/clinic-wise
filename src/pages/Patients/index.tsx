import { format } from "date-fns";
import { Header } from "../../components/common/Header/Header";
import TableDataRenderer from "../../components/layout/TableData/TableData";
import { TableLayout } from "../../components/layout/TableData/TableLayout";
import type { Tables } from "../../services/database.types";
import type { TableDataConfig } from "../../utils/projectTypes";
import { UNIVERSAL_DATE_FORMAT } from "../../utils/constants";
import { capitalizeFirstLetter, getCountryShortName } from "../../utils/utils";

const Patients = () => {
    const config: TableDataConfig<Tables<"patients">> = {
        columns: [
            {
                id: "name",
                name: "Name",
                render: (patient) => `${patient.name} ${patient.surname}`,
            },
            {
                id: "date_of_birth",
                name: "Date of birth",
                render: (patient) => format(new Date(patient.date_of_birth), UNIVERSAL_DATE_FORMAT),
            },
            {
                id: "gender",
                name: "Gender",
                render: (patient) => capitalizeFirstLetter(patient.gender),
            },
            {
                id: "nationality",
                name: "Nationality",
                render: (patient) => {
                    return (
                        <div className="flex items-center gap-x-4">
                            <span>{patient.nationality}</span>
                            <img
                                src={`https://flagcdn.com/w20/${getCountryShortName(patient.nationality ?? " ")}.png`}
                                alt={`${patient.nationality ?? ""} flag`}
                            />
                        </div>
                    );
                },
            },
            {
                id: "phone_number",
                name: "Phone number",
            },
        ],
        resourceName: "patients",
    };

    return (
        <TableLayout>
            <Header as="h3" title="Patients" />
            <TableDataRenderer config={config} />
        </TableLayout>
    );
};

export default Patients;
