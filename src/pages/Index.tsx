import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { CarbonTrajectoryChart } from '@/components/dashboard/CarbonTrajectoryChart';
import { executiveStats } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { Activity, TrendingUp } from 'lucide-react';

const Index = () => {
  return (
    <DashboardLayout 
      title="Executive Dashboard" 
      breadcrumb={['S-GUARD', 'Dashboard']}
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {executiveStats.map((stat, index) => (
          <StatCard
            key={stat.label}
            {...stat}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Chart Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CarbonTrajectoryChart />
        </div>
        
        {/* Quick Insights Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="stat-card"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Insights</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-primary-muted">
              <Activity className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Grid Performance</p>
                <p className="text-xs text-muted-foreground mt-1">
                  98 of 100 blocks operating at optimal resistance levels
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-xl bg-status-safe">
              <TrendingUp className="w-5 h-5 text-status-safe-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Carbon Target</p>
                <p className="text-xs text-muted-foreground mt-1">
                  On track to exceed Q4 mineralization goals by 12%
                </p>
              </div>
            </div>
            
            <div className="p-4 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Next Maintenance
              </p>
              <p className="text-lg font-bold text-foreground">Block SG-142</p>
              <p className="text-sm text-muted-foreground mt-1">
                Scheduled: Dec 15, 2024
              </p>
            </div>
            
            <div className="p-4 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Production Status
              </p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-medium text-foreground">All systems operational</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
