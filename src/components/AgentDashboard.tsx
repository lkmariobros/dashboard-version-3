
import React, { useState, useEffect } from 'react';
import { 
  MoreHorizontal, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Users, 
  Home, 
  Search, 
  Bell, 
  Menu, 
  User, 
  Award
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const AgentDashboard = () => {
  // Animation states for progress indicators
  const [salesProgress, setSalesProgress] = useState(0);
  const [commissionProgress, setCommissionProgress] = useState(0);
  
  // Sample data
  const salesTarget = 66;
  const commissionTarget = 78;
  
  const upcomingCommissions = [
    { property: "123 Main St Condo", date: "Mar 3", amount: 4250 },
    { property: "456 Park Ave House", date: "Mar 15", amount: 6800 }
  ];
  
  const recentActivity = [
    { agent: "Sarah Lee", action: "Sold", property: "Parkview Heights", value: "$1.2M", time: "2h" },
    { agent: "James Wong", action: "Rented", property: "Riverside Res.", value: "$3.6K", time: "1d" }
  ];
  
  // Animate progress bars on component mount
  useEffect(() => {
    const animateProgress = (setter, target, speed = 20) => {
      let current = 0;
      const interval = setInterval(() => {
        if (current < target) {
          current += 1;
          setter(current);
        } else {
          clearInterval(interval);
        }
      }, speed);
      
      return interval;
    };
    
    const salesInterval = animateProgress(setSalesProgress, salesTarget);
    const commissionInterval = animateProgress(setCommissionProgress, commissionTarget, 15);
    
    return () => {
      clearInterval(salesInterval);
      clearInterval(commissionInterval);
    };
  }, []);
  
  // Progress bar segments renderer
  const renderSegments = (current, total, count = 15) => {
    const segments = [];
    const filledSegments = Math.floor((current / 100) * count);
    
    for (let i = 0; i < count; i++) {
      segments.push(
        <div
          key={i}
          className={`h-2 w-1 mx-0.5 rounded-sm transition-all duration-300 ${
            i < filledSegments ? 'bg-white' : 'bg-slate-700'
          }`}
          style={{
            transform: i < filledSegments ? 'scaleY(1)' : 'scaleY(0.3)',
            transition: `transform 300ms ease-out ${i * 15}ms`
          }}
        />
      );
    }
    return segments;
  };

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-black/90 backdrop-blur-sm border-b border-slate-800 px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-2 text-white">
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold">Agent Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-white">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <Bell className="h-5 w-5" />
          </Button>
          <Avatar className="h-8 w-8 bg-blue-500">
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="p-3 md:p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 auto-rows-min">
        
        {/* Sales Transaction Progress Card */}
        <Card className="bg-black border-slate-800 shadow-lg col-span-1 md:col-span-2 lg:col-span-4 lg:row-span-2">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-semibold">Sales Transaction</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-slate-400 text-xs">
              On track to finish three days early
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold animate-fade-in">
                {salesProgress}%
              </div>
              
              <div className="flex items-center bg-slate-800/50 px-2 py-0.5 rounded-full">
                <TrendingUp className="text-white mr-1" size={12} />
                <span className="text-xs">30%</span>
              </div>
            </div>
            
            <div className="flex">
              {renderSegments(salesProgress, 100)}
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-800/50 p-2 rounded-lg">
                <div className="flex items-center text-blue-400 mb-1 text-xs">
                  <Home size={12} className="mr-1" />
                  <span>Properties Sold</span>
                </div>
                <div className="text-xl font-semibold">4</div>
              </div>
              <div className="bg-slate-800/50 p-2 rounded-lg">
                <div className="flex items-center text-purple-400 mb-1 text-xs">
                  <Home size={12} className="mr-1" />
                  <span>Properties Rented</span>
                </div>
                <div className="text-xl font-semibold">7</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Upcoming Commission Card */}
        <Card className="bg-black border-slate-800 shadow-lg col-span-1 md:col-span-1 lg:col-span-4">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-semibold">Upcoming Commission</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-2xl font-bold flex items-center animate-fade-in">
              <DollarSign size={18} className="text-green-400 mr-1" />
              $14,200
            </div>
            
            <div className="space-y-2">
              {upcomingCommissions.map((commission, index) => (
                <div key={index} className="flex justify-between text-xs">
                  <div>
                    <div className="font-medium">{commission.property}</div>
                    <div className="text-slate-400 flex items-center">
                      <Calendar size={10} className="mr-1" />
                      {commission.date}
                    </div>
                  </div>
                  <div className="text-green-400 font-semibold">
                    ${commission.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Commission Claims Card */}
        <Card className="bg-black border-slate-800 shadow-lg col-span-1 md:col-span-1 lg:col-span-4">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-semibold">Commission Claims</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold animate-fade-in">
                {commissionProgress}%
              </div>
              
              <div className="flex items-center bg-slate-800/50 px-2 py-0.5 rounded-full">
                <TrendingUp className="text-green-400 mr-1" size={12} />
                <span className="text-xs">12%</span>
              </div>
            </div>
            
            <div className="flex">
              {renderSegments(commissionProgress, 100)}
            </div>
            
            <div className="flex justify-between text-xs">
              <div>
                <div className="text-slate-400">Claimed</div>
                <div className="font-semibold">$89K</div>
              </div>
              <div>
                <div className="text-slate-400">Pending</div>
                <div className="font-semibold">$13K</div>
              </div>
              <div>
                <div className="text-slate-400">Target</div>
                <div className="font-semibold">$120K</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Activity Card */}
        <Card className="bg-black border-slate-800 shadow-lg col-span-1 md:col-span-1 lg:col-span-4">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-semibold">Recent Activity</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center border-b border-slate-800 pb-1">
                <Avatar className="h-6 w-6 mr-2 bg-blue-500">
                  <AvatarFallback className="text-[10px]">
                    <Users size={12} />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-xs">
                  <div className="font-medium">{activity.agent}</div>
                  <div className="text-slate-400">
                    <span className={activity.action === "Sold" ? "text-green-400" : "text-blue-400"}>
                      {activity.action}
                    </span>
                    {" "}{activity.property} • {activity.value}
                  </div>
                </div>
                <div className="text-slate-400 text-xs">{activity.time}</div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        {/* Upcoming Appointments Card */}
        <Card className="bg-black border-slate-800 shadow-lg col-span-1 md:col-span-1 lg:col-span-4">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-semibold">Upcoming Appointments</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center p-1 border-l-2 border-blue-500">
              <div className="h-6 w-6 bg-blue-500/30 rounded-full flex items-center justify-center mr-2">
                <Calendar size={12} />
              </div>
              <div className="flex-1 text-xs">
                <div className="font-medium">Property Viewing</div>
                <div className="text-slate-400">Today, 2:30 PM • Parkview Heights</div>
              </div>
            </div>
            
            <div className="flex items-center p-1 border-l-2 border-green-500">
              <div className="h-6 w-6 bg-green-500/30 rounded-full flex items-center justify-center mr-2">
                <Users size={12} />
              </div>
              <div className="flex-1 text-xs">
                <div className="font-medium">Client Meeting</div>
                <div className="text-slate-400">Tomorrow, 10:00 AM • John & Lisa Chen</div>
              </div>
            </div>
            
            <div className="flex items-center p-1 border-l-2 border-purple-500">
              <div className="h-6 w-6 bg-purple-500/30 rounded-full flex items-center justify-center mr-2">
                <DollarSign size={12} />
              </div>
              <div className="flex-1 text-xs">
                <div className="font-medium">Contract Signing</div>
                <div className="text-slate-400">Mar 1, 4:00 PM • Garden Terrace #03-22</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Summary Stats */}
        <div className="col-span-1 md:col-span-2 lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <Card className="bg-black border-slate-800 shadow-lg">
            <CardContent className="pt-4">
              <div className="text-slate-400 text-xs mb-1">Total Revenue</div>
              <div className="text-2xl font-bold animate-fade-in">$498,250</div>
              <div className="text-green-400 text-xs flex items-center">
                <TrendingUp size={10} className="mr-1" />
                15% vs last year
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black border-slate-800 shadow-lg">
            <CardContent className="pt-4">
              <div className="text-slate-400 text-xs mb-1">Avg. Transaction</div>
              <div className="text-2xl font-bold animate-fade-in">$849,600</div>
              <div className="text-green-400 text-xs flex items-center">
                <TrendingUp size={10} className="mr-1" />
                8% vs last year
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black border-slate-800 shadow-lg">
            <CardContent className="pt-4">
              <div className="text-slate-400 text-xs mb-1">Total Properties</div>
              <div className="text-2xl font-bold animate-fade-in">11</div>
              <div className="flex text-xs mt-1">
                <div className="mr-3 flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                  <span>4 Sold</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mr-1"></div>
                  <span>7 Rented</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black border-slate-800 shadow-lg">
            <CardContent className="pt-4">
              <div className="text-slate-400 text-xs mb-1">Team Ranking</div>
              <div className="text-2xl font-bold animate-fade-in">#2</div>
              <div className="text-yellow-400 text-xs flex items-center">
                <Award size={10} className="mr-1" />
                Top 10% nationwide
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
