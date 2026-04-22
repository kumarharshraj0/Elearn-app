import React from 'react';
import { Link } from 'react-router-dom';

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-12 rounded-3xl shadow-xl border border-slate-100 text-center">
        <div className="mx-auto h-24 w-24 bg-green-50 rounded-full flex items-center justify-center text-green-500">
          <svg
            className="h-12 w-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h2 className="mt-8 text-center text-4xl font-semibold text-[#0F172A] tracking-tight">
          Payment Successful!
        </h2>
        <p className="mt-4 text-center text-lg text-slate-500 leading-relaxed">
          Welcome to the course! Your transaction was successful and you can now start learning.
        </p>
        <div className="mt-6">
          <Link
            to="/user/dashboard"
            className="inline-flex items-center px-10 py-4 bg-[#6366F1] text-white text-lg font-semibold rounded-full shadow-lg shadow-indigo-500/20 hover:bg-[#4F46E5] transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
