import { Outlet } from "react-router-dom";
import MainNavigation from "./Navigation/MainNavigation";
import styled from "styled-components";
import { ProtectRouteLogin } from "./ProtectRouteLogin";
import MainBar from "./MainBar/MainBar";

const StyledAppLayout = styled.div`
    display: grid;
    grid-template-columns: min-content 1fr;
    grid-template-rows: min-content 1fr;
`;

const Main = styled.main`
    flex: 1;
    background-color: var(--color-gray-100);
    grid-column: 2 / -1;
    grid-row: 2 / -1;
`;

const AppLayout = () => {
    return (
        <ProtectRouteLogin>
            <StyledAppLayout>
                <MainNavigation />
                <MainBar />
                <Main>
                    <Outlet />
                </Main>
            </StyledAppLayout>
        </ProtectRouteLogin>
    );
};

export default AppLayout;
