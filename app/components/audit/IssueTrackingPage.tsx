import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Eye, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { toast } from 'sonner@2.0.3';
import type { Issue, Finding, UserRole, IssueStatus } from './AuditTypes';

interface IssueTrackingPageProps {
  issues: Issue[];
  findings: Finding[];
  userRole: UserRole;
  onUpdateIssues: (issues: Issue[]) => void;
}

export function IssueTrackingPage({ issues, findings, userRole, onUpdateIssues }: IssueTrackingPageProps) {
  const [statusFilter, setStatusFilter] = useState<IssueStatus | 'All'>('All');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const filteredIssues = issues.filter(i => 
    statusFilter === 'All' || i.status === statusFilter
  );

  const getStatusBadge = (status: IssueStatus) => {
    const config = {
      'Open': { bg: 'bg-[#fef3f2]', text: 'text-[#b42318]', border: 'border-[#fecdca]' },
      'In Progress': { bg: 'bg-[#fff7ed]', text: 'text-[#f79009]', border: 'border-[#fec84b]' },
      'Closed': { bg: 'bg-[#ecfdf3]', text: 'text-[#027a48]', border: 'border-[#d1fadf]' }
    };
    const style = config[status];
    return <Badge className={`${style.bg} ${style.text} border ${style.border} text-[12px]`}>{status}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const config: Record<string, { bg: string; text: string }> = {
      'High': { bg: 'bg-[#fef3f2]', text: 'text-[#b42318]' },
      'Medium': { bg: 'bg-[#fff7ed]', text: 'text-[#f79009]' },
      'Low': { bg: 'bg-[#ecfdf3]', text: 'text-[#027a48]' }
    };
    const style = config[priority] || config['Medium'];
    return <Badge className={`${style.bg} ${style.text} text-[12px]`}>{priority}</Badge>;
  };

  const handleValidateClosure = (issueId: string) => {
    if (userRole === 'supervisor') {
      const updated = issues.map(i => 
        i.id === issueId ? { ...i, validatedBy: 'John Okafor', closedDate: new Date().toLocaleDateString('en-GB') } : i
      );
      onUpdateIssues(updated);
      toast.success('Issue closure validated');
      setIsViewModalOpen(false);
    } else {
      toast.error('Only Audit Supervisor can validate closures');
    }
  };

  return (
    <div className="h-full bg-[#f9fafb] overflow-y-auto">
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="mb-6">
          <h1 className="text-[28px] text-[#101828] mb-1">Issue Tracking & Follow-Up</h1>
          <p className="text-[14px] text-[#667085]">Monitor remediation and follow-up actions</p>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as IssueStatus | 'All')}>
            <SelectTrigger className="w-[180px] h-[40px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-white border border-[#eaecf0] rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#f9fafb] border-b border-[#eaecf0]">
              <tr>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Issue ID</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Description</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Business Unit</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Assigned To</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Due Date</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Priority</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Status</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eaecf0]">
              {filteredIssues.map((issue) => (
                <tr key={issue.id} className="hover:bg-[#f9fafb]">
                  <td className="px-6 py-4 text-[14px] text-[#101828]">{issue.id}</td>
                  <td className="px-6 py-4 text-[14px] text-[#667085] max-w-md truncate">{issue.description}</td>
                  <td className="px-6 py-4 text-[14px] text-[#667085]">{issue.businessUnit}</td>
                  <td className="px-6 py-4 text-[14px] text-[#667085]">{issue.assignedTo}</td>
                  <td className="px-6 py-4 text-[14px] text-[#667085]">{issue.dueDate}</td>
                  <td className="px-6 py-4">{getPriorityBadge(issue.priority)}</td>
                  <td className="px-6 py-4">{getStatusBadge(issue.status)}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setSelectedIssue(issue);
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
            <strong>Role:</strong> {userRole === 'supervisor' ? 'Audit Supervisor (Validates Closure)' : 'Audit Manager (Confirms Final Status)'}
            <br />
            <strong>Goal:</strong> Monitor remediation actions, track follow-up progress, and validate closure evidence for all audit issues
            <br />
            <strong>System Behavior:</strong> Auto-created from findings; requires evidence upload for closure; supervisor validates closure evidence; manager confirms final status update; colored chips (Red = Open, Yellow = In Progress, Green = Closed)
            <br />
            <strong>Expected Output:</strong> Closed issues with validated evidence and confirmed remediation actions
          </div>
        </div>

        {/* View Issue Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Issue Details - {selectedIssue?.id}</DialogTitle>
            </DialogHeader>
            {selectedIssue && (
              <div className="space-y-4 py-4">
                <div>
                  <h3 className="text-[14px] font-semibold mb-2">Description</h3>
                  <p className="text-[14px] text-[#667085]">{selectedIssue.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-[14px] font-semibold mb-1">Business Unit</h3>
                    <p className="text-[14px] text-[#667085]">{selectedIssue.businessUnit}</p>
                  </div>
                  <div>
                    <h3 className="text-[14px] font-semibold mb-1">Assigned To</h3>
                    <p className="text-[14px] text-[#667085]">{selectedIssue.assignedTo}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-[14px] font-semibold mb-1">Due Date</h3>
                    <p className="text-[14px] text-[#667085]">{selectedIssue.dueDate}</p>
                  </div>
                  <div>
                    <h3 className="text-[14px] font-semibold mb-1">Priority</h3>
                    {getPriorityBadge(selectedIssue.priority)}
                  </div>
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold mb-1">Status</h3>
                  {getStatusBadge(selectedIssue.status)}
                </div>
                {selectedIssue.evidence && selectedIssue.evidence.length > 0 && (
                  <div className="p-4 bg-[#ecfdf3] border border-[#d1fadf] rounded-lg">
                    <h3 className="text-[14px] font-semibold mb-2">Evidence Files</h3>
                    {selectedIssue.evidence.map((file, i) => (
                      <div key={i} className="text-[12px] text-[#027a48]">📎 {file}</div>
                    ))}
                  </div>
                )}
                {selectedIssue.validatedBy && (
                  <div className="p-3 bg-[#f9fafb] rounded">
                    <p className="text-[12px] text-[#667085]">
                      <strong>Validated by:</strong> {selectedIssue.validatedBy} on {selectedIssue.closedDate}
                    </p>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>Close</Button>
              {userRole === 'supervisor' && selectedIssue?.status === 'In Progress' && selectedIssue.evidence && (
                <Button onClick={() => handleValidateClosure(selectedIssue.id)} className="bg-[#003883] hover:bg-[#002664]">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Validate Closure
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
