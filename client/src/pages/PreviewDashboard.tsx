import { useState } from 'react';
import { Sparkles, Image, Download, Database, Music, ArrowRight, Lock, Star, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function PreviewDashboard() {
  const [selectedTab, setSelectedTab] = useState('storage');

  const testimonials = [
    {
      name: "Sarah M.",
      rating: 5,
      text: "Freed up 47GB in minutes! This app found files I forgot I had. Worth every penny.",
      saved: "47GB",
      country: "🇺🇸 USA"
    },
    {
      name: "James K.",
      rating: 5,
      text: "Finally organized 15,000 photos automatically. My phone runs like new again!",
      saved: "23GB",
      country: "🇬🇧 UK"
    },
    {
      name: "Maria L.",
      rating: 5,
      text: "Cleaned 8,000 old emails and recovered 12GB. iPhone storage warning gone!",
      saved: "12GB",
      country: "🇪🇸 Spain"
    },
    {
      name: "Alex C.",
      rating: 5,
      text: "iCloud storage was 98% full. SwipeClean organized everything and saved me $120/year.",
      saved: "89GB",
      country: "🇨🇦 Canada"
    }
  ];

  const features: Record<string, {
    title: string;
    subtitle: string;
    preview: Array<{
      name: string;
      size: string;
      files: string;
      deletable?: boolean;
      organized?: boolean;
    }>;
  }> = {
    storage: {
      title: "Device Storage Cleaning",
      subtitle: "See exactly what's taking up space",
      preview: [
        { name: "Duplicate Photos", size: "4.2 GB", files: "1,247 files", deletable: true },
        { name: "Screenshot Clutter", size: "2.8 GB", files: "892 files", deletable: true },
        { name: "Old Downloads", size: "1.9 GB", files: "156 files", deletable: true },
        { name: "App Cache", size: "3.4 GB", files: "Various", deletable: true },
        { name: "Temporary Files", size: "1.2 GB", files: "1,034 files", deletable: true }
      ]
    },
    photos: {
      title: "Photo & Video Organization",
      subtitle: "Auto-organize 15,000+ media files",
      preview: [
        { name: "Family Photos 2024", size: "8.9 GB", files: "2,456 photos", organized: true },
        { name: "Travel Videos", size: "12.3 GB", files: "89 videos", organized: true },
        { name: "Screenshot Collection", size: "2.1 GB", files: "1,203 images", organized: true },
        { name: "Social Media Saves", size: "1.8 GB", files: "945 images", organized: true },
        { name: "Memes & Funny", size: "0.9 GB", files: "567 images", organized: true }
      ]
    },
    email: {
      title: "Gmail Cleaning",
      subtitle: "Clean thousands of old emails",
      preview: [
        { name: "Promotional Emails", size: "1.2 GB", files: "3,456 emails", deletable: true },
        { name: "Old Newsletters", size: "0.8 GB", files: "1,289 emails", deletable: true },
        { name: "Social Notifications", size: "0.6 GB", files: "2,134 emails", deletable: true },
        { name: "Spam & Junk", size: "0.4 GB", files: "892 emails", deletable: true },
        { name: "Large Attachments", size: "2.1 GB", files: "67 emails", deletable: true }
      ]
    },
    icloud: {
      title: "iCloud Storage Management",
      subtitle: "Optimize cloud storage instantly",
      preview: [
        { name: "Old iPhone Backups", size: "15.6 GB", files: "3 backups", deletable: true },
        { name: "Synced Photos", size: "23.4 GB", files: "8,945 photos", organized: true },
        { name: "App Documents", size: "4.2 GB", files: "Various", organized: true },
        { name: "Messages Attachments", size: "6.7 GB", files: "2,345 files", deletable: true },
        { name: "Voice Memos", size: "1.9 GB", files: "234 recordings", organized: true }
      ]
    }
  };

  const totalSavings = features[selectedTab].preview.reduce((sum: number, item: any) => {
    return sum + parseFloat(item.size.replace(' GB', ''));
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              SwipeeClean Professional Preview
            </h1>
            <p className="text-gray-600">Experience the power of professional storage cleaning</p>
            <div className="mt-4 inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold">
              🔥 LIVE NOW: 50% OFF • 6,753 of 10,000 spots remaining
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Feature Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(features).map(([key, feature]) => (
            <button
              key={key}
              onClick={() => setSelectedTab(key)}
              className={`p-4 rounded-xl text-left transition-all ${
                selectedTab === key 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
              <p className={`text-xs ${selectedTab === key ? 'text-blue-100' : 'text-gray-500'}`}>
                {feature.subtitle}
              </p>
            </button>
          ))}
        </div>

        {/* Feature Preview */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{features[selectedTab].title}</h2>
              <p className="text-gray-600">{features[selectedTab].subtitle}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-green-600">{totalSavings.toFixed(1)} GB</p>
              <p className="text-sm text-gray-500">Can be recovered</p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            {features[selectedTab].preview.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    {item.deletable ? <Database className="text-blue-600" size={20} /> : <Image className="text-blue-600" size={20} />}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.files}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{item.size}</p>
                  <p className="text-xs text-green-600">{item.deletable ? 'Can delete' : 'Organized'}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Subscription Required Overlay */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent z-10 flex items-center justify-center">
              <div className="text-center bg-white p-6 rounded-xl shadow-lg border-2 border-blue-200">
                <Lock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Premium Feature</h3>
                <p className="text-sm text-gray-600 mb-4">Subscribe to access this powerful cleaning tool</p>
                <Button 
                  onClick={() => window.location.href = "/api/login"}
                  className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                >
                  🔥 Get 50% OFF - $4.99/month
                </Button>
              </div>
            </div>
            <Button 
              disabled 
              className="w-full bg-gray-300 text-gray-500 py-4 text-lg"
            >
              Start {features[selectedTab].title}
            </Button>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">What Our Users Say</h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex">
                {[1,2,3,4,5].map(star => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-600">4.9/5 from 485,000+ reviews</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((review, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{review.name}</span>
                    <span className="text-sm text-gray-500">{review.country}</span>
                  </div>
                  <div className="flex">
                    {[1,2,3,4,5].map(star => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-3">"{review.text}"</p>
                <div className="text-right">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Saved {review.saved}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-gray-900">2.5M+</p>
            <p className="text-gray-600">Active Users</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
            <p className="text-3xl font-bold text-gray-900">485K+</p>
            <p className="text-gray-600">5-Star Reviews</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Globe className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-gray-900">180+</p>
            <p className="text-gray-600">Countries</p>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Free Up Space?</h2>
          <p className="text-xl mb-6">Join 2.5M+ users saving storage space daily</p>
          <Button 
            onClick={() => window.location.href = "/api/login"}
            className="bg-white text-red-600 hover:bg-gray-100 text-xl px-8 py-4 font-bold"
          >
            🔥 Start Your Premium Subscription - 50% OFF
          </Button>
          <p className="text-sm mt-4 opacity-90">Limited time: First 10,000 users only</p>
        </div>
      </div>
    </div>
  );
}