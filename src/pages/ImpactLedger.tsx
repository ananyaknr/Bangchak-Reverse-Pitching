import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CostCalculator } from '@/components/impact/CostCalculator';
import { motion } from 'framer-motion';
import { Leaf, Recycle, Droplets, Factory } from 'lucide-react';

const impactMetrics = [
  {
    icon: Leaf,
    label: 'CO₂ Avoided',
    value: '2,400',
    unit: 'tons/year',
  },
  {
    icon: Recycle,
    label: 'Waste Diverted',
    value: '5,600',
    unit: 'tons/year',
  },
  {
    icon: Droplets,
    label: 'Water Saved',
    value: '1.2M',
    unit: 'liters/year',
  },
  {
    icon: Factory,
    label: 'Energy Reduced',
    value: '35%',
    unit: 'vs traditional',
  },
];

export default function ImpactLedger() {
  return (
    <DashboardLayout 
      title="Impact Ledger" 
      breadcrumb={['S-GUARD', 'Impact Ledger']}
    >
      {/* Environmental Impact Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Environmental Impact Summary
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {impactMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="stat-card"
            >
              <div className="p-2 rounded-lg bg-primary-muted w-fit mb-3">
                <metric.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold font-mono text-foreground">
                  {metric.value}
                </span>
                <span className="text-xs text-muted-foreground">{metric.unit}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Cost Calculator */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Business ROI Calculator
        </h2>
        <CostCalculator />
      </div>
    </DashboardLayout>
  );
}
