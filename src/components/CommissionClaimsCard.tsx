
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CommissionClaimsCardProps {
  progress: number;
}

const CommissionClaimsCard = ({ progress }: CommissionClaimsCardProps) => {
  // Progress bar segments renderer specific to Commission Claims
  const renderCommissionSegments = (current: number, count = 10) => {
    const segments = [];
    const filledSegments = Math.floor((current / 100) * count);
    
    for (let i = 0; i < count; i++) {
      segments.push(
        <div
          key={i}
          className={`h-1.5 w-full rounded-full transition-all duration-300 ${
            i < filledSegments ? 'bg-purple-500' : 'bg-slate-700'
          }`}
          style={{
            opacity: i < filledSegments ? 1 : 0.3,
            transition: `opacity 300ms ease-out ${i * 50}ms, background-color 300ms ease-out`
          }}
        />
      );
    }
    return (
      <div className="grid grid-cols-10 gap-1 w-full">
        {segments}
      </div>
    );
  };

  return (
    <Card className="commission-claims-card bg-slate-900 border border-slate-800 rounded-xl shadow-md h-full">
      <CardHeader className="commission-claims-header p-5 pb-2">
        <CardTitle className="text-xl font-semibold">Commission Claims</CardTitle>
      </CardHeader>
      <CardContent className="commission-claims-content p-5 pt-3">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-4xl font-bold animate-fade-in">
            {progress}%
          </div>
          <div className="text-green-400 text-sm flex items-center bg-green-500/10 px-2.5 py-1.5 rounded-full">
            <TrendingUp size={14} className="mr-1.5" />
            12%
          </div>
        </div>
        
        {renderCommissionSegments(progress)}
        
        <div className="mt-4 text-sm text-slate-400">
          <div className="flex justify-between">
            <span>Current Period</span>
            <span className="font-medium text-white">$157,240</span>
          </div>
          <div className="flex justify-between mt-1.5">
            <span>Previous Period</span>
            <span className="font-medium text-slate-300">$135,830</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommissionClaimsCard;
