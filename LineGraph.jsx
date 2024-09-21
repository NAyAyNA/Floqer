import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineGraph(props) {
  const years = props.displayData.map(item => item.year);
  const counts = props.displayData.map(item => item.count);
  const avgSalaries = props.displayData.map(item => item.avgSalary);
  //console.log(years);
    
  const data1 = {
    labels: years, // X-axis labels (years)
    datasets: [
      {
        label: 'No. of Jobs Over Time',
        data: counts, // Y-axis values (No of jobs)
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
        tension: 0.4,
      },
    ],
  };
  const data2 = {
    labels: years, // X-axis labels (years)
    datasets: [
      {
        label: 'Avg Salary Over Time',
        data: avgSalaries, // Y-axis values (salaries)
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
        tension: 0.4, 
      },
    ],
  };

  const options1 = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Average Salary Changes from 2020 to 2024',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  const options2 = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'No. of Jobs Changes from 2020 to 2024',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Line data={data1} options={options1} />
      <Line data={data2} options={options2} />
    </div>
  );
}