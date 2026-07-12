import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { Trash2, Heart, Image, Download, Database, Music } from "lucide-react";
import { CleaningRecommendation } from "@shared/schema";

interface SwipeCardProps {
  recommendation: CleaningRecommendation;
  onSwipe: (direction: 'left' | 'right', id: string) => void;
  isTop?: boolean;
}

const typeIcons = {
  duplicate_photos: Image,
  old_downloads: Download,
  cache_files: Database,
  music_cache: Music,
};

const typeColors = {
  duplicate_photos: 'bg-red-100 text-red-500 border-red-200',
  old_downloads: 'bg-yellow-100 text-yellow-500 border-yellow-200',
  cache_files: 'bg-orange-100 text-orange-500 border-orange-200',
  music_cache: 'bg-blue-100 text-blue-500 border-blue-200',
};

export default function SwipeCard({ recommendation, onSwipe, isTop = false }: SwipeCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-10, 0, 10]);
  const opacity = useTransform(x, [-200, 0, 200], [0.7, 1, 0.7]);
  
  const deleteOpacity = useTransform(x, [-150, -50, 0], [1, 0.5, 0]);
  const keepOpacity = useTransform(x, [0, 50, 150], [0, 0.5, 1]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    
    if (Math.abs(info.offset.x) > 100) {
      const direction = info.offset.x > 0 ? 'right' : 'left';
      onSwipe(direction, recommendation.id);
    }
  };

  const Icon = typeIcons[recommendation.type as keyof typeof typeIcons] || Database;
  const colorClass = typeColors[recommendation.type as keyof typeof typeColors] || 'bg-gray-100 text-gray-500 border-gray-200';

  return (
    <motion.div
      ref={cardRef}
      className={`absolute inset-0 bg-white rounded-2xl shadow-xl border-2 border-gray-100 cursor-grab active:cursor-grabbing ${
        isTop ? 'z-30' : 'z-10'
      }`}
      style={{ 
        x, 
        rotate, 
        opacity,
        scale: isTop ? 1 : 0.95,
        transformOrigin: "center center"
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="p-6 h-full flex flex-col relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass}`}>
              <Icon size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{recommendation.title}</h3>
              <p className="text-gray-500 text-sm">{recommendation.fileCount} items found</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}>
            {(recommendation.sizeInMB / 1000).toFixed(1)} GB
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 mb-4">
          <p className="text-gray-600 text-sm mb-4">{recommendation.description}</p>
          
          {/* Mock preview for photos */}
          {recommendation.type === 'duplicate_photos' && (
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" 
                  alt="Sample duplicate" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" 
                  alt="Similar image" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-xs">+{recommendation.fileCount - 2} more</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Hints */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-red-500">
            <Trash2 size={16} />
            <span className="text-sm font-medium">Delete</span>
          </div>
          <div className="text-center">
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
          </div>
          <div className="flex items-center space-x-2 text-green-500">
            <span className="text-sm font-medium">Keep</span>
            <Heart size={16} />
          </div>
        </div>

        {/* Swipe Overlays */}
        {isTop && (
          <>
            <motion.div
              className="absolute inset-0 bg-red-500/20 rounded-2xl flex items-center justify-center pointer-events-none"
              style={{ opacity: deleteOpacity }}
            >
              <div className="bg-red-500 text-white px-6 py-3 rounded-xl font-bold text-lg">
                <Trash2 className="inline mr-2" size={20} />
                DELETE
              </div>
            </motion.div>
            
            <motion.div
              className="absolute inset-0 bg-green-500/20 rounded-2xl flex items-center justify-center pointer-events-none"
              style={{ opacity: keepOpacity }}
            >
              <div className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold text-lg">
                <Heart className="inline mr-2" size={20} />
                KEEP
              </div>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}
