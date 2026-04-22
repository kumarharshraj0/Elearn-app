import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { User, Book, Users, BarChart3 } from "lucide-react";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0F172A] text-white flex flex-col border-r border-slate-800">
        <div className="text-center py-8 text-2xl font-semibold border-b border-slate-800 lg:mt-30">
          <span className="text-[#6366F1]">Admin</span> Panel
        </div>
        <nav className="flex-1 mt-8 space-y-3 px-4">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                isActive ? "bg-[#6366F1] text-white shadow-lg shadow-indigo-500/20" : "hover:bg-slate-800 text-slate-400 hover:text-white"
              }`
            }
          >
            <BarChart3 size={20} />
            Dashboard
          </NavLink>
         
          <NavLink
            to="/admin/courses"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                isActive ? "bg-[#6366F1] text-white shadow-lg shadow-indigo-500/20" : "hover:bg-slate-800 text-slate-400 hover:text-white"
              }`
            }
          >
            <Book size={20} />
            Manage Courses
          </NavLink>
          <NavLink
            to="/admin/instructors"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                isActive ? "bg-[#6366F1] text-white shadow-lg shadow-indigo-500/20" : "hover:bg-slate-800 text-slate-400 hover:text-white"
              }`
            }
          >
            <Users size={20} />
            Educators
          </NavLink>
        </nav>
        <div className="p-6 border-t border-slate-800 flex items-center gap-3 text-slate-400 font-semibold bg-[#020617]">
          <div className="w-8 h-8 rounded-full bg-[#6366F1] flex items-center justify-center text-white text-xs">A</div>
          <span>Administrator</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
