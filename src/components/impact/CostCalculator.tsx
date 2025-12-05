import { useState } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Calculator, TrendingUp, Banknote, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const TRADITIONAL_COST_PER_SQM = 8500; // THB
const SGUARD_COST_PER_SQM = 4200; // THB

export function CostCalculator() {
  const [area, setArea] = useState([1500]);
  
  const projectArea = area[0];
  const traditionalCost = projectArea * TRADITIONAL_COST_PER_SQM;
  const sguardCost = projectArea * SGUARD_COST_PER_SQM;
  const savings = traditionalCost - sguardCost;
  const savingsPercent = Math.round((savings / traditionalCost) * 100);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `฿${(value / 1000000).toFixed(1)}M`;
    }
    return `฿${(value / 1000).toFixed(0)}K`;
  };

  const maxTraditional = 5000 * TRADITIONAL_COST_PER_SQM;
  const traditionalPercent = (traditionalCost / maxTraditional) * 100;
  const sguardPercent = (sguardCost / maxTraditional) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Slider Card */}
      <div className="stat-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-primary-muted">
            <Calculator className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">ROI Calculator</h3>
            <p className="text-sm text-muted-foreground">
              Compare costs between traditional and S-GUARD concrete
            </p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                Project Size
              </label>
              <span className="text-2xl font-bold font-mono text-primary">
                {projectArea.toLocaleString()} m²
              </span>
            </div>
            
            <Slider
              value={area}
              onValueChange={setArea}
              min={100}
              max={5000}
              step={50}
              className="py-4"
            />
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>100 m²</span>
              <span>5,000 m²</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cost Comparison */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Traditional */}
        <div className="stat-card border-2 border-muted">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-slate-400" />
            <span className="text-sm font-medium text-muted-foreground">
              Traditional Concrete
            </span>
          </div>
          
          <div className="space-y-4">
            <div className="h-32 flex items-end">
              <motion.div
                className="w-full bg-slate-200 rounded-t-lg"
                initial={{ height: 0 }}
                animate={{ height: `${traditionalPercent}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
            
            <div className="text-center pt-2 border-t border-border">
              <p className="text-sm text-muted-foreground mb-1">Total Cost</p>
              <p className="text-2xl font-bold font-mono text-foreground">
                {formatCurrency(traditionalCost)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Material + Disposal + Repairs
              </p>
            </div>
          </div>
        </div>

        {/* S-GUARD */}
        <div className="stat-card border-2 border-primary">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm font-medium text-primary">
              S-GUARD Concrete
            </span>
          </div>
          
          <div className="space-y-4">
            <div className="h-32 flex items-end">
              <motion.div
                className="w-full bg-emerald-500 rounded-t-lg"
                initial={{ height: 0 }}
                animate={{ height: `${sguardPercent}%` }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
              />
            </div>
            
            <div className="text-center pt-2 border-t border-border">
              <p className="text-sm text-muted-foreground mb-1">Total Cost</p>
              <p className="text-2xl font-bold font-mono text-primary">
                {formatCurrency(sguardCost)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Material − Waste Revenue
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Savings Card */}
      <motion.div
        className="stat-card bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-2 border-emerald-200"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-primary">
              <TrendingUp className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-emerald-700">Total Profit with S-GUARD</p>
              <p className="text-xs text-emerald-600 mt-0.5">
                Based on {projectArea.toLocaleString()} m² project
              </p>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <motion.p
              key={savings}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-4xl md:text-5xl font-bold font-mono text-emerald-700"
            >
              {formatCurrency(savings)}
            </motion.p>
            <div className="flex items-center justify-center md:justify-end gap-2 mt-2">
              <Banknote className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-600">
                {savingsPercent}% cost reduction
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-emerald-200 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-emerald-600">Material Cost</p>
            <p className="font-mono font-semibold text-emerald-700">−50%</p>
          </div>
          <div>
            <p className="text-xs text-emerald-600">Disposal Cost</p>
            <p className="font-mono font-semibold text-emerald-700">−100%</p>
          </div>
          <div>
            <p className="text-xs text-emerald-600">Repair Frequency</p>
            <p className="font-mono font-semibold text-emerald-700">−70%</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
