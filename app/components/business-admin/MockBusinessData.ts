import type {
  User,
  Business,
  Store,
  Order,
  Product,
  Invoice,
  Expense,
  Transaction,
  AuditLog,
  SupportTicket,
  DashboardMetrics
} from './BusinessAdminTypes';

export const mockMetrics: DashboardMetrics = {
  totalUsers: 12458,
  usersChange: 12.5,
  activeBusinesses: 2847,
  businessesChange: 8.3,
  dailyTransactions: 45623,
  transactionsChange: -2.4,
  totalRevenue: 285430000,
  revenueChange: 15.8
};

export const mockUsers: User[] = [
  {
    id: 'U001',
    name: 'Adebayo Olanrewaju',
    email: 'adebayo.o@example.com',
    phone: '+234 803 456 7890',
    role: 'customer',
    status: 'active',
    kycStatus: 'verified',
    businessName: 'Adebayo Electronics',
    location: 'Lagos',
    joinDate: '15/01/2024',
    lastLogin: '14/01/2025 10:30',
    transactionCount: 145,
    totalRevenue: 12500000
  },
  {
    id: 'U002',
    name: 'Chioma Nwankwo',
    email: 'chioma.n@example.com',
    phone: '+234 805 123 4567',
    role: 'manager',
    status: 'active',
    kycStatus: 'verified',
    businessName: 'Fashion Hub NG',
    location: 'Abuja',
    joinDate: '10/02/2024',
    lastLogin: '14/01/2025 09:15',
    transactionCount: 89,
    totalRevenue: 8750000
  },
  {
    id: 'U003',
    name: 'Ibrahim Musa',
    email: 'ibrahim.m@example.com',
    phone: '+234 807 890 1234',
    role: 'customer',
    status: 'active',
    kycStatus: 'pending',
    location: 'Kano',
    joinDate: '05/03/2024',
    lastLogin: '13/01/2025 16:45',
    transactionCount: 23,
    totalRevenue: 2340000
  },
  {
    id: 'U004',
    name: 'Funke Adeyemi',
    email: 'funke.a@example.com',
    phone: '+234 809 567 8901',
    role: 'staff',
    status: 'active',
    kycStatus: 'verified',
    location: 'Port Harcourt',
    joinDate: '20/04/2024',
    lastLogin: '14/01/2025 08:00',
    transactionCount: 312,
    totalRevenue: 0
  },
  {
    id: 'U005',
    name: 'Tunde Bakare',
    email: 'tunde.b@example.com',
    phone: '+234 802 345 6789',
    role: 'customer',
    status: 'suspended',
    kycStatus: 'rejected',
    location: 'Ibadan',
    joinDate: '12/05/2024',
    lastLogin: '10/01/2025 14:20',
    transactionCount: 5,
    totalRevenue: 450000
  }
];

export const mockBusinesses: Business[] = [
  {
    id: 'B001',
    name: 'Adebayo Electronics',
    owner: 'Adebayo Olanrewaju',
    ownerEmail: 'adebayo.o@example.com',
    phone: '+234 803 456 7890',
    category: 'Electronics & Appliances',
    kycProgress: 100,
    verificationStatus: 'verified',
    registrationDate: '15/01/2024',
    activeStores: 3,
    monthlyRevenue: 12500000,
    status: 'active',
    cacNumber: 'RC-1234567',
    tinNumber: '12345678-0001',
    bankAccount: '0123456789'
  },
  {
    id: 'B002',
    name: 'Fashion Hub NG',
    owner: 'Chioma Nwankwo',
    ownerEmail: 'chioma.n@example.com',
    phone: '+234 805 123 4567',
    category: 'Fashion & Apparel',
    kycProgress: 75,
    verificationStatus: 'pending',
    registrationDate: '10/02/2024',
    activeStores: 2,
    monthlyRevenue: 8750000,
    status: 'active',
    cacNumber: 'RC-2345678',
    tinNumber: '23456789-0001'
  },
  {
    id: 'B003',
    name: 'FreshMart Groceries',
    owner: 'Yemi Adebola',
    ownerEmail: 'yemi.a@example.com',
    phone: '+234 806 789 0123',
    category: 'Groceries & Food',
    kycProgress: 100,
    verificationStatus: 'verified',
    registrationDate: '25/03/2024',
    activeStores: 5,
    monthlyRevenue: 15200000,
    status: 'active',
    cacNumber: 'RC-3456789',
    tinNumber: '34567890-0001',
    bankAccount: '2345678901'
  }
];

