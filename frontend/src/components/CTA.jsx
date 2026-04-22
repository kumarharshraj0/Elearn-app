import React from "react";

const images = [
  "/images/user1.jpg",
  "/images/user2.jpg",
  "/images/user3.jpg",
  "/images/user4.jpg",
  "/images/user5.jpg",
  "/images/user6.jpg",
];

export default function CTA() {
  return (
    <section className="relative w-full h-[450px] overflow-hidden flex items-center justify-center">
      {/* Background Animation Rows */}
      <div className="absolute w-full h-full overflow-hidden">
        {/* Row 1 - Left to Right */}
        <div className="flex animate-scroll-left">
          {images.concat(images).map((img, index) => (
            <img
              key={index}
              src={img}
              alt="community"
              className="w-32 h-32 object-cover opacity-20 mx-2 rounded-lg"
            />
          ))}
        </div>

        {/* Row 2 - Right to Left */}
        <div className="flex animate-scroll-right mt-6">
          {images.concat(images).map((img, index) => (
            <img
              key={index}
              src={img}
              alt="community"
              className="w-32 h-32 object-cover opacity-20 mx-2 rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* Indigo Overlay */}
      <div className="absolute inset-0 bg-[#0F172A] bg-opacity-90"></div>

      {/* Text Content */}
      <div className="relative z-10 text-center text-white max-w-2xl px-4">
        <h2 className="text-3xl md:text-5xl font-semibold mb-4">
          Join a thriving global learning community
        </h2>
        <p className="text-lg mb-6">
          Connect with thousands of learners from around the world. Share ideas,
          collaborate on projects, and grow together in a supportive and
          inspiring environment.
        </p>
        <button className="bg-[#6366F1] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-[#4F46E5] transition shadow-lg shadow-indigo-500/30">
          Join Now
        </button>
      </div>
    </section>
  );
}
