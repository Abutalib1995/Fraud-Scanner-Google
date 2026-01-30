
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldCheckIcon } from '@heroicons/react/24/solid';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-t from-neutral-900 to-neutral-800 text-neutral-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
             <div className="flex items-center text-white mb-4">
                <ShieldCheckIcon className="h-8 w-8 text-accent" />
                <span className="ml-2 text-xl font-bold">ScamGuard</span>
              </div>
            <p className="text-sm text-center md:text-left text-neutral-400">Protecting our community from fraud and scams, one report at a time.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 text-center md:text-left">Quick Links</h3>
            <ul className="space-y-2 text-center md:text-left">
              <li><NavLink to="/" className="text-neutral-400 hover:text-accent transition-colors">Home</NavLink></li>
              <li><NavLink to="/search" className="text-neutral-400 hover:text-accent transition-colors">Search Database</NavLink></li>
              <li><NavLink to="/report" className="text-neutral-400 hover:text-accent transition-colors">Submit a Report</NavLink></li>
              <li><NavLink to="/about" className="text-neutral-400 hover:text-accent transition-colors">About Us</NavLink></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 text-center md:text-left">Legal</h3>
            <ul className="space-y-2 text-center md:text-left">
              <li><a href="#" className="text-neutral-400 hover:text-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-accent transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-accent transition-colors">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-neutral-700 pt-6 text-center text-sm text-neutral-500">
          <p>&copy; {new Date().getFullYear()} ScamGuard. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;