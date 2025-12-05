import { motion } from 'framer-motion';
import { Recycle, Leaf, TrendingUp, ShieldCheck, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  Recycle,
  Leaf,
  TrendingUp,
  ShieldCheck,
};

interface StatCardProps {
  label: string;
  value: string;
  unit: string;
  icon: string;
  trend: string;
  trendUp: boolean;
  delay?: number;
}

export function StatCard({ label, value, unit, icon, trend, trendUp, delay = 0 }: StatCardProps) {
  const Icon = iconMap[icon] || ShieldCheck;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="stat-card group"
    >
      <div className="flex items-start justify-between">
        <div className="p-2.5 rounded-xl bg-primary-muted group-hover:bg-accent transition-colors">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <span className={cn(
          'text-xs font-medium px-2 py-1 rounded-full',
          trendUp ? 'status-safe' : 'status-warning'
        )}>
          {trend}
        </span>
      </div>
      
      <div className="mt-4">
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-3xl font-bold text-foreground font-mono tracking-tight">
            {value}
          </span>
          {unit && (
            <span className="text-lg text-muted-foreground font-medium">
              {unit}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
