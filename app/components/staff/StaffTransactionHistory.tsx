import { useState } from 'react';
import { BreadcrumbNavigation } from '../shared/BreadcrumbNavigation';
import { ServiceCentralLayout } from '../ServiceCentralLayout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ChevronDown, Plus, Search, Users, FileText, TrendingUp, Lock } from 'lucide-react';
import accessLogo from 'figma:asset/3ebf5c44175bf36c1eceb7236d272904dfc164a1.png';
import type { BreadcrumbItem, Screen } from '../../App';

interface StaffTransactionHistoryProps {
  onBack: () => void;
  onNewRequest: () => void;
  onAuditTrail?: () => void;
  breadcrumbs: BreadcrumbItem[];
  onBreadcrumbClick: (screen: Screen) => void;
}

// Sidebar Navigation for Staff
function SidebarContent({ onAuditTrail }: { onAuditTrail?: () => void }) {
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
          {/* KPA Collections - Active */}
          <div className="bg-[#ebeef2] h-[44px] rounded-[6px] flex items-center px-[12px] gap-[12px]">
            <Users className="h-[20px] w-[20px] text-[#003883]" />
            <span className="font-['DM_Sans:Bold',_sans-serif] font-bold text-[15px] text-[#003883] leading-[20px] tracking-[0.15px]">
              KPA Collections
            </span>
          </div>

          {/* Audit Trail */}
          <div 
            onClick={onAuditTrail}
            className="h-[44px] rounded-[6px] flex items-center px-[12px] gap-[12px] hover:bg-[#ebeef2] cursor-pointer"
          >
            <TrendingUp className="h-[20px] w-[20px] text-[#526484]" />
            <span className="font-['DM_Sans:Bold',_sans-serif] font-bold text-[15px] text-[#526484] leading-[20px] tracking-[0.15px]">
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

// Mock transaction data for staff
const mockStaffTransactions = [
  {
    id: '1',
    eslip: 'KPA123456',
    customerName: 'John Doe',
    amount: '50.00',
    commission: '1.00',
    exciseDuty: '0.50',
    status: 'Success' as const,
    dateTime: '2024-01-15 10:30 AM',
    transactionId: 'TXN1234567890',
    tellerName: 'Jane Smith'
  },
  {
    id: '2',
    eslip: 'KPA789012',
    customerName: 'Mary Johnson',
    amount: '75.50',
    commission: '1.51',
    exciseDuty: '0.76',
    status: 'Success' as const,
    dateTime: '2024-01-15 09:15 AM',
    transactionId: 'TXN1234567891',
    tellerName: 'Jane Smith'
  },
  {
    id: '3',
    eslip: 'KPA345678',
    customerName: 'Robert Davis',
    amount: '120.00',
    commission: '2.40',
    exciseDuty: '1.20',
    status: 'Failed' as const,
    dateTime: '2024-01-14 03:45 PM',
    transactionId: 'TXN1234567892',
    tellerName: 'Jane Smith'
  }
];

// Main Content
function MainContent({ onNewRequest, breadcrumbs, onBreadcrumbClick }: StaffTransactionHistoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const statusOptions = ['All Statuses', 'Success', 'Failed'];

  const filteredTransactions = mockStaffTransactions.filter(transaction => {
    const matchesSearch = transaction.eslip.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'All Statuses' || transaction.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full h-full bg-white overflow-y-auto">
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        {/* Breadcrumbs */}
        <BreadcrumbNavigation 
          breadcrumbs={breadcrumbs}
          onBreadcrumbClick={onBreadcrumbClick}
        />

        {/* Page Title & Action Button */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 lg:mb-8">
          <div className="flex flex-col gap-[4px]">
            <h1 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[24px] lg:text-[30px] text-[#101828] leading-[32px] lg:leading-[38px]">
              KPA Collections History
            </h1>
            <p className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] lg:text-[16px] text-[#475467] leading-[20px] lg:leading-[24px]">
              View and manage KPA payment collections processed today
            </p>
          </div>
          
          {/* Action Button */}
          <Button
            onClick={onNewRequest}
            className="bg-[#003883] hover:bg-[#002664] text-white rounded-[8px] px-[16px] py-[10px] flex items-center gap-[8px] w-fit self-start lg:self-auto"
          >
            <Plus className="h-[20px] w-[20px]" />
            <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[16px] leading-[24px]">
              New Collection
            </span>
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="bg-white border border-[#d0d5dd] rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] overflow-hidden">
            <div className="flex">
              {/* Today's Collections - Active */}
              <div className="bg-[#ebeef2] px-[16px] py-[10px] border-r border-[#d0d5dd] flex-1 lg:flex-none">
                <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[14px] text-[#003883] leading-[20px] text-center lg:text-left">
                  Today's Collections
                </div>
              </div>
              
              {/* Historical Collections */}
              <div className="px-[16px] py-[10px] cursor-pointer hover:bg-[#f9fafb] flex-1 lg:flex-none">
                <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[14px] text-[#344054] leading-[20px] text-center lg:text-left">
                  Historical Collections
                </div>
              </div>
            </div>
          </div>
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
                    placeholder="Search by E-slip or Transaction ID"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 border-0 outline-none bg-transparent font-['Inter:Regular',_sans-serif] font-normal text-[16px] text-[#667085] placeholder:text-[#667085]"
                  />
                </div>
              </div>
            </div>
            
            {/* Status Filter */}
            <div className="flex-1 lg:flex-initial lg:min-w-[200px] relative">
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
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-[12px] border border-[#eaecf0] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] overflow-hidden">
          {/* Table Header */}
          <div className="bg-[#f9fafb] border-b border-[#eaecf0] px-6 py-3">
            <div className="grid grid-cols-7 gap-4">
              <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                E-SLIP
              </div>
              <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                CUSTOMER
              </div>
              <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                AMOUNT
              </div>
              <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                COMMISSION
              </div>
              <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                STATUS
              </div>
              <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                DATE & TIME
              </div>
              <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                TXN ID
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-[#eaecf0]">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="px-6 py-4">
                <div className="grid grid-cols-7 gap-4 items-center">
                  <div className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#101828] leading-[20px]">
                    {transaction.eslip}
                  </div>
                  <div className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#475467] leading-[20px]">
                    {transaction.customerName}
                  </div>
                  <div className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#101828] leading-[20px]">
                    ${transaction.amount}
                  </div>
                  <div className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#475467] leading-[20px]">
                    ${transaction.commission}
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-[8px] py-[2px] rounded-[1000px] font-['Inter:Medium',_sans-serif] font-medium text-[12px] leading-[18px] ${
                      transaction.status === 'Success' 
                        ? 'bg-[#ecfdf3] text-[#027a48] border border-[#abefc6]' 
                        : 'bg-[#fef3f2] text-[#b42318] border border-[#fecdca]'
                    }`}>
                      <div className={`w-[6px] h-[6px] rounded-full mr-[6px] ${
                        transaction.status === 'Success' ? 'bg-[#12b76a]' : 'bg-[#f04438]'
                      }`} />
                      {transaction.status}
                    </span>
                  </div>
                  <div className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#475467] leading-[20px]">
                    {transaction.dateTime}
                  </div>
                  <div className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#475467] leading-[20px]">
                    {transaction.transactionId}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Show empty state if no filtered results */}
        {filteredTransactions.length === 0 && (
          <div className="bg-white rounded-[12px] border border-[#eaecf0] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] min-h-[200px] flex flex-col items-center justify-center p-8 mt-6">
            <div className="text-center max-w-md mx-auto">
              <div className="w-16 h-16 bg-[#f3f3f5] rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-[#667085]" />
              </div>
              <h3 className="font-['Inter:Medium',_sans-serif] font-medium text-[18px] text-[#101828] leading-[28px] mb-2">
                No transactions found
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

export function StaffTransactionHistory({ onBack, onNewRequest, onAuditTrail, breadcrumbs, onBreadcrumbClick }: StaffTransactionHistoryProps) {
  return (
    <ServiceCentralLayout
      sidebarContent={<SidebarContent onAuditTrail={onAuditTrail} />}
      headerContent={<HeaderContent />}
    >
      <MainContent 
        onBack={onBack}
        onNewRequest={onNewRequest}
        onAuditTrail={onAuditTrail}
        breadcrumbs={breadcrumbs}
        onBreadcrumbClick={onBreadcrumbClick}
      />
    </ServiceCentralLayout>
  );
}