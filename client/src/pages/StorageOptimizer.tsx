import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, CheckCircle, Settings, BarChart3, HardDrive, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface OptimizationTask {
  id: string;
  name: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  estimatedSaving: string;
  category: 'photos' | 'videos' | 'apps' | 'system' | 'documents';
  status: 'pending' | 'running' | 'completed';
}

export default function StorageOptimizer() {
  const { toast } = useToast();
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationProgress, setOptimizationProgress] = useState(0);
  const [tasks, setTasks] = useState<OptimizationTask[]>([
    {
      id: '1',
      name: 'Compress Large Photos',
      description: 'Reduce photo file sizes by 60% without quality loss',
      impact: 'high',
      estimatedSaving: '3.2 GB',
      category: 'photos',
      status: 'pending'
    },
    {
      id: '2',
      name: 'Remove Video Duplicates',
      description: 'Delete identical video files taking up space',
      impact: 'high',
      estimatedSaving: '2.8 GB',
      category: 'videos',
      status: 'pending'
    },
    {
      id: '3',
      name: 'Clear App Caches',
      description: 'Clean temporary data from installed applications',
      impact: 'medium',
      estimatedSaving: '1.4 GB',
      category: 'apps',
      status: 'pending'
    },
    {
      id: '4',
      name: 'Optimize System Files',
      description: 'Clean logs, temp files, and system cache',
      impact: 'medium',
      estimatedSaving: '892 MB',
      category: 'system',
      status: 'pending'
    },
    {
      id: '5',
      name: 'Archive Old Documents',
      description: 'Move old files to compressed storage',
      impact: 'low',
      estimatedSaving: '567 MB',
      category: 'documents',
      status: 'pending'
    }
  ]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'photos': return '📸';
      case 'videos': return '🎥';
      case 'apps': return '📱';
      case 'system': return '⚙️';
      case 'documents': return '📄';
      default: return '📁';
    }
  };

  const handleOptimizeAll = async () => {
    setIsOptimizing(true);
    setOptimizationProgress(0);

    // Simulate optimization process
    for (let i = 0; i < tasks.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setTasks(prev => prev.map((task, index) => 
        index === i ? { ...task, status: 'running' as const } : task
      ));
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTasks(prev => prev.map((task, index) => 
        index === i ? { ...task, status: 'completed' as const } : task
      ));
      
      setOptimizationProgress(((i + 1) / tasks.length) * 100);
    }

    setIsOptimizing(false);
    
    const totalSaved = tasks.reduce((total, task) => {
      const size = parseFloat(task.estimatedSaving);
      const isGB = task.estimatedSaving.includes('GB');
      return total + (isGB ? size * 1024 : size);
    }, 0);

    toast({
      title: "Optimization Complete!",
      description: `Freed up ${(totalSaved / 1024).toFixed(1)} GB of storage space`,
    });
  };

  const totalEstimatedSaving = tasks.reduce((total, task) => {
    const size = parseFloat(task.estimatedSaving);
    const isGB = task.estimatedSaving.includes('GB');
    return total + (isGB ? size * 1024 : size);
  }, 0);

  const completedTasks = tasks.filter(task => task.status === 'completed').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Storage Optimizer
            </h1>
            <p className="text-gray-600">Intelligent optimization for maximum storage savings</p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Summary Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Zap className="text-blue-600" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Optimization Summary</h2>
                <p className="text-gray-600 font-normal">
                  {tasks.length} optimization tasks identified
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {(totalEstimatedSaving / 1024).toFixed(1)} GB
                </div>
                <div className="text-sm text-gray-600">Potential Savings</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {completedTasks}/{tasks.length}
                </div>
                <div className="text-sm text-gray-600">Tasks Completed</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(optimizationProgress)}%
                </div>
                <div className="text-sm text-gray-600">Progress</div>
              </div>
            </div>

            {isOptimizing && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Optimizing storage...</span>
                  <span className="text-sm text-gray-500">{Math.round(optimizationProgress)}%</span>
                </div>
                <Progress value={optimizationProgress} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Button */}
        <div className="text-center mb-8">
          <Button 
            onClick={handleOptimizeAll}
            disabled={isOptimizing}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3"
          >
            {isOptimizing ? 'Optimizing...' : `Optimize All (${(totalEstimatedSaving / 1024).toFixed(1)} GB)`}
          </Button>
        </div>

        {/* Optimization Tasks */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimization Tasks</h3>
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`transition-all ${
                task.status === 'completed' ? 'bg-green-50 border-green-200' : 
                task.status === 'running' ? 'bg-blue-50 border-blue-200' : 
                'hover:shadow-md'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">
                        {task.status === 'completed' ? '✅' : 
                         task.status === 'running' ? '⚡' : 
                         getCategoryIcon(task.category)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{task.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(task.impact)}`}>
                            {task.impact.toUpperCase()} IMPACT
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900">
                        {task.estimatedSaving}
                      </div>
                      <div className="text-xs text-gray-500">
                        {task.status === 'completed' ? 'Saved' : 'Estimated'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Device Compatibility */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Settings className="text-gray-600" size={20} />
              Device Compatibility
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Smartphone className="text-blue-600" size={20} />
                <div>
                  <div className="font-medium">Mobile Devices</div>
                  <div className="text-sm text-gray-600">iOS & Android optimization</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <HardDrive className="text-green-600" size={20} />
                <div>
                  <div className="font-medium">Desktop Systems</div>
                  <div className="text-sm text-gray-600">Windows, Mac & Linux support</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}