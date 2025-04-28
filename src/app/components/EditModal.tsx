import React from 'react';
import { EditModalProps } from '../types';

const inputFields = [
  { label: 'First Name', name: 'firstName' },
  { label: 'Last Name', name: 'lastName' },
  { label: 'City', name: 'city' },
  { label: 'Degree', name: 'degree' },
];

function EditModal({
  currentAdvocate,
  handleInputChange,
  setCurrentAdvocate,
  closeModal,
  handleSave,
  handleDelete,
}: EditModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 transition-opacity">
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="sticky top-0 bg-white z-10 p-4 border-b">
          <h2 className="text-xl font-semibold text-solaceGreen">
            Edit Advocate
          </h2>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto">
          {inputFields.map(({ label, name }) => (
            <label
              key={name}
              className="block text-sm font-medium text-gray-700"
            >
              {label}
              <input
                type="text"
                name={name}
                value={currentAdvocate[name as keyof typeof currentAdvocate]}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:ring-2 focus:ring-solaceGreenLight focus:outline-none"
              />
            </label>
          ))}

          <label className="block text-sm font-medium text-gray-700">
            Specialties
            <div className="flex flex-wrap items-center gap-2 border border-gray-300 rounded-lg p-2 mt-1">
              {currentAdvocate.specialties.map((s, i) => (
                <span
                  key={i}
                  className="bg-solaceGreen text-white px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {s}
                  <button
                    className="ml-2 text-white hover:text-red-300"
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
                placeholder="Add..."
                className="flex-1 min-w-[100px] text-sm px-2 py-1 border-none outline-none"
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
        </div>
        <div className="sticky bottom-0 bg-white p-4 border-t flex justify-end gap-2 z-10">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-md"
          >
            Delete
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-solaceGreen hover:bg-green-700 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
