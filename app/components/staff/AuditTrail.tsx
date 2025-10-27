import { useState } from 'react';
import { ServiceCentralLayout } from '../ServiceCentralLayout';
import { BreadcrumbNavigation } from '../shared/BreadcrumbNavigation';
import { Input } from '../ui/input';
import { Users, TrendingUp, Lock, Search, ChevronDown, Filter } from 'lucide-react';
import accessLogo from 'figma:asset/3ebf5c44175bf36c1eceb7236d272904dfc164a1.png';
import type { BreadcrumbItem, Screen } from '../../App';

interface AuditTrailProps {
  onBack: () => void;
  breadcrumbs: BreadcrumbItem[];
  onBreadcrumbClick: (screen: Screen) => void;
}

// Sidebar Navigation for Staff
function SidebarContent() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="h-[65px] border-b border-[#d0d5dd] flex items-center px-[16px]">
        <div className="flex items-center gap-[10px]">
          <img src={accessLogo} alt="Access Bank" className="h-8" />
          <div>
            <h1 className="font-['Inter:Bold',_sans-serif] font-bold text-[18px] text-[#003883] leading-[22px]">
              Service Central
            </h1>
            <p className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#526484] leading-[16px]">
              Staff Portal
            </p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="px-[16px] py-[16px] border-b border-[#d0d5dd]">
        <div className="font-['Inter:Bold',_sans-serif] font-bold text-[18px] text-[#003883] leading-[30px]">
          Staff Portal
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-[12px] py-[8px]">
        <div className="flex flex-col gap-[8px]">
          {/* KPA Collections */}
          <div className="h-[44px] rounded-[6px] flex items-center px-[12px] gap-[12px] hover:bg-[#ebeef2] cursor-pointer">
            <Users className="h-[20px] w-[20px] text-[#526484]" />
            <span className="font-['DM_Sans:Bold',_sans-serif] font-bold text-[15px] text-[#526484] leading-[20px] tracking-[0.15px]">
              KPA Collections
            </span>
          </div>

          {/* Audit Trail - Active */}
          <div className="bg-[#ebeef2] h-[44px] rounded-[6px] flex items-center px-[12px] gap-[12px]">
            <TrendingUp className="h-[20px] w-[20px] text-[#003883]" />
            <span className="font-['DM_Sans:Bold',_sans-serif] font-bold text-[15px] text-[#003883] leading-[20px] tracking-[0.15px]">
              Audit Trail
            </span>
          </div>
        </div>
      </div>

      {/* Security Indicator */}
      <div className="px-[16px] py-[12px] border-t border-[#d0d5dd] bg-[#f9fafb]">
        <div className="flex items-center gap-[8px]">
          <Lock className="h-[16px] w-[16px] text-[#21a366]" />
          <span className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#21a366] leading-[16px]">
            SSL/TLS Secured
          </span>
        </div>
      </div>
    </div>
  );
}

// Header Content
function HeaderContent() {
  return (
    <div className="h-full flex items-center justify-between px-[24px]">
      {/* Empty for now */}
    </div>
  );
}

// Mock audit trail data
const mockAuditData = [
  {
    id: '1',
    timestamp: '2025-09-29 14:32',
    userId: 'TLR023',
    role: 'Teller',
    eslipRef: 'KPA8765432',
    accountNo: '1234****5678',
    actionPerformed: 'Payment Initiated',
    status: 'Success' as const,
    systemComponent: 'Teller Interface',
    errorCode: '–',
    branchCode: 'BRN001',
    approval: 'N/A'
  },
  {
    id: '2',
    timestamp: '2025-09-29 14:28',
    userId: 'TLR023',
    role: 'Teller',
    eslipRef: 'KPA7654321',
    accountNo: '2345****6789',
    actionPerformed: 'Payment Completed',
    status: 'Success' as const,
    systemComponent: 'Core Banking',
    errorCode: '–',
    branchCode: 'BRN001',
    approval: 'AUTO'
  },
  {
    id: '3',
    timestamp: '2025-09-29 14:15',
    userId: 'ADM001',
    role: 'Administrator',
    eslipRef: '–',
    accountNo: '–',
    actionPerformed: 'User Session Login',
    status: 'Success' as const,
    systemComponent: 'Authentication',
    errorCode: '–',
    branchCode: 'BRN001',
    approval: 'N/A'
  },
  {
    id: '4',
    timestamp: '2025-09-29 13:45',
    userId: 'TLR023',
    role: 'Teller',
    eslipRef: 'KPA5432109',
    accountNo: '3456****7890',
    actionPerformed: 'Payment Failed',
    status: 'Failed' as const,
    systemComponent: 'Payment Gateway',
    errorCode: 'PG001',
    branchCode: 'BRN001',
    approval: 'N/A'
  },
  {
    id: '5',
    timestamp: '2025-09-29 13:30',
    userId: 'SUP005',
    role: 'Supervisor',
    eslipRef: 'KPA6543210',
    accountNo: '4567****8901',
    actionPerformed: 'Transaction Override',
    status: 'Success' as const,
    systemComponent: 'Teller Interface',
    errorCode: '–',
    branchCode: 'BRN001',
    approval: 'SUP001'
  },
  {
    id: '6',
    timestamp: '2025-09-29 12:58',
    userId: 'TLR023',
    role: 'Teller',
    eslipRef: 'KPA3210987',
    accountNo: '5678****9012',
    actionPerformed: 'Account Validation',
    status: 'Success' as const,
    systemComponent: 'Core Banking',
    errorCode: '–',
    branchCode: 'BRN001',
    approval: 'N/A'
  }
];

