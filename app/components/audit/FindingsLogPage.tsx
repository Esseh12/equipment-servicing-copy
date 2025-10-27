import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Plus, Download, Edit } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { Finding, AuditEngagement, UserRole, FindingSeverity, FindingStatus } from './AuditTypes';

interface FindingsLogPageProps {
  findings: Finding[];
  engagements: AuditEngagement[];
  userRole: UserRole;
  onUpdateFindings: (findings: Finding[]) => void;
}

export function FindingsLogPage({ findings, engagements, userRole, onUpdateFindings }: FindingsLogPageProps) {
  const [severityFilter, setSeverityFilter] = useState<FindingSeverity | 'All'>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingFinding, setEditingFinding] = useState<Finding | null>(null);
  const [selectedEngagement, setSelectedEngagement] = useState('');
  const [findingTitle, setFindingTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<FindingSeverity>('Medium');

  const handleAddFinding = () => {
    if (!selectedEngagement || !findingTitle || !description) {
      toast.error('Please fill in all required fields');
      return;
    }

    const engagement = engagements.find(e => e.id === selectedEngagement);
    const newFinding: Finding = {
      id: `FND${String(findings.length + 1).padStart(3, '0')}`,
      engagementId: selectedEngagement,
      engagementTitle: engagement?.title || '',
      title: findingTitle,
      description,
      severity,
      status: 'Open',
      raisedBy: userRole === 'supervisor' ? 'John Okafor' : userRole === 'auditor' ? 'Grace Okoro' : 'Sarah Adeyemi',
      raisedDate: new Date().toLocaleDateString('en-GB')
    };

    onUpdateFindings([...findings, newFinding]);
    toast.success('Finding added successfully');
    setIsAddModalOpen(false);
    
    // Reset form
    setSelectedEngagement('');
    setFindingTitle('');
    setDescription('');
    setSeverity('Medium');
  };

  const handleEditFinding = (finding: Finding) => {
    setEditingFinding(finding);
    setSelectedEngagement(finding.engagementId);
    setFindingTitle(finding.title);
    setDescription(finding.description);
    setSeverity(finding.severity);
    setIsEditModalOpen(true);
  };

  const handleUpdateFinding = () => {
    if (!editingFinding || !selectedEngagement || !findingTitle || !description) {
      toast.error('Please fill in all required fields');
      return;
    }

    const engagement = engagements.find(e => e.id === selectedEngagement);
    const updatedFindings = findings.map(f =>
      f.id === editingFinding.id
        ? {
            ...f,
            engagementId: selectedEngagement,
            engagementTitle: engagement?.title || '',
            title: findingTitle,
            description,
            severity
          }
        : f
    );

    onUpdateFindings(updatedFindings);
    toast.success('Finding updated successfully');
    setIsEditModalOpen(false);

    // Reset form
    setEditingFinding(null);
    setSelectedEngagement('');
    setFindingTitle('');
    setDescription('');
    setSeverity('Medium');
  };

  const handleExport = () => {
    toast.success('Findings exported successfully');
  };

  const filteredFindings = findings.filter(f => 
    severityFilter === 'All' || f.severity === severityFilter
  );

  const getSeverityBadge = (severity: FindingSeverity) => {
    const config = {
      'High': { bg: 'bg-[#fef3f2]', text: 'text-[#b42318]', border: 'border-[#fecdca]' },
      'Medium': { bg: 'bg-[#fff7ed]', text: 'text-[#f79009]', border: 'border-[#fec84b]' },
      'Low': { bg: 'bg-[#ecfdf3]', text: 'text-[#027a48]', border: 'border-[#d1fadf]' }
    };
    const style = config[severity];
    return <Badge className={`${style.bg} ${style.text} border ${style.border} text-[12px]`}>{severity}</Badge>;
  };

  const getStatusBadge = (status: FindingStatus) => {
    const config = {
      'Open': { bg: 'bg-[#fef3f2]', text: 'text-[#b42318]', border: 'border-[#fecdca]' },
      'In Progress': { bg: 'bg-[#fff7ed]', text: 'text-[#f79009]', border: 'border-[#fec84b]' },
      'Closed': { bg: 'bg-[#ecfdf3]', text: 'text-[#027a48]', border: 'border-[#d1fadf]' }
    };
    const style = config[status];
    return <Badge className={`${style.bg} ${style.text} border ${style.border} text-[12px]`}>{status}</Badge>;
  };

  return (
    <div className="h-full bg-[#f9fafb] overflow-y-auto">
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="mb-6">
          <h1 className="text-[28px] text-[#101828] mb-1">Findings & Exceptions Log</h1>
          <p className="text-[14px] text-[#667085]">Document and review audit findings</p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <Select value={severityFilter} onValueChange={(v) => setSeverityFilter(v as FindingSeverity | 'All')}>
            <SelectTrigger className="w-[180px] h-[40px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Severity</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-3">
            <Button onClick={() => setIsAddModalOpen(true)} className="bg-[#003883] hover:bg-[#002664]">
              <Plus className="h-4 w-4 mr-2" />
              Add Finding
            </Button>
            <Button onClick={handleExport} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Findings
            </Button>
          </div>
        </div>

        <div className="bg-white border border-[#eaecf0] rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#f9fafb] border-b border-[#eaecf0]">
              <tr>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Finding ID</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Engagement</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Description</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Severity</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Status</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eaecf0]">
              {filteredFindings.map((finding) => (
                <tr key={finding.id} className="hover:bg-[#f9fafb]">
                  <td className="px-6 py-4 text-[14px] text-[#101828]">{finding.id}</td>
                  <td className="px-6 py-4 text-[14px] text-[#667085]">{finding.engagementTitle}</td>
                  <td className="px-6 py-4 text-[14px] text-[#667085] max-w-md truncate">{finding.description}</td>
                  <td className="px-6 py-4">{getSeverityBadge(finding.severity)}</td>
                  <td className="px-6 py-4">{getStatusBadge(finding.status)}</td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => handleEditFinding(finding)}
                      className="text-[#003883] hover:text-[#002664]"
                      title="Edit Finding"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-[#fef3f2] border border-[#fecdca] rounded-lg">
          <div className="text-[12px] text-[#667085]">
            <strong>Role:</strong> {userRole === 'supervisor' ? 'Audit Supervisor (Reviews & Requests Updates)' : 'Audit Manager (Approves Closure)'}
            <br />
            <strong>Goal:</strong> Document all audit findings with severity ratings, evidence attachments, and track remediation status
            <br />
            <strong>System Behavior:</strong> Findings auto-create issues for follow-up tracking; severity levels determine priority; closure requires manager approval once remediated
            <br />
            <strong>Expected Output:</strong> Complete findings log with evidence, severity classifications, and remediation tracking
          </div>
        </div>

        {/* Add Finding Modal */}
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Finding</DialogTitle>
              <DialogDescription className="sr-only">
                Log a new audit finding with details, severity, and recommendations
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Engagement *</Label>
                <Select value={selectedEngagement} onValueChange={setSelectedEngagement}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select engagement" />
                  </SelectTrigger>
                  <SelectContent>
                    {engagements.map(eng => (
                      <SelectItem key={eng.id} value={eng.id}>
                        {eng.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Finding Title *</Label>
                <Input 
                  placeholder="e.g., Weak Password Policy Implementation" 
                  value={findingTitle}
                  onChange={(e) => setFindingTitle(e.target.value)}
                  className="mt-1.5" 
                />
              </div>
              <div>
                <Label>Description *</Label>
                <Textarea 
                  placeholder="Provide detailed description of the finding..." 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1.5" 
                  rows={4}
                />
              </div>
              <div>
                <Label>Severity *</Label>
                <Select value={severity} onValueChange={(v) => setSeverity(v as FindingSeverity)}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Attach Evidence (Optional)</Label>
                <Input type="file" className="mt-1.5" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddFinding} className="bg-[#003883] hover:bg-[#002664]">
                Add Finding
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Finding Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Finding - {editingFinding?.id}</DialogTitle>
              <DialogDescription>
                Update finding details and severity classification
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Select Engagement *</Label>
                <Select value={selectedEngagement} onValueChange={setSelectedEngagement}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select engagement" />
                  </SelectTrigger>
                  <SelectContent>
                    {engagements.map((engagement) => (
                      <SelectItem key={engagement.id} value={engagement.id}>
                        {engagement.title} ({engagement.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Finding Title *</Label>
                <Input
                  placeholder="Enter finding title"
                  value={findingTitle}
                  onChange={(e) => setFindingTitle(e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label>Description *</Label>
                <Textarea
                  placeholder="Detailed description of the finding..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label>Severity *</Label>
                <Select value={severity} onValueChange={(v) => setSeverity(v as FindingSeverity)}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateFinding} className="bg-[#003883] hover:bg-[#002664]">
                Update Finding
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
