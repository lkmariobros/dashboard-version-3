
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
  ChevronRight,
  X,
  LineChart,
  Plus,
  BarChart3,
  Settings,
  LogOut,
  ArrowRight,
  ArrowLeft
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
  const [currentMonth, setCurrentMonth] = useState("August, 2023");
  
  // Sample data
  const salesTarget = 66;
  const commissionTarget = 78;
  
  // Properties data
  const propertyListings = [
    { 
      title: "Luxury Penthouse", 
      type: "For Sale",
      lessons: "12 Viewings", 
      rate: 4.8, 
      category: "High-End",
      icon: "🏙️"
    },
    { 
      title: "Modern Apartment", 
      type: "For Rent",
      lessons: "15 Viewings", 
      rate: 5.0, 
      category: "Urban Living",
      icon: "🏢"
    },
    { 
      title: "Suburban Home", 
      type: "For Sale",
      lessons: "8 Viewings", 
      rate: 4.6, 
      category: "Family Home",
      icon: "🏡"
    },
  ];
  
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
  ];
  
  // Schedule data
  const scheduleItems = [
    { 
      title: "Open House", 
      type: "Appointment", 
      category: "Showing",
      icon: "🏠" 
    },
    { 
      title: "Client Meeting", 
      type: "Group",
      category: "Discussion", 
      icon: "👥" 
    },
    { 
      title: "Contract Review", 
      type: "Group",
      category: "Legal", 
      icon: "📝" 
    },
    { 
      title: "Property Inspection", 
      type: "Appointment",
      category: "Assessment", 
      icon: "🔍" 
    },
  ];
  
  // Assignment data
  const assignmentItems = [
    {
      title: "Lead Follow-up",
      date: "02 Aug, 10:30 AM",
      status: "In progress",
      icon: "📞"
    },
    {
      title: "Market Analysis",
      date: "14 Aug, 12:45 PM",
      status: "Completed",
      icon: "📊"
    },
    {
      title: "Property Listing",
      date: "22 Aug, 11:00 AM",
      status: "Upcoming",
      icon: "📸"
    }
  ];
  
  // Activity data
  const activityData = [
    { day: "Su", value: 2 },
    { day: "Mo", value: 4 },
    { day: "Tu", value: 6 },
    { day: "We", value: 3 },
    { day: "Th", value: 5 },
    { day: "Fr", value: 2 },
    { day: "Sa", value: 1 },
  ];
  
  // Percentage increase
  const percentageIncrease = "+3%";
  
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
  
  // Calendar days
  const calendarDays = [
    { date: 30, current: false }, { date: 31, current: false },
    { date: 1, current: true }, { date: 2, current: true }, { date: 3, current: true }, { date: 4, current: true },
    { date: 5, current: true }, { date: 6, current: true }, { date: 7, current: true }, { date: 8, current: true },
    { date: 9, current: true }, { date: 10, current: true }, { date: 11, current: true },
    { date: 12, current: true }, { date: 13, current: true }, { date: 14, current: true }, { date: 15, current: true },
    { date: 16, current: true }, { date: 17, current: true, isToday: true }, { date: 18, current: true },
    { date: 19, current: true }, { date: 20, current: true }, { date: 21, current: true }, { date: 22, current: true },
    { date: 23, current: true }, { date: 24, current: true }, { date: 25, current: true },
    { date: 26, current: true }, { date: 27, current: true }, { date: 28, current: true }, { date: 29, current: true },
    { date: 30, current: true }, { date: 31, current: true }, { date: 1, current: false }, { date: 2, current: false }
  ];
  
  // Calendar header
  const calendarHeader = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div className="bg-[#F8F7FF] text-slate-800 min-h-screen flex overflow-hidden">
      {/* Sidebar */}
      <div className={`bg-slate-900 border-r border-slate-800 transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-60'
      } flex flex-col h-screen fixed left-0 top-0 z-30`}>
        {/* Sidebar Header */}
        <div className="h-16 border-b border-slate-800 flex items-center justify-between px-4">
          {!sidebarCollapsed && <h1 className="font-bold text-lg text-white">Agent Portal</h1>}
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
                <div className="font-medium text-white">John Doe</div>
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
        <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-20 flex items-center justify-between px-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">Welcome back, John 👋</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex items-center px-3 py-2 bg-slate-100 rounded-full">
                <Search className="h-4 w-4 text-slate-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search properties" 
                  className="bg-transparent text-sm outline-none w-40" 
                />
              </div>
            </div>
            <Avatar className="h-10 w-10 ring-2 ring-purple-500/20">
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white">JD</AvatarFallback>
            </Avatar>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <div className="p-6">
          {/* New Properties Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">New Properties</h2>
              <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                View All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {propertyListings.map((property, idx) => (
                <Card key={idx} className="bg-white border-none shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-5">
                    <div className="flex items-start">
                      <div className="bg-purple-100 rounded-xl p-3 text-2xl mr-3">
                        {property.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-base">{property.title}</h3>
                        <p className="text-slate-500 text-sm">{property.lessons}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div>
                        <p className="text-xs text-slate-500">Rate</p>
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span className="font-semibold">{property.rate}</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs text-slate-500">Type</p>
                        <p className="font-semibold text-sm">{property.category}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Middle Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            {/* Hours Activity Card */}
            <Card className="bg-white border-none shadow-sm lg:col-span-5">
              <CardHeader className="p-4 pb-0">
                <div className="flex justify-between">
                  <CardTitle className="text-lg font-bold">Hours Activity</CardTitle>
                  <div className="flex items-center">
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      Weekly
                      <ChevronDown size={14} className="ml-1" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center text-sm mt-1">
                  <span className="text-green-500 font-medium">{percentageIncrease}</span>
                  <span className="text-slate-500 ml-1">Increase than last week</span>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                {/* Activity Chart */}
                <div className="h-48 mt-4 relative">
                  <div className="absolute top-0 left-0 h-full px-2">
                    <div className="h-full flex flex-col justify-between text-xs text-slate-500">
                      <span>8h</span>
                      <span>6h</span>
                      <span>4h</span>
                      <span>2h</span>
                      <span>1h</span>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-8 right-0 h-40">
                    <div className="flex justify-between h-full items-end">
                      {activityData.map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center w-full">
                          <div 
                            className={`w-6 rounded-t-sm ${
                              idx === 3 ? 'bg-green-400' : 'bg-slate-300'
                            }`} 
                            style={{ height: `${item.value * 15}%` }} 
                          >
                            {idx === 3 && (
                              <div className="relative">
                                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white py-1 px-2 rounded text-xs whitespace-nowrap">
                                  <div className="font-medium">5h 45 min</div>
                                  <div className="text-xs">15 Jan 2023</div>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="mt-2 text-xs text-slate-500">{item.day}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Daily Schedule Card */}
            <Card className="bg-white border-none shadow-sm lg:col-span-7">
              <CardHeader className="p-4 pb-0">
                <CardTitle className="text-lg font-bold">Daily Schedule</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {scheduleItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg ${
                          idx % 2 === 0 ? 'bg-purple-100' : 'bg-amber-100'
                        }`}>
                          {item.icon}
                        </div>
                        <div className="ml-3">
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-slate-500">{item.type} • {item.category}</div>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-slate-400" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Calendar Card */}
            <Card className="bg-white border-none shadow-sm lg:col-span-5">
              <CardHeader className="p-4 pb-0">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400">
                      <ArrowLeft size={16} />
                    </Button>
                    <span className="font-semibold">{currentMonth}</span>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400">
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-7 gap-1 text-center">
                  {calendarHeader.map((day, idx) => (
                    <div key={idx} className="text-xs font-medium text-slate-500 py-2">
                      {day}
                    </div>
                  ))}
                  
                  {calendarDays.map((day, idx) => (
                    <div 
                      key={idx} 
                      className={`text-xs p-2 rounded-full flex items-center justify-center ${
                        day.isToday 
                          ? 'bg-green-500 text-white' 
                          : day.current 
                            ? 'text-slate-800 hover:bg-slate-100 cursor-pointer' 
                            : 'text-slate-400'
                      }`}
                    >
                      {day.date}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Assignments Card */}
            <Card className="bg-white border-none shadow-sm lg:col-span-7">
              <CardHeader className="p-4 pb-0">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-bold">Assignments</CardTitle>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-green-500 bg-green-50 rounded-full">
                    <Plus size={16} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {assignmentItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl bg-white shadow-sm">
                          {item.icon}
                        </div>
                        <div className="ml-3">
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-slate-500">{item.date}</div>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === 'In progress' 
                          ? 'bg-blue-100 text-blue-600' 
                          : item.status === 'Completed' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-amber-100 text-amber-600'
                      }`}>
                        {item.status}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Activity Modal */}
      {showMoreActivity && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
            <div className="flex justify-between items-center p-4 border-b border-slate-200">
              <h3 className="text-lg font-medium">All Recent Activity</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowMoreActivity(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-4 max-h-[70vh] overflow-y-auto">
              <div className="space-y-3">
                {[...recentActivity, ...previousActivity].map((activity, index) => (
                  <div key={index} className="flex items-center py-2 border-b border-slate-200">
                    <Avatar className="h-8 w-8 mr-3 bg-slate-200">
                      <AvatarFallback>
                        {activity.agent.split(' ').map(name => name[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">{activity.agent}</div>
                      <div className="text-slate-500">
                        <span className={activity.action === "Sold" ? "text-green-600" : "text-blue-600"}>
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
            <div className="p-4 border-t border-slate-200">
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
    </div>
  );
};

export default AgentDashboard;
