import React from "react";
import { Layers, UserCheck, DollarSign, Star } from "lucide-react";

const features = [
  {
    id: 1,
    icon: <Layers className="w-6 h-6 text-[#6366F1]" />,
    title: "Flexible Learning",
    desc: "Access courses anytime and learn at your own pace.",
  },
  {
    id: 2,
    icon: <UserCheck className="w-6 h-6 text-[#6366F1]" />,
    title: "Expert Instructors",
    desc: "Learn from industry leaders with real-world experience.",
  },
  {
    id: 3,
    icon: <DollarSign className="w-6 h-6 text-[#6366F1]" />,
    title: "Affordable Pricing",
    desc: "High-quality education accessible for everyone.",
  },
  {
    id: 4,
    icon: <Star className="w-6 h-6 text-[#6366F1]" />,
    title: "Quality Experience",
    desc: "Engaging courses with strong student support.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-[#F8FAFC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left: Image */}
          <div className="flex-1 w-full relative group">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
              alt="Why Choose Us" 
              className="w-full h-[500px] lg:h-[650px] object-cover rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] group-hover:scale-[1.02] transition duration-500"
            />
            {/* Floating Element */}
            <div className="absolute -bottom-6 -right-6 lg:-bottom-10 lg:-right-10 bg-white p-6 rounded-[24px] shadow-2xl flex items-center gap-4 max-w-[260px] hidden md:flex animate-bounce-slow">
              <div className="w-14 h-14 rounded-full bg-[#0F172A] flex items-center justify-center flex-shrink-0 shadow-inner">
                 <Star className="w-7 h-7 text-[#6366F1]" />
              </div>
              <div>
                <p className="font-semibold text-[#0F172A] text-xl">4.9/5</p>
                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Top Rated</p>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex-1 w-full">
            <h2 className="text-4xl md:text-5xl font-semibold text-[#0F172A] mb-6 tracking-tight leading-[1.1]">
              Why choose <br/><span className="text-[#6366F1]">StackPath?</span>
            </h2>
            <p className="text-gray-600 mb-12 text-lg md:text-xl leading-relaxed max-w-lg font-medium opacity-80">
              We provide expert-designed courses, flexible learning, exceptional
              support, and a quality learning experience to help you achieve your goals effortlessly.
            </p>

            {/* Feature Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="bg-[#0F172A] rounded-[24px] p-6 shadow-lg hover:-translate-y-2 transition duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-5 group-hover:bg-[#6366F1]/20 transition">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed font-medium">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
