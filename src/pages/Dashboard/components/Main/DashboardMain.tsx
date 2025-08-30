import { DashboardStatistics } from "./Statistics/DashboardStatistics.tsx";
import { useDashboardQuery } from "../../hooks/useDashboardQuery.ts";
import { LoadingSpinner } from "../../../../components/common/LoadingSpinner.tsx";
import styled from "styled-components";

const StyledDashboardMain = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
    gap: 2.4rem;
    margin-top: 3.2rem;
`;

export const DashboardMain = () => {
    const { isLoading } = useDashboardQuery();

    if (isLoading) return <LoadingSpinner />;

    return (
        <StyledDashboardMain>
            <DashboardStatistics />
        </StyledDashboardMain>
    );
};
