import React, { useState } from 'react';
import { ServiceCentralLayout } from '../ServiceCentralLayout';
import { BreadcrumbNavigation } from '../shared/BreadcrumbNavigation';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Search, Users, Eye, ChevronDown, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';
import { BulkRequest, BreadcrumbItem, RequestStatus } from './CDMSTypes';
import accessLogo from 'figma:asset/3ebf5c44175bf36c1eceb7236d272904dfc164a1.png';

interface AuthorizerHistoryProps {
  userRole: string | null;
  onReviewRequest: (request: BulkRequest) => void;
  onLogout: () => void;
  allRequests: BulkRequest[];
  currentUser: string;
}

// Status Badge
function StatusBadge({ status }: { status: RequestStatus }) {
  const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
    'Pending Authorization': { bg: 'bg-[#fff7ed]', text: 'text-[#92400E]', dot: 'bg-[#ff8200]' },
    'Approved': { bg: 'bg-[#ecfdf3]', text: 'text-[#027a48]', dot: 'bg-[#12b76a]' },
    'Rejected': { bg: 'bg-[#fef3f2]', text: 'text-[#b42318]', dot: 'bg-[#f04438]' },
    'Processing': { bg: 'bg-[#f4f3ff]', text: 'text-[#5925dc]', dot: 'bg-[#5925dc]' },
    'Completed': { bg: 'bg-[#ecfdf3]', text: 'text-[#027a48]', dot: 'bg-[#12b76a]' },
    'Failed': { bg: 'bg-[#fef3f2]', text: 'text-[#b42318]', dot: 'bg-[#f04438]' },
  };

  const config = statusConfig[status] || statusConfig['Pending Authorization'];

  return (
    <span className={`inline-flex items-center px-[8px] py-[2px] rounded-[1000px] text-[12px] border ${config.bg} ${config.text}`}>
      <div className={`w-[6px] h-[6px] rounded-full mr-[6px] ${config.dot}`} />
      {status}
    </span>
  );
}

// Action Type Badge
function ActionTypeBadge({ actionType }: { actionType: string }) {
  const typeConfig: Record<string, { bg: string; text: string }> = {
    'Place PND': { bg: 'bg-[#fef3f2]', text: 'text-[#b42318]' },
    'Lift PND': { bg: 'bg-[#ecfdf3]', text: 'text-[#027a48]' },
    'Place Hold': { bg: 'bg-[#fff7ed]', text: 'text-[#92400E]' },
    'Release Hold': { bg: 'bg-[#eff8ff]', text: 'text-[#175cd3]' },
  };

  const config = typeConfig[actionType] || typeConfig['Place PND'];

  return (
    <span className={`inline-flex items-center px-[8px] py-[2px] rounded-[1000px] text-[12px] ${config.bg} ${config.text}`}>
      {actionType}
    </span>
  );
}

