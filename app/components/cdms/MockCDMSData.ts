import { BulkRequest, User, AuditEntry } from './CDMSTypes';

export const mockUsers: User[] = [
  {
    id: 'USR001',
    ntid: 'john.adebayo',
    fullName: 'John Adebayo',
    email: 'john.adebayo@accessbankplc.com',
    phone: '+234 801 234 5678',
    role: 'Initiator',
    unit: 'Retail Banking',
    status: 'Active',
    createdOn: '2024-01-15',
    lastLogin: '2025-02-10T14:30:00'
  },
  {
    id: 'USR002',
    ntid: 'sarah.okonkwo',
    fullName: 'Sarah Okonkwo',
    email: 'sarah.okonkwo@accessbankplc.com',
    phone: '+234 802 345 6789',
    role: 'Authorizer',
    unit: 'Operations',
    status: 'Active',
    createdOn: '2024-01-20',
    lastLogin: '2025-02-10T15:45:00'
  },
  {
    id: 'USR003',
    ntid: 'admin.user',
    fullName: 'Admin User',
    email: 'admin@accessbankplc.com',
    phone: '+234 803 456 7890',
    role: 'Admin',
    unit: 'IT Department',
    status: 'Active',
    createdOn: '2024-01-10',
    lastLogin: '2025-02-10T16:00:00'
  }
];

export const mockBulkRequests: BulkRequest[] = [
  {
    id: 'REQ001',
    requestId: 'CDMS-2025-001',
    fileName: 'PND_January_2025.xlsx',
    fileSize: 45600,
    actionType: 'Place PND',
    totalRecords: 125,
    validRecords: 123,
    invalidRecords: 2,
    records: [
      {
        accountNumber: '0012345678',
        bvn: '22333444551',
        validationStatus: 'Valid'
      },
      {
        accountNumber: '0012345679',
        bvn: '22333444552',
        validationStatus: 'Valid'
      },
      {
        accountNumber: '0012345680',
        validationStatus: 'Invalid',
        remarks: 'Missing BVN'
      }
    ],
    status: 'Pending Authorization',
    submittedBy: 'john.adebayo',
    submittedByName: 'John Adebayo',
    unit: 'Retail Banking',
    dateSubmitted: new Date().toISOString().split('T')[0],
    createdAt: '2025-02-10T10:30:00',
    updatedAt: '2025-02-10T10:30:00',
    auditLog: [
      {
        id: 'AUD001',
        timestamp: '2025-02-10T10:30:00',
        user: 'John Adebayo',
        userId: 'john.adebayo',
        role: 'Initiator',
        action: 'File Uploaded',
        requestId: 'CDMS-2025-001',
        actionType: 'Place PND',
        details: 'Uploaded PND_January_2025.xlsx with 125 records',
        ipAddress: '192.168.1.100',
        duration: '2s'
      },
      {
        id: 'AUD002',
        timestamp: '2025-02-10T10:30:15',
        user: 'System',
        userId: 'SYSTEM',
        role: 'Admin',
        action: 'File Validated',
        requestId: 'CDMS-2025-001',
        details: '123 valid records, 2 invalid records',
        duration: '3s'
      },
      {
        id: 'AUD003',
        timestamp: '2025-02-10T10:31:00',
        user: 'John Adebayo',
        userId: 'john.adebayo',
        role: 'Initiator',
        action: 'Submitted for Authorization',
        requestId: 'CDMS-2025-001',
        actionType: 'Place PND',
        details: 'Request submitted to Authorizer queue',
        ipAddress: '192.168.1.100'
      }
    ]
  },
  {
    id: 'REQ002',
    requestId: 'CDMS-2025-002',
    fileName: 'Hold_Release_Feb.xlsx',
    fileSize: 32400,
    actionType: 'Release Hold',
    totalRecords: 92,
    validRecords: 90,
    invalidRecords: 2,
    records: [
      {
        accountNumber: '0098765432',
        bvn: '55444333221',
        validationStatus: 'Valid'
      },
      {
        accountNumber: '0098765433',
        bvn: '55444333222',
        validationStatus: 'Valid'
      }
    ],
    status: 'Approved',
    submittedBy: 'john.adebayo',
    submittedByName: 'John Adebayo',
    unit: 'Retail Banking',
    dateSubmitted: '2025-02-09',
    authorizedBy: 'sarah.okonkwo',
    authorizedByName: 'Sarah Okonkwo',
    dateAuthorized: '2025-02-09T16:45:00',
    authorizerComments: 'Approved - All validations passed',
    createdAt: '2025-02-09T14:20:00',
    updatedAt: '2025-02-09T16:45:00',
    auditLog: [
      {
        id: 'AUD004',
        timestamp: '2025-02-09T14:20:00',
        user: 'John Adebayo',
        userId: 'john.adebayo',
        role: 'Initiator',
        action: 'File Uploaded',
        requestId: 'CDMS-2025-002',
        actionType: 'Release Hold',
        details: 'Uploaded Hold_Release_Feb.xlsx with 92 records',
        ipAddress: '192.168.1.100',
        duration: '1s'
      },
      {
        id: 'AUD005',
        timestamp: '2025-02-09T16:45:00',
        user: 'Sarah Okonkwo',
        userId: 'sarah.okonkwo',
        role: 'Authorizer',
        action: 'Request Approved',
        requestId: 'CDMS-2025-002',
        actionType: 'Release Hold',
        details: 'Approved - All validations passed',
        ipAddress: '192.168.1.105',
        duration: '45s'
      }
    ]
  },
  {
    id: 'REQ003',
    requestId: 'CDMS-2025-003',
    fileName: 'Place_Hold_Corporate.xlsx',
    fileSize: 52800,
    actionType: 'Place Hold',
    totalRecords: 156,
    validRecords: 154,
    invalidRecords: 2,
    records: [
      {
        accountNumber: '0055667788',
        bvn: '99887766551',
        validationStatus: 'Valid'
      },
      {
        accountNumber: '0055667789',
        bvn: '99887766552',
        validationStatus: 'Valid'
      },
      {
        accountNumber: '0055667790',
        validationStatus: 'Invalid',
        remarks: 'Account not found'
      }
    ],
    status: 'Pending Authorization',
    submittedBy: 'john.adebayo',
    submittedByName: 'John Adebayo',
    unit: 'Retail Banking',
    dateSubmitted: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    auditLog: [
      {
        id: 'AUD006',
        timestamp: new Date().toISOString(),
        user: 'John Adebayo',
        userId: 'john.adebayo',
        role: 'Initiator',
        action: 'File Uploaded',
        requestId: 'CDMS-2025-003',
        actionType: 'Place Hold',
        details: 'Uploaded Place_Hold_Corporate.xlsx with 156 records',
        ipAddress: '192.168.1.100',
        duration: '2s'
      }
    ]
  }
];

export const mockAuditEntries: AuditEntry[] = mockBulkRequests.flatMap(req => req.auditLog);

export const units = [
  'Retail Banking',
  'Operations',
  'Corporate Banking',
  'IT Department',
  'Compliance',
  'Risk Management'
];
