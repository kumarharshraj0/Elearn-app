import React from "react";

const logos = [
  "Google", "Microsoft", "Meta", "Amazon", "Netflix", "Coursera", "Udemy", "LinkedIn"
];

export default function TrustedBy() {
  return (
    <section className="py-12 bg-white border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-slate-400 text-sm font-semibold uppercase tracking-[0.2em] mb-10">
          Trusted by the world's most innovative companies
        </p>
        
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-16 py-4">
            {logos.concat(logos).map((logo, index) => (
              <span 
                key={index} 
                className="text-2xl md:text-3xl font-semibold text-slate-200 hover:text-[#6366F1] transition-colors cursor-default select-none grayscale hover:grayscale-0"
              >
                {logo}
              </span>
            ))}
          </div>
          
          {/* Duplicate for seamless loop if CSS doesn't handle full width */}
          <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-16 py-4">
            {logos.concat(logos).map((logo, index) => (
              <span 
                key={index} 
                className="text-2xl md:text-3xl font-semibold text-slate-200 hover:text-[#6366F1] transition-colors cursor-default select-none grayscale hover:grayscale-0"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
