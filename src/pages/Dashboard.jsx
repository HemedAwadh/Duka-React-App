import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Bar, Line } from "react-chartjs-2";
import 'chart.js/auto';

const BACKEND_URL = "https://api.mydukaapp.co.ke";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("access_token"); // PrivateRoute ensures token exists

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${BACKEND_URL}/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          if (res.status === 401) {
            localStorage.removeItem("access_token");
            window.location.href = "/login";
          }
          const errData = await res.json();
          throw new Error(errData.detail || "Failed to fetch dashboard data");
        }

        const data = await res.json();
        setDashboardData(data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError(err.message || "Error fetching dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [token]);

  if (loading) return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar isLoggedIn={true} />
      <p className="text-center mt-5">Loading dashboard...</p>
      <Footer />
    </div>
  );

  if (error) return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar isLoggedIn={true} />
      <p className="text-center mt-5 text-danger">{error}</p>
      <Footer />
    </div>
  );

  const { profit_per_product, sales_per_day } = dashboardData;

  const barData = {
    labels: profit_per_product?.products_name || [],
    datasets: [
      {
        label: "Profit per Product",
        data: profit_per_product?.products_sales || [],
        backgroundColor: profit_per_product?.products_colour || [],
      },
    ],
  };

  const lineData = {
    labels: sales_per_day?.dates || [],
    datasets: [
      {
        label: "Sales per Day",
        data: sales_per_day?.sales || [],
        borderColor: "#3e95cd",
        fill: false,
      },
    ],
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar isLoggedIn={true} />
      <div className="container mt-5 flex-grow-1">
        <div className="text-white p-4 rounded mb-4" style={{ backgroundColor: '#6f42c1' }}>
          <h2>Dashboard Overview</h2>
          <p>Your central hub for monitoring business performance.</p>
        </div>

        <div className="mb-5">
          <Bar data={barData} />
        </div>

        <div className="mb-5">
          <Line data={lineData} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
