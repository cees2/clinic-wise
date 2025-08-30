import { dashboardStatisticsOptions } from "../../../utils/types.ts";
import { DashboardStatisticsBox } from "./DashboardStatisticsBox.tsx";
import styled from "styled-components";

const StyledDashboardStatistics = styled.ul`
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
    gap: 2.4rem;
`;

export const DashboardStatistics = () => {
    return (
        <StyledDashboardStatistics>
            {dashboardStatisticsOptions.map((option, index) => {
                return <DashboardStatisticsBox key={option} name={option} boxOrder={index} />;
            })}
        </StyledDashboardStatistics>
    );
};
