import { useState } from 'react';
import { ServiceCentralLayout } from '../ServiceCentralLayout';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Home, ChevronRight, Search, ChevronDown, Plus, Download, CreditCard, Lock } from 'lucide-react';
import accessLogo from 'figma:asset/3ebf5c44175bf36c1eceb7236d272904dfc164a1.png';

interface TransactionHistoryProps {
  onBack: () => void;
  onNewPayment?: () => void;
  onUSSD?: () => void;
}

// Mock transaction data
const mockTransactions = [
  {
    id: 'TXN1703845200001',
    eslipNumber: 'KPA123456789',
    amount: '2500.00',
    commission: '50.00',
    exciseDuty: '25.00',
    total: '2575.00',
    date: '2024-01-29',
    time: '14:30:15',
    status: 'success' as const,
    customerName: 'John Doe'
  },
  {
    id: 'TXN1703758800001',
    eslipNumber: 'KPA987654321',
    amount: '1850.00',
    commission: '37.00',
    exciseDuty: '18.50',
    total: '1905.50',
    date: '2024-01-28',
    time: '09:15:22',
    status: 'success' as const,
    customerName: 'John Doe'
  },
  {
    id: 'TXN1703672400001',
    eslipNumber: 'KPA555666777',
    amount: '3200.00',
    commission: '64.00',
    exciseDuty: '32.00',
    total: '3296.00',
    date: '2024-01-27',
    time: '16:45:08',
    status: 'success' as const,
    customerName: 'John Doe'
  },
  {
    id: 'TXN1703586000001',
    eslipNumber: 'KPA111222333',
    amount: '750.00',
    commission: '15.00',
    exciseDuty: '7.50',
    total: '772.50',
    date: '2024-01-26',
    time: '11:20:45',
    status: 'failed' as const,
    customerName: 'John Doe'
  },
  {
    id: 'TXN1703499600001',
    eslipNumber: 'KPA888999000',
    amount: '4100.00',
    commission: '82.00',
    exciseDuty: '41.00',
    total: '4223.00',
    date: '2024-01-25',
    time: '13:55:30',
    status: 'success' as const,
    customerName: 'John Doe'
  }
];

