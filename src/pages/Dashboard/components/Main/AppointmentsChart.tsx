import { useDashboardQuery } from "../../hooks/useDashboardQuery.ts";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import { CategoryScale, type ChartOptions } from "chart.js";
import Chart from "chart.js/auto";
import { getAppointmentsChartDataset } from "../../utils";
import { useDashboardContext } from "../../utils/context.ts";
import { useDarkMode } from "../../../../utils/hooks/useDarkMode.ts";
import { AppColorMode } from "../../../../utils/projectTypes.ts";

Chart.register(CategoryScale);

const StyledAppointmentsChart = styled.div`
    grid-column: 1 / span 1;
    border-radius: var(--radius-2xl);
    padding: 2.4rem;
    background-color: var(--background-tertiary);
    color: var(--font-primary);
    overflow-x: scroll;

    @media (min-width: 40em) {
        grid-row: 2 / span 1;
        grid-column: 3 / -1;
    }
`;

export const AppointmentsChart = () => {
    const {
        dashboardState: { selectedFilters },
    } = useDashboardContext();
    const { appMode } = useDarkMode();
    const { data } = useDashboardQuery();
    const { appointmentsChartData } = data ?? {};
    const chartData = getAppointmentsChartDataset(selectedFilters, appointmentsChartData);
    const chartFontColor = appMode === AppColorMode.DARK ? "#e5e7eb" : "#1f2937";
    const options: ChartOptions<"bar"> = {
        elements: { bar: { backgroundColor: "#16a34a", borderRadius: 10 } },
        plugins: {
            title: {
                text: "Number of appointments",
                display: true,
                font: { size: 18 },
                color: chartFontColor,
            },
            legend: { display: false },
        },
        scales: { y: { ticks: { stepSize: 1, color: chartFontColor } }, x: { ticks: { color: chartFontColor } } },
    };

    return (
        <StyledAppointmentsChart>
            <Bar data={chartData} options={options} />
        </StyledAppointmentsChart>
    );
};
