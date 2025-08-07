import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/dashboard", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setStats(res.data);
    } catch (err) {
      setError("Failed to load dashboard data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard label="Total Clients" value={stats.totalClients} color="bg-purple-600" />
        <StatCard label="Total Projects" value={stats.totalProjects} color="bg-blue-600" />
        <StatCard label="Total Tasks" value={stats.totalTasks} color="bg-green-600" />
        <StatCard label="Completed Projects" value={stats.completedProject} color="bg-teal-600" />
        <StatCard label="Completed Tasks" value={stats.completedTask} color="bg-emerald-600" />
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color }) => (
  <div className={`p-6 rounded-lg shadow text-white ${color}`}>
    <h3 className="text-lg font-medium">{label}</h3>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

export default Dashboard;
