import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Bell, Menu, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  onMenuButtonClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuButtonClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Mobile menu button and search */}
          <div className="flex items-center">
            <button
              type="button"
              className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={onMenuButtonClick}
              aria-label="Open sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            {/* Search */}
            <div className="ml-4 relative md:ml-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 text-gray-900 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  type="search"
                  placeholder="Search patients, appointments..."
                  aria-label="Search"
                />
              </div>
            </div>
          </div>
          
          {/* Right side: Notifications and profile */}
          <div className="flex items-center">
            {/* Notifications */}
            <button
              className="p-2 text-gray-500 rounded-full hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-label="View notifications"
            >
              <Bell className="h-6 w-6" />
            </button>
            
            {/* Profile dropdown */}
            <div className="ml-3 relative">
              <div className="flex items-center">
                <span className="hidden sm:block mr-3">
                  <span className="text-gray-700 text-sm font-medium">
                    {user?.name}
                  </span>
                  <span className="block text-gray-500 text-xs capitalize">
                    {user?.role}
                  </span>
                </span>
                <div className="relative">
                  <button
                    className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold"
                    aria-label="User menu"
                  >
                    {user?.name.charAt(0)}
                  </button>
                  
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block z-10">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;