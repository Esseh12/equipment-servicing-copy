// CDMS Bulk Portal Types

export type ActionType = 'Place PND' | 'Lift PND' | 'Place Hold' | 'Release Hold';
export type RequestStatus = 'Pending Authorization' | 'Approved' | 'Rejected' | 'Processing' | 'Completed' | 'Failed';
export type UserRole = 'Initiator' | 'Authorizer' | 'Admin';
export type ValidationStatus = 'Valid' | 'Invalid';

export interface BulkRecord {
  accountNumber: string;
  bvn?: string;
  validationStatus: ValidationStatus;
  remarks?: string;
}

export interface BulkRequest {
  id: string;
  requestId: string;
  fileName: string;
  fileSize: number;
  actionType: ActionType;
  totalRecords: number;
  validRecords: number;
  invalidRecords: number;
  records: BulkRecord[];
  status: RequestStatus;
  submittedBy: string;
  submittedByName: string;
  unit: string;
  dateSubmitted: string;
  authorizedBy?: string;
  authorizedByName?: string;
  dateAuthorized?: string;
  authorizerComments?: string;
  createdAt: string;
  updatedAt: string;
  auditLog: AuditEntry[];
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  userId: string;
  role: UserRole;
  action: string;
  requestId: string;
  actionType?: ActionType;
  details?: string;
  ipAddress?: string;
  duration?: string;
}

export interface User {
  id: string;
  ntid: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  unit: string;
  status: 'Active' | 'Inactive';
  createdOn: string;
  lastLogin?: string;
}

export interface ReportFilter {
  dateFrom?: string;
  dateTo?: string;
  team?: string;
  user?: string;
  actionType?: ActionType;
  status?: RequestStatus;
}

export type CDMSScreen = 
  | 'login'
  | 'upload'
  | 'initiator-history'
  | 'authorization'
  | 'reports'
  | 'user-management'
  | 'audit-trail';

export interface BreadcrumbItem {
  label: string;
  screen: CDMSScreen | string;
  icon: any;
  current: boolean;
  isClickable: boolean;
}
