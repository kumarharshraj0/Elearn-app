import React from "react";
import { Star, Linkedin, Twitter, Globe } from "lucide-react";

const instructors = [
  {
    name: "Dr. Elena Vance",
    role: "Senior UI/UX Researcher",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
    rating: "4.9",
    exp: "12+ Years"
  },
  {
    name: "Marcus Thorne",
    role: "Business Strategist",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    rating: "4.8",
    exp: "15+ Years"
  },
  {
    name: "Sarah Jenkins",
    role: "Digital Marketing Expert",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
    rating: "4.9",
    exp: "8+ Years"
  },
  {
    name: "Kai Chen",
    role: "Cybersecurity Architect",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    rating: "5.0",
    exp: "10+ Years"
  }
];

export default function InstructorSpotlight() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold text-[#0F172A] mb-4 tracking-tight">
            Learn from World-Class Experts
          </h2>
          <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
            Our instructors aren't just teachers; they are industry leaders who have built the products and platforms you use every day.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((ins, i) => (
            <div key={i} className="group flex flex-col items-center">
              <div className="relative mb-8">
                {/* Image Container with Custom Shape/Border */}
                <div className="w-56 h-56 rounded-[48px] overflow-hidden border-[12px] border-slate-50 group-hover:border-indigo-50 transition-all duration-500">
                  <img src={ins.image} alt={ins.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                {/* Rating Badge */}
                <div className="absolute -bottom-4 right-0 bg-white shadow-xl rounded-2xl px-4 py-2 flex items-center gap-1.5 border border-slate-100">
                  <Star size={16} className="text-orange-400 fill-orange-400" />
                  <span className="font-semibold text-[#0F172A] text-sm">{ins.rating}</span>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-semibold text-[#0F172A] mb-1 group-hover:text-[#6366F1] transition-colors">{ins.name}</h3>
                <p className="text-[#6366F1] font-semibold text-sm uppercase tracking-widest mb-4">{ins.role}</p>
                <p className="text-slate-400 text-sm font-semibold mb-6 italic">{ins.exp} Experience</p>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  {[Linkedin, Twitter, Globe].map((Icon, idx) => (
                    <a key={idx} href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#6366F1] hover:text-white transition-all">
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
