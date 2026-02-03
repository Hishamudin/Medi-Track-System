import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, Clock, List, Grid, 
  ChevronLeft, ChevronRight, Plus, AlertCircle
} from 'lucide-react';

// Mock appointment data
const appointments = [
  { id: '1', patientId: '1', patientName: 'Emma Wilson', date: '2025-05-20', time: '09:00 AM', duration: 30, purpose: 'Follow-up', doctor: 'Dr. Smith', status: 'Scheduled' },
  { id: '2', patientId: '2', patientName: 'James Mitchell', date: '2025-05-20', time: '10:30 AM', duration: 45, purpose: 'Blood Work', doctor: 'Dr. Johnson', status: 'Scheduled' },
  { id: '3', patientId: '3', patientName: 'Sophia Davis', date: '2025-05-20', time: '11:15 AM', duration: 30, purpose: 'Checkup', doctor: 'Dr. Smith', status: 'Checked In' },
  { id: '4', patientId: '4', patientName: 'Alexander Lee', date: '2025-05-20', time: '01:00 PM', duration: 60, purpose: 'Consultation', doctor: 'Dr. Parker', status: 'Scheduled' },
  { id: '5', patientId: '5', patientName: 'Olivia Brown', date: '2025-05-20', time: '03:30 PM', duration: 30, purpose: 'Vaccination', doctor: 'Dr. Johnson', status: 'Scheduled' },
  { id: '6', patientId: '6', patientName: 'William Johnson', date: '2025-05-21', time: '09:30 AM', duration: 45, purpose: 'Initial Consultation', doctor: 'Dr. Smith', status: 'Scheduled' },
  { id: '7', patientId: '7', patientName: 'Ava Martinez', date: '2025-05-21', time: '11:00 AM', duration: 30, purpose: 'Follow-up', doctor: 'Dr. Parker', status: 'Scheduled' },
  { id: '8', patientId: '8', patientName: 'Ethan Thompson', date: '2025-05-21', time: '02:00 PM', duration: 45, purpose: 'Therapy Session', doctor: 'Dr. Roberts', status: 'Scheduled' },
  { id: '9', patientId: '9', patientName: 'Isabella Garcia', date: '2025-05-22', time: '10:00 AM', duration: 30, purpose: 'Bone Density Scan', doctor: 'Dr. Johnson', status: 'Scheduled' },
  { id: '10', patientId: '10', patientName: 'Michael Robinson', date: '2025-05-22', time: '01:30 PM', duration: 60, purpose: 'Cardiology Review', doctor: 'Dr. Parker', status: 'Scheduled' },
];

// Mock doctors data
const doctors = [
  { id: '1', name: 'Dr. Smith', department: 'Family Medicine', color: '#4F46E5' },
  { id: '2', name: 'Dr. Johnson', department: 'Internal Medicine', color: '#0EA5E9' },
  { id: '3', name: 'Dr. Parker', department: 'Cardiology', color: '#10B981' },
  { id: '4', name: 'Dr. Roberts', department: 'Psychiatry', color: '#F59E0B' },
];

type ViewType = 'calendar' | 'list';

