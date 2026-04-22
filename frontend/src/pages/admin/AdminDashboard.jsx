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
    { label: "Total Users", value: dashboardStats.totalUsers, icon: <Users />, color: "bg-indigo-600" },
    { label: "Students", value: dashboardStats.totalStudents, icon: <BookOpen />, color: "bg-slate-800" },
    { label: "Teachers", value: dashboardStats.totalTeachers, icon: <Shield />, color: "bg-indigo-500" },
    { label: "Admins", value: dashboardStats.totalAdmins, icon: <Shield />, color: "bg-slate-900" },
    { label: "Courses", value: dashboardStats.totalCourses, icon: <BookOpen />, color: "bg-indigo-400" },
    { label: "Earnings (Month)", value: `$${dashboardStats.totalEarnings.toLocaleString()}`, icon: <DollarSign />, color: "bg-indigo-700" },
  ];

  return (
    <div className="p-10 bg-slate-50 min-h-screen lg:pt-32">
      <h1 className="text-4xl font-semibold text-[#0F172A] mb-12 tracking-tight">Dashboard Overview</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-3xl p-8 flex items-center gap-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className={`p-4 rounded-2xl ${item.color} text-white shadow-lg`}>
              {item.icon}
            </div>
            <div>
              <p className="text-slate-500 font-semibold uppercase tracking-widest text-xs mb-1">{item.label}</p>
              <h2 className="text-3xl font-semibold text-[#0F172A]">{item.value}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
