// components/Table.tsx
import React, { useState, ChangeEvent } from 'react';

interface Row {
  name: string;
  email: string;
  company: string;
  phone: string;
  creationDate: string;
  city: string;
  active: boolean;
  age: number;
}

type SortDirection = 'ascending' | 'descending';

type ColumnType = 'text' | 'checkbox' | 'date' | 'number';

interface ColumnConfig {
  key: keyof Row;
  label: string;
  type: ColumnType;
}

const Table = () => {
  const initialRows: Row[] = [
    {
      name: 'Saraswat',
      email: 'mark.young@example.com',
      company: 'Google',
      phone: '(555) 555-5555',
      creationDate: '2 Jul 2024 - 13:00',
      city: 'West Justin',
      active: true,
      age: 28
    },
    // Add initial rows here similar to the provided image
  ];

  const [rows, setRows] = useState<Row[]>(initialRows);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Row | null; direction: SortDirection }>({
    key: null,
    direction: 'ascending'
  });

  const columns: ColumnConfig[] = [
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'email', label: 'Email', type: 'text' },
    { key: 'company', label: 'Company', type: 'text' },
    { key: 'phone', label: 'Phone', type: 'text' },
    { key: 'creationDate', label: 'Creation Date', type: 'date' },
    { key: 'city', label: 'City', type: 'text' },
    { key: 'active', label: 'Active', type: 'checkbox' },
    { key: 'age', label: 'Age', type: 'number' },
  ];

  const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    const newRows = rows.map((row, i) => (i === index ? { ...row, [name]: newValue } : row));
    setRows(newRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        name: '',
        email: '',
        company: '',
        phone: '',
        creationDate: '',
        city: '',
        active: false,
        age: 0,
      }
    ]);
  };

  const sortRows = (key: keyof Row) => {
    let direction: SortDirection = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    const sortedRows = [...rows].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction === 'ascending' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
        return direction === 'ascending' ? (aValue === bValue ? 0 : aValue ? -1 : 1) : (bValue === aValue ? 0 : bValue ? -1 : 1);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === 'ascending' ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });
    setRows(sortedRows);
  };

  const getSortIndicator = (columnName: keyof Row) => {
    if (sortConfig.key === columnName) {
      return sortConfig.direction === 'ascending' ? '↑' : '↓';
    }
    return '';
  };

  const getColumnInput = (row: Row, column: ColumnConfig, index: number) => {
    switch (column.type) {
      case 'text':
        return (
          <input
            type="text"
            name={column.key as string}
            value={row[column.key] as string} // Ensure value is explicitly cast to string
            onChange={(event) => handleInputChange(index, event)}
            className="w-full px-2 py-1 border rounded bg-transparent focus:outline-none"
          />
        );
      case 'checkbox':
        return (
          <input
            type="checkbox"
            name={column.key as string}
            checked={row[column.key] as boolean} // Ensure value is explicitly cast to boolean
            onChange={(event) => handleInputChange(index, event)}
            className="px-2 py-1"
          />
        );
      case 'date':
        return (
          <input
            type="date"
            name={column.key as string}
            value={row[column.key] as string} // Ensure value is explicitly cast to string
            onChange={(event) => handleInputChange(index, event)}
            className="w-full px-2 py-1 border rounded bg-transparent focus:outline-none"
          />
        );
      case 'number':
        return (
          <input
            type="number"
            name={column.key as string}
            value={row[column.key] as number} // Ensure value is explicitly cast to number
            onChange={(event) => handleInputChange(index, event)}
            className="w-full px-2 py-1 border rounded bg-transparent focus:outline-none"
          />
        );
      default:
        return null;
    }
  };
  

  return (
    <div className="bg-gray-800 h-screen px-6">
      <div className="bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-md p-4 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <button onClick={addRow} className="p-2 bg-gray-600 text-white rounded">
            New +
          </button>
          <div className="flex items-center">
            <span className="mr-2 text-white">Sort by:</span>
            {columns.map(column => (
              <button key={column.key} className="mr-2 bg-gray-600 text-white p-2 rounded" onClick={() => sortRows(column.key)}>
                {column.label} {getSortIndicator(column.key)}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-50 bg-opacity-45 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 bg-opacity-25">
              <tr>
                {columns.map(column => (
                  <th key={column.key} className="py-2 px-4 border-b border-gray-300">
                    {column.label} {getSortIndicator(column.key as keyof Row)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="bg-gray-100 bg-opacity-25">
                  {columns.map(column => (
                    <td key={`${index}-${column.key}`} className="py-2 px-4 border-b border-gray-300">
                      {getColumnInput(row, column, index)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;


