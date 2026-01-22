import React, { useEffect, useState } from "react";
import { Users, BookOpen, DollarSign, Shield } from "lucide-react";
import axios from "../../api/axios"; // Assuming axios is configured

export default function AdminDashboard() {
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalStudents: 0,
    totalTeachers: 0,
    totalAdmins: 0,
    totalCourses: 0,
    totalEarnings: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("/admin/dashboard-stats");
        setDashboardStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { label: "Total Users", value: dashboardStats.totalUsers, icon: <Users />, color: "bg-lime-400" },
    { label: "Students", value: dashboardStats.totalStudents, icon: <BookOpen />, color: "bg-green-300" },
    { label: "Teachers", value: dashboardStats.totalTeachers, icon: <Shield />, color: "bg-green-200" },
    { label: "Admins", value: dashboardStats.totalAdmins, icon: <Shield />, color: "bg-green-200" },
    { label: "Courses", value: dashboardStats.totalCourses, icon: <BookOpen />, color: "bg-lime-300" },
    { label: "Earnings (Month)", value: `₹${dashboardStats.totalEarnings.toLocaleString()}`, icon: <DollarSign />, color: "bg-green-400" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen md:py-30 lg:py-30">
      <h1 className="text-3xl font-bold text-[#0e2d25] mb-8">Dashboard Overview</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 border border-gray-100 hover:shadow-lg transition"
          >
            <div className={`p-3 rounded-xl ${item.color} text-black`}>
              {item.icon}
            </div>
            <div>
              <p className="text-gray-600 text-sm">{item.label}</p>
              <h2 className="text-2xl font-semibold text-[#0e2d25]">{item.value}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
