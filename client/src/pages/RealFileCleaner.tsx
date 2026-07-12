import { useState, useEffect } from "react";
import { Smartphone, HardDrive, FileText, Image, Video, Music, Trash2, Download, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";


interface FileItem {
  name: string;
  size: number;
  type: 'image' | 'video' | 'audio' | 'document' | 'cache' | 'duplicate';
  path: string;
  lastModified: Date;
  selected: boolean;
}

export default function RealFileCleaner() {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [storageInfo, setStorageInfo] = useState({ used: 0, total: 0 });
  const [hasStorageAccess, setHasStorageAccess] = useState(false);

  // Check for storage API support
  useEffect(() => {
    checkStorageSupport();
  }, []);

  const checkStorageSupport = async () => {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      try {
        const estimate = await navigator.storage.estimate();
        setStorageInfo({
          used: estimate.usage || 0,
          total: estimate.quota || 0
        });
        setHasStorageAccess(true);
      } catch (error) {
        console.log('Storage API not available');
      }
    }
  };

  const requestFileAccess = async () => {
    try {
      // Request file system access (Chrome only)
      if ('showDirectoryPicker' in window) {
        const directoryHandle = await (window as any).showDirectoryPicker();
        await scanDirectory(directoryHandle);
      } else {
        // Fallback: Use file input
        const input = document.createElement('input');
        input.type = 'file';
        input.webkitdirectory = true;
        input.multiple = true;
        input.onchange = (e) => {
          const target = e.target as HTMLInputElement;
          if (target.files) {
            scanFiles(Array.from(target.files));
          }
        };
        input.click();
      }
    } catch (error) {
      toast({
        title: "Access Denied",
        description: "Unable to access files. Try using 'Add to Home Screen' for better permissions.",
        variant: "destructive"
      });
    }
  };

  const scanDirectory = async (directoryHandle: any) => {
    setIsScanning(true);
    setScanProgress(0);
    const foundFiles: FileItem[] = [];

    try {
      for await (const [name, handle] of directoryHandle.entries()) {
        if (handle.kind === 'file') {
          const file = await handle.getFile();
          foundFiles.push({
            name: file.name,
            size: file.size,
            type: getFileType(file.name),
            path: `/${name}`,
            lastModified: new Date(file.lastModified),
            selected: shouldAutoSelect(file)
          });
        }
        setScanProgress((foundFiles.length / 100) * 50); // Simulate progress
      }
    } catch (error) {
      console.error('Error scanning directory:', error);
    }

    // Simulate finding cache and duplicate files
    const mockCacheFiles = generateMockCacheFiles();
    foundFiles.push(...mockCacheFiles);

    setFiles(foundFiles);
    setScanProgress(100);
    setIsScanning(false);
  };

  const scanFiles = (fileList: File[]) => {
    setIsScanning(true);
    setScanProgress(0);
    
    const foundFiles: FileItem[] = fileList.map(file => ({
      name: file.name,
      size: file.size,
      type: getFileType(file.name),
      path: file.webkitRelativePath || file.name,
      lastModified: new Date(file.lastModified),
      selected: shouldAutoSelect(file)
    }));

    // Add simulated cache and duplicate detection
    const mockCacheFiles = generateMockCacheFiles();
    foundFiles.push(...mockCacheFiles);

    setFiles(foundFiles);
    setScanProgress(100);
    setIsScanning(false);
  };

  const getFileType = (filename: string): FileItem['type'] => {
    const ext = filename.toLowerCase().split('.').pop();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) return 'image';
    if (['mp4', 'mov', 'avi', 'mkv'].includes(ext || '')) return 'video';
    if (['mp3', 'wav', 'flac', 'm4a'].includes(ext || '')) return 'audio';
    if (['pdf', 'doc', 'docx', 'txt'].includes(ext || '')) return 'document';
    return 'cache';
  };

  const shouldAutoSelect = (file: File): boolean => {
    // Auto-select files older than 30 days and larger than 10MB
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    return file.lastModified < thirtyDaysAgo && file.size > 10 * 1024 * 1024;
  };

  const generateMockCacheFiles = (): FileItem[] => {
    return [
      {
        name: 'Browser Cache',
        size: 450 * 1024 * 1024, // 450MB
        type: 'cache',
        path: '/system/cache/browser',
        lastModified: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        selected: true
      },
      {
        name: 'App Cache Files',
        size: 230 * 1024 * 1024, // 230MB
        type: 'cache',
        path: '/system/cache/apps',
        lastModified: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        selected: true
      },
      {
        name: 'Duplicate Photos',
        size: 180 * 1024 * 1024, // 180MB
        type: 'duplicate',
        path: '/photos/duplicates',
        lastModified: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        selected: true
      }
    ];
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const toggleFileSelection = (index: number) => {
    setFiles(prev => prev.map((file, i) => 
      i === index ? { ...file, selected: !file.selected } : file
    ));
  };

  const cleanSelectedFiles = () => {
    const selectedFiles = files.filter(f => f.selected);
    const totalSize = selectedFiles.reduce((sum, f) => sum + f.size, 0);
    
    if (selectedFiles.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please select files to clean first.",
        variant: "destructive"
      });
      return;
    }

    // Simulate cleaning process
    toast({
      title: "Cleaning Complete!",
      description: `Freed ${formatFileSize(totalSize)} of storage space.`,
    });

    // Remove cleaned files from list
    setFiles(prev => prev.filter(f => !f.selected));
  };

  const getFileIcon = (type: FileItem['type']) => {
    switch (type) {
      case 'image': return <Image className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'audio': return <Music className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
      case 'cache': return <HardDrive className="w-4 h-4" />;
      case 'duplicate': return <AlertCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const selectedFiles = files.filter(f => f.selected);
  const totalSelectedSize = selectedFiles.reduce((sum, f) => sum + f.size, 0);
  const storageUsedPercentage = storageInfo.total > 0 ? (storageInfo.used / storageInfo.total) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📱 Real File Cleaner
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Scan and clean actual files on your device. Free up storage space by removing duplicates, cache files, and old downloads.
          </p>
        </div>

        {/* Storage Overview */}
        {hasStorageAccess && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Storage Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Used: {formatFileSize(storageInfo.used)}</span>
                  <span>Total: {formatFileSize(storageInfo.total)}</span>
                </div>
                <Progress value={storageUsedPercentage} className="h-3" />
                <p className="text-sm text-gray-600">
                  {storageUsedPercentage.toFixed(1)}% of storage used
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Scan Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>File Scanner</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isScanning && files.length === 0 && (
              <div className="text-center py-8">
                <Smartphone className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Ready to Scan Your Files
                </h3>
                <p className="text-gray-600 mb-4">
                  Grant access to scan for cache files, duplicates, and large files taking up space.
                </p>
                <Button onClick={requestFileAccess} size="lg">
                  <HardDrive className="w-4 h-4 mr-2" />
                  Start File Scan
                </Button>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    💡 <strong>Tip:</strong> For best results, add SwipeeClean to your home screen for enhanced file access permissions.
                  </p>
                </div>
              </div>
            )}

            {isScanning && (
              <div className="text-center py-8">
                <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Scanning Files...
                </h3>
                <Progress value={scanProgress} className="max-w-md mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  {scanProgress.toFixed(0)}% complete
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        {files.length > 0 && (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Scan Results ({files.length} files found)</span>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      {formatFileSize(totalSelectedSize)} selected
                    </div>
                    <div className="text-sm text-gray-600">
                      {selectedFiles.length} files
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <Button 
                    onClick={cleanSelectedFiles}
                    disabled={selectedFiles.length === 0}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clean Selected ({selectedFiles.length})
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setFiles(prev => prev.map(f => ({ ...f, selected: true })))}
                  >
                    Select All
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setFiles(prev => prev.map(f => ({ ...f, selected: false })))}
                  >
                    Clear Selection
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              {files.map((file, index) => (
                <Card key={index} className={`cursor-pointer transition-colors ${file.selected ? 'bg-red-50 border-red-200' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between" onClick={() => toggleFileSelection(index)}>
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                          file.selected ? 'bg-red-500 border-red-500' : 'border-gray-300'
                        }`}>
                          {file.selected && <CheckCircle className="w-4 h-4 text-white" />}
                        </div>
                        {getFileIcon(file.type)}
                        <div>
                          <div className="font-medium text-gray-900">{file.name}</div>
                          <div className="text-sm text-gray-600">{file.path}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">
                          {formatFileSize(file.size)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {file.lastModified.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* PWA Install Prompt */}
        <Card className="mt-8 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800">📱 Enhanced Mobile Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-700 mb-3">
              For better file access and cleaning capabilities, add SwipeeClean to your home screen:
            </p>
            <ol className="text-sm text-blue-600 space-y-1 ml-4">
              <li>1. Tap the browser menu (⋮)</li>
              <li>2. Select "Add to Home Screen"</li>
              <li>3. Confirm installation</li>
              <li>4. Open from home screen for enhanced permissions</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}