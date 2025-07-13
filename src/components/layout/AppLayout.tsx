import { Outlet } from "react-router-dom";
import MainNavigation from "./Navigation/MainNavigation";
import styled from "styled-components";
import { ProtectRouteLogin } from "./ProtectRouteLogin";

const Main = styled.main`
    flex: 1;
    background-color: var(--color-gray-100);
`;

const AppLayout = () => {
    return (
        <ProtectRouteLogin>
            <MainNavigation />
            <Main>
                <Outlet />
            </Main>
        </ProtectRouteLogin>
    );
};

export default AppLayout;
