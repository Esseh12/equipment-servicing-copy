import React, { useState } from 'react';
import { ServiceCentralLayout } from '../ServiceCentralLayout';
import { BreadcrumbNavigation } from '../shared/BreadcrumbNavigation';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Users, FileText, CheckCircle2, XCircle, AlertCircle, Download } from 'lucide-react';
import { BulkRequest, BreadcrumbItem } from './CDMSTypes';
import accessLogo from 'figma:asset/3ebf5c44175bf36c1eceb7236d272904dfc164a1.png';

interface AuthorizerReviewPageProps {
  userRole: string | null;
  request: BulkRequest;
  onApprove: (comments: string) => void;
  onReject: (comments: string) => void;
  onBack: () => void;
  onLogout: () => void;
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
  request,
  onApprove,
  onReject,
  onBack
}: AuthorizerReviewPageProps) {
  const [comments, setComments] = useState('');
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'CDMS Bulk Portal', screen: 'authorization', icon: null, current: false, isClickable: true },
    { label: 'Review Request', screen: 'review', icon: null, current: true, isClickable: false }
  ];

  const handleApprove = () => {
    setShowApproveModal(false);
    onApprove(comments);
  };

  const handleReject = () => {
    if (!comments.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }
    setShowRejectModal(false);
    onReject(comments);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="h-[65px] border-b border-[#d0d5dd] flex items-center justify-between px-[24px] flex-shrink-0">
        <BreadcrumbNavigation items={breadcrumbs} />
        <Button
          onClick={onBack}
          variant="outline"
          className="border-[#d0d5dd]"
        >
          Back to Queue
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto p-6 lg:p-[32px]">
          <div className="mb-8">
            <h1 className="text-[30px] text-[#101828] mb-2">Review Bulk Restriction Request</h1>
            <p className="text-[16px] text-[#475467]">
              Review request details and approve or reject
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Summary Card */}
              <div className="bg-white border border-[#eaecf0] rounded-[12px] p-6 shadow-sm">
                <h2 className="text-[20px] text-[#101828] mb-4">Request Summary</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-[12px] text-[#667085] mb-1">Request ID</p>
                    <p className="text-[14px] text-[#101828]">{request.requestId}</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-[#667085] mb-1">Submitted By</p>
                    <p className="text-[14px] text-[#101828]">{request.submittedByName}</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-[#667085] mb-1">Unit</p>
                    <p className="text-[14px] text-[#101828]">{request.unit}</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-[#667085] mb-1">Date Submitted</p>
                    <p className="text-[14px] text-[#101828]">
                      {new Date(request.dateSubmitted).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#eaecf0] pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[12px] text-[#667085] mb-1">Action Type</p>
                      <Badge className="bg-[#eff8ff] text-[#175cd3]">{request.actionType}</Badge>
                    </div>
                    <div>
                      <p className="text-[12px] text-[#667085] mb-1">File Name</p>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-[#667085]" />
                        <p className="text-[14px] text-[#101828]">{request.fileName}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Validation Results */}
              <div className="bg-white border border-[#eaecf0] rounded-[12px] p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[20px] text-[#101828]">Validation Results</h2>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#12b76a] rounded-full"></div>
                      <span className="text-[14px] text-[#475467]">
                        Valid: <strong>{request.validRecords}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#f04438] rounded-full"></div>
                      <span className="text-[14px] text-[#475467]">
                        Invalid: <strong>{request.invalidRecords}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#eaecf0]">
                        <th className="text-left py-3 px-4 text-[12px] text-[#667085] font-medium">Account No.</th>
                        <th className="text-left py-3 px-4 text-[12px] text-[#667085] font-medium">BVN</th>
                        <th className="text-left py-3 px-4 text-[12px] text-[#667085] font-medium">Status</th>
                        <th className="text-left py-3 px-4 text-[12px] text-[#667085] font-medium">Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {request.records.slice(0, 10).map((record, index) => (
                        <tr key={index} className="border-b border-[#f2f4f7] hover:bg-[#f9fafb]">
                          <td className="py-3 px-4 text-[14px] text-[#101828]">{record.accountNumber}</td>
                          <td className="py-3 px-4 text-[14px] text-[#475467]">{record.bvn || '—'}</td>
                          <td className="py-3 px-4">
                            {record.validationStatus === 'Valid' ? (
                              <span className="inline-flex items-center gap-1 text-[#027a48] text-[12px]">
                                <CheckCircle2 className="h-4 w-4" />
                                Valid
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[#b42318] text-[12px]">
                                <XCircle className="h-4 w-4" />
                                Invalid
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-[14px] text-[#475467]">{record.remarks || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {request.records.length > 10 && (
                  <p className="text-[12px] text-[#667085] mt-4 text-center">
                    Showing 10 of {request.records.length} records
                  </p>
                )}

                <div className="mt-4">
                  <Button variant="outline" size="sm" className="border-[#d0d5dd]">
                    <Download className="h-4 w-4 mr-2" />
                    Download Full File
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Actions */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-[#eaecf0] rounded-[12px] p-6 shadow-sm sticky top-6">
                <h3 className="text-[18px] text-[#101828] mb-4">Authorization</h3>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-[14px] text-[#344054] mb-2 block">
                      Comments <span className="text-[#667085]">(Optional)</span>
                    </label>
                    <Textarea
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      placeholder="Add comments about this request..."
                      className="min-h-[120px] border-[#d0d5dd]"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={() => setShowApproveModal(true)}
                    className="w-full bg-[#12b76a] hover:bg-[#0e9f5e] text-white"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Approve Request
                  </Button>

                  <Button
                    onClick={() => setShowRejectModal(true)}
                    variant="outline"
                    className="w-full border-[#f04438] text-[#f04438] hover:bg-[#fef2f2]"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject Request
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-[#eaecf0]">
                  <div className="flex items-start gap-2 text-[12px] text-[#667085]">
                    <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <p>Once approved, the system will process the bulk action automatically.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Approve Confirmation Modal */}
      {showApproveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[12px] max-w-md w-full p-6">
            <div className="w-12 h-12 bg-[#ecfdf3] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-6 w-6 text-[#12b76a]" />
            </div>
            <h3 className="text-[20px] text-[#101828] text-center mb-2">Approve Request?</h3>
            <p className="text-[14px] text-[#667085] text-center mb-6">
              Are you sure you want to approve this bulk restriction request? This action will process {request.validRecords} records.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowApproveModal(false)}
                className="flex-1 border-[#d0d5dd]"
              >
                Cancel
              </Button>
              <Button
                onClick={handleApprove}
                className="flex-1 bg-[#12b76a] hover:bg-[#0e9f5e] text-white"
              >
                Yes, Approve
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Confirmation Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[12px] max-w-md w-full p-6">
            <div className="w-12 h-12 bg-[#fef3f2] rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="h-6 w-6 text-[#f04438]" />
            </div>
            <h3 className="text-[20px] text-[#101828] text-center mb-2">Reject Request?</h3>
            <p className="text-[14px] text-[#667085] text-center mb-6">
              Are you sure you want to reject this bulk restriction request? The initiator will be notified.
            </p>
            {!comments.trim() && (
              <div className="mb-4 p-3 bg-[#fff7ed] border border-[#fecaca] rounded-lg">
                <p className="text-[12px] text-[#92400E]">Please provide a reason for rejection in the comments field.</p>
              </div>
            )}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowRejectModal(false)}
                className="flex-1 border-[#d0d5dd]"
              >
                Cancel
              </Button>
              <Button
                onClick={handleReject}
                disabled={!comments.trim()}
                className="flex-1 bg-[#f04438] hover:bg-[#d92d20] text-white disabled:opacity-50"
              >
                Yes, Reject
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function AuthorizerReviewPage(props: AuthorizerReviewPageProps) {
  return (
    <ServiceCentralLayout
      sidebarContent={<SidebarContent userRole={props.userRole} onLogout={props.onLogout} />}
    >
      <MainContent {...props} />
    </ServiceCentralLayout>
  );
}
