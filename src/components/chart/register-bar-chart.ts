import {
    Chart,
    LinearScale,
    BarController,
    BarElement,
    CategoryScale,
    Title,
    Tooltip,
} from 'chart.js';

export default function registerBarChart() {
    Chart.register(
        LinearScale,
        CategoryScale,
        BarController,
        BarElement,
        Title,
        Tooltip,
    );
}
