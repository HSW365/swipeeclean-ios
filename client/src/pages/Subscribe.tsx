import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

export default function Subscribe() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const isFormValid = formData.firstName && formData.lastName && formData.email && formData.phone;

  const handlePayPalSubscription = () => {
    if (!isFormValid) {
      alert("Please fill in all required fields.");
      return;
    }
    setIsProcessing(true);
    // Store customer info before payment
    localStorage.setItem('swipeeclean_customer', JSON.stringify(formData));
    // Direct PayPal subscription link
    window.location.href = "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-4FF67331KE3635426M3ZU4GQ";
  };

  const handleCashAppPayment = () => {
    if (!isFormValid) {
      alert("Please fill in all required fields.");
      return;
    }
    setIsProcessing(true);
    // Store customer info
    localStorage.setItem('swipeeclean_customer', JSON.stringify(formData));
    // Cash App payment
    window.open("https://cash.app/$hsw365", "_blank");
    setTimeout(() => {
      alert(`After payment, email swipeeclean@gmail.com with:
- Your Cash App username
- Full name: ${formData.firstName} ${formData.lastName}
- Phone: ${formData.phone}
- Email: ${formData.email}
We'll activate your account within 24 hours.`);
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold text-gray-900 ml-2">Subscribe to SwipeeClean</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-8">
        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="mb-6">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">
                SwipeeClean Premium
              </CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold text-green-600">$4.99</span>
                <span className="text-gray-600 ml-2">per month</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Real file scanning & cleaning</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Duplicate file detection</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Storage optimization</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Photo & video organization</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Priority customer support</span>
                </div>
              </div>

              {/* Customer Information Form */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      placeholder="First name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      placeholder="Last name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="(555) 123-4567"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Payment Options */}
              <div className="space-y-3">
                <Button
                  onClick={handlePayPalSubscription}
                  disabled={!isFormValid || isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  {isProcessing ? "Processing..." : "Subscribe with PayPal"}
                </Button>
                
                <Button
                  onClick={handleCashAppPayment}
                  disabled={!isFormValid || isProcessing}
                  variant="outline"
                  className="w-full border-green-500 text-green-600 hover:bg-green-50"
                >
                  💰 Pay with Cash App ($hsw365)
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                Secure payment • Cancel anytime • All fields required • Customer info saved for support
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Info */}
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">
            Questions? Email us at:
          </p>
          <a 
            href="mailto:swipeeclean@gmail.com?subject=SwipeeClean Subscription Question"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            swipeeclean@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}