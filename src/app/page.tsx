'use client';
import { useEffect, useState } from 'react';

interface Advocate {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
  createdAt: string;
}

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAdvocate, setCurrentAdvocate] = useState<Advocate | null>(null);

  useEffect(() => {
    console.log('fetching advocates...');
    fetch('/api/advocates').then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    const filteredAdvocates = advocates.filter((advocate) => {
      const search = searchTerm.toLowerCase();
      return (
        advocate.firstName.toLowerCase().includes(search) ||
        advocate.lastName.toLowerCase().includes(search) ||
        advocate.city.toLowerCase().includes(search) ||
        advocate.degree.toLowerCase().includes(search) ||
        advocate.specialties.some((s) => s.toLowerCase().includes(search)) ||
        String(advocate.yearsOfExperience).toLowerCase().includes(search) ||
        String(advocate.phoneNumber).toLowerCase().includes(search)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    setSearchTerm('');
    setFilteredAdvocates(advocates);
  };

  const openModal = (advocate: Advocate) => {
    setCurrentAdvocate(advocate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log('close!!');
    setIsModalOpen(false);
    setCurrentAdvocate(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentAdvocate) {
      const { name, value } = e.target;
      setCurrentAdvocate((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    if (!currentAdvocate) return;
    try {
      const response = await fetch('/api/advocates', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentAdvocate),
      });

      if (response.ok) {
        const updated = await response.json();
        // DG - adjust below
        setAdvocates((prev) =>
          prev.map((a) => (a.id === currentAdvocate.id ? updated.data[0] : a))
        );
        setFilteredAdvocates((prev) =>
          prev.map((a) => (a.id === currentAdvocate.id ? updated.data[0] : a))
        );
        closeModal();
      } else {
        console.error('Update failed');
      }
    } catch (err) {
      console.error('PUT error', err);
    }
  };

  const AdvocateRow = ({ advocate }: { advocate: Advocate }) => (
    <tr key={advocate.id} className="hover:bg-gray-50 transition-colors">
      <td className="border-b p-2">{advocate.firstName}</td>
      <td className="border-b p-2">{advocate.lastName}</td>
      <td className="border-b p-2">{advocate.city}</td>
      <td className="border-b p-2">{advocate.degree}</td>
      <td className="border-b p-2">
        {advocate.specialties.map((s, i) => (
          <div key={i}>{s}</div>
        ))}
      </td>
      <td className="border-b p-2">{advocate.yearsOfExperience}</td>
      <td className="border-b p-2">{advocate.phoneNumber}</td>
      <td className="border-b p-2">
        <button
          onClick={() => openModal(advocate)}
          className="bg-solaceGreen hover:bg-opacity-80 text-white px-3 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-solaceGreenLight"
        >
          Edit
        </button>
      </td>
    </tr>
  );

  const TableHeaders = () => {
    const headers = [
      'First Name',
      'Last Name',
      'City',
      'Degree',
      'Specialties',
      'Experience',
      'Phone Number',
      'Edit',
    ];

    return (
      <thead className="bg-gray-100">
        <tr>
          {headers.map((header) => (
            <th
              key={header}
              className="border-b-2 border-solaceGreen p-2 text-left font-semibold text-gray-700"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-semibold text-solaceGreen mb-6">
          Solace Advocates
        </h1>
        <div className="mb-8 space-y-4">
          <div className="flex gap-4 items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={onChange}
              className="w-full md:w-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-solaceGreenLight"
              placeholder="Search advocates..."
            />
            <button
              onClick={onClick}
              className="bg-solaceGreen hover:bg-opacity-80 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-solaceGreenLight"
            >
              Reset Search
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-200 text-sm">
            <TableHeaders />
            <tbody>
              {filteredAdvocates.map((advocate) => (
                <AdvocateRow key={advocate.id} advocate={advocate} />
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && currentAdvocate && (
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
                      placeholder="Add"
                    />
                  </div>
                </label>

                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Years of Experience
                  <input
                    type="number"
                    name="yearsOfExperience"
                    value={currentAdvocate.yearsOfExperience}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-solaceGreenLight"
                  />
                </label>

                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone Number
                  <input
                    type="number"
                    name="phoneNumber"
                    value={currentAdvocate.phoneNumber}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-solaceGreenLight"
                  />
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={closeModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-solaceGreen hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
