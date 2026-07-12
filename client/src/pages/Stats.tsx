import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { TrendingUp, HardDrive, Trash2, Heart, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import StorageChart from "@/components/StorageChart";
import BottomNavigation from "@/components/BottomNavigation";
import type { StorageAnalysis } from "@shared/schema";

export default function Stats() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();

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
  const availableGB = storageData ? ((storageData.totalStorage - storageData.usedStorage) / 1000).toFixed(1) : "0";
  const totalGB = storageData ? (storageData.totalStorage / 1000).toFixed(0) : "0";

  const statsCards = [
    {
      title: "Storage Used",
      value: `${usedPercentage}%`,
      subtitle: `${availableGB} GB available of ${totalGB} GB`,
      icon: HardDrive,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Potential Savings",
      value: "4.1 GB",
      subtitle: "Space that can be freed",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Items to Clean",
      value: "3,205",
      subtitle: "Files ready for cleaning",
      icon: Trash2,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Last Scan",
      value: "Today",
      subtitle: "Storage analysis updated",
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto px-4 py-8">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Storage Statistics</h2>
          <p className="text-gray-600">Detailed analysis of your device storage</p>
        </motion.div>

        {storageLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        ) : (
          <>
            {/* Storage Chart */}
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-sm mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="flex justify-center mb-4">
                <StorageChart usedPercentage={usedPercentage} size={160} />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Storage Usage</h3>
                <p className="text-gray-600 text-sm">
                  {((storageData?.usedStorage || 0) / 1000).toFixed(1)} GB used of {totalGB} GB total
                </p>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {statsCards.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  className="bg-white rounded-xl p-4 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                >
                  <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center mb-3`}>
                    <stat.icon className={stat.color} size={20} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-xs text-gray-600 font-medium mb-1">{stat.title}</p>
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                </motion.div>
              ))}
            </div>

            {/* Category Breakdown */}
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h3>
              
              {storageData && (
                <div className="space-y-4">
                  {[
                    { name: "Photos & Videos", size: storageData.photosSize, color: "bg-red-500" },
                    { name: "Downloads", size: storageData.downloadsSize, color: "bg-yellow-500" },
                    { name: "App Cache", size: storageData.cacheSize, color: "bg-orange-500" },
                    { name: "Music & Audio", size: storageData.musicSize, color: "bg-blue-500" },
                  ].map((category, index) => {
                    const percentage = (category.size / storageData.usedStorage) * 100;
                    return (
                      <motion.div
                        key={category.name}
                        className="space-y-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
                      >
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700">{category.name}</span>
                          <span className="font-medium text-gray-900">
                            {(category.size / 1000).toFixed(1)} GB
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            className={`h-2 rounded-full ${category.color}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}
