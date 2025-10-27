import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import type { FieldworkProgress, AuditEngagement, UserRole } from './AuditTypes';

interface FieldworkTrackingPageProps {
  fieldwork: FieldworkProgress[];
  engagements: AuditEngagement[];
  userRole: UserRole;
  onUpdateFieldwork: (fieldwork: FieldworkProgress[]) => void;
}

export function FieldworkTrackingPage({ fieldwork, engagements, userRole, onUpdateFieldwork }: FieldworkTrackingPageProps) {
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredFieldwork = fieldwork.filter(f => 
    statusFilter === 'All' || f.reviewStatus === statusFilter
  );

  const getStatusBadge = (status: string) => {
    const config: Record<string, { bg: string; text: string }> = {
      'Not Started': { bg: 'bg-[#f2f4f7]', text: 'text-[#344054]' },
      'Awaiting Review': { bg: 'bg-[#fff7ed]', text: 'text-[#f79009]' },
      'Reviewed': { bg: 'bg-[#ecfdf3]', text: 'text-[#027a48]' },
      'Approved': { bg: 'bg-[#eff8ff]', text: 'text-[#175cd3]' }
    };
    const style = config[status] || config['Not Started'];
    return <Badge className={`${style.bg} ${style.text} text-[12px]`}>{status}</Badge>;
  };

  return (
    <div className="h-full bg-[#f9fafb] overflow-y-auto">
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="mb-6">
          <h1 className="text-[28px] text-[#101828] mb-1">Fieldwork Tracking & Review</h1>
          <p className="text-[14px] text-[#667085]">Track progress of ongoing fieldwork and review submissions</p>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[200px] h-[40px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="Not Started">Not Started</SelectItem>
              <SelectItem value="Awaiting Review">Awaiting Review</SelectItem>
              <SelectItem value="Reviewed">Reviewed</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-white border border-[#eaecf0] rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#f9fafb] border-b border-[#eaecf0]">
              <tr>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Audit Area</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Auditor</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Progress</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Issues Raised</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Review Status</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Comments</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eaecf0]">
              {filteredFieldwork.map((work) => (
                <tr key={work.id} className="hover:bg-[#f9fafb]">
                  <td className="px-6 py-4 text-[14px] text-[#101828]">{work.auditArea}</td>
                  <td className="px-6 py-4 text-[14px] text-[#667085]">{work.auditor}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Progress value={work.progress} className="w-24" />
                      <span className="text-[12px] text-[#667085]">{work.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className="bg-[#fef3f2] text-[#b42318] text-[12px]">{work.issuesRaised}</Badge>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(work.reviewStatus)}</td>
                  <td className="px-6 py-4 text-[12px] text-[#667085]">{work.comments || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-[#fef3f2] border border-[#fecdca] rounded-lg">
          <div className="text-[12px] text-[#667085]">
            <strong>Role:</strong> {userRole === 'supervisor' ? 'Audit Supervisor (Reviews & Comments)' : userRole === 'manager' ? 'Audit Manager (Views Aggregated Progress)' : 'Auditor (Updates Progress)'}
            <br />
            <strong>Goal:</strong> Monitor fieldwork execution, track progress of ongoing audits, and review submitted work
            <br />
            <strong>System Behavior:</strong> Progress bars auto-update as auditors complete work; supervisor can review and add comments; manager views only aggregated progress
            <br />
            <strong>Expected Output:</strong> Completed fieldwork with documented progress and supervisor review comments
          </div>
        </div>
      </div>
    </div>
  );
}