export const mockStores: Store[] = [
  {
    id: 'S001',
    name: 'Adebayo Electronics - Ikeja',
    type: 'physical',
    business: 'Adebayo Electronics',
    businessId: 'B001',
    location: 'Ikeja, Lagos',
    address: '45 Allen Avenue, Ikeja, Lagos',
    status: 'active',
    productCount: 234,
    monthlyOrders: 456,
    revenue: 4500000,
    manager: 'Segun Afolabi'
  },
  {
    id: 'S002',
    name: 'Fashion Hub - Online Store',
    type: 'online',
    business: 'Fashion Hub NG',
    businessId: 'B002',
    location: 'Online',
    url: 'https://fashionhub.ng',
    status: 'active',
    productCount: 567,
    monthlyOrders: 789,
    revenue: 6200000,
    manager: 'Chioma Nwankwo'
  },
  {
    id: 'S003',
    name: 'FreshMart Lekki',
    type: 'hybrid',
    business: 'FreshMart Groceries',
    businessId: 'B003',
    location: 'Lekki, Lagos',
    address: '12 Freedom Way, Lekki Phase 1',
    url: 'https://freshmart.ng',
    status: 'active',
    productCount: 1234,
    monthlyOrders: 2345,
    revenue: 8900000,
    manager: 'Tayo Williams'
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-2025-001',
    customer: 'Bola Adekunle',
    customerEmail: 'bola.a@example.com',
    store: 'Adebayo Electronics - Ikeja',
    storeId: 'S001',
    items: [
      { name: 'Samsung 55" TV', quantity: 1, price: 450000 },
      { name: 'HDMI Cable 3m', quantity: 2, price: 5000 }
    ],
    total: 460000,
    status: 'completed',
    paymentStatus: 'paid',
    paymentMethod: 'Card',
    date: '14/01/2025',
    deliveryDate: '16/01/2025'
  },
  {
    id: 'ORD-2025-002',
    customer: 'Emeka Okonkwo',
    customerEmail: 'emeka.o@example.com',
    store: 'Fashion Hub - Online Store',
    storeId: 'S002',
    items: [
      { name: 'Designer Suit', quantity: 1, price: 85000 },
      { name: 'Leather Shoes', quantity: 1, price: 35000 }
    ],
    total: 120000,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'Transfer',
    date: '14/01/2025'
  },
  {
    id: 'ORD-2025-003',
    customer: 'Aisha Ibrahim',
    customerEmail: 'aisha.i@example.com',
    store: 'FreshMart Lekki',
    storeId: 'S003',
    items: [
      { name: 'Rice 50kg', quantity: 2, price: 45000 },
      { name: 'Vegetable Oil 5L', quantity: 3, price: 12000 }
    ],
    total: 126000,
    status: 'pending',
    paymentStatus: 'pending',
    date: '14/01/2025'
  }
];

export const mockProducts: Product[] = [
  {
    id: 'P001',
    name: 'Samsung 55" Smart TV',
    sku: 'SAMS-TV-55-001',
    category: 'Electronics',
    price: 450000,
    stock: 15,
    lowStockThreshold: 5,
    status: 'active',
    storeId: 'S001',
    storeName: 'Adebayo Electronics - Ikeja'
  },
  {
    id: 'P002',
    name: 'Designer Suit',
    sku: 'FASH-SUIT-001',
    category: 'Fashion',
    price: 85000,
    stock: 3,
    lowStockThreshold: 5,
    status: 'active',
    storeId: 'S002',
    storeName: 'Fashion Hub - Online Store'
  },
  {
    id: 'P003',
    name: 'Rice 50kg Bag',
    sku: 'FOOD-RICE-50KG',
    category: 'Groceries',
    price: 45000,
    stock: 120,
    lowStockThreshold: 20,
    status: 'active',
    storeId: 'S003',
    storeName: 'FreshMart Lekki'
  }
];

export const mockInvoices: Invoice[] = [
  {
    id: 'INV001',
    invoiceNumber: 'INV-2025-001',
    customer: 'Bola Adekunle',
    customerEmail: 'bola.a@example.com',
    issueDate: '14/01/2025',
    dueDate: '28/01/2025',
    amount: 460000,
    tax: 34500,
    discount: 0,
    total: 494500,
    status: 'paid',
    paymentMethod: 'Card',
    items: [
      { description: 'Samsung 55" TV', quantity: 1, price: 450000 },
      { description: 'HDMI Cable 3m', quantity: 2, price: 5000 }
    ]
  },
  {
    id: 'INV002',
    invoiceNumber: 'INV-2025-002',
    customer: 'Emeka Okonkwo',
    customerEmail: 'emeka.o@example.com',
    issueDate: '14/01/2025',
    dueDate: '21/01/2025',
    amount: 120000,
    tax: 9000,
    discount: 5000,
    total: 124000,
    status: 'sent',
    items: [
      { description: 'Designer Suit', quantity: 1, price: 85000 },
      { description: 'Leather Shoes', quantity: 1, price: 35000 }
    ]
  }
];

