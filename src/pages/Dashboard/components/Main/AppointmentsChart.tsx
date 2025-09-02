import { useDashboardQuery } from "../../hooks/useDashboardQuery.ts";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import { CategoryScale, type ChartOptions } from "chart.js";
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
    const options: ChartOptions<"bar"> = {
        elements: { bar: { backgroundColor: "#16a34a", borderRadius: 10 } },
        plugins: {
            title: { text: "Number of appointments", display: true, font: { size: 18 } },
            legend: { display: false },
        },
        scales: { y: { ticks: { stepSize: 1 } } },
    };

    return (
        <StyledAppointmentsChart>
            <Bar data={chartData} options={options} />
        </StyledAppointmentsChart>
    );
};
