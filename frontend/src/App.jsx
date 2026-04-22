// src/App.jsx// src/App.jsx
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Aboutus from "./pages/Aboutus";
import Blog from "./pages/Blog";


import SignIn from "./pages/SignIn";
import Signup from "./pages/Sign Up";
import ArticleDetail from "./pages/ArticleDetail";
import CoursePage from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import Account from "./pages/Account";
import { Toaster } from "sonner";
import UserDashboard from "./pages/UserCourses";
import EnrolledCourseDetail from "./pages/EnrolledCourseDetail";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageCourses from "./pages/admin/ManageCourses";
import Educators from "./pages/admin/Educators";
import AdminLayout from "./components/AdminLayout";
import LecturePage from "./pages/ManageLectures";
import ManageLectures from "./pages/ManageLectures";
import ManageInstructors from "./pages/ManageInstructors";
import InstructorDetail from "./pages/InstructorDetail";
import AuthSuccess from "./pages/AuthSuccess";
import UserCourses from "./pages/UserCourses";


export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<ArticleDetail />} />
        <Route path="/Courses" element={<CoursePage />} />
        <Route path="/signin" element={< SignIn />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route path="/signup" element={< Signup />} />

        <Route path="/courses/:slug" element={<CourseDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/account" element={<Account />} />
        <Route path="/user/courses" element={<UserCourses />} />
        <Route path="/admin/manage-lectures/:courseId" element={<ManageLectures />} />


        <Route path="/enrolled-courses/:courseId" element={<EnrolledCourseDetail />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />

          <Route path="courses" element={<ManageCourses />} />
          <Route path="courses/:courseId/lectures" element={<LecturePage />} />
          <Route path="instructors" element={<ManageInstructors />} />
          <Route path="instructors/:id" element={<InstructorDetail />} />

        </Route>

      </Routes>
      <Toaster position="top-center" richColors closeButton />

    </>
  );
}
