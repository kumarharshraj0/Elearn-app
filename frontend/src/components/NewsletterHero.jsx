import React from "react";
import { Send } from "lucide-react";

export default function NewsletterHero() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto bg-[#6366F1] rounded-[48px] p-12 lg:p-24 relative overflow-hidden shadow-2xl shadow-indigo-500/40">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 tracking-tight leading-[1.1]">
              Level up your <br /> career in <span className="text-[#B8FF3F]">10 minutes</span> a week.
            </h2>
            <p className="text-indigo-100 text-lg md:text-xl font-medium max-w-xl">
              Join 100,000+ ambitious learners. Get the latest courses, tech trends, and career advice delivered straight to your inbox.
            </p>
          </div>

          <div className="flex-1 w-full max-w-md">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-[32px] border border-white/20 shadow-2xl">
              <form className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="name@email.com" 
                  className="flex-1 bg-white px-6 py-4 rounded-2xl outline-none focus:ring-4 ring-indigo-500/20 text-[#0F172A] font-semibold placeholder:text-slate-400"
                  required
                />
                <button className="bg-[#0F172A] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#1E293B] transition shadow-lg flex items-center justify-center gap-2 group">
                  Subscribe
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
              <p className="text-indigo-100/60 text-xs font-semibold mt-4 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
