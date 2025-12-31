/**
 * Type Definitions for Vehicle Maintenance Tracker
 */

export interface Part {
  id: string;
  name: string;
  partNumber: string;
  notes?: string;
}

export interface ServiceRecord {
  id: string;
  date: string;
  odometerReading: number;
  serviceType: string;
  notes: string;
  cost: number;
}

export interface Vehicle {
  id: string;
  name: string;
  year: number;
  make: string;
  model: string;
  vin: string;
  currentMileage: number;
  serviceRecords: ServiceRecord[];
  parts: Part[];
}

export interface VehicleStore {
  vehicles: Vehicle[];
  activeVehicleId: string | null;
}

export type ServiceType =
  | 'Oil Change'
  | 'Tire Rotation'
  | 'Brake Service'
  | 'Air Filter'
  | 'Transmission Service'
  | 'Coolant Flush'
  | 'Battery Replacement'
  | 'Spark Plugs'
  | 'Other';

export const SERVICE_TYPES: ServiceType[] = [
  'Oil Change',
  'Tire Rotation',
  'Brake Service',
  'Air Filter',
  'Transmission Service',
  'Coolant Flush',
  'Battery Replacement',
  'Spark Plugs',
  'Other',
];
