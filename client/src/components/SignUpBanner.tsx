import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Star, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SignUpBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-300" />
                <span className="font-bold text-lg">Sign Up Today!</span>
              </div>
              
              <div className="hidden md:flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-300" />
                  <span>Premium Storage Cleaning</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4 text-green-300" />
                  <span>Advanced Spam Protection</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="w-4 h-4 text-blue-300" />
                  <span>Instant File Analysis</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <div className="text-sm font-medium">$4.99/month</div>
                <div className="text-xs opacity-90">Cancel anytime</div>
              </div>
              
              <Button
                onClick={() => window.location.href = '/subscribe'}
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-6 py-2 text-sm"
              >
                Subscribe Now
              </Button>
              
              <button
                onClick={() => setIsVisible(false)}
                className="text-white hover:text-gray-200 p-1"
                aria-label="Close banner"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile version */}
        <div className="md:hidden px-4 pb-3">
          <div className="flex items-center justify-center space-x-4 text-xs">
            <span>✨ Premium Features</span>
            <span>🛡️ Spam Protection</span>
            <span>⚡ Fast Cleaning</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}