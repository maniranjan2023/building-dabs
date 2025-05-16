import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, settoken, userData } = useContext(AppContext);

  const logout = () => {
    settoken('');
    localStorage.removeItem('token');
  };

  return (
    <div className="sticky top-0 z-30 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 backdrop-blur-md bg-opacity-90 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <img
            onClick={() => navigate('/')}
            className="w-44 cursor-pointer transition-all duration-300 hover:scale-105 hover:brightness-110"
            src={assets.logo}
            alt="Company Logo"
          />
        </div>

        {/* Center: Navigation Menu */}
        <NavigationMenu className="hidden md:flex w-full justify-end">
          <NavigationMenuList className="flex flex-1 justify-center gap-10">
            {['/', '/doctors', '/about', '/contact'].map((path, i) => {
              const label = ['Home', 'All Doctors', 'About', 'Contact'][i];
              return (
                <NavigationMenuItem key={label}>
                  <NavigationMenuLink asChild>
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        `text-base font-medium transition-all ${
                          isActive
                            ? 'text-blue-700 underline'
                            : 'text-gray-700 hover:text-blue-600'
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right: Login / Logout */}
        <div>
          {token && userData ? (
            <button
              onClick={logout}
              className="text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-full font-medium hidden md:flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
