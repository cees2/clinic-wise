import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Appointments from "./Appointments";
import Patients from "./Patients";
import Rooms from "./RoomsOccupation";
import Availabilities from "./Availabilities";
import Settings from "./Settings";
import Page404 from "../components/layout/Page404";
import Login from "./Authentication/Login/Login";
import Employees from "./Employees";
import NewAppointment from "./Appointments/New";
import EditAppointment from "./Appointments/Edit";
import NewPatient from "./Patients/New";
import EditPatient from "./Patients/Edit";
import NewEmployee from "./Employees/New";
import EditEmployee from "./Employees/Edit";
import AppLayout from "../components/layout/AppLayout";

const MainLayout = () => {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route index element={<Navigate to="dashboard" />} />
                <Route path="dashboard" Component={Dashboard} />
                <Route path="appointments">
                    <Route path="" Component={Appointments} />
                    <Route path="new" Component={NewAppointment} />
                    <Route path=":appointmentId/edit" Component={EditAppointment} />
                </Route>
                <Route path="patients">
                    <Route path="" Component={Patients} />
                    <Route path="new" Component={NewPatient} />
                    <Route path=":patientId/edit" Component={EditPatient} />
                </Route>
                <Route path="employees">
                    <Route path="" Component={Employees} />
                    <Route path="new" Component={NewEmployee} />
                    <Route path=":employeeId/edit" Component={EditEmployee} />
                </Route>
                <Route path="rooms" Component={Rooms} />
                <Route path="availabilities" Component={Availabilities} />
                <Route path="settings" Component={Settings} />
                <Route path="*" Component={Page404} />
            </Route>
            <Route index element={<Navigate to="login" replace />} />
            <Route path="login" Component={Login} />
            <Route path="*" Component={Page404} />
        </Routes>
    );
};

export default MainLayout;
