import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Calendar, PieChart, BarChart3, Smartphone, HardDrive, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface StorageMetric {
  category: string;
  current: number;
  previous: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface CleaningSession {
  date: string;
  spaceCleaned: number;
  filesRemoved: number;
  category: string;
}

export default function StorageInsights() {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  const storageMetrics: StorageMetric[] = [
    {
      category: 'Photos',
      current: 12.4,
      previous: 15.2,
      change: -18.4,
      trend: 'down',
      color: 'bg-blue-500'
    },
    {
      category: 'Videos',
      current: 8.7,
      previous: 11.3,
      change: -23.0,
      trend: 'down',
      color: 'bg-purple-500'
    },
    {
      category: 'Apps',
      current: 6.2,
      previous: 5.8,
      change: 6.9,
      trend: 'up',
      color: 'bg-green-500'
    },
    {
      category: 'Documents',
      current: 3.1,
      previous: 3.8,
      change: -18.4,
      trend: 'down',
      color: 'bg-yellow-500'
    },
    {
      category: 'System',
      current: 4.3,
      previous: 4.1,
      change: 4.9,
      trend: 'up',
      color: 'bg-red-500'
    }
  ];

  const cleaningSessions: CleaningSession[] = [
    { date: '2025-01-30', spaceCleaned: 2.8, filesRemoved: 1247, category: 'Cache Files' },
    { date: '2025-01-28', spaceCleaned: 1.9, filesRemoved: 892, category: 'Duplicate Photos' },
    { date: '2025-01-25', spaceCleaned: 3.4, filesRemoved: 2156, category: 'Old Videos' },
    { date: '2025-01-22', spaceCleaned: 1.2, filesRemoved: 643, category: 'Temp Files' },
    { date: '2025-01-20', spaceCleaned: 4.1, filesRemoved: 3284, category: 'App Cache' }
  ];

  const totalSpaceCleaned = cleaningSessions.reduce((sum, session) => sum + session.spaceCleaned, 0);
  const totalFilesRemoved = cleaningSessions.reduce((sum, session) => sum + session.filesRemoved, 0);
  const totalStorageUsed = storageMetrics.reduce((sum, metric) => sum + metric.current, 0);

  const getStorageHealth = () => {
    if (totalStorageUsed < 30) return { status: 'Excellent', color: 'text-green-600', description: 'Your storage is well optimized' };
    if (totalStorageUsed < 50) return { status: 'Good', color: 'text-blue-600', description: 'Storage usage is under control' };
    if (totalStorageUsed < 70) return { status: 'Fair', color: 'text-yellow-600', description: 'Consider cleaning more frequently' };
    return { status: 'Poor', color: 'text-red-600', description: 'Immediate cleaning recommended' };
  };

  const storageHealth = getStorageHealth();

  const handleExportReport = () => {
    toast({
      title: "Report Generated",
      description: "Storage insights report has been exported successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Storage Insights
              </h1>
              <p className="text-gray-600">Detailed analytics and storage optimization insights</p>
            </div>
            <div className="flex gap-2">
              {(['week', 'month', 'year'] as const).map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedPeriod(period)}
                  className="capitalize"
                >
                  {period}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Storage</p>
                  <p className="text-2xl font-bold text-gray-900">{totalStorageUsed.toFixed(1)} GB</p>
                </div>
                <HardDrive className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Space Cleaned</p>
                  <p className="text-2xl font-bold text-green-600">{totalSpaceCleaned.toFixed(1)} GB</p>
                </div>
                <TrendingDown className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Files Removed</p>
                  <p className="text-2xl font-bold text-purple-600">{totalFilesRemoved.toLocaleString()}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Storage Health</p>
                  <p className={`text-2xl font-bold ${storageHealth.color}`}>{storageHealth.status}</p>
                </div>
                <Smartphone className="h-8 w-8 text-gray-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Storage Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Storage Breakdown by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {storageMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.category}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded ${metric.color}`} />
                      <span className="font-medium">{metric.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{metric.current} GB</span>
                      <div className={`flex items-center gap-1 text-xs ${
                        metric.trend === 'down' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.trend === 'down' ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                        {Math.abs(metric.change).toFixed(1)}%
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Storage Utilization</span>
                  <span>{((totalStorageUsed / 64) * 100).toFixed(1)}% of 64 GB</span>
                </div>
                <Progress value={(totalStorageUsed / 64) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Cleaning Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cleaningSessions.map((session, index) => (
                  <motion.div
                    key={session.date}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{session.category}</p>
                      <p className="text-sm text-gray-600">{session.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{session.spaceCleaned} GB</p>
                      <p className="text-xs text-gray-500">{session.filesRemoved.toLocaleString()} files</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Personalized Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Weekly Cleanup</h3>
                <p className="text-sm text-blue-700">Schedule automatic cleanups every Wednesday to maintain optimal storage</p>
                <Button size="sm" className="mt-3 bg-blue-600 hover:bg-blue-700">
                  Enable Auto-Clean
                </Button>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Photo Compression</h3>
                <p className="text-sm text-green-700">Compress photos older than 6 months to save 2.1 GB of space</p>
                <Button size="sm" className="mt-3 bg-green-600 hover:bg-green-700">
                  Start Compression
                </Button>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">Cloud Backup</h3>
                <p className="text-sm text-purple-700">Move old videos to cloud storage to free up 3.4 GB locally</p>
                <Button size="sm" className="mt-3 bg-purple-600 hover:bg-purple-700">
                  Setup Backup
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Export Report */}
        <div className="text-center">
          <Button onClick={handleExportReport} size="lg" variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Export Detailed Report
          </Button>
        </div>
      </div>
    </div>
  );
}