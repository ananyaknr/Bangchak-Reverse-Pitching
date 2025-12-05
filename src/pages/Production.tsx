import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MixerMonitor } from '@/components/production/MixerMonitor';
import { SafetyPanel } from '@/components/production/SafetyPanel';
import { motion } from 'framer-motion';
import { Activity, Clock, CheckCircle2 } from 'lucide-react';

export default function Production() {
  return (
    <DashboardLayout 
      title="Production Node" 
      breadcrumb={['S-GUARD', 'Production']}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <MixerMonitor />
          
          {/* Production Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="grid sm:grid-cols-3 gap-4"
          >
            <div className="stat-card text-center">
              <Activity className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold font-mono text-foreground">847</p>
              <p className="text-sm text-muted-foreground">Batches Today</p>
            </div>
            
            <div className="stat-card text-center">
              <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold font-mono text-foreground">12.4</p>
              <p className="text-sm text-muted-foreground">Avg Cycle (min)</p>
            </div>
            
            <div className="stat-card text-center">
              <CheckCircle2 className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold font-mono text-foreground">99.2%</p>
              <p className="text-sm text-muted-foreground">Quality Pass Rate</p>
            </div>
          </motion.div>
        </div>
        
        <div>
          <SafetyPanel />
        </div>
      </div>
    </DashboardLayout>
  );
}
