// import React from "react";
// import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";

// const PaymentComponent = () => {
//     const { error, isLoading, Razorpay } = useRazorpay();

//     const handlePayment = () => {
//         const options: RazorpayOrderOptions = {
//             order_id: "order_PjOFen4EdbbVmE",
//             key: "rzp_test_TZWS6YJ21K4x2r",
//             amount: 50000, // Amount in paise
//             currency: "INR",
//             name: "Test Company",
//             description: "Test Transaction",
//             handler: (response) => {
//                 console.log(response);
//                 alert("Payment Successful!");
//             },
//             prefill: {
//                 name: "John Doe",
//                 email: "john.doe@example.com",
//                 contact: "9999999999",
//             },
//             theme: {
//                 color: "#F37254",
//             },
//         };

//         const razorpayInstance = new Razorpay(options);
//         razorpayInstance.open();
//     };

//     return (
//         <div>
//             <h1>Payment Page</h1>
//             {isLoading && <p>Loading Razorpay...</p>}
//             {error && <p>Error loading Razorpay: {error}</p>}
//             <button onClick={handlePayment} disabled={isLoading}>
//                 Pay Now
//             </button>
//         </div>
//     );
// };

// export default PaymentComponent;

import React, { useEffect } from 'react';

// Razorpay Response Types
interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayErrorResponse {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata: {
      order_id: string;
      payment_id: string;
    };
  };
}

// Component Props Types
interface PrefillData {
  name?: string;
  email?: string;
  contact?: string;
  address?: string;
}

interface SuccessCallback {
  paymentId: string;
  orderId: string;
  signature: string;
}

interface FailureCallback {
  code: string;
  description: string;
  source: string;
  step: string;
  reason: string;
  orderId: string;
  paymentId: string;
}

interface RazorpayCheckoutProps {
  keyId: string;
  orderId: string;
  businessName?: string;
  prefill?: PrefillData;
  onSuccess?: (data: SuccessCallback) => void;
  onFailure?: (error: FailureCallback) => void;
}

// Razorpay Window Interface
interface RazorpayInstance {
  on(event: string, callback: (response: RazorpayErrorResponse) => void): void;
  open(): void;
}

interface RazorpayConstructor {
  new (options: RazorpayOptions): RazorpayInstance;
}

interface RazorpayOptions {
  key: string;
  order_id: string;
  one_click_checkout: boolean;
  name: string;
  show_coupons: boolean;
  handler: (response: RazorpaySuccessResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: {
    address: string;
  };
}

// Extend Window interface to include Razorpay
declare global {
  interface Window {
    Razorpay: RazorpayConstructor;
  }
}

const RazorpayCheckout: React.FC<RazorpayCheckoutProps> = ({ 
  keyId, 
  orderId, 
  businessName = 'Your Business',
  prefill = {},
  onSuccess,
  onFailure 
}) => {
  useEffect(() => {
    // Load Razorpay Script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/magic-checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = (): void => {
    if (typeof window === 'undefined' || !window.Razorpay) {
      console.error('Razorpay SDK not loaded');
      return;
    }

    const options: RazorpayOptions = {
      key: keyId,
      order_id: orderId,
      one_click_checkout: true,
      name: businessName,
      show_coupons: true,
      handler: function (response: RazorpaySuccessResponse) {
        onSuccess?.({
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature
        });
      },
      prefill: {
        name: prefill.name || '',
        email: prefill.email || '',
        contact: prefill.contact || ''
      },
      notes: {
        address: prefill.address || ''
      }
    };

    const razorpay = new window.Razorpay(options);

    razorpay.on('payment.failed', function (response: RazorpayErrorResponse) {
      onFailure?.({
        code: response.error.code,
        description: response.error.description,
        source: response.error.source,
        step: response.error.step,
        reason: response.error.reason,
        orderId: response.error.metadata.order_id,
        paymentId: response.error.metadata.payment_id
      });
    });

    razorpay.open();
  };

  return (
    <button 
      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      onClick={handlePayment}
    >
      Pay Now
    </button>
  );
};

export default RazorpayCheckout;