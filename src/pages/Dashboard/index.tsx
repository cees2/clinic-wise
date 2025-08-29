import { useMemo, useReducer } from "react";
import { dashboardReducer } from "./utils/reducers";
import { DASHBOARD_INITIAL_STATE } from "./utils/constants.ts";
import styled from "styled-components";
import { DashboardHeader } from "./components/DashboardHeader.tsx";
import DashboardContext from "./utils/context.ts";
import { useDashboardQuery } from "./hooks/useDashboardQuery.ts";
import { LoadingSpinner } from "../../components/common/LoadingSpinner.tsx";

const StyledDashboard = styled.div`
    padding: 2.4rem 3.2rem;
    display: flex;
    flex-direction: column;
    row-gap: 4.8rem;
`;

const Dashboard = () => {
    const [state, dispatch] = useReducer(dashboardReducer, DASHBOARD_INITIAL_STATE);
    const memoizedContextValue = useMemo(() => ({ ...state, dispatch }), [state]);
    const { loading, data } = useDashboardQuery(state.dashboardState);

    if (loading) return <LoadingSpinner />;

    console.log("DATA", data);

    return (
        <DashboardContext.Provider value={memoizedContextValue}>
            <StyledDashboard>
                <DashboardHeader />
            </StyledDashboard>
        </DashboardContext.Provider>
    );
};

export default Dashboard;
