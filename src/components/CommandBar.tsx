import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const CommandBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  // Dummy page links for demonstration
  const pages = [
    { id: '/', name: 'Dashboard' },
    { id: 'people', name: 'People' },
    { id: 'companies', name: 'Companies' },
    { id: 'tasks', name: 'Create Task' },
  ];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault(); // Prevent default browser behavior
        toggleCommandBar();
      }
    };
  
    document.addEventListener('keydown', handleKeyDown);
  
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleCommandBar = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm('');
      setSearchResults([]);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
    const filteredPages = pages.filter(page =>
      page.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filteredPages.map(page => page.id));
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-gray-900 bg-opacity-75 w-64 px-4 py-8 z-50 transform transition-transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <button
        className="relative top-0 right-0 mb-8 mr-4 bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 focus:outline-none"
        onClick={toggleCommandBar}
      >
        Close
      </button>
      <input
        type="text"
        placeholder="Search pages..."
        className="bg-gray-800 px-2 py-2 rounded focus:outline-none text-white mb-4"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="flex flex-col gap-2">
        {searchTerm === '' ? (
          // Render all pages when search term is empty
          pages.map(page => (
            <Link key={page.id} href={`/${page.id}`} legacyBehavior>
              <a className="text-gray-300 hover:text-white" onClick={toggleCommandBar}>
                {page.name}
              </a>
            </Link>
          ))
        ) : (
          // Render only matched page at the top when there is a search term
          searchResults.length > 0 ? (
            searchResults.map(pageId => (
              <Link key={pageId} href={`/${pageId}`} legacyBehavior>
                <a className="text-gray-300 hover:text-white" onClick={toggleCommandBar}>
                  {pages.find(page => page.id === pageId)?.name}
                </a>
              </Link>
            ))
          ) : (
            <p className="text-gray-300">No results found</p>
          )
        )}
      </div>
    </div>
  );
};

export default CommandBar;







