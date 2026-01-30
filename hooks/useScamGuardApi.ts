
import { useState, useCallback } from 'react';
import { Report, NewReportData, SearchCategory } from '../types';

const initialReports: Report[] = [
  {
    id: '1',
    categories: [SearchCategory.EMAIL, SearchCategory.WEBSITE],
    identifiers: {
        [SearchCategory.EMAIL]: 'support@fake-bank.com',
        [SearchCategory.WEBSITE]: 'www.fake-bank.com'
    },
    description: 'Received a phishing email from this address asking for my login details. The website looks convincing but is a fake.',
    evidenceLinks: [],
    status: 'approved',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    scammerInfo: { company: 'Fake Bank Inc.' },
    incidentDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
  },
  {
    id: '2',
    categories: [SearchCategory.MOBILE],
    identifiers: {
        [SearchCategory.MOBILE]: '18005551234'
    },
    description: 'Constant calls from this number claiming I won a prize and need to pay a fee to collect it. They became aggressive when I refused.',
    evidenceLinks: [],
    status: 'approved',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    scammerInfo: { name: 'John Doe (alias)' },
    incidentDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
    {
    id: '3',
    categories: [SearchCategory.SOCIAL],
    identifiers: {
        [SearchCategory.SOCIAL]: 'https://facebook.com/profile/scammer123'
    },
    description: 'This Facebook profile is running a fraudulent investment scheme. They promise high returns but disappear after receiving money.',
    evidenceLinks: [],
    status: 'approved',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    scammerInfo: { name: 'Crypto King' },
    incidentDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 11).toISOString(),
  },
];

// This module-level variable acts as a shared, in-memory database.
const mockDatabaseReports: Report[] = [...initialReports];

export const useScamGuardApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchReports = useCallback(async (query: string): Promise<Report[]> => {
    setLoading(true);
    setError(null);
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          if (!query) {
            resolve([]);
            return;
          }
          const lowerCaseQuery = query.toLowerCase().trim();
          const results = mockDatabaseReports.filter(report =>
            report.status === 'approved' &&
            Object.values(report.identifiers).some(val => typeof val === 'string' && val.toLowerCase().includes(lowerCaseQuery))
          );
          resolve(results);
        } catch (e) {
          setError('An unexpected error occurred during search.');
          resolve([]);
        } finally {
          setLoading(false);
        }
      }, 1000);
    });
  }, []);

  const submitReport = useCallback(async (data: NewReportData): Promise<{success: boolean, newReport: Report | null}> => {
    setLoading(true);
    setError(null);
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
            const newReport: Report = {
                ...data,
                id: String(Date.now()),
                status: 'approved', 
                createdAt: new Date().toISOString(),
                evidenceLinks: [],
            };
            // Add the new report to our shared "database"
            mockDatabaseReports.unshift(newReport); 
            console.log('New report submitted and approved:', newReport);
            resolve({ success: true, newReport });
        } catch (e) {
            setError('Failed to submit report.');
            resolve({ success: false, newReport: null });
        } finally {
            setLoading(false);
        }
      }, 1500);
    });
  }, []);

  return { loading, error, searchReports, submitReport };
};
