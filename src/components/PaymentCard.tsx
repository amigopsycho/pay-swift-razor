
import React from 'react';
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface PaymentCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  amount: string;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  title,
  description,
  icon: Icon,
  amount,
  className,
  onClick,
  selected = false,
}) => {
  return (
    <Card 
      className={cn(
        "payment-card cursor-pointer overflow-hidden transition-all", 
        selected ? "border-payment-primary ring-2 ring-payment-primary/20" : "border-border",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className={cn(
            "p-2 rounded-lg", 
            selected ? "bg-payment-primary/20" : "bg-payment-muted"
          )}>
            <Icon className={cn(
              "h-5 w-5", 
              selected ? "text-payment-primary" : "text-gray-500"
            )} />
          </div>
          {selected && (
            <div className="h-4 w-4 rounded-full bg-payment-primary animate-pulse-soft" />
          )}
        </div>
        <CardTitle className="text-lg mt-2">{title}</CardTitle>
        <CardDescription className="text-sm text-gray-500">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="font-bold text-xl">{amount}</div>
      </CardContent>
    </Card>
  );
};

export default PaymentCard;
