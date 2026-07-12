import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";

export default function Viral() {
  const { user, isAuthenticated } = useAuth();
  const [referralCode] = useState(() => Math.random().toString(36).substring(2, 8).toUpperCase());
  const [shareCount, setShareCount] = useState(0);

  const handleShare = (platform: string) => {
    const shareText = `🔥 I just freed up 12GB on my phone with SwipeClean! Join 2.5M+ users cleaning their storage. Get it FREE: swipeeclean.com/ref/${referralCode}`;
    const shareUrl = `https://swipeeclean.com/ref/${referralCode}`;
    
    let url = '';
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
        break;
      case 'instagram':
        navigator.clipboard.writeText(shareText);
        alert('Story text copied! Paste it in your Instagram Story');
        return;
    }
    
    window.open(url, '_blank');
    setShareCount(prev => prev + 1);
  };

  const viralStats = [
    { label: "Total Shares", value: "2.4M+", trend: "+47%" },
    { label: "Viral Coefficient", value: "3.2x", trend: "+12%" },
    { label: "Countries", value: "180+", trend: "+5" },
    { label: "Daily Growth", value: "15K+", trend: "+28%" }
  ];

  const rewardTiers = [
    { shares: 1, reward: "1 Month Premium FREE", color: "bg-blue-500" },
    { shares: 5, reward: "$25 Cash Bonus", color: "bg-green-500" },
    { shares: 10, reward: "6 Months Premium FREE", color: "bg-purple-500" },
    { shares: 25, reward: "$100 Cash + Lifetime Premium", color: "bg-gold-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <motion.div 
          className="text-center pt-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full mb-4">
            <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
            <span className="font-bold text-sm">VIRAL REWARDS PROGRAM</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Share & Earn Big</h1>
          <p className="text-gray-600">Join 2.5M+ users spreading the storage revolution</p>
        </motion.div>

        {/* Global Stats */}
        <motion.div 
          className="grid grid-cols-2 gap-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          {viralStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-600 mb-1">{stat.label}</div>
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                  {stat.trend}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Your Referral Code */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardContent className="p-6 text-center">
              <h3 className="font-bold text-lg mb-3">Your Referral Code</h3>
              <div className="bg-white/20 rounded-lg p-4 mb-4">
                <div className="text-3xl font-bold tracking-wider">{referralCode}</div>
                <div className="text-sm opacity-90">swipeeclean.com/ref/{referralCode}</div>
              </div>
              <div className="text-sm opacity-90">
                Earn $10 for every friend who joins + they get 1 month FREE
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Share Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg text-center mb-4">Share on Social Media</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={() => handleShare('twitter')}
                  className="bg-blue-400 hover:bg-blue-500 text-white"
                >
                  🐦 Twitter
                </Button>
                <Button 
                  onClick={() => handleShare('facebook')}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  📘 Facebook
                </Button>
                <Button 
                  onClick={() => handleShare('whatsapp')}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  📱 WhatsApp
                </Button>
                <Button 
                  onClick={() => handleShare('instagram')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  📸 Instagram
                </Button>
              </div>
              
              {shareCount > 0 && (
                <div className="mt-4 text-center">
                  <Badge className="bg-green-100 text-green-800">
                    🎉 {shareCount} shares completed!
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Reward Tiers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg text-center mb-4">Unlock Rewards</h3>
              <div className="space-y-3">
                {rewardTiers.map((tier, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${tier.color}`}></div>
                      <div>
                        <div className="font-semibold text-sm">{tier.shares} Shares</div>
                        <div className="text-xs text-gray-600">{tier.reward}</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {shareCount >= tier.shares ? "✅ Unlocked" : `${tier.shares - shareCount} more`}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Success Stories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-blue-50">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg text-center mb-4">🏆 Top Referrers This Month</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🥇</span>
                    <div>
                      <div className="font-semibold text-sm">Sarah M. (USA)</div>
                      <div className="text-xs text-gray-600">247 referrals</div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">$2,470 earned</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🥈</span>
                    <div>
                      <div className="font-semibold text-sm">Alex R. (UK)</div>
                      <div className="text-xs text-gray-600">189 referrals</div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">$1,890 earned</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🥉</span>
                    <div>
                      <div className="font-semibold text-sm">Maria L. (Brazil)</div>
                      <div className="text-xs text-gray-600">156 referrals</div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">$1,560 earned</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button 
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white py-6 text-lg font-bold shadow-xl"
            onClick={() => window.location.href = '/organize'}
          >
            🚀 Start Cleaning & Sharing Now
          </Button>
        </motion.div>
      </div>
    </div>
  );
}