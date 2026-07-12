import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Sparkles, Image, Download, Database, Music, ArrowRight, Menu, Mail, FolderOpen, Share2, Cloud, Trash2, Zap, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

import { isUnauthorizedError } from "@/lib/authUtils";
import StorageChart from "@/components/StorageChart";
import BottomNavigation from "@/components/BottomNavigation";
import type { StorageAnalysis } from "@shared/schema";

export default function Home() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: storageData, isLoading: storageLoading, error } = useQuery<StorageAnalysis>({
    queryKey: ["/api/storage/analysis"],
    enabled: isAuthenticated,
    retry: false,
  });

  useEffect(() => {
    if (error && isUnauthorizedError(error as Error)) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [error, toast]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const usedPercentage = storageData ? Math.round((storageData.usedStorage / storageData.totalStorage) * 100) : 0;

  const storageItems = storageData ? [
    {
      icon: Image,
      title: "Photos & Videos",
      subtitle: `${storageData.duplicatePhotos} duplicates found`,
      size: (storageData.photosSize / 1000).toFixed(1),
      color: "bg-red-50 border-red-200 text-red-900",
      iconColor: "text-red-500"
    },
    {
      icon: Download,
      title: "Downloads",
      subtitle: `${storageData.oldDownloads} old files`,
      size: (storageData.downloadsSize / 1000).toFixed(1),
      color: "bg-yellow-50 border-yellow-200 text-yellow-900",
      iconColor: "text-yellow-500"
    },
    {
      icon: Database,
      title: "App Cache",
      subtitle: "Temporary files",
      size: (storageData.cacheSize / 1000).toFixed(1),
      color: "bg-orange-50 border-orange-200 text-orange-900",
      iconColor: "text-orange-500"
    },
    {
      icon: Music,
      title: "Music & Audio",
      subtitle: "Offline content",
      size: (storageData.musicSize / 1000).toFixed(1),
      color: "bg-blue-50 border-blue-200 text-blue-900",
      iconColor: "text-blue-500"
    }
  ] : [];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <Sparkles className="text-white" size={16} />
            </div>
            <span className="font-semibold text-lg">Swipee Clean</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setLocation("/profile")}>
            <Menu size={20} />
          </Button>
        </div>
      </header>

      <div className="pt-16">
        {/* Storage Overview */}
        <section className="py-8 bg-white">
          <div className="max-w-md mx-auto px-4">
            <motion.div
              className="text-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Storage Overview</h2>
              <p className="text-gray-600">See what's taking up space on your device</p>
            </motion.div>

            {storageLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
              </div>
            ) : storageData ? (
              <>
                <motion.div
                  className="flex justify-center mb-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <StorageChart usedPercentage={usedPercentage} />
                </motion.div>

                <div className="space-y-3 mb-8">
                  {storageItems.map((item, index) => (
                    <motion.div
                      key={item.title}
                      className={`flex items-center justify-between p-3 rounded-lg border-l-4 ${item.color}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className={`${item.iconColor}`} size={20} />
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm opacity-75">{item.subtitle}</p>
                        </div>
                      </div>
                      <span className="font-bold">{item.size} GB</span>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Actions */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/clean">
                      <Button 
                        variant="outline" 
                        className="w-full h-16 flex flex-col items-center justify-center space-y-1 border-2 hover:border-primary hover:bg-primary/5"
                      >
                        <Sparkles size={20} />
                        <span className="text-sm font-medium">Device Clean</span>
                      </Button>
                    </Link>
                    <Link href="/data-cleaner">
                      <Button 
                        variant="outline" 
                        className="w-full h-16 flex flex-col items-center justify-center space-y-1 border-2 hover:border-red-500 hover:bg-red-50"
                      >
                        <Trash2 size={20} />
                        <span className="text-sm font-medium">Data Cleaner</span>
                      </Button>
                    </Link>
                    <Link href="/optimizer">
                      <Button 
                        variant="outline" 
                        className="w-full h-16 flex flex-col items-center justify-center space-y-1 border-2 hover:border-purple-500 hover:bg-purple-50"
                      >
                        <Zap size={20} />
                        <span className="text-sm font-medium">Auto Optimizer</span>
                      </Button>
                    </Link>
                    <Link href="/insights">
                      <Button 
                        variant="outline" 
                        className="w-full h-16 flex flex-col items-center justify-center space-y-1 border-2 hover:border-cyan-500 hover:bg-cyan-50"
                      >
                        <BarChart3 size={20} />
                        <span className="text-sm font-medium">Storage Insights</span>
                      </Button>
                    </Link>
                  </div>
                  
                  {/* Secondary Actions */}
                  <div className="grid grid-cols-1 gap-3 mt-4">
                    <Link href="/viral">
                      <Button 
                        variant="outline" 
                        className="w-full h-12 flex items-center justify-center space-x-2 border-2 hover:border-green-500 hover:bg-green-50"
                      >
                        <Share2 size={18} />
                        <span className="text-sm font-medium">Share & Earn $10 Per Referral</span>
                      </Button>
                    </Link>
                  </div>
                </motion.div>

                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.4 }}
                >
                  <Link href="/clean">
                    <Button size="lg" className="w-full bg-success hover:bg-green-600 text-white font-semibold">
                      <Sparkles className="mr-2" size={20} />
                      Start Smart Cleaning
                      <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </Link>
                </motion.div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Unable to load storage data</p>
              </div>
            )}
          </div>
        </section>
      </div>

      <BottomNavigation />
    </div>
  );
}
