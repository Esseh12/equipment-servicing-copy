import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, FileText, Lock, Shield, Users, Clock, Eye, CheckCircle2 } from 'lucide-react';
import { BreadcrumbNavigation } from './shared/BreadcrumbNavigation';
import { LOIRequest, BreadcrumbItem } from '../App';
import accessLogo from 'figma:asset/3ebf5c44175bf36c1eceb7236d272904dfc164a1.png';

// Mock data for pending approval requests - REMOVED FOR TESTING
const mockPendingRequests: any[] = [];

interface ApproverHistoryProps {
  userRole: string | null;
  onViewRequest: (request: LOIRequest) => void;
  onLogout: () => void;
  breadcrumbs: BreadcrumbItem[];
  onBreadcrumbClick: (screen: any) => void;
  allRequests?: LOIRequest[];
}

// Header Component
function Header({ userRole, onLogout }: { userRole: string | null; onLogout: () => void }) {
  return (
    <div className="bg-white border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <img src={accessLogo} alt="Access Bank" className="h-8" />
            <h1 className="font-['Inter:Medium',_sans-serif] text-[18px] text-[#1e293b]">Service Central</h1>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#64748b]">Role:</span>
              <span className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#003883]">
                {userRole === 'approver' ? 'Approver' : userRole}
              </span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onLogout}
              className="border-[#d1d5db] text-[#374151] hover:bg-[#f9fafb]"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Content
function MainContent({ userRole, onViewRequest, breadcrumbs, onBreadcrumbClick, allRequests = [] }: ApproverHistoryProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter real requests that need Approval review (currentStep === 5)
  const realPendingRequests = allRequests.filter(request => 
    request.currentStep === 5 && request.status === 'pending'
  );

  // Combine real requests with mock data
  const combinedPendingRequests = [...realPendingRequests, ...mockPendingRequests];

  const filteredRequests = combinedPendingRequests.filter(request => {
    const matchesSearch = request.caseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.customerInfo.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.customerInfo.accountNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getDeliveryBadge = (deliveryOption: string) => {
    switch (deliveryOption) {
      case 'email': 
        return 'bg-[#eff8ff] text-[#175cd3] border border-[#b2ddff]';
      case 'hard-copy': 
        return 'bg-[#f9fafb] text-[#667085] border border-[#d0d5dd]';
      case 'third-party-email': 
        return 'bg-[#ecfdf3] text-[#027a48] border border-[#abefc6]';
      default: 
        return 'bg-[#f3f3f5] text-[#667085] border border-[#d0d5dd]';
    }
  };

  const getDeliveryLabel = (deliveryOption: string) => {
    switch (deliveryOption) {
      case 'email': return 'Email';
      case 'hard-copy': return 'Hard Copy';
      case 'third-party-email': return 'Third Party';
      default: return deliveryOption;
    }
  };

  const getProgressSteps = (currentStep: number) => {
    const steps = [
      { label: 'Created', key: 'created' },
      { label: 'Credit Review', key: 'credit-ops' },
      { label: 'CCO Review', key: 'cco-review' },
      { label: 'Approval', key: 'approval' },
      { label: 'Complete', key: 'complete' }
    ];

    return steps.map((step, index) => ({
      ...step,
      completed: index < currentStep - 1,
      current: index === currentStep - 1,
      upcoming: index > currentStep - 1
    }));
  };

  const getRequestStatus = (request: LOIRequest) => {
    if (request.currentStep === 5 && request.status === 'pending') {
      return 'Awaiting Approval';
    }
    return 'Processing';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Awaiting Approval': 
        return 'bg-[#fff7ed] text-[#ff8200] border border-[#fed7aa]';
      default: 
        return 'bg-[#f3f3f5] text-[#667085] border border-[#d0d5dd]';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'Awaiting Approval': 
        return 'bg-[#ff8200]';
      default: 
        return 'bg-[#667085]';
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-6 lg:py-8">
        {/* Breadcrumbs */}
        <BreadcrumbNavigation 
          breadcrumbs={breadcrumbs}
          onBreadcrumbClick={onBreadcrumbClick}
        />

        {/* Page Title */}
        <div className="flex flex-col gap-[4px] mb-6 lg:mb-8">
          <h1 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[24px] lg:text-[30px] text-[#101828] leading-[32px] lg:leading-[38px]">
            Final Approval - Pending Reviews
          </h1>
          <p className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] lg:text-[16px] text-[#475467] leading-[20px] lg:leading-[24px]">
            Review and approve final LOI requests ready for processing
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="bg-white border border-[#d0d5dd] rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] overflow-hidden">
            <div className="flex">
              {/* Pending Reviews - Active */}
              <div className="bg-[#ebeef2] px-[16px] py-[10px] border-r border-[#d0d5dd] flex-1 lg:flex-none">
                <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[14px] text-[#003883] leading-[20px] text-center lg:text-left flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Pending Approvals ({filteredRequests.length})
                </div>
              </div>
              
              {/* Historical Reviews */}
              <div className="px-[16px] py-[10px] cursor-pointer hover:bg-[#f9fafb] flex-1 lg:flex-none">
                <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[14px] text-[#344054] leading-[20px] text-center lg:text-left">
                  Historical Approvals
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-gray-50 rounded-[12px] p-4 lg:p-[20px] mb-6">
          <div className="max-w-md">
            {/* Search */}
            <div>
              <label className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#344054] leading-[20px] block mb-2">
                Search
              </label>
              <div className="bg-white rounded-[8px] border border-[#d0d5dd] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
                <div className="flex items-center px-[14px] py-[10px]">
                  <Search className="h-[20px] w-[20px] text-[#667085] mr-[8px]" />
                  <Input 
                    placeholder="Search by Case ID, Customer Name, or Account Number"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 border-0 outline-none bg-transparent font-['Inter:Regular',_sans-serif] font-normal text-[16px] text-[#667085] placeholder:text-[#667085]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-white rounded-[12px] border border-[#eaecf0] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] overflow-hidden">
          {/* Desktop Table Header */}
          <div className="hidden lg:block bg-[#f9fafb] border-b border-[#eaecf0] px-6 py-3">
            <div className="grid grid-cols-7 gap-4">
              <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                Case ID
              </div>
              <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                Customer
              </div>
              <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                Account Number
              </div>
              <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                Status & Progress
              </div>
              <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                Delivery Method
              </div>
              <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                Submitted
              </div>
              <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                Actions
              </div>
            </div>
          </div>

          {/* Mobile Table Header */}
          <div className="lg:hidden bg-[#f9fafb] border-b border-[#eaecf0] px-4 py-3">
            <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
              Pending Approvals
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-[#eaecf0]">
            {filteredRequests.map((request) => {
              const progressSteps = getProgressSteps(request.currentStep);
              const status = getRequestStatus(request);
              
              return (
                <div 
                  key={request.caseId} 
                  className="hover:bg-[#f9fafb]"
                >
                  {/* Desktop View */}
                  <div className="hidden lg:block px-6 py-4">
                    <div className="grid grid-cols-7 gap-4 items-center">
                      <div className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#101828] leading-[20px]">
                        {request.caseId}
                      </div>
                      <div className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#475467] leading-[20px]">
                        {request.customerInfo.customerName}
                      </div>
                      <div className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#475467] leading-[20px]">
                        {request.customerInfo.accountNumber}
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className={`inline-flex items-center px-[8px] py-[2px] rounded-[1000px] font-['Inter:Medium',_sans-serif] font-medium text-[12px] leading-[18px] ${getStatusBadge(status)}`}>
                          <div className={`w-[6px] h-[6px] rounded-full mr-[6px] ${getStatusDot(status)}`} />
                          {status}
                        </span>
                        {/* Progress dots */}
                        <div className="flex items-center gap-1">
                          {progressSteps.map((step, index) => (
                            <div key={step.key} className="flex items-center">
                              <div 
                                className={`w-2 h-2 rounded-full ${
                                  step.completed ? 'bg-[#12b76a]' : 
                                  step.current ? 'bg-[#ff8200]' : 
                                  'bg-[#d0d5dd]'
                                }`} 
                              />
                              {index < progressSteps.length - 1 && (
                                <div className={`w-2 h-[1px] ${
                                  step.completed ? 'bg-[#12b76a]' : 'bg-[#d0d5dd]'
                                }`} />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className={`inline-flex items-center px-[8px] py-[2px] rounded-[1000px] font-['Inter:Medium',_sans-serif] font-medium text-[12px] leading-[18px] ${getDeliveryBadge(request.deliveryOption)}`}>
                          {getDeliveryLabel(request.deliveryOption)}
                        </span>
                      </div>
                      <div className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#475467] leading-[20px]">
                        {formatDateTime(request.createdAt)}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => onViewRequest(request)}
                          variant="outline"
                          size="sm"
                          className="h-8 px-3 border-[#003883] text-[#003883] hover:bg-[#003883] hover:text-white"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Review
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Mobile View */}
                  <div className="lg:hidden px-4 py-4">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#101828] leading-[20px]">
                            {request.caseId}
                          </div>
                          <div className="font-['Inter:Regular',_sans-serif] font-normal text-[12px] text-[#475467] leading-[16px]">
                            {request.customerInfo.customerName}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => onViewRequest(request)}
                            variant="outline"
                            size="sm"
                            className="h-7 px-2 border-[#003883] text-[#003883] hover:bg-[#003883] hover:text-white"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Review
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-[10px] text-[#667085] uppercase font-medium mb-1">Account</div>
                          <div className="font-['Inter:Regular',_sans-serif] font-normal text-[12px] text-[#475467] leading-[16px]">
                            {request.customerInfo.accountNumber}
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] text-[#667085] uppercase font-medium mb-1">Status</div>
                          <span className={`inline-flex items-center px-[6px] py-[1px] rounded-[1000px] font-['Inter:Medium',_sans-serif] font-medium text-[10px] leading-[14px] ${getStatusBadge(status)}`}>
                            <div className={`w-[4px] h-[4px] rounded-full mr-[4px] ${getStatusDot(status)}`} />
                            {status}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="text-[10px] text-[#667085] uppercase font-medium">Progress</div>
                        <div className="flex items-center gap-1 mb-1">
                          {progressSteps.map((step, index) => (
                            <div key={step.key} className="flex items-center">
                              <div 
                                className={`w-2 h-2 rounded-full ${
                                  step.completed ? 'bg-[#12b76a]' : 
                                  step.current ? 'bg-[#ff8200]' : 
                                  'bg-[#d0d5dd]'
                                }`} 
                              />
                              {index < progressSteps.length - 1 && (
                                <div className={`w-2 h-[1px] ${
                                  step.completed ? 'bg-[#12b76a]' : 'bg-[#d0d5dd]'
                                }`} />
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="text-[11px] text-[#475467]">Final Approval</div>
                      </div>

                      <div>
                        <div className="text-[10px] text-[#667085] uppercase font-medium mb-1">Delivery Method</div>
                        <span className={`inline-flex items-center px-[6px] py-[1px] rounded-[1000px] font-['Inter:Medium',_sans-serif] font-medium text-[10px] leading-[14px] ${getDeliveryBadge(request.deliveryOption)}`}>
                          {getDeliveryLabel(request.deliveryOption)}
                        </span>
                      </div>

                      <div className="text-[10px] text-[#667085]">
                        Submitted: {formatDateTime(request.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Show empty state if no filtered results */}
        {filteredRequests.length === 0 && (
          <div className="bg-white rounded-[12px] border border-[#eaecf0] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] min-h-[200px] flex flex-col items-center justify-center p-8 mt-6">
            <div className="text-center max-w-md mx-auto">
              <div className="w-16 h-16 bg-[#f3f3f5] rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-[#667085]" />
              </div>
              <h3 className="font-['Inter:Medium',_sans-serif] font-medium text-[18px] text-[#101828] leading-[28px] mb-2">
                No pending approvals found
              </h3>
              <p className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#475467] leading-[20px]">
                All LOI requests have been processed or there are no requests matching your search criteria.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ApproverHistory({
  userRole,
  onViewRequest,
  onLogout,
  breadcrumbs,
  onBreadcrumbClick,
  allRequests
}: ApproverHistoryProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header userRole={userRole} onLogout={onLogout} />
      <MainContent 
        userRole={userRole}
        onViewRequest={onViewRequest}
        onLogout={onLogout}
        breadcrumbs={breadcrumbs}
        onBreadcrumbClick={onBreadcrumbClick}
        allRequests={allRequests}
      />
    </div>
  );
}