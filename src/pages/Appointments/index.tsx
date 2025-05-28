import { Header } from "../../components/common/Header/Header";
import { TableData } from "../../components/common/Table/TableData";
import { TableLayout } from "../../components/common/Table/TableLayout";
import type { Tables } from "../../services/database.types";
import { useAppointmentsApi } from "../../services/hooks/useAppointmentsApi";
import type { TableDataConfig } from "../../utils/projectTypes";

// id: number;
// duration: number;
// // TODO: STATUS CHAGEN
// status: "WAITING" | "DONE" | "MISSED";
// start_date: string;
// number_of_patients: number;
// additional_note: string;
// patient: PatientApi;
// employee: EmployeeApi;

const Appointments = () => {
  const config: TableDataConfig<Tables<"appointments">> = {
    columns: [
      {
        id: "duration",
        name: "Duration",
      },
      {
        id: "status",
        name: "Status",
      },
      {
        id: "start_date",
        name: "Start date",
      },
      {
        id: "number_of_patients",
        name: "Number of patients",
      },
      {
        id: "additional_note",
        name: "Additional note",
      },
      {
        id: "patient_id",
        name: "Patient",
      },
      {
        id: "employee_id",
        name: "Employee",
      },
    ],
    getResources: useAppointmentsApi,
  };

  return (
    <TableLayout>
      <Header as="h3" title="Appointments" />
      <TableData config={config} />
    </TableLayout>
  );
};

export default Appointments;
