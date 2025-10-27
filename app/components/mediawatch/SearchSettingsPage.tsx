import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Play, 
  Pause, 
  ArrowLeft,
  AlertTriangle,
  Lock
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { toast } from 'sonner@2.0.3';
import type { AutomationRule, Entity, SearchFrequency, UserRole } from './MediaWatchTypes';

interface SearchSettingsPageProps {
  rules: AutomationRule[];
  entities: Entity[];
  userRole: UserRole;
  onBack: () => void;
  onUpdateRules: (rules: AutomationRule[]) => void;
}

export function SearchSettingsPage({ rules, entities, userRole, onBack, onUpdateRules }: SearchSettingsPageProps) {
  const [localRules, setLocalRules] = useState(rules);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<AutomationRule | null>(null);
  const [deleteRuleId, setDeleteRuleId] = useState<string | null>(null);

  // Form state
  const [frequency, setFrequency] = useState<SearchFrequency>('Every 6 hours');
  const [keywords, setKeywords] = useState('');
  const [selectedEntityIds, setSelectedEntityIds] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleSaveRule = () => {
    setError('');

    if (!keywords.trim()) {
      setError('Keywords are required');
      return;
    }

    if (selectedEntityIds.length === 0) {
      setError('Please select at least one entity');
      return;
    }

    const keywordArray = keywords.split(',').map(k => k.trim()).filter(k => k);
    const entityNames = entities
      .filter(e => selectedEntityIds.includes(e.id))
      .map(e => e.name);

    if (editingRule) {
      // Update existing rule
      const updatedRules = localRules.map(rule =>
        rule.id === editingRule.id
          ? {
              ...rule,
              frequency,
              keywords: keywordArray,
              entities: entityNames
            }
          : rule
      );
      setLocalRules(updatedRules);
      onUpdateRules(updatedRules);
      toast.success('Automation rule updated successfully');
    } else {
      // Create new rule
      const newRule: AutomationRule = {
        id: `AR${String(localRules.length + 1).padStart(3, '0')}`,
        frequency,
        keywords: keywordArray,
        entities: entityNames,
        status: 'Active',
        lastRun: new Date().toLocaleString('en-GB', { 
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      const updatedRules = [...localRules, newRule];
      setLocalRules(updatedRules);
      onUpdateRules(updatedRules);
      toast.success('Automation rule created successfully');
    }

    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingRule(null);
    setFrequency('Every 6 hours');
    setKeywords('');
    setSelectedEntityIds([]);
    setError('');
  };

  const handleEditRule = (rule: AutomationRule) => {
    setEditingRule(rule);
    setFrequency(rule.frequency);
    setKeywords(rule.keywords.join(', '));
    
    const entityIds = entities
      .filter(e => rule.entities.includes(e.name))
      .map(e => e.id);
    setSelectedEntityIds(entityIds);
    
    setIsAddModalOpen(true);
  };

  const handleDeleteRule = () => {
    if (!deleteRuleId) return;

    const updatedRules = localRules.filter(rule => rule.id !== deleteRuleId);
    setLocalRules(updatedRules);
    onUpdateRules(updatedRules);
    toast.success('Automation rule deleted');
    setDeleteRuleId(null);
  };

  const handleToggleStatus = (ruleId: string) => {
    const updatedRules = localRules.map(rule =>
      rule.id === ruleId
        ? { ...rule, status: rule.status === 'Active' ? 'Inactive' as const : 'Active' as const }
        : rule
    );
    setLocalRules(updatedRules);
    onUpdateRules(updatedRules);
    
    const rule = updatedRules.find(r => r.id === ruleId);
    toast.success(`Rule ${rule?.status === 'Active' ? 'activated' : 'suspended'}`);
  };

  const toggleEntity = (entityId: string) => {
    setSelectedEntityIds(prev =>
      prev.includes(entityId)
        ? prev.filter(id => id !== entityId)
        : [...prev, entityId]
    );
  };

  return (
    <div className="h-full bg-[#f9fafb] overflow-y-auto">
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#667085] hover:text-[#344054] mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-[14px]">Back to Search</span>
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[28px] text-[#101828] mb-1">
                Automation Setup
              </h1>
              <p className="text-[14px] text-[#667085]">
                Manage automated search configurations and frequency
              </p>
            </div>
            {userRole === 'admin' ? (
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-[#003883] hover:bg-[#002860] text-white h-[40px] px-4"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Rule
              </Button>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 bg-[#f9fafb] border border-[#eaecf0] rounded-lg">
                <Lock className="h-4 w-4 text-[#667085]" />
                <span className="text-[14px] text-[#667085]">View Only Mode</span>
              </div>
            )}
          </div>
        </div>

        {/* Rules Table */}
        <div className="bg-white border border-[#eaecf0] rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f9fafb] border-b border-[#eaecf0]">
                <tr>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase tracking-wider">
                    Rule ID
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase tracking-wider">
                    Frequency
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase tracking-wider">
                    Keywords
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase tracking-wider">
                    Entities
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase tracking-wider">
                    Last Run
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaecf0]">
                {localRules.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <p className="text-[14px] text-[#667085]">No automation rules configured</p>
                      <Button
                        onClick={() => setIsAddModalOpen(true)}
                        variant="outline"
                        className="mt-4"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Create First Rule
                      </Button>
                    </td>
                  </tr>
                ) : (
                  localRules.map((rule) => (
                    <tr 
                      key={rule.id} 
                      className={`hover:bg-[#f9fafb] transition-colors ${rule.status === 'Inactive' ? 'opacity-60' : ''}`}
                    >
                      <td className="px-6 py-4 text-[14px] text-[#101828]">
                        {rule.id}
                      </td>
                      <td className="px-6 py-4 text-[14px] text-[#667085]">
                        {rule.frequency}
                      </td>
                      <td className="px-6 py-4 text-[14px] text-[#101828] max-w-[250px]">
                        <div className="flex flex-wrap gap-1">
                          {rule.keywords.map((keyword, idx) => (
                            <Badge 
                              key={idx} 
                              variant="outline" 
                              className="text-[11px] bg-[#eff8ff] text-[#175cd3] border-[#b2ddff]"
                            >
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[14px] text-[#667085] max-w-[200px]">
                        {rule.entities.length === entities.filter(e => e.status === 'Active').length
                          ? 'All Active'
                          : rule.entities.join(', ')
                        }
                      </td>
                      <td className="px-6 py-4">
                        <Badge 
                          className={`${
                            rule.status === 'Active'
                              ? 'bg-[#ecfdf3] text-[#027a48] border-[#abefc6]'
                              : 'bg-[#f2f4f7] text-[#344054] border-[#d0d5dd]'
                          } border`}
                        >
                          {rule.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-[14px] text-[#667085]">
                        {rule.lastRun || 'Never'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {userRole === 'admin' ? (
                            <>
                              <button
                                onClick={() => handleToggleStatus(rule.id)}
                                className="text-[#667085] hover:text-[#344054] transition-colors"
                                title={rule.status === 'Active' ? 'Suspend' : 'Activate'}
                              >
                                {rule.status === 'Active' ? (
                                  <Pause className="h-4 w-4" />
                                ) : (
                                  <Play className="h-4 w-4" />
                                )}
                              </button>
                              <button
                                onClick={() => handleEditRule(rule)}
                                className="text-[#667085] hover:text-[#344054] transition-colors"
                                title="Edit"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => setDeleteRuleId(rule.id)}
                                className="text-[#b42318] hover:text-[#912018] transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </>
                          ) : (
                            <span className="flex items-center gap-1 text-[12px] text-[#667085]">
                              <Lock className="h-3 w-3" />
                              View Only
                            </span>
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

        {/* Add/Edit Rule Modal */}
        <Dialog open={isAddModalOpen} onOpenChange={handleCloseModal}>
          <DialogContent className="max-w-[540px]">
            <DialogHeader>
              <DialogTitle className="text-[20px] text-[#101828]">
                {editingRule ? 'Edit Automation Rule' : 'Add Automation Rule'}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              {/* Frequency */}
              <div className="space-y-2">
                <Label className="text-[14px] text-[#344054]">
                  Frequency <span className="text-[#ee3148]">*</span>
                </Label>
                <Select value={frequency} onValueChange={(value) => setFrequency(value as SearchFrequency)}>
                  <SelectTrigger className="h-[40px] border border-[#d0d5dd]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Every 6 hours">Every 6 hours</SelectItem>
                    <SelectItem value="Daily">Daily</SelectItem>
                    <SelectItem value="Weekly">Weekly</SelectItem>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Keywords */}
              <div className="space-y-2">
                <Label className="text-[14px] text-[#344054]">
                  Keywords <span className="text-[#ee3148]">*</span>
                </Label>
                <Input
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="e.g., Access Bank, Loans, Expansion"
                  className="h-[40px] border border-[#d0d5dd]"
                />
                <p className="text-[12px] text-[#667085]">
                  Enter keywords separated by commas
                </p>
              </div>

              {/* Entity Selection */}
              <div className="space-y-2">
                <Label className="text-[14px] text-[#344054]">
                  Select Entities <span className="text-[#ee3148]">*</span>
                </Label>
                <div className="border border-[#d0d5dd] rounded-lg p-3 max-h-[160px] overflow-y-auto">
                  {entities.filter(e => e.status === 'Active').map(entity => (
                    <label
                      key={entity.id}
                      className="flex items-center gap-2 py-2 cursor-pointer hover:bg-[#f9fafb] px-2 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={selectedEntityIds.includes(entity.id)}
                        onChange={() => toggleEntity(entity.id)}
                        className="h-4 w-4 text-[#003883] border-[#d0d5dd] rounded focus:ring-[#003883]"
                      />
                      <span className="text-[14px] text-[#101828]">{entity.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-[#fef3f2] border border-[#fecdca] rounded-lg p-3 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-[#b42318] mt-0.5" />
                  <p className="text-[14px] text-[#b42318]">{error}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <Button
                  onClick={handleSaveRule}
                  className="flex-1 bg-[#003883] hover:bg-[#002860] text-white h-[40px]"
                >
                  {editingRule ? 'Update Rule' : 'Save Rule'}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCloseModal}
                  className="flex-1 h-[40px] border-[#d0d5dd]"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteRuleId} onOpenChange={() => setDeleteRuleId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Automation Rule</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this automation rule? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteRule}
                className="bg-[#b42318] hover:bg-[#912018]"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
