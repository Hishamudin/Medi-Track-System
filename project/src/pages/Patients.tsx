import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus, ChevronRight } from 'lucide-react';

// Mock patient data
const patients = [
  { id: '1', name: 'Emma Wilson', age: 32, gender: 'Female', phone: '(555) 123-4567', email: 'emma.wilson@example.com', condition: 'Hypertension', status: 'Active' },
  { id: '2', name: 'James Mitchell', age: 45, gender: 'Male', phone: '(555) 234-5678', email: 'james.mitchell@example.com', condition: 'Diabetes Type 2', status: 'Active' },
  { id: '3', name: 'Sophia Davis', age: 28, gender: 'Female', phone: '(555) 345-6789', email: 'sophia.davis@example.com', condition: 'Pregnancy', status: 'Active' },
  { id: '4', name: 'Alexander Lee', age: 67, gender: 'Male', phone: '(555) 456-7890', email: 'alexander.lee@example.com', condition: 'COPD', status: 'Critical' },
  { id: '5', name: 'Olivia Brown', age: 8, gender: 'Female', phone: '(555) 567-8901', email: 'olivia.parents@example.com', condition: 'Asthma', status: 'Active' },
  { id: '6', name: 'William Johnson', age: 54, gender: 'Male', phone: '(555) 678-9012', email: 'william.johnson@example.com', condition: 'Arthritis', status: 'Stable' },
  { id: '7', name: 'Ava Martinez', age: 42, gender: 'Female', phone: '(555) 789-0123', email: 'ava.martinez@example.com', condition: 'Migraine', status: 'Active' },
  { id: '8', name: 'Ethan Thompson', age: 35, gender: 'Male', phone: '(555) 890-1234', email: 'ethan.thompson@example.com', condition: 'Anxiety Disorder', status: 'Active' },
  { id: '9', name: 'Isabella Garcia', age: 76, gender: 'Female', phone: '(555) 901-2345', email: 'isabella.garcia@example.com', condition: 'Osteoporosis', status: 'Stable' },
  { id: '10', name: 'Michael Robinson', age: 61, gender: 'Male', phone: '(555) 012-3456', email: 'michael.robinson@example.com', condition: 'Heart Disease', status: 'Critical' },
];

const Patients: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Filter patients based on search query
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginate
  const indexOfLastPatient = currentPage * itemsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - itemsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Patients
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <button
            type="button"
            className="ml-3 inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <Plus className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Add New Patient
          </button>
        </div>
      </div>
      
      {/* Search and filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-grow max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            name="search"
            id="search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            className="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            placeholder="Search patients..."
          />
        </div>
        
        <div>
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <Filter className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            Filter
          </button>
        </div>
      </div>
      
      {/* Patient list */}
      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {currentPatients.map((patient) => (
            <li key={patient.id}>
              <Link
                to={`/patients/${patient.id}`}
                className="block hover:bg-gray-50"
              >
                <div className="flex items-center px-4 py-4 sm:px-6">
                  <div className="flex min-w-0 flex-1 items-center">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-lg">
                          {patient.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                      <div>
                        <p className="truncate text-sm font-medium text-blue-600">
                          {patient.name}
                        </p>
                        <p className="mt-1 flex items-center text-sm text-gray-500">
                          <span className="truncate">{patient.email}</span>
                        </p>
                        <p className="mt-1 flex items-center text-sm text-gray-500">
                          <span className="truncate">{patient.phone}</span>
                        </p>
                      </div>
                      <div className="hidden md:block">
                        <div>
                          <p className="text-sm text-gray-900">
                            {patient.age} years • {patient.gender}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {patient.condition}
                          </p>
                          <p className="mt-2">
                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                              patient.status === 'Active' 
                                ? 'bg-green-100 text-green-800'
                                : patient.status === 'Stable'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {patient.status}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <ChevronRight className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <nav
            className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
            aria-label="Pagination"
          >
            <div className="hidden sm:block">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{indexOfFirstPatient + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastPatient, filteredPatients.length)}
                </span>{' '}
                of <span className="font-medium">{filteredPatients.length}</span> results
              </p>
            </div>
            <div className="flex flex-1 justify-between sm:justify-end">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-900 hover:bg-gray-50'
                } ring-1 ring-inset ring-gray-300`}
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-900 hover:bg-gray-50'
                } ring-1 ring-inset ring-gray-300`}
              >
                Next
              </button>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Patients;