import type {
  AuditPlan,
  RiskAssessment,
  Resource,
  AuditEngagement,
  FieldworkProgress,
  Finding,
  AuditReport,
  Issue
} from './AuditTypes';

export const mockAuditPlans: AuditPlan[] = [
  {
    id: 'AP001',
    period: 'FY 2025',
    periodType: 'Annual',
    businessUnit: 'Retail Banking',
    riskRating: 'High',
    lastAuditDate: '15/01/2024',
    proposedDate: '15/02/2025',
    status: 'Approved',
    supervisor: 'John Okafor',
    createdBy: 'Sarah Adeyemi',
    createdDate: '10/01/2025',
    approvedBy: 'David Chen',
    approvedDate: '12/01/2025'
  },
  {
    id: 'AP002',
    period: 'FY 2025',
    periodType: 'Annual',
    businessUnit: 'Treasury Operations',
    riskRating: 'Medium',
    lastAuditDate: '20/11/2024',
    proposedDate: '15/03/2025',
    status: 'Approved',
    supervisor: 'Grace Okoro',
    createdBy: 'Sarah Adeyemi',
    createdDate: '10/01/2025',
    approvedBy: 'David Chen',
    approvedDate: '12/01/2025'
  },
  {
    id: 'AP003',
    period: 'Q1 2025',
    periodType: 'Quarterly',
    businessUnit: 'IT Security & Compliance',
    riskRating: 'High',
    lastAuditDate: '05/09/2024',
    proposedDate: '01/04/2025',
    status: 'Pending',
    supervisor: 'Peter Nwosu',
    createdBy: 'Sarah Adeyemi',
    createdDate: '12/01/2025'
  },
  {
    id: 'AP004',
    period: 'FY 2025',
    periodType: 'Annual',
    businessUnit: 'Corporate Banking',
    riskRating: 'Medium',
    lastAuditDate: '18/02/2024',
    proposedDate: '20/05/2025',
    status: 'Draft',
    createdBy: 'John Okafor',
    createdDate: '13/01/2025'
  },
  {
    id: 'AP005',
    period: 'FY 2025',
    periodType: 'Annual',
    businessUnit: 'Risk Management',
    riskRating: 'High',
    lastAuditDate: '10/03/2024',
    proposedDate: '15/06/2025',
    status: 'Pending',
    supervisor: 'Grace Okoro',
    createdBy: 'Sarah Adeyemi',
    createdDate: '14/01/2025'
  }
];

export const mockRiskAssessments: RiskAssessment[] = [
  {
    id: 'RA001',
    entity: 'Access Bank HQ',
    entityType: 'Branch',
    riskFactor: 'Regulatory Compliance',
    weight: 25,
    score: 3.8,
    rating: 'High',
    period: 'FY 2025',
    lastUpdated: '10/01/2025',
    reviewedBy: 'John Okafor'
  },
  {
    id: 'RA002',
    entity: 'Access Pension',
    entityType: 'Subsidiary',
    riskFactor: 'Financial Control',
    weight: 15,
    score: 2.0,
    rating: 'Medium',
    period: 'FY 2025',
    lastUpdated: '10/01/2025',
    reviewedBy: 'John Okafor'
  },
  {
    id: 'RA003',
    entity: 'Treasury Department',
    entityType: 'Department',
    riskFactor: 'Operational Risk',
    weight: 20,
    score: 3.5,
    rating: 'High',
    period: 'FY 2025',
    lastUpdated: '11/01/2025',
    reviewedBy: 'Grace Okoro'
  },
  {
    id: 'RA004',
    entity: 'IT Security Unit',
    entityType: 'Unit',
    riskFactor: 'Cybersecurity',
    weight: 30,
    score: 4.2,
    rating: 'High',
    period: 'Q1 2025',
    lastUpdated: '12/01/2025',
    reviewedBy: 'Peter Nwosu'
  },
  {
    id: 'RA005',
    entity: 'Lagos Island Branch',
    entityType: 'Branch',
    riskFactor: 'Cash Management',
    weight: 15,
    score: 1.8,
    rating: 'Low',
    period: 'FY 2025',
    lastUpdated: '12/01/2025'
  }
];

