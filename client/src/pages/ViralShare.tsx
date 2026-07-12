import { useState } from "react";
import { Share2, Copy, Twitter, Facebook, Instagram, MessageSquare, Smartphone, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import SignUpBanner from "@/components/SignUpBanner";

export default function ViralShare() {
  const { toast } = useToast();
  const [shareCount, setShareCount] = useState(2847321); // Dynamic counter

  const shareUrl = "https://swipeeclean.com";
  const shareText = "🔥 Found 50GB of hidden junk on my phone with SwipeeClean! This app is incredible - freed up massive storage in 30 seconds. Try it: swipeeclean.com #StorageCleaning #PhoneHacks";

  const handleShare = (platform: string) => {
    setShareCount(prev => prev + 1);
    
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      instagram: `https://www.instagram.com/`, // Opens Instagram app
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    };

    if (urls[platform as keyof typeof urls]) {
      window.open(urls[platform as keyof typeof urls], '_blank');
      
      toast({
        title: "Shared Successfully!",
        description: `Posted to ${platform.charAt(0).toUpperCase() + platform.slice(1)}. You're helping spread the word!`,
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareText);
    toast({
      title: "Copied!",
      description: "Share text copied to clipboard",
    });
  };

  const viralStats = [
    { label: "Total Shares", value: shareCount.toLocaleString(), icon: Share2, color: "text-blue-600" },
    { label: "Countries Reached", value: "167", icon: TrendingUp, color: "text-green-600" },
    { label: "Storage Freed", value: "847TB", icon: Smartphone, color: "text-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <SignUpBanner />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 Help SwipeeClean Reach 1 Billion Users!
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Share SwipeeClean with the world and help millions of people reclaim their phone storage. 
            Every share gets us closer to our goal of helping 1 billion users!
          </p>
        </div>

        {/* Viral Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {viralStats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Ready-to-Share Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Ready-to-Share Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-700 font-medium mb-2">Share this message:</p>
              <p className="text-gray-800">
                {shareText}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-4">
              <Button onClick={() => handleShare('twitter')} className="bg-blue-500 hover:bg-blue-600">
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </Button>
              <Button onClick={() => handleShare('facebook')} className="bg-blue-700 hover:bg-blue-800">
                <Facebook className="w-4 h-4 mr-2" />
                Facebook
              </Button>
              <Button onClick={() => handleShare('whatsapp')} className="bg-green-600 hover:bg-green-700">
                <MessageSquare className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              <Button onClick={() => handleShare('telegram')} className="bg-blue-400 hover:bg-blue-500">
                <MessageSquare className="w-4 h-4 mr-2" />
                Telegram
              </Button>
              <Button onClick={() => handleShare('linkedin')} className="bg-blue-800 hover:bg-blue-900">
                Share on LinkedIn
              </Button>
            </div>

            <Button variant="outline" onClick={copyToClipboard} className="w-full">
              <Copy className="w-4 h-4 mr-2" />
              Copy Share Text
            </Button>
          </CardContent>
        </Card>

        {/* Viral Marketing Ideas */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>🎯 Help Us Go Viral</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Share Before/After Screenshots</p>
                    <p className="text-sm text-gray-600">Show how much storage you freed up</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Tag Tech-Savvy Friends</p>
                    <p className="text-sm text-gray-600">Help friends with storage problems</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Post in Tech Groups</p>
                    <p className="text-sm text-gray-600">Share in tech communities and forums</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Create TikTok/Reels</p>
                    <p className="text-sm text-gray-600">Show the cleaning process in action</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🌍 Global Impact Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-6xl font-bold text-blue-600 mb-2">1B</div>
                  <p className="text-lg font-medium text-gray-900">Target Users</p>
                  <p className="text-sm text-gray-600">Help 1 billion people reclaim their digital space</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">847TB</div>
                    <p className="text-xs text-gray-600">Storage Freed</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">2.5M+</div>
                    <p className="text-xs text-gray-600">Happy Users</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium text-center">
                    Every share brings us closer to helping everyone on Earth have a clean, optimized device!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hashtags */}
        <Card>
          <CardHeader>
            <CardTitle>📱 Recommended Hashtags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {[
                '#SwipeeClean', '#StorageCleaning', '#PhoneHacks', '#TechTips', 
                '#StorageFull', '#PhoneOptimization', '#DigitalCleaning', '#AppRecommendation',
                '#TechLifeHacks', '#SmartphoneTips', '#StorageSpace', '#PhoneStorage'
              ].map((hashtag) => (
                <span 
                  key={hashtag}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full cursor-pointer hover:bg-blue-200 transition-colors"
                  onClick={() => {
                    navigator.clipboard.writeText(hashtag);
                    toast({ title: "Copied!", description: `${hashtag} copied to clipboard` });
                  }}
                >
                  {hashtag}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Click any hashtag to copy it. Use these in your social media posts to maximize reach!
            </p>
          </CardContent>
        </Card>

        {/* Bootstrap Marketing Section */}
        <Card className="mb-8 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">💡 Bootstrap Marketing with $20</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-green-800 mb-2">Free Organic Strategies</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Reddit posts in r/LifeProTips (22M users)</li>
                    <li>• TikTok storage transformation videos</li>
                    <li>• Twitter storage optimization tips</li>
                    <li>• Answer Quora/Stack Overflow questions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 mb-2">$20 Paid Boost</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• $15 Facebook/Instagram targeted ads</li>
                    <li>• $5 Fiverr micro-influencer reviews</li>
                    <li>• Google Ads free credits ($300-500)</li>
                    <li>• Expected: 100+ signups, 20+ subscribers</li>
                  </ul>
                </div>
              </div>
              <div className="bg-white p-3 rounded border-l-4 border-green-500">
                <p className="text-sm text-green-800 font-medium">
                  📈 ROI Projection: $20 investment → $100+ monthly revenue → 500%+ ROI in 30 days
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-8">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
            onClick={() => window.location.href = '/subscribe'}
          >
            🚀 Join the Movement - Subscribe Now
          </Button>
          <p className="text-sm text-gray-600 mt-2">
            Help us reach millions with smart bootstrap marketing!
          </p>
        </div>
      </div>
    </div>
  );
}