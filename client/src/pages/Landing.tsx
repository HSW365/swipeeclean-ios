import { useState } from "react";
import { motion } from "framer-motion";
import { Smartphone, Sparkles, Check, Shield, Lock, CreditCard, BarChart3, Users, Star, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/lib/i18n";
import LanguageDetector from "@/components/LanguageDetector";
import logoPath from "@assets/swipeeclean logo_1754327947218.png";

export default function Landing() {
  console.log('Landing page rendering');
  const { t, currentLang } = useTranslation();
  const [showLanguageDetector, setShowLanguageDetector] = useState(false); // Temporarily disable language detector
  
  console.log('Landing page state:', { currentLang, showLanguageDetector });

  const handleStartTrial = () => {
    window.location.href = "/api/login";
  };

  const handleLanguageSet = (language: string) => {
    setShowLanguageDetector(false);
    localStorage.setItem('language-selector-seen', 'true');
  };

  const features = [
    t('landing.features.unlimited'),
    t('landing.features.duplicates'),
    t('landing.features.organization'),
    t('landing.features.support'),
    t('landing.features.ads')
  ];

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1e40af 100%)'}}>
      {showLanguageDetector && (
        <LanguageDetector onLanguageSet={handleLanguageSet} />
      )}
      
      {/* Header */}
      <header className="fixed w-full top-0 z-50 backdrop-blur-md border-b" style={{background: 'linear-gradient(90deg, rgba(30,58,138,0.9) 0%, rgba(22,78,99,0.9) 100%)', borderColor: 'rgba(96,165,250,0.3)'}}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={logoPath} 
              alt="SwipeClean Logo" 
              className="w-10 h-10 object-contain"
            />
            <div>
              <span className="font-bold text-xl text-white">swipeeclean</span>
              <div className="text-xs text-blue-200">Professional Storage Management</div>
            </div>
          </div>
          <Button 
            onClick={handleStartTrial}
            className="text-white px-6 py-2 rounded-lg font-semibold shadow-lg transform hover:scale-105 transition-all"
            style={{background: 'linear-gradient(90deg, #22d3ee 0%, #3b82f6 100%)'}}
          >
            Start Now - $4.99/mo
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center text-black px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg" style={{background: 'linear-gradient(90deg, #22d3ee 0%, #60a5fa 100%)'}}>
                <Sparkles className="w-4 h-4 mr-2" />
                🔥 2.5M+ USERS SAVING STORAGE DAILY
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                FREE UP 
                <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent"> 32GB+</span>
                <br />IN 30 SECONDS!
              </h1>
              
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
                💎 Delete 10,000+ duplicate photos instantly<br />
                🚀 Export organized albums to any device<br />
                ⚡ Clean email spam + iCloud storage automatically
              </p>
              
              <div className="flex flex-col gap-4 justify-center mb-12">
                <Button 
                  onClick={handleStartTrial}
                  size="lg"
                  className="text-white px-12 py-6 rounded-2xl font-black text-2xl shadow-2xl transform hover:scale-105 transition-all border-4"
                  style={{background: 'linear-gradient(90deg, #3b82f6 0%, #22d3ee 100%)', borderColor: '#93c5fd'}}
                >
                  🎯 START SWIPEECLEAN PRO NOW
                  <div className="text-sm font-medium mt-1">Only $4.99/month - Join 2.5M+ Users</div>
                </Button>
                <div className="text-blue-200 text-sm font-medium">
                  ✅ Instant Access • ✅ Works on All Devices • ✅ 30-Day Money Back
                </div>
              </div>
            </motion.div>
          </div>

          {/* Vibrant Results Display */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="bg-gradient-to-br from-red-500 to-pink-500 rounded-3xl p-6 text-white transform hover:scale-105 transition-all shadow-2xl">
              <div className="text-center">
                <div className="text-4xl mb-2">📱</div>
                <div className="text-2xl font-black mb-1">8,547 PHOTOS</div>
                <div className="text-sm opacity-90">Duplicates Found & Deleted</div>
                <div className="text-3xl font-black text-yellow-300 mt-2">+15.2 GB</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-6 text-white transform hover:scale-105 transition-all shadow-2xl">
              <div className="text-center">
                <div className="text-4xl mb-2">📧</div>
                <div className="text-2xl font-black mb-1">12,893 EMAILS</div>
                <div className="text-sm opacity-90">Spam & Old Emails Cleaned</div>
                <div className="text-3xl font-black text-yellow-300 mt-2">+8.7 GB</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl p-6 text-white transform hover:scale-105 transition-all shadow-2xl">
              <div className="text-center">
                <div className="text-4xl mb-2">☁️</div>
                <div className="text-2xl font-black mb-1">ICLOUD OPTIMIZED</div>
                <div className="text-sm opacity-90">Storage Automatically Managed</div>
                <div className="text-3xl font-black text-yellow-300 mt-2">+11.4 GB</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="rounded-3xl p-8 mb-8 shadow-2xl" style={{background: 'linear-gradient(90deg, #22d3ee 0%, #60a5fa 100%)'}}>
              <div className="text-black text-center">
                <div className="text-6xl font-black mb-4">💸 SAVE $1,200+ YEARLY</div>
                <div className="text-xl font-bold mb-2">Instead of buying 128GB more storage...</div>
                <div className="text-lg">Get SwipeeClean Pro for just $4.99/month!</div>
              </div>
            </div>
            
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-black py-8 px-16 text-2xl shadow-2xl rounded-3xl transform hover:scale-105 transition-all border-4 border-blue-300 mb-4"
              onClick={handleStartTrial}
            >
              🎯 CLAIM YOUR SWIPEECLEAN PRO ACCESS
              <div className="text-sm font-medium mt-2">Start Cleaning Immediately - $4.99/mo</div>
            </Button>
            
            <div className="text-blue-100 text-lg font-medium space-y-2">
              <div>✅ Clean 50,000+ Files in One Click</div>
              <div>✅ Export Photos/Videos to Any Device</div>
              <div>✅ Gmail + iCloud + Device Storage Cleaning</div>
              <div>✅ Join 2,500,000+ Happy Users Worldwide</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16" style={{background: 'linear-gradient(180deg, #1d4ed8 0%, #1e3a8a 100%)'}}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-12">
            <div className="inline-flex items-center text-black px-6 py-3 rounded-full text-lg font-black mb-6 shadow-lg" style={{background: 'linear-gradient(90deg, #22d3ee 0%, #60a5fa 100%)'}}>
              <span className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></span>
              🔴 LIVE: 15,347 PEOPLE CLEANING STORAGE RIGHT NOW
            </div>
            <h2 className="text-5xl font-black text-white mb-6">REAL RESULTS FROM REAL USERS</h2>
            <p className="text-blue-200 text-xl font-medium">Join 2.5M+ people who freed up massive storage space</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <motion.div 
              className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-6 shadow-2xl transform hover:scale-105 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-center text-black">
                <div className="text-5xl font-black mb-2">47GB</div>
                <div className="text-sm font-bold">MAX SPACE FREED</div>
                <div className="text-xs font-medium mt-1">iPhone 15 Pro Max</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl p-6 shadow-2xl transform hover:scale-105 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-center text-black">
                <div className="text-5xl font-black mb-2">18s</div>
                <div className="text-sm font-bold">FASTEST CLEANUP</div>
                <div className="text-xs font-medium mt-1">Galaxy S24 Ultra</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-blue-400 to-cyan-500 rounded-3xl p-6 shadow-2xl transform hover:scale-105 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-center text-black">
                <div className="text-5xl font-black mb-2">23K</div>
                <div className="text-sm font-bold">PHOTOS ORGANIZED</div>
                <div className="text-xs font-medium mt-1">Personal Record</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl p-6 shadow-2xl transform hover:scale-105 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-center text-black">
                <div className="text-5xl font-black mb-2">89K</div>
                <div className="text-sm font-bold">EMAILS CLEANED</div>
                <div className="text-xs font-medium mt-1">Gmail Account</div>
              </div>
            </motion.div>
          </div>
          
          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="text-yellow-400 text-2xl mb-2">⭐⭐⭐⭐⭐</div>
              <div className="text-white font-medium mb-2">"Freed up 32GB instantly! My phone feels brand new."</div>
              <div className="text-purple-200 text-sm">- Sarah M., Los Angeles</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="text-yellow-400 text-2xl mb-2">⭐⭐⭐⭐⭐</div>
              <div className="text-white font-medium mb-2">"Best $4.99 I ever spent. Cleaned 15,000 duplicate photos!"</div>
              <div className="text-purple-200 text-sm">- Mike T., New York</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="text-yellow-400 text-2xl mb-2">⭐⭐⭐⭐⭐</div>
              <div className="text-white font-medium mb-2">"Works on iPhone, Android, AND cleaned my Gmail. Amazing!"</div>
              <div className="text-purple-200 text-sm">- Emma K., London</div>
            </div>
          </div>
          
          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              size="lg"
              className="text-white font-black py-8 px-16 text-3xl shadow-2xl rounded-3xl transform hover:scale-105 transition-all border-4 mb-6"
              style={{background: 'linear-gradient(90deg, #3b82f6 0%, #22d3ee 100%)', borderColor: '#93c5fd'}}
              onClick={handleStartTrial}
            >
              🚀 START SWIPEECLEAN PRO - $4.99/MO
              <div className="text-lg font-medium mt-2">Join 2.5M+ Users Saving Storage Daily</div>
            </Button>
            
            <div className="text-blue-100 text-lg font-medium">
              ⚡ Instant Access • 💯 30-Day Money Back • 🌍 Works Worldwide
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 bg-gradient-to-b from-blue-800 to-blue-900">
        <div className="max-w-md mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">🌍 TRUSTED WORLDWIDE</h2>
            <p className="text-blue-200">Join millions who've already freed up space</p>
          </div>

          <motion.div
            className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-white text-center mb-6 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Sparkles size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-2">💎 Premium Plan</h3>
              <p className="text-blue-100">Everything you need to stay organized</p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline justify-center mb-2">
                <span className="text-5xl font-bold">$4.99</span>
                <span className="text-xl text-blue-100 ml-2">/month</span>
              </div>
              <p className="text-blue-100 text-sm">First 7 days free</p>
            </div>

            <div className="space-y-3 mb-8 text-left">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                >
                  <Check className="text-green-300 flex-shrink-0" size={16} />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>

            <Button
              size="lg"
              className="w-full bg-white text-primary hover:bg-gray-100 font-bold shadow-lg"
              onClick={handleStartTrial}
            >
              🎯 Get Premium Access Now
            </Button>
            <p className="text-xs text-blue-100 mt-2">✨ Start free • Cancel anytime • 30-day guarantee</p>
          </motion.div>

          {/* Enhanced Social Proof */}
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 mb-6">
            <div className="text-center mb-6">
              <div className="flex justify-center items-center mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <span key={i} className="text-xl">⭐</span>)}
                </div>
                <span className="ml-2 text-lg font-bold text-white">4.9/5</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">LOVED BY USERS WORLDWIDE</h3>
              <p className="text-white/90 text-sm">Over 485,000 five-star reviews worldwide</p>
            </div>
            
            <div className="space-y-4">
              <motion.div 
                className="bg-white/20 backdrop-blur-md rounded-xl p-5 shadow-sm border-l-4 border-green-400"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex text-yellow-300">
                    {[...Array(5)].map((_, i) => <span key={i} className="text-sm">⭐</span>)}
                  </div>
                  <span className="text-xs text-white/70">2 hours ago</span>
                </div>
                <p className="text-sm text-white mb-3 font-medium">"Incredible! Freed up 28GB and organized 3,200 photos in under 5 minutes. My iPhone feels brand new!"</p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">SM</div>
                  <div className="ml-3">
                    <div className="text-sm font-semibold text-white">Sarah Martinez</div>
                    <div className="text-xs text-white/70">Los Angeles, USA 🇺🇸 • Verified Purchase</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white/20 backdrop-blur-md rounded-xl p-5 shadow-sm border-l-4 border-blue-400"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex text-yellow-300">
                    {[...Array(5)].map((_, i) => <span key={i} className="text-sm">⭐</span>)}
                  </div>
                  <span className="text-xs text-white/70">1 day ago</span>
                </div>
                <p className="text-sm text-white mb-3 font-medium">"Perfect app! The media organization feature is genius. Exported everything to my Mac seamlessly. Worth every yen!"</p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">YT</div>
                  <div className="ml-3">
                    <div className="text-sm font-semibold text-white">Yuki Tanaka</div>
                    <div className="text-xs text-white/70">Tokyo, Japan 🇯🇵 • Premium Member</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white/20 backdrop-blur-md rounded-xl p-5 shadow-sm border-l-4 border-purple-400"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex text-yellow-300">
                    {[...Array(5)].map((_, i) => <span key={i} className="text-sm">⭐</span>)}
                  </div>
                  <span className="text-xs text-white/70">3 days ago</span>
                </div>
                <p className="text-sm text-white mb-3 font-medium">"Fantastico! My Samsung Galaxy was almost full. Now I have 19GB free space. The export to my PC worked perfectly. Grazie!"</p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold">MR</div>
                  <div className="ml-3">
                    <div className="text-sm font-semibold text-white">Marco Rossi</div>
                    <div className="text-xs text-white/70">Milan, Italy 🇮🇹 • 6-month subscriber</div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="mt-6 text-center">
              <button className="text-white hover:text-yellow-300 text-sm font-medium underline">
                View all 485,847 reviews →
              </button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-6 text-white/70">
              <CreditCard size={24} />
              <Shield size={24} />
              <Lock size={24} />
            </div>
            <div className="space-y-3">
              <p className="text-sm text-white font-medium">🔒 Bank-level Security by Stripe • 🛡️ Zero Data Collection • 🚫 100% Privacy Guaranteed</p>
              <div className="flex items-center justify-center space-x-6 text-xs text-white/80">
                <div className="flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>SOC 2 Certified</div>
                <div className="flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>GDPR Compliant</div>
                <div className="flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>ISO 27001</div>
              </div>
              <div className="bg-green-500/20 border border-green-400/50 rounded-lg p-3 mt-4">
                <div className="flex items-center justify-center text-sm text-white">
                  <span className="font-semibold mr-2">30-Day Money-Back Guarantee</span>
                  <span className="text-green-300">• No Questions Asked</span>
                </div>
              </div>
              <div className="text-xs text-white/70 mt-3">
                Available in 125+ countries • Works on iOS & Android • 24/7 Premium Support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Limited Time Offer */}
      <section className="py-8 bg-gradient-to-r from-red-500 via-pink-500 to-purple-600">
        <div className="max-w-md mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-2 mb-4">
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-bold">Limited Time Offer</span>
            </div>
            <h2 className="text-2xl font-bold mb-3">🎯 {t('landing.subtitle')}</h2>
            <p className="text-pink-100 mb-4">{t('landing.subtitle')}</p>
            <div className="bg-white/10 rounded-xl p-4 mb-6">
              <div className="text-lg font-bold mb-2">What you get instantly:</div>
              <div className="text-sm space-y-1 text-pink-100">
                <div>✨ Unlimited storage cleaning sessions</div>
                <div>📱 Advanced media organization system</div>
                <div>💾 Export to any device or cloud service</div>
                <div>⚡ Priority processing (10x faster)</div>
                <div>🛡️ Premium support & data protection</div>
              </div>
            </div>
            <Button
              size="lg"
              className="w-full bg-white text-purple-600 hover:bg-gray-100 font-bold py-6 text-lg shadow-lg mb-3"
              onClick={handleStartTrial}
            >
              🚀 Claim Your Spot Now - Start Free
            </Button>
            <p className="text-pink-100 text-xs">
              ⚡ Over 15,847 people joined in the last 6 hours
            </p>
          </motion.div>
        </div>
      </section>

      <div className="h-20"></div>
    </div>
  );
}
