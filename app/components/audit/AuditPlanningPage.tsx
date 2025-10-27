import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Label } from '../ui/label';
import { Plus, Upload, Download, Edit, Lock } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { AuditPlan, UserRole, RiskRating, PlanStatus } from './AuditTypes';

interface AuditPlanningPageProps {
  plans: AuditPlan[];
  userRole: UserRole;
  onUpdatePlans: (plans: AuditPlan[]) => void;
}

export function AuditPlanningPage({ plans, userRole, onUpdatePlans }: AuditPlanningPageProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<AuditPlan | null>(null);
  const [statusFilter, setStatusFilter] = useState<PlanStatus | 'All'>('All');

  // Filter plans
  const filteredPlans = plans.filter(plan => 
    statusFilter === 'All' || plan.status === statusFilter
  );

  const getRiskBadge = (rating: RiskRating) => {
    const config = {
      'High': { bg: 'bg-[#fef3f2]', text: 'text-[#b42318]', border: 'border-[#fecdca]' },
      'Medium': { bg: 'bg-[#fff7ed]', text: 'text-[#f79009]', border: 'border-[#fec84b]' },
      'Low': { bg: 'bg-[#ecfdf3]', text: 'text-[#027a48]', border: 'border-[#d1fadf]' }
    };
    const style = config[rating];
    return <Badge className={`${style.bg} ${style.text} border ${style.border} text-[12px]`}>{rating}</Badge>;
  };

  const getStatusBadge = (status: PlanStatus) => {
    const config = {
      'Draft': { bg: 'bg-[#f2f4f7]', text: 'text-[#344054]', border: 'border-[#d0d5dd]' },
      'Pending': { bg: 'bg-[#fff7ed]', text: 'text-[#f79009]', border: 'border-[#fec84b]' },
      'Approved': { bg: 'bg-[#ecfdf3]', text: 'text-[#027a48]', border: 'border-[#d1fadf]' },
      'Rejected': { bg: 'bg-[#fef3f2]', text: 'text-[#b42318]', border: 'border-[#fecdca]' }
    };
    const style = config[status];
    return <Badge className={`${style.bg} ${style.text} border ${style.border} text-[12px]`}>{status}</Badge>;
  };

  const handleCreatePlan = () => {
    const newPlan: AuditPlan = {
      id: `AP${String(plans.length + 1).padStart(3, '0')}`,
      period: 'FY 2025',
      periodType: 'Annual',
      businessUnit: '',
      riskRating: 'Medium',
      lastAuditDate: '',
      proposedDate: '',
      status: 'Draft',
      createdBy: userRole === 'manager' ? 'Sarah Adeyemi' : 'John Okafor',
      createdDate: new Date().toLocaleDateString('en-GB')
    };
    
    onUpdatePlans([...plans, newPlan]);
    toast.success('Audit plan created successfully');
    setIsCreateModalOpen(false);
  };

  const handleApprovePlan = (planId: string) => {
    if (userRole !== 'manager') {
      toast.error('Only Audit Managers can approve plans');
      return;
    }
    
    const updated = plans.map(p => 
      p.id === planId 
        ? { ...p, status: 'Approved' as PlanStatus, approvedBy: 'Sarah Adeyemi', approvedDate: new Date().toLocaleDateString('en-GB') }
        : p
    );
    onUpdatePlans(updated);
    toast.success('Audit plan approved');
  };

  const handleExport = () => {
    toast.success('Audit plan exported successfully');
  };

  return (
    <div className="h-full bg-[#f9fafb] overflow-y-auto">
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[28px] text-[#101828] mb-1">
            Audit Planning
          </h1>
          <p className="text-[14px] text-[#667085]">
            Create and manage annual or quarterly audit plans
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as PlanStatus | 'All')}>
              <SelectTrigger className="w-[180px] h-[40px] border-[#d0d5dd]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-[#003883] hover:bg-[#002664] text-white h-[40px] px-4"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Audit Plan
            </Button>
            {userRole === 'manager' && (
              <Button
                onClick={handleExport}
                variant="outline"
                className="h-[40px] px-4 border-[#d0d5dd]"
              >
                <Upload className="h-4 w-4 mr-2" />
                Import from Excel
              </Button>
            )}
            <Button
              onClick={handleExport}
              variant="outline"
              className="h-[40px] px-4 border-[#d0d5dd]"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Plan
            </Button>
          </div>
        </div>

        {/* Plans Table */}
        <div className="bg-white border border-[#eaecf0] rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f9fafb] border-b border-[#eaecf0]">
                <tr>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase tracking-wider">
                    Plan ID
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase tracking-wider">
                    Business Unit
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase tracking-wider">
                    Risk Rating
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase tracking-wider">
                    Last Audit Date
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase tracking-wider">
                    Proposed Date
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaecf0]">
                {filteredPlans.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-[14px] text-[#667085]">
                      No audit plans found
                    </td>
                  </tr>
                ) : (
                  filteredPlans.map((plan) => (
                    <tr key={plan.id} className="hover:bg-[#f9fafb] transition-colors">
                      <td className="px-6 py-4 text-[14px] text-[#101828]">
                        {plan.id}
                      </td>
                      <td className="px-6 py-4 text-[14px] text-[#101828]">
                        {plan.businessUnit}
                      </td>
                      <td className="px-6 py-4">
                        {getRiskBadge(plan.riskRating)}
                      </td>
                      <td className="px-6 py-4 text-[14px] text-[#667085]">
                        {plan.lastAuditDate}
                      </td>
                      <td className="px-6 py-4 text-[14px] text-[#667085]">
                        {plan.proposedDate}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(plan.status)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {plan.status === 'Approved' ? (
                            <button
                              className="text-[#667085] cursor-not-allowed"
                              title="Approved plans are locked"
                              disabled
                            >
                              <Lock className="h-4 w-4" />
                            </button>
                          ) : userRole === 'manager' && plan.status === 'Pending' ? (
                            <Button
                              onClick={() => handleApprovePlan(plan.id)}
                              size="sm"
                              className="bg-[#003883] hover:bg-[#002664] text-white h-[32px] px-3"
                            >
                              Approve
                            </Button>
                          ) : (
                            <button
                              onClick={() => setEditingPlan(plan)}
                              className="text-[#667085] hover:text-[#344054] transition-colors"
                              title="Edit"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Annotation Footer */}
        <div className="mt-6 p-4 bg-[#fef3f2] border border-[#fecdca] rounded-lg">
          <div className="text-[12px] text-[#667085]">
            <strong className="text-[#344054]">Role:</strong> {userRole === 'manager' ? 'Audit Manager' : 'Audit Supervisor'}
            <br />
            <strong className="text-[#344054]">Goal:</strong> Create and approve annual/quarterly audit plans based on risk assessment
            <br />
            <strong className="text-[#344054]">System Behavior:</strong> Approved plans are locked from editing and trigger engagement creation workflow; tracks all actions in audit trail; restricts edits post-approval; automatically updates progress KPIs
            <br />
            <strong className="text-[#344054]">Expected Output:</strong> Approved audit plan with assigned supervisors and scheduled audit dates
          </div>
        </div>

        {/* Create Plan Modal */}
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Audit Plan</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Period Type</Label>
                  <Select defaultValue="Annual">
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Annual">Annual</SelectItem>
                      <SelectItem value="Quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Period</Label>
                  <Input placeholder="e.g., FY 2025" className="mt-1.5" />
                </div>
              </div>
              <div>
                <Label>Business Unit / Department</Label>
                <Input placeholder="Enter business unit name" className="mt-1.5" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Last Audit Date</Label>
                  <Input type="date" className="mt-1.5" />
                </div>
                <div>
                  <Label>Proposed Audit Date</Label>
                  <Input type="date" className="mt-1.5" />
                </div>
              </div>
              <div>
                <Label>Risk Rating (Auto-filled from Risk Module)</Label>
                <Select defaultValue="Medium">
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
                <Label>Assign Supervisor</Label>
                <Select>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select supervisor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john">John Okafor</SelectItem>
                    <SelectItem value="grace">Grace Okoro</SelectItem>
                    <SelectItem value="peter">Peter Nwosu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreatePlan} className="bg-[#003883] hover:bg-[#002664]">
                Save Plan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
