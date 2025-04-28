import { Advocate } from './types';

export const saveAdvocate = async (
  currentAdvocate: Advocate | null,
  setAdvocates: React.Dispatch<React.SetStateAction<Advocate[]>>,
  closeModal: () => void
) => {
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

export const deleteAdvocate = async (
  currentAdvocate: Advocate | null,
  setAdvocates: React.Dispatch<React.SetStateAction<Advocate[]>>,
  closeModal: () => void
) => {
  if (!currentAdvocate) return;

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
