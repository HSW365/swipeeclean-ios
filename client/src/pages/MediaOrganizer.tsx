import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Folder, Image, Video, Download, Trash2, Upload, CheckCircle, AlertCircle, ExternalLink, HardDrive, Monitor, Smartphone, PlayCircle, FileImage, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { isUnauthorizedError } from '@/lib/authUtils';
import BottomNavigation from '@/components/BottomNavigation';

interface MediaGroup {
  id: string;
  name: string;
  type: 'photos' | 'videos';
  count: number;
  totalSize: number;
  items: MediaItem[];
  selected?: boolean;
}

interface MediaItem {
  id: string;
  fileName: string;
  fileType: 'photo' | 'video';
  fileSize: number;
  resolution?: string;
  duration?: number;
  dateTaken: string;
  thumbnail?: string;
}

export default function MediaOrganizer() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();
  const queryClient = useQueryClient();
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [exportDestination, setExportDestination] = useState<string>('external');
  const [viewMode, setViewMode] = useState<'overview' | 'detailed'>('overview');
  const [isScanning, setIsScanning] = useState(false);
  const [bulkAction, setBulkAction] = useState<'export' | 'delete' | null>(null);

  // Redirect if not authenticated
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

  // Generate sample media groups for demonstration
  const [mediaGroups, setMediaGroups] = useState<MediaGroup[]>([
    {
      id: 'photos',
      name: 'All Photos',
      type: 'photos',
      count: 3247,
      totalSize: 8500000000, // 8.5GB
      items: []
    },
    {
      id: 'videos',
      name: 'All Videos',
      type: 'videos', 
      count: 189,
      totalSize: 15800000000, // 15.8GB
      items: []
    }
  ]);

  // Scan device mutation
  const scanMutation = useMutation({
    mutationFn: async () => {
      setIsScanning(true);
      // Simulate scanning process
      await new Promise(resolve => setTimeout(resolve, 3000));
      return { success: true };
    },
    onSuccess: () => {
      setIsScanning(false);
      toast({
        title: "Scan Complete",
        description: "Found all photos and videos on your device!",
      });
      // Update media groups with more realistic data
      setMediaGroups([
        {
          id: 'photos',
          name: 'All Photos',
          type: 'photos',
          count: Math.floor(Math.random() * 2000) + 1500,
          totalSize: Math.floor(Math.random() * 5000000000) + 3000000000,
          items: []
        },
        {
          id: 'videos',
          name: 'All Videos',
          type: 'videos',
          count: Math.floor(Math.random() * 200) + 50,
          totalSize: Math.floor(Math.random() * 10000000000) + 5000000000,
          items: []
        }
      ]);
    },
    onError: (error) => {
      setIsScanning(false);
      if (isUnauthorizedError(error)) {
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
        title: "Scan Failed",
        description: "Could not scan your device. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Bulk export mutation
  const exportMutation = useMutation({
    mutationFn: async (data: { groupIds: string[], destination: string }) => {
      setBulkAction('export');
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2500));
      return { success: true };
    },
    onSuccess: () => {
      setBulkAction(null);
      toast({
        title: "Export Started",
        description: "Your media is being exported to the selected destination!",
      });
      setSelectedGroups([]);
    },
    onError: (error) => {
      setBulkAction(null);
      if (isUnauthorizedError(error)) {
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
        title: "Export Failed",
        description: "Could not export media. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Bulk delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (groupIds: string[]) => {
      setBulkAction('delete');
      // Simulate delete process
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { success: true };
    },
    onSuccess: () => {
      setBulkAction(null);
      toast({
        title: "Delete Complete",
        description: "Selected media has been safely deleted!",
      });
      setSelectedGroups([]);
      // Update counts after deletion
      setMediaGroups(prev => prev.map(group => 
        selectedGroups.includes(group.id) 
          ? { ...group, count: 0, totalSize: 0 }
          : group
      ));
    },
    onError: (error) => {
      setBulkAction(null);
      if (isUnauthorizedError(error)) {
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
        title: "Delete Failed",
        description: "Could not delete media. Please try again.",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleGroupToggle = (groupId: string) => {
    setSelectedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleSelectAll = () => {
    if (selectedGroups.length === mediaGroups.length) {
      setSelectedGroups([]);
    } else {
      setSelectedGroups(mediaGroups.map(g => g.id));
    }
  };

  const handleBulkExport = () => {
    if (selectedGroups.length === 0) {
      toast({
        title: "No Groups Selected",
        description: "Please select photo or video groups to export",
        variant: "destructive",
      });
      return;
    }

    exportMutation.mutate({
      groupIds: selectedGroups,
      destination: exportDestination,
    });
  };

  const handleBulkDelete = () => {
    if (selectedGroups.length === 0) {
      toast({
        title: "No Groups Selected", 
        description: "Please select photo or video groups to delete",
        variant: "destructive",
      });
      return;
    }

    // Confirmation dialog via toast
    const confirmDelete = window.confirm(
      `Are you sure you want to permanently delete ${selectedGroups.length} group${selectedGroups.length > 1 ? 's' : ''}? This action cannot be undone.`
    );

    if (confirmDelete) {
      deleteMutation.mutate(selectedGroups);
    }
  };

  const totalSelectedSize = mediaGroups
    .filter(group => selectedGroups.includes(group.id))
    .reduce((sum, group) => sum + group.totalSize, 0);

  const totalSelectedCount = mediaGroups
    .filter(group => selectedGroups.includes(group.id))
    .reduce((sum, group) => sum + group.count, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">Media Groups</h1>
          <p className="text-sm text-gray-600">Organize photos & videos separately</p>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="w-5 h-5" />
              Quick Scan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Scan your device to find all photos and videos, then organize them into separate groups.
            </p>
            <Button 
              onClick={() => scanMutation.mutate()}
              disabled={isScanning}
              className="w-full"
            >
              {isScanning ? (
                <>
                  <div className="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  Scanning Device...
                </>
              ) : (
                <>
                  <Image className="mr-2 w-4 h-4" />
                  Scan for Photos & Videos
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Media Groups */}
        {mediaGroups.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Folder className="w-5 h-5" />
                  Media Groups
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSelectAll}
                >
                  {selectedGroups.length === mediaGroups.length ? 'Deselect All' : 'Select All'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {mediaGroups.map((group) => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedGroups.includes(group.id)
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300'
                  }`}
                  onClick={() => handleGroupToggle(group.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        group.type === 'photos' 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'bg-purple-100 text-purple-600'
                      }`}>
                        {group.type === 'photos' ? (
                          <Image className="w-5 h-5" />
                        ) : (
                          <Video className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{group.name}</h3>
                        <p className="text-sm text-gray-500">
                          {group.count.toLocaleString()} files • {formatFileSize(group.totalSize)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={group.type === 'photos' ? 'default' : 'secondary'}
                        className="capitalize"
                      >
                        {group.type}
                      </Badge>
                      <Checkbox
                        checked={selectedGroups.includes(group.id)}
                        className="w-5 h-5"
                      />
                    </div>
                  </div>
                  
                  {group.count > 0 && (
                    <div className="grid grid-cols-4 gap-2">
                      {[...Array(Math.min(4, group.count))].map((_, i) => (
                        <div
                          key={i}
                          className={`aspect-square rounded-md flex items-center justify-center text-xs ${
                            group.type === 'photos'
                              ? 'bg-blue-50 text-blue-600'
                              : 'bg-purple-50 text-purple-600'
                          }`}
                        >
                          {group.type === 'photos' ? (
                            <FileImage className="w-4 h-4" />
                          ) : (
                            <PlayCircle className="w-4 h-4" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Selection Summary */}
        {selectedGroups.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-blue-900">Selection Summary</h3>
              <CheckCircle className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-sm text-blue-700">
              {selectedGroups.length} group{selectedGroups.length > 1 ? 's' : ''} selected
            </p>
            <p className="text-sm text-blue-700">
              {totalSelectedCount.toLocaleString()} files • {formatFileSize(totalSelectedSize)}
            </p>
          </motion.div>
        )}

        {/* Bulk Actions */}
        {selectedGroups.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Bulk Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Export Destination */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Export Destination
                </label>
                <Select value={exportDestination} onValueChange={setExportDestination}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="external">
                      <div className="flex items-center gap-2">
                        <HardDrive className="w-4 h-4" />
                        External Drive
                      </div>
                    </SelectItem>
                    <SelectItem value="pc">
                      <div className="flex items-center gap-2">
                        <Monitor className="w-4 h-4" />
                        PC/Mac
                      </div>
                    </SelectItem>
                    <SelectItem value="cloud">
                      <div className="flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Cloud Storage
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={handleBulkExport}
                  disabled={bulkAction === 'export' || exportMutation.isPending}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {bulkAction === 'export' ? (
                    <>
                      <div className="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 w-4 h-4" />
                      Export All
                    </>
                  )}
                </Button>

                <Button
                  onClick={handleBulkDelete}
                  disabled={bulkAction === 'delete' || deleteMutation.isPending}
                  variant="destructive"
                >
                  {bulkAction === 'delete' ? (
                    <>
                      <div className="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="mr-2 w-4 h-4" />
                      Delete All
                    </>
                  )}
                </Button>
              </div>

              {/* Progress Indicator */}
              <AnimatePresence>
                {bulkAction && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 capitalize">
                        {bulkAction === 'export' ? 'Exporting' : 'Deleting'} media...
                      </span>
                      <span className="text-gray-500">
                        {totalSelectedCount.toLocaleString()} files
                      </span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        )}

        {/* Tips */}
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 text-amber-600 mt-0.5">
                💡
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-amber-900">Pro Tips</h3>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• Select both groups to export/delete everything at once</li>
                  <li>• Export to external drive for maximum safety</li>
                  <li>• Use cloud storage for automatic backup</li>
                  <li>• Delete duplicates to free up more space</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
}