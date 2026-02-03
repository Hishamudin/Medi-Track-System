import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  UserCircle, Calendar, FileText, Activity, 
  Pill, Microscope, ArrowLeft, Edit, Download
} from 'lucide-react';

// Mock patient data
const patients = {
  '1': {
    id: '1',
    name: 'Emma Wilson',
    age: 32,
    dateOfBirth: '1993-05-15',
    gender: 'Female',
    address: '123 Main St, Anytown, CA 90210',
    phone: '(555) 123-4567',
    email: 'emma.wilson@example.com',
    occupation: 'Teacher',
    emergencyContact: 'John Wilson (Husband) - (555) 987-6543',
    bloodType: 'A+',
    allergies: ['Penicillin', 'Peanuts'],
    currentMedications: ['Lisinopril 10mg - once daily', 'Zyrtec 10mg - as needed'],
    medicalHistory: [
      { date: '2024-01-15', condition: 'Hypertension', note: 'Diagnosed with Stage 1 hypertension. Started on Lisinopril.' },
      { date: '2022-03-10', condition: 'Allergic Rhinitis', note: 'Seasonal allergies, prescribed Zyrtec.' },
      { date: '2018-11-22', condition: 'Appendectomy', note: 'Surgical removal of appendix, recovery complete.' },
    ],
    visits: [
      { 
        id: 'v1', 
        date: '2025-05-01', 
        type: 'Check-up',
        doctor: 'Dr. Smith',
        notes: 'Patient presents with elevated blood pressure. Measurements: 138/88 mmHg. Patient reports following medication regimen consistently. Stress at work reported as a possible contributor. Advised on stress management techniques and continued medication.',
        vitals: { bp: '138/88', hr: '72', temp: '98.6°F', weight: '148 lbs' }
      },
      { 
        id: 'v2', 
        date: '2025-03-18', 
        type: 'Urgent Care',
        doctor: 'Dr. Johnson',
        notes: 'Patient presented with acute upper respiratory infection symptoms. Negative for strep. Advised rest, fluids, and over-the-counter medications for symptom management.',
        vitals: { bp: '126/82', hr: '88', temp: '100.2°F', weight: '150 lbs' }
      },
      { 
        id: 'v3', 
        date: '2025-01-15', 
        type: 'Specialist Consultation',
        doctor: 'Dr. Parker',
        notes: 'Cardiology consultation for hypertension management. Recommended current medication continuation with follow-up in 6 months. Discussed lifestyle changes including reduced sodium intake and regular exercise.',
        vitals: { bp: '135/85', hr: '70', temp: '98.4°F', weight: '152 lbs' }
      },
    ],
    labResults: [
      { id: 'lab1', date: '2025-05-01', type: 'Blood Panel', result: 'Normal', details: 'All values within normal range. Cholesterol: 180 mg/dL, HDL: 55 mg/dL, LDL: 110 mg/dL, Triglycerides: 120 mg/dL' },
      { id: 'lab2', date: '2025-03-18', type: 'Strep Test', result: 'Negative', details: 'Negative for streptococcus' },
      { id: 'lab3', date: '2025-01-15', type: 'Blood Pressure Monitoring', result: 'Elevated', details: 'Average readings over 24 hours: 135/85 mmHg' },
    ],
    prescriptions: [
      { id: 'rx1', date: '2025-05-01', medication: 'Lisinopril', dosage: '10mg', instructions: 'Take one tablet by mouth once daily', refills: 3, prescriber: 'Dr. Smith' },
      { id: 'rx2', date: '2025-03-18', medication: 'Amoxicillin', dosage: '500mg', instructions: 'Take one capsule by mouth three times daily for 10 days', refills: 0, prescriber: 'Dr. Johnson' },
      { id: 'rx3', date: '2025-01-15', medication: 'Zyrtec', dosage: '10mg', instructions: 'Take one tablet by mouth once daily as needed for allergies', refills: 5, prescriber: 'Dr. Smith' },
    ]
  }
};

// Tab interface
type TabType = 'overview' | 'visits' | 'lab-results' | 'prescriptions';

