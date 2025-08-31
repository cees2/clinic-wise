import { useDashboardQuery } from "../../hooks/useDashboardQuery.ts";
import { Line } from "react-chartjs-2";

export const AppointmentsChart = () => {
    const { data } = useDashboardQuery();

    const chartData = { datasets: [{ data: [10, 20] }], labels: ["January", "February"] };

    return <div></div>;
    // return <Line data={chartData} />;
};