export const mockResources: Resource[] = [
  {
    id: 'R001',
    auditorName: 'John Okafor',
    designation: 'Senior Auditor',
    skillSet: ['IT Audit', 'Risk Assessment', 'Compliance'],
    assignedAudit: 'Core Banking System Review',
    duration: 10,
    budget: 1500000,
    utilization: 75
  },
  {
    id: 'R002',
    auditorName: 'Grace Okoro',
    designation: 'Senior Auditor',
    skillSet: ['Financial Audit', 'Treasury Operations', 'Internal Controls'],
    assignedAudit: 'Treasury Operations Audit',
    duration: 8,
    budget: 1200000,
    utilization: 60
  },
  {
    id: 'R003',
    auditorName: 'Peter Nwosu',
    designation: 'Audit Manager',
    skillSet: ['Cybersecurity', 'IT Governance', 'Data Privacy'],
    utilization: 40,
    availableFrom: '01/03/2025'
  },
  {
    id: 'R004',
    auditorName: 'Amina Bello',
    designation: 'Junior Auditor',
    skillSet: ['Process Review', 'Documentation', 'Testing'],
    assignedAudit: 'Branch Operations Review',
    duration: 5,
    budget: 750000,
    utilization: 50
  },
  {
    id: 'R005',
    auditorName: 'Tunde Adebayo',
    designation: 'Senior Auditor',
    skillSet: ['Risk Management', 'Operational Audit', 'Fraud Detection'],
    utilization: 30,
    availableFrom: '15/02/2025'
  }
];

export const mockEngagements: AuditEngagement[] = [
  {
    id: 'ENG001',
    title: 'Core Banking System Review',
    businessUnit: 'Technology',
    linkedPlanId: 'AP001',
    startDate: '01/02/2025',
    endDate: '28/02/2025',
    status: 'In Progress',
    supervisor: 'John Okafor',
    teamMembers: ['Grace Okoro', 'Amina Bello'],
    createdBy: 'John Okafor',
    createdDate: '15/01/2025',
    approvedBy: 'Sarah Adeyemi',
    approvedDate: '18/01/2025'
  },
  {
    id: 'ENG002',
    title: 'Treasury Operations Audit',
    businessUnit: 'Treasury',
    linkedPlanId: 'AP002',
    startDate: '10/03/2025',
    endDate: '31/03/2025',
    status: 'Not Started',
    supervisor: 'Grace Okoro',
    teamMembers: ['Peter Nwosu', 'Tunde Adebayo'],
    createdBy: 'Grace Okoro',
    createdDate: '16/01/2025',
    approvedBy: 'Sarah Adeyemi',
    approvedDate: '19/01/2025'
  },
  {
    id: 'ENG003',
    title: 'Retail Banking Branch Audit',
    businessUnit: 'Retail Banking',
    linkedPlanId: 'AP001',
    startDate: '15/02/2025',
    endDate: '15/03/2025',
    status: 'In Progress',
    supervisor: 'Peter Nwosu',
    teamMembers: ['Amina Bello', 'John Okafor'],
    createdBy: 'Peter Nwosu',
    createdDate: '17/01/2025',
    approvedBy: 'Sarah Adeyemi',
    approvedDate: '20/01/2025'
  },
  {
    id: 'ENG004',
    title: 'Cybersecurity Assessment',
    businessUnit: 'IT Security',
    linkedPlanId: 'AP003',
    startDate: '01/04/2025',
    endDate: '30/04/2025',
    status: 'Not Started',
    supervisor: 'Peter Nwosu',
    teamMembers: ['John Okafor'],
    createdBy: 'Peter Nwosu',
    createdDate: '18/01/2025'
  }
];

