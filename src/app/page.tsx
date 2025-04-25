'use client';

import { useEffect, useState, useMemo } from 'react';
import AdvocateRow from './components/AdvocateRow';
import TableHeaders from './components/TableHeaders';
import EditModal from './components/EditModal';
import SearchFilter from './components/SearchFilter';
import { Advocate } from './types';
import { saveAdvocate, deleteAdvocate } from './handlers';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [currentAdvocate, setCurrentAdvocate] = useState<Advocate | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/advocates')
      .then((res) => res.json())
      .then((json) => {
        setAdvocates(json.data);
        setLoading(false);
      });
  }, []);

  const handleSave = () => {
    // if (!currentAdvocate) return;
    saveAdvocate(currentAdvocate, setAdvocates, closeModal);
  };

  const handleDelete = () => {
    // if (!currentAdvocate) return;
    deleteAdvocate(currentAdvocate, setAdvocates, closeModal);
  };

  // Usememo to avoid redundant state and computation
  const filteredAdvocates = useMemo(() => {
    return advocates.filter((advocate) => {
      const search = searchTerm.toLowerCase();
      return (
        advocate.firstName.toLowerCase().includes(search) ||
        advocate.lastName.toLowerCase().includes(search) ||
        advocate.city.toLowerCase().includes(search) ||
        advocate.degree.toLowerCase().includes(search) ||
        advocate.specialties.some((s) => s.toLowerCase().includes(search)) ||
        // TODO: is below best way ?
        String(advocate.yearsOfExperience).toLowerCase().includes(search) ||
        String(advocate.phoneNumber).toLowerCase().includes(search)
      );
    });
  }, [advocates, searchTerm]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onClick = () => {
    setSearchTerm('');
  };

  const openModal = (advocate: Advocate) => {
    setCurrentAdvocate(advocate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentAdvocate(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO IS Below best?
    setCurrentAdvocate((prev) => {
      if (!prev) return null;
      const { name, value } = e.target;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-semibold text-solaceGreen mb-6">
          Solace Advocates
        </h1>
        <SearchFilter
          searchTerm={searchTerm}
          onChange={onChange}
          onClick={onClick}
        />
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-solaceGreen" />
            </div>
          ) : (
            <table className="w-full table-auto border-collapse border border-gray-200 text-sm">
              <TableHeaders />
              <tbody>
                {filteredAdvocates.map((advocate) => (
                  <AdvocateRow
                    key={advocate.id}
                    advocate={advocate}
                    openModal={openModal}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>

        {isModalOpen && currentAdvocate && (
          <EditModal
            currentAdvocate={currentAdvocate}
            handleInputChange={handleInputChange}
            setCurrentAdvocate={setCurrentAdvocate}
            closeModal={closeModal}
            handleSave={handleSave}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </main>
  );
}
