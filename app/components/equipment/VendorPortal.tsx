import React, { useState } from 'react';
import { ServiceCentralLayout } from '../ServiceCentralLayout';
import { BreadcrumbNavigation } from '../shared/BreadcrumbNavigation';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Search, Upload, Eye, Clock, CheckCircle2, FileText, Lock, Shield, Users, ChevronDown } from 'lucide-react';
import { ServiceRequest, BreadcrumbItem } from './EquipmentTypes';
import accessLogo from 'figma:asset/3ebf5c44175bf36c1eceb7236d272904dfc164a1.png';

interface VendorPortalProps {
  userRole: string | null;
  onUploadForm: (request: ServiceRequest) => void;
  onViewRequest: (request: ServiceRequest) => void;
  onLogout: () => void;
  allRequests: ServiceRequest[];
  vendorEmail: string;
}

// Sidebar Navigation
function SidebarContent({ userRole, onLogout }: { 
  userRole: string | null; 
  onLogout: () => void;
}) {
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
              Vendor Portal
            </p>
          </div>
        </div>
      </div>

      {/* User Info with Role Badge */}
      <div className="px-[16px] py-[16px] border-b border-[#d0d5dd]">
        <div className="font-['Inter:Bold',_sans-serif] font-bold text-[18px] text-[#003883] leading-[30px]">
          Vendor Portal
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Users className="h-4 w-4 text-[#526484]" />
          <span className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#526484] leading-[16px]">Role:</span>
          <Badge className="bg-[#003883] text-white text-[11px] h-5">
            Vendor
          </Badge>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-[12px] py-[8px]">
        <div className="flex flex-col gap-[8px]">
          {/* Equipment Servicing - Active */}
          <div className="bg-[#ebeef2] h-[44px] rounded-[6px] flex items-center px-[12px] gap-[12px]">
            <FileText className="h-[20px] w-[20px] text-[#003883]" />
            <span className="font-['DM_Sans:Bold',_sans-serif] font-bold text-[15px] text-[#003883] leading-[20px] tracking-[0.15px]">
              Equipment Servicing
            </span>
          </div>

          {/* Logout */}
          <div 
            onClick={onLogout}
            className="h-[44px] rounded-[6px] flex items-center px-[12px] gap-[12px] hover:bg-[#f3f3f5] cursor-pointer"
          >
            <div className="h-[20px] w-[20px] flex items-center justify-center">
              <div className="w-[16px] h-[16px] border-2 border-[#526484] rounded rotate-45"></div>
            </div>
            <span className="font-['DM_Sans:Bold',_sans-serif] font-bold text-[15px] text-[#526484] leading-[20px] tracking-[0.15px]">
              Logout
            </span>
          </div>
        </div>
      </div>

      {/* Security & Audit Trail Indicator */}
      <div className="px-[16px] py-[12px] border-t border-[#d0d5dd] bg-[#f9fafb]">
        <div className="flex items-center gap-[8px] mb-2">
          <Lock className="h-[16px] w-[16px] text-[#21a366]" />
          <span className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#21a366] leading-[16px]">
            SSL/TLS Secured
          </span>
        </div>
        <div className="flex items-center gap-[8px]">
          <Shield className="h-[16px] w-[16px] text-[#003883]" />
          <span className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#003883] leading-[16px]">
            Audit Trail Active
          </span>
        </div>
      </div>
    </div>
  );
}

// Header Content
function HeaderContent() {
  return <div className="h-full" />;
}

// Status Badge Component
function StatusBadge({ status }: { status: string }) {
  const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
    'Pending': { bg: 'bg-[#fff7ed]', text: 'text-[#92400E]', dot: 'bg-[#ff8200]' },
    'Pending Approval': { bg: 'bg-[#fff7ed]', text: 'text-[#92400E]', dot: 'bg-[#ff8200]' },
    'Approved': { bg: 'bg-[#ecfdf3]', text: 'text-[#027a48]', dot: 'bg-[#12b76a]' },
    'Assigned': { bg: 'bg-[#eff8ff]', text: 'text-[#175cd3]', dot: 'bg-[#175cd3]' },
    'In Progress': { bg: 'bg-[#f4f3ff]', text: 'text-[#5925dc]', dot: 'bg-[#5925dc]' },
    'Completed': { bg: 'bg-[#ecfdf3]', text: 'text-[#027a48]', dot: 'bg-[#12b76a]' },
    'Overdue': { bg: 'bg-[#fef3f2]', text: 'text-[#b42318]', dot: 'bg-[#f04438]' },
    'Rejected': { bg: 'bg-[#fef3f2]', text: 'text-[#b42318]', dot: 'bg-[#f04438]' },
  };

  const config = statusConfig[status] || statusConfig['Pending'];

  return (
    <span className={`inline-flex items-center px-[8px] py-[2px] rounded-[1000px] font-['Inter:Medium',_sans-serif] font-medium text-[12px] leading-[18px] border ${config.bg} ${config.text}`}>
      <div className={`w-[6px] h-[6px] rounded-full mr-[6px] ${config.dot}`} />
      {status}
    </span>
  );
}

