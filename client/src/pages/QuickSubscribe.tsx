import { useState } from "react";
import { motion } from "framer-motion";
import { Crown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";

export default function QuickSubscribe() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQuickSubscribe = async () => {
    setIsProcessing(true);
    
    try {
      const response = await apiRequest("POST", "/api/quick-subscribe");
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Success!",
          description: "You are now subscribed to SwipeeClean Pro!",
        });
        // Redirect to home page
        setLocation("/");
      } else {
        throw new Error(data.message || "Subscription failed");
      }
    } catch (error: any) {
      toast({
        title: "Subscription Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          {/* Logo */}
          <div className="w-16 h-16 bg-blue-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 3V4H4V6H5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V6H20V4H15V3H9M7 6H17V19H7V6M9 8V17H11V8H9M13 8V17H15V8H13Z"/>
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Join SwipeeClean Pro
          </h1>
          <p className="text-gray-600 mb-8">
            Welcome {user?.firstName || user?.email}! Get instant access to premium features.
          </p>
        </motion.div>

        <Card className="border-2 border-blue-200 shadow-lg">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <Crown className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
              <h2 className="text-xl font-bold text-gray-900">SwipeeClean Pro</h2>
              <div className="text-3xl font-bold text-blue-600">$4.99<span className="text-lg text-gray-500">/month</span></div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Unlimited storage cleaning</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Photo & video organization</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Gmail email cleanup</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">iCloud storage optimization</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Priority customer support</span>
              </div>
            </div>

            <Button 
              onClick={handleQuickSubscribe}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
              disabled={isProcessing}
            >
              {isProcessing ? "Activating..." : "Start Pro Subscription"}
            </Button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Demo mode - no payment required for testing
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}