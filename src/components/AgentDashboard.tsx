
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
  Award,
  ChevronDown,
  ChevronUp,
  X,
  LineChart
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { LineChartPulse } from "./LineChartPulse";

const AgentDashboard = () => {
  // Animation states for progress indicators
  const [salesProgress, setSalesProgress] = useState(0);
  const [commissionProgress, setCommissionProgress] = useState(0);
  const [showMoreActivity, setShowMoreActivity] = useState(false);
  
  // Sample data
  const salesTarget = 66;
  const commissionTarget = 78;
  
  const recentActivity = [
    { agent: "Sarah Lee", action: "Sold", property: "Parkview Heights", value: "$1.2M", time: "2h" },
    { agent: "James Wong", action: "Rented", property: "Riverside Res.", value: "$3.6K", time: "1d" },
    { agent: "Michael Chen", action: "Sold", property: "Lakeside Manor", value: "$2.5M", time: "2d" },
    { agent: "Aisha Patel", action: "Rented", property: "Urban Lofts", value: "$5.2K", time: "2d" },
    { agent: "David Kim", action: "Sold", property: "Sunset Hills", value: "$1.8M", time: "3d" },
  ];
  
  const previousActivity = [
    { agent: "Olivia Martinez", action: "Sold", property: "Mountainview Estate", value: "$3.1M", time: "1w" },
    { agent: "Ethan Roberts", action: "Rented", property: "City Center Apts", value: "$4.5K", time: "1w" },
    { agent: "Sophia Williams", action: "Sold", property: "Harbor Views", value: "$2.7M", time: "1w" },
    { agent: "Noah Johnson", action: "Rented", property: "Green Valley Homes", value: "$3.8K", time: "2w" },
    { agent: "Emma Brown", action: "Sold", property: "Golden Gate Condos", value: "$1.5M", time: "2w" },
    { agent: "Liam Garcia", action: "Rented", property: "Sky Towers", value: "$6.9K", time: "3w" },
    { agent: "Ava Wilson", action: "Sold", property: "Silver Lake Estate", value: "$4.3M", time: "3w" },
  ];
  
  // Sales chart data - yearly sales transactions
  const yearlySalesData = [
    { date: new Date("2023-01-15"), value: 4 },
    { date: new Date("2023-02-15"), value: 6 },
    { date: new Date("2023-03-15"), value: 8 },
    { date: new Date("2023-04-15"), value: 7 },
    { date: new Date("2023-05-15"), value: 9 },
    { date: new Date("2023-06-15"), value: 12 },
    { date: new Date("2023-07-15"), value: 11 },
    { date: new Date("2023-08-15"), value: 13 },
    { date: new Date("2023-09-15"), value: 10 },
    { date: new Date("2023-10-15"), value: 8 },
    { date: new Date("2023-11-15"), value: 11 },
    { date: new Date("2023-12-15"), value: 15 },
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
      
      {/* Activity Modal */}
      {showMoreActivity && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg shadow-lg w-full max-w-2xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <h3 className="text-lg font-medium">All Recent Activity</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowMoreActivity(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-4 max-h-[70vh] overflow-y-auto">
              <div className="space-y-3">
                {[...recentActivity, ...previousActivity].map((activity, index) => (
                  <div key={index} className="flex items-center py-2 border-b border-gray-800">
                    <Avatar className="h-8 w-8 mr-3 bg-gray-700">
                      <AvatarFallback>
                        {activity.agent.split(' ').map(name => name[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">{activity.agent}</div>
                      <div className="text-gray-400">
                        <span className={activity.action === "Sold" ? "text-green-400" : "text-blue-400"}>
                          {activity.action}
                        </span>
                        {" "}{activity.property} • {activity.value}
                      </div>
                    </div>
                    <div className="text-gray-400 text-sm">{activity.time}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 border-t border-gray-800">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => setShowMoreActivity(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content - Optimized Layout */}
      <div className="p-3 md:p-3 grid grid-cols-12 gap-3 h-[calc(100vh-56px)]">
        {/* Left Sidebar - Metric Cards */}
        <div className="col-span-3 grid grid-cols-1 gap-3 auto-rows-min">
          {/* Total Revenue */}
          <Card className="bg-black border-slate-800 shadow-lg">
            <CardContent className="py-3 px-3">
              <div className="text-slate-400 text-xs mb-1">Total Revenue</div>
              <div className="text-xl font-bold animate-fade-in">$498,250</div>
              <div className="text-green-400 text-xs flex items-center">
                <TrendingUp size={10} className="mr-1" />
                15% vs last year
              </div>
            </CardContent>
          </Card>
          
          {/* Avg. Transaction */}
          <Card className="bg-black border-slate-800 shadow-lg">
            <CardContent className="py-3 px-3">
              <div className="text-slate-400 text-xs mb-1">Avg. Transaction</div>
              <div className="text-xl font-bold animate-fade-in">$849,600</div>
              <div className="text-green-400 text-xs flex items-center">
                <TrendingUp size={10} className="mr-1" />
                8% vs last year
              </div>
            </CardContent>
          </Card>
          
          {/* Total Properties */}
          <Card className="bg-black border-slate-800 shadow-lg">
            <CardContent className="py-3 px-3">
              <div className="text-slate-400 text-xs mb-1">Total Properties</div>
              <div className="text-xl font-bold animate-fade-in">11</div>
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
          
          {/* Team Ranking */}
          <Card className="bg-black border-slate-800 shadow-lg">
            <CardContent className="py-3 px-3">
              <div className="text-slate-400 text-xs mb-1">Team Ranking</div>
              <div className="text-xl font-bold animate-fade-in">#2</div>
              <div className="text-yellow-400 text-xs flex items-center">
                <Award size={10} className="mr-1" />
                Top 10% nationwide
              </div>
            </CardContent>
          </Card>
          
          {/* Commission Claims Card */}
          <Card className="bg-black border-slate-800 shadow-lg">
            <CardHeader className="p-3 pb-0">
              <CardTitle className="text-sm font-semibold">Commission Claims</CardTitle>
            </CardHeader>
            <CardContent className="p-3 space-y-3">
              <div className="flex items-center gap-2">
                <div className="text-xl font-bold animate-fade-in">
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
                  <div className="text-slate-400">Target</div>
                  <div className="font-semibold">$120K</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content Area */}
        <div className="col-span-9 grid grid-cols-3 gap-3 auto-rows-min">
          {/* Yearly Sales Chart Card - Spans full width */}
          <Card className="bg-black border-slate-800 shadow-lg col-span-3">
            <CardHeader className="p-3 pb-0">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-semibold">Yearly Sales Transactions</CardTitle>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-3">
              <div className="text-xs text-slate-400 mb-1">
                Monthly performance for 2023
              </div>
              <LineChartPulse data={yearlySalesData} height="h-40" />
              <div className="flex justify-between text-xs pt-1">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mr-1"></div>
                  <span>Total: {yearlySalesData.reduce((sum, item) => sum + item.value, 0)} Properties</span>
                </div>
                <div className="text-green-400">
                  +23% from previous year
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Activity Card */}
          <Card className="bg-black border-slate-800 shadow-lg col-span-1">
            <CardHeader className="p-3 pb-0">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-semibold">Recent Activity</CardTitle>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-3 space-y-2 max-h-[230px] overflow-y-auto">
              {recentActivity.slice(0, 3).map((activity, index) => (
                <div key={index} className="flex items-center border-b border-slate-800 pb-2">
                  <Avatar className="h-6 w-6 mr-2 bg-slate-700">
                    <AvatarFallback className="text-[9px]">
                      {activity.agent.split(' ').map(name => name[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-xs">
                    <div className="font-medium">{activity.agent}</div>
                    <div className="text-slate-400 mt-0.5">
                      <span className={activity.action === "Sold" ? "text-green-400" : "text-blue-400"}>
                        {activity.action}
                      </span>
                      {" "}{activity.property}
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full text-xs border border-slate-800 rounded-md hover:bg-slate-800" 
                  onClick={() => setShowMoreActivity(true)}
                >
                  Show more
                  <ChevronDown size={12} className="ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Sales Transaction Progress Card */}
          <Card className="bg-black border-slate-800 shadow-lg col-span-1">
            <CardHeader className="p-3 pb-0">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-semibold">Sales Transaction</CardTitle>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-slate-400 text-xs">
                On track to finish early
              </p>
            </CardHeader>
            <CardContent className="p-3 space-y-3">
              <div className="flex items-center gap-2">
                <div className="text-xl font-bold animate-fade-in">
                  {salesProgress}%
                </div>
                
                <div className="flex items-center bg-slate-800/50 px-2 py-0.5 rounded-full">
                  <TrendingUp className="text-white mr-1" size={10} />
                  <span className="text-xs">30%</span>
                </div>
              </div>
              
              <div className="flex">
                {renderSegments(salesProgress, 100)}
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-800/50 p-2 rounded-lg">
                  <div className="flex items-center text-blue-400 mb-1 text-xs">
                    <Home size={10} className="mr-1" />
                    <span>Sold</span>
                  </div>
                  <div className="text-base font-semibold">4</div>
                </div>
                <div className="bg-slate-800/50 p-2 rounded-lg">
                  <div className="flex items-center text-purple-400 mb-1 text-xs">
                    <Home size={10} className="mr-1" />
                    <span>Rented</span>
                  </div>
                  <div className="text-base font-semibold">7</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Upcoming Appointments Card */}
          <Card className="bg-black border-slate-800 shadow-lg col-span-1">
            <CardHeader className="p-3 pb-0">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-semibold">Appointments</CardTitle>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-3 space-y-2">
              <div className="flex items-center border-l-2 border-blue-500 pl-2">
                <div className="h-5 w-5 bg-blue-500/30 rounded-full flex items-center justify-center mr-2">
                  <Calendar size={10} />
                </div>
                <div className="flex-1 text-xs">
                  <div className="font-medium">Property Viewing</div>
                  <div className="text-slate-400">Today, 2:30 PM</div>
                </div>
              </div>
              
              <div className="flex items-center border-l-2 border-green-500 pl-2">
                <div className="h-5 w-5 bg-green-500/30 rounded-full flex items-center justify-center mr-2">
                  <Users size={10} />
                </div>
                <div className="flex-1 text-xs">
                  <div className="font-medium">Client Meeting</div>
                  <div className="text-slate-400">Tomorrow, 10:00 AM</div>
                </div>
              </div>
              
              <div className="flex items-center border-l-2 border-purple-500 pl-2">
                <div className="h-5 w-5 bg-purple-500/30 rounded-full flex items-center justify-center mr-2">
                  <DollarSign size={10} />
                </div>
                <div className="flex-1 text-xs">
                  <div className="font-medium">Contract Signing</div>
                  <div className="text-slate-400">Mar 1, 4:00 PM</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
