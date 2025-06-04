import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Mail } from "lucide-react";

interface PaymentSuccessProps {
  productName: string;
  onContinue: () => void;
}

export const PaymentSuccess = ({ productName, onContinue }: PaymentSuccessProps) => {
  return (
    <div className="max-w-md mx-auto animate-scale-in">
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-600">
            Payment Successful!
          </CardTitle>
          <CardDescription>
            Thank you for purchasing {productName}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">What happens next?</p>
            <ul className="text-sm text-left space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-500" />
                <span>Confirmation email sent</span>
              </li>
              <li className="flex items-center space-x-2">
                <Download className="h-4 w-4 text-blue-500" />
                <span>Access granted immediately</span>
              </li>
            </ul>
          </div>
          
          <Button onClick={onContinue} className="w-full stripe-button">
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};