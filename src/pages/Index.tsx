
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  const handleBuyNow = () => {
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-4xl">
        <div className="bg-gradient-to-r from-payment-primary to-payment-secondary p-8 rounded-xl mb-8 text-white shadow-lg">
          <h1 className="text-3xl font-bold mb-2">Pay Swift</h1>
          <p className="text-xl opacity-90">Fast, Simple, Secure Payments</p>
          <p className="mt-4 opacity-80">Experience seamless transactions with our easy-to-use payment platform</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="shadow-md border-border">
            <CardHeader>
              <CardTitle>Premium Package</CardTitle>
              <CardDescription>One-time payment for full access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-3xl font-bold">₹1,999</div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="bg-green-100 text-green-600 rounded-full w-5 h-5 flex items-center justify-center mr-2">✓</span>
                  Complete feature access
                </li>
                <li className="flex items-center">
                  <span className="bg-green-100 text-green-600 rounded-full w-5 h-5 flex items-center justify-center mr-2">✓</span>
                  Priority support
                </li>
                <li className="flex items-center">
                  <span className="bg-green-100 text-green-600 rounded-full w-5 h-5 flex items-center justify-center mr-2">✓</span>
                  Lifetime updates
                </li>
                <li className="flex items-center">
                  <span className="bg-green-100 text-green-600 rounded-full w-5 h-5 flex items-center justify-center mr-2">✓</span>
                  No recurring charges
                </li>
              </ul>
              <Button 
                onClick={handleBuyNow} 
                className="w-full bg-payment-primary hover:bg-payment-secondary"
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> Buy Now
              </Button>
            </CardContent>
          </Card>
          
          <Card className="shadow-md border-border">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Why Choose Pay Swift?</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium">Secure Payments</h4>
                  <p className="text-sm text-gray-600">All transactions are encrypted and secure</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium">Instant Confirmation</h4>
                  <p className="text-sm text-gray-600">Get immediate payment confirmations</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium">Multiple Payment Options</h4>
                  <p className="text-sm text-gray-600">Pay via cards, UPI, or net banking</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
