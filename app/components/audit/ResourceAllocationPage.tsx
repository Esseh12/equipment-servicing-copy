import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Plus, Edit } from 'lucide-react';
import { Progress } from '../ui/progress';
import { toast } from 'sonner@2.0.3';
import type { Resource, UserRole } from './AuditTypes';

interface ResourceAllocationPageProps {
  resources: Resource[];
  userRole: UserRole;
  onUpdateResources: (resources: Resource[]) => void;
}

export function ResourceAllocationPage({ resources, userRole, onUpdateResources }: ResourceAllocationPageProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [auditorName, setAuditorName] = useState('');
  const [designation, setDesignation] = useState('');
  const [assignedAudit, setAssignedAudit] = useState('');
  const [duration, setDuration] = useState('');
  const [budget, setBudget] = useState('');

  const handleAddResource = () => {
    if (!auditorName || !designation) {
      toast.error('Please fill in required fields');
      return;
    }

    const newResource: Resource = {
      id: `R${String(resources.length + 1).padStart(3, '0')}`,
      auditorName,
      designation,
      skillSet: [],
      assignedAudit: assignedAudit || undefined,
      duration: duration ? parseInt(duration) : undefined,
      budget: budget ? parseInt(budget) : undefined,
      utilization: 0
    };

    onUpdateResources([...resources, newResource]);
    toast.success('Resource added successfully');
    setIsAddModalOpen(false);
    
    // Reset form
    setAuditorName('');
    setDesignation('');
    setAssignedAudit('');
    setDuration('');
    setBudget('');
  };

  const handleEditResource = (resource: Resource) => {
    setEditingResource(resource);
    setAuditorName(resource.auditorName);
    setDesignation(resource.designation);
    setAssignedAudit(resource.assignedAudit || '');
    setDuration(resource.duration ? String(resource.duration) : '');
    setBudget(resource.budget ? String(resource.budget) : '');
    setIsEditModalOpen(true);
  };

  const handleUpdateResource = () => {
    if (!editingResource || !auditorName || !designation) {
      toast.error('Please fill in required fields');
      return;
    }

    const updatedResources = resources.map(r => 
      r.id === editingResource.id 
        ? {
            ...r,
            auditorName,
            designation,
            assignedAudit: assignedAudit || undefined,
            duration: duration ? parseInt(duration) : undefined,
            budget: budget ? parseInt(budget) : undefined,
          }
        : r
    );

    onUpdateResources(updatedResources);
    toast.success('Resource updated successfully');
    setIsEditModalOpen(false);
    
    // Reset form
    setEditingResource(null);
    setAuditorName('');
    setDesignation('');
    setAssignedAudit('');
    setDuration('');
    setBudget('');
  };

  return (
    <div className="h-full bg-[#f9fafb] overflow-y-auto">
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="mb-6">
          <h1 className="text-[28px] text-[#101828] mb-1">Resource & Budget Allocation</h1>
          <p className="text-[14px] text-[#667085]">Assign auditors and set resource estimates</p>
        </div>

        <div className="flex justify-end mb-6">
          <Button onClick={() => setIsAddModalOpen(true)} className="bg-[#003883] hover:bg-[#002664]">
            <Plus className="h-4 w-4 mr-2" />
            Add Resource
          </Button>
        </div>

        <div className="bg-white border border-[#eaecf0] rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#f9fafb] border-b border-[#eaecf0]">
              <tr>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Auditor</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Designation</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Skills</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Assigned Audit</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Duration</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Budget (₦)</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Utilization</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eaecf0]">
              {resources.map((resource) => (
                <tr key={resource.id} className="hover:bg-[#f9fafb]">
                  <td className="px-6 py-4 text-[14px] text-[#101828]">{resource.auditorName}</td>
                  <td className="px-6 py-4 text-[14px] text-[#667085]">{resource.designation}</td>
                  <td className="px-6 py-4 text-[12px] text-[#667085]">{resource.skillSet.join(', ')}</td>
                  <td className="px-6 py-4 text-[14px] text-[#667085]">{resource.assignedAudit || 'Available'}</td>
                  <td className="px-6 py-4 text-[14px] text-[#667085]">{resource.duration ? `${resource.duration} days` : '-'}</td>
                  <td className="px-6 py-4 text-[14px] text-[#667085]">{resource.budget ? `₦${resource.budget.toLocaleString()}` : '-'}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Progress value={resource.utilization} className="w-20" />
                      <span className="text-[12px] text-[#667085]">{resource.utilization}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => handleEditResource(resource)}
                      className="text-[#003883] hover:text-[#002664]"
                      title="Edit Resource"
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
            <strong>Role:</strong> {userRole === 'manager' ? 'Audit Manager (Approver)' : 'Audit Supervisor (Proposer)'}
            <br />
            <strong>Goal:</strong> Allocate auditors and budget to approved audit engagements based on skills and availability
            <br />
            <strong>System Behavior:</strong> Tracks utilization rates and prevents over-allocation; displays visual capacity indicators; links resources to specific engagements
            <br />
            <strong>Expected Output:</strong> Fully staffed audit engagements with allocated budgets and timelines
          </div>
        </div>

        {/* Add Resource Modal */}
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Resource</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Auditor Name *</Label>
                <Input 
                  placeholder="Enter auditor name" 
                  value={auditorName}
                  onChange={(e) => setAuditorName(e.target.value)}
                  className="mt-1.5" 
                />
              </div>
              <div>
                <Label>Designation *</Label>
                <Select value={designation} onValueChange={setDesignation}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select designation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Senior Auditor">Senior Auditor</SelectItem>
                    <SelectItem value="Junior Auditor">Junior Auditor</SelectItem>
                    <SelectItem value="Audit Manager">Audit Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Assigned Engagement (Optional)</Label>
                <Select value={assignedAudit} onValueChange={setAssignedAudit}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select engagement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Core Banking System Review">Core Banking System Review</SelectItem>
                    <SelectItem value="Treasury Operations Audit">Treasury Operations Audit</SelectItem>
                    <SelectItem value="Retail Banking Branch Audit">Retail Banking Branch Audit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Duration (days)</Label>
                  <Input 
                    type="number" 
                    placeholder="e.g., 10" 
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="mt-1.5" 
                  />
                </div>
                <div>
                  <Label>Estimated Budget (₦)</Label>
                  <Input 
                    type="number" 
                    placeholder="e.g., 1500000" 
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="mt-1.5" 
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddResource} className="bg-[#003883] hover:bg-[#002664]">
                Add Resource
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Resource Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Resource - {editingResource?.id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Auditor Name *</Label>
                <Input 
                  placeholder="Enter auditor name" 
                  value={auditorName}
                  onChange={(e) => setAuditorName(e.target.value)}
                  className="mt-1.5" 
                />
              </div>
              <div>
                <Label>Designation *</Label>
                <Select value={designation} onValueChange={setDesignation}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select designation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Senior Auditor">Senior Auditor</SelectItem>
                    <SelectItem value="Junior Auditor">Junior Auditor</SelectItem>
                    <SelectItem value="Audit Manager">Audit Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Assigned Engagement (Optional)</Label>
                <Select value={assignedAudit} onValueChange={setAssignedAudit}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select engagement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    <SelectItem value="Core Banking System Review">Core Banking System Review</SelectItem>
                    <SelectItem value="Treasury Operations Audit">Treasury Operations Audit</SelectItem>
                    <SelectItem value="Retail Banking Branch Audit">Retail Banking Branch Audit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Duration (days)</Label>
                  <Input 
                    type="number" 
                    placeholder="e.g., 10" 
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="mt-1.5" 
                  />
                </div>
                <div>
                  <Label>Estimated Budget (₦)</Label>
                  <Input 
                    type="number" 
                    placeholder="e.g., 1500000" 
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="mt-1.5" 
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateResource} className="bg-[#003883] hover:bg-[#002664]">
                Update Resource
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
