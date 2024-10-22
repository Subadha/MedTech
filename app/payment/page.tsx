'use client';

import { useState } from 'react';

const RazorpayPaymentButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setIsLoading(true);

    const res = await loadRazorpayScript();
    if (!res) {
      alert('Razorpay SDK failed to load. Please try again.');
      setIsLoading(false);
      return;
    }

    // Create an order by calling your backend API
    const orderRes = await fetch('/api/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: 1, currency: 'INR' }), // Example amount of 500 INR
    });

    const orderData = await orderRes.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'Your App Name',
      description: 'Test Transaction',
      image: '/your-logo.png',
      order_id: orderData.id,
      handler: (response:any) => {
        alert(`Payment Successful. Razorpay Payment ID: ${response.razorpay_payment_id}`);
        // Implement any post-payment logic like order confirmation or updating payment status here
      },
      prefill: {
        name: 'Adarsh Yadav',
        email: 'adarsh@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Adarsh Yadav Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    setIsLoading(false);
  };

  return (
    <div>
      <button
        onClick={handlePayment}
        disabled={isLoading}
        className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
      >
        {isLoading ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
};

export default RazorpayPaymentButton;