export const mockFieldwork: FieldworkProgress[] = [
  {
    id: 'FW001',
    engagementId: 'ENG001',
    auditArea: 'Loan Verification Process',
    auditor: 'Grace Okoro',
    progress: 75,
    issuesRaised: 3,
    reviewStatus: 'Awaiting Review',
    lastUpdated: '13/01/2025'
  },
  {
    id: 'FW002',
    engagementId: 'ENG001',
    auditArea: 'IT Access Controls',
    auditor: 'John Okafor',
    progress: 100,
    issuesRaised: 1,
    reviewStatus: 'Reviewed',
    comments: 'All tests completed. One critical finding identified.',
    lastUpdated: '13/01/2025'
  },
  {
    id: 'FW003',
    engagementId: 'ENG003',
    auditArea: 'Cash Management',
    auditor: 'Amina Bello',
    progress: 50,
    issuesRaised: 2,
    reviewStatus: 'Awaiting Review',
    lastUpdated: '14/01/2025'
  },
  {
    id: 'FW004',
    engagementId: 'ENG003',
    auditArea: 'Customer Onboarding',
    auditor: 'Peter Nwosu',
    progress: 90,
    issuesRaised: 0,
    reviewStatus: 'Reviewed',
    comments: 'Process well controlled. No major issues.',
    lastUpdated: '14/01/2025'
  }
];

export const mockFindings: Finding[] = [
  {
    id: 'FND001',
    engagementId: 'ENG001',
    engagementTitle: 'Core Banking System Review',
    title: 'Weak Password Policy Implementation',
    description: 'The current password policy allows passwords with fewer than 8 characters and does not enforce complexity requirements. This creates a significant security vulnerability.',
    severity: 'High',
    status: 'Open',
    raisedBy: 'John Okafor',
    raisedDate: '05/02/2025',
    evidence: ['password-policy-screenshot.pdf', 'configuration-report.pdf']
  },
  {
    id: 'FND002',
    engagementId: 'ENG001',
    engagementTitle: 'Core Banking System Review',
    title: 'Inadequate Access Logging',
    description: 'System logs do not capture sufficient detail on user access activities, making it difficult to trace unauthorized access attempts.',
    severity: 'Medium',
    status: 'In Progress',
    raisedBy: 'Grace Okoro',
    raisedDate: '06/02/2025',
    reviewedBy: 'John Okafor',
    reviewedDate: '08/02/2025'
  },
  {
    id: 'FND003',
    engagementId: 'ENG003',
    engagementTitle: 'Retail Banking Branch Audit',
    title: 'Cash Reconciliation Discrepancies',
    description: 'Daily cash reconciliation reports show frequent discrepancies exceeding ₦50,000 without proper investigation or documentation.',
    severity: 'High',
    status: 'Open',
    raisedBy: 'Amina Bello',
    raisedDate: '18/02/2025'
  },
  {
    id: 'FND004',
    engagementId: 'ENG003',
    engagementTitle: 'Retail Banking Branch Audit',
    title: 'Missing KYC Documentation',
    description: 'Review of 50 customer files revealed 8 files with incomplete KYC documentation, including missing identification documents.',
    severity: 'Medium',
    status: 'Closed',
    raisedBy: 'Peter Nwosu',
    raisedDate: '20/02/2025',
    reviewedBy: 'Peter Nwosu',
    reviewedDate: '22/02/2025',
    closedDate: '25/02/2025'
  }
];

