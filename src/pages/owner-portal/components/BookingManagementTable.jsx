import React, { useState } from 'react';
import Icon from '../../../components/Appicon';
import {Button} from '../../../components/ui/Button';

const BookingManagementTable = ({ bookings }) => {
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredBookings = bookings?.filter(booking => 
    filterStatus === 'all' || booking?.status?.toLowerCase() === filterStatus
  );

  const handleSelectBooking = (bookingId) => {
    setSelectedBookings(prev => 
      prev?.includes(bookingId) 
        ? prev?.filter(id => id !== bookingId)
        : [...prev, bookingId]
    );
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return 'bg-success/10 text-success';
      case 'pending': return 'bg-warning/10 text-warning';
      case 'cancelled': return 'bg-destructive/10 text-destructive';
      case 'checked-in': return 'bg-primary/10 text-primary';
      case 'checked-out': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Bookings</h3>
          <div className="flex items-center space-x-3">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e?.target?.value)}
              className="text-sm border border-border rounded-md px-3 py-1 bg-background"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
              <option value="checked-in">Checked In</option>
              <option value="checked-out">Checked Out</option>
            </select>
            <Button variant="outline" size="sm" iconName="Download">
              Export
            </Button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                <input 
                  type="checkbox" 
                  className="rounded border-border"
                  onChange={(e) => {
                    if (e?.target?.checked) {
                      setSelectedBookings(filteredBookings?.map(b => b?.id));
                    } else {
                      setSelectedBookings([]);
                    }
                  }}
                />
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Guest</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Room</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Dates</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Amount</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings?.map((booking) => (
              <tr key={booking?.id} className="border-b border-border hover:bg-muted/20">
                <td className="p-4">
                  <input 
                    type="checkbox" 
                    className="rounded border-border"
                    checked={selectedBookings?.includes(booking?.id)}
                    onChange={() => handleSelectBooking(booking?.id)}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{booking?.guestName}</div>
                      <div className="text-sm text-muted-foreground">{booking?.guestEmail}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-medium text-foreground">{booking?.roomType}</div>
                  <div className="text-sm text-muted-foreground">Room {booking?.roomNumber}</div>
                </td>
                <td className="p-4">
                  <div className="font-medium text-foreground">{booking?.checkIn}</div>
                  <div className="text-sm text-muted-foreground">to {booking?.checkOut}</div>
                </td>
                <td className="p-4">
                  <div className="font-medium text-foreground">${booking?.totalAmount}</div>
                  <div className="text-sm text-muted-foreground">{booking?.nights} nights</div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking?.status)}`}>
                    {booking?.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="Eye">
                      View
                    </Button>
                    <Button variant="ghost" size="sm" iconName="MessageSquare">
                      Message
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedBookings?.length > 0 && (
        <div className="p-4 bg-muted/30 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {selectedBookings?.length} booking(s) selected
            </span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                Send Message
              </Button>
              <Button variant="outline" size="sm">
                Export Selected
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingManagementTable;