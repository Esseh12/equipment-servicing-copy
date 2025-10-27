export type UserRole = 'admin' | 'manager' | 'staff' | 'customer';
export type UserStatus = 'active' | 'inactive' | 'suspended';
export type KYCStatus = 'verified' | 'pending' | 'rejected';
export type StoreType = 'physical' | 'online' | 'hybrid';
export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';
export type PaymentStatus = 'paid' | 'pending' | 'failed';
export type TransactionType = 'credit' | 'debit' | 'transfer' | 'refund';
export type TransactionStatus = 'success' | 'pending' | 'failed';
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
export type ExpenseStatus = 'pending' | 'approved' | 'rejected';
export type TicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  kycStatus: KYCStatus;
  businessName?: string;
  location: string;
  joinDate: string;
  lastLogin: string;
  transactionCount: number;
  totalRevenue: number;
  avatar?: string;
}

export interface Business {
  id: string;
  name: string;
  logo?: string;
  owner: string;
  ownerEmail: string;
  phone: string;
  category: string;
  kycProgress: number;
  verificationStatus: KYCStatus;
  registrationDate: string;
  activeStores: number;
  monthlyRevenue: number;
  status: 'active' | 'inactive';
  cacNumber?: string;
  tinNumber?: string;
  bankAccount?: string;
}

export interface Store {
  id: string;
  name: string;
  image?: string;
  type: StoreType;
  business: string;
  businessId: string;
  location: string;
  address?: string;
  url?: string;
  status: 'active' | 'inactive';
  productCount: number;
  monthlyOrders: number;
  revenue: number;
  manager: string;
}

export interface Order {
  id: string;
  customer: string;
  customerEmail: string;
  store: string;
  storeId: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  date: string;
  deliveryDate?: string;
}

export interface Product {
  id: string;
  name: string;
  image?: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  lowStockThreshold: number;
  status: 'active' | 'inactive';
  storeId: string;
  storeName: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customer: string;
  customerEmail: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  tax: number;
  discount: number;
  total: number;
  status: InvoiceStatus;
  paymentMethod?: string;
  items: Array<{
    description: string;
    quantity: number;
    price: number;
  }>;
}

export interface Expense {
  id: string;
  title: string;
  category: string;
  amount: number;
  submittedBy: string;
  submissionDate: string;
  status: ExpenseStatus;
  receipt?: string;
  approvedBy?: string;
  approvalDate?: string;
  comments?: string;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  from: string;
  to: string;
  status: TransactionStatus;
  date: string;
  reference: string;
  description?: string;
  paymentMethod?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  ipAddress: string;
  userAgent: string;
  status: 'success' | 'failed';
  details?: string;
}

export interface SupportTicket {
  id: string;
  title: string;
  customer: string;
  email: string;
  category: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdDate: string;
  assignedTo?: string;
  lastUpdated: string;
  description: string;
  responses?: number;
}

export interface DashboardMetrics {
  totalUsers: number;
  usersChange: number;
  activeBusinesses: number;
  businessesChange: number;
  dailyTransactions: number;
  transactionsChange: number;
  totalRevenue: number;
  revenueChange: number;
}

export type Screen = 
  | 'dashboard'
  | 'users'
  | 'businesses'
  | 'stores'
  | 'payments'
  | 'orders'
  | 'inventory'
  | 'invoices'
  | 'expenses'
  | 'transactions'
  | 'reports'
  | 'audit'
  | 'support'
  | 'settings';
