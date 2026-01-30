
import React from 'react';
import { EyeIcon, ShieldCheckIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="text-center">
        <ShieldCheckIcon className="mx-auto h-16 w-16 text-primary" />
        <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-primary-dark tracking-tight">About ScamGuard</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
          Our mission is to create a safer digital world by empowering users with the information they need to identify and avoid scams.
        </p>
      </div>

      <div className="mt-12 pt-8 border-t">
        <h2 className="text-3xl font-bold text-center text-primary-dark mb-8">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-4">
            <EyeIcon className="mx-auto h-12 w-12 text-secondary" />
            <h3 className="text-xl font-semibold mt-4 text-slate-800">Transparency</h3>
            <p className="text-slate-600 mt-2">We believe in the power of shared information. All verified reports are made public to help everyone stay informed.</p>
          </div>
          <div className="text-center p-4">
            <UserGroupIcon className="mx-auto h-12 w-12 text-accent" />
            <h3 className="text-xl font-semibold mt-4 text-slate-800">Community</h3>
            <p className="text-slate-600 mt-2">ScamGuard is powered by you. Every report submitted strengthens our collective defense against fraud.</p>
          </div>
          <div className="text-center p-4">
            <ShieldCheckIcon className="mx-auto h-12 w-12 text-danger" />
            <h3 className="text-xl font-semibold mt-4 text-slate-800">Security</h3>
            <p className="text-slate-600 mt-2">We are committed to protecting user data and ensuring a secure platform for reporting and searching.</p>
          </div>
        </div>
      </div>
      
      <div className="mt-12 pt-8 border-t text-slate-700 space-y-4">
        <h2 className="text-3xl font-bold text-center text-primary-dark mb-8">How We Operate</h2>
        <p>
            ScamGuard was founded on a simple principle: knowledge is the best defense against deception. We noticed a growing trend of sophisticated scams targeting individuals and businesses, with victims often feeling isolated and unsure where to turn. Our platform was created to be that central, trustworthy resource.
        </p>
        <p>
            When a user submits a report, our dedicated (simulated) moderation team carefully reviews the evidence and details provided. We verify the claims to ensure the integrity of our database before a report is approved and published. This crucial step helps prevent misuse of the platform and ensures that the information you see is reliable and actionable.
        </p>
        <p>
            We are not a law enforcement agency, but we provide a vital first step in combating fraud: awareness. By making scammer tactics and identifiers public, we disrupt their operations and reduce their chances of finding new victims.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
