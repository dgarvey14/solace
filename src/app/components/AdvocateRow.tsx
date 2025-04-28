import { AdvocateRowProps } from '../types';

const AdvocateRow = ({ advocate, openModal }: AdvocateRowProps) => {
  const {
    id,
    firstName,
    lastName,
    city,
    degree,
    specialties,
    yearsOfExperience,
    phoneNumber,
  } = advocate;

  const renderRow = (content: React.ReactNode, key?: string | number) => (
    <td key={key} className="border-b p-2">
      {content}
    </td>
  );

  return (
    <tr key={id} className="hover:bg-gray-50 transition-colors">
      {renderRow(firstName)}
      {renderRow(lastName)}
      {renderRow(city)}
      {renderRow(degree)}
      {renderRow(specialties.map((s, i) => <div key={i}>{s}</div>))}
      {renderRow(yearsOfExperience)}
      {renderRow(phoneNumber)}
      {renderRow(
        <button
          onClick={() => openModal(advocate)}
          className="bg-solaceGreen hover:bg-opacity-80 text-white px-3 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-solaceGreenLight"
        >
          Edit
        </button>
      )}
    </tr>
  );
};

export default AdvocateRow;
