import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { course } = location.state || {};
   // Get course data from location state
   const {user, token} = useAuth();


  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load Razorpay script
    if (!user) {
      toast.error('You must be logged in to proceed to checkout.');
      navigate('/signin');
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (!course) {
      toast.error('Course details not found for checkout.');
      navigate('/courses');
      return;
    }

    setLoading(true);
    try {
      // Create order on backend
      const orderResponse = await fetch('https://elearn.hharshportfolio.com/api/payment/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: course.price,
          currency: 'INR',
          receipt: `receipt_course_${course._id}`,
        }),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.message || 'Failed to create order');
      }

      const order = await orderResponse.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Your Razorpay Key ID
        amount: order.amount,
        currency: order.currency,
        name: 'E-Learning Platform',
        description: `Purchase of ${course.title}`,
        order_id: order.id,

        handler: async function (response) {
          toast.success('Payment Successful!');

          try {
            // Verify payment on backend
            const verifyResponse = await fetch('https://elearn.hharshportfolio.com/api/payment/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`, // ✅ Add JWT
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                courseId: course._id,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyResponse.ok) {
              toast.success('Course Enrolled Successfully!');
              navigate('/my-courses');
            } else {
              toast.error(verifyData.message || 'Payment verification failed.');
            }
          } catch (err) {
            console.error(err);
            toast.error('Something went wrong verifying payment.');
          }
        },

        prefill: {
          name: 'John Doe', // Replace with user data dynamically
          email: 'john.doe@example.com',
          contact: '9999999999',
        },
        notes: {
          courseId: course._id,
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error(error.message || 'Payment failed. Please try again.');
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <h2 className="text-2xl font-semibold text-red-500 bg-red-50 px-8 py-4 rounded-2xl border border-red-100">Course not selected for checkout.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-12 rounded-3xl shadow-xl border border-slate-100">
        <div>
          <h2 className="text-center text-4xl font-semibold text-[#0F172A] tracking-tight">
            Checkout
          </h2>
          <p className="mt-4 text-center text-slate-500 font-medium">
            Complete your purchase for <span className="text-[#6366F1]">{course.title}</span>
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="space-y-4 rounded-2xl overflow-hidden border border-slate-200">
            <div className="bg-slate-50 p-4 border-b border-slate-200">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest block mb-1">Course Title</label>
              <div className="text-[#0F172A] font-semibold text-lg">{course.title}</div>
            </div>
            <div className="bg-slate-50 p-4">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest block mb-1">Total Amount</label>
              <div className="text-[#6366F1] font-semibold text-2xl">${course.price}</div>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handlePayment}
              disabled={loading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-semibold rounded-2xl text-white bg-[#6366F1] hover:bg-[#4F46E5] transition shadow-lg shadow-indigo-500/20"
            >
              {loading ? 'Processing...' : 'Secure Payment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
