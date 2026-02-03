import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Home, Users, Calendar, FileText, Settings, 
  ShieldCheck, X, Stethoscope, Activity 
} from 'lucide-react';

interface SidebarProps {
  mobile?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobile = false, onClose }) => {
  const { user } = useAuth();

  const navLinkClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
      isActive 
        ? 'bg-blue-100 text-blue-700' 
        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
    }`;

  return (
    <div className={`w-64 h-full bg-white border-r border-gray-200 ${mobile ? 'pt-5' : 'py-5'}`}>
      {mobile && onClose && (
        <div className="px-4 flex justify-end">
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>
      )}
      
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="px-6 py-4 flex items-center gap-2">
          <Stethoscope className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-blue-600">MediTrack</span>
        </div>
        
        {/* Navigation links */}
        <nav className="flex-1 px-3 mt-6 space-y-1">
          <NavLink to="/" className={navLinkClass}>
            <Home className="h-5 w-5" />
            <span>Dashboard</span>
          </NavLink>
          
          <NavLink to="/patients" className={navLinkClass}>
            <Users className="h-5 w-5" />
            <span>Patients</span>
          </NavLink>
          
          <NavLink to="/appointments" className={navLinkClass}>
            <Calendar className="h-5 w-5" />
            <span>Appointments</span>
          </NavLink>
          
          <NavLink to="/reports" className={navLinkClass}>
            <FileText className="h-5 w-5" />
            <span>Reports</span>
          </NavLink>
          
          {user?.role === 'admin' && (
            <NavLink to="/admin" className={navLinkClass}>
              <ShieldCheck className="h-5 w-5" />
              <span>Admin Panel</span>
            </NavLink>
          )}
          
          <NavLink to="/settings" className={navLinkClass}>
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </NavLink>
        </nav>
        
        {/* User info */}
        <div className="border-t border-gray-200 p-4 mt-auto">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
              {user?.name.charAt(0)}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="font-medium text-gray-900 truncate">{user?.name}</p>
              <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;