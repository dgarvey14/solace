export const TableHeaders = () => {
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

export default TableHeaders;
