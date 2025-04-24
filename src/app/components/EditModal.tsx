'use client';
import React from 'react';
import { EditModalProps } from '../types';

function EditModal({
  currentAdvocate,
  handleInputChange,
  setCurrentAdvocate,
  closeModal,
  handleSave,
}: EditModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-y-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold text-solaceGreen mb-4">
          Edit Advocate
        </h2>

        <div className="space-y-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            First Name
            <input
              type="text"
              name="firstName"
              value={currentAdvocate.firstName}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-solaceGreenLight"
            />
          </label>

          <label className="block text-gray-700 text-sm font-bold mb-2">
            Last Name
            <input
              type="text"
              name="lastName"
              value={currentAdvocate.lastName}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-solaceGreenLight"
            />
          </label>

          <label className="block text-gray-700 text-sm font-bold mb-2">
            City
            <input
              type="text"
              name="city"
              value={currentAdvocate.city}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-solaceGreenLight"
            />
          </label>

          <label className="block text-gray-700 text-sm font-bold mb-2">
            Degree
            <input
              type="text"
              name="degree"
              value={currentAdvocate.degree}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-solaceGreenLight"
            />
          </label>

          <label className="block text-sm font-bold text-gray-700 mb-2">
            Specialties
            <div className="flex flex-wrap gap-2 border p-2 rounded">
              {currentAdvocate.specialties.map((s, i) => (
                <span
                  key={i}
                  className="bg-green-500 text-white px-2 py-1 rounded-full text-sm"
                >
                  {s}
                  <button
                    className="ml-1"
                    onClick={() =>
                      setCurrentAdvocate((prev) => ({
                        ...prev!,
                        specialties: prev!.specialties.filter(
                          (_, idx) => idx !== i
                        ),
                      }))
                    }
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                className="flex-1 text-sm p-1 outline-none min-w-[100px]"
                onKeyDown={(e) => {
                  const val = (e.target as HTMLInputElement).value.trim();
                  if (e.key === 'Enter' && val) {
                    e.preventDefault();
                    setCurrentAdvocate((prev) => ({
                      ...prev!,
                      specialties: [...prev!.specialties, val],
                    }));
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
            </div>
          </label>

          <div className="flex justify-end gap-2">
            <button
              onClick={closeModal}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-solaceGreen text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
