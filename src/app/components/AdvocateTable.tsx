'use client';

import { useState, useMemo } from 'react';
import { Advocate } from '../types';
import SearchFilter from './SearchFilter';
import TableHeaders from './TableHeaders';
import AdvocateRow from './AdvocateRow';
import EditModal from './EditModal';
import { saveAdvocate, deleteAdvocate } from '../handlers';

export default function AdvocateTable({
  initialAdvocates,
}: {
  initialAdvocates: Advocate[];
}) {
  const [advocates, setAdvocates] = useState(initialAdvocates);
  const [currentAdvocate, setCurrentAdvocate] = useState<Advocate | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredAdvocates = useMemo(() => {
    const search = searchTerm.toLowerCase();
    return advocates.filter((advocate) =>
      [
        advocate.firstName,
        advocate.lastName,
        advocate.city,
        advocate.degree,
        advocate.yearsOfExperience,
        advocate.phoneNumber,
        ...advocate.specialties,
      ]
        .map((v) => String(v).toLowerCase())
        .some((val) => val.includes(search))
    );
  }, [advocates, searchTerm]);

  const handleSave = () => {
    saveAdvocate(currentAdvocate, setAdvocates, closeModal);
  };

  const handleDelete = () => {
    deleteAdvocate(currentAdvocate, setAdvocates, closeModal);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentAdvocate((prev) =>
      prev ? { ...prev, [e.target.name]: e.target.value } : null
    );
  };

  const openModal = (advocate: Advocate) => {
    setCurrentAdvocate(advocate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentAdvocate(null);
  };

  return (
    <>
      <SearchFilter
        searchTerm={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClick={() => setSearchTerm('')}
      />
      <div className="overflow-x-auto">
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
    </>
  );
}
