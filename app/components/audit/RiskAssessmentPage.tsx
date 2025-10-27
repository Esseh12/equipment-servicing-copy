import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Eye, RefreshCw } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { RiskAssessment, UserRole, RiskRating } from './AuditTypes';

interface RiskAssessmentPageProps {
  assessments: RiskAssessment[];
  userRole: UserRole;
  onUpdateAssessments: (assessments: RiskAssessment[]) => void;
}

export function RiskAssessmentPage({ assessments, userRole, onUpdateAssessments }: RiskAssessmentPageProps) {
  const [entityTypeFilter, setEntityTypeFilter] = useState<string>('All');
  const [selectedAssessment, setSelectedAssessment] = useState<RiskAssessment | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const filteredAssessments = assessments.filter(a => 
    entityTypeFilter === 'All' || a.entityType === entityTypeFilter
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

  const handleRecalculate = (id: string) => {
    toast.success('Risk score recalculated');
  };

  return (
    <div className="h-full bg-[#f9fafb] overflow-y-auto">
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="mb-6">
          <h1 className="text-[28px] text-[#101828] mb-1">Risk Assessment</h1>
          <p className="text-[14px] text-[#667085]">
            Conduct and review automated risk scoring for entities
          </p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Select value={entityTypeFilter} onValueChange={setEntityTypeFilter}>
              <SelectTrigger className="w-[200px] h-[40px] border-[#d0d5dd]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Entity Types</SelectItem>
                <SelectItem value="Branch">Branch</SelectItem>
                <SelectItem value="Subsidiary">Subsidiary</SelectItem>
                <SelectItem value="Unit">Unit</SelectItem>
                <SelectItem value="Department">Department</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-white border border-[#eaecf0] rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f9fafb] border-b border-[#eaecf0]">
                <tr>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Entity</th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Risk Factor</th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Weight</th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Score</th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Rating</th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#667085] uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaecf0]">
                {filteredAssessments.map((assessment) => (
                  <tr key={assessment.id} className="hover:bg-[#f9fafb]">
                    <td className="px-6 py-4 text-[14px] text-[#101828]">{assessment.entity}</td>
                    <td className="px-6 py-4 text-[14px] text-[#667085]">{assessment.riskFactor}</td>
                    <td className="px-6 py-4 text-[14px] text-[#667085]">{assessment.weight}%</td>
                    <td className="px-6 py-4 text-[14px] text-[#101828]">{assessment.score.toFixed(1)}</td>
                    <td className="px-6 py-4">{getRiskBadge(assessment.rating)}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setSelectedAssessment(assessment);
                          setIsDetailModalOpen(true);
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
        </div>

        <div className="mt-6 p-4 bg-[#fef3f2] border border-[#fecdca] rounded-lg">
          <div className="text-[12px] text-[#667085]">
            <strong>Role:</strong> {userRole === 'manager' ? 'Audit Manager (Approver)' : 'Audit Supervisor (Reviewer)'}
            <br />
            <strong>Goal:</strong> Review automated risk scores and approve risk rankings for all entities
            <br />
            <strong>System Behavior:</strong> High-risk entities auto-prioritized in audit planning; automatic color indicators (High = Red, Medium = Orange, Low = Green); recalculates scores based on updated weightings
            <br />
            <strong>Expected Output:</strong> Validated risk ratings for each entity to inform audit prioritization
          </div>
        </div>

        <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Risk Assessment Details</DialogTitle>
            </DialogHeader>
            {selectedAssessment && (
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Entity</Label>
                    <div className="mt-1 text-[14px]">{selectedAssessment.entity}</div>
                  </div>
                  <div>
                    <Label>Entity Type</Label>
                    <div className="mt-1 text-[14px]">{selectedAssessment.entityType}</div>
                  </div>
                </div>
                <div>
                  <Label>Risk Factor</Label>
                  <Input value={selectedAssessment.riskFactor} className="mt-1.5" readOnly />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Weight (%)</Label>
                    <Input type="number" value={selectedAssessment.weight} className="mt-1.5" />
                  </div>
                  <div>
                    <Label>Score</Label>
                    <Input type="number" value={selectedAssessment.score} className="mt-1.5" readOnly />
                  </div>
                </div>
                <div>
                  <Label>Current Rating</Label>
                  <div className="mt-2">{getRiskBadge(selectedAssessment.rating)}</div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDetailModalOpen(false)}>Close</Button>
              {userRole === 'manager' && (
                <Button onClick={() => handleRecalculate(selectedAssessment?.id || '')} className="bg-[#003883] hover:bg-[#002664]">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Recalculate Risk Score
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
