import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, Calendar, FileText, Menu } from 'lucide-react';

const MobileNav: React.FC = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) => 
    `flex flex-col items-center justify-center py-2 px-4 text-xs ${
      isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
    }`;

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200">
      <div className="grid h-full grid-cols-4">
        <NavLink to="/" className={navLinkClass}>
          <Home className="h-6 w-6" />
          <span>Home</span>
        </NavLink>
        
        <NavLink to="/patients" className={navLinkClass}>
          <Users className="h-6 w-6" />
          <span>Patients</span>
        </NavLink>
        
        <NavLink to="/appointments" className={navLinkClass}>
          <Calendar className="h-6 w-6" />
          <span>Appointments</span>
        </NavLink>
        
        <NavLink to="/reports" className={navLinkClass}>
          <FileText className="h-6 w-6" />
          <span>Reports</span>
        </NavLink>
      </div>
    </div>
  );
};

export default MobileNav;