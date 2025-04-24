export interface Advocate {
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

export type AdvocateRowProps = {
  advocate: Advocate;
  openModal: (advocate: Advocate) => void;
};

export interface EditModalProps {
  currentAdvocate: Advocate;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setCurrentAdvocate: React.Dispatch<React.SetStateAction<Advocate | null>>;
  closeModal: () => void;
  handleSave: () => void;
  handleDelete: () => void;
}

export interface SearchFilterProps {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}
