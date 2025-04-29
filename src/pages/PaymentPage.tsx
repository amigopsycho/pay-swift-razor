
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PaymentSummary from "@/components/PaymentSummary";
import PaymentCard from "@/components/PaymentCard";
import { initiatePayment, PaymentOptions } from "@/services/razorpay";
import { CreditCard, Wallet, Banknote } from "lucide-react";
import { formatCurrency } from "@/lib/formatters";

const FIXED_AMOUNT = 1999;

const PaymentPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  
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
        toast({
          title: "Payment Successful",
          description: `Your payment of ${formatCurrency(FIXED_AMOUNT)} has been completed`,
        });
        
        // Navigate to success page with payment details
        navigate('/payment-success', {
          state: {
            paymentData: {
              amount: FIXED_AMOUNT,
              paymentId: response.razorpay_payment_id,
              currency: 'INR'
            }
          }
        });
      }
    } catch (error) {
      console.error("Payment failed:", error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
