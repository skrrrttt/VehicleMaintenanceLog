'use client';

import { useState, FormEvent } from 'react';
import { Vehicle } from '@/types';
import { Car, Plus, ChevronDown, Edit, Trash2, X, Check } from 'lucide-react';

interface VehicleManagerProps {
  vehicles: Vehicle[];
  activeVehicleId: string | null;
  onAddVehicle: (vehicle: {
    name: string;
    year: number;
    make: string;
    model: string;
    vin: string;
    currentMileage: number;
  }) => void;
  onUpdateVehicle: (id: string, updates: Partial<Vehicle>) => void;
  onDeleteVehicle: (id: string) => void;
  onSetActiveVehicle: (id: string) => void;
}

export default function VehicleManager({
  vehicles,
  activeVehicleId,
  onAddVehicle,
  onUpdateVehicle,
  onDeleteVehicle,
  onSetActiveVehicle,
}: VehicleManagerProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    year: new Date().getFullYear(),
    make: '',
    model: '',
    vin: '',
    currentMileage: 0,
  });

  const activeVehicle = vehicles.find((v) => v.id === activeVehicleId);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isEditModalOpen && editingVehicle) {
      onUpdateVehicle(editingVehicle.id, formData);
      setIsEditModalOpen(false);
      setEditingVehicle(null);
    } else {
      onAddVehicle(formData);
      setIsAddModalOpen(false);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      year: new Date().getFullYear(),
      make: '',
      model: '',
      vin: '',
      currentMileage: 0,
    });
  };

  const openEditModal = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      name: vehicle.name,
      year: vehicle.year,
      make: vehicle.make,
      model: vehicle.model,
      vin: vehicle.vin,
      currentMileage: vehicle.currentMileage,
    });
    setIsEditModalOpen(true);
    setIsDropdownOpen(false);
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setEditingVehicle(null);
    resetForm();
  };

  const VehicleModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg shadow-xl max-w-md w-full border border-gray-700">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-gray-100">
            {isEditModalOpen ? 'Edit Vehicle' : 'Add Vehicle'}
          </h2>
          <button
            onClick={closeModal}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Vehicle Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="My Car"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Year
              </label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min="1900"
                max={new Date().getFullYear() + 1}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Make
              </label>
              <input
                type="text"
                value={formData.make}
                onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Toyota"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Model
            </label>
            <input
              type="text"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Camry"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              VIN
            </label>
            <input
              type="text"
              value={formData.vin}
              onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              placeholder="1HGBH41JXMN109186"
              maxLength={17}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Current Mileage
            </label>
            <input
              type="number"
              value={formData.currentMileage}
              onChange={(e) =>
                setFormData({ ...formData, currentMileage: Number(e.target.value) })
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min="0"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {isEditModalOpen ? 'Save Changes' : 'Add Vehicle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <>
      <div className="relative">
        {vehicles.length > 0 ? (
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full bg-gray-800 hover:bg-gray-750 border border-gray-700 rounded-lg px-4 py-3 flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-3">
              <Car className="w-5 h-5 text-blue-400" />
              <div className="text-left">
                <p className="font-semibold text-gray-100">
                  {activeVehicle?.name || 'Select Vehicle'}
                </p>
                {activeVehicle && (
                  <p className="text-sm text-gray-400">
                    {activeVehicle.year} {activeVehicle.make} {activeVehicle.model}
                  </p>
                )}
              </div>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
        ) : (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-3 flex items-center justify-center gap-2 transition-colors text-white font-semibold"
          >
            <Plus className="w-5 h-5" />
            Add Your First Vehicle
          </button>
        )}

        {isDropdownOpen && (
          <div className="absolute top-full mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-750 border-b border-gray-700 last:border-b-0"
              >
                <button
                  onClick={() => {
                    onSetActiveVehicle(vehicle.id);
                    setIsDropdownOpen(false);
                  }}
                  className="flex-1 text-left flex items-center gap-3"
                >
                  {activeVehicleId === vehicle.id && (
                    <Check className="w-4 h-4 text-blue-400" />
                  )}
                  <div className={activeVehicleId !== vehicle.id ? 'ml-7' : ''}>
                    <p className="font-medium text-gray-100">{vehicle.name}</p>
                    <p className="text-sm text-gray-400">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </p>
                  </div>
                </button>
                <div className="flex gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal(vehicle);
                    }}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-blue-400"
                    aria-label="Edit vehicle"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (
                        confirm(
                          `Are you sure you want to delete ${vehicle.name}? This will delete all service records and parts.`
                        )
                      ) {
                        onDeleteVehicle(vehicle.id);
                        setIsDropdownOpen(false);
                      }
                    }}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-red-400"
                    aria-label="Delete vehicle"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() => {
                setIsAddModalOpen(true);
                setIsDropdownOpen(false);
              }}
              className="w-full px-4 py-3 flex items-center gap-2 text-blue-400 hover:bg-gray-750 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add New Vehicle
            </button>
          </div>
        )}
      </div>

      {(isAddModalOpen || isEditModalOpen) && <VehicleModal />}
    </>
  );
}
