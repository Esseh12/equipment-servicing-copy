import React, { useState } from 'react';
import { ServiceCentralLayout } from '../ServiceCentralLayout';
import { BreadcrumbNavigation } from '../shared/BreadcrumbNavigation';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Download, FileText, Users, Calendar } from 'lucide-react';
import { BulkRequest, BreadcrumbItem, UserRole } from './CDMSTypes';
import accessLogo from 'figma:asset/3ebf5c44175bf36c1eceb7236d272904dfc164a1.png';

interface ReportsPageProps {
  userRole: UserRole;
  onLogout: () => void;
  allRequests: BulkRequest[];
}

// Sidebar
function SidebarContent({ 
  userRole, 
  onLogout
}: { 
  userRole: UserRole; 
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
          <Badge className="bg-[#003883] text-white text-[11px] h-5">{userRole}</Badge>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-[16px]">
        <div className="space-y-2">
          <div className="px-4 py-2 bg-[#003883] text-white rounded-lg">
            <div className="text-[14px]">Reports</div>
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
  allRequests
}: ReportsPageProps) {
  const [activeTab, setActiveTab] = useState<'activity' | 'status' | 'errors' | 'summary'>('summary');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'CDMS Bulk Portal', screen: 'reports', icon: null, current: false, isClickable: false },
    { label: 'Reports', screen: 'reports', icon: null, current: true, isClickable: false }
  ];

  // Calculate statistics
  const totalRequests = allRequests.length;
  const approvedRequests = allRequests.filter(r => r.status === 'Approved').length;
  const rejectedRequests = allRequests.filter(r => r.status === 'Rejected').length;
  const pendingRequests = allRequests.filter(r => r.status === 'Pending Authorization').length;
  const totalRecordsProcessed = allRequests.reduce((sum, r) => sum + r.validRecords, 0);

  // Action type breakdown
  const placePND = allRequests.filter(r => r.actionType === 'Place PND').length;
  const liftPND = allRequests.filter(r => r.actionType === 'Lift PND').length;
  const placeHold = allRequests.filter(r => r.actionType === 'Place Hold').length;
  const releaseHold = allRequests.filter(r => r.actionType === 'Release Hold').length;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="h-[65px] border-b border-[#d0d5dd] flex items-center justify-between px-[24px] flex-shrink-0">
        <BreadcrumbNavigation items={breadcrumbs} />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-6 lg:py-8">
          <div className="mb-8">
            <h1 className="text-[30px] text-[#101828] mb-2">Reports & Analytics</h1>
            <p className="text-[16px] text-[#475467]">
              View activity, status, and summary reports
            </p>
          </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="bg-white border border-[#d0d5dd] rounded-[8px] shadow-sm overflow-hidden">
            <div className="flex overflow-x-auto">
              {[
                { key: 'summary', label: 'Summary View' },
                { key: 'activity', label: 'Upload Activity' },
                { key: 'status', label: 'Restriction Status' },
                { key: 'errors', label: 'Error Report' }
              ].map((tab) => (
                <div
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-[16px] py-[10px] border-r border-[#d0d5dd] cursor-pointer whitespace-nowrap ${
                    activeTab === tab.key ? 'bg-[#ebeef2]' : 'hover:bg-[#f9fafb]'
                  }`}
                >
                  <div className={`text-[14px] ${activeTab === tab.key ? 'text-[#003883] font-semibold' : 'text-[#344054]'}`}>
                    {tab.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-50 rounded-[12px] p-4 lg:p-[20px] mb-6">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-[16px] items-end">
            <div className="flex-1">
              <label className="text-[14px] text-[#344054] block mb-2">Date From</label>
              <div className="bg-white rounded-[8px] border border-[#d0d5dd] shadow-sm">
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="border-0"
                />
              </div>
            </div>

            <div className="flex-1">
              <label className="text-[14px] text-[#344054] block mb-2">Date To</label>
              <div className="bg-white rounded-[8px] border border-[#d0d5dd] shadow-sm">
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="border-0"
                />
              </div>
            </div>

            <Button className="bg-[#003883] hover:bg-[#002664] text-white">
              Apply Filters
            </Button>

            <Button variant="outline" className="border-[#d0d5dd]">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Summary View */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-[#eaecf0] rounded-[12px] p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[#eff8ff] rounded-[8px] flex items-center justify-center">
                    <FileText className="h-5 w-5 text-[#175cd3]" />
                  </div>
                  <div>
                    <p className="text-[12px] text-[#667085]">Total Requests</p>
                    <p className="text-[24px] text-[#101828]">{totalRequests}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#eaecf0] rounded-[12px] p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[#ecfdf3] rounded-[8px] flex items-center justify-center">
                    <FileText className="h-5 w-5 text-[#12b76a]" />
                  </div>
                  <div>
                    <p className="text-[12px] text-[#667085]">Approved</p>
                    <p className="text-[24px] text-[#101828]">{approvedRequests}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#eaecf0] rounded-[12px] p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[#fef3f2] rounded-[8px] flex items-center justify-center">
                    <FileText className="h-5 w-5 text-[#f04438]" />
                  </div>
                  <div>
                    <p className="text-[12px] text-[#667085]">Rejected</p>
                    <p className="text-[24px] text-[#101828]">{rejectedRequests}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#eaecf0] rounded-[12px] p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[#fff7ed] rounded-[8px] flex items-center justify-center">
                    <FileText className="h-5 w-5 text-[#ff8200]" />
                  </div>
                  <div>
                    <p className="text-[12px] text-[#667085]">Pending</p>
                    <p className="text-[24px] text-[#101828]">{pendingRequests}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Type Breakdown */}
            <div className="bg-white border border-[#eaecf0] rounded-[12px] p-6">
              <h3 className="text-[18px] text-[#101828] mb-4">Action Type Breakdown</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-[#fef3f2] rounded-lg">
                  <p className="text-[24px] text-[#b42318] mb-1">{placePND}</p>
                  <p className="text-[12px] text-[#667085]">Place PND</p>
                </div>
                <div className="text-center p-4 bg-[#ecfdf3] rounded-lg">
                  <p className="text-[24px] text-[#027a48] mb-1">{liftPND}</p>
                  <p className="text-[12px] text-[#667085]">Lift PND</p>
                </div>
                <div className="text-center p-4 bg-[#fff7ed] rounded-lg">
                  <p className="text-[24px] text-[#92400E] mb-1">{placeHold}</p>
                  <p className="text-[12px] text-[#667085]">Place Hold</p>
                </div>
                <div className="text-center p-4 bg-[#eff8ff] rounded-lg">
                  <p className="text-[24px] text-[#175cd3] mb-1">{releaseHold}</p>
                  <p className="text-[12px] text-[#667085]">Release Hold</p>
                </div>
              </div>
            </div>

            {/* Records Processed */}
            <div className="bg-white border border-[#eaecf0] rounded-[12px] p-6">
              <h3 className="text-[18px] text-[#101828] mb-4">Processing Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-[12px] text-[#667085] mb-1">Total Records Processed</p>
                  <p className="text-[30px] text-[#101828]">{totalRecordsProcessed.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[12px] text-[#667085] mb-1">Average Records per Request</p>
                  <p className="text-[30px] text-[#101828]">
                    {totalRequests > 0 ? Math.round(totalRecordsProcessed / totalRequests) : 0}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] text-[#667085] mb-1">Success Rate</p>
                  <p className="text-[30px] text-[#101828]">
                    {totalRequests > 0 ? Math.round((approvedRequests / totalRequests) * 100) : 0}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload Activity */}
        {activeTab === 'activity' && (
          <div className="bg-white border border-[#eaecf0] rounded-[12px] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f9fafb]">
                  <tr>
                    <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">Date</th>
                    <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">File Name</th>
                    <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">User</th>
                    <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">Action Type</th>
                    <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">Accounts</th>
                    <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">Status</th>
                    <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {allRequests.map((request, index) => (
                    <tr key={request.id} className={`border-t border-[#eaecf0] ${index % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'}`}>
                      <td className="py-[12px] px-[16px] text-[14px] text-[#475467]">
                        {new Date(request.dateSubmitted).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="py-[12px] px-[16px] text-[14px] text-[#101828]">{request.fileName}</td>
                      <td className="py-[12px] px-[16px] text-[14px] text-[#475467]">{request.submittedByName}</td>
                      <td className="py-[12px] px-[16px] text-[14px] text-[#475467]">{request.actionType}</td>
                      <td className="py-[12px] px-[16px] text-[14px] text-[#475467]">{request.totalRecords}</td>
                      <td className="py-[12px] px-[16px]">
                        <Badge className={
                          request.status === 'Approved' ? 'bg-[#ecfdf3] text-[#027a48]' :
                          request.status === 'Rejected' ? 'bg-[#fef3f2] text-[#b42318]' :
                          'bg-[#fff7ed] text-[#92400E]'
                        }>
                          {request.status}
                        </Badge>
                      </td>
                      <td className="py-[12px] px-[16px] text-[14px] text-[#475467]">
                        {request.status === 'Approved' ? 'Successful' : request.status === 'Rejected' ? 'Invalid data found' : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {allRequests.length === 0 && (
              <div className="py-16 text-center">
                <FileText className="h-12 w-12 text-[#d0d5dd] mx-auto mb-4" />
                <p className="text-[16px] text-[#475467]">No activity data found</p>
              </div>
            )}
          </div>
        )}

        {/* Restriction Status Report */}
        {activeTab === 'status' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white border border-[#eaecf0] rounded-[12px] p-6">
                <p className="text-[12px] text-[#667085] mb-1">Active PNDs</p>
                <p className="text-[30px] text-[#b42318]">
                  {allRequests.filter(r => r.actionType === 'Place PND' && r.status === 'Approved').reduce((sum, r) => sum + r.validRecords, 0)}
                </p>
              </div>
              <div className="bg-white border border-[#eaecf0] rounded-[12px] p-6">
                <p className="text-[12px] text-[#667085] mb-1">Lifted PNDs</p>
                <p className="text-[30px] text-[#027a48]">
                  {allRequests.filter(r => r.actionType === 'Lift PND' && r.status === 'Approved').reduce((sum, r) => sum + r.validRecords, 0)}
                </p>
              </div>
              <div className="bg-white border border-[#eaecf0] rounded-[12px] p-6">
                <p className="text-[12px] text-[#667085] mb-1">Active Holds</p>
                <p className="text-[30px] text-[#92400E]">
                  {allRequests.filter(r => r.actionType === 'Place Hold' && r.status === 'Approved').reduce((sum, r) => sum + r.validRecords, 0)}
                </p>
              </div>
              <div className="bg-white border border-[#eaecf0] rounded-[12px] p-6">
                <p className="text-[12px] text-[#667085] mb-1">Released Holds</p>
                <p className="text-[30px] text-[#175cd3]">
                  {allRequests.filter(r => r.actionType === 'Release Hold' && r.status === 'Approved').reduce((sum, r) => sum + r.validRecords, 0)}
                </p>
              </div>
            </div>

            {/* Restriction Status Table */}
            <div className="bg-white border border-[#eaecf0] rounded-[12px] shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-[#eaecf0]">
                <h3 className="text-[18px] text-[#101828]">Current Restriction Status</h3>
                <p className="text-[14px] text-[#667085] mt-1">Account-level restriction tracking</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#f9fafb]">
                    <tr>
                      <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">Account Number</th>
                      <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">BVN</th>
                      <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">Restriction Type</th>
                      <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">Current Status</th>
                      <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">Date Applied</th>
                      <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">Applied By</th>
                      <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">Days Active</th>
                      <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">Request ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allRequests
                      .filter(req => req.status === 'Approved' && req.validRecords > 0)
                      .flatMap(req => 
                        req.records
                          .filter(record => record.validationStatus === 'Valid')
                          .slice(0, 5)
                          .map((record, idx) => ({
                            ...record,
                            requestId: req.requestId,
                            actionType: req.actionType,
                            dateSubmitted: req.dateSubmitted,
                            submittedByName: req.submittedByName,
                            daysActive: Math.floor((new Date().getTime() - new Date(req.dateSubmitted).getTime()) / (1000 * 60 * 60 * 24))
                          }))
                      )
                      .slice(0, 20)
                      .map((record, index) => {
                        const isActive = record.actionType === 'Place PND' || record.actionType === 'Place Hold';
                        return (
                          <tr key={index} className={`border-t border-[#eaecf0] ${index % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'}`}>
                            <td className="py-[12px] px-[16px] text-[14px] text-[#101828]">{record.accountNumber}</td>
                            <td className="py-[12px] px-[16px] text-[14px] text-[#475467]">{record.bvn || '—'}</td>
                            <td className="py-[12px] px-[16px]">
                              <Badge className={
                                record.actionType.includes('PND') 
                                  ? 'bg-[#fef3f2] text-[#b42318]' 
                                  : 'bg-[#fff7ed] text-[#92400E]'
                              }>
                                {record.actionType.includes('PND') ? 'PND' : 'Hold'}
                              </Badge>
                            </td>
                            <td className="py-[12px] px-[16px]">
                              <Badge className={isActive ? 'bg-[#fef3f2] text-[#b42318]' : 'bg-[#ecfdf3] text-[#027a48]'}>
                                {isActive ? 'Active' : 'Cleared'}
                              </Badge>
                            </td>
                            <td className="py-[12px] px-[16px] text-[14px] text-[#475467]">
                              {new Date(record.dateSubmitted).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </td>
                            <td className="py-[12px] px-[16px] text-[14px] text-[#475467]">{record.submittedByName}</td>
                            <td className="py-[12px] px-[16px] text-[14px] text-[#475467]">{record.daysActive} days</td>
                            <td className="py-[12px] px-[16px] text-[14px] text-[#475467]">{record.requestId}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              {allRequests.filter(req => req.status === 'Approved').length === 0 && (
                <div className="py-16 text-center">
                  <FileText className="h-12 w-12 text-[#d0d5dd] mx-auto mb-4" />
                  <p className="text-[16px] text-[#475467]">No active restrictions found</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Error Report */}
        {activeTab === 'errors' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-[#eaecf0] rounded-[12px] p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[#fef3f2] rounded-[8px] flex items-center justify-center">
                    <FileText className="h-5 w-5 text-[#f04438]" />
                  </div>
                  <div>
                    <p className="text-[12px] text-[#667085]">Total Invalid Records</p>
                    <p className="text-[24px] text-[#101828]">
                      {allRequests.reduce((sum, r) => sum + r.invalidRecords, 0)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#eaecf0] rounded-[12px] p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[#fff7ed] rounded-[8px] flex items-center justify-center">
                    <FileText className="h-5 w-5 text-[#ff8200]" />
                  </div>
                  <div>
                    <p className="text-[12px] text-[#667085]">Files with Errors</p>
                    <p className="text-[24px] text-[#101828]">
                      {allRequests.filter(r => r.invalidRecords > 0).length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#eaecf0] rounded-[12px] p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[#eff8ff] rounded-[8px] flex items-center justify-center">
                    <FileText className="h-5 w-5 text-[#175cd3]" />
                  </div>
                  <div>
                    <p className="text-[12px] text-[#667085]">Error Rate</p>
                    <p className="text-[24px] text-[#101828]">
                      {allRequests.reduce((sum, r) => sum + r.totalRecords, 0) > 0
                        ? ((allRequests.reduce((sum, r) => sum + r.invalidRecords, 0) / allRequests.reduce((sum, r) => sum + r.totalRecords, 0)) * 100).toFixed(1)
                        : 0}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Summary by Request */}
            <div className="bg-white border border-[#eaecf0] rounded-[12px] shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-[#eaecf0]">
                <h3 className="text-[18px] text-[#101828]">Error Summary by Request</h3>
                <p className="text-[14px] text-[#667085] mt-1">Validation and processing errors</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#f9fafb]">
                    <tr>
                      <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">Request ID</th>
                      <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">File Name</th>
                      <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">Date</th>
                      <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">Total Records</th>
                      <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">Invalid Records</th>
                      <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">Error Rate</th>
                      <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allRequests
                      .filter(req => req.invalidRecords > 0)
                      .map((request, index) => (
                        <tr key={request.id} className={`border-t border-[#eaecf0] ${index % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'}`}>
                          <td className="py-[12px] px-[16px] text-[14px] text-[#101828]">{request.requestId}</td>
                          <td className="py-[12px] px-[16px] text-[14px] text-[#475467]">{request.fileName}</td>
                          <td className="py-[12px] px-[16px] text-[14px] text-[#475467]">
                            {new Date(request.dateSubmitted).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                          <td className="py-[12px] px-[16px] text-[14px] text-[#475467]">{request.totalRecords}</td>
                          <td className="py-[12px] px-[16px]">
                            <span className="text-[14px] text-[#f04438]">{request.invalidRecords}</span>
                          </td>
                          <td className="py-[12px] px-[16px]">
                            <Badge className="bg-[#fef3f2] text-[#b42318]">
                              {((request.invalidRecords / request.totalRecords) * 100).toFixed(1)}%
                            </Badge>
                          </td>
                          <td className="py-[12px] px-[16px]">
                            <Badge className={
                              request.status === 'Approved' ? 'bg-[#ecfdf3] text-[#027a48]' :
                              request.status === 'Rejected' ? 'bg-[#fef3f2] text-[#b42318]' :
                              'bg-[#fff7ed] text-[#92400E]'
                            }>
                              {request.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {allRequests.filter(req => req.invalidRecords > 0).length === 0 && (
                <div className="py-16 text-center">
                  <FileText className="h-12 w-12 text-[#d0d5dd] mx-auto mb-4" />
                  <p className="text-[16px] text-[#475467]">No errors found</p>
                  <p className="text-[14px] text-[#667085] mt-1">All uploaded files have been validated successfully</p>
                </div>
              )}
            </div>

            {/* Detailed Error Records */}
            {allRequests.filter(req => req.invalidRecords > 0).length > 0 && (
              <div className="bg-white border border-[#eaecf0] rounded-[12px] shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#eaecf0]">
                  <h3 className="text-[18px] text-[#101828]">Detailed Error Records</h3>
                  <p className="text-[14px] text-[#667085] mt-1">Account-level validation failures</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#f9fafb]">
                      <tr>
                        <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">Request ID</th>
                        <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">Account Number</th>
                        <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">BVN</th>
                        <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">Error Type</th>
                        <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">Error Details</th>
                        <th className="text-left py-[12px] px-[16px] text-[12px] text-[#667085]">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allRequests
                        .filter(req => req.invalidRecords > 0)
                        .flatMap(req =>
                          req.records
                            .filter(record => record.validationStatus === 'Invalid')
                            .map(record => ({
                              ...record,
                              requestId: req.requestId,
                              dateSubmitted: req.dateSubmitted
                            }))
                        )
                        .slice(0, 15)
                        .map((record, index) => (
                          <tr key={index} className={`border-t border-[#eaecf0] ${index % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'}`}>
                            <td className="py-[12px] px-[16px] text-[14px] text-[#475467]">{record.requestId}</td>
                            <td className="py-[12px] px-[16px] text-[14px] text-[#101828]">{record.accountNumber}</td>
                            <td className="py-[12px] px-[16px] text-[14px] text-[#475467]">{record.bvn || '—'}</td>
                            <td className="py-[12px] px-[16px]">
                              <Badge className="bg-[#fef3f2] text-[#b42318]">Validation Error</Badge>
                            </td>
                            <td className="py-[12px] px-[16px] text-[14px] text-[#f04438]">
                              {record.remarks || 'Invalid format'}
                            </td>
                            <td className="py-[12px] px-[16px] text-[14px] text-[#475467]">
                              {new Date(record.dateSubmitted).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export function ReportsPage(props: ReportsPageProps) {
  return (
    <ServiceCentralLayout
      sidebarContent={<SidebarContent userRole={props.userRole} onLogout={props.onLogout} />}
    >
      <MainContent {...props} />
    </ServiceCentralLayout>
  );
}
