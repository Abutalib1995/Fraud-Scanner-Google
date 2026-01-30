
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Report, SearchCategory } from '../types';
import { useScamGuardApi } from '../hooks/useScamGuardApi';
import { MagnifyingGlassIcon, ExclamationTriangleIcon, CalendarIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';


const Identifier: React.FC<{ label: string, value: string }> = ({ label, value }) => (
    <div className="flex items-center justify-between text-sm p-3 bg-neutral-100 rounded-lg border border-neutral-200">
        <div>
            <span className="font-semibold text-neutral-700">{label}: </span>
            <code className="text-danger font-medium break-all">{value}</code>
        </div>
        <button onClick={() => navigator.clipboard.writeText(value)} title="Copy" className="ml-4 flex-shrink-0 text-neutral-400 hover:text-primary transition-colors">
            <DocumentDuplicateIcon className="h-5 w-5" />
        </button>
    </div>
);

const ReportCard: React.FC<{ report: Report }> = ({ report }) => (
    <div className="bg-white p-6 rounded-xl shadow-md border border-neutral-200/80 transition-all duration-300 hover:shadow-xl hover:border-primary-light animate-slide-in-up">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-4">
            <div>
                <h3 className="text-xl font-bold text-danger">Scam Report #{report.id}</h3>
                <div className="flex items-center text-sm text-neutral-500 mt-1">
                    <CalendarIcon className="h-4 w-4 mr-1.5" />
                    Incident Date: {new Date(report.incidentDate).toLocaleDateString()}
                </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-start sm:justify-end">
                {report.categories.map(cat => <span key={cat} className="bg-gradient-to-r from-primary-dark to-primary text-white text-xs font-semibold px-2.5 py-1 rounded-full">{cat}</span>)}
            </div>
        </div>
        
        <div className="space-y-2 mb-4">
            {Object.entries(report.identifiers).map(([key, value]) => value ? <Identifier key={key} label={key} value={value} /> : null)}
        </div>
        
        <p className="text-neutral-700 leading-relaxed bg-neutral-50 p-4 rounded-lg">{report.description}</p>
        
        <div className="border-t mt-4 pt-3 text-right text-xs text-neutral-500">
            Reported on: {new Date(report.createdAt).toLocaleDateString()}
        </div>
    </div>
);


const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<Report[]>([]);
  const { searchReports, loading, error } = useScamGuardApi();
  const [searched, setSearched] = useState(false);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.trim()) {
      setSearched(true);
      const data = await searchReports(searchQuery);
      setResults(data);
    } else {
      setSearched(false);
      setResults([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const initialQuery = searchParams.get('q');
    if (initialQuery) {
        performSearch(initialQuery);
    }
  }, [performSearch, searchParams]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(query ? { q: query } : {});
    performSearch(query);
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">Search Database</h1>
      <form onSubmit={handleSearch} className="mb-8 flex flex-col sm:flex-row gap-2 bg-white p-3 rounded-xl shadow-md border border-neutral-200/80">
        <div className="relative flex-grow">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter email, phone, name..."
              className="w-full pl-10 pr-4 py-3 border-0 rounded-md bg-transparent text-neutral-900 placeholder:text-neutral-400 focus:ring-2 focus:ring-primary/20"
            />
        </div>
        <button type="submit" disabled={loading} className="bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-transform hover:scale-105 shadow-md disabled:bg-neutral-400 disabled:shadow-none disabled:transform-none">
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      <div>
        {loading && <div className="text-center p-8"><p>Loading results...</p></div>}
        {error && <div className="text-center p-8 text-danger">{error}</div>}
        {!loading && searched && results.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-neutral-700">Found {results.length} report(s)</h2>
            <div className="space-y-6">
              {results.map(report => <ReportCard key={report.id} report={report} />)}
            </div>
          </div>
        )}
        {!loading && searched && results.length === 0 && (
          <div className="text-center p-8 md:p-12 bg-white rounded-xl shadow-md border border-neutral-200/80 animate-slide-in-up">
            <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-accent" />
            <h2 className="mt-4 text-2xl font-semibold text-neutral-800">No Results Found</h2>
            <p className="mt-2 text-neutral-600">We couldn't find any reports matching your search. This doesn't guarantee safety. Always be cautious.</p>
            <Link to="/report" className="mt-6 inline-block bg-gradient-to-r from-secondary to-green-700 hover:scale-105 text-white font-bold py-3 px-6 rounded-lg transition-transform shadow-lg">
              Report a New Scam
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
