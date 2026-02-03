import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, Calendar, Clock, CheckCircle, 
  TrendingUp, Activity, PieChart, AlertTriangle
} from 'lucide-react';

// Mock data
const stats = [
  { name: 'Total Patients', value: '1,284', icon: Users, color: 'bg-blue-100 text-blue-600' },
  { name: 'Today\'s Appointments', value: '42', icon: Calendar, color: 'bg-purple-100 text-purple-600' },
  { name: 'Pending Tasks', value: '18', icon: Clock, color: 'bg-amber-100 text-amber-600' },
  { name: 'Completed Tasks', value: '24', icon: CheckCircle, color: 'bg-green-100 text-green-600' },
];

const recentPatients = [
  { id: '1', name: 'Emma Wilson', age: 32, lastVisit: '10 May 2025', condition: 'Hypertension', status: 'Stable' },
  { id: '2', name: 'James Mitchell', age: 45, lastVisit: '9 May 2025', condition: 'Diabetes Type 2', status: 'Review' },
  { id: '3', name: 'Sophia Davis', age: 28, lastVisit: '8 May 2025', condition: 'Pregnancy', status: 'Stable' },
  { id: '4', name: 'Alexander Lee', age: 67, lastVisit: '7 May 2025', condition: 'COPD', status: 'Critical' },
  { id: '5', name: 'Olivia Brown', age: 8, lastVisit: '6 May 2025', condition: 'Asthma', status: 'Stable' },
];

const todayAppointments = [
  { id: '1', time: '09:00 AM', patient: 'Emma Wilson', purpose: 'Follow-up' },
  { id: '2', time: '10:30 AM', patient: 'James Mitchell', purpose: 'Blood Work' },
  { id: '3', time: '11:15 AM', patient: 'Sophia Davis', purpose: 'Checkup' },
  { id: '4', time: '01:00 PM', patient: 'Alexander Lee', purpose: 'Consultation' },
  { id: '5', time: '03:30 PM', patient: 'Olivia Brown', purpose: 'Vaccination' },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Welcome back, {user?.name}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="overflow-hidden rounded-lg bg-white shadow transition-all hover:shadow-md"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">{stat.name}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Data visualization */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Activity chart */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Weekly Activity</h3>
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span className="ml-1 text-sm text-green-500">+12%</span>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-center h-64 bg-gray-50 rounded-lg">
              <div className="text-center">
                <Activity className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Activity chart placeholder</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Patient statistics */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Patient Demographics</h3>
              <div className="flex items-center">
                <PieChart className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="mt-6 flex items-center justify-center h-64 bg-gray-50 rounded-lg">
              <div className="text-center">
                <PieChart className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Demographics chart placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent patients and appointments section */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Recent patients */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="flex items-center justify-between p-5 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Patients</h3>
            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              View all
            </a>
          </div>
          <div className="overflow-hidden overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Age
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Last Visit
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {recentPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                      <div className="font-medium text-gray-900">{patient.name}</div>
                      <div className="text-gray-500">{patient.condition}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {patient.age}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {patient.lastVisit}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        patient.status === 'Stable' 
                          ? 'bg-green-100 text-green-800'
                          : patient.status === 'Review'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {patient.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Today's appointments */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="flex items-center justify-between p-5 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Today's Appointments</h3>
            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              View all
            </a>
          </div>
          <ul className="divide-y divide-gray-200">
            {todayAppointments.map((appointment) => (
              <li key={appointment.id}>
                <div className="flex items-center px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="min-w-0 flex-1 flex items-center">
                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                      <div>
                        <p className="text-sm font-medium text-blue-600 truncate">{appointment.patient}</p>
                        <p className="mt-1 flex items-center text-sm text-gray-500">
                          <span className="truncate">{appointment.purpose}</span>
                        </p>
                      </div>
                      <div className="hidden md:block">
                        <div>
                          <p className="text-sm text-gray-900">
                            {appointment.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      View
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Alerts and notifications */}
      <div className="rounded-lg bg-yellow-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Attention needed</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                3 patients have lab results pending review. Please check the reports section for details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;