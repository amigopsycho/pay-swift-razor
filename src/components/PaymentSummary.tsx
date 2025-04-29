
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/formatters";

interface PaymentSummaryProps {
  amount: number;
  discount?: number;
  tax?: number;
  onProceed: () => void;
  loading?: boolean;
  currency?: string;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  amount,
  discount = 0,
  tax = 0,
  onProceed,
  loading = false,
  currency = "INR"
}) => {
  const subtotal = amount;
  const discountAmount = discount;
  const taxAmount = tax > 0 ? (subtotal - discountAmount) * (tax / 100) : 0;
  const total = subtotal - discountAmount + taxAmount;

  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="text-lg">Payment Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Subtotal</span>
          <span>{formatCurrency(subtotal, currency)}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Discount</span>
            <span className="text-green-500">-{formatCurrency(discountAmount, currency)}</span>
          </div>
        )}
        
        {tax > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Tax ({tax}%)</span>
            <span>{formatCurrency(taxAmount, currency)}</span>
          </div>
        )}
        
        <Separator />
        
        <div className="flex justify-between items-center font-medium">
          <span>Total</span>
          <span className="text-lg font-bold">{formatCurrency(total, currency)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-payment-primary hover:bg-payment-secondary"
          onClick={onProceed}
          disabled={loading}
        >
          {loading ? "Processing..." : `Pay ${formatCurrency(total, currency)}`}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentSummary;
