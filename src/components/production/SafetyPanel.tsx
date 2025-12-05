import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Wind, CheckCircle2, AlertTriangle } from 'lucide-react';

export function SafetyPanel() {
  const [h2sLevel, setH2sLevel] = useState(0.8);
  
  // Simulate H2S sensor readings
  useEffect(() => {
    const interval = setInterval(() => {
      setH2sLevel(prev => {
        const change = (Math.random() - 0.5) * 0.6;
        const newLevel = prev + change;
        return Math.max(0, Math.min(2.5, newLevel));
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const getAirQualityStatus = (level: number) => {
    if (level < 1) return { label: 'Excellent', color: 'safe' };
    if (level < 2) return { label: 'Good', color: 'safe' };
    if (level < 5) return { label: 'Moderate', color: 'warning' };
    return { label: 'Poor', color: 'critical' };
  };

  const status = getAirQualityStatus(h2sLevel);
  const maxH2s = 10;
  const safeThreshold = 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="stat-card"
    >
      <h3 className="text-lg font-semibold text-foreground mb-6">Safety Monitoring</h3>
      
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-primary-muted mb-4">
          <Wind className="w-10 h-10 text-primary" />
        </div>
        
        <p className="text-sm text-muted-foreground mb-2">H₂S Sensor Reading</p>
        
        <motion.div
          key={h2sLevel.toFixed(1)}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="flex items-baseline justify-center gap-1"
        >
          <span className={cn(
            'text-5xl font-bold font-mono',
            status.color === 'safe' && 'text-status-safe-foreground',
            status.color === 'warning' && 'text-status-warning-foreground',
            status.color === 'critical' && 'text-status-critical-foreground'
          )}>
            {h2sLevel.toFixed(1)}
          </span>
          <span className="text-xl text-muted-foreground font-medium">ppm</span>
        </motion.div>
      </div>
      
      {/* Level bar */}
      <div className="mb-4">
        <div className="relative h-3 bg-muted rounded-full overflow-hidden">
          <div 
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-500 opacity-30"
            style={{ width: '100%' }}
          />
          <motion.div
            className={cn(
              'h-full rounded-full',
              status.color === 'safe' && 'bg-emerald-500',
              status.color === 'warning' && 'bg-amber-500',
              status.color === 'critical' && 'bg-rose-500'
            )}
            animate={{ width: `${(h2sLevel / maxH2s) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Safe threshold marker */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-foreground/50"
            style={{ left: `${(safeThreshold / maxH2s) * 100}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>0 ppm</span>
          <span>Safe limit: 5 ppm</span>
          <span>10 ppm</span>
        </div>
      </div>
      
      {/* Status Badge */}
      <div className={cn(
        'flex items-center justify-center gap-2 p-3 rounded-xl',
        status.color === 'safe' && 'status-safe',
        status.color === 'warning' && 'status-warning',
        status.color === 'critical' && 'status-critical'
      )}>
        {status.color === 'critical' ? (
          <AlertTriangle className="w-5 h-5" />
        ) : (
          <CheckCircle2 className="w-5 h-5" />
        )}
        <span className="font-semibold">Air Quality: {status.label}</span>
      </div>
      
      <p className="text-xs text-muted-foreground text-center mt-4">
        Continuous monitoring · Updated every 1.5s
      </p>
    </motion.div>
  );
}
