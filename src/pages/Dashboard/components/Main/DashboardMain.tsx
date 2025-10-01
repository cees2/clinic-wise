import { DashboardStatistics } from "./Statistics/DashboardStatistics.tsx";
import { useDashboardQuery } from "../../hooks/useDashboardQuery.ts";
import { LoadingSpinner } from "../../../../components/common/LoadingSpinner.tsx";
import styled from "styled-components";
import { AppointmentsChart } from "./AppointmentsChart.tsx";
import { AppointmentsBox } from "./AppointmentsBox/AppointmentsBox.tsx";

const StyledDashboardMain = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2.4rem;
    row-gap: 6.4rem;
    margin-top: 6.4rem;

    @media (min-width: 40em) {
        grid-template-columns: repeat(4, 1fr);
    }
`;

export const DashboardMain = () => {
    const { isLoading } = useDashboardQuery();

    if (isLoading) return <LoadingSpinner />;

    return (
        <StyledDashboardMain>
            <DashboardStatistics />
            <AppointmentsBox />
            <AppointmentsChart />
        </StyledDashboardMain>
    );
};
