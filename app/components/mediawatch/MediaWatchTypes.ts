export type UserRole = 'analyst' | 'admin' | 'risk-officer' | null;

export type SentimentType = 'Positive' | 'Negative' | 'Neutral';

export type EntityCategory = 'Access Holdings' | 'Other Organisation' | 'Obligor' | 'Individual';

export type SearchFrequency = 'Every 6 hours' | 'Daily' | 'Weekly' | 'Monthly';

export type Entity = {
  id: string;
  name: string;
  category: EntityCategory;
  createdDate: string;
  status: 'Active' | 'Inactive';
};

export type SearchResult = {
  id: string;
  entity: string;
  date: string;
  headline: string;
  sourceUrl: string;
  sentiment: SentimentType;
  snippet?: string;
  source?: string;
};

export type AutomationRule = {
  id: string;
  frequency: SearchFrequency;
  keywords: string[];
  entities: string[];
  status: 'Active' | 'Inactive';
  lastRun?: string;
};

export type SentimentSummary = {
  totalMentions: number;
  positivePercent: number;
  negativePercent: number;
  neutralPercent: number;
};

export type BulkUploadRow = {
  row: number;
  entity: string;
  category: EntityCategory | string;
  status: 'Valid' | 'Invalid';
  remark: string;
};

export type Alert = SearchResult & {
  isNew: boolean;
  alertedAt: string;
};

export type Escalation = {
  id: string;
  searchResultId: string;
  flaggedBy: string;
  flaggedAt: string;
  comments: string;
  status: 'Pending' | 'Under Review' | 'Resolved';
};

export type Screen = 
  | 'login'
  | 'alerts'
  | 'search'
  | 'settings'
  | 'entities'
  | 'reports';