// Sidebar
function SidebarContent({ 
  userRole, 
  onLogout
}: { 
  userRole: string | null; 
  onLogout: () => void;
}) {
  return (
    <div className="h-full flex flex-col">
      <div className="h-[65px] border-b border-[#d0d5dd] flex items-center px-[16px]">
        <div className="flex items-center gap-[10px]">
          <img src={accessLogo} alt="Access Bank" className="h-8" />
          <div>
            <h1 className="text-[14px] font-bold text-[#003883]">Service Central</h1>
            <p className="text-[12px] text-[#526484]">CDMS Portal</p>
          </div>
        </div>
      </div>

      <div className="px-[16px] py-[16px] border-b border-[#d0d5dd]">
        <div className="text-[18px] text-[#003883]">CDMS Portal</div>
        <div className="flex items-center gap-2 mt-1">
          <Users className="h-4 w-4 text-[#526484]" />
          <span className="text-[12px] text-[#526484]">Role:</span>
          <Badge className="bg-[#003883] text-white text-[11px] h-5">Authorizer</Badge>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-[16px]">
        <div className="space-y-2">
          <div className="px-4 py-2 bg-[#003883] text-white rounded-lg">
            <div className="text-[14px]">Authorization Queue</div>
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

// Main Content
function MainContent({
  userRole,
  onReviewRequest,
  allRequests,
  currentUser
}: AuthorizerHistoryProps) {
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionTypeFilter, setActionTypeFilter] = useState('All Action Types');
  const [showActionTypeDropdown, setShowActionTypeDropdown] = useState(false);

  const actionTypeOptions = ['All Action Types', 'Place PND', 'Lift PND', 'Place Hold', 'Release Hold'];

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'CDMS Bulk Portal', screen: 'authorization', icon: null, current: true, isClickable: false }
  ];

  // Filter requests for authorization
  const pendingRequests = allRequests.filter(req => req.status === 'Pending Authorization');
  const completedRequests = allRequests.filter(req => 
    req.status === 'Approved' || req.status === 'Rejected' || req.status === 'Completed' || req.status === 'Failed'
  );

  console.log('\n👤 AUTHORIZER HISTORY:');
  console.log('Total requests in system:', allRequests.length);
  console.log('Pending authorization:', pendingRequests.length);
  console.log('Completed:', completedRequests.length);
  console.log('Pending requests details:', pendingRequests.map(r => ({
    requestId: r.requestId,
    submittedBy: r.submittedByName,
    actionType: r.actionType,
    status: r.status
  })));

  // Apply filters
  const filterRequests = (requests: BulkRequest[]) => {
    let filtered = requests;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(req =>
        req.requestId.toLowerCase().includes(query) ||
        req.fileName.toLowerCase().includes(query) ||
        req.submittedByName.toLowerCase().includes(query)
      );
    }

    if (actionTypeFilter !== 'All Action Types') {
      filtered = filtered.filter(req => req.actionType === actionTypeFilter);
    }

    return filtered;
  };

  const displayedRequests = filterRequests(activeTab === 'pending' ? pendingRequests : completedRequests);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="h-[65px] border-b border-[#d0d5dd] flex items-center justify-between px-[24px] flex-shrink-0">
        <BreadcrumbNavigation items={breadcrumbs} />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-6 lg:py-8">
          <div className="mb-8">
            <h1 className="text-[30px] text-[#101828] mb-2">Authorization Queue</h1>
            <p className="text-[16px] text-[#475467]">
              Review and authorize bulk restriction requests
            </p>
          </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="bg-white border border-[#d0d5dd] rounded-[8px] shadow-sm overflow-hidden">
            <div className="flex">
              <div 
                onClick={() => setActiveTab('pending')}
                className={`px-[16px] py-[10px] border-r border-[#d0d5dd] flex-1 lg:flex-none cursor-pointer ${activeTab === 'pending' ? 'bg-[#ebeef2]' : 'hover:bg-[#f9fafb]'}`}
              >
                <div className={`text-[14px] text-center lg:text-left ${activeTab === 'pending' ? 'text-[#003883] font-semibold' : 'text-[#344054]'}`}>
                  Pending ({pendingRequests.length})
                </div>
              </div>
              
              <div 
                onClick={() => setActiveTab('completed')}
                className={`px-[16px] py-[10px] flex-1 lg:flex-none cursor-pointer ${activeTab === 'completed' ? 'bg-[#ebeef2]' : 'hover:bg-[#f9fafb]'}`}
              >
                <div className={`text-[14px] text-center lg:text-left ${activeTab === 'completed' ? 'text-[#003883] font-semibold' : 'text-[#344054]'}`}>
                  Completed ({completedRequests.length})
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-50 rounded-[12px] p-4 lg:p-[20px] mb-6">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-[16px]">
            <div className="flex-1">
              <label className="text-[14px] text-[#344054] block mb-2">Search</label>
              <div className="bg-white rounded-[8px] border border-[#d0d5dd] shadow-sm">
                <div className="flex items-center px-[14px] py-[10px]">
                  <Search className="h-[20px] w-[20px] text-[#667085] mr-[8px]" />
                  <Input 
                    placeholder="Search by Request ID, File Name, or Initiator"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 border-0 outline-none bg-transparent text-[16px] text-[#667085] placeholder:text-[#667085]"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex-1 lg:flex-initial lg:min-w-[200px] relative">
              <label className="text-[14px] text-[#344054] block mb-2">Action Type</label>
              <div className="bg-white rounded-[8px] border border-[#d0d5dd] shadow-sm">
                <button
                  onClick={() => setShowActionTypeDropdown(!showActionTypeDropdown)}
                  className="w-full flex items-center justify-between px-[14px] py-[10px]"
                >
                  <span className="text-[16px] text-[#667085]">{actionTypeFilter}</span>
                  <ChevronDown className="h-[20px] w-[20px] text-[#667085]" />
                </button>
                
                {showActionTypeDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#d0d5dd] rounded-[8px] shadow-lg z-10">
                    {actionTypeOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setActionTypeFilter(option);
                          setShowActionTypeDropdown(false);
                        }}
                        className="w-full px-[14px] py-[10px] text-left hover:bg-[#f9fafb] text-[16px] text-[#667085]"
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

        {/* Request Table */}
        <div className="bg-white border border-[#d0d5dd] rounded-[12px] shadow-sm overflow-hidden">
          {displayedRequests.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f9fafb]">
                  <tr>
                    <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">Request ID</th>
                    <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">Submitted By</th>
                    <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">Unit</th>
                    <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">Action Type</th>
                    <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">Records</th>
                    <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">Date Submitted</th>
                    <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">Status</th>
                    <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedRequests.map((request, index) => (
                    <tr key={request.id} className={`border-t border-[#eaecf0] ${index % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'}`}>
                      <td className="py-[16px] px-[16px]">
                        <div className="text-[14px] text-[#101828]">{request.requestId}</div>
                        <div className="text-[12px] text-[#667085]">{request.fileName}</div>
                      </td>
                      <td className="py-[16px] px-[16px]">
                        <div className="text-[14px] text-[#101828]">{request.submittedByName}</div>
                      </td>
                      <td className="py-[16px] px-[16px]">
                        <div className="text-[14px] text-[#475467]">{request.unit}</div>
                      </td>
                      <td className="py-[16px] px-[16px]">
                        <ActionTypeBadge actionType={request.actionType} />
                      </td>
                      <td className="py-[16px] px-[16px]">
                        <div className="text-[14px] text-[#101828]">{request.totalRecords}</div>
                        <div className="text-[12px] text-[#667085]">
                          {request.validRecords} valid, {request.invalidRecords} invalid
                        </div>
                      </td>
                      <td className="py-[16px] px-[16px]">
                        <div className="text-[14px] text-[#475467]">
                          {new Date(request.dateSubmitted).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </div>
                      </td>
                      <td className="py-[16px] px-[16px]">
                        <StatusBadge status={request.status} />
                      </td>
                      <td className="py-[16px] px-[16px]">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onReviewRequest(request)}
                          className="border-[#d0d5dd]"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          {activeTab === 'pending' ? 'Review' : 'View'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-16 text-center">
              <FileText className="h-12 w-12 text-[#d0d5dd] mx-auto mb-4" />
              <p className="text-[16px] text-[#475467] mb-2">No requests found</p>
              <p className="text-[14px] text-[#667085]">
                {activeTab === 'pending' ? 'No pending authorization requests at the moment.' : 'No completed requests found.'}
              </p>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}

export function AuthorizerHistory(props: AuthorizerHistoryProps) {
  return (
    <ServiceCentralLayout
      sidebarContent={<SidebarContent userRole={props.userRole} onLogout={props.onLogout} />}
    >
      <MainContent {...props} />
    </ServiceCentralLayout>
  );
}
