import { motion } from "framer-motion";
import { Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import OwnerVipBadge from "@/components/OwnerVipBadge";

// Shown to the owner in place of any subscribe/checkout page: owner access is free.
export default function OwnerVip() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
      >
        <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
          <Crown className="text-white" size={28} />
        </div>
        <OwnerVipBadge className="mb-3" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">VIP all access</h2>
        <p className="text-gray-600 mb-6">
          You're signed in as the owner. Every SwipeeClean Pro feature is unlocked for you, with nothing to pay.
        </p>
        <div className="space-y-3">
          <Button onClick={() => (window.location.href = "/real-cleaner")} className="w-full">
            Open Real File Cleaner
          </Button>
          <Button onClick={() => (window.location.href = "/owner-dashboard")} variant="outline" className="w-full">
            Owner Dashboard
          </Button>
          <Button onClick={() => (window.location.href = "/")} variant="ghost" className="w-full">
            Back to Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
