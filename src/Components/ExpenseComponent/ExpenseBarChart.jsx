import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import ExpensePieChart from "./ExpensePieChart";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ExpenseBarChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Total Amount Spent per Category",
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(121, 19, 152, 0.6)',
          'rgba(251, 181, 4, 0.6)',
          'rgba(2, 50, 3, 0.6)',
          'rgba(12, 231, 247, 0.6)',
          'rgba(34, 4, 95, 0.6)',
        ],
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1,
      },
    ],
  });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchData = () => {
    if (!startDate || !endDate) return;

    fetch(`http://localhost:9797/exp-mng/expense-total-range?startDate=${startDate}&endDate=${endDate}`)
      .then((response) => response.json())
      .then((data) => {
        setChartData({
          labels: data.map(([categoryId]) => `Category ${categoryId}`),
          datasets: [
            {
              label: "Total Amount Spent per Category",
              data: data.map(([_, totalAmount]) => totalAmount),
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(121, 19, 152, 0.6)',
                'rgba(251, 181, 4, 0.6)',
                'rgba(2, 50, 3, 0.6)',
                'rgba(12, 231, 247, 0.6)',
                'rgba(34, 4, 95, 0.6)',
              ],
              borderColor: "#fff",
              borderWidth: 2,
              hoverBackgroundColor: "#444",
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching expenses:", error));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f9fb",
        padding: "40px",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "28px",
          marginBottom: "40px",
          color: "#333",
        }}
      >
        🧾 Expense Analytics Dashboard
      </h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "40px",
        }}
      >
        {/* Pie Chart Card */}
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
            padding: "20px",
            width: "450px",
            textAlign: "center",
          }}
        >
          <h3 style={{ marginBottom: "20px", fontSize: "20px" }}>
            📊 Category-wise Total Expenses
          </h3>
          <ExpensePieChart />
        </div>

        {/* Bar Chart Card */}
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
            padding: "20px",
            width: "600px",
          }}
        >
          <h3 style={{ marginBottom: "20px", textAlign: "center", fontSize: "20px" }}>
            📅 Expenses by Date Range
          </h3>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{
                padding: "8px 10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{
                padding: "8px 10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <button
              onClick={fetchData}
              style={{
                background: "#4CAF50",
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Generate
            </button>
          </div>

          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                  labels: {
                    font: {
                      size: 14,
                    },
                  },
                },
              },
              scales: {
                x: {
                  ticks: {
                    font: {
                      size: 13,
                    },
                  },
                  grid: {
                    color: "#eee",
                  },
                },
                y: {
                  beginAtZero: true,
                  ticks: {
                    font: {
                      size: 13,
                    },
                  },
                  grid: {
                    color: "#eee",
                  },
                },
              },
              elements: {
                bar: {
                  borderRadius: 10,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpenseBarChart;
