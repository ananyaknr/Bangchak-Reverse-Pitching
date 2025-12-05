import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from 'recharts';
import { chartData } from '@/lib/mock-data';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-xl p-4 shadow-lg">
        <p className="font-semibold text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-mono font-semibold text-foreground">
              {entry.value > 0 ? '+' : ''}{entry.value} tons
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function CarbonTrajectoryChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="stat-card"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Carbon Trajectory</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Cumulative CO₂ comparison over 10 years
        </p>
      </div>
      
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="gradientSguard" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradientConcrete" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(215, 15%, 60%)" stopOpacity={0.15} />
                <stop offset="95%" stopColor="hsl(215, 15%, 60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(215, 20%, 91%)" 
              vertical={false}
            />
            
            <XAxis 
              dataKey="year" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(215, 15%, 50%)', fontSize: 12 }}
            />
            
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(215, 15%, 50%)', fontSize: 12 }}
              tickFormatter={(value) => `${value > 0 ? '+' : ''}${value}`}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            <ReferenceLine y={0} stroke="hsl(215, 20%, 85%)" strokeWidth={2} />
            
            <Legend 
              verticalAlign="top" 
              align="right"
              wrapperStyle={{ paddingBottom: 20 }}
            />
            
            <Area
              type="monotone"
              dataKey="concrete"
              name="Ordinary Concrete"
              stroke="hsl(215, 15%, 60%)"
              strokeWidth={2}
              strokeDasharray="8 4"
              fill="url(#gradientConcrete)"
            />
            
            <Area
              type="monotone"
              dataKey="sguard"
              name="S-GUARD"
              stroke="hsl(160, 84%, 39%)"
              strokeWidth={3}
              fill="url(#gradientSguard)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-chart-emerald rounded" />
            <span className="text-muted-foreground">S-GUARD (Carbon Negative)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-chart-gray rounded border-dashed" style={{ borderTop: '2px dashed' }} />
            <span className="text-muted-foreground">Traditional Concrete</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
