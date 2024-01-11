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

  const profitChartRef = useRef();

  if (profitChartRef?.current) {
    profitChartRef.current.chartInstance.destroy();
  }

  return (
    <Chart type={type} options={options} data={data} ref={profitChartRef} redraw/>
  )
}

export default CustomChart;
