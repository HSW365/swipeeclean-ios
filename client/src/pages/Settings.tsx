import { motion } from "framer-motion";
import { Settings as SettingsIcon, Mail, User, Shield, HelpCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

export default function Settings() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold text-gray-900 ml-2">Settings</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-8 space-y-6">
        {/* Account Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2" size={20} />
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-900 mb-1">Owner Email</p>
                <p className="text-gray-600">swipeeclean@gmail.com</p>
                <p className="text-xs text-gray-500 mt-1">App owner access only</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-900 mb-1">Account Type</p>
                <p className="text-green-600 font-medium">SwipeeClean Free</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="mr-2" size={20} />
                Customer Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-900 mb-2">Need Help?</p>
                <p className="text-blue-700 text-sm mb-3">
                  Contact our support team for assistance with storage cleaning, technical issues, or general questions.
                </p>
                <a 
                  href="mailto:swipeeclean@gmail.com?subject=SwipeeClean Support Request&body=Hi SwipeeClean Team,%0A%0AI need help with:%0A%0A[Describe your issue here]%0A%0AThanks!"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  <Mail className="mr-2" size={16} />
                  swipeeclean@gmail.com
                </a>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <Button variant="outline" className="justify-start">
                  <HelpCircle className="mr-2" size={16} />
                  FAQ & Help Center
                </Button>
                <Button variant="outline" className="justify-start">
                  <Shield className="mr-2" size={16} />
                  Privacy Policy
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* App Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <SettingsIcon className="mr-2" size={20} />
                App Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Version</span>
                <span className="font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Last Updated</span>
                <span className="font-medium">January 2025</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Platform</span>
                <span className="font-medium">Web App</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Footer */}
        <div className="text-center pt-4">
          <p className="text-xs text-gray-500 mb-2">
            SwipeeClean - Professional Storage Management
          </p>
          <p className="text-xs text-gray-400">
            © 2025 SwipeeClean. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}