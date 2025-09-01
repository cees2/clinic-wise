import { useDashboardQuery } from "../../hooks/useDashboardQuery.ts";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { getAppointmentsChartDataset } from "../../utils";
import { useDashboardContext } from "../../utils/context.ts";
Chart.register(CategoryScale);

const StyledAppointmentsChart = styled.div`
    grid-column: 3 / -1;
    grid-row: 2 / span 1;
`;

export const AppointmentsChart = () => {
    const {
        dashboardState: { selectedFilters },
    } = useDashboardContext();
    const { data } = useDashboardQuery();
    const { appointmentsChartData } = data ?? {};
    const chartData = getAppointmentsChartDataset(selectedFilters, appointmentsChartData);
    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
    };
    console.log(chartData);

    return (
        <StyledAppointmentsChart>
            <Bar data={chartData} options={options} />
        </StyledAppointmentsChart>
    );
};
