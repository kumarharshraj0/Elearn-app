// src/components/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { 
  UserCircle, X, Menu, BookOpen, LogOut, Settings, 
  Home, Info, FileText, Instagram, Twitter, Linkedin, ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BrandLogo from "./BrandLogo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);
  
  const { user, signout } = useAuth();
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const shouldShowSolid = scrolled || !isHomePage;

  // Close everything when route changes or click outside
  useEffect(() => {
    setIsOpen(false);
    setShowProfileDropdown(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLink = ({ to, children }) => (
    <Link 
      to={to} 
      className={`relative py-2 font-figtree font-semibold text-[15px] uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 active:scale-95 ${
        location.pathname === to 
          ? "text-[#6366F1]" 
          : shouldShowSolid ? "text-[#0F172A] hover:text-[#6366F1]" : "text-white hover:text-indigo-200"
      }`}
    >
      {children}
      {location.pathname === to && (
        <motion.div 
          layoutId="nav-underline" 
          className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full"
        />
      )}
    </Link>
  );

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        shouldShowSolid 
          ? "bg-white/90 backdrop-blur-2xl border-b border-indigo-50/50 py-4 shadow-[0_10px_40px_-15px_rgba(99,102,241,0.15)]" 
          : "bg-transparent py-6"
      }`}>
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          
          {/* Left: Brand Logo */}
          <div className="flex items-center">
            <BrandLogo light={!shouldShowSolid} />
          </div>

          {/* Center: Nav Links */}
          <div className="hidden lg:flex items-center gap-14">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/courses">Courses</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/blog">Blog</NavLink>
          </div>

          {/* Right: User / Auth */}
          <div className="flex items-center gap-6">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className={`flex items-center gap-3 p-1 rounded-full transition-all border border-transparent group ${
                    shouldShowSolid ? "bg-slate-50 hover:bg-slate-100 hover:border-slate-200" : "bg-white/10 hover:bg-white/20 border-white/10"
                  }`}
                >
                  <div className="text-right pl-4 hidden xl:block">
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${shouldShowSolid ? "text-indigo-600" : "text-indigo-300"}`}>Premium Member</p>
                    <p className={`text-sm font-bold line-clamp-1 ${shouldShowSolid ? "text-slate-900" : "text-white"}`}>{user.name}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white ring-2 ring-indigo-50 border border-indigo-100/50 overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-md">
                    {user.profileImage ? (
                       <img src={user.profileImage} alt="profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-indigo-600 font-bold text-base bg-gradient-to-br from-indigo-50 to-white">
                        {user.name?.charAt(0) || "U"}
                      </div>
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {showProfileDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 20, scale: 0.95 }}
                      className="absolute top-full right-0 mt-4 w-72 bg-white rounded-[32px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.2)] border border-slate-50 overflow-hidden z-50 px-2 pt-2 pb-4"
                    >
                      <div className="p-5 bg-gradient-to-br from-slate-50 to-indigo-50/30 rounded-2xl mb-2 border border-slate-100">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-full bg-white ring-4 ring-white shadow-sm border border-indigo-100 flex items-center justify-center font-bold text-indigo-600 text-lg">
                              {user.name?.charAt(0)}
                           </div>
                           <div className="overflow-hidden">
                              <p className="text-[15px] font-bold text-slate-900 truncate">{user.name}</p>
                              <p className="text-xs text-slate-500 font-medium truncate">{user.email}</p>
                           </div>
                        </div>
                      </div>
                      
                      <div className="px-1 grid gap-0.5">
                        <Link to="/account" className="flex items-center gap-3.5 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors text-[14px] font-semibold text-slate-700">
                          <UserCircle size={18} className="text-indigo-500" />
                          Profile Overview
                        </Link>
                        <Link to="/user/courses" className="flex items-center gap-3.5 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors text-[14px] font-semibold text-slate-700">
                          <BookOpen size={18} className="text-indigo-500" />
                          My Learnings
                        </Link>
                        <Link to="/settings" className="flex items-center gap-3.5 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors text-[14px] font-semibold text-slate-700">
                          <Settings size={18} className="text-indigo-500" />
                          Preferences
                        </Link>
                      </div>

                      <div className="mt-2 pt-2 px-1 border-t border-slate-50">
                        <button 
                          onClick={signout}
                          className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors text-[14px] font-semibold text-red-500"
                        >
                          <LogOut size={18} />
                          Secure Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/signin" className="hidden lg:flex">
                <button className="px-10 py-4 rounded-[22px] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white text-base font-semibold hover:scale-105 active:scale-95 transition-all shadow-[0_15px_40px_-10px_rgba(99,102,241,0.4)] whitespace-nowrap">
                  Get Started Free
                </button>
              </Link>
            )}

            {/* Mobile Toggle */}
            <button
              className={`lg:hidden p-3.5 rounded-2xl shadow-sm border transition-colors ${
                scrolled ? "bg-indigo-50 text-[#6366F1] border-indigo-100" : "bg-white/10 text-white border-white/20"
              }`}
              onClick={() => setIsOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl z-[60]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 250 }}
              className="fixed top-0 right-0 h-full w-full max-w-[360px] bg-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-8 border-b border-slate-50">
                 <BrandLogo />
                 <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-3 rounded-full bg-slate-50 text-slate-900 transition-colors hover:bg-slate-100"
                 >
                   <X size={20} />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {/* User Section (Mobile) */}
                {user && (
                   <div className="p-6">
                      <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                         <div className="flex items-center gap-4 mb-5">
                            <div className="w-12 h-12 rounded-full bg-white border border-indigo-100 flex items-center justify-center font-bold text-indigo-600 shadow-sm text-lg">
                               {user.name?.charAt(0)}
                            </div>
                            <div className="overflow-hidden">
                               <p className="text-[15px] font-bold text-slate-900 truncate leading-tight">{user.name}</p>
                               <p className="text-xs text-slate-500 font-medium truncate mt-0.5">{user.email}</p>
                            </div>
                         </div>
                         <Link 
                          to="/account" 
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-center gap-2 py-2.5 bg-white hover:bg-indigo-50 text-indigo-600 rounded-xl transition-all text-xs font-bold border border-indigo-50 shadow-sm"
                         >
                           Manage Account <ChevronRight size={14} />
                         </Link>
                      </div>
                   </div>
                )}

                <div className="p-8 pt-4">
                   <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-6 px-2">Main Navigation</p>
                   <div className="grid gap-3">
                      {[
                        { to: "/", label: "Home", icon: <Home size={22} /> },
                        { to: "/courses", label: "Our Courses", icon: <BookOpen size={22} /> },
                        { to: "/about", label: "About Platform", icon: <Info size={22} /> },
                        { to: "/blog", label: "Resources & Blog", icon: <FileText size={22} /> }
                      ].map((link, idx) => (
                        <motion.div
                          key={link.to}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * idx }}
                        >
                          <Link 
                            to={link.to} 
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center justify-between p-5 rounded-[24px] transition-all group ${
                              location.pathname === link.to 
                                ? "bg-indigo-50 text-indigo-600 shadow-sm" 
                                : "text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                             <div className="flex items-center gap-4">
                               <span className={`${location.pathname === link.to ? "text-indigo-600" : "text-slate-400 group-hover:text-indigo-500"} transition-colors`}>
                                 {link.icon}
                               </span>
                               <span className="font-bold text-[17px] tracking-tight">{link.label}</span>
                             </div>
                             <ChevronRight size={18} className={`transition-transform duration-300 ${location.pathname === link.to ? "opacity-100" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"}`} />
                          </Link>
                        </motion.div>
                      ))}
                   </div>
                </div>

                <div className="p-8 pt-0 mt-4">
                   <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100">
                      <p className="text-xs font-bold text-slate-500 mb-4 text-center">Connect With Us</p>
                      <div className="flex justify-center gap-6">
                        <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors border border-slate-100">
                          <Instagram size={18} />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors border border-slate-100">
                          <Twitter size={18} />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors border border-slate-100">
                          <Linkedin size={18} />
                        </a>
                      </div>
                   </div>
                </div>
              </div>

              <div className="p-8 border-t border-slate-50 bg-slate-50/30">
                {user ? (
                   <button 
                    onClick={() => { signout(); setIsOpen(false); }}
                    className="w-full flex items-center justify-center gap-3 p-5 rounded-3xl bg-white border border-red-100 text-red-500 font-bold hover:bg-red-50 transition-all shadow-sm"
                   >
                     <LogOut size={20} /> Secure Logout
                   </button>
                ) : (
                  <div className="flex flex-col gap-4">
                    <Link to="/signin" onClick={() => setIsOpen(false)} className="w-full">
                      <button className="w-full p-5 rounded-3xl bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 transition animate-pulse-slow shadow-xl shadow-indigo-200">
                        Join Community Free
                      </button>
                    </Link>
                    <p className="text-center text-sm font-semibold text-slate-400">
                        New here? <Link to="/signin" className="text-indigo-600 font-bold">Create Account</Link>
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}





