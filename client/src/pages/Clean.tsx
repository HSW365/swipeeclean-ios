import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Heart, RotateCcw, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import SwipeCard from "@/components/SwipeCard";
import RealStorageCleaner from "@/components/RealStorageCleaner";
import SimpleFileCleaner from "@/components/SimpleFileCleaner";
import BottomNavigation from "@/components/BottomNavigation";
import type { CleaningRecommendation, CleaningSession } from "@shared/schema";

export default function Clean() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const queryClient = useQueryClient();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stats, setStats] = useState({ spaceSaved: 0, filesProcessed: 0 });

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

  // Fetch recommendations
  const { data: recommendations = [], isLoading: recommendationsLoading, error: recommendationsError } = useQuery<CleaningRecommendation[]>({
    queryKey: ["/api/cleaning/recommendations"],
    enabled: isAuthenticated,
    retry: false,
  });

  // Fetch or create cleaning session
  const { data: session, isLoading: sessionLoading } = useQuery<CleaningSession>({
    queryKey: ["/api/cleaning/session"],
    enabled: isAuthenticated && recommendations.length > 0,
    retry: false,
  });

  // Create session if none exists
  const createSessionMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/cleaning/session"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cleaning/session"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error as Error)) {
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
      toast({
        title: "Error",
        description: "Failed to start cleaning session",
        variant: "destructive",
      });
    },
  });

  // Update recommendation status
  const updateRecommendationMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
      apiRequest("PATCH", `/api/cleaning/recommendations/${id}`, { status }),
    onSuccess: (_, { status }) => {
      const recommendation = recommendations[currentIndex];
      if (recommendation) {
        if (status === 'deleted') {
          setStats(prev => ({
            spaceSaved: prev.spaceSaved + recommendation.sizeInMB,
            filesProcessed: prev.filesProcessed + recommendation.fileCount,
          }));
        } else {
          setStats(prev => ({
            ...prev,
            filesProcessed: prev.filesProcessed + recommendation.fileCount,
          }));
        }
      }
      setCurrentIndex(prev => prev + 1);
    },
    onError: (error) => {
      if (isUnauthorizedError(error as Error)) {
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
      toast({
        title: "Error",
        description: "Failed to process recommendation",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (recommendationsError && isUnauthorizedError(recommendationsError as Error)) {
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
  }, [recommendationsError, toast]);

  // Start session if needed
  useEffect(() => {
    if (!sessionLoading && !session && recommendations.length > 0) {
      createSessionMutation.mutate();
    }
  }, [session, sessionLoading, recommendations.length]);

  const handleSwipe = (direction: 'left' | 'right', id: string) => {
    const status = direction === 'left' ? 'deleted' : 'kept';
    updateRecommendationMutation.mutate({ id, status });
  };

  const handleForceAction = (action: 'delete' | 'keep') => {
    if (currentIndex < recommendations.length) {
      const recommendation = recommendations[currentIndex];
      const status = action === 'delete' ? 'deleted' : 'kept';
      updateRecommendationMutation.mutate({ id: recommendation.id, status });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setStats({ spaceSaved: 0, filesProcessed: 0 });
    queryClient.invalidateQueries({ queryKey: ["/api/cleaning/recommendations"] });
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const progress = recommendations.length > 0 ? Math.round((currentIndex / recommendations.length) * 100) : 0;
  const isCompleted = currentIndex >= recommendations.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Storage Cleaner</h1>
          <p className="text-gray-600">Choose your cleaning method</p>
        </motion.div>

        <Tabs defaultValue="simple" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="simple" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              File Analyzer
            </TabsTrigger>
            <TabsTrigger value="real" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Folder Scanner
            </TabsTrigger>
            <TabsTrigger value="demo" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Demo Mode
            </TabsTrigger>
          </TabsList>

          <TabsContent value="simple">
            <SimpleFileCleaner />
          </TabsContent>

          <TabsContent value="real">
            <RealStorageCleaner />
          </TabsContent>

          <TabsContent value="demo">
            <div className="max-w-md mx-auto">
              <motion.div
                className="text-center mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Clean with Swipes</h2>
                <p className="text-gray-600">Swipe left to delete, right to keep</p>
              </motion.div>

        {recommendationsLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        ) : isCompleted ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Heart className="text-green-500" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">All Done!</h3>
            <p className="text-gray-600 mb-6">You've completed the cleaning recommendations</p>
            <Button onClick={handleRestart} className="mb-4">
              <RotateCcw className="mr-2" size={16} />
              Start Again
            </Button>
          </motion.div>
        ) : (
          <>
            {/* Swipe Cards Container */}
            <div className="relative h-96 mb-6">
              <AnimatePresence>
                {recommendations.slice(currentIndex, currentIndex + 3).map((recommendation, index) => (
                  <SwipeCard
                    key={recommendation.id}
                    recommendation={recommendation}
                    onSwipe={handleSwipe}
                    isTop={index === 0}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Progress and Stats */}
            <motion.div
              className="bg-white rounded-xl p-4 shadow-sm mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600 font-medium">Cleaning Progress</span>
                <span className="text-primary font-bold">
                  {currentIndex} / {recommendations.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <motion.div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-success">
                    {(stats.spaceSaved / 1000).toFixed(1)} GB
                  </p>
                  <p className="text-sm text-gray-500">Space Saved</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.filesProcessed}</p>
                  <p className="text-sm text-gray-500">Files Processed</p>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex space-x-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => handleForceAction('delete')}
                disabled={updateRecommendationMutation.isPending}
              >
                <Trash2 className="mr-2" size={16} />
                Delete
              </Button>
              <Button
                variant="default"
                className="flex-1 bg-success hover:bg-green-600"
                onClick={() => handleForceAction('keep')}
                disabled={updateRecommendationMutation.isPending}
              >
                <Heart className="mr-2" size={16} />
                Keep
              </Button>
            </motion.div>
          </>
        )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation />
    </div>
  );
}
