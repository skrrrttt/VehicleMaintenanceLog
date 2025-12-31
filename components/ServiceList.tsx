'use client';

import { ServiceRecord } from '@/types';
import { Calendar, Gauge, DollarSign, FileText, Trash2 } from 'lucide-react';

interface ServiceListProps {
  services: ServiceRecord[];
  onDelete?: (id: string) => void;
}

export default function ServiceList({ services, onDelete }: ServiceListProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getServiceTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Oil Change': 'bg-amber-600',
      'Tire Rotation': 'bg-purple-600',
      'Brake Service': 'bg-red-600',
      'Air Filter': 'bg-green-600',
      'Transmission Service': 'bg-blue-600',
      'Coolant Flush': 'bg-cyan-600',
      'Battery Replacement': 'bg-yellow-600',
      'Spark Plugs': 'bg-orange-600',
      Other: 'bg-gray-600',
    };
    return colors[type] || 'bg-gray-600';
  };

  if (services.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
        <FileText className="w-12 h-12 text-gray-600 mx-auto mb-3" />
        <p className="text-gray-400">No service records yet</p>
        <p className="text-sm text-gray-500 mt-1">
          Add your first service to start tracking maintenance
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {services.map((service) => (
        <div
          key={service.id}
          className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`px-3 py-1 rounded-full ${getServiceTypeColor(service.serviceType)}`}>
                <span className="text-sm font-semibold text-white">
                  {service.serviceType}
                </span>
              </div>
            </div>
            {onDelete && (
              <button
                onClick={() => onDelete(service.id)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-red-400"
                aria-label="Delete service record"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">{formatDate(service.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">
                {service.odometerReading.toLocaleString()} mi
              </span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">${service.cost.toFixed(2)}</span>
            </div>
          </div>

          {service.notes && (
            <div className="mt-3 pt-3 border-t border-gray-700">
              <p className="text-sm text-gray-400 flex items-start gap-2">
                <FileText className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{service.notes}</span>
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
