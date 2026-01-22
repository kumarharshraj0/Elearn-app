import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { User, Book, Users, BarChart3 } from "lucide-react";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0e2d25] text-white flex flex-col ">
        <div className="text-center py-6 text-2xl font-bold border-b border-green-700 lg:mt-30">
          Admin Panel
        </div>
        <nav className="flex-1 mt-6 space-y-2 px-4">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition ${
                isActive ? "bg-lime-400 text-black" : "hover:bg-green-800"
              }`
            }
          >
            <BarChart3 size={20} />
            Dashboard
          </NavLink>
         
          <NavLink
            to="/admin/courses"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition ${
                isActive ? "bg-lime-400 text-black" : "hover:bg-green-800"
              }`
            }
          >
            <Book size={20} />
            Manage Courses
          </NavLink>
          <NavLink
            to="/admin/instructors"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition ${
                isActive ? "bg-lime-400 text-black" : "hover:bg-green-800"
              }`
            }
          >
            <Users size={20} />
            Educators
          </NavLink>
        </nav>
        <div className="p-4 border-t border-green-700 flex items-center gap-2">
          <User size={20} />
          <span>Admin</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
