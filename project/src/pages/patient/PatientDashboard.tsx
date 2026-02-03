import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FileText, Calendar, Clock, Activity,
  CreditCard, AlertTriangle, CheckCircle
} from 'lucide-react';
import { format } from 'date-fns';

const PatientDashboard: React.FC = () => {
  const { user, subscription } = useAuth();

  const isSubscriptionActive = subscription?.status === 'active';
  const subscriptionEndsAt = subscription?.current_period_end 
    ? format(new Date(subscription.current_period_end), 'MMMM d, yyyy')
    : null;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Welcome back, {user?.name}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            View and manage your medical records
          </p>
        </div>
      </div>

      {/* Subscription Status */}
      <div className={`rounded-md p-4 ${
        isSubscriptionActive ? 'bg-green-50' : 'bg-yellow-50'
      }`}>
        <div className="flex">
          <div className="flex-shrink-0">
            {isSubscriptionActive ? (
              <CheckCircle className="h-5 w-5 text-green-400" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            )}
          </div>
          <div className="ml-3">
            <h3 className={`text-sm font-medium ${
              isSubscriptionActive ? 'text-green-800' : 'text-yellow-800'
            }`}>
              {isSubscriptionActive ? 'Active Subscription' : 'Subscription Required'}
            </h3>
            <div className="mt-2 text-sm">
              {isSubscriptionActive ? (
                <p className="text-green-700">
                  Your subscription is active until {subscriptionEndsAt}
                </p>
              ) : (
                <p className="text-yellow-700">
                  Subscribe to access your complete medical history and records
                </p>
              )}
            </div>
            {!isSubscriptionActive && (
              <div className="mt-4">
                <Link
                  to="/subscription"
                  className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-sm font-medium text-yellow-800 hover:bg-yellow-100"
                >
                  <CreditCard className="-ml-0.5 mr-2 h-4 w-4" />
                  Subscribe Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          to="/medical-records"
          className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400"
        >
          <div className="flex-shrink-0">
            <FileText className="h-6 w-6 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-sm font-medium text-gray-900">Medical Records</p>
            <p className="text-sm text-gray-500">View your complete medical history</p>
          </div>
        </Link>

        <Link
          to="/appointments"
          className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400"
        >
          <div className="flex-shrink-0">
            <Calendar className="h-6 w-6 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-sm font-medium text-gray-900">Appointments</p>
            <p className="text-sm text-gray-500">Schedule and manage appointments</p>
          </div>
        </Link>

        <Link
          to="/prescriptions"
          className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400"
        >
          <div className="flex-shrink-0">
            <Clock className="h-6 w-6 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-sm font-medium text-gray-900">Prescriptions</p>
            <p className="text-sm text-gray-500">View and manage prescriptions</p>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
        </div>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            <li className="px-4 py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Activity className="h-6 w-6 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    Blood Pressure Check
                  </p>
                  <p className="text-sm text-gray-500">
                    Appointment with Dr. Smith - May 15, 2025
                  </p>
                </div>
              </div>
            </li>
            <li className="px-4 py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <FileText className="h-6 w-6 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    Lab Results Available
                  </p>
                  <p className="text-sm text-gray-500">
                    Blood work results from May 10, 2025
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;