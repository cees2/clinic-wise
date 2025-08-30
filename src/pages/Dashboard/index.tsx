import { useMemo, useReducer } from "react";
import { dashboardReducer } from "./utils/reducers";
import { DASHBOARD_INITIAL_STATE } from "./utils/constants.ts";
import styled from "styled-components";
import { DashboardHeader } from "./components/DashboardHeader.tsx";
import DashboardContext from "./utils/context.ts";
import { DashboardMain } from "./components/Main/DashboardMain.tsx";

const StyledDashboard = styled.div`
    padding: 2.4rem 3.2rem;
`;

const Dashboard = () => {
    const [state, dispatch] = useReducer(dashboardReducer, DASHBOARD_INITIAL_STATE);
    const memoizedContextValue = useMemo(() => ({ ...state, dispatch }), [state]);

    return (
        <DashboardContext.Provider value={memoizedContextValue}>
            <StyledDashboard>
                <DashboardHeader />
                <DashboardMain />
            </StyledDashboard>
        </DashboardContext.Provider>
    );
};

export default Dashboard;
