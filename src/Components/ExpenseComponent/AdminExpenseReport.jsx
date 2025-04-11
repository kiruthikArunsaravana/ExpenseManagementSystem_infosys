import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { displayAllCustomers } from "../../Services/CustomerService";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminExpenseReport = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [expenseData, setExpenseData] = useState({
    labels: [],
    datasets: [
      {
        label: "Total Spent per Category",
        data: [],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9800", "#9C27B0"],
      },
    ],
  });

  useEffect(() => {
    displayAllCustomers()
      .then((response) => setCustomerList(response.data))
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  const loadExpenseData = () => {
    if (!selectedCustomerId) return;
    fetch(`http://localhost:9797/exp-mng/summary/${selectedCustomerId}`)
      .then((response) => response.json())
      .then((data) => {
        setExpenseData({
          labels: data.map((item) => `Category ${item.categoryId}`),
          datasets: [
            {
              label: "Total Amount Spent",
              data: data.map((item) => item.totalAmount),
              backgroundColor: [
                "#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9800", "#9C27B0",
              ],
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching expenses:", error));
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f0f4f8",
      padding: "50px 20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "start",
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      <div style={{
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "16px",
        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "700px",
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>
          📈 Customer Spending Report
        </h2>

        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "20px",
        }}>
          <select
            value={selectedCustomerId}
            onChange={(e) => setSelectedCustomerId(e.target.value)}
            style={{
              padding: "10px 15px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              width: "60%",
              fontSize: "16px",
            }}
          >
            <option value="">Select Customer</option>
            {customerList.map((customer) => (
              <option key={customer.customerId} value={customer.customerId}>
                {customer.customerName}
              </option>
            ))}
          </select>

          <button
            onClick={loadExpenseData}
            style={{
              backgroundColor: "#4CAF50",
              color: "#fff",
              padding: "10px 16px",
              fontSize: "16px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "0.3s",
            }}
          >
            Generate
          </button>
        </div>

        <div style={{ width: "100%", marginTop: "20px" }}>
          <Bar
            data={expenseData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                  labels: {
                    font: { size: 14 },
                  },
                },
              },
              scales: {
                x: {
                  ticks: {
                    font: { size: 13 },
                  },
                  grid: { color: "#eee" },
                },
                y: {
                  beginAtZero: true,
                  ticks: {
                    font: { size: 13 },
                  },
                  grid: { color: "#eee" },
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

export default AdminExpenseReport;