const Appointments: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewType, setViewType] = useState<ViewType>('calendar');
  
  // Format date for displaying
  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  // Get appointments for selected date
  const formattedSelectedDate = selectedDate.toISOString().split('T')[0];
  const appointmentsForDay = appointments.filter(
    appointment => appointment.date === formattedSelectedDate
  );
  
  // Navigate between days
  const goToNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setSelectedDate(nextDay);
  };
  
  const goToPreviousDay = () => {
    const prevDay = new Date(selectedDate);
    prevDay.setDate(prevDay.getDate() - 1);
    setSelectedDate(prevDay);
  };
  
  // Get hour slots for calendar view (8 AM to 6 PM)
  const timeSlots = Array.from({ length: 11 }, (_, i) => {
    const hour = i + 8;
    return {
      time: hour > 12 ? `${hour - 12}:00 PM` : hour === 12 ? '12:00 PM' : `${hour}:00 AM`,
      hour,
    };
  });
  
  // Render appointments in calendar view
  const renderCalendarView = () => (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border-b border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                    Time
                  </th>
                  {doctors.map(doctor => (
                    <th key={doctor.id} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: doctor.color }}></div>
                        <div>
                          <div>{doctor.name}</div>
                          <div className="text-xs font-normal normal-case text-gray-400">{doctor.department}</div>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {timeSlots.map((slot) => (
                  <tr key={slot.hour} className="bg-white">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-r">
                      {slot.time}
                    </td>
                    {doctors.map(doctor => {
                      const appt = appointmentsForDay.find(a => 
                        a.doctor === doctor.name && 
                        parseInt(a.time.split(':')[0]) === (slot.hour > 12 ? slot.hour - 12 : slot.hour)
                      );
                      
                      return (
                        <td key={doctor.id} className="px-2 py-4 text-sm border-r relative min-h-[80px]">
                          {appt ? (
                            <div 
                              className="absolute inset-x-2 rounded-md shadow-sm p-2 text-xs"
                              style={{ 
                                backgroundColor: `${doctor.color}20`, // 20% opacity
                                borderLeft: `3px solid ${doctor.color}`,
                                top: '0.5rem',
                                bottom: '0.5rem'
                              }}
                            >
                              <div className="font-semibold text-gray-900">{appt.patientName}</div>
                              <div className="text-gray-600">{appt.time} • {appt.duration} mins</div>
                              <div className="text-gray-600">{appt.purpose}</div>
                            </div>
                          ) : (
                            <button className="text-blue-600 text-xs hover:text-blue-800 opacity-0 hover:opacity-100 transition-opacity">
                              + Add
                            </button>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Render appointments in list view
  const renderListView = () => (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      {appointmentsForDay.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {appointmentsForDay.map(appointment => (
            <li key={appointment.id}>
              <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-medium">
                        {appointment.patientName.split(' ').map(name => name[0]).join('')}
                      </span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-blue-600">{appointment.patientName}</p>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-1" />
                        <p className="text-sm text-gray-500">
                          {appointment.time} • {appointment.duration} mins
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        appointment.status === 'Scheduled'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <p><span className="font-medium">Purpose:</span> {appointment.purpose}</p>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <p><span className="font-medium">Doctor:</span> {appointment.doctor}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex space-x-2">
                  <button
                    type="button"
                    className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Check In
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Reschedule
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-12">
          <div className="flex justify-center">
            <CalendarIcon className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments</h3>
          <p className="mt-1 text-sm text-gray-500">
            There are no appointments scheduled for this day.
          </p>
          <div className="mt-6">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              New Appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Appointments
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <button
            type="button"
            className="ml-3 inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            <Plus className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            New Appointment
          </button>
        </div>
      </div>
      
      {/* Date navigation and view toggle */}
      <div className="bg-white px-4 py-5 sm:px-6 rounded-lg shadow flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={goToPreviousDay}
            className="p-1 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div className="mx-4 flex items-center">
            <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {formattedDate}
            </h3>
          </div>
          <button
            onClick={goToNextDay}
            className="p-1 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex items-center">
          <span className="isolate inline-flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setViewType('calendar')}
              className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-semibold ${
                viewType === 'calendar'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
              }`}
            >
              <Grid className="h-4 w-4 mr-1" />
              Calendar
            </button>
            <button
              type="button"
              onClick={() => setViewType('list')}
              className={`relative -ml-px inline-flex items-center rounded-r-md px-3 py-2 text-sm font-semibold ${
                viewType === 'list'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
              }`}
            >
              <List className="h-4 w-4 mr-1" />
              List
            </button>
          </span>
        </div>
      </div>
      
      {/* Notifications */}
      <div className="rounded-md bg-yellow-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Upcoming Rescheduling Needed</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Dr. Parker will be out of office on Friday, May 22. 2 appointments need to be rescheduled.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Appointment view (calendar or list) */}
      {viewType === 'calendar' ? renderCalendarView() : renderListView()}
    </div>
  );
};

export default Appointments;