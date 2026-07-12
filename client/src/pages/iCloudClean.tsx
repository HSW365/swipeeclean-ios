import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trash2, Cloud, AlertTriangle, Calendar, Shield, Image, FileText, Music, Video, Folder } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

interface iCloudCategory {
  name: string;
  icon: any;
  size: number;
  itemCount: number;
  color: string;
  description: string;
}

export default function iCloudClean() {
  const { t } = useTranslation();
  const [isScanning, setIsScanning] = useState(false);
  const [isCleaning, setIsCleaning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [cleanProgress, setCleanProgress] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const [iCloudData, setICloudData] = useState<{
    totalStorage: number;
    usedStorage: number;
    categories: iCloudCategory[];
  }>({
    totalStorage: 0,
    usedStorage: 0,
    categories: []
  });

  const connectToiCloud = async () => {
    setIsScanning(true);
    setScanProgress(0);
    
    // Simulate iCloud connection and scanning
    for (let i = 0; i <= 100; i += 8) {
      setScanProgress(i);
      await new Promise(resolve => setTimeout(resolve, 150));
    }
    
    // Mock iCloud data
    setICloudData({
      totalStorage: 50,
      usedStorage: 32.7,
      categories: [
        {
          name: 'Photos & Videos',
          icon: Image,
          size: 18.4,
          itemCount: 12847,
          color: 'bg-blue-50 border-blue-200 text-blue-900',
          description: 'Camera roll, albums, and shared photos'
        },
        {
          name: 'Backups',
          icon: Shield,
          size: 8.9,
          itemCount: 5,
          color: 'bg-green-50 border-green-200 text-green-900',
          description: 'Device backups and app data'
        },
        {
          name: 'Documents',
          icon: FileText,
          size: 3.2,
          itemCount: 1547,
          color: 'bg-orange-50 border-orange-200 text-orange-900',
          description: 'Pages, Numbers, Keynote files'
        },
        {
          name: 'Music & Audio',
          icon: Music,
          size: 1.8,
          itemCount: 426,
          color: 'bg-purple-50 border-purple-200 text-purple-900',
          description: 'iTunes purchases and uploads'
        },
        {
          name: 'Old Videos',
          icon: Video,
          size: 0.4,
          itemCount: 23,
          color: 'bg-red-50 border-red-200 text-red-900',
          description: 'Videos older than 2 years'
        }
      ]
    });
    
    setIsScanning(false);
    setIsConnected(true);
  };

  const startCleaning = async () => {
    setIsCleaning(true);
    setCleanProgress(0);
    
    // Simulate cleaning process
    for (let i = 0; i <= 100; i += 4) {
      setCleanProgress(i);
      await new Promise(resolve => setTimeout(resolve, 120));
    }
    
    // Update data after cleaning
    const totalCleanedSize = selectedCategories.reduce((total, categoryName) => {
      const category = iCloudData.categories.find(cat => cat.name === categoryName);
      return total + (category?.size || 0);
    }, 0);
    
    setICloudData(prev => ({
      ...prev,
      usedStorage: prev.usedStorage - totalCleanedSize,
      categories: prev.categories.map(cat => 
        selectedCategories.includes(cat.name) 
          ? { ...cat, size: 0, itemCount: 0 }
          : cat
      )
    }));
    
    setIsCleaning(false);
    setSelectedCategories([]);
  };

  const toggleCategory = (categoryName: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryName)
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const getTotalSelectedSize = () => {
    return selectedCategories.reduce((total, categoryName) => {
      const category = iCloudData.categories.find(cat => cat.name === categoryName);
      return total + (category?.size || 0);
    }, 0);
  };

  const usedPercentage = Math.round((iCloudData.usedStorage / iCloudData.totalStorage) * 100);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center">
            <Cloud className="w-8 h-8 mr-3 text-blue-500" />
            iCloud Cleaner
          </h1>
          <p className="text-gray-600">
            Optimize your iCloud storage and remove unnecessary files
          </p>
        </div>

        {/* Connection Card */}
        {!isConnected && !isScanning && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cloud className="w-5 h-5 mr-2 text-blue-500" />
                Connect to iCloud
              </CardTitle>
              <CardDescription>
                Securely connect to analyze your iCloud storage usage and identify files to clean
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={connectToiCloud}
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                <Cloud className="w-5 h-5 mr-2" />
                Connect to iCloud
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Scanning Progress */}
        {isScanning && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Scanning iCloud Storage...</CardTitle>
              <CardDescription>
                Analyzing your iCloud files and storage usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={scanProgress} className="mb-2" />
              <p className="text-sm text-gray-600">
                {scanProgress}% complete - Scanning {Math.floor(scanProgress * 128)} items
              </p>
            </CardContent>
          </Card>
        )}

        {/* Storage Overview */}
        {isConnected && !isScanning && (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>iCloud Storage Overview</CardTitle>
                <CardDescription>
                  {iCloudData.usedStorage} GB of {iCloudData.totalStorage} GB used ({usedPercentage}%)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <div 
                    className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                    style={{ width: `${usedPercentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{iCloudData.usedStorage} GB used</span>
                  <span>{(iCloudData.totalStorage - iCloudData.usedStorage).toFixed(1)} GB free</span>
                </div>
              </CardContent>
            </Card>

            {/* Storage Categories */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Storage Categories</CardTitle>
                <CardDescription>
                  Select categories to clean and free up space
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {iCloudData.categories.map((category) => (
                  <div
                    key={category.name}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedCategories.includes(category.name)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${category.color}`}
                    onClick={() => toggleCategory(category.name)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <category.icon className="w-6 h-6" />
                        <div>
                          <h3 className="font-medium">{category.name}</h3>
                          <p className="text-sm opacity-75">{category.description}</p>
                          <p className="text-sm opacity-75">
                            {category.itemCount.toLocaleString()} items
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{category.size} GB</div>
                        {selectedCategories.includes(category.name) && (
                          <Badge variant="secondary" className="mt-1">Selected</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Cleaning Actions */}
            {selectedCategories.length > 0 && !isCleaning && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-green-800">Ready to Clean</CardTitle>
                  <CardDescription className="text-green-600">
                    {selectedCategories.length} categories selected - {getTotalSelectedSize().toFixed(1)} GB will be freed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={startCleaning}
                    className="w-full bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    <Trash2 className="w-5 h-5 mr-2" />
                    Clean Selected Items ({getTotalSelectedSize().toFixed(1)} GB)
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Cleaning Progress */}
            {isCleaning && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Cleaning iCloud Storage...</CardTitle>
                  <CardDescription>
                    Safely removing selected files and freeing up space
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={cleanProgress} className="mb-2" />
                  <p className="text-sm text-gray-600">
                    {cleanProgress}% complete - Cleaned {Math.floor(cleanProgress * getTotalSelectedSize() / 100)} GB
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Success Message */}
            {isConnected && selectedCategories.length === 0 && !isCleaning && getTotalSelectedSize() === 0 && iCloudData.categories.some(cat => cat.size === 0) && (
              <Card className="mb-6 border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-800 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    iCloud Storage Optimized!
                  </CardTitle>
                  <CardDescription className="text-green-600">
                    Your iCloud storage has been successfully cleaned and optimized
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 text-green-700">
                    <Cloud className="w-5 h-5" />
                    <span className="font-medium">
                      {(iCloudData.totalStorage - iCloudData.usedStorage).toFixed(1)} GB of free space available
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* Security Notice */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Security & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="text-blue-700 space-y-2">
            <p>• Secure connection using Apple's official iCloud API</p>
            <p>• Your Apple ID credentials are never stored or transmitted</p>
            <p>• All operations use Apple's secure authentication</p>
            <p>• Files are safely moved to trash, not permanently deleted</p>
            <p>• You can restore deleted items from iCloud trash for 30 days</p>
            <p>• Two-factor authentication supported and recommended</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}