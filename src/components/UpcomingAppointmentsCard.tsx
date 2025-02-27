
import React from 'react';
import { Calendar, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UpcomingAppointmentsCard = () => {
  return (
    <Card className="upcoming-appointments-card">
      <CardHeader className="upcoming-appointments-header">
        <CardTitle className="upcoming-appointments-title">Upcoming Appointments</CardTitle>
      </CardHeader>
      <CardContent className="upcoming-appointments-content">
        <div className="appointment-item calendar">
          <div className="flex items-center">
            <span className="appointment-icon calendar">
              <Calendar size={14} />
            </span>
            <div>
              <div className="appointment-item-title">Property Viewing</div>
              <div className="appointment-item-time">Today, 2:30 PM</div>
            </div>
          </div>
        </div>
        
        <div className="appointment-item users">
          <div className="flex items-center">
            <span className="appointment-icon users">
              <Users size={14} />
            </span>
            <div>
              <div className="appointment-item-title">Client Meeting</div>
              <div className="appointment-item-time">Tomorrow, 10:00 AM</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingAppointmentsCard;
