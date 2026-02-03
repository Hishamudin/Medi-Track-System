import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, ShieldCheck, Settings, UserPlus,
  Server, BarChart2, AlertTriangle, CheckCircle
} from 'lucide-react';

// Mock data
const stats = [
  { name: 'Total Users', value: '24', icon: Users, color: 'bg-blue-100 text-blue-600' },
  { name: 'Active Sessions', value: '18', icon: CheckCircle, color: 'bg-green-100 text-green-600' },
  { name: 'System Alerts', value: '2', icon: AlertTriangle, color: 'bg-amber-100 text-amber-600' },
  { name: 'API Requests (24h)', value: '1,284', icon: Server, color: 'bg-purple-100 text-purple-600' },
];

const recentUsers = [
  { id: '1', name: 'Emma Wilson', role: 'Doctor', department: 'Family Medicine', lastActive: '5 mins ago', status: 'Online' },
  { id: '2', name: 'James Mitchell', role: 'Nurse', department: 'Cardiology', lastActive: '3 hours ago', status: 'Offline' },
  { id: '3', name: 'Sophia Davis', role: 'Receptionist', department: 'Front Desk', lastActive: '2 hours ago', status: 'Online' },
  { id: '4', name: 'Alexander Lee', role: 'Doctor', department: 'Internal Medicine', lastActive: '1 day ago', status: 'Offline' },
  { id: '5', name: 'Sarah Johnson', role: 'Admin', department: 'IT', lastActive: 'Just now', status: 'Online' },
];

const systemAlerts = [
  { id: '1', type: 'warning', message: 'Database backup failed last night', time: '4 hours ago' },
  { id: '2', type: 'info', message: 'System update available (v2.5.1)', time: '1 day ago' },
  { id: '3', type: 'success', message: 'All services operational', time: 'Just now' },
  { id: '4', type: 'warning', message: 'High CPU usage detected', time: '2 hours ago' },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Admin Dashboard
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            System management and administrator controls
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
      
      {/* Admin Actions */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900">Administrative Actions</h3>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <UserPlus className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">User Management</h4>
                    <p className="mt-1 text-sm text-gray-500">Add, edit, or remove users from the system</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link 
                    to="/admin/users/new"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Add New User
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Security</h4>
                    <p className="mt-1 text-sm text-gray-500">Manage roles, permissions, and security settings</p>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                  >
                    Manage Roles
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                      <Settings className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">System Settings</h4>
                    <p className="mt-1 text-sm text-gray-500">Configure system-wide settings and preferences</p>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700"
                  >
                    System Configuration
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Users & Activity */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Recent Users */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Users</h3>
          </div>
          <div className="overflow-hidden overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-medium">{user.name.charAt(0)}</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.department}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.lastActive}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === 'Online' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-gray-200 text-right">
            <button
              type="button"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              View all users
            </button>
          </div>
        </div>
        
        {/* System Alerts */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">System Alerts</h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {systemAlerts.map((alert) => (
              <li key={alert.id}>
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {alert.type === 'warning' && (
                        <div className="rounded-full bg-yellow-100 p-1">
                          <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        </div>
                      )}
                      {alert.type === 'info' && (
                        <div className="rounded-full bg-blue-100 p-1">
                          <Server className="h-5 w-5 text-blue-600" />
                        </div>
                      )}
                      {alert.type === 'success' && (
                        <div className="rounded-full bg-green-100 p-1">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                      <p className="text-sm text-gray-500">{alert.time}</p>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="px-4 py-3 border-t border-gray-200 text-right">
            <button
              type="button"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              View all alerts
            </button>
          </div>
        </div>
      </div>
      
      {/* System Activity Chart */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">System Activity</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart2 className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">System Activity chart placeholder</h3>
              <p className="mt-1 text-sm text-gray-500">
                Track system usage, API requests, and user activities over time
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;