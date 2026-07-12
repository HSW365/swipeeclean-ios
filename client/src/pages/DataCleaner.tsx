import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, CheckCircle, Clock, FileX, Database, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface DataItem {
  id: string;
  type: 'cache' | 'temp' | 'logs' | 'downloads' | 'duplicates' | 'trash';
  name: string;
  size: string;
  location: string;
  lastAccessed: string;
  canDelete: boolean;
}

export default function DataCleaner() {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [dataItems] = useState<DataItem[]>([
    {
      id: '1',
      type: 'cache',
      name: 'Browser Cache Files',
      size: '1.2 GB',
      location: '/System/Cache/Browser',
      lastAccessed: '2 days ago',
      canDelete: true
    },
    {
      id: '2', 
      type: 'temp',
      name: 'Temporary Downloads',
      size: '847 MB',
      location: '/Downloads/Temp',
      lastAccessed: '1 week ago',
      canDelete: true
    },
    {
      id: '3',
      type: 'logs',
      name: 'System Log Files',
      size: '523 MB',
      location: '/System/Logs',
      lastAccessed: '3 days ago',
      canDelete: true
    },
    {
      id: '4',
      type: 'duplicates',
      name: 'Duplicate Photos',
      size: '2.1 GB',
      location: '/Photos/Duplicates',
      lastAccessed: '1 day ago',
      canDelete: true
    },
    {
      id: '5',
      type: 'downloads',
      name: 'Old Downloads',
      size: '1.8 GB',
      location: '/Downloads/Archive',
      lastAccessed: '2 weeks ago',
      canDelete: true
    },
    {
      id: '6',
      type: 'trash',
      name: 'Recycle Bin Items',
      size: '756 MB',
      location: '/Trash',
      lastAccessed: '5 days ago',
      canDelete: true
    },
    {
      id: '7',
      type: 'cache',
      name: 'App Cache Data',
      size: '934 MB',
      location: '/Applications/Cache',
      lastAccessed: '4 days ago',
      canDelete: true
    },
    {
      id: '8',
      type: 'temp',
      name: 'Old Screenshots',
      size: '1.3 GB',
      location: '/Screenshots/Archive',
      lastAccessed: '3 weeks ago',
      canDelete: true
    },
    {
      id: '9',
      type: 'logs',
      name: 'Crash Report Files',
      size: '287 MB',
      location: '/System/CrashReports',
      lastAccessed: '1 week ago',
      canDelete: true
    },
    {
      id: '10',
      type: 'duplicates',
      name: 'Duplicate Videos',
      size: '3.7 GB',
      location: '/Videos/Duplicates',
      lastAccessed: '2 days ago',
      canDelete: true
    },
    {
      id: '11',
      type: 'downloads',
      name: 'Old Document Downloads',
      size: '612 MB',
      location: '/Documents/Downloads',
      lastAccessed: '1 month ago',
      canDelete: true
    },
    {
      id: '12',
      type: 'cache',
      name: 'Thumbnail Cache',
      size: '445 MB',
      location: '/System/Thumbnails',
      lastAccessed: '6 days ago',
      canDelete: true
    },
    {
      id: '13',
      type: 'temp',
      name: 'Installation Files',
      size: '892 MB',
      location: '/Downloads/Installers',
      lastAccessed: '2 months ago',
      canDelete: true
    },
    {
      id: '14',
      type: 'duplicates',
      name: 'Duplicate Music Files',
      size: '1.1 GB',
      location: '/Music/Duplicates',
      lastAccessed: '1 week ago',
      canDelete: true
    },
    {
      id: '15',
      type: 'logs',
      name: 'Update Log Files',
      size: '156 MB',
      location: '/System/UpdateLogs',
      lastAccessed: '2 weeks ago',
      canDelete: true
    },
    {
      id: '16',
      type: 'cache',
      name: 'Offline Map Data',
      size: '2.4 GB',
      location: '/Maps/OfflineData',
      lastAccessed: '3 months ago',
      canDelete: true
    },
    {
      id: '17',
      type: 'temp',
      name: 'App Backup Files',
      size: '1.6 GB',
      location: '/Backups/AppData',
      lastAccessed: '6 weeks ago',
      canDelete: true
    },
    {
      id: '18',
      type: 'duplicates',
      name: 'Duplicate Documents',
      size: '543 MB',
      location: '/Documents/Duplicates',
      lastAccessed: '4 days ago',
      canDelete: true
    },
    {
      id: '19',
      type: 'cache',
      name: 'Social Media Cache',
      size: '1.8 GB',
      location: '/SocialApps/Cache',
      lastAccessed: '1 day ago',
      canDelete: true
    },
    {
      id: '20',
      type: 'temp',
      name: 'Old Video Recordings',
      size: '4.2 GB',
      location: '/Videos/OldRecordings',
      lastAccessed: '2 months ago',
      canDelete: true
    }
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'cache': return <Database className="w-5 h-5 text-blue-500" />;
      case 'temp': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'logs': return <FileX className="w-5 h-5 text-gray-500" />;
      case 'downloads': return <HardDrive className="w-5 h-5 text-green-500" />;
      case 'duplicates': return <CheckCircle className="w-5 h-5 text-purple-500" />;
      case 'trash': return <Trash2 className="w-5 h-5 text-red-500" />;
      default: return <FileX className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleSelectItem = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === dataItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(dataItems.map(item => item.id));
    }
  };

  const handleDeleteSelected = async () => {
    setIsScanning(true);
    
    // Simulate deletion process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const selectedCount = selectedItems.length;
    const totalSize = dataItems
      .filter(item => selectedItems.includes(item.id))
      .reduce((acc, item) => {
        const size = parseFloat(item.size);
        const unit = item.size.includes('GB') ? 1024 : 1;
        return acc + (size * unit);
      }, 0);
    
    setSelectedItems([]);
    setIsScanning(false);
    
    toast({
      title: "Data Deleted Successfully",
      description: `Removed ${selectedCount} items, freed ${totalSize > 1024 ? (totalSize/1024).toFixed(1) + ' GB' : totalSize.toFixed(0) + ' MB'} of storage space`,
    });
  };

  const totalSelectedSize = dataItems
    .filter(item => selectedItems.includes(item.id))
    .reduce((acc, item) => {
      const size = parseFloat(item.size);
      const unit = item.size.includes('GB') ? 1024 : 1;
      return acc + (size * unit);
    }, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Data & Storage Cleaner
            </h1>
            <p className="text-gray-600">Remove unwanted files and free up storage space</p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Summary Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Storage Analysis Complete</h2>
                <p className="text-gray-600">Found {dataItems.length} categories of deletable data</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  {totalSelectedSize > 1024 ? (totalSelectedSize/1024).toFixed(1) + ' GB' : totalSelectedSize.toFixed(0) + ' MB'}
                </div>
                <div className="text-sm text-gray-500">Selected for deletion</div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <Button onClick={handleSelectAll} variant="outline">
            {selectedItems.length === dataItems.length ? 'Deselect All' : 'Select All'}
          </Button>
          <Button 
            onClick={handleDeleteSelected}
            disabled={selectedItems.length === 0 || isScanning}
            className="bg-red-600 hover:bg-red-700"
          >
            {isScanning ? 'Deleting...' : `Delete Selected (${selectedItems.length})`}
          </Button>
        </div>

        {/* Data Items */}
        <div className="space-y-4">
          {dataItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`cursor-pointer transition-all ${
                selectedItems.includes(item.id) ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                        className="w-5 h-5 text-blue-600 rounded"
                      />
                      {getIcon(item.type)}
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.location}</p>
                        <p className="text-xs text-gray-500">Last accessed: {item.lastAccessed}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900">{item.size}</div>
                      <div className="text-xs text-green-600">Safe to delete</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom Action */}
        {selectedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2"
          >
            <Card className="bg-white shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <span className="font-semibold">{selectedItems.length} items selected</span>
                    <span className="text-gray-500 ml-2">
                      ({totalSelectedSize > 1024 ? (totalSelectedSize/1024).toFixed(1) + ' GB' : totalSelectedSize.toFixed(0) + ' MB'})
                    </span>
                  </div>
                  <Button 
                    onClick={handleDeleteSelected}
                    disabled={isScanning}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {isScanning ? 'Deleting...' : 'Delete Selected'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}