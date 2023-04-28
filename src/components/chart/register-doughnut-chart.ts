import {
    Chart,
    DoughnutController,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

export default function registerDoughnutChart() {
    Chart.register(DoughnutController, ArcElement, Title, Tooltip, Legend);
}
