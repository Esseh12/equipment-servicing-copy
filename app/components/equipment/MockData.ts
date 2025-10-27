import { ServiceRequest, Branch, Vendor } from './EquipmentTypes';

// Mock branches
export const mockBranches: Branch[] = [
  { code: 'AB001', name: 'Victoria Island Branch', zone: 'Lagos Island' },
  { code: 'AB002', name: 'Ikeja Branch', zone: 'Lagos Mainland' },
  { code: 'AB003', name: 'Lekki Branch', zone: 'Lagos Island' },
  { code: 'AB004', name: 'Surulere Branch', zone: 'Lagos Mainland' },
  { code: 'AB005', name: 'Ikoyi Branch', zone: 'Lagos Island' }
];

// Mock vendors
export const mockVendors: Vendor[] = [
  {
    id: 'VEN001',
    name: 'SafeFire Ltd',
    email: 'operations@safefire.com',
    phone: '+234 803 123 4567',
    specialization: ['Fire Extinguisher']
  },
  {
    id: 'VEN002',
    name: 'Guardian Safety Systems',
    email: 'service@guardiansafety.com',
    phone: '+234 805 987 6543',
    specialization: ['Fire Alarm', 'Smoke Detector']
  },
  {
    id: 'VEN003',
    name: 'SecureGen Power Solutions',
    email: 'support@securegen.com',
    phone: '+234 807 555 0000',
    specialization: ['Other']
  }
];

// Initial mock requests - intentionally empty so we can test the full flow
export const mockServiceRequests: ServiceRequest[] = [];
