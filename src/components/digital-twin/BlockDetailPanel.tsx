import { motion, AnimatePresence } from 'framer-motion';
import { GridBlock } from '@/lib/mock-data';
import { AlertTriangle, CheckCircle2, Clock, Droplets, Thermometer, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface BlockDetailPanelProps {
  block: GridBlock | null;
}

export function BlockDetailPanel({ block }: BlockDetailPanelProps) {
  const handleCreateTicket = () => {
    toast.success('Maintenance ticket created', {
      description: `Ticket #MT-${Math.floor(Math.random() * 10000)} created for ${block?.id}`,
    });
  };

  if (!block) {
    return (
      <div className="stat-card h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground">Select a Block</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Click on any grid block to view sensor details
          </p>
        </div>
      </div>
    );
  }

  const resistancePercent = Math.min((block.resistance / 20) * 100, 100);
  const isLowResistance = block.resistance < 5;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={block.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
        className="stat-card h-full"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              Block ID
            </p>
            <h3 className="text-xl font-bold font-mono text-foreground">{block.id}</h3>
          </div>
          <span
            className={cn(
              'px-3 py-1.5 rounded-full text-sm font-medium capitalize',
              block.status === 'healthy' && 'status-safe',
              block.status === 'warning' && 'status-warning',
              block.status === 'critical' && 'status-critical'
            )}
          >
            {block.status}
          </span>
        </div>

        {/* Sensor Data */}
        <div className="space-y-5">
          {/* Resistance */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="w-4 h-4" />
                <span>Resistance</span>
              </div>
              <span className={cn(
                'font-mono font-semibold',
                isLowResistance ? 'text-status-critical-foreground' : 'text-foreground'
              )}>
                {block.resistance} kΩ
              </span>
            </div>
            <Progress 
              value={resistancePercent} 
              className={cn(
                'h-2',
                isLowResistance && '[&>div]:bg-rose-500'
              )}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {isLowResistance ? 'Below threshold (< 5 kΩ)' : 'Normal range (5-20 kΩ)'}
            </p>
          </div>

          {/* Moisture */}
          <div className="flex items-center justify-between py-3 border-y border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Droplets className="w-4 h-4" />
              <span>Moisture Content</span>
            </div>
            <span className={cn(
              'font-mono font-semibold',
              block.moisture > 5 ? 'text-status-warning-foreground' : 'text-foreground'
            )}>
              {block.moisture}%
            </span>
          </div>

          {/* Temperature */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Thermometer className="w-4 h-4" />
              <span>Temperature</span>
            </div>
            <span className="font-mono font-semibold text-foreground">
              {block.temperature}°C
            </span>
          </div>
        </div>

        {/* Prediction */}
        <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Failure Prediction</span>
          </div>
          <div className="flex items-center gap-2">
            {block.status === 'critical' ? (
              <>
                <AlertTriangle className="w-5 h-5 text-status-critical-foreground" />
                <span className="font-semibold text-status-critical-foreground">
                  ~{block.estimatedLife} Years (Urgent)
                </span>
              </>
            ) : block.status === 'warning' ? (
              <>
                <AlertTriangle className="w-5 h-5 text-status-warning-foreground" />
                <span className="font-semibold text-status-warning-foreground">
                  ~{block.estimatedLife} Years (Monitor)
                </span>
              </>
            ) : (
              <>
              <CheckCircle2 className="w-5 h-5 text-status-safe-foreground" />
                <span className="font-semibold text-status-safe-foreground">
                  &gt;{block.estimatedLife} Years
                </span>
              </>
            )}
          </div>
        </div>

        {/* Action Button */}
        {block.status === 'critical' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6"
          >
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={handleCreateTicket}
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Create Maintenance Ticket
            </Button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
