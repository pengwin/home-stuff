import {
    Chart,
    PieController,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

export default function registerPieChart() {
    Chart.register(PieController, ArcElement, Title, Tooltip, Legend);
}
