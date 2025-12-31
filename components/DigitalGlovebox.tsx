'use client';

import { useState, FormEvent } from 'react';
import { Part } from '@/types';
import { Package, Plus, Trash2, Edit, X, Save } from 'lucide-react';

interface DigitalGloveboxProps {
  parts: Part[];
  onAddPart: (part: { name: string; partNumber: string; notes?: string }) => void;
  onUpdatePart: (id: string, updates: Partial<Part>) => void;
  onDeletePart: (id: string) => void;
}

export default function DigitalGlovebox({
  parts,
  onAddPart,
  onUpdatePart,
  onDeletePart,
}: DigitalGloveboxProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPartId, setEditingPartId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    partNumber: '',
    notes: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editingPartId) {
      onUpdatePart(editingPartId, formData);
      setEditingPartId(null);
    } else {
      onAddPart(formData);
      setIsAddModalOpen(false);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      partNumber: '',
      notes: '',
    });
  };

  const startEdit = (part: Part) => {
    setEditingPartId(part.id);
    setFormData({
      name: part.name,
      partNumber: part.partNumber,
      notes: part.notes || '',
    });
  };

  const cancelEdit = () => {
    setEditingPartId(null);
    resetForm();
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
    resetForm();
  };

  const PartModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg shadow-xl max-w-md w-full border border-gray-700">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-gray-100">Add Part</h2>
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
              Part Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Oil Filter"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Part Number
            </label>
            <input
              type="text"
              value={formData.partNumber}
              onChange={(e) =>
                setFormData({ ...formData, partNumber: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              placeholder="Fram PH7317"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={2}
              placeholder="Additional information..."
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
              Add Part
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-100">
              Digital Glovebox
            </h2>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Part
          </button>
        </div>

        <div className="p-6">
          {parts.length === 0 ? (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No parts tracked yet</p>
              <p className="text-sm text-gray-500 mt-1">
                Store part numbers for easy reference
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {parts.map((part) =>
                editingPartId === part.id ? (
                  <form
                    key={part.id}
                    onSubmit={handleSubmit}
                    className="bg-gray-900 border border-blue-500 rounded-lg p-4"
                  >
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <input
                        type="text"
                        value={formData.partNumber}
                        onChange={(e) =>
                          setFormData({ ...formData, partNumber: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <textarea
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData({ ...formData, notes: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        rows={2}
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                        >
                          <Save className="w-4 h-4" />
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors text-sm font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div
                    key={part.id}
                    className="bg-gray-900 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-100 mb-1">
                          {part.name}
                        </h3>
                        <p className="text-sm font-mono text-blue-400 mb-2">
                          {part.partNumber}
                        </p>
                        {part.notes && (
                          <p className="text-sm text-gray-400">{part.notes}</p>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => startEdit(part)}
                          className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-blue-400"
                          aria-label="Edit part"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (
                              confirm(
                                `Are you sure you want to delete ${part.name}?`
                              )
                            ) {
                              onDeletePart(part.id);
                            }
                          }}
                          className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-red-400"
                          aria-label="Delete part"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {isAddModalOpen && <PartModal />}
    </>
  );
}
