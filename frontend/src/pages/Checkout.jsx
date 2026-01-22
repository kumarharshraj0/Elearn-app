import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
      const orderResponse = await fetch('http://localhost:5000/api/payment/orders', {
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
            const verifyResponse = await fetch('http://localhost:5000/api/payment/verify', {
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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <h2 className="text-2xl font-bold text-red-600">Course not selected for checkout.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Checkout
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Complete your purchase for {course.title}
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="course-name" className="sr-only">
                Course Name
              </label>
              <input
                id="course-name"
                name="course-name"
                type="text"
                readOnly
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-t-md focus:outline-none"
                value={course.title}
              />
            </div>
            <div>
              <label htmlFor="course-price" className="sr-only">
                Course Price
              </label>
              <input
                id="course-price"
                name="course-price"
                type="text"
                readOnly
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-b-md focus:outline-none"
                value={`INR ${course.price}`}
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handlePayment}
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              {loading ? 'Processing...' : 'Pay with Razorpay'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
