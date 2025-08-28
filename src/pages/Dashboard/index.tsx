import { ContentLayout } from "../../components/layout/ContentLayout.tsx";
import { Header } from "../../components/common/Header/Header.tsx";
import type { HeaderButton } from "../../utils/projectTypes.ts";
import { useReducer } from "react";
import { dashboardReducer } from "./utils/reducers";
import { DASHBOARD_INITIAL_STATE } from "./utils/constants.ts";

const headerButtons: HeaderButton[] = [];

const Dashboard = () => {
    const [dashboardState, dispatch] = useReducer(dashboardReducer, DASHBOARD_INITIAL_STATE);

    return (
        <ContentLayout>
            <Header as="h3" title="Employees" buttons={headerButtons} />
        </ContentLayout>
    );
};

export default Dashboard;
