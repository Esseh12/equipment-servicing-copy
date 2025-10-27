import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Eye, CheckCircle2, MessageSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner@2.0.3';
import type { AuditReport, UserRole, ReportStatus } from './AuditTypes';

interface ReportReviewPageProps {
  reports: AuditReport[];
  userRole: UserRole;
  onUpdateReports: (reports: AuditReport[]) => void;
}

export function ReportReviewPage({ reports, userRole, onUpdateReports }: ReportReviewPageProps) {
  const [selectedReport, setSelectedReport] = useState<AuditReport | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'draft' | 'approved' | 'archived'>('draft');

  const filteredReports = reports.filter(r => {
    if (activeTab === 'draft') return r.status === 'Draft' || r.status === 'Under Review';
    if (activeTab === 'approved') return r.status === 'Approved';
    if (activeTab === 'archived') return r.status === 'Published';
    return true;
  });

  const getStatusBadge = (status: ReportStatus) => {
    const config = {
      'Draft': { bg: 'bg-[#f2f4f7]', text: 'text-[#344054]' },
      'Under Review': { bg: 'bg-[#fff7ed]', text: 'text-[#f79009]' },
      'Approved': { bg: 'bg-[#ecfdf3]', text: 'text-[#027a48]' },
      'Published': { bg: 'bg-[#eff8ff]', text: 'text-[#175cd3]' }
    };
    const style = config[status];
    return <Badge className={`${style.bg} ${style.text} text-[12px]`}>{status}</Badge>;
  };

  const handleApprove = (reportId: string) => {
    if (userRole !== 'manager') {
      toast.error('Only Audit Manager can approve reports');
      return;
    }
    const updated = reports.map(r => 
      r.id === reportId ? { ...r, status: 'Approved' as ReportStatus, approvedBy: 'Sarah Adeyemi' } : r
    );
    onUpdateReports(updated);
    toast.success('Report approved successfully');
    setIsViewModalOpen(false);
  };

  const handleRequestRevision = (reportId: string) => {
    const updated = reports.map(r => 
      r.id === reportId ? { ...r, status: 'Draft' as ReportStatus } : r
    );
    onUpdateReports(updated);
    toast.success('Revision requested - report returned to draft');
    setIsViewModalOpen(false);
  };

  return (
    <div className="h-full bg-[#f9fafb] overflow-y-auto">
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="mb-6">
          <h1 className="text-[28px] text-[#101828] mb-1">Report Review & Approval</h1>
          <p className="text-[14px] text-[#667085]">Manage draft and final report reviews</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-[#eaecf0]">
          <button
            onClick={() => setActiveTab('draft')}
            className={`pb-3 px-1 border-b-2 transition-colors ${
              activeTab === 'draft' ? 'border-[#003883] text-[#003883]' : 'border-transparent text-[#667085]'
            }`}
          >
            Draft Reports
          </button>
          <button
            onClick={() => setActiveTab('approved')}
            className={`pb-3 px-1 border-b-2 transition-colors ${
              activeTab === 'approved' ? 'border-[#003883] text-[#003883]' : 'border-transparent text-[#667085]'
            }`}
          >
            Approved Reports
          </button>
          <button
            onClick={() => setActiveTab('archived')}
            className={`pb-3 px-1 border-b-2 transition-colors ${
              activeTab === 'archived' ? 'border-[#003883] text-[#003883]' : 'border-transparent text-[#667085]'
            }`}
          >
            Archived Reports
          </button>
        </div>

        <div className="bg-white border border-[#eaecf0] rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#f9fafb] border-b border-[#eaecf0]">
              <tr>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Report Title</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Engagement</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Date Created</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Version</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Reviewer</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Status</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eaecf0]">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-[#f9fafb]">
                  <td className="px-6 py-4 text-[14px] text-[#101828]">{report.title}</td>
                  <td className="px-6 py-4 text-[14px] text-[#667085]">{report.engagementTitle}</td>
                  <td className="px-6 py-4 text-[14px] text-[#667085]">{report.dateCreated}</td>
                  <td className="px-6 py-4 text-[14px] text-[#667085]">{report.version}</td>
                  <td className="px-6 py-4 text-[14px] text-[#667085]">{report.reviewedBy || '-'}</td>
                  <td className="px-6 py-4">{getStatusBadge(report.status)}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setSelectedReport(report);
                        setIsViewModalOpen(true);
                      }}
                      className="text-[#003883] hover:text-[#002664]"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-[#fef3f2] border border-[#fecdca] rounded-lg">
          <div className="text-[12px] text-[#667085]">
            <strong>Role:</strong> {userRole === 'manager' ? 'Audit Manager (Final Approval)' : 'Audit Supervisor (Comments & Requests Revisions)'}
            <br />
            <strong>Goal:</strong> Review draft audit reports, provide feedback, and grant final approval for publication
            <br />
            <strong>System Behavior:</strong> Version control enabled (e.g., Report v1.1); manager grants final approval; comments tracked for audit trail; reports move through Draft → Under Review → Approved workflow
            <br />
            <strong>Expected Output:</strong> Approved final reports ready for distribution to stakeholders
          </div>
        </div>

        {/* View Report Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedReport?.title}</DialogTitle>
            </DialogHeader>
            {selectedReport && (
              <div className="space-y-4 py-4">
                <div className="p-4 bg-[#f9fafb] rounded-lg">
                  <h3 className="text-[14px] font-semibold mb-2">Executive Summary</h3>
                  <p className="text-[14px] text-[#667085]">{selectedReport.executiveSummary}</p>
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold mb-2">Key Findings</h3>
                  <ul className="space-y-1">
                    {selectedReport.keyFindings?.map((finding, i) => (
                      <li key={i} className="text-[14px] text-[#667085]">• {finding}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-[#fef3f2] border border-[#fecdca] rounded-lg">
                  <h3 className="text-[14px] font-semibold mb-1">Risk Impact</h3>
                  <p className="text-[14px] text-[#667085]">{selectedReport.riskImpact}</p>
                </div>
                {selectedReport.comments && selectedReport.comments.length > 0 && (
                  <div>
                    <h3 className="text-[14px] font-semibold mb-2">Comments</h3>
                    {selectedReport.comments.map((comment) => (
                      <div key={comment.id} className="p-3 bg-[#f9fafb] rounded mb-2">
                        <div className="flex items-center gap-2 mb-1">
                          <MessageSquare className="h-3 w-3 text-[#667085]" />
                          <span className="text-[12px] text-[#667085]">{comment.author} - {comment.timestamp}</span>
                        </div>
                        <p className="text-[14px] text-[#344054]">{comment.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>Close</Button>
              {userRole === 'manager' && selectedReport?.status === 'Under Review' && (
                <>
                  <Button 
                    variant="outline"
                    onClick={() => handleRequestRevision(selectedReport.id)} 
                    className="border-[#f79009] text-[#f79009] hover:bg-[#fff7ed]"
                  >
                    Request Revision
                  </Button>
                  <Button onClick={() => handleApprove(selectedReport.id)} className="bg-[#003883] hover:bg-[#002664]">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Approve Report
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
