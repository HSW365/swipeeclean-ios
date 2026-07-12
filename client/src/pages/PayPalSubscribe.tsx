import { motion } from "framer-motion";
import { Crown, Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import SimplePayPalButton from "@/components/SimplePayPalButton";

export default function PayPalSubscribe() {
  const features = [
    "Unlimited storage cleaning",
    "Smart duplicate detection", 
    "Advanced file organization",
    "Spam call & text blocking",
    "Spy detection & caller ID",
    "Priority customer support",
    "No ads, ever"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center">
          <Link href="/profile">
            <Button variant="ghost" size="sm">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold text-gray-900 ml-2">Subscribe to SwipeeClean Pro</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-8">
        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="mb-8">
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-4 flex items-center justify-center">
                <img src="@assets/swipeeclean logo_1754327947218.png" alt="SwipeeClean Logo" className="h-12" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">SwipeeClean Pro</h2>
              <p className="text-gray-600 mb-6">Complete digital security suite</p>

              <div className="mb-6">
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-bold text-gray-900">$4.99</span>
                  <span className="text-lg text-gray-600 ml-2">/month</span>
                </div>
                <p className="text-red-600 text-sm font-bold">⚠️ PREMIUM SUBSCRIPTION REQUIRED</p>
              </div>

              <div className="space-y-3 text-left mb-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                  >
                    <Check className="text-green-500 flex-shrink-0" size={16} />
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* PayPal Payment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Complete Your Subscription
              </h3>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 text-sm font-medium">
                  ✅ Secure PayPal checkout - Start your subscription instantly
                </p>
                <p className="text-green-600 text-xs mt-1">
                  Automatic recurring billing • Cancel anytime in PayPal
                </p>
              </div>

              {/* Simple PayPal Button */}
              <div className="paypal-button-container">
                <SimplePayPalButton />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="text-center mt-6 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex items-center justify-center space-x-6 text-gray-400">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm1.659-4.013h2.19c4.298 0 7.664-1.747 8.647-6.797.03-.149.054-.294.077-.437.292-1.867-.002-3.136-1.012-4.287C17.525.543 15.517 0 12.947 0H5.487c-.524 0-.972.382-1.054.901L1.326 20.597a.641.641 0 0 0 .633.74h4.606c.524 0 .968-.382 1.05-.9l1.12-7.113z"/>
            </svg>
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
            </svg>
          </div>
          <p className="text-sm text-gray-500">Secured by PayPal • Privacy focused • Cancel anytime</p>
        </motion.div>
      </div>
    </div>
  );
}