export const mockReports: AuditReport[] = [
  {
    id: 'REP001',
    title: 'Q4 2024 Retail Banking Audit Report',
    engagementId: 'ENG001',
    engagementTitle: 'Core Banking System Review',
    dateCreated: '09/03/2025',
    version: 'v1.2',
    status: 'Under Review',
    preparedBy: 'John Okafor',
    reviewedBy: 'Sarah Adeyemi',
    executiveSummary: 'The audit of Core Banking System revealed several areas requiring immediate attention, particularly in access controls and password management.',
    keyFindings: [
      'Weak password policy implementation',
      'Inadequate access logging',
      'Lack of regular security assessments'
    ],
    riskImpact: 'High - Potential for unauthorized access and data breaches',
    comments: [
      {
        id: 'C001',
        author: 'Sarah Adeyemi',
        role: 'manager',
        text: 'Please expand the recommendations section to include specific timelines and responsible parties.',
        timestamp: '10/03/2025 14:30'
      }
    ]
  },
  {
    id: 'REP002',
    title: 'Treasury Operations Audit Report - Draft',
    engagementId: 'ENG002',
    engagementTitle: 'Treasury Operations Audit',
    dateCreated: '15/03/2025',
    version: 'v1.0',
    status: 'Draft',
    preparedBy: 'Grace Okoro',
    executiveSummary: 'Preliminary review of treasury operations shows generally adequate controls with minor improvements needed.',
    keyFindings: [
      'Manual reconciliation processes',
      'Delayed reporting of exceptions'
    ],
    riskImpact: 'Medium - Operational efficiency can be improved'
  },
  {
    id: 'REP003',
    title: 'Branch Operations Audit Report',
    engagementId: 'ENG003',
    engagementTitle: 'Retail Banking Branch Audit',
    dateCreated: '01/03/2025',
    version: 'v2.0',
    status: 'Approved',
    preparedBy: 'Peter Nwosu',
    reviewedBy: 'John Okafor',
    approvedBy: 'Sarah Adeyemi',
    executiveSummary: 'Branch operations audit identified control weaknesses in cash management and customer documentation processes.',
    keyFindings: [
      'Cash reconciliation discrepancies',
      'Missing KYC documentation',
      'Inadequate segregation of duties'
    ],
    riskImpact: 'High - Risk of fraud and regulatory non-compliance'
  }
];

export const mockIssues: Issue[] = [
  {
    id: 'ISS001',
    findingId: 'FND001',
    description: 'Implement strong password policy with minimum 12 characters, complexity requirements, and regular password changes',
    businessUnit: 'IT Department',
    assignedTo: 'IT Security Team',
    dueDate: '15/04/2025',
    status: 'In Progress',
    priority: 'High',
    createdBy: 'John Okafor',
    createdDate: '06/02/2025'
  },
  {
    id: 'ISS002',
    findingId: 'FND002',
    description: 'Enhance system logging to capture detailed user access activities including failed login attempts and privilege escalations',
    businessUnit: 'IT Department',
    assignedTo: 'Core Banking Team',
    dueDate: '30/04/2025',
    status: 'In Progress',
    priority: 'Medium',
    createdBy: 'Grace Okoro',
    createdDate: '08/02/2025'
  },
  {
    id: 'ISS003',
    findingId: 'FND003',
    description: 'Establish formal investigation process for cash discrepancies exceeding ₦10,000 with mandatory documentation',
    businessUnit: 'Retail Banking',
    assignedTo: 'Branch Operations',
    dueDate: '15/03/2025',
    status: 'Open',
    priority: 'High',
    createdBy: 'Amina Bello',
    createdDate: '18/02/2025'
  },
  {
    id: 'ISS004',
    findingId: 'FND004',
    description: 'Complete missing KYC documentation and implement monthly KYC compliance reviews',
    businessUnit: 'Retail Banking',
    assignedTo: 'Customer Service',
    dueDate: '01/03/2025',
    status: 'Closed',
    priority: 'Medium',
    createdBy: 'Peter Nwosu',
    createdDate: '20/02/2025',
    validatedBy: 'Peter Nwosu',
    closedDate: '25/02/2025',
    evidence: ['kyc-completion-report.pdf']
  }
];
