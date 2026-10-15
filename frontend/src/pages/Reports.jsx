// src/pages/Reports.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../styles/FormStyles.css'; // Use the same shared stylesheet

// Register the components Chart.js needs
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Reports = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchDataForChart = async () => {
      try {
        // Fetch both students and departments data
        const [studentsRes, deptsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/students'),
          axios.get('http://localhost:5000/api/departments')
        ]);

        const students = studentsRes.data;
        const departments = deptsRes.data;

        // Process the data to count students per department
        const studentCounts = {};
        departments.forEach(dept => {
          // Initialize each department with a count of 0
          studentCounts[dept._id] = { name: dept.deptname, count: 0 };
        });

        students.forEach(student => {
          if (student.department && studentCounts[student.department._id]) {
            studentCounts[student.department._id].count += 1;
          }
        });

        const labels = Object.values(studentCounts).map(dept => dept.name);
        const data = Object.values(studentCounts).map(dept => dept.count);

        // Set the data in the format Chart.js expects
        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Number of Students',
              data: data,
              backgroundColor: 'rgba(52, 152, 219, 0.6)',
              borderColor: 'rgba(52, 152, 219, 1)',
              borderWidth: 1,
            },
          ],
        });

      } catch (error) {
        console.error("Failed to fetch data for reports:", error);
      }
    };

    fetchDataForChart();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Student Distribution Across Departments',
        font: {
          size: 18
        }
      },
    },
  };

  return (
    <>
      <h1 className="page-header">Reports</h1>

      <div className="card">
        {/* We will only show the chart if the data has been loaded */}
        {chartData ? (
          <Bar options={options} data={chartData} />
        ) : (
          <p>Loading chart data...</p>
        )}
      </div>
    </>
  );
};

export default Reports;
