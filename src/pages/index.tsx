import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Appointments from "./Appointments";
import Patients from "./Patients";
import Rooms from "./Rooms";
import Availabilities from "./Availabilities";
import Settings from "./Settings";
import Page404 from "../components/layout/Page404";
import Login from "./Authentication/Login/Login";
import Register from "./Authentication/Register/Register";
import styled from "styled-components";
import MainNavigation from "../components/layout/Navigation/MainNavigation";
import Employees from "./Employees";

const StyledMainLayout = styled.div`
    display: flex;
`;

const Main = styled.main`
    flex: 1;
    background-color: var(--color-gray-100);
`;

const MainLayout = () => {
    return (
        <StyledMainLayout>
            <MainNavigation />
            <Main>
                <Routes>
                    <Route index element={<Navigate to="dashboard" />} />
                    <Route path="dashboard" Component={Dashboard} />
                    <Route path="appointments" Component={Appointments} />
                    <Route path="patients" Component={Patients} />
                    <Route path="employees" Component={Employees} />
                    <Route path="rooms" Component={Rooms} />
                    <Route path="availabilities" Component={Availabilities} />
                    <Route path="settings" Component={Settings} />
                    <Route path="login" Component={Login} />
                    <Route path="register" Component={Register} />
                    <Route path="*" Component={Page404} />
                </Routes>
            </Main>
        </StyledMainLayout>
    );
};

export default MainLayout;
