// S-GUARD Command Center Mock Data

export const chartData = [
  { year: 'Y1', concrete: 500, sguard: -200 },
  { year: 'Y3', concrete: 900, sguard: -180 },
  { year: 'Y5', concrete: 1400, sguard: -160 },
  { year: 'Y7', concrete: 2100, sguard: -140 },
  { year: 'Y10', concrete: 3000, sguard: -120 },
];

export const gridData = Array.from({ length: 100 }, (_, i) => ({
  id: `SG-${i + 100}`,
  status: i === 42 || i === 88 ? 'critical' : i === 15 || i === 67 || i === 23 ? 'warning' : 'healthy',
  resistance: i === 42 ? 0.4 : i === 88 ? 0.8 : i === 15 ? 5.2 : Math.round((12 + Math.random() * 8) * 10) / 10,
  moisture: i === 42 ? 12 : i === 88 ? 8 : Math.round(Math.random() * 4 * 10) / 10,
  temperature: Math.round((22 + Math.random() * 8) * 10) / 10,
  estimatedLife: i === 42 ? 2 : i === 88 ? 4 : i === 15 ? 8 : Math.round(15 + Math.random() * 10),
}));

export type GridBlock = typeof gridData[number];

export const executiveStats = [
  {
    label: 'Waste Upcycled',
    value: '1,240',
    unit: 'Tons',
    icon: 'Recycle',
    trend: '+12%',
    trendUp: true,
  },
  {
    label: 'CO₂ Mineralized',
    value: '480',
    unit: 'Tons',
    icon: 'Leaf',
    trend: '+8%',
    trendUp: true,
  },
  {
    label: 'Est. Savings',
    value: '฿4.2M',
    unit: '',
    icon: 'TrendingUp',
    trend: '+24%',
    trendUp: true,
  },
  {
    label: 'Grid Health',
    value: '98.5',
    unit: '%',
    icon: 'ShieldCheck',
    trend: 'Stable',
    trendUp: true,
  },
];

export const productionData = {
  mixerLoad: 75,
  temperature: 142,
  maxTemp: 200,
  warningTemp: 155,
  h2sLevel: 0.8,
  maxH2s: 10,
  safeH2s: 5,
};
