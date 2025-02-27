
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
  LineChart,
  Plus,
  BarChart3,
  Settings,
  LogOut
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { LineChartPulse } from "./LineChartPulse";
import CommissionClaimsCard from "./CommissionClaimsCard";

const AgentDashboard = () => {
  // Animation states for progress indicators
  const [salesProgress, setSalesProgress] = useState(0);
  const [commissionProgress, setCommissionProgress] = useState(0);
  const [showMoreActivity, setShowMoreActivity] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
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
  
  const navItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: BarChart3, label: "Analytics" },
    { icon: Users, label: "Clients" },
    { icon: Calendar, label: "Calendar" },
    { icon: Settings, label: "Settings" },
  ];
  
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
  
  const renderSegments = (current, total, count = 10) => {
    const segments = [];
    const filledSegments = Math.floor((current / 100) * count);
    
    for (let i = 0; i < count; i++) {
      segments.push(
        <div
          key={i}
          className={`h-1.5 w-full rounded-full transition-all duration-300 ${
            i < filledSegments ? 'bg-blue-500' : 'bg-slate-700'
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
    <div className="bg-black text-white min-h-screen flex overflow-hidden">
      <div className={`bg-slate-900 border-r border-slate-800 transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-60'
      } flex flex-col h-screen fixed left-0 top-0 z-30`}>
        <div className="h-16 border-b border-slate-800 flex items-center justify-between px-4">
          {!sidebarCollapsed && <h1 className="font-bold text-lg">Agent Portal</h1>}
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-slate-400 hover:text-white"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex-1 py-4">
          <ul className="space-y-2 px-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <Button 
                  variant={item.active ? "secondary" : "ghost"} 
                  className={`w-full justify-start text-left ${
                    sidebarCollapsed ? 'px-3' : 'px-3'
                  } ${item.active ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  <item.icon className={`h-5 w-5 ${sidebarCollapsed ? '' : 'mr-3'}`} />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </Button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center">
            <Avatar className="h-9 w-9 bg-gradient-to-br from-blue-500 to-purple-600">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            {!sidebarCollapsed && (
              <div className="ml-3">
                <div className="font-medium">John Doe</div>
                <div className="text-xs text-slate-400">Senior Agent</div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className={`flex-1 transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-60'
      }`}>
        <header className="h-16 bg-black border-b border-slate-800 sticky top-0 z-20 flex items-center justify-between px-6">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Button variant="outline" size="sm" className="text-slate-400 border-slate-700">
                <Plus className="h-4 w-4 mr-2" />
                New Property
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="text-slate-400">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-blue-500 rounded-full"></span>
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600">JD</AvatarFallback>
            </Avatar>
          </div>
        </header>
        
        {showMoreActivity && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 rounded-lg shadow-lg w-full max-w-2xl">
              <div className="flex justify-between items-center p-4 border-b border-slate-800">
                <h3 className="text-lg font-medium">All Recent Activity</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowMoreActivity(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="p-4 max-h-[70vh] overflow-y-auto">
                <div className="space-y-3">
                  {[...recentActivity, ...previousActivity].map((activity, index) => (
                    <div key={index} className="flex items-center py-2 border-b border-slate-800">
                      <Avatar className="h-8 w-8 mr-3 bg-slate-700">
                        <AvatarFallback>
                          {activity.agent.split(' ').map(name => name[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{activity.agent}</div>
                        <div className="text-slate-400">
                          <span className={activity.action === "Sold" ? "text-green-400" : "text-blue-400"}>
                            {activity.action}
                          </span>
                          {" "}{activity.property} • {activity.value}
                        </div>
                      </div>
                      <div className="text-slate-400 text-sm">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t border-slate-800">
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
        
        <div className="p-4 grid grid-cols-12 gap-2">
          <div className="col-span-3 bg-slate-900 border border-slate-800 rounded-xl shadow-md overflow-hidden h-[100px]">
            <div className="text-gray-400 px-4 py-3 flex flex-col justify-center h-full">
              <div className="text-slate-400 text-xs">Total Revenue</div>
              <div className="text-2xl font-bold animate-fade-in">$498,250</div>
              <div className="text-green-400 text-xs flex items-center">
                <TrendingUp size={12} className="mr-1" />
                15% vs last year
              </div>
            </div>
          </div>
          
          <div className="col-span-3 bg-slate-900 border border-slate-800 rounded-xl shadow-md overflow-hidden h-[100px]">
            <div className="text-gray-400 px-4 py-3 flex flex-col justify-center h-full">
              <div className="text-slate-400 text-xs">Avg. Transaction</div>
              <div className="text-2xl font-bold animate-fade-in">$849,600</div>
              <div className="text-green-400 text-xs flex items-center">
                <TrendingUp size={12} className="mr-1" />
                8% vs last year
              </div>
            </div>
          </div>
          
          <div className="col-span-2 bg-slate-900 border border-slate-800 rounded-xl shadow-md overflow-hidden h-[100px]">
            <div className="text-gray-400 px-4 py-3 flex flex-col justify-center h-full">
              <div className="text-slate-400 text-xs">Total Properties</div>
              <div className="text-2xl font-bold animate-fade-in">114</div>
              <div className="flex text-xs gap-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                  <span className="text-blue-400">37 Sold</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mr-1"></div>
                  <span className="text-purple-400">77 Rented</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Commission Claims Card */}
          <div className="col-span-4 flex flex-col gap-2">
            <CommissionClaimsCard progress={commissionProgress} />
            
            {/* Sales Transaction Card - Moved directly under Commission Claims */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-md">
              <div className="p-4 pb-0">
                <div className="flex justify-between items-center">
                  <div className="text-base font-semibold">Sales Transaction</div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-slate-400 text-sm">
                  On track to finish early
                </p>
              </div>
              <div className="p-4 pt-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-xl font-bold animate-fade-in">
                    {salesProgress}%
                  </div>
                  <div className="text-xs bg-blue-500/10 px-2 py-0.5 rounded-full text-blue-400 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    30%
                  </div>
                </div>
                
                {renderSegments(salesProgress, 100)}
              </div>
            </div>
            
            {/* Upcoming Appointments Card - Moved below Sales Transaction */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-md">
              <div className="p-4 pb-0">
                <div className="text-lg font-semibold">Upcoming Appointments</div>
              </div>
              <div className="p-4 pt-2 text-sm">
                <div className="flex items-center border-l-2 border-blue-500 pl-3 mb-3">
                  <Calendar size={14} className="text-blue-400 mr-2" />
                  <div>
                    <div className="font-medium">Property Viewing</div>
                    <div className="text-slate-400 text-xs">Today, 2:30 PM</div>
                  </div>
                </div>
                
                <div className="flex items-center border-l-2 border-green-500 pl-3">
                  <Users size={14} className="text-green-400 mr-2" />
                  <div>
                    <div className="font-medium">Client Meeting</div>
                    <div className="text-slate-400 text-xs">Tomorrow, 10:00 AM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-span-8 bg-slate-900 border border-slate-800 rounded-xl shadow-md">
            <div className="p-4 pb-0">
              <div className="flex justify-between items-center">
                <div className="text-lg font-semibold">Yearly Sales Transactions</div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-sm text-slate-400">
                Monthly performance for 2023
              </div>
            </div>
            <div className="p-4 pt-3">
              <LineChartPulse data={yearlySalesData} height="h-56" />
              <div className="flex justify-between text-sm pt-2">
                <div className="flex items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 mr-2"></div>
                  <span>Total: {yearlySalesData.reduce((sum, item) => sum + item.value, 0)} Properties</span>
                </div>
                <div className="text-green-400 font-medium">
                  +23% from previous year
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-span-8 bg-slate-900 border border-slate-800 rounded-xl shadow-md">
            <div className="p-4 pb-2">
              <div className="flex justify-between items-center">
                <div className="text-base font-semibold">Recent Activity</div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-4 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center p-2 hover:bg-slate-800/50 rounded-lg transition-colors">
                    <Avatar className="h-8 w-8 mr-2.5 bg-slate-700">
                      <AvatarFallback className="text-[10px]">
                        {activity.agent.split(' ').map(name => name[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-sm">
                      <div className="font-medium">{activity.agent}</div>
                      <div className="text-slate-400 mt-0.5">
                        <span className={activity.action === "Sold" ? "text-green-400" : "text-blue-400"}>
                          {activity.action}
                        </span>
                        {" "}{activity.property} • {activity.value}
                      </div>
                    </div>
                    <div className="text-slate-400 text-xs">{activity.time}</div>
                  </div>
                ))}
              </div>
              <div className="pt-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-sm border-slate-700 hover:bg-slate-700/50" 
                  onClick={() => setShowMoreActivity(true)}
                >
                  View all activity
                  <ChevronDown size={14} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
