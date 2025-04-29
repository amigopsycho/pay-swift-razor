
import { toast } from "sonner";

declare global {
  interface Window {
    Razorpay: any;
  }
}

// Test credentials
const RAZORPAY_KEY_ID = "rzp_test_awTMufvqTVtgia";

export interface PaymentOptions {
  amount: number;
  currency?: string;
  name: string;
  description?: string;
  orderId?: string;
  email?: string;
  contact?: string;
  notes?: Record<string, string>;
}

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      return resolve(true);
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => {
      toast.error("Failed to load Razorpay SDK");
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const initiatePayment = async (options: PaymentOptions): Promise<any> => {
  const scriptLoaded = await loadRazorpayScript();
  if (!scriptLoaded) {
    return false;
  }

  const paymentOptions = {
    key: RAZORPAY_KEY_ID,
    amount: options.amount * 100, // Razorpay takes amount in paise
    currency: options.currency || "INR",
    name: options.name,
    description: options.description || "Purchase",
    order_id: options.orderId,
    handler: function (response: any) {
      // This function will be called when payment is successful
      return response;
    },
    prefill: {
      email: options.email || "",
      contact: options.contact || "",
    },
    notes: options.notes || {},
    theme: {
      color: "#9b87f5",
    },
  };

  const razorpay = new window.Razorpay(paymentOptions);
  razorpay.open();

  return new Promise((resolve) => {
    paymentOptions.handler = (response: any) => {
      resolve(response);
    };
  });
};
