import { useDashboardQuery } from "../../hooks/useDashboardQuery.ts";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import { CategoryScale, type ChartOptions } from "chart.js";
import Chart from "chart.js/auto";
import { useDarkMode } from "../../../../utils/hooks/useDarkMode.ts";
import { AppColorMode } from "../../../../utils/projectTypes.ts";

Chart.register(CategoryScale);

const StyledAppointmentsChart = styled.div`
    grid-column: 1 / -1;
    border-radius: var(--radius-2xl);
    padding: 2.4rem;
    background-color: var(--background-secondary);
    color: var(--font-primary);
    overflow-x: hidden;

    @media (min-width: 40em) {
        grid-column: 1 / span 1;
    }
    @media (min-width: 48em) {
        grid-column: 1 / span 3;
    }
`;

export const AppointmentsChart = () => {
    const { appMode } = useDarkMode();
    const { data } = useDashboardQuery();
    const { chartData } = data ?? {};
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

    if (!chartData) return null;

    const chartConfig = {
        labels: chartData.map((appointment) => appointment.label),
        datasets: [
            {
                label: "Appointments",
                data: chartData.map((appointment) => appointment.value),
            },
        ],
    };

    return (
        <StyledAppointmentsChart>
            <Bar data={chartConfig} options={options} />
        </StyledAppointmentsChart>
    );
};
