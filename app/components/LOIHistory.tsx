import { useState } from 'react';
import { BreadcrumbNavigation } from './shared/BreadcrumbNavigation';
import { ServiceCentralLayout } from './ServiceCentralLayout';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ChevronDown, Plus, Search, FileText, Lock, Shield, Users, Eye, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import accessLogo from 'figma:asset/3ebf5c44175bf36c1eceb7236d272904dfc164a1.png';
import type { BreadcrumbItem, Screen, UserRole, LOIRequest } from '../App';

interface LOIHistoryProps {
  userRole: UserRole;
  onNewRequest: () => void;
  onLogout: () => void;
  onViewRequest?: (request: any) => void;
  breadcrumbs: BreadcrumbItem[];
  onBreadcrumbClick: (screen: Screen) => void;
  allRequests?: LOIRequest[];
}

// Sidebar Navigation
function SidebarContent({ userRole, onLogout }: { 
  userRole: UserRole; 
  onLogout: () => void;
}) {
  const getRoleDisplayName = (role: UserRole) => {
    switch (role) {
      case 'cco': return 'Initiator/CCO';
      case 'credit-ops': return 'Credit Operations';
      case 'settlement': return 'Settlement & Reconciliation';
      case 'approver': return 'Approver';
      default: return 'Staff';
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'cco': return 'bg-[#003883] text-white';
      case 'credit-ops': return 'bg-[#21a366] text-white';
      case 'settlement': return 'bg-[#ff8200] text-white';
      case 'approver': return 'bg-[#ee3148] text-white';
      default: return 'bg-[#667085] text-white';
    }
  };

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

      {/* User Info with Role Badge */}
      <div className="px-[16px] py-[16px] border-b border-[#d0d5dd]">
        <div className="font-['Inter:Bold',_sans-serif] font-bold text-[18px] text-[#003883] leading-[30px]">
          Staff Portal
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Users className="h-4 w-4 text-[#526484]" />
          <span className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#526484] leading-[16px]">Role:</span>
          <Badge className={`${getRoleBadgeColor(userRole)} text-[11px] h-5`}>
            {getRoleDisplayName(userRole)}
          </Badge>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-auto p-[16px]">
        <div className="space-y-2">
          <div className="px-4 py-2 bg-[#003883] text-white rounded-lg">
            <div className="text-[14px]">Letter of Indebtedness</div>
          </div>
        </div>
      </div>

      <div className="p-[16px] border-t border-[#d0d5dd]">
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full border-[#003883] text-[#003883] hover:bg-[#003883] hover:text-white"
        >
          Logout
        </Button>
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

// Mock LOI request data - REMOVED FOR TESTING
const mockLOIRequests: any[] = [];

// Main Content
function MainContent({ userRole, onNewRequest, onViewRequest, breadcrumbs, onBreadcrumbClick, allRequests = [] }: LOIHistoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const statusOptions = ['All Statuses', 'Pending', 'Processing', 'Approved', 'Rejected'];

  // Convert real requests to display format and combine with mock data
  const convertToDisplayFormat = (request: LOIRequest) => ({
    id: request.caseId,
    caseId: request.caseId,
    customerName: request.customerInfo.customerName,
    accountNumber: request.customerInfo.accountNumber,
    totalAmount: request.loanBalances.reduce((sum, loan) => sum + parseFloat(loan.amount.replace(/,/g, '')), 0).toLocaleString(),
    status: request.status === 'pending' && request.currentStep === 4 ? 'Pending' : 
            request.status === 'pending' ? 'Processing' : request.status,
    dateTime: new Date(request.createdAt).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit', 
      day: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }),
    requestedBy: `${request.createdBy} User`,
    currentStep: request.currentStep === 4 ? 'CCO Final Review' : 
                request.currentStep === 2 ? 'Credit Operations Review' :
                request.currentStep === 5 ? 'Approval Stage' : 'Processing'
  });

  const realRequestsForDisplay = allRequests.map(convertToDisplayFormat);
  const combinedRequests = [...realRequestsForDisplay, ...mockLOIRequests];

  const filteredRequests = combinedRequests.filter(request => {
    const matchesSearch = request.caseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.accountNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'All Statuses' || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved': 
        return 'bg-[#ecfdf3] text-[#027a48] border border-[#abefc6]';
      case 'Rejected': 
        return 'bg-[#fef3f2] text-[#b42318] border border-[#fecdca]';
      case 'Processing': 
        return 'bg-[#eff8ff] text-[#175cd3] border border-[#b2ddff]';
      case 'Pending': 
        return 'bg-[#fffcf5] text-[#dc6803] border border-[#fedf89]';
      default: 
        return 'bg-[#f3f3f5] text-[#667085] border border-[#d0d5dd]';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-[#12b76a]';
      case 'Rejected': return 'bg-[#f04438]';
      case 'Processing': return 'bg-[#2e90fa]';
      case 'Pending': return 'bg-[#f79009]';
      default: return 'bg-[#667085]';
    }
  };

  const getProgressSteps = (currentStep: string) => {
    const steps = [
      { label: 'Created', key: 'created' },
      { label: 'Credit Review', key: 'credit-ops' },
      { label: 'CCO Review', key: 'cco-review' },
      { label: 'Approval', key: 'approval' },
      { label: 'Complete', key: 'complete' }
    ];

    const getCurrentStepIndex = () => {
      switch (currentStep) {
        case 'Credit Operations Review': return 1;
        case 'CCO Final Review': return 2;
        case 'Approval Stage': return 3;
        case 'Completed': return 4;
        default: return 0;
      }
    };

    const currentIndex = getCurrentStepIndex();
    
    return steps.map((step, index) => ({
      ...step,
      completed: index < currentIndex,
      current: index === currentIndex,
      upcoming: index > currentIndex
    }));
  };

  const getActionNeeded = (request: any) => {
    const realRequest = allRequests.find(r => r.caseId === request.caseId);
    if (realRequest && realRequest.currentStep === 4) {
      return true; // CCO needs to review
    }
    return request.currentStep === 'CCO Final Review';
  };

  const canViewRequest = (request: any) => {
    if (userRole !== 'cco') return false;
    return getActionNeeded(request) || request.status === 'Completed' || request.status === 'Approved';
  };

  return (
    <div className="w-full h-full bg-white overflow-y-auto">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-6 lg:py-8">
        {/* Breadcrumbs */}
        <BreadcrumbNavigation 
          breadcrumbs={breadcrumbs}
          onBreadcrumbClick={onBreadcrumbClick}
        />

        {/* Page Title & Action Button */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 lg:mb-8">
          <div className="flex flex-col gap-[4px]">
            <h1 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[24px] lg:text-[30px] text-[#101828] leading-[32px] lg:leading-[38px]">
              Letter of Indebtedness History
            </h1>
            <p className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] lg:text-[16px] text-[#475467] leading-[20px] lg:leading-[24px]">
              View and manage Letter of Indebtedness requests processed today
            </p>
          </div>
          
          {/* Action Button - Only show for CCO users */}
          {(userRole === 'cco') && (
            <Button
              onClick={onNewRequest}
              className="bg-[#003883] hover:bg-[#002664] text-white rounded-[8px] px-[16px] py-[10px] flex items-center gap-[8px] w-fit self-start lg:self-auto"
            >
              <Plus className="h-[20px] w-[20px]" />
              <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[16px] leading-[24px]">
                New Case
              </span>
            </Button>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="bg-white border border-[#d0d5dd] rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] overflow-hidden">
            <div className="flex">
              {/* Today's Requests - Active */}
              <div className="bg-[#ebeef2] px-[16px] py-[10px] border-r border-[#d0d5dd] flex-1 lg:flex-none">
                <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[14px] text-[#003883] leading-[20px] text-center lg:text-left">
                  Today's Requests
                </div>
              </div>
              
              {/* Historical Requests */}
              <div className="px-[16px] py-[10px] cursor-pointer hover:bg-[#f9fafb] flex-1 lg:flex-none">
                <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[14px] text-[#344054] leading-[20px] text-center lg:text-left">
                  Historical Requests
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
                    placeholder="Search by Case ID, Customer Name, or Account Number"
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

        {/* Requests Table */}
        <div className="bg-white rounded-[12px] border border-[#eaecf0] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] overflow-hidden">
          {/* Desktop Table Header */}
          <div className="hidden lg:block bg-[#f9fafb] border-b border-[#eaecf0] px-6 py-3">
            <div className="grid grid-cols-8 gap-4">
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
                Total Amount
              </div>
              <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                Status & Progress
              </div>
              <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                Current Step
              </div>
              <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                Date & Time
              </div>
              <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                Actions
              </div>
            </div>
          </div>

          {/* Mobile Table Header */}
          <div className="lg:hidden bg-[#f9fafb] border-b border-[#eaecf0] px-4 py-3">
            <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
              LOI Requests
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-[#eaecf0]">
            {filteredRequests.map((request) => {
              const actionNeeded = getActionNeeded(request);
              const progressSteps = getProgressSteps(request.currentStep);
              
              return (
                <div 
                  key={request.id} 
                  className={`hover:bg-[#f9fafb] ${actionNeeded ? 'bg-[#fff9f5] border-l-4 border-l-[#ff8200]' : ''}`}
                >
                  {/* Desktop View */}
                  <div className="hidden lg:block px-6 py-4">
                    <div className="grid grid-cols-8 gap-4 items-center">
                      <div className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#101828] leading-[20px]">
                        {request.caseId}
                        {actionNeeded && (
                          <div className="flex items-center gap-1 mt-1">
                            <AlertCircle className="h-3 w-3 text-[#ff8200]" />
                            <span className="text-[10px] text-[#ff8200] font-medium">Action Required</span>
                          </div>
                        )}
                      </div>
                      <div className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#475467] leading-[20px]">
                        {request.customerName}
                      </div>
                      <div className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#475467] leading-[20px]">
                        {request.accountNumber}
                      </div>
                      <div className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#101828] leading-[20px]">
                        ₦{request.totalAmount}
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className={`inline-flex items-center px-[8px] py-[2px] rounded-[1000px] font-['Inter:Medium',_sans-serif] font-medium text-[12px] leading-[18px] ${getStatusBadge(request.status)}`}>
                          <div className={`w-[6px] h-[6px] rounded-full mr-[6px] ${getStatusDot(request.status)}`} />
                          {request.status}
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
                      <div className="flex flex-col">
                        <div className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#475467] leading-[20px]">
                          {request.currentStep}
                        </div>
                        {actionNeeded && (
                          <div className="flex items-center gap-1 mt-1">
                            <Clock className="h-3 w-3 text-[#ff8200]" />
                            <span className="text-[10px] text-[#ff8200] font-medium">Awaiting your review</span>
                          </div>
                        )}
                      </div>
                      <div className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#475467] leading-[20px]">
                        {request.dateTime}
                      </div>
                      <div className="flex gap-2">
                        {canViewRequest(request) && (
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onViewRequest) {
                                // Check if this is a real request from allRequests
                                const realRequest = allRequests.find(r => r.caseId === request.caseId);
                                if (realRequest) {
                                  onViewRequest(realRequest);
                                } else {
                                  onViewRequest(request);
                                }
                              }
                            }}
                            variant="outline"
                            size="sm"
                            className={`h-8 px-3 ${
                              actionNeeded 
                                ? 'border-[#ff8200] text-[#ff8200] hover:bg-[#ff8200] hover:text-white' 
                                : 'border-[#d0d5dd] text-[#344054] hover:bg-[#f9fafb]'
                            }`}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            {actionNeeded ? 'Review' : 'View'}
                          </Button>
                        )}
                        {!canViewRequest(request) && (
                          <span className="text-[12px] text-[#667085] italic">In Progress</span>
                        )}
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
                            {request.customerName}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {canViewRequest(request) && (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onViewRequest) {
                                  const realRequest = allRequests.find(r => r.caseId === request.caseId);
                                  if (realRequest) {
                                    onViewRequest(realRequest);
                                  } else {
                                    onViewRequest(request);
                                  }
                                }
                              }}
                              variant="outline"
                              size="sm"
                              className={`h-7 px-2 ${
                                actionNeeded 
                                  ? 'border-[#ff8200] text-[#ff8200] hover:bg-[#ff8200] hover:text-white' 
                                  : 'border-[#d0d5dd] text-[#344054] hover:bg-[#f9fafb]'
                              }`}
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              {actionNeeded ? 'Review' : 'View'}
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-[10px] text-[#667085] uppercase font-medium mb-1">Amount</div>
                          <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#101828] leading-[16px]">
                            ₦{request.totalAmount}
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] text-[#667085] uppercase font-medium mb-1">Status</div>
                          <span className={`inline-flex items-center px-[6px] py-[1px] rounded-[1000px] font-['Inter:Medium',_sans-serif] font-medium text-[10px] leading-[14px] ${getStatusBadge(request.status)}`}>
                            <div className={`w-[4px] h-[4px] rounded-full mr-[4px] ${getStatusDot(request.status)}`} />
                            {request.status}
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
                        <div className="text-[11px] text-[#475467]">{request.currentStep}</div>
                      </div>

                      {actionNeeded && (
                        <div className="flex items-center gap-1 p-2 bg-[#fff9f5] border border-[#ff8200] rounded-[6px]">
                          <AlertCircle className="h-3 w-3 text-[#ff8200]" />
                          <span className="text-[10px] text-[#ff8200] font-medium">Action Required - Awaiting your review</span>
                        </div>
                      )}

                      <div className="text-[10px] text-[#667085]">
                        {request.dateTime}
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
                <FileText className="w-8 h-8 text-[#667085]" />
              </div>
              <h3 className="font-['Inter:Medium',_sans-serif] font-medium text-[18px] text-[#101828] leading-[28px] mb-2">
                No LOI requests found
              </h3>
              <p className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#475467] leading-[20px]">
                Try adjusting your search or filter criteria, or create a new LOI request.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function LOIHistory({ userRole, onNewRequest, onLogout, onViewRequest, breadcrumbs, onBreadcrumbClick, allRequests }: LOIHistoryProps) {
  return (
    <ServiceCentralLayout
      sidebarContent={<SidebarContent userRole={userRole} onLogout={onLogout} />}
      headerContent={<HeaderContent />}
    >
      <MainContent 
        userRole={userRole}
        onNewRequest={onNewRequest}
        onLogout={onLogout}
        onViewRequest={onViewRequest}
        breadcrumbs={breadcrumbs}
        onBreadcrumbClick={onBreadcrumbClick}
        allRequests={allRequests}
      />
    </ServiceCentralLayout>
  );
}