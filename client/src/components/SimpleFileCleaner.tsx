import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, Trash2, FileImage, Video, Music, FileText, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface FileInfo {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  file: File;
  isDuplicate?: boolean;
  isOld?: boolean;
}

interface FileAnalysis {
  totalFiles: number;
  totalSize: number;
  duplicates: FileInfo[];
  oldFiles: FileInfo[];
  largeFiles: FileInfo[];
  categories: {
    images: FileInfo[];
    videos: FileInfo[];
    documents: FileInfo[];
    audio: FileInfo[];
    other: FileInfo[];
  };
}

export default function SimpleFileCleaner() {
  const [analysis, setAnalysis] = useState<FileAnalysis | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [isDeleting, setIsDeleting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <FileImage className="w-4 h-4" />;
    if (type.startsWith('video/')) return <Video className="w-4 h-4" />;
    if (type.startsWith('audio/')) return <Music className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  const findDuplicates = (files: FileInfo[]): FileInfo[] => {
    const duplicates: FileInfo[] = [];
    const fileMap = new Map<string, FileInfo[]>();

    files.forEach(file => {
      const key = `${file.name}-${file.size}`;
      if (!fileMap.has(key)) {
        fileMap.set(key, []);
      }
      fileMap.get(key)!.push(file);
    });

    fileMap.forEach(group => {
      if (group.length > 1) {
        const sorted = group.sort((a, b) => b.lastModified - a.lastModified);
        duplicates.push(...sorted.slice(1).map(f => ({ ...f, isDuplicate: true })));
      }
    });

    return duplicates;
  };

  const findOldFiles = (files: FileInfo[]): FileInfo[] => {
    const sixMonthsAgo = Date.now() - (6 * 30 * 24 * 60 * 60 * 1000);
    return files.filter(file => file.lastModified < sixMonthsAgo).map(f => ({ ...f, isOld: true }));
  };

  const categorizeFiles = (files: FileInfo[]) => {
    const categories = {
      images: [] as FileInfo[],
      videos: [] as FileInfo[],
      documents: [] as FileInfo[],
      audio: [] as FileInfo[],
      other: [] as FileInfo[]
    };

    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        categories.images.push(file);
      } else if (file.type.startsWith('video/')) {
        categories.videos.push(file);
      } else if (file.type.startsWith('audio/')) {
        categories.audio.push(file);
      } else if (file.type.includes('pdf') || file.type.includes('document') || file.type.includes('text')) {
        categories.documents.push(file);
      } else {
        categories.other.push(file);
      }
    });

    return categories;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList || fileList.length === 0) return;

    setIsScanning(true);
    setProgress(0);

    const files: FileInfo[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      files.push({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        file: file
      });
      setProgress((i + 1) / fileList.length * 100);
    }

    // Analyze files
    const duplicates = findDuplicates(files);
    const oldFiles = findOldFiles(files);
    const largeFiles = files.filter(f => f.size > 50 * 1024 * 1024); // Files > 50MB
    const categories = categorizeFiles(files);

    const totalSize = files.reduce((sum, file) => sum + file.size, 0);

    setAnalysis({
      totalFiles: files.length,
      totalSize,
      duplicates,
      oldFiles,
      largeFiles,
      categories
    });

    toast({
      title: "Analysis Complete",
      description: `Analyzed ${files.length} files (${formatFileSize(totalSize)})`,
    });

    setIsScanning(false);
    setProgress(0);
  };

  const toggleFileSelection = (fileName: string) => {
    const newSelected = new Set(selectedFiles);
    if (newSelected.has(fileName)) {
      newSelected.delete(fileName);
    } else {
      newSelected.add(fileName);
    }
    setSelectedFiles(newSelected);
  };

  const selectAllDuplicates = () => {
    if (!analysis) return;
    const newSelected = new Set(selectedFiles);
    analysis.duplicates.forEach(file => newSelected.add(file.name));
    setSelectedFiles(newSelected);
  };

  const selectAllOldFiles = () => {
    if (!analysis) return;
    const newSelected = new Set(selectedFiles);
    analysis.oldFiles.forEach(file => newSelected.add(file.name));
    setSelectedFiles(newSelected);
  };

  const deleteSelectedFiles = async () => {
    if (selectedFiles.size === 0) return;

    setIsDeleting(true);
    let deletedCount = 0;
    let deletedSize = 0;

    try {
      if (analysis) {
        const allFiles = [
          ...analysis.duplicates,
          ...analysis.oldFiles,
          ...analysis.largeFiles,
          ...Object.values(analysis.categories).flat()
        ];

        selectedFiles.forEach(fileName => {
          const file = allFiles.find(f => f.name === fileName);
          if (file) {
            deletedCount++;
            deletedSize += file.size;
          }
        });
      }

      toast({
        title: "Files Marked for Deletion",
        description: `${deletedCount} files (${formatFileSize(deletedSize)}) would be deleted`,
      });

      // Clear selections
      setSelectedFiles(new Set());

    } catch (error) {
      toast({
        title: "Selection Error",
        description: "Unable to process some files",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const FileList = ({ files, title, icon }: { files: FileInfo[], title: string, icon: React.ReactNode }) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2 font-medium">
        {icon}
        <span>{title} ({files.length} files)</span>
      </div>
      <div className="space-y-1 max-h-40 overflow-y-auto">
        {files.slice(0, 10).map(file => (
          <div
            key={file.name}
            className={`flex items-center justify-between p-2 rounded border cursor-pointer transition-colors ${
              selectedFiles.has(file.name) ? 'bg-red-50 border-red-200' : 'hover:bg-gray-50'
            }`}
            onClick={() => toggleFileSelection(file.name)}
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {getFileIcon(file.type)}
              <span className="truncate text-sm">{file.name}</span>
            </div>
            <span className="text-xs text-gray-500 ml-2">{formatFileSize(file.size)}</span>
          </div>
        ))}
        {files.length > 10 && (
          <div className="text-xs text-gray-500 text-center">
            ...and {files.length - 10} more files
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">File Analyzer & Cleaner</h1>
        <p className="text-gray-600">Upload files to analyze and identify duplicates</p>
      </div>

      {!analysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <Upload className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Upload Files to Analyze</h3>
            <p className="text-gray-600 mb-4">
              Select multiple files to analyze for duplicates, old files, and space optimization
            </p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              accept="*/*"
            />
            <Button 
              onClick={() => fileInputRef.current?.click()} 
              disabled={isScanning}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isScanning ? 'Analyzing...' : 'Select Files'}
            </Button>
          </div>

          {isScanning && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-gray-600">Analyzing files...</p>
            </div>
          )}
        </motion.div>
      )}

      {analysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{analysis.totalFiles}</div>
              <div className="text-sm text-gray-600">Total Files</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{formatFileSize(analysis.totalSize)}</div>
              <div className="text-sm text-gray-600">Total Size</div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{analysis.duplicates.length + analysis.oldFiles.length}</div>
              <div className="text-sm text-gray-600">Cleanable Files</div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Cleaning Recommendations</h2>
            
            {analysis.duplicates.length > 0 && (
              <div className="bg-white border rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-red-600">Duplicate Files</h3>
                  <Button size="sm" variant="outline" onClick={selectAllDuplicates}>
                    Select All
                  </Button>
                </div>
                <FileList 
                  files={analysis.duplicates} 
                  title="Duplicates" 
                  icon={<Trash2 className="w-4 h-4 text-red-500" />}
                />
              </div>
            )}

            {analysis.oldFiles.length > 0 && (
              <div className="bg-white border rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-orange-600">Old Files (6+ months)</h3>
                  <Button size="sm" variant="outline" onClick={selectAllOldFiles}>
                    Select All
                  </Button>
                </div>
                <FileList 
                  files={analysis.oldFiles} 
                  title="Old Files" 
                  icon={<FileText className="w-4 h-4 text-orange-500" />}
                />
              </div>
            )}

            {analysis.largeFiles.length > 0 && (
              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-medium text-purple-600 mb-3">Large Files (50MB+)</h3>
                <FileList 
                  files={analysis.largeFiles} 
                  title="Large Files" 
                  icon={<HardDrive className="w-4 h-4 text-purple-500" />}
                />
              </div>
            )}
          </div>

          {/* Actions */}
          {selectedFiles.size > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Ready to Clean</div>
                  <div className="text-sm text-gray-600">
                    {selectedFiles.size} files selected
                  </div>
                </div>
                <Button
                  onClick={deleteSelectedFiles}
                  disabled={isDeleting}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {isDeleting ? 'Cleaning...' : 'Mark for Deletion'}
                </Button>
              </div>
            </div>
          )}

          <div className="text-center">
            <Button onClick={() => setAnalysis(null)} variant="outline">
              Analyze More Files
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}