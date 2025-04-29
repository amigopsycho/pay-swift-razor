
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, User } from 'lucide-react';

interface UserData {
  name: string;
  email: string;
  phone?: string;
}

const LoggedInUser: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem('demoUser');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    } else {
      // Redirect to login if not logged in
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('demoUser');
    navigate('/login');
  };

  if (!userData) {
    return null;
  }

  return (
    <Card className="mb-6 border border-border animate-fade-in">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-payment-primary/20 flex items-center justify-center mr-3">
              <User className="h-5 w-5 text-payment-primary" />
            </div>
            <div>
              <h3 className="font-medium">{userData.name}</h3>
              <p className="text-sm text-gray-500">{userData.email}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center">
            <LogOut className="h-4 w-4 mr-1" />
            Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoggedInUser;
