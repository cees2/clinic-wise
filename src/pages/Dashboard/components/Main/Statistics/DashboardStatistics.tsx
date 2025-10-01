import { dashboardStatisticsOptions } from "../../../utils/types.ts";
import { DashboardStatisticsBox } from "./DashboardStatisticsBox.tsx";
import styled from "styled-components";

const StyledDashboardStatistics = styled.ul`
    grid-column: 1 / -1;
    display: grid;
    gap: 2.4rem;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));

    @media (min-width: 40em) {
        grid-template-columns: 1fr 1fr;
    }

    @media (min-width: 80em) {
        grid-template-columns: repeat(4, 1fr);
    }
`;

export const DashboardStatistics = () => {
    return (
        <StyledDashboardStatistics>
            {dashboardStatisticsOptions.map((option) => {
                return <DashboardStatisticsBox key={option} name={option} />;
            })}
        </StyledDashboardStatistics>
    );
};