export const mockExpenses: Expense[] = [
  {
    id: 'EXP001',
    title: 'Office Rent - January',
    category: 'Office',
    amount: 500000,
    submittedBy: 'Funke Adeyemi',
    submissionDate: '10/01/2025',
    status: 'approved',
    receipt: 'rent-receipt-jan.pdf',
    approvedBy: 'Chioma Nwankwo',
    approvalDate: '11/01/2025',
    comments: 'Approved - Regular monthly expense'
  },
  {
    id: 'EXP002',
    title: 'Marketing Campaign - Social Media',
    category: 'Marketing',
    amount: 150000,
    submittedBy: 'Segun Afolabi',
    submissionDate: '12/01/2025',
    status: 'pending',
    receipt: 'marketing-invoice.pdf'
  },
  {
    id: 'EXP003',
    title: 'Staff Travel - Lagos to Abuja',
    category: 'Travel',
    amount: 85000,
    submittedBy: 'Tayo Williams',
    submissionDate: '13/01/2025',
    status: 'approved',
    receipt: 'flight-ticket.pdf',
    approvedBy: 'Chioma Nwankwo',
    approvalDate: '14/01/2025'
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: 'TXN-20250114-001',
    type: 'credit',
    amount: 460000,
    from: 'Bola Adekunle',
    to: 'Adebayo Electronics',
    status: 'success',
    date: '14/01/2025 10:30',
    reference: 'REF-20250114-001',
    description: 'Payment for Order ORD-2025-001',
    paymentMethod: 'Card'
  },
  {
    id: 'TXN-20250114-002',
    type: 'credit',
    amount: 120000,
    from: 'Emeka Okonkwo',
    to: 'Fashion Hub NG',
    status: 'success',
    date: '14/01/2025 11:15',
    reference: 'REF-20250114-002',
    description: 'Payment for Order ORD-2025-002',
    paymentMethod: 'Transfer'
  },
  {
    id: 'TXN-20250114-003',
    type: 'refund',
    amount: 85000,
    from: 'FreshMart Groceries',
    to: 'Customer',
    status: 'pending',
    date: '14/01/2025 14:20',
    reference: 'REF-20250114-003',
    description: 'Refund for cancelled order'
  }
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: 'LOG001',
    timestamp: '14/01/2025 10:30:45',
    user: 'admin@accessbank.com',
    action: 'CREATE_USER',
    resource: 'User: U005',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0',
    status: 'success',
    details: 'New customer account created'
  },
  {
    id: 'LOG002',
    timestamp: '14/01/2025 11:15:22',
    user: 'manager@accessbank.com',
    action: 'APPROVE_BUSINESS',
    resource: 'Business: B003',
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0',
    status: 'success',
    details: 'Business KYC verification approved'
  },
  {
    id: 'LOG003',
    timestamp: '14/01/2025 14:20:18',
    user: 'admin@accessbank.com',
    action: 'DELETE_USER',
    resource: 'User: U999',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0',
    status: 'failed',
    details: 'Insufficient permissions'
  }
];

export const mockTickets: SupportTicket[] = [
  {
    id: 'TKT001',
    title: 'Payment not reflecting in account',
    customer: 'Bola Adekunle',
    email: 'bola.a@example.com',
    category: 'Payment Issues',
    priority: 'high',
    status: 'in-progress',
    createdDate: '13/01/2025',
    assignedTo: 'Support Team A',
    lastUpdated: '14/01/2025',
    description: 'Made payment 3 hours ago but order still shows pending',
    responses: 2
  },
  {
    id: 'TKT002',
    title: 'How to add new products to store',
    customer: 'Chioma Nwankwo',
    email: 'chioma.n@example.com',
    category: 'General Inquiry',
    priority: 'low',
    status: 'resolved',
    createdDate: '12/01/2025',
    assignedTo: 'Support Team B',
    lastUpdated: '13/01/2025',
    description: 'Need help understanding the product upload process',
    responses: 4
  },
  {
    id: 'TKT003',
    title: 'Unable to verify business documents',
    customer: 'Ibrahim Musa',
    email: 'ibrahim.m@example.com',
    category: 'KYC Issues',
    priority: 'urgent',
    status: 'open',
    createdDate: '14/01/2025',
    lastUpdated: '14/01/2025',
    description: 'Document upload keeps failing with error message',
    responses: 0
  }
];
