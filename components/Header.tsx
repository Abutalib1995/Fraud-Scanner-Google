
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldCheckIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-1 py-2 text-sm font-medium transition-colors duration-300 ${
      isActive ? 'text-white' : 'text-neutral-200 hover:text-white'
    } after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-accent after:transition-transform after:duration-300 ${
        isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
    }`;
    
  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
      isActive ? 'bg-primary-dark text-white' : 'text-neutral-200 hover:bg-primary hover:text-white'
    }`;

  return (
    <header className="bg-gradient-to-r from-primary-dark to-primary shadow-lg sticky top-0 z-50 border-b border-black/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0 flex items-center text-white">
              <ShieldCheckIcon className="h-8 w-8 text-accent" />
              <span className="ml-2 text-xl font-bold">ScamGuard</span>
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <NavLink to="/" className={navLinkClass}>Home</NavLink>
              <NavLink to="/search" className={navLinkClass}>Search</NavLink>
              <NavLink to="/report" className={navLinkClass}>Report Scam</NavLink>
              <NavLink to="/about" className={navLinkClass}>About</NavLink>
              <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-100 hover:text-white hover:bg-primary-light/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-dark focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-primary/95 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
            <NavLink to="/search" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Search</NavLink>
            <NavLink to="/report" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Report Scam</NavLink>
            <NavLink to="/about" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>About</NavLink>
            <NavLink to="/contact" className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
