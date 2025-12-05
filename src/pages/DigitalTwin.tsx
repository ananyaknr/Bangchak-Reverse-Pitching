import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { HeatmapGrid } from '@/components/digital-twin/HeatmapGrid';
import { BlockDetailPanel } from '@/components/digital-twin/BlockDetailPanel';
import { GridBlock } from '@/lib/mock-data';

export default function DigitalTwin() {
  const [selectedBlock, setSelectedBlock] = useState<GridBlock | null>(null);

  return (
    <DashboardLayout 
      title="Digital Twin" 
      breadcrumb={['S-GUARD', 'Digital Twin']}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <HeatmapGrid 
            onBlockSelect={setSelectedBlock}
            selectedBlockId={selectedBlock?.id}
          />
        </div>
        
        <div>
          <BlockDetailPanel block={selectedBlock} />
        </div>
      </div>
    </DashboardLayout>
  );
}
