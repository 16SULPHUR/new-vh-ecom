import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

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
  amount: number;
  currency?: string;
  businessName?: string;
  prefill?: PrefillData;
  lineItems: any[]; // Add lineItems prop
  onSuccess?: (data: SuccessCallback) => void;
  onFailure?: (error: FailureCallback) => void;
}

// Razorpay Window Interface
interface RazorpayInstance {
  on(event: string, callback: (response: RazorpayErrorResponse) => void): void;
  open(): void;
}

interface RazorpayConstructor {
  new(options: RazorpayOptions): RazorpayInstance;
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
  amount,
  currency = 'INR',
  businessName = 'Your Business',
  prefill = {},
  lineItems, // Destructure lineItems
  onSuccess,
  onFailure
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log(lineItems)

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

  const createOrder = async (): Promise<string> => {
    try {
      const response = await fetch('https://ecom.varietyheaven.in/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          currency: currency,
          receipt: `receipt_${Date.now()}`,
          notes: {},
          line_items_total: amount,
          line_items: lineItems, // Use lineItems from props
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const data = await response.json();
      return data.order.id;
    } catch (err) {
      console.error('Error creating order:', err);
      throw err;
    }
  };

  const handlePayment = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      // Step 1: Create an order using the API
      const orderId = await createOrder();

      // Step 2: Initialize Razorpay payment
      if (typeof window === 'undefined' || !window.Razorpay) {
        throw new Error('Razorpay SDK not loaded');
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
            signature: response.razorpay_signature,
          });
        },
        prefill: {
          name: prefill.name || '',
          email: prefill.email || '',
          contact: prefill.contact || '',
        },
        notes: {
          address: prefill.address || '',
        },
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
          paymentId: response.error.metadata.payment_id,
        });
      });

      razorpay.open();
    } catch (err) {
      console.error('Payment failed:', err);
      setError('Failed to initiate payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full'>
      {/* <Button
        className="bg-pink-600 hover:bg-pink-700 w-full"
        onClick={handlePayment}
        disabled={loading}
      >

        {loading ? 'Processing...' : 'Checkout'}
      </Button> */}

      <a href="#_" className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden border border-pink-600 font-semibold text-pink-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 group w-full" onClick={handlePayment}>
        <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-pink-600 group-hover:h-full"></span>
        <span className="absolute right-28 pr-4 duration-200 ease-out group-hover:translate-x-40">
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </span>
        <span className="absolute left-28 pl-2.5 -translate-x-40 group-hover:translate-x-0 ease-out duration-200">
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </span>
        {/* <span className="relative w-full text-center transition-colors duration-200 ease-in-out group-hover:text-white">Button Text</span> */}
        <button
        className="relative w-full text-lg text-center transition-colors duration-200 ease-in-out group-hover:text-white"
        onClick={handlePayment}
        disabled={loading}
      >

        {loading ? 'Processing...' : 'Checkout'}
      </button>
      </a>


      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default RazorpayCheckout;