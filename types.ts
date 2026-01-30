
export enum SearchCategory {
  MOBILE = 'Mobile Number',
  EMAIL = 'Email Address',
  NAME = 'Full Name',
  COMPANY = 'Company Name',
  WEBSITE = 'Website',
  SOCIAL = 'Social Media URL',
  IMEI = 'Mobile IMEI',
}

export interface Report {
  id: string;
  categories: SearchCategory[];
  identifiers: { [key in SearchCategory]?: string };
  description: string;
  evidenceLinks: string[];
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  scammerInfo: {
    name?: string;
    company?: string;
  };
  incidentDate: string;
}

export interface NewReportData {
  categories: SearchCategory[];
  identifiers: { [key in SearchCategory]?: string };
  description: string;
  scammerInfo: {
    name?: string;
    company?: string;
  };
  incidentDate: string;
}
