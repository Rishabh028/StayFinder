import React, { useState } from 'react';

import {Button} from '../../../components/ui/Button';

const AvailabilityCalendar = ({ roomTypes }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedRoomType, setSelectedRoomType] = useState('all');

  // Generate calendar days for the selected month
  const generateCalendarDays = () => {
    const year = selectedMonth?.getFullYear();
    const month = selectedMonth?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate?.setDate(startDate?.getDate() - firstDay?.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days?.push(new Date(currentDate));
      currentDate?.setDate(currentDate?.getDate() + 1);
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getAvailabilityStatus = (date) => {
    const dayOfMonth = date?.getDate();
    // Mock availability logic
    if (dayOfMonth % 7 === 0) return 'full';
    if (dayOfMonth % 5 === 0) return 'limited';
    return 'available';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-success/20 text-success border-success/30';
      case 'limited': return 'bg-warning/20 text-warning border-warning/30';
      case 'full': return 'bg-destructive/20 text-destructive border-destructive/30';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(selectedMonth);
    newDate?.setMonth(newDate?.getMonth() + direction);
    setSelectedMonth(newDate);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Availability Calendar</h3>
        <div className="flex items-center space-x-3">
          <select 
            value={selectedRoomType}
            onChange={(e) => setSelectedRoomType(e?.target?.value)}
            className="text-sm border border-border rounded-md px-3 py-1 bg-background"
          >
            <option value="all">All Room Types</option>
            {roomTypes?.map(type => (
              <option key={type?.id} value={type?.id}>{type?.name}</option>
            ))}
          </select>
          <Button variant="outline" size="sm" iconName="Settings">
            Manage Rates
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            iconName="ChevronLeft"
            onClick={() => navigateMonth(-1)}
          />
          <h4 className="text-xl font-semibold text-foreground">
            {monthNames?.[selectedMonth?.getMonth()]} {selectedMonth?.getFullYear()}
          </h4>
          <Button 
            variant="ghost" 
            size="sm" 
            iconName="ChevronRight"
            onClick={() => navigateMonth(1)}
          />
        </div>
        
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success/20 border border-success/30 rounded"></div>
            <span className="text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning/20 border border-warning/30 rounded"></div>
            <span className="text-muted-foreground">Limited</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-destructive/20 border border-destructive/30 rounded"></div>
            <span className="text-muted-foreground">Full</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']?.map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {calendarDays?.map((date, index) => {
          const isCurrentMonth = date?.getMonth() === selectedMonth?.getMonth();
          const isToday = date?.toDateString() === new Date()?.toDateString();
          const status = getAvailabilityStatus(date);
          
          return (
            <div
              key={index}
              className={`
                p-2 text-center text-sm border rounded cursor-pointer transition-brand hover-lift
                ${isCurrentMonth ? 'text-foreground' : 'text-muted-foreground opacity-50'}
                ${isToday ? 'ring-2 ring-primary' : ''}
                ${getStatusColor(status)}
              `}
            >
              <div className="font-medium">{date?.getDate()}</div>
              {isCurrentMonth && (
                <div className="text-xs mt-1">
                  ${Math.floor(Math.random() * 100) + 150}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Click on dates to manage pricing and availability
          </div>
          <Button variant="outline" size="sm" iconName="Calendar">
            Bulk Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;