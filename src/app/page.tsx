'use client';

import { useEffect, useState, useMemo } from 'react';
import AdvocateRow from './components/AdvocateRow';
import TableHeaders from './components/TableHeaders';
import EditModal from './components/EditModal';
import SearchFilter from './components/SearchFilter';
import { Advocate } from './types';

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAdvocate, setCurrentAdvocate] = useState<Advocate | null>(null);

  useEffect(() => {
    console.log('fetching advocates...');
    fetch('/api/advocates').then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
      });
    });
  }, []);

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

  const handleSave = async () => {
    if (!currentAdvocate) return;
    const requiredFields = [
      'firstName',
      'lastName',
      'city',
      'degree',
      'specialties',
    ];

    for (const field of requiredFields) {
      if (!currentAdvocate[field as keyof Advocate]) {
        alert(`${field} is required`);
        return;
      }
    }

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
        setAdvocates((prev) =>
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

  const handleDelete = async () => {
    if (!currentAdvocate) return;

    // Confirm the deletion action
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this advocate?'
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch('/api/advocates', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: currentAdvocate.id }),
      });

      if (response.ok) {
        setAdvocates((prev) => prev.filter((a) => a.id !== currentAdvocate.id));
        closeModal();
      } else {
        console.error('Delete failed');
      }
    } catch (err) {
      console.error('DELETE error', err);
    }
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
      </div>
    </main>
  );
}
