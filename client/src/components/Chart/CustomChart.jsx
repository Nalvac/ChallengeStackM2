import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Chart } from 'react-chartjs-2';
import {useRef} from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CustomChart = ({type, options, data}) => {

  return (
    <Chart type={type} options={options} data={data} redraw/>
  )
}

export default CustomChart;
