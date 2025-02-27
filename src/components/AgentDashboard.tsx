
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
  
  // Sidebar navigation items
  const navItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: BarChart3, label: "Analytics" },
    { icon: Users, label: "Clients" },
    { icon: Calendar, label: "Calendar" },
    { icon: Settings, label: "Settings" },
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
      {/* Sidebar */}
      <div className={`bg-slate-900 border-r border-slate-800 transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-60'
      } flex flex-col h-screen fixed left-0 top-0 z-30`}>
        {/* Sidebar Header */}
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
        
        {/* Sidebar Navigation */}
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
        
        {/* Sidebar Footer */}
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
      
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-60'
      }`}>
        {/* Top Header */}
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
        
        {/* Activity Modal */}
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
        
        {/* Dashboard Content */}
        <div className="p-5 grid grid-cols-12 gap-3.5 md:gap-4 lg:gap-5">
          {/* First row with varied sizes */}
          <Card className="bg-slate-900 border-slate-800 shadow-md overflow-hidden col-span-12 lg:col-span-5 h-28">
            <CardContent className="p-4">
              <div className="flex gap-3 items-center">
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <DollarSign size={28} className="text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="text-slate-400 text-sm mb-1">Total Revenue</div>
                  <div className="text-3xl font-bold animate-fade-in">$498,250</div>
                  <div className="text-green-400 text-sm flex items-center mt-1">
                    <TrendingUp size={14} className="mr-1" />
                    15% vs last year
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
            
          <Card className="bg-slate-900 border-slate-800 shadow-md overflow-hidden col-span-6 lg:col-span-3 h-32">
            <CardContent className="p-3">
              <div className="text-slate-400 text-xs">Avg. Transaction</div>
              <div className="text-2xl font-bold animate-fade-in mt-2">$849,600</div>
              <div className="text-green-400 text-xs flex items-center mt-1.5">
                <TrendingUp size={12} className="mr-1" />
                8% vs last year
              </div>
            </CardContent>
          </Card>
            
          <Card className="bg-slate-900 border-slate-800 shadow-md overflow-hidden col-span-6 lg:col-span-2 h-32">
            <CardContent className="p-3">
              <div className="text-slate-400 text-xs">Team Ranking</div>
              <div className="text-4xl font-bold animate-fade-in mt-1.5 mb-1">#2</div>
              <div className="text-yellow-400 text-xs flex items-center">
                <Award size={12} className="mr-1" />
                Top 10% nationwide
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900 border-slate-800 shadow-md overflow-hidden col-span-12 lg:col-span-2 h-32">
            <CardContent className="p-3 flex flex-col justify-between h-full">
              <div className="text-slate-400 text-xs">Total Properties</div>
              <div className="text-3xl font-bold animate-fade-in mt-auto mb-auto">114</div>
              <div className="flex justify-between text-xs mt-1.5 gap-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                  <span className="text-blue-400">37 Sold</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mr-1"></div>
                  <span className="text-purple-400">77 Rented</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Commission Claims Card - Vertically oriented */}
          <Card className="bg-slate-900 border-slate-800 shadow-md col-span-12 md:col-span-4 lg:col-span-3 h-64">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg font-semibold">Commission Claims</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 h-full flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="text-4xl font-bold animate-fade-in">
                    {commissionProgress}%
                  </div>
                  <div className="text-green-400 text-xs flex items-center bg-green-500/10 px-1.5 py-0.5 rounded-full">
                    <TrendingUp size={10} className="mr-0.5" />
                    12%
                  </div>
                </div>
                
                {renderSegments(commissionProgress, 100)}
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-auto">
                <div className="bg-slate-800/50 p-2.5 rounded-lg">
                  <div className="flex items-center text-blue-400 mb-1 text-xs">
                    <DollarSign size={12} className="mr-1.5" />
                    <span>Claimed</span>
                  </div>
                  <div className="text-lg font-semibold">$89K</div>
                </div>
                <div className="bg-slate-800/50 p-2.5 rounded-lg">
                  <div className="flex items-center text-green-400 mb-1 text-xs">
                    <DollarSign size={12} className="mr-1.5" />
                    <span>Target</span>
                  </div>
                  <div className="text-lg font-semibold">$120K</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Yearly Sales Chart Card */}
          <Card className="bg-slate-900 border-slate-800 shadow-md col-span-12 md:col-span-8 lg:col-span-6 h-64">
            <CardHeader className="p-4 pb-0">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold">Yearly Sales Transactions</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-sm text-slate-400">
                Monthly performance for 2023
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <LineChartPulse data={yearlySalesData} height="h-40" />
              <div className="flex justify-between text-sm pt-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 mr-2"></div>
                  <span>Total: {yearlySalesData.reduce((sum, item) => sum + item.value, 0)} Properties</span>
                </div>
                <div className="text-green-400 font-medium">
                  +23% from previous year
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Upcoming Appointments - Vertical orientation */}
          <Card className="bg-slate-900 border-slate-800 shadow-md col-span-12 lg:col-span-3 h-64">
            <CardHeader className="p-4 pb-1">
              <CardTitle className="text-lg font-semibold">Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2 space-y-3.5">
              <div className="flex items-start p-2 bg-slate-800/30 rounded-lg border-l-2 border-blue-500">
                <div className="h-9 w-9 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3 mt-0.5">
                  <Calendar size={16} className="text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">Property Viewing</div>
                  <div className="text-slate-400 text-xs">Today, 2:30 PM • Parkview Heights</div>
                </div>
              </div>
              
              <div className="flex items-start p-2 bg-slate-800/30 rounded-lg border-l-2 border-green-500">
                <div className="h-9 w-9 bg-green-500/20 rounded-lg flex items-center justify-center mr-3 mt-0.5">
                  <Users size={16} className="text-green-400" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">Client Meeting</div>
                  <div className="text-slate-400 text-xs">Tomorrow, 10:00 AM • John & Lisa Chen</div>
                </div>
              </div>
              
              <div className="flex items-start p-2 bg-slate-800/30 rounded-lg border-l-2 border-purple-500">
                <div className="h-9 w-9 bg-purple-500/20 rounded-lg flex items-center justify-center mr-3 mt-0.5">
                  <DollarSign size={16} className="text-purple-400" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">Contract Signing</div>
                  <div className="text-slate-400 text-xs">Mar 1, 4:00 PM • Garden Terrace</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Sales Transaction Progress - Wide format */}
          <Card className="bg-slate-900 border-slate-800 shadow-md col-span-12 lg:col-span-9 h-auto">
            <CardHeader className="p-4 pb-2 flex justify-between items-start">
              <div>
                <CardTitle className="text-lg font-semibold">Sales Transactions</CardTitle>
                <p className="text-slate-400 text-sm mt-0.5">
                  On track to finish early
                </p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 mt-2">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex flex-col md:flex-row md:items-center gap-5">
                <div className="md:w-1/3">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl font-bold animate-fade-in">
                      {salesProgress}%
                    </div>
                    <div className="text-xs bg-blue-500/10 px-2 py-0.5 rounded-full text-blue-400 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      30%
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    {renderSegments(salesProgress, 100)}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 md:w-2/3">
                  <div className="bg-slate-800/50 p-3 rounded-lg">
                    <div className="flex items-center text-blue-400 mb-1 text-sm">
                      <Home size={16} className="mr-2" />
                      <span>Sold Properties</span>
                    </div>
                    <div className="text-2xl font-semibold">37</div>
                    <div className="mt-1 text-xs text-slate-400">Total value: $79.6M</div>
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded-lg">
                    <div className="flex items-center text-purple-400 mb-1 text-sm">
                      <Home size={16} className="mr-2" />
                      <span>Rented Properties</span>
                    </div>
                    <div className="text-2xl font-semibold">77</div>
                    <div className="mt-1 text-xs text-slate-400">Monthly income: $418.5K</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Activity Card - Varied heights */}
          <Card className="bg-slate-900 border-slate-800 shadow-md col-span-12 h-auto">
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recentActivity.map((activity, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center p-3 hover:bg-slate-800/50 rounded-lg transition-colors ${
                      index === 0 ? 'bg-slate-800/30' : ''
                    }`}
                    style={{
                      // Varying heights for visual inconsistency
                      height: index % 2 === 0 ? '85px' : '70px'
                    }}
                  >
                    <Avatar className={`mr-3 bg-slate-700 ${
                      index === 0 ? 'h-10 w-10' : 'h-8 w-8'
                    }`}>
                      <AvatarFallback className={`${
                        index === 0 ? 'text-xs' : 'text-[10px]'
                      }`}>
                        {activity.agent.split(' ').map(name => name[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className={`font-medium ${
                        index === 0 ? 'text-base' : 'text-sm'
                      }`}>
                        {activity.agent}
                      </div>
                      <div className="text-slate-400 mt-0.5 text-xs">
                        <span className={activity.action === "Sold" ? "text-green-400" : "text-blue-400"}>
                          {activity.action}
                        </span>
                        {" "}{activity.property} • {activity.value}
                      </div>
                      <div className="text-slate-500 text-xs">{activity.time}</div>
                    </div>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
