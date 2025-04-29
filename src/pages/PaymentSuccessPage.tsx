
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, ArrowRight, Home } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from '@/lib/formatters';

interface PaymentData {
  amount: number;
  paymentId: string;
  currency?: string;
}

const PaymentSuccessPage = () => {
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get payment details from location state
    const state = location.state as { paymentData?: PaymentData };
    if (state?.paymentData) {
      setPaymentData(state.paymentData);
    } else {
      // If no payment data is found, redirect to payment page
      navigate('/payment');
    }
  }, [location, navigate]);

  const handleContinue = () => {
    navigate('/payment');
  };

  const handleHome = () => {
    navigate('/');
  };

  if (!paymentData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-payment-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-4xl mb-8">
        <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg shadow-md animate-fade-in">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <Check className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-800">Payment Successful!</h3>
              <p className="text-green-600">Your purchase was completed successfully.</p>
            </div>
          </div>
        </div>
      </div>
      
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center p-6 animate-fade-in">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            
            <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
            <p className="text-gray-500 mb-6 text-center">
              Your payment of {formatCurrency(paymentData.amount, paymentData.currency || 'INR')} has been successfully processed.
            </p>
            
            {paymentData.paymentId && (
              <div className="bg-gray-50 p-4 rounded-lg w-full mb-6">
                <p className="text-xs text-gray-500 mb-1">Payment Reference</p>
                <p className="text-sm font-medium break-all">{paymentData.paymentId}</p>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button 
                onClick={handleContinue}
                className="w-full bg-payment-primary hover:bg-payment-secondary"
              >
                New Payment <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button 
                onClick={handleHome}
                variant="outline"
                className="w-full"
              >
                <Home className="mr-2 h-4 w-4" /> Home
              </Button>
            </div>
            
            <p className="text-xs text-gray-400 mt-6 text-center">
              A confirmation has been sent to your email address.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;
