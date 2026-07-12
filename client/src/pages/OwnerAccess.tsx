import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function OwnerAccess() {
  const [accessCode, setAccessCode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  const handleOwnerLogin = () => {
    // Simple owner access code
    if (accessCode === "hsw365owner" || accessCode === "swipeeclean2025") {
      setIsAuthenticated(true);
      localStorage.setItem("ownerAccess", "true");
      toast({
        title: "Owner Access Granted",
        description: "You now have free access to all SwipeeClean features.",
      });
      
      // Redirect to file cleaner
      setTimeout(() => {
        window.location.href = "/real-cleaner";
      }, 1000);
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid owner access code.",
        variant: "destructive",
      });
    }
  };

  if (isAuthenticated || localStorage.getItem("ownerAccess") === "true") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center"
        >
          <Shield className="mx-auto mb-4 text-green-600" size={48} />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Owner Access Active</h2>
          <p className="text-gray-600 mb-6">You have free access to all SwipeeClean Pro features.</p>
          
          <div className="space-y-3">
            <Button
              onClick={() => window.location.href = "/real-cleaner"}
              className="w-full"
            >
              Access File Cleaner
            </Button>
            <Button
              onClick={() => window.location.href = "/"}
              variant="outline"
              className="w-full"
            >
              Back to Home
            </Button>
            <Button
              onClick={() => {
                localStorage.removeItem("ownerAccess");
                setIsAuthenticated(false);
              }}
              variant="ghost"
              className="w-full text-red-600"
            >
              Disable Owner Access
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full"
      >
        <div className="text-center mb-6">
          <Unlock className="mx-auto mb-4 text-blue-600" size={48} />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Owner Access</h2>
          <p className="text-gray-600">Enter access code for free SwipeeClean usage</p>
        </div>

        <div className="space-y-4">
          <div>
            <Input
              type="password"
              placeholder="Enter owner access code"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleOwnerLogin()}
            />
          </div>
          
          <Button onClick={handleOwnerLogin} className="w-full">
            Grant Owner Access
          </Button>
          
          <Button
            onClick={() => window.location.href = "/"}
            variant="outline"
            className="w-full"
          >
            Back to Public Site
          </Button>
        </div>

        <div className="mt-6 text-xs text-gray-500 text-center">
          Owner access bypasses all subscription requirements
        </div>
      </motion.div>
    </div>
  );
}