import { Entity, SearchResult, AutomationRule, SentimentSummary, Alert, Escalation } from './MediaWatchTypes';

export const mockEntities: Entity[] = [
  {
    id: 'E001',
    name: 'Access Bank Plc',
    category: 'Access Holdings',
    createdDate: '01/10/2025',
    status: 'Active'
  },
  {
    id: 'E002',
    name: 'ABC Ltd',
    category: 'Other Organisation',
    createdDate: '05/10/2025',
    status: 'Active'
  },
  {
    id: 'E003',
    name: 'XYZ Holdings',
    category: 'Obligor',
    createdDate: '12/09/2025',
    status: 'Active'
  },
  {
    id: 'E004',
    name: 'John Doe',
    category: 'Individual',
    createdDate: '20/09/2025',
    status: 'Inactive'
  },
];

export const mockSearchResults: SearchResult[] = [
  {
    id: 'SR001',
    entity: 'Access Bank Plc',
    date: '09/10/2025',
    headline: 'Access Bank expands into East African market',
    sourceUrl: 'https://www.financenews.com/access-expansion',
    sentiment: 'Positive',
    snippet: 'Access Bank Plc announces strategic expansion into Kenya and Tanzania, marking a significant milestone in their pan-African growth strategy.',
    source: 'Financial News Daily'
  },
  {
    id: 'SR002',
    entity: 'XYZ Holdings',
    date: '09/10/2025',
    headline: 'Allegations of financial misconduct under investigation',
    sourceUrl: 'https://www.blog.com/xyz-allegations',
    sentiment: 'Negative',
    snippet: 'XYZ Holdings faces scrutiny as regulators investigate allegations of financial irregularities in recent transactions.',
    source: 'Business Blog'
  },
  {
    id: 'SR003',
    entity: 'Access Bank Plc',
    date: '08/10/2025',
    headline: 'CEO speaks at financial summit on digital banking',
    sourceUrl: 'https://www.businessday.com/access-summit',
    sentiment: 'Positive',
    snippet: 'Access Bank CEO delivers keynote address on the future of digital banking and financial inclusion in Africa.',
    source: 'BusinessDay'
  },
  {
    id: 'SR004',
    entity: 'ABC Ltd',
    date: '10/10/2025',
    headline: 'Company reports quarterly earnings in line with expectations',
    sourceUrl: 'https://www.vanguard.com/abc-earnings',
    sentiment: 'Neutral',
    snippet: 'ABC Ltd announces Q3 earnings that meet analyst expectations, maintaining steady growth trajectory.',
    source: 'Vanguard'
  },
  {
    id: 'SR005',
    entity: 'Access Bank Plc',
    date: '07/10/2025',
    headline: 'Access Bank launches new SME loan program',
    sourceUrl: 'https://www.thenation.com/access-sme',
    sentiment: 'Positive',
    snippet: 'Access Bank introduces innovative loan program targeting small and medium enterprises with competitive rates.',
    source: 'The Nation'
  },
];

export const mockAutomationRules: AutomationRule[] = [
  {
    id: 'AR001',
    frequency: 'Every 6 hours',
    keywords: ['Access Bank', 'Loans', 'Expansion'],
    entities: ['Access Bank Plc'],
    status: 'Active',
    lastRun: '09/10/2025 14:00'
  },
  {
    id: 'AR002',
    frequency: 'Daily',
    keywords: ['Financial misconduct', 'Investigation'],
    entities: ['XYZ Holdings', 'ABC Ltd'],
    status: 'Active',
    lastRun: '09/10/2025 00:00'
  },
  {
    id: 'AR003',
    frequency: 'Weekly',
    keywords: ['Digital banking', 'Innovation'],
    entities: ['Access Bank Plc'],
    status: 'Inactive',
    lastRun: '01/10/2025 00:00'
  },
];

export const mockSentimentSummary: SentimentSummary = {
  totalMentions: 127,
  positivePercent: 62,
  negativePercent: 18,
  neutralPercent: 20
};

export const mockAlerts: Alert[] = [
  {
    id: 'SR002',
    entity: 'XYZ Holdings',
    date: '13/10/2025',
    headline: 'Allegations of financial misconduct under investigation',
    sourceUrl: 'https://www.blog.com/xyz-allegations',
    sentiment: 'Negative',
    snippet: 'XYZ Holdings faces scrutiny as regulators investigate allegations of financial irregularities in recent transactions.',
    source: 'Business Blog',
    isNew: true,
    alertedAt: '13/10/2025 14:00'
  },
  {
    id: 'SR006',
    entity: 'Access Bank Plc',
    date: '13/10/2025',
    headline: 'Customer complaints surge over digital banking glitches',
    sourceUrl: 'https://www.guardian.com/access-complaints',
    sentiment: 'Negative',
    snippet: 'Access Bank customers report widespread issues with mobile app and online banking platform, leading to transaction failures.',
    source: 'The Guardian',
    isNew: true,
    alertedAt: '13/10/2025 08:00'
  },
  {
    id: 'SR001',
    entity: 'Access Bank Plc',
    date: '09/10/2025',
    headline: 'Access Bank expands into East African market',
    sourceUrl: 'https://www.financenews.com/access-expansion',
    sentiment: 'Positive',
    snippet: 'Access Bank Plc announces strategic expansion into Kenya and Tanzania, marking a significant milestone in their pan-African growth strategy.',
    source: 'Financial News Daily',
    isNew: false,
    alertedAt: '09/10/2025 14:00'
  },
  {
    id: 'SR004',
    entity: 'ABC Ltd',
    date: '10/10/2025',
    headline: 'Company reports quarterly earnings in line with expectations',
    sourceUrl: 'https://www.vanguard.com/abc-earnings',
    sentiment: 'Neutral',
    snippet: 'ABC Ltd announces Q3 earnings that meet analyst expectations, maintaining steady growth trajectory.',
    source: 'Vanguard',
    isNew: false,
    alertedAt: '10/10/2025 14:00'
  },
];

export const mockEscalations: Escalation[] = [
  {
    id: 'ESC001',
    searchResultId: 'SR002',
    flaggedBy: 'sarah.johnson@accessbankplc.com',
    flaggedAt: '09/10/2025 15:30',
    comments: 'Serious allegations requiring immediate attention from Communications and Legal teams.',
    status: 'Under Review'
  },
];
