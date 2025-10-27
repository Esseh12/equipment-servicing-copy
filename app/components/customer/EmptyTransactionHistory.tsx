import { Button } from '../ui/button';
import { ServiceCentralLayout } from '../ServiceCentralLayout';
import { Search, ChevronDown, Plus, Home, ChevronRight, CreditCard, FileText, Lock } from 'lucide-react';
import accessLogo from 'figma:asset/3ebf5c44175bf36c1eceb7236d272904dfc164a1.png';

interface EmptyTransactionHistoryProps {
  onMakeFirstPayment: () => void;
  onBack: () => void;
  onUSSD?: () => void;
}

// Sidebar Navigation 
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

// Header Content
function HeaderContent() {
  return (
    <div className="h-full flex items-center justify-between px-[24px]">
      {/* Empty for now */}
    </div>
  );
}

// Main Content
function MainContent({ onMakeFirstPayment, onBack }: EmptyTransactionHistoryProps) {
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
            onClick={onMakeFirstPayment}
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
                  <input 
                    placeholder="Search by E-slip or Transaction ID"
                    className="flex-1 border-0 outline-none font-['Inter:Regular',_sans-serif] font-normal text-[16px] text-[#667085] placeholder:text-[#667085]"
                  />
                </div>
              </div>
            </div>
            
            {/* Status Filter */}
            <div className="flex-1 lg:flex-initial lg:min-w-[200px]">
              <label className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#344054] leading-[20px] block mb-2">
                Status
              </label>
              <div className="bg-white rounded-[8px] border border-[#d0d5dd] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
                <div className="flex items-center justify-between px-[14px] py-[10px]">
                  <span className="font-['Inter:Regular',_sans-serif] font-normal text-[16px] text-[#667085] leading-[24px]">
                    All Statuses
                  </span>
                  <ChevronDown className="h-[20px] w-[20px] text-[#667085]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-[12px] border border-[#eaecf0] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] min-h-[400px] flex flex-col items-center justify-center p-8 lg:p-16">
          <div className="text-center max-w-md mx-auto">
            {/* Empty State Icon */}
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-[#f3f3f5] rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 lg:w-10 lg:h-10 text-[#667085]" />
            </div>
            
            {/* Empty State Text */}
            <h3 className="font-['Inter:Medium',_sans-serif] font-medium text-[18px] lg:text-[20px] text-[#101828] leading-[28px] mb-2">
              No transactions yet
            </h3>
            <p className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] lg:text-[16px] text-[#475467] leading-[20px] lg:leading-[24px] mb-8">
              Start by making your first KPA payment to see your transaction history here.
            </p>
            
            {/* CTA Button */}
            <Button
              onClick={onMakeFirstPayment}
              className="bg-[#003883] hover:bg-[#002664] text-white rounded-[8px] px-[20px] py-[12px] w-full lg:w-auto"
            >
              <div className="flex items-center justify-center gap-[8px]">
                <Plus className="h-[20px] w-[20px]" />
                <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[16px] leading-[24px]">
                  Make First Payment
                </span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EmptyTransactionHistory({ onMakeFirstPayment, onBack, onUSSD }: EmptyTransactionHistoryProps) {
  return (
    <ServiceCentralLayout
      sidebarContent={<SidebarContent onUSSD={onUSSD} />}
      headerContent={<HeaderContent />}
    >
      <MainContent onMakeFirstPayment={onMakeFirstPayment} onBack={onBack} />
    </ServiceCentralLayout>
  );
}