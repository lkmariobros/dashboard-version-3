
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CommissionClaimsCardProps {
  progress: number;
}

const CommissionClaimsCard = ({ progress }: CommissionClaimsCardProps) => {
  // Progress bar segments renderer specific to Commission Claims
  const renderCommissionSegments = (current: number, count = 10) => {
    return (
      <div className="flex w-full gap-1">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full bg-purple-500 opacity-40`}
            style={{
              opacity: i < Math.floor((current / 100) * count) ? 1 : 0.4,
              transition: `opacity 300ms ease-out ${i * 50}ms, background-color 300ms ease-out`
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="commission-claims-card h-full bg-slate-900 border-slate-800">
      <CardHeader className="commission-claims-header p-6 pb-3">
        <CardTitle className="text-xl font-semibold">Commission Claims</CardTitle>
      </CardHeader>
      <CardContent className="commission-claims-content p-6 pt-4">
        <div className="flex items-center gap-4 mb-5">
          <div className="text-5xl font-bold text-purple-400 animate-fade-in">
            {progress}%
          </div>
          <div className="text-green-400 text-sm flex items-center bg-green-500/10 px-3 py-2 rounded-full">
            <TrendingUp size={16} className="mr-1.5" />
            12%
          </div>
        </div>
        
        {renderCommissionSegments(progress)}
        
        <div className="mt-5 text-sm text-slate-400">
          <div className="flex justify-between mb-2">
            <span>Current Period</span>
            <span className="font-medium text-white">$157,240</span>
          </div>
          <div className="flex justify-between">
            <span>Previous Period</span>
            <span className="font-medium text-slate-300">$135,830</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommissionClaimsCard;
