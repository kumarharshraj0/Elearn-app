import React from "react";
import { Layers, UserCheck, DollarSign, Star, BookOpen } from "lucide-react";

const features = [
  {
    id: 1,
    icon: <Layers className="w-8 h-8 text-lime-400" />,
    title: "Flexible, On-Demand Learning",
    desc: "Access courses anytime, anywhere, and learn at your own pace.",
  },
  {
    id: 2,
    icon: <UserCheck className="w-8 h-8 text-lime-400" />,
    title: "Expert Instructors",
    desc: "Learn from industry leaders and professionals with real-world experience.",
  },
  {
    id: 3,
    icon: <DollarSign className="w-8 h-8 text-lime-400" />,
    title: "Affordable & Accessible",
    desc: "High-quality education at prices designed to be accessible for everyone.",
  },
  {
    id: 4,
    icon: <Star className="w-8 h-8 text-lime-400" />,
    title: "Quality Learning Experience",
    desc: "Engaging courses with interactive tools and strong student support.",
  },
  {
    id: 5,
    icon: <BookOpen className="w-8 h-8 text-lime-400" />,
    title: "Innovative Tools",
    desc: "Cutting-edge features to make your learning journey smooth and enjoyable.",
  },

  {
    id: 6,
    icon: <BookOpen className="w-8 h-8 text-lime-400" />,
    title: "Innovative Tools",
    desc: "Cutting-edge features to make your learning journey smooth and enjoyable.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Why choose <span className="text-green-700">Tutomile</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          We provide expert-designed courses, flexible learning, exceptional
          support, innovative tools, and a quality learning experience.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-[#062B26] rounded-2xl p-8 text-left flex flex-col justify-between h-60"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