// Sidebar Navigation (same as EmptyTransactionHistory but showing active state)
function SidebarContent({ onUSSD }: { onUSSD?: () => void }) {
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
              Customer Portal
            </p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="px-[16px] py-[16px] border-b border-[#d0d5dd]">
        <div className="font-['Inter:Bold',_sans-serif] font-bold text-[18px] text-[#003883] leading-[30px]">
          Customer Portal
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-[12px] py-[8px]">
        <div className="flex flex-col gap-[8px]">
          {/* Pay KPA - Active */}
          <div className="bg-[#ebeef2] h-[44px] rounded-[6px] flex items-center px-[12px] gap-[12px]">
            <CreditCard className="h-[20px] w-[20px] text-[#003883]" />
            <span className="font-['DM_Sans:Bold',_sans-serif] font-bold text-[15px] text-[#003883] leading-[20px] tracking-[0.15px]">
              Pay KPA
            </span>
          </div>

          {/* USSD */}
          <div 
            onClick={onUSSD}
            className="h-[44px] rounded-[6px] flex items-center px-[12px] gap-[12px] hover:bg-[#ebeef2] cursor-pointer"
          >
            <div className="h-[20px] w-[20px] text-[#526484]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V3zM2 8a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V8zM7 13a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1H8a1 1 0 01-1-1v-2zM12 8a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8z" fill="currentColor" />
              </svg>
            </div>
            <span className="font-['DM_Sans:Bold',_sans-serif] font-bold text-[15px] text-[#526484] leading-[20px] tracking-[0.15px]">
              USSD
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

// Header Content (empty for now)
function HeaderContent() {
  return <div className="h-full" />;
}

// Main Content  
function MainContent({ onBack, onNewPayment }: TransactionHistoryProps & { onNewPayment: () => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = transaction.eslipNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: 'success' | 'failed') => {
    if (status === 'success') {
      return (
        <div className="bg-[#21a366] rounded-[1000px] px-[8px] py-[4px] inline-block">
          <span className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-white leading-[16px]">
            Success
          </span>
        </div>
      );
    } else {
      return (
        <div className="bg-[#ee3148] rounded-[1000px] px-[8px] py-[4px] inline-block">
          <span className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-white leading-[16px]">
            Failed
          </span>
        </div>
      );
    }
  };

  const handleNewPayment = () => {
    onNewPayment();
  };

  return (
    <div className="w-full h-full bg-white overflow-y-auto">
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        {/* Breadcrumbs */}
        <div className="flex gap-[12px] items-center mb-4 lg:mb-6">
          <div className="flex items-center gap-[12px]">
            <Home className="h-[20px] w-[20px] text-[#667085]" />
            <ChevronRight className="h-[16px] w-[16px] text-[#d0d5dd]" />
            <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[14px] text-[#003883] leading-[20px]">
              KPA Payments
            </div>
          </div>
        </div>

        {/* Page Title & Action Button */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 lg:mb-8">
          <div className="flex flex-col gap-[4px]">
            <h1 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[24px] lg:text-[30px] text-[#101828] leading-[32px] lg:leading-[38px]">
              KPA Payment History
            </h1>
            <p className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] lg:text-[16px] text-[#475467] leading-[20px] lg:leading-[24px]">
              View and manage your KPA payment transactions
            </p>
          </div>
          
          {/* Action Button */}
          <Button
            onClick={handleNewPayment}
            className="bg-[#003883] hover:bg-[#002664] text-white rounded-[8px] px-[16px] py-[10px] flex items-center gap-[8px] w-fit self-start lg:self-auto"
          >
            <Plus className="h-[20px] w-[20px]" />
            <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[16px] leading-[24px]">
              New Payment
            </span>
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="bg-white border border-[#d0d5dd] rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] overflow-hidden">
            <div className="flex">
              {/* Today's Transactions - Active */}
              <div className="bg-[#ebeef2] px-[16px] py-[10px] border-r border-[#d0d5dd] flex-1 lg:flex-none">
                <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[14px] text-[#003883] leading-[20px] text-center lg:text-left">
                  Today's Transactions
                </div>
              </div>
              
              {/* Historical Transactions */}
              <div className="px-[16px] py-[10px] cursor-pointer hover:bg-[#f9fafb] flex-1 lg:flex-none">
                <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[14px] text-[#344054] leading-[20px] text-center lg:text-left">
                  Historical Transactions
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by E-slip or Transaction ID"
                    className="border-0 p-0 h-auto font-['Inter:Regular',_sans-serif] font-normal text-[16px] text-[#667085] bg-transparent placeholder:text-[#667085] focus-visible:ring-0"
                  />
                </div>
              </div>
            </div>
            
            {/* Status Filter */}
            <div className="flex-1 lg:flex-initial lg:min-w-[200px]">
              <label className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#344054] leading-[20px] block mb-2">
                Status
              </label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="bg-white rounded-[8px] border border-[#d0d5dd] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] px-[14px] py-[10px] h-auto">
                  <SelectValue>
                    <span className="font-['Inter:Regular',_sans-serif] font-normal text-[16px] text-[#667085] leading-[24px]">
                      {filterStatus === 'all' ? 'All Statuses' : 
                       filterStatus === 'success' ? 'Success' : 'Failed'}
                    </span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white border border-[#d0d5dd] rounded-[8px] shadow-[0px_10px_38px_-10px_rgba(22,23,24,0.35),0px_10px_20px_-15px_rgba(22,23,24,0.2)]">
                  <SelectItem value="all" className="font-['Inter:Regular',_sans-serif] font-normal text-[16px] text-[#667085] leading-[24px] px-[14px] py-[10px] hover:bg-[#f9fafb] focus:bg-[#f9fafb]">
                    All Statuses
                  </SelectItem>
                  <SelectItem value="success" className="font-['Inter:Regular',_sans-serif] font-normal text-[16px] text-[#667085] leading-[24px] px-[14px] py-[10px] hover:bg-[#f9fafb] focus:bg-[#f9fafb]">
                    Success
                  </SelectItem>
                  <SelectItem value="failed" className="font-['Inter:Regular',_sans-serif] font-normal text-[16px] text-[#667085] leading-[24px] px-[14px] py-[10px] hover:bg-[#f9fafb] focus:bg-[#f9fafb]">
                    Failed
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="bg-white rounded-[12px] border border-[#eaecf0] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden lg:block">
            {/* Table Header */}
            <div className="bg-[#f9fafb] border-b border-[#eaecf0] px-[24px] py-[12px]">
              <div className="grid grid-cols-12 gap-[16px] items-center">
                <div className="col-span-3 font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                  Transaction Details
                </div>
                <div className="col-span-2 font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                  Amount
                </div>
                <div className="col-span-2 font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                  Date & Time
                </div>
                <div className="col-span-2 font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                  Status
                </div>
                <div className="col-span-3 font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                  Actions
                </div>
              </div>
            </div>

            {/* Table Body */}
            <div className="max-h-[400px] overflow-y-auto">
              {filteredTransactions.map((transaction, index) => (
                <div key={transaction.id} className={`px-[24px] py-[16px] border-b border-[#eaecf0] hover:bg-[#f9fafb] ${index === filteredTransactions.length - 1 ? 'border-b-0' : ''}`}>
                  <div className="grid grid-cols-12 gap-[16px] items-center">
                    {/* Transaction Details */}
                    <div className="col-span-3">
                      <div className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#101828] leading-[20px] mb-[4px]">
                        {transaction.eslipNumber}
                      </div>
                      <div className="font-['Inter:Regular',_sans-serif] font-normal text-[12px] text-[#475467] leading-[18px]">
                        {transaction.id}
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="col-span-2">
                      <div className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#101828] leading-[20px] mb-[4px]">
                        ${transaction.total}
                      </div>
                      <div className="font-['Inter:Regular',_sans-serif] font-normal text-[12px] text-[#475467] leading-[18px]">
                        Principal: ${transaction.amount}
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div className="col-span-2">
                      <div className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#344054] leading-[20px] mb-[4px]">
                        {new Date(transaction.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="font-['Inter:Regular',_sans-serif] font-normal text-[12px] text-[#475467] leading-[18px]">
                        {transaction.time}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="col-span-2">
                      {getStatusBadge(transaction.status)}
                    </div>

                    {/* Actions */}
                    <div className="col-span-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#003883] hover:bg-[#ebeef2] font-['Inter:Medium',_sans-serif] font-medium text-[14px] leading-[20px]"
                      >
                        <Download className="h-[16px] w-[16px] mr-[8px]" />
                        Download Receipt
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden">
            <div className="p-4 space-y-4">
              {filteredTransactions.map((transaction) => (
                <div key={transaction.id} className="bg-white border border-[#eaecf0] rounded-[8px] p-4 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#101828] leading-[20px] mb-1">
                        {transaction.eslipNumber}
                      </div>
                      <div className="font-['Inter:Regular',_sans-serif] font-normal text-[12px] text-[#475467] leading-[18px]">
                        {transaction.id}
                      </div>
                    </div>
                    {getStatusBadge(transaction.status)}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] mb-1 uppercase tracking-[0.05em]">
                        Amount
                      </div>
                      <div className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#101828] leading-[20px]">
                        ${transaction.total}
                      </div>
                    </div>
                    <div>
                      <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] mb-1 uppercase tracking-[0.05em]">
                        Date
                      </div>
                      <div className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#344054] leading-[20px]">
                        {new Date(transaction.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#003883] hover:bg-[#ebeef2] font-['Inter:Medium',_sans-serif] font-medium text-[14px] leading-[20px] w-full justify-center"
                  >
                    <Download className="h-[16px] w-[16px] mr-[8px]" />
                    Download Receipt
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* No Results */}
        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-[#667085] mx-auto mb-4" />
            <h3 className="font-['Inter:Medium',_sans-serif] font-medium text-[18px] text-[#101828] leading-[28px] mb-2">
              No transactions found
            </h3>
            <p className="font-['Inter:Regular',_sans-serif] font-normal text-[16px] text-[#475467] leading-[24px]">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function TransactionHistory({ onBack, onNewPayment, onUSSD }: TransactionHistoryProps) {
  return (
    <ServiceCentralLayout
      sidebarContent={<SidebarContent onUSSD={onUSSD} />}
      headerContent={<HeaderContent />}
    >
      <MainContent onBack={onBack} onNewPayment={onNewPayment || (() => {})} />
    </ServiceCentralLayout>
  );
}