// Main Content Component
function MainContent({
  userRole,
  onUploadForm,
  onViewRequest,
  allRequests,
  vendorEmail
}: VendorPortalProps) {
  const [activeTab, setActiveTab] = useState<'today' | 'historical'>('today');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  // Breadcrumb setup
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'My Tasks', screen: 'vendor-portal', icon: null, current: true, isClickable: false }
  ];

  const statusOptions = ['All Statuses', 'Assigned', 'In Progress', 'Completed'];

  // Vendor ONLY sees requests assigned to them (where vendorEmail matches)
  const myRequests = allRequests.filter(req => 
    req.vendorEmail === vendorEmail && 
    req.status !== 'Pending Approval' && 
    req.status !== 'Rejected'
  );

  // Debug logging
  console.log('=== VENDOR PORTAL DEBUG ===');
  console.log('Vendor Email:', vendorEmail);
  console.log('Total Requests:', allRequests.length);
  console.log('My Requests:', myRequests.length);
  console.log('My Requests Details:', myRequests.map(r => ({ 
    caseId: r.caseId, 
    vendorEmail: r.vendorEmail,
    status: r.status 
  })));

  // TODAY'S REQUESTS: Assigned or In Progress (tasks that need vendor action)
  const todaysRequests = myRequests.filter(req => 
    req.status === 'Assigned' || req.status === 'In Progress'
  );
  console.log('Today\'s Requests (Active):', todaysRequests.length);

  // HISTORICAL REQUESTS: Only Completed requests
  const historicalRequests = myRequests.filter(req => 
    req.status === 'Completed'
  );
  console.log('Historical Requests:', historicalRequests.length);
  console.log('===========================');

  // Apply filters
  const filterRequests = (requests: ServiceRequest[]) => {
    let filtered = requests;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(req =>
        req.caseId.toLowerCase().includes(query) ||
        req.branchName.toLowerCase().includes(query) ||
        req.equipmentType.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== 'All Statuses') {
      filtered = filtered.filter(req => req.status === statusFilter);
    }

    return filtered;
  };

  const currentRequests = activeTab === 'today' ? filterRequests(todaysRequests) : filterRequests(historicalRequests);

  return (
    <div className="w-full h-full bg-white overflow-y-auto">
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        {/* Breadcrumbs */}
        <BreadcrumbNavigation
          breadcrumbs={breadcrumbs}
          onBreadcrumbClick={() => {}}
        />

        {/* Page Title */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 lg:mb-8">
          <div className="flex flex-col gap-[4px]">
            <h1 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[24px] lg:text-[30px] text-[#101828] leading-[32px] lg:leading-[38px]">
              My Assigned Servicing Tasks
            </h1>
            <p className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] lg:text-[16px] text-[#475467] leading-[20px] lg:leading-[24px]">
              View and manage your assigned equipment servicing tasks
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="bg-white border border-[#d0d5dd] rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] overflow-hidden">
            <div className="flex">
              {/* Today's Tasks */}
              <div 
                onClick={() => setActiveTab('today')}
                className={`px-[16px] py-[10px] border-r border-[#d0d5dd] flex-1 lg:flex-none cursor-pointer ${activeTab === 'today' ? 'bg-[#ebeef2]' : 'hover:bg-[#f9fafb]'}`}
              >
                <div className={`font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[14px] leading-[20px] text-center lg:text-left ${activeTab === 'today' ? 'text-[#003883]' : 'text-[#344054]'}`}>
                  Active Tasks ({todaysRequests.length})
                </div>
              </div>
              
              {/* Historical Tasks */}
              <div 
                onClick={() => setActiveTab('historical')}
                className={`px-[16px] py-[10px] flex-1 lg:flex-none cursor-pointer ${activeTab === 'historical' ? 'bg-[#ebeef2]' : 'hover:bg-[#f9fafb]'}`}
              >
                <div className={`font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[14px] leading-[20px] text-center lg:text-left ${activeTab === 'historical' ? 'text-[#003883]' : 'text-[#344054]'}`}>
                  Completed Tasks ({historicalRequests.length})
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
                    placeholder="Search by Case ID, Branch, or Equipment"
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

        {/* Tasks Table */}
        <div className="bg-white rounded-[12px] border border-[#eaecf0] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] overflow-hidden">
          {/* Desktop Table Header */}
          <div className="hidden lg:block bg-[#f9fafb] border-b border-[#eaecf0] px-6 py-3">
            <div className="grid grid-cols-7 gap-4">
              <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                Case ID
              </div>
              <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                Branch
              </div>
              <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                Equipment
              </div>
              <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                Type
              </div>
              <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                Status
              </div>
              <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                Scheduled Date
              </div>
              <div className="font-['Inter:Medium',_sans-serif] font-medium text-[12px] text-[#475467] leading-[18px] uppercase tracking-[0.05em]">
                Actions
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-[#eaecf0]">
            {currentRequests.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-[#f3f3f5] rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-[#667085]" />
                </div>
                <h3 className="font-['Inter:Medium',_sans-serif] font-medium text-[18px] text-[#101828] leading-[28px] mb-2">
                  No tasks found
                </h3>
                <p className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#475467] leading-[20px]">
                  {searchQuery || statusFilter !== 'All Statuses' 
                    ? 'Try adjusting your search or filters' 
                    : activeTab === 'today'
                      ? 'No active tasks assigned to you'
                      : 'No completed tasks to display'}
                </p>
              </div>
            ) : (
              currentRequests.map((request) => (
                <div key={request.id} className="px-6 py-4 hover:bg-[#f9fafb] transition-colors">
                  {/* Desktop Row */}
                  <div className="hidden lg:grid grid-cols-7 gap-4 items-center">
                    <div className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#101828] leading-[20px]">
                      {request.caseId}
                    </div>
                    <div className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#475467] leading-[20px]">
                      {request.branchName}
                    </div>
                    <div className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#475467] leading-[20px]">
                      {request.equipmentType}
                    </div>
                    <div>
                      <Badge className={`${request.serviceType === 'Auto' ? 'bg-[#eff8ff] text-[#175cd3]' : 'bg-[#f4f3ff] text-[#5925dc]'} text-[11px]`}>
                        {request.serviceType}
                      </Badge>
                    </div>
                    <div>
                      <StatusBadge status={request.status} />
                    </div>
                    <div className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#475467] leading-[20px]">
                      {request.dateScheduled 
                        ? new Date(request.dateScheduled).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                        : 'Not scheduled'}
                    </div>
                    <div className="flex items-center gap-2">
                      {request.status === 'Assigned' || request.status === 'In Progress' ? (
                        <Button
                          onClick={() => onUploadForm(request)}
                          size="sm"
                          className="h-8 px-3 bg-[#003883] hover:bg-[#002664] text-white"
                        >
                          <Upload className="h-4 w-4 mr-1" />
                          <span className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] leading-[20px]">
                            Upload
                          </span>
                        </Button>
                      ) : (
                        <Button
                          onClick={() => onViewRequest(request)}
                          size="sm"
                          variant="outline"
                          className="h-8 px-3 border-[#d0d5dd] text-[#344054] hover:bg-[#f9fafb]"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          <span className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] leading-[20px]">
                            View
                          </span>
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Mobile Card */}
                  <div className="lg:hidden space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#101828] leading-[20px] mb-1">
                          {request.caseId}
                        </div>
                        <div className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] text-[#475467] leading-[20px]">
                          {request.branchName}
                        </div>
                      </div>
                      <StatusBadge status={request.status} />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-['Inter:Medium',_sans-serif] text-[#475467]">Equipment:</span>
                        <span className="font-['Inter:Regular',_sans-serif] text-[#101828] ml-1">{request.equipmentType}</span>
                      </div>
                      <div>
                        <span className="font-['Inter:Medium',_sans-serif] text-[#475467]">Type:</span>
                        <Badge className={`${request.serviceType === 'Auto' ? 'bg-[#eff8ff] text-[#175cd3]' : 'bg-[#f4f3ff] text-[#5925dc]'} text-[11px] ml-1`}>
                          {request.serviceType}
                        </Badge>
                      </div>
                      <div className="col-span-2">
                        <span className="font-['Inter:Medium',_sans-serif] text-[#475467]">Scheduled:</span>
                        <span className="font-['Inter:Regular',_sans-serif] text-[#101828] ml-1">
                          {request.dateScheduled 
                            ? new Date(request.dateScheduled).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                            : 'Not scheduled'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {request.status === 'Assigned' || request.status === 'In Progress' ? (
                        <Button
                          onClick={() => onUploadForm(request)}
                          size="sm"
                          className="flex-1 h-8 bg-[#003883] hover:bg-[#002664] text-white"
                        >
                          <Upload className="h-4 w-4 mr-1" />
                          <span className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] leading-[20px]">
                            Upload
                          </span>
                        </Button>
                      ) : (
                        <Button
                          onClick={() => onViewRequest(request)}
                          size="sm"
                          variant="outline"
                          className="flex-1 h-8 border-[#d0d5dd] text-[#344054] hover:bg-[#f9fafb]"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          <span className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] leading-[20px]">
                            View
                          </span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function VendorPortal(props: VendorPortalProps) {
  return (
    <ServiceCentralLayout
      sidebarContent={<SidebarContent userRole={props.userRole} onLogout={props.onLogout} />}
      headerContent={<HeaderContent />}
    >
      <MainContent {...props} />
    </ServiceCentralLayout>
  );
}
