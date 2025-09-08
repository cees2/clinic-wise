import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Appointments from "./Appointments";
import Patients from "./Patients";
import Rooms from "./RoomsOccupation/pages/Index";
import Settings from "./Settings";
import Page404 from "../components/layout/Page404.tsx";
import Login from "./Authentication/Login/Login.tsx";
import Employees from "./Employees";
import NewAppointment from "./Appointments/New";
import EditAppointment from "./Appointments/Edit";
import NewPatient from "./Patients/New";
import EditPatient from "./Patients/Edit";
import NewEmployee from "./Employees/New";
import EditEmployee from "./Employees/Edit";
import AppLayout from "../components/layout/AppLayout.tsx";
import { NewRoomOccupancy } from "./RoomsOccupation/pages/New/NewRoomOccupancy.tsx";
import { EditRoomOccupancy } from "./RoomsOccupation/pages/Edit/EditRoomOccupancy.tsx";
import styled from "styled-components";

const MainLayout = () => {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route index element={<Navigate to="dashboard" />} />
                <Route path="dashboard" Component={Dashboard} />
                <Route path="appointments">
                    <Route index Component={Appointments} />
                    <Route path="new" Component={NewAppointment} />
                    <Route path=":appointmentId/edit" Component={EditAppointment} />
                </Route>
                <Route path="patients">
                    <Route index Component={Patients} />
                    <Route path="new" Component={NewPatient} />
                    <Route path=":patientId/edit" Component={EditPatient} />
                </Route>
                <Route path="employees">
                    <Route index Component={Employees} />
                    <Route path="new" Component={NewEmployee} />
                    <Route path=":employeeId/edit" Component={EditEmployee} />
                </Route>
                <Route path="room-occupancies">
                    <Route index Component={Rooms} />
                    <Route path="new" Component={NewRoomOccupancy} />
                    <Route path=":roomOccupancyId/edit" Component={EditRoomOccupancy} />
                </Route>
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
