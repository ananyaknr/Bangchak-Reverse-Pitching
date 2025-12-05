import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { gridData, GridBlock } from '@/lib/mock-data';

interface HeatmapGridProps {
  onBlockSelect: (block: GridBlock) => void;
  selectedBlockId?: string;
}

export function HeatmapGrid({ onBlockSelect, selectedBlockId }: HeatmapGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="stat-card h-full"
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Structural Grid Monitor</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Real-time block health visualization (100 sensors)
        </p>
      </div>
      
      {/* Legend */}
      <div className="flex items-center gap-4 mb-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-emerald-500" />
          <span className="text-muted-foreground">Healthy (95%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-amber-400" />
          <span className="text-muted-foreground">Warning (3%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-rose-500 animate-pulse" />
          <span className="text-muted-foreground">Critical (2%)</span>
        </div>
      </div>
      
      {/* Grid */}
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 overflow-auto max-h-[400px] p-1">
        {gridData.map((block, index) => (
          <motion.button
            key={block.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.005 }}
            onClick={() => onBlockSelect(block)}
            className={cn(
              'grid-block relative',
              block.status === 'healthy' && 'grid-block-healthy',
              block.status === 'warning' && 'grid-block-warning',
              block.status === 'critical' && 'grid-block-critical',
              selectedBlockId === block.id && 'ring-2 ring-foreground ring-offset-2 ring-offset-background'
            )}
            title={`${block.id} - ${block.status}`}
          >
            {block.status === 'critical' && (
              <span className="absolute inset-0 rounded-md animate-ping bg-rose-500 opacity-30" />
            )}
          </motion.button>
        ))}
      </div>
      
      <p className="text-xs text-muted-foreground mt-4">
        Click any block to view detailed sensor data
      </p>
    </motion.div>
  );
}
