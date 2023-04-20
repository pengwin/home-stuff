import { BaseChart } from './BaseChart';
import {
    Chart,
    DoughnutController,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

Chart.register(DoughnutController, ArcElement, Title, Tooltip, Legend);

const DoughnutChart = BaseChart('doughnut');

export default DoughnutChart;
