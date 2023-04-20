import { BaseChart } from './BaseChart';
import {
    Chart,
    LinearScale,
    BarController,
    BarElement,
    CategoryScale,
    Title,
    Tooltip,
} from 'chart.js';

Chart.register(
    LinearScale,
    CategoryScale,
    BarController,
    BarElement,
    Title,
    Tooltip,
);

const BarChart = BaseChart('bar');

export default BarChart;
