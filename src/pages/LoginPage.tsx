
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState<string>('demo@example.com');
  const [password, setPassword] = useState<string>('demo1234');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login with demo credentials
    setTimeout(() => {
      // Store user info in localStorage to simulate logged-in state
      localStorage.setItem('demoUser', JSON.stringify({
        name: 'Demo User',
        email: 'demo@example.com',
        phone: '9876543210'
      }));
      
      toast({
        title: "Login Successful",
        description: "Welcome to Pay Swift!",
      });
      
      navigate('/payment');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md border border-border animate-fade-in">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-payment-primary/20 flex items-center justify-center">
              <User className="h-6 w-6 text-payment-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Pay Swift</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="demo@example.com"
                required
              />
              <p className="text-xs text-gray-500">Use: demo@example.com</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <p className="text-xs text-gray-500">Use: demo1234</p>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-payment-primary hover:bg-payment-secondary" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="mr-2">Logging in</span>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </>
              ) : 'Login'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-xs text-muted-foreground">
            Demo credentials are pre-filled. Just click login.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