// Main Content
function MainContent({ breadcrumbs, onBreadcrumbClick }: AuditTrailProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const statusOptions = ['All Status', 'Success', 'Failed'];
  const roleOptions = ['All Roles', 'Teller', 'Supervisor', 'Administrator'];

  const filteredAuditData = mockAuditData.filter(entry => {
    const matchesSearch = entry.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.eslipRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.actionPerformed.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.accountNo.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'All Status' || entry.status === statusFilter;
    const matchesRole = roleFilter === 'All Roles' || entry.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  return (
    <div className="w-full h-full bg-white overflow-y-auto">
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        {/* Breadcrumbs */}
        <BreadcrumbNavigation 
          breadcrumbs={breadcrumbs}
          onBreadcrumbClick={onBreadcrumbClick}
        />

        {/* Page Title */}
        <div className="flex flex-col gap-[4px] mb-6 lg:mb-8">
          <h1 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[24px] lg:text-[30px] text-[#101828] leading-[32px] lg:leading-[38px]">
            Audit Trail
          </h1>
          <p className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] lg:text-[16px] text-[#475467] leading-[20px] lg:leading-[24px]">
            Track and monitor all system activities and user actions
          </p>
        </div>

        {/* Filters Bar */}
        <div className="bg-gray-50 rounded-[12px] p-4 lg:p-[20px] mb-6">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-[16px]">
            {/* Search */}
            <div className="flex-1">
              <label className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#344054] leading-[20px] block mb-2">
                Search
              </label>
              <div className="bg-white rounded-[8px] border border-[#d0d5dd] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
                <div className="flex items-center px-[14px] py-[10px]">
                  <Search className="h-[20px] w-[20px] text-[#667085] mr-[8px]" />
                  <Input 
                    placeholder="Search by User ID, E-slip, or Action"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 border-0 outline-none bg-transparent font-['Inter:Regular',_sans-serif] font-normal text-[16px] text-[#667085] placeholder:text-[#667085]"
                  />
                </div>
              </div>
            </div>
            
            {/* Status Filter */}
            <div className="flex-1 lg:flex-initial lg:min-w-[160px] relative">
              <label className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#344054] leading-[20px] block mb-2">
                Status
              </label>
              <div className="bg-white rounded-[8px] border border-[#d0d5dd] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
                <button
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className="w-full flex items-center justify-between px-[14px] py-[10px]"
                >
                  <span className="font-['Inter:Regular',_sans-serif] font-normal text-[16px] text-[#667085] leading-[24px]">
                    {statusFilter}
                  </span>
                  <ChevronDown className="h-[20px] w-[20px] text-[#667085]" />
                </button>
                
                {showStatusDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#d0d5dd] rounded-[8px] shadow-lg z-10">
                    {statusOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setStatusFilter(option);
                          setShowStatusDropdown(false);
                        }}
                        className="w-full px-[14px] py-[10px] text-left hover:bg-[#f9fafb] font-['Inter:Regular',_sans-serif] font-normal text-[16px] text-[#667085] leading-[24px]"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Role Filter */}
            <div className="flex-1 lg:flex-initial lg:min-w-[160px] relative">
              <label className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#344054] leading-[20px] block mb-2">
                Role
              </label>
              <div className="bg-white rounded-[8px] border border-[#d0d5dd] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
                <button
                  onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                  className="w-full flex items-center justify-between px-[14px] py-[10px]"
                >
                  <span className="font-['Inter:Regular',_sans-serif] font-normal text-[16px] text-[#667085] leading-[24px]">
                    {roleFilter}
                  </span>
                  <ChevronDown className="h-[20px] w-[20px] text-[#667085]" />
                </button>
                
                {showRoleDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#d0d5dd] rounded-[8px] shadow-lg z-10">
                    {roleOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setRoleFilter(option);
                          setShowRoleDropdown(false);
                        }}
                        className="w-full px-[14px] py-[10px] text-left hover:bg-[#f9fafb] font-['Inter:Regular',_sans-serif] font-normal text-[16px] text-[#667085] leading-[24px]"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Audit Trail Table */}
        <div className="bg-white rounded-[12px] border border-[#eaecf0] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1400px]">
              {/* Table Header */}
              <thead>
                <tr className="bg-[#f9fafb] border-b border-[#eaecf0]">
                  <th className="px-4 py-3 text-left w-[140px]">
                    <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                      TIMESTAMP
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left w-[100px]">
                    <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                      USER ID
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left w-[100px]">
                    <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                      ROLE
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left w-[120px]">
                    <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                      E-SLIP REF
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left w-[130px]">
                    <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                      ACCOUNT NO.
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left w-[160px]">
                    <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                      ACTION PERFORMED
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left w-[100px]">
                    <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                      STATUS
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left w-[140px]">
                    <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                      SYSTEM COMPONENT
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left w-[100px]">
                    <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                      ERROR CODE
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left w-[110px]">
                    <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                      BRANCH CODE
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left w-[100px]">
                    <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                      APPROVAL
                    </div>
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-[#eaecf0]">
                {filteredAuditData.map((entry) => (
                  <tr key={entry.id} className="hover:bg-[#f9fafb]">
                    <td className="px-4 py-4">
                      <div className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#475467] leading-[20px]">
                        {entry.timestamp}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#101828] leading-[20px]">
                        {entry.userId}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#475467] leading-[20px]">
                        {entry.role}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#475467] leading-[20px]">
                        {entry.eslipRef}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#475467] leading-[20px]">
                        {entry.accountNo}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#475467] leading-[20px]">
                        {entry.actionPerformed}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-[8px] py-[2px] rounded-[1000px] font-['Inter:Medium',_sans-serif] font-medium text-[12px] leading-[18px] ${
                        entry.status === 'Success' 
                          ? 'bg-[#ecfdf3] text-[#027a48] border border-[#abefc6]' 
                          : 'bg-[#fef3f2] text-[#b42318] border border-[#fecdca]'
                      }`}>
                        <div className={`w-[6px] h-[6px] rounded-full mr-[6px] ${
                          entry.status === 'Success' ? 'bg-[#12b76a]' : 'bg-[#f04438]'
                        }`} />
                        {entry.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#475467] leading-[20px]">
                        {entry.systemComponent}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#475467] leading-[20px]">
                        {entry.errorCode}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#475467] leading-[20px]">
                        {entry.branchCode}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#475467] leading-[20px]">
                        {entry.approval}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Show empty state if no filtered results */}
        {filteredAuditData.length === 0 && (
          <div className="bg-white rounded-[12px] border border-[#eaecf0] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] min-h-[200px] flex flex-col items-center justify-center p-8 mt-6">
            <div className="text-center max-w-md mx-auto">
              <div className="w-16 h-16 bg-[#f3f3f5] rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-[#667085]" />
              </div>
              <h3 className="font-['Inter:Medium',_sans-serif] font-medium text-[18px] text-[#101828] leading-[28px] mb-2">
                No audit entries found
              </h3>
              <p className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#475467] leading-[20px]">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function AuditTrail({ onBack, breadcrumbs, onBreadcrumbClick }: AuditTrailProps) {
  return (
    <ServiceCentralLayout
      sidebarContent={<SidebarContent />}
      headerContent={<HeaderContent />}
    >
      <MainContent 
        onBack={onBack}
        breadcrumbs={breadcrumbs}
        onBreadcrumbClick={onBreadcrumbClick}
      />
    </ServiceCentralLayout>
  );
}