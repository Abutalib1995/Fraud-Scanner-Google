
import React from 'react';
// Fix: Use namespace import for react-router-dom to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ReportPage from './pages/ReportPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

const App: React.FC = () => {
  return (
    <ReactRouterDOM.BrowserRouter>
      <div className="flex flex-col min-h-screen bg-transparent text-neutral-800">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
          <ReactRouterDOM.Routes>
            <ReactRouterDOM.Route path="/" element={<HomePage />} />
            <ReactRouterDOM.Route path="/search" element={<SearchPage />} />
            <ReactRouterDOM.Route path="/report" element={<ReportPage />} />
            <ReactRouterDOM.Route path="/about" element={<AboutPage />} />
            <ReactRouterDOM.Route path="/contact" element={<ContactPage />} />
            <ReactRouterDOM.Route path="*" element={<ReactRouterDOM.Navigate to="/" />} />
          </ReactRouterDOM.Routes>
        </main>
        <Footer />
      </div>
    </ReactRouterDOM.BrowserRouter>
  );
};

export default App;
