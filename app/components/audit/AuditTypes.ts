export type UserRole = 'manager' | 'supervisor' | 'auditor' | null;

export type RiskRating = 'High' | 'Medium' | 'Low';

export type PlanStatus = 'Draft' | 'Pending' | 'Approved' | 'Rejected';

export type EngagementStatus = 'Not Started' | 'In Progress' | 'Under Review' | 'Completed' | 'Closed';

export type FindingSeverity = 'High' | 'Medium' | 'Low';

export type FindingStatus = 'Open' | 'In Progress' | 'Closed';

export type IssueStatus = 'Open' | 'In Progress' | 'Closed';

export type ReportStatus = 'Draft' | 'Under Review' | 'Approved' | 'Published';

export type AuditPlan = {
  id: string;
  period: string;
  periodType: 'Annual' | 'Quarterly';
  businessUnit: string;
  riskRating: RiskRating;
  lastAuditDate: string;
  proposedDate: string;
  status: PlanStatus;
  supervisor?: string;
  createdBy: string;
  createdDate: string;
  approvedBy?: string;
  approvedDate?: string;
};

export type RiskAssessment = {
  id: string;
  entity: string;
  entityType: 'Branch' | 'Subsidiary' | 'Unit' | 'Department';
  riskFactor: string;
  weight: number;
  score: number;
  rating: RiskRating;
  period: string;
  lastUpdated: string;
  reviewedBy?: string;
};

export type Resource = {
  id: string;
  auditorName: string;
  designation: string;
  skillSet: string[];
  assignedAudit?: string;
  duration?: number; // in days
  budget?: number;
  utilization: number; // percentage
  availableFrom?: string;
};

export type AuditEngagement = {
  id: string;
  title: string;
  businessUnit: string;
  linkedPlanId?: string;
  startDate: string;
  endDate: string;
  status: EngagementStatus;
  supervisor: string;
  teamMembers: string[];
  auditProgram?: string; // file reference
  createdBy: string;
  createdDate: string;
  approvedBy?: string;
  approvedDate?: string;
};

export type FieldworkProgress = {
  id: string;
  engagementId: string;
  auditArea: string;
  auditor: string;
  progress: number; // percentage
  issuesRaised: number;
  reviewStatus: 'Not Started' | 'Awaiting Review' | 'Reviewed' | 'Approved';
  comments?: string;
  lastUpdated: string;
};

export type Finding = {
  id: string;
  engagementId: string;
  engagementTitle: string;
  title: string;
  description: string;
  severity: FindingSeverity;
  status: FindingStatus;
  raisedBy: string;
  raisedDate: string;
  evidence?: string[]; // file references
  reviewedBy?: string;
  reviewedDate?: string;
  closedDate?: string;
};

export type AuditReport = {
  id: string;
  title: string;
  engagementId: string;
  engagementTitle: string;
  dateCreated: string;
  version: string;
  status: ReportStatus;
  preparedBy: string;
  reviewedBy?: string;
  approvedBy?: string;
  executiveSummary?: string;
  keyFindings?: string[];
  recommendations?: string[];
  riskImpact?: string;
  comments?: Comment[];
};

export type Comment = {
  id: string;
  author: string;
  role: UserRole;
  text: string;
  timestamp: string;
};

export type Issue = {
  id: string;
  findingId?: string;
  description: string;
  businessUnit: string;
  assignedTo: string;
  dueDate: string;
  status: IssueStatus;
  priority: 'High' | 'Medium' | 'Low';
  evidence?: string[]; // file references
  createdBy: string;
  createdDate: string;
  validatedBy?: string;
  closedDate?: string;
};

export type Screen = 
  | 'login'
  | 'dashboard'
  | 'planning'
  | 'risk-assessment'
  | 'resources'
  | 'engagements'
  | 'fieldwork'
  | 'findings'
  | 'reports'
  | 'issues';
