'use client';

import { useState } from 'react';
import { useVehicleStore } from '@/hooks/useVehicleStore';
import VehicleManager from '@/components/VehicleManager';
import Dashboard from '@/components/Dashboard';
import ServiceList from '@/components/ServiceList';
import AddServiceModal from '@/components/AddServiceModal';
import DigitalGlovebox from '@/components/DigitalGlovebox';
import { Plus, History, Package } from 'lucide-react';

export default function Home() {
  const {
    vehicles,
    activeVehicleId,
    activeVehicle,
    isLoaded,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    setActiveVehicle,
    addServiceRecord,
    deleteServiceRecord,
    addPart,
    updatePart,
    deletePart,
  } = useVehicleStore();

  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'parts'>(
    'overview'
  );

  // Don't render until data is loaded to avoid hydration mismatch
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-100 mb-4">
            Vehicle Maintenance Tracker
          </h1>
          <VehicleManager
            vehicles={vehicles}
            activeVehicleId={activeVehicleId}
            onAddVehicle={addVehicle}
            onUpdateVehicle={updateVehicle}
            onDeleteVehicle={deleteVehicle}
            onSetActiveVehicle={setActiveVehicle}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {activeVehicle ? (
          <>
            {/* Tab Navigation */}
            <div className="flex gap-2 mb-6 bg-gray-800 p-1 rounded-lg border border-gray-700">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                  activeTab === 'history'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <History className="w-4 h-4" />
                History
              </button>
              <button
                onClick={() => setActiveTab('parts')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                  activeTab === 'parts'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Package className="w-4 h-4" />
                Parts
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <Dashboard vehicle={activeVehicle} />
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-100">
                      Recent Service History
                    </h3>
                    <button
                      onClick={() => setIsServiceModalOpen(true)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2 font-medium"
                    >
                      <Plus className="w-4 h-4" />
                      Add Service
                    </button>
                  </div>
                  <ServiceList
                    services={activeVehicle.serviceRecords.slice(0, 5)}
                    onDelete={(id) => deleteServiceRecord(activeVehicle.id, id)}
                  />
                  {activeVehicle.serviceRecords.length > 5 && (
                    <button
                      onClick={() => setActiveTab('history')}
                      className="mt-4 w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors font-medium"
                    >
                      View All {activeVehicle.serviceRecords.length} Records
                    </button>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-100">
                    Service History
                  </h2>
                  <button
                    onClick={() => setIsServiceModalOpen(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2 font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Add Service
                  </button>
                </div>
                <ServiceList
                  services={activeVehicle.serviceRecords}
                  onDelete={(id) => deleteServiceRecord(activeVehicle.id, id)}
                />
              </div>
            )}

            {activeTab === 'parts' && (
              <DigitalGlovebox
                parts={activeVehicle.parts}
                onAddPart={(part) => addPart(activeVehicle.id, part)}
                onUpdatePart={(id, updates) =>
                  updatePart(activeVehicle.id, id, updates)
                }
                onDeletePart={(id) => deletePart(activeVehicle.id, id)}
              />
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="bg-gray-800 rounded-lg p-12 border border-gray-700">
              <h2 className="text-2xl font-bold text-gray-100 mb-4">
                Welcome to Vehicle Maintenance Tracker
              </h2>
              <p className="text-gray-400 mb-6">
                Get started by adding your first vehicle
              </p>
              <p className="text-sm text-gray-500">
                Click the button above to add a vehicle and start tracking
                maintenance
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Add Service Modal */}
      {activeVehicle && (
        <AddServiceModal
          isOpen={isServiceModalOpen}
          onClose={() => setIsServiceModalOpen(false)}
          onSubmit={(service) => {
            addServiceRecord(activeVehicle.id, service);
            setIsServiceModalOpen(false);
          }}
          currentMileage={activeVehicle.currentMileage}
        />
      )}
    </main>
  );
}
