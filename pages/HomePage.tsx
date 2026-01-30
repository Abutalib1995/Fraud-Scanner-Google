
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, ShieldCheckIcon, FlagIcon, UsersIcon } from '@heroicons/react/24/outline';

const HomePage: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="space-y-20 animate-fade-in">
      {/* Hero Section */}
      <section className="text-center py-10">
        <ShieldCheckIcon className="mx-auto h-16 w-16 text-primary" />
        <h1 className="mt-4 text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-dark to-secondary tracking-tight">Identify Scams Before They Happen.</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-600">
          Use the world's largest community-sourced scam database to protect yourself.
        </p>
        <form onSubmit={handleSearch} className="mt-10 max-w-2xl mx-auto">
          <div className="relative group">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-neutral-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter email, phone, name, website..."
              className="w-full pl-12 pr-4 py-4 text-lg bg-white border-2 border-transparent rounded-full text-neutral-900 placeholder:text-neutral-400 focus:ring-4 focus:ring-primary/20 focus:border-primary-light transition shadow-md hover:shadow-lg"
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-3 px-6 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-105 disabled:bg-neutral-400 disabled:cursor-not-allowed shadow-lg"
            >
              Search
            </button>
          </div>
        </form>
      </section>

      {/* How It Works Section */}
      <section>
        <h2 className="text-3xl font-bold text-center text-neutral-800 mb-12">How ScamGuard Works</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-8 rounded-xl shadow-md border border-neutral-200/80 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl border-t-4 border-primary">
            <div className="bg-primary/10 inline-block p-4 rounded-full">
                <MagnifyingGlassIcon className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mt-5">1. Search</h3>
            <p className="text-neutral-600 mt-2">Enter any identifier like a phone number or email to check our database for verified scam reports.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md border border-neutral-200/80 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl border-t-4 border-danger">
            <div className="bg-danger/10 inline-block p-4 rounded-full">
                <FlagIcon className="h-10 w-10 text-danger" />
            </div>
            <h3 className="text-xl font-semibold mt-5">2. Report</h3>
            <p className="text-neutral-600 mt-2">Submit a detailed report if you've encountered a scam. Your submission helps protect the entire community.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md border border-neutral-200/80 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl border-t-4 border-accent">
            <div className="bg-accent/10 inline-block p-4 rounded-full">
                <UsersIcon className="h-10 w-10 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mt-5">3. Protect</h3>
            <p className="text-neutral-600 mt-2">By sharing information, we create a safer environment for everyone, making it harder for scammers to operate.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;