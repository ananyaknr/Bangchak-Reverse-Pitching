import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { productionData } from '@/lib/mock-data';
import { Gauge, Thermometer, AlertTriangle } from 'lucide-react';

export function MixerMonitor() {
  const [currentTemp, setCurrentTemp] = useState(productionData.temperature);
  
  // Simulate temperature fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTemp(prev => {
        const change = (Math.random() - 0.5) * 6;
        const newTemp = prev + change;
        return Math.max(130, Math.min(165, newTemp));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const isOverheating = currentTemp > productionData.warningTemp;
  const tempPercent = (currentTemp / productionData.maxTemp) * 100;
  const mixerPercent = productionData.mixerLoad;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="stat-card"
    >
      <h3 className="text-lg font-semibold text-foreground mb-6">Live Production Monitor</h3>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Mixer Load - Circular Progress */}
        <div className="text-center">
          <div className="relative w-40 h-40 mx-auto">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="12"
              />
              {/* Progress circle */}
              <motion.circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="12"
                strokeLinecap="round"
                initial={{ strokeDasharray: '0 440' }}
                animate={{ 
                  strokeDasharray: `${(mixerPercent / 100) * 440} 440` 
                }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Gauge className="w-6 h-6 text-muted-foreground mb-1" />
              <span className="text-3xl font-bold font-mono text-foreground">
                {mixerPercent}%
              </span>
              <span className="text-xs text-muted-foreground">Load</span>
            </div>
          </div>
          <p className="mt-4 text-sm font-medium text-foreground">Mixer Capacity</p>
          <p className="text-xs text-muted-foreground">Operating within normal range</p>
        </div>

        {/* Temperature Gauge - Horizontal Bar */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Thermometer className={cn(
              'w-5 h-5',
              isOverheating ? 'text-status-critical-foreground' : 'text-muted-foreground'
            )} />
            <span className="text-sm font-medium text-foreground">Processing Temperature</span>
            {isOverheating && (
              <span className="flex items-center gap-1 text-xs status-critical px-2 py-0.5 rounded-full">
                <AlertTriangle className="w-3 h-3" />
                High
              </span>
            )}
          </div>
          
          <div className="space-y-3">
            {/* Temperature Bar */}
            <div className="relative h-8 bg-muted rounded-lg overflow-hidden">
              <motion.div
                className={cn(
                  'h-full rounded-lg transition-colors duration-300',
                  isOverheating ? 'bg-rose-500' : 'bg-primary'
                )}
                initial={{ width: 0 }}
                animate={{ width: `${tempPercent}%` }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Warning threshold marker */}
              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-amber-500"
                style={{ left: `${(productionData.warningTemp / productionData.maxTemp) * 100}%` }}
              />
              
              {/* Current value marker */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-1 h-6 bg-foreground rounded-full shadow-lg"
                animate={{ left: `calc(${tempPercent}% - 2px)` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            {/* Scale */}
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0°C</span>
              <span className="text-amber-600">155°C (Warning)</span>
              <span>200°C</span>
            </div>
            
            {/* Current Reading */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <span className="text-sm text-muted-foreground">Current:</span>
              <span className={cn(
                'text-2xl font-bold font-mono',
                isOverheating ? 'text-status-critical-foreground' : 'text-foreground'
              )}>
                {currentTemp.toFixed(1)}°C
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
