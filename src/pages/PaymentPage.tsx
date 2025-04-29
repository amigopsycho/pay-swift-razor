
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PaymentSummary from "@/components/PaymentSummary";
import PaymentCard from "@/components/PaymentCard";
import { initiatePayment, PaymentOptions } from "@/services/razorpay";
import { CreditCard, Wallet, Banknote, Check, Home } from "lucide-react";
import { formatCurrency } from "@/lib/formatters";
import { Button } from "@/components/ui/button";

const FIXED_AMOUNT = 1999;

const PaymentPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [paymentId, setPaymentId] = useState<string>('');
  
  // Default demo user info
  const name = "Demo User";
  const email = "demo@example.com";
  const phone = "9876543210";

  const handlePayment = async () => {
    setLoading(true);
    try {
      const paymentOptions: PaymentOptions = {
        amount: FIXED_AMOUNT,
        name: "Pay Swift Premium Package",
        description: `Payment of ${formatCurrency(FIXED_AMOUNT)}`,
        email: email,
        contact: phone,
        notes: {
          paymentMethod: paymentMethod,
        },
      };

      const response = await initiatePayment(paymentOptions);
      
      if (response && response.razorpay_payment_id) {
        toast.success("Payment successful!", {
          description: `Your payment of ${formatCurrency(FIXED_AMOUNT)} has been completed`,
        });
        
        setPaymentSuccess(true);
        setPaymentId(response.razorpay_payment_id);
      }
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error("Payment Failed", {
        description: "There was an error processing your payment. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  if (paymentSuccess) {
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
                Your payment of {formatCurrency(FIXED_AMOUNT)} has been successfully processed.
              </p>
              
              {paymentId && (
                <div className="bg-gray-50 p-4 rounded-lg w-full mb-6">
                  <p className="text-xs text-gray-500 mb-1">Payment Reference</p>
                  <p className="text-sm font-medium break-all">{paymentId}</p>
                </div>
              )}
              
              <Button 
                onClick={handleGoHome}
                className="w-full bg-payment-primary hover:bg-payment-secondary"
              >
                <Home className="mr-2 h-4 w-4" /> Return to Home
              </Button>
              
              <p className="text-xs text-gray-400 mt-6 text-center">
                A confirmation has been sent to your email address.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-50 p-4 md:p-8">
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6">
        <div className="flex flex-col flex-1">
          <Card className="flex-1 border border-border mb-6">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Premium Package</CardTitle>
              <CardDescription>
                Complete your payment to access all features
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-4">
                <p className="text-sm text-gray-500 mb-1">Amount</p>
                <p className="text-2xl font-bold">{formatCurrency(FIXED_AMOUNT)}</p>
                <p className="text-xs text-gray-400 mt-1">One-time payment</p>
              </div>
              
              <Tabs defaultValue="card" value={paymentMethod} onValueChange={setPaymentMethod}>
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="card">Card</TabsTrigger>
                  <TabsTrigger value="upi">UPI</TabsTrigger>
                  <TabsTrigger value="bank">Banking</TabsTrigger>
                </TabsList>
                
                <TabsContent value="card" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <PaymentCard
                      title="Credit Card"
                      description="Pay with Visa, Mastercard, or RuPay"
                      icon={CreditCard}
                      amount="No extra fees"
                      selected={true}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="upi" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <PaymentCard
                      title="UPI"
                      description="Pay with any UPI app"
                      icon={Wallet}
                      amount="Instant transfer"
                      selected={true}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="bank" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <PaymentCard
                      title="Net Banking"
                      description="Pay with your bank account"
                      icon={Banknote}
                      amount="All banks supported"
                      selected={true}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="w-full md:w-80">
          <PaymentSummary 
            amount={FIXED_AMOUNT} 
            onProceed={handlePayment}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
