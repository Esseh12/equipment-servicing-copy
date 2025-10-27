import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Plus, Upload, Eye } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { AuditEngagement, AuditPlan, UserRole, EngagementStatus } from './AuditTypes';

interface AuditEngagementPageProps {
  engagements: AuditEngagement[];
  plans: AuditPlan[];
  userRole: UserRole;
  onUpdateEngagements: (engagements: AuditEngagement[]) => void;
}

export function AuditEngagementPage({ engagements, plans, userRole, onUpdateEngagements }: AuditEngagementPageProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedEngagement, setSelectedEngagement] = useState<AuditEngagement | null>(null);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [engagementTitle, setEngagementTitle] = useState('');
  const [businessUnit, setBusinessUnit] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [supervisor, setSupervisor] = useState('');

  const handleCreateEngagement = () => {
    if (!engagementTitle || !businessUnit || !startDate || !endDate || !supervisor) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newEngagement: AuditEngagement = {
      id: `ENG${String(engagements.length + 1).padStart(3, '0')}`,
      title: engagementTitle,
      businessUnit,
      linkedPlanId: selectedPlan || undefined,
      startDate,
      endDate,
      status: 'Not Started',
      supervisor,
      teamMembers: [],
      createdBy: userRole === 'supervisor' ? 'John Okafor' : 'Sarah Adeyemi',
      createdDate: new Date().toLocaleDateString('en-GB')
    };

    onUpdateEngagements([...engagements, newEngagement]);
    toast.success('Audit engagement created successfully');
    setIsCreateModalOpen(false);
    
    // Reset form
    setEngagementTitle('');
    setBusinessUnit('');
    setStartDate('');
    setEndDate('');
    setSupervisor('');
    setSelectedPlan('');
  };

  const handleAttachProgram = () => {
    toast.success('Audit program template uploaded successfully');
  };

  const getStatusBadge = (status: EngagementStatus) => {
    const config = {
      'Not Started': { bg: 'bg-[#f2f4f7]', text: 'text-[#344054]' },
      'In Progress': { bg: 'bg-[#fff7ed]', text: 'text-[#f79009]' },
      'Under Review': { bg: 'bg-[#eff8ff]', text: 'text-[#175cd3]' },
      'Completed': { bg: 'bg-[#ecfdf3]', text: 'text-[#027a48]' },
      'Closed': { bg: 'bg-[#f2f4f7]', text: 'text-[#344054]' }
    };
    const style = config[status];
    return <Badge className={`${style.bg} ${style.text} text-[12px]`}>{status}</Badge>;
  };

  return (
    <div className="h-full bg-[#f9fafb] overflow-y-auto">
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="mb-6">
          <h1 className="text-[28px] text-[#101828] mb-1">Audit Engagements</h1>
          <p className="text-[14px] text-[#667085]">Create and manage audit engagements after plan approval</p>
        </div>

        <div className="flex justify-end gap-3 mb-6">
          <Button onClick={() => setIsCreateModalOpen(true)} className="bg-[#003883] hover:bg-[#002664]">
            <Plus className="h-4 w-4 mr-2" />
            Create Engagement
          </Button>
          <Button onClick={handleAttachProgram} variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Attach Audit Program
          </Button>
        </div>

        <div className="bg-white border border-[#eaecf0] rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#f9fafb] border-b border-[#eaecf0]">
              <tr>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Engagement Title</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Business Unit</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Start Date</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">End Date</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Status</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eaecf0]">
              {engagements.map((engagement) => (
                <tr key={engagement.id} className="hover:bg-[#f9fafb]">
                  <td className="px-6 py-4 text-[14px] text-[#101828]">{engagement.title}</td>
                  <td className="px-6 py-4 text-[14px] text-[#667085]">{engagement.businessUnit}</td>
                  <td className="px-6 py-4 text-[14px] text-[#667085]">{engagement.startDate}</td>
                  <td className="px-6 py-4 text-[14px] text-[#667085]">{engagement.endDate}</td>
                  <td className="px-6 py-4">{getStatusBadge(engagement.status)}</td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => {
                        setSelectedEngagement(engagement);
                        setIsViewModalOpen(true);
                      }}
                      className="text-[#003883] hover:text-[#002664]"
                      title="View Engagement"
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
            <strong>Role:</strong> {userRole === 'supervisor' ? 'Audit Supervisor (Creates engagements)' : 'Audit Manager (Approves setup)'}
            <br />
            <strong>Goal:</strong> Set up audit engagements with team assignments, timelines, and audit programs
            <br />
            <strong>System Behavior:</strong> Links to approved audit plans; supervisor uploads audit program checklist; manager reviews and approves engagement setup before fieldwork begins
            <br />
            <strong>Expected Output:</strong> Approved engagement with assigned team, audit program, and start/end dates
          </div>
        </div>

        {/* Create Engagement Modal */}
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Audit Engagement</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Engagement Title *</Label>
                <Input 
                  placeholder="e.g., Core Banking System Review" 
                  value={engagementTitle}
                  onChange={(e) => setEngagementTitle(e.target.value)}
                  className="mt-1.5" 
                />
              </div>
              <div>
                <Label>Linked Audit Plan (Optional)</Label>
                <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select approved plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {plans.filter(p => p.status === 'Approved').map(plan => (
                      <SelectItem key={plan.id} value={plan.id}>
                        {plan.id} - {plan.businessUnit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Business Unit *</Label>
                <Input 
                  placeholder="e.g., Technology Department" 
                  value={businessUnit}
                  onChange={(e) => setBusinessUnit(e.target.value)}
                  className="mt-1.5" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Start Date *</Label>
                  <Input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="mt-1.5" 
                  />
                </div>
                <div>
                  <Label>End Date *</Label>
                  <Input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="mt-1.5" 
                  />
                </div>
              </div>
              <div>
                <Label>Assign Supervisor *</Label>
                <Select value={supervisor} onValueChange={setSupervisor}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select supervisor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="John Okafor">John Okafor</SelectItem>
                    <SelectItem value="Grace Okoro">Grace Okoro</SelectItem>
                    <SelectItem value="Peter Nwosu">Peter Nwosu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Team Members (Optional)</Label>
                <Select>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select team members" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="amina">Amina Bello</SelectItem>
                    <SelectItem value="tunde">Tunde Adebayo</SelectItem>
                    <SelectItem value="grace">Grace Okoro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateEngagement} className="bg-[#003883] hover:bg-[#002664]">
                Create Engagement
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Engagement Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Engagement Details - {selectedEngagement?.id}</DialogTitle>
            </DialogHeader>
            {selectedEngagement && (
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-[#667085]">Engagement Title</Label>
                    <p className="text-[14px] text-[#101828] mt-1">{selectedEngagement.title}</p>
                  </div>
                  <div>
                    <Label className="text-[#667085]">Business Unit</Label>
                    <p className="text-[14px] text-[#101828] mt-1">{selectedEngagement.businessUnit}</p>
                  </div>
                  <div>
                    <Label className="text-[#667085]">Start Date</Label>
                    <p className="text-[14px] text-[#101828] mt-1">{selectedEngagement.startDate}</p>
                  </div>
                  <div>
                    <Label className="text-[#667085]">End Date</Label>
                    <p className="text-[14px] text-[#101828] mt-1">{selectedEngagement.endDate}</p>
                  </div>
                  <div>
                    <Label className="text-[#667085]">Supervisor</Label>
                    <p className="text-[14px] text-[#101828] mt-1">{selectedEngagement.supervisor}</p>
                  </div>
                  <div>
                    <Label className="text-[#667085]">Status</Label>
                    <div className="mt-1">
                      {(() => {
                        const config: Record<EngagementStatus, { bg: string; text: string }> = {
                          'Not Started': { bg: 'bg-[#f2f4f7]', text: 'text-[#344054]' },
                          'In Progress': { bg: 'bg-[#fff7ed]', text: 'text-[#f79009]' },
                          'Under Review': { bg: 'bg-[#eff8ff]', text: 'text-[#175cd3]' },
                          'Completed': { bg: 'bg-[#ecfdf3]', text: 'text-[#027a48]' }
                        };
                        const style = config[selectedEngagement.status];
                        return <Badge className={`${style.bg} ${style.text} text-[12px]`}>{selectedEngagement.status}</Badge>;
                      })()}
                    </div>
                  </div>
                </div>

                {selectedEngagement.linkedPlanId && (
                  <div>
                    <Label className="text-[#667085]">Linked Audit Plan</Label>
                    <p className="text-[14px] text-[#101828] mt-1">{selectedEngagement.linkedPlanId}</p>
                  </div>
                )}

                <div>
                  <Label className="text-[#667085]">Team Members</Label>
                  {selectedEngagement.teamMembers.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedEngagement.teamMembers.map((member, idx) => (
                        <Badge key={idx} className="bg-[#eff8ff] text-[#175cd3] text-[12px]">
                          {member}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[14px] text-[#667085] mt-1">No team members assigned</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#eaecf0]">
                  <div>
                    <Label className="text-[#667085]">Created By</Label>
                    <p className="text-[14px] text-[#101828] mt-1">{selectedEngagement.createdBy}</p>
                  </div>
                  <div>
                    <Label className="text-[#667085]">Created Date</Label>
                    <p className="text-[14px] text-[#101828] mt-1">{selectedEngagement.createdDate}</p>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
