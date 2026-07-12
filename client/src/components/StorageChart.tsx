import { motion } from "framer-motion";

interface StorageChartProps {
  usedPercentage: number;
  size?: number;
}

export default function StorageChart({ usedPercentage, size = 192 }: StorageChartProps) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (usedPercentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg 
        className="transform -rotate-90" 
        width={size} 
        height={size} 
        viewBox="0 0 100 100"
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="hsl(20, 5.9%, 90%)"
          strokeWidth="8"
          fill="none"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          stroke={usedPercentage > 80 ? "hsl(0, 84.2%, 60.2%)" : usedPercentage > 60 ? "hsl(38, 92%, 50%)" : "hsl(142, 76%, 36%)"}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      </svg>
      
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <motion.span 
          className="text-3xl font-bold text-gray-900"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          {usedPercentage}%
        </motion.span>
        <span className="text-sm text-gray-500">Used</span>
      </div>
    </div>
  );
}
