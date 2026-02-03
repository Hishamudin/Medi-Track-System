import React, { useState } from 'react';
import { 
  FileText, BarChart2, PieChart, TrendingUp, Download, 
  Calendar, Filter, ChevronDown, Users, ArrowRight, Clipboard 
} from 'lucide-react';

// Mock report types
const reportTypes = [
  { id: 'patient', name: 'Patient Summary Report', icon: FileText },
  { id: 'treatment', name: 'Treatment Report', icon: Clipboard },
  { id: 'appointments', name: 'Appointment Statistics', icon: Calendar },
  { id: 'demographics', name: 'Patient Demographics', icon: Users },
  { id: 'diagnoses', name: 'Common Diagnoses', icon: BarChart2 },
  { id: 'revenue', name: 'Financial Report', icon: TrendingUp },
];

const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState('last30');
  
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Reports & Analytics
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Generate and view reports for patients, appointments, and clinic performance.
          </p>
        </div>
      </div>
      
      {/* Report filters */}
      <div className="bg-white rounded-lg shadow px-4 py-5 sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700">
              Date Range
            </label>
            <div className="mt-1">
              <select
                id="dateRange"
                name="dateRange"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="last7">Last 7 days</option>
                <option value="last30">Last 30 days</option>
                <option value="thisMonth">This month</option>
                <option value="lastMonth">Last month</option>
                <option value="custom">Custom range</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">
              Doctor
            </label>
            <div className="mt-1">
              <select
                id="doctor"
                name="doctor"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">All Doctors</option>
                <option value="1">Dr. Smith</option>
                <option value="2">Dr. Johnson</option>
                <option value="3">Dr. Parker</option>
                <option value="4">Dr. Roberts</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <div className="mt-1">
              <select
                id="department"
                name="department"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">All Departments</option>
                <option value="1">Family Medicine</option>
                <option value="2">Internal Medicine</option>
                <option value="3">Cardiology</option>
                <option value="4">Psychiatry</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            <Filter className="-ml-0.5 mr-1.5 h-4 w-4" aria-hidden="true" />
            Apply Filters
          </button>
        </div>
      </div>
      
      {/* Report types */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Generate Reports</h3>
          <p className="mt-1 text-sm text-gray-500">
            Select a report type to generate
          </p>
        </div>
        <div className="divide-y divide-gray-200">
          {reportTypes.map((report) => (
            <div key={report.id} className="px-4 py-5 sm:px-6 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center">
                      <report.icon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">{report.name}</h4>
                    <p className="text-sm text-gray-500">
                      {report.id === 'patient' && 'Generate a comprehensive summary of patient medical history'}
                      {report.id === 'treatment' && 'Report on treatments performed and their outcomes'}
                      {report.id === 'appointments' && 'View appointment statistics by doctor, department, or time period'}
                      {report.id === 'demographics' && 'Analyze patient demographics including age, gender, and location'}
                      {report.id === 'diagnoses' && 'See the most common diagnoses over a time period'}
                      {report.id === 'revenue' && 'Review financial performance and billing information'}
                    </p>
                  </div>
                </div>
                <div>
                  <button className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
                    Generate <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Recent & Saved Reports */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Reports</h3>
        </div>
        <div className="divide-y divide-gray-200">
          <div className="px-4 py-5 sm:px-6 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-md bg-purple-100 flex items-center justify-center">
                    <BarChart2 className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-900">Monthly Appointment Summary</h4>
                  <div className="mt-1 text-sm text-gray-500 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Generated on May 15, 2025 • All Departments</span>
                  </div>
                </div>
              </div>
              <div>
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <Download className="h-4 w-4 mr-1" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
          
          <div className="px-4 py-5 sm:px-6 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-md bg-green-100 flex items-center justify-center">
                    <PieChart className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-900">Patient Demographics Analysis</h4>
                  <div className="mt-1 text-sm text-gray-500 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Generated on May 10, 2025 • All Patients</span>
                  </div>
                </div>
              </div>
              <div>
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <Download className="h-4 w-4 mr-1" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
          
          <div className="px-4 py-5 sm:px-6 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-md bg-amber-100 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-900">Q1 Financial Report</h4>
                  <div className="mt-1 text-sm text-gray-500 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Generated on April 5, 2025 • Finance Department</span>
                  </div>
                </div>
              </div>
              <div>
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <Download className="h-4 w-4 mr-1" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Data Visualization Section */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-2">
        {/* Chart 1: Appointments by Department */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Appointments by Department</h3>
              <div className="relative inline-block text-left">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-2 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  Last 30 Days
                  <ChevronDown className="-mr-1 ml-1 h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <PieChart className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Pie chart placeholder</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Appointments distribution by department: Family Medicine (42%), Cardiology (28%), Internal Medicine (18%), Psychiatry (12%)
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Chart 2: Patient Visits Over Time */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Patient Visits Trend</h3>
              <div className="relative inline-block text-left">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-2 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  This Year
                  <ChevronDown className="-mr-1 ml-1 h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart2 className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Bar chart placeholder</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Patient visits trend showing a 15% increase in the last quarter compared to previous quarter
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;