import { BaseChart } from './BaseChart';
import {
    Chart,
    PieController,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

Chart.register(PieController, ArcElement, Title, Tooltip, Legend);

const PieChart = BaseChart('pie');

export default PieChart;
