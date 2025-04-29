
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PaymentSummary from "@/components/PaymentSummary";
import PaymentSuccess from "@/components/PaymentSuccess";
import PaymentCard from "@/components/PaymentCard";
import { initiatePayment, PaymentOptions } from "@/services/razorpay";
import { CreditCard, Wallet, Banknote } from "lucide-react";
import { formatCurrency } from "@/lib/formatters";

const PaymentPage = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState<number>(1000);
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [paymentId, setPaymentId] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [name, setName] = useState<string>('');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };

  const handlePayment = async () => {
    if (amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid payment amount",
        variant: "destructive",
      });
      return;
    }

    if (!name || !email) {
      toast({
        title: "Missing information",
        description: "Please provide your name and email",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    try {
      const paymentOptions: PaymentOptions = {
        amount: amount,
        name: "Pay Swift",
        description: `Payment of ${formatCurrency(amount)}`,
        email: email,
        contact: phone,
        notes: {
          paymentMethod: paymentMethod,
        },
      };

      const response = await initiatePayment(paymentOptions);
      
      if (response && response.razorpay_payment_id) {
        setPaymentId(response.razorpay_payment_id);
        setPaymentSuccess(true);
        toast({
          title: "Payment Successful",
          description: `Your payment of ${formatCurrency(amount)} has been completed`,
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

  const resetPayment = () => {
    setPaymentSuccess(false);
    setPaymentId('');
    setAmount(1000);
    setEmail('');
    setPhone('');
    setName('');
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <PaymentSuccess 
              amount={amount} 
              paymentId={paymentId} 
              onContinue={resetPayment} 
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-50 p-4 md:p-8">
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6">
        <Card className="flex-1 border border-border">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Pay Swift</CardTitle>
            <CardDescription>
              Enter your details to complete the payment
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                <Input 
                  id="amount"
                  type="number"
                  value={amount || ''}
                  onChange={handleAmountChange}
                  className="pl-8"
                  placeholder="Enter amount"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input 
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
              />
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
        
        <div className="w-full md:w-80">
          <PaymentSummary 
            amount={amount} 
            onProceed={handlePayment}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
