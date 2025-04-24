import { AdvocateRowProps } from '../types';

const AdvocateRow = ({ advocate, openModal }: AdvocateRowProps) => (
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

export default AdvocateRow;
