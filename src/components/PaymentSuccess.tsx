
import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { formatCurrency } from '@/lib/formatters';

interface PaymentSuccessProps {
  amount: number;
  paymentId?: string;
  onContinue: () => void;
  currency?: string;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({
  amount,
  paymentId,
  onContinue,
  currency = "INR"
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <Check className="w-8 h-8 text-green-500" />
      </div>
      
      <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
      <p className="text-gray-500 mb-6 text-center">
        Your payment of {formatCurrency(amount, currency)} has been successfully processed.
      </p>
      
      {paymentId && (
        <div className="bg-gray-50 p-4 rounded-lg w-full mb-6">
          <p className="text-xs text-gray-500 mb-1">Payment Reference</p>
          <p className="text-sm font-medium break-all">{paymentId}</p>
        </div>
      )}
      
      <Button 
        onClick={onContinue}
        className="w-full bg-payment-primary hover:bg-payment-secondary"
      >
        Continue <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      
      <p className="text-xs text-gray-400 mt-6 text-center">
        A confirmation has been sent to your email address.
      </p>
    </div>
  );
};

export default PaymentSuccess;
