'use client';

import { Vehicle } from '@/types';
import { Calendar, Gauge, Wrench, TrendingUp } from 'lucide-react';

interface DashboardProps {
  vehicle: Vehicle;
}

export default function Dashboard({ vehicle }: DashboardProps) {
  const getLastService = (serviceType: string) => {
    const services = vehicle.serviceRecords
      .filter((r) => r.serviceType === serviceType)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return services[0] || null;
  };

  const calculateMilesSince = (odometerReading: number) => {
    return vehicle.currentMileage - odometerReading;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const oilChange = getLastService('Oil Change');
  const tireRotation = getLastService('Tire Rotation');

  const ServiceCard = ({
    title,
    icon: Icon,
    lastDate,
    milesSince,
    iconColor,
  }: {
    title: string;
    icon: any;
    lastDate: string | null;
    milesSince: number | null;
    iconColor: string;
  }) => (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg ${iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="font-semibold text-gray-100">{title}</h3>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-gray-300">
            {lastDate ? formatDate(lastDate) : 'No service recorded'}
          </span>
        </div>
        {milesSince !== null && (
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-gray-400" />
            <span className="text-gray-300">
              {milesSince.toLocaleString()} miles since
            </span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h2>
        <div className="flex items-center gap-2 text-blue-100">
          <Gauge className="w-5 h-5" />
          <span className="text-lg font-semibold">
            {vehicle.currentMileage.toLocaleString()} miles
          </span>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
          <Wrench className="w-5 h-5" />
          At a Glance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ServiceCard
            title="Oil Change"
            icon={Wrench}
            lastDate={oilChange?.date || null}
            milesSince={
              oilChange ? calculateMilesSince(oilChange.odometerReading) : null
            }
            iconColor="bg-amber-600"
          />
          <ServiceCard
            title="Tire Rotation"
            icon={Gauge}
            lastDate={tireRotation?.date || null}
            milesSince={
              tireRotation
                ? calculateMilesSince(tireRotation.odometerReading)
                : null
            }
            iconColor="bg-purple-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <p className="text-sm text-gray-400 mb-1">Total Services</p>
          <p className="text-2xl font-bold text-gray-100">
            {vehicle.serviceRecords.length}
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <p className="text-sm text-gray-400 mb-1">Parts Tracked</p>
          <p className="text-2xl font-bold text-gray-100">{vehicle.parts.length}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <p className="text-sm text-gray-400 mb-1">Total Spent</p>
          <p className="text-2xl font-bold text-gray-100">
            ${vehicle.serviceRecords.reduce((sum, r) => sum + r.cost, 0).toFixed(0)}
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <p className="text-sm text-gray-400 mb-1">VIN</p>
          <p className="text-sm font-mono text-gray-100 truncate" title={vehicle.vin}>
            {vehicle.vin || 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
}