const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  
  // Get patient data
  const patient = id ? patients[id as keyof typeof patients] : null;
  
  if (!patient) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-600">Patient not found</p>
        <Link to="/patients" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to patients list
        </Link>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
                  <div className="mt-5 border-t border-gray-200">
                    <dl className="divide-y divide-gray-200">
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Full name</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{patient.name}</dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Date of birth</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{patient.dateOfBirth} ({patient.age} years)</dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Gender</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{patient.gender}</dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Email address</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{patient.email}</dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{patient.phone}</dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Address</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{patient.address}</dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Occupation</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{patient.occupation}</dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Emergency contact</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{patient.emergencyContact}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
              
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Medical Information</h3>
                  <div className="mt-5 border-t border-gray-200">
                    <dl className="divide-y divide-gray-200">
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Blood type</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{patient.bloodType}</dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Allergies</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                            {patient.allergies.map((allergy, index) => (
                              <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                <div className="w-0 flex-1 flex items-center">
                                  <span className="ml-2 flex-1 w-0 truncate">{allergy}</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Current medications</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                            {patient.currentMedications.map((medication, index) => (
                              <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                <div className="w-0 flex-1 flex items-center">
                                  <span className="ml-2 flex-1 w-0 truncate">{medication}</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Medical History</h3>
                <div className="mt-5">
                  <div className="flow-root">
                    <ul className="-mb-8">
                      {patient.medicalHistory.map((event, eventIdx) => (
                        <li key={eventIdx}>
                          <div className="relative pb-8">
                            {eventIdx !== patient.medicalHistory.length - 1 ? (
                              <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                            ) : null}
                            <div className="relative flex space-x-3">
                              <div>
                                <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                                  <Activity className="h-5 w-5 text-white" aria-hidden="true" />
                                </span>
                              </div>
                              <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                <div>
                                  <p className="text-sm text-gray-900">
                                    <span className="font-medium">{event.condition}</span>
                                  </p>
                                  <p className="mt-1 text-sm text-gray-500">{event.note}</p>
                                </div>
                                <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                  <time dateTime={event.date}>{new Date(event.date).toLocaleDateString()}</time>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'visits':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Visit History</h3>
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Calendar className="-ml-0.5 mr-2 h-4 w-4" />
                Schedule Visit
              </button>
            </div>
            
            <div className="overflow-hidden bg-white shadow sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {patient.visits.map((visit) => (
                  <li key={visit.id}>
                    <div className="block hover:bg-gray-50">
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <Calendar className="h-6 w-6 text-blue-600" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-blue-600">{visit.type}</p>
                              <p className="text-sm text-gray-500">{visit.doctor}</p>
                            </div>
                          </div>
                          <div className="ml-2 flex-shrink-0 flex">
                            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {new Date(visit.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                              <span>Vitals: BP {visit.vitals.bp}, HR {visit.vitals.hr}, Temp {visit.vitals.temp}</span>
                            </p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-gray-900">{visit.notes}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
        
      case 'lab-results':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Laboratory Results</h3>
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Microscope className="-ml-0.5 mr-2 h-4 w-4" />
                Add New Result
              </button>
            </div>
            
            <div className="overflow-hidden bg-white shadow sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {patient.labResults.map((result) => (
                  <li key={result.id}>
                    <div className="block hover:bg-gray-50">
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                                <Microscope className="h-6 w-6 text-purple-600" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-purple-600">{result.type}</p>
                              <p className="text-sm text-gray-500">{new Date(result.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="ml-2 flex-shrink-0 flex">
                            <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              result.result === 'Normal' 
                                ? 'bg-green-100 text-green-800' 
                                : result.result === 'Negative'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {result.result}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-gray-900">{result.details}</p>
                        </div>
                        <div className="mt-2 flex">
                          <button
                            type="button"
                            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <Download className="mr-1 h-4 w-4" />
                            Download PDF
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
        
      case 'prescriptions':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Prescriptions</h3>
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Pill className="-ml-0.5 mr-2 h-4 w-4" />
                Add Prescription
              </button>
            </div>
            
            <div className="overflow-hidden bg-white shadow sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {patient.prescriptions.map((prescription) => (
                  <li key={prescription.id}>
                    <div className="block hover:bg-gray-50">
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                <Pill className="h-6 w-6 text-green-600" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-green-600">{prescription.medication} {prescription.dosage}</p>
                              <p className="text-sm text-gray-500">Prescribed by {prescription.prescriber} on {new Date(prescription.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="ml-2 flex-shrink-0 flex">
                            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                              Refills: {prescription.refills}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-gray-900">{prescription.instructions}</p>
                        </div>
                        <div className="mt-2 flex space-x-2">
                          <button
                            type="button"
                            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <Download className="mr-1 h-4 w-4" />
                            Download
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Refill
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header with patient info */}
      <div className="bg-white shadow">
        <div className="px-4 sm:px-6 lg:max-w-7xl lg:mx-auto lg:px-8">
          <div className="py-6 md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center">
                <div className="mr-4">
                  <Link to="/patients" className="text-blue-600 hover:text-blue-800">
                    <ArrowLeft className="h-5 w-5" />
                  </Link>
                </div>
                <div>
                  <div className="flex items-center">
                    <div className="h-12 w-12 bg-blue-100 rounded-full mr-4 flex items-center justify-center">
                      <UserCircle className="h-8 w-8 text-blue-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 truncate">{patient.name}</h1>
                  </div>
                  <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <span>{patient.age} years • {patient.gender}</span>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <span>Blood Type: {patient.bloodType}</span>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <span>ID: #{patient.id}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Edit className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
                Edit
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FileText className="-ml-1 mr-2 h-5 w-5" />
                Export Medical Record
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            className={`${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`${
              activeTab === 'visits'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('visits')}
          >
            Visits
          </button>
          <button
            className={`${
              activeTab === 'lab-results'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('lab-results')}
          >
            Lab Results
          </button>
          <button
            className={`${
              activeTab === 'prescriptions'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('prescriptions')}
          >
            Prescriptions
          </button>
        </nav>
      </div>
      
      {/* Tab content */}
      {renderTabContent()}
    </div>
  );
};

export default PatientDetails;