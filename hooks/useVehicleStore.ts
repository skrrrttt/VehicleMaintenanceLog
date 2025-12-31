'use client';

import { useState, useEffect, useCallback } from 'react';
import { Vehicle, VehicleStore, ServiceRecord, Part } from '@/types';

const STORAGE_KEY = 'vehicle-maintenance-tracker';

const initialStore: VehicleStore = {
  vehicles: [],
  activeVehicleId: null,
};

export function useVehicleStore() {
  const [store, setStore] = useState<VehicleStore>(initialStore);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setStore(parsed);
        } catch (error) {
          console.error('Failed to parse stored data:', error);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever store changes
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    }
  }, [store, isLoaded]);

  // Vehicle CRUD operations
  const addVehicle = useCallback((vehicle: Omit<Vehicle, 'id' | 'serviceRecords' | 'parts'>) => {
    const newVehicle: Vehicle = {
      ...vehicle,
      id: crypto.randomUUID(),
      serviceRecords: [],
      parts: [],
    };

    setStore((prev) => ({
      vehicles: [...prev.vehicles, newVehicle],
      activeVehicleId: prev.activeVehicleId || newVehicle.id,
    }));

    return newVehicle.id;
  }, []);

  const updateVehicle = useCallback((id: string, updates: Partial<Vehicle>) => {
    setStore((prev) => ({
      ...prev,
      vehicles: prev.vehicles.map((v) =>
        v.id === id ? { ...v, ...updates } : v
      ),
    }));
  }, []);

  const deleteVehicle = useCallback((id: string) => {
    setStore((prev) => {
      const newVehicles = prev.vehicles.filter((v) => v.id !== id);
      const newActiveId =
        prev.activeVehicleId === id
          ? newVehicles[0]?.id || null
          : prev.activeVehicleId;

      return {
        vehicles: newVehicles,
        activeVehicleId: newActiveId,
      };
    });
  }, []);

  const setActiveVehicle = useCallback((id: string | null) => {
    setStore((prev) => ({
      ...prev,
      activeVehicleId: id,
    }));
  }, []);

  // Service Record operations
  const addServiceRecord = useCallback((vehicleId: string, record: Omit<ServiceRecord, 'id'>) => {
    const newRecord: ServiceRecord = {
      ...record,
      id: crypto.randomUUID(),
    };

    setStore((prev) => ({
      ...prev,
      vehicles: prev.vehicles.map((v) =>
        v.id === vehicleId
          ? {
              ...v,
              serviceRecords: [...v.serviceRecords, newRecord].sort(
                (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
              ),
              currentMileage: Math.max(v.currentMileage, record.odometerReading),
            }
          : v
      ),
    }));

    return newRecord.id;
  }, []);

  const updateServiceRecord = useCallback(
    (vehicleId: string, recordId: string, updates: Partial<ServiceRecord>) => {
      setStore((prev) => ({
        ...prev,
        vehicles: prev.vehicles.map((v) =>
          v.id === vehicleId
            ? {
                ...v,
                serviceRecords: v.serviceRecords
                  .map((r) => (r.id === recordId ? { ...r, ...updates } : r))
                  .sort(
                    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
                  ),
              }
            : v
        ),
      }));
    },
    []
  );

  const deleteServiceRecord = useCallback((vehicleId: string, recordId: string) => {
    setStore((prev) => ({
      ...prev,
      vehicles: prev.vehicles.map((v) =>
        v.id === vehicleId
          ? {
              ...v,
              serviceRecords: v.serviceRecords.filter((r) => r.id !== recordId),
            }
          : v
      ),
    }));
  }, []);

  // Part operations
  const addPart = useCallback((vehicleId: string, part: Omit<Part, 'id'>) => {
    const newPart: Part = {
      ...part,
      id: crypto.randomUUID(),
    };

    setStore((prev) => ({
      ...prev,
      vehicles: prev.vehicles.map((v) =>
        v.id === vehicleId
          ? {
              ...v,
              parts: [...v.parts, newPart],
            }
          : v
      ),
    }));

    return newPart.id;
  }, []);

  const updatePart = useCallback(
    (vehicleId: string, partId: string, updates: Partial<Part>) => {
      setStore((prev) => ({
        ...prev,
        vehicles: prev.vehicles.map((v) =>
          v.id === vehicleId
            ? {
                ...v,
                parts: v.parts.map((p) => (p.id === partId ? { ...p, ...updates } : p)),
              }
            : v
        ),
      }));
    },
    []
  );

  const deletePart = useCallback((vehicleId: string, partId: string) => {
    setStore((prev) => ({
      ...prev,
      vehicles: prev.vehicles.map((v) =>
        v.id === vehicleId
          ? {
              ...v,
              parts: v.parts.filter((p) => p.id !== partId),
            }
          : v
      ),
    }));
  }, []);

  // Getter functions
  const getActiveVehicle = useCallback(() => {
    return store.vehicles.find((v) => v.id === store.activeVehicleId) || null;
  }, [store.vehicles, store.activeVehicleId]);

  return {
    // State
    vehicles: store.vehicles,
    activeVehicleId: store.activeVehicleId,
    activeVehicle: getActiveVehicle(),
    isLoaded,

    // Vehicle operations
    addVehicle,
    updateVehicle,
    deleteVehicle,
    setActiveVehicle,

    // Service record operations
    addServiceRecord,
    updateServiceRecord,
    deleteServiceRecord,

    // Part operations
    addPart,
    updatePart,
    deletePart,
  };
}
