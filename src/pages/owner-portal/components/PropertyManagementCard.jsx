import React, { useState } from 'react';
import Icon from '../../../components/Appicon';
import {Button} from '../../../components/ui/Button';
import Image from '../../../components/Appimage';

const PropertyManagementCard = ({ property }) => {
  const [activeTab, setActiveTab] = useState('details');

  const tabs = [
    { id: 'details', label: 'Property Details', icon: 'Building2' },
    { id: 'rooms', label: 'Room Management', icon: 'Bed' },
    { id: 'amenities', label: 'Amenities', icon: 'Wifi' },
    { id: 'photos', label: 'Photos', icon: 'Camera' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Property Name</label>
                <input 
                  type="text" 
                  value={property?.name}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Property Type</label>
                <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                  <option>Hotel</option>
                  <option>Resort</option>
                  <option>Boutique Hotel</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <textarea 
                rows={4}
                value={property?.description}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                readOnly
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Check-in Time</label>
                <input 
                  type="time" 
                  value="15:00"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Check-out Time</label>
                <input 
                  type="time" 
                  value="11:00"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Star Rating</label>
                <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                  <option>5 Star</option>
                  <option>4 Star</option>
                  <option>3 Star</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'rooms':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">Room Types</h4>
              <Button variant="outline" size="sm" iconName="Plus">
                Add Room Type
              </Button>
            </div>
            <div className="space-y-3">
              {property?.roomTypes?.map((room) => (
                <div key={room?.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Bed" size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{room?.name}</div>
                      <div className="text-sm text-muted-foreground">{room?.count} rooms available</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="font-medium text-foreground">${room?.basePrice}/night</div>
                      <div className="text-sm text-muted-foreground">Base rate</div>
                    </div>
                    <Button variant="ghost" size="sm" iconName="Edit">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'amenities':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {property?.amenities?.map((amenity) => (
                <div key={amenity?.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                  <input 
                    type="checkbox" 
                    checked={amenity?.enabled}
                    className="rounded border-border"
                    readOnly
                  />
                  <Icon name={amenity?.icon} size={18} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{amenity?.name}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'photos':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">Property Photos</h4>
              <Button variant="outline" size="sm" iconName="Upload">
                Upload Photos
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {property?.photos?.map((photo, index) => (
                <div key={index} className="relative group">
                  <Image 
                    src={photo?.url}
                    alt={photo?.alt}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-brand rounded-lg flex items-center justify-center">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" iconName="Eye" className="text-white hover:bg-white/20" />
                      <Button variant="ghost" size="sm" iconName="Trash2" className="text-white hover:bg-white/20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Property Management</h3>
          <Button variant="outline" size="sm" iconName="Save">
            Save Changes
          </Button>
        </div>
      </div>
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-6">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 py-4 border-b-2 text-sm font-medium transition-brand ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default PropertyManagementCard;