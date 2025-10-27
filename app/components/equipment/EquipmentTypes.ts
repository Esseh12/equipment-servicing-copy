// Equipment Servicing Types
export type EquipmentType = 'Fire Extinguisher' | 'Smoke Detector' | 'Fire Alarm' | 'Other';
export type ServiceType = 'Auto' | 'Manual';
export type ServiceStatus = 
  | 'Pending'
  | 'Pending Approval'
  | 'Approved'
  | 'Assigned'
  | 'In Progress'
  | 'Completed'
  | 'Overdue'
  | 'Rejected';

export interface ServiceRequest {
  id: string;
  caseId: string;
  branchCode: string;
  branchName: string;
  equipmentType: EquipmentType;
  serviceType: ServiceType;
  status: ServiceStatus;
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  hopName: string;
  hopEmail: string;
  vendorName?: string;
  vendorEmail?: string;
  dateScheduled?: string;
  dateCompleted?: string;
  dateRequested: string;
  reasonForRequest?: string;
  comments?: string;
  allEquipmentServiced?: boolean;
  damageIdentified?: boolean;
  damageDetails?: string;
  equipmentNotServicedDetails?: string;
  jobCompletionFormUrl?: string;
  supportingDocUrl?: string;
  currentStep: 'hop_request' | 'pending_approval' | 'vendor_assigned' | 'vendor_upload' | 'hop_confirm' | 'completed';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  auditLog: AuditEntry[];
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  role: 'HOP' | 'Facility Management' | 'Vendor' | 'System';
  action: string;
  caseId: string;
  branchCode: string;
  serviceType: ServiceType;
  details?: string;
}

export interface Branch {
  code: string;
  name: string;
  zone: string;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  specialization: EquipmentType[];
  phone: string;
}

export interface BreadcrumbItem {
  label: string;
  screen: string;
  icon?: 'home' | null;
  current?: boolean;
  isClickable?: boolean;
}
