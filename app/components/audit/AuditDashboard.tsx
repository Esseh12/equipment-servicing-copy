import React from 'react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { 
  Calendar,
  AlertTriangle,
  UsersRound,
  FileText,
  ClipboardList,
  AlertCircle,
  FileCheck2,
  ListChecks,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2
} from 'lucide-react';
import type { 
  UserRole, 
  AuditPlan, 
  RiskAssessment, 
  Resource, 
  AuditEngagement, 
  Finding, 
  Issue 
} from './AuditTypes';

interface AuditDashboardProps {
  userRole: UserRole;
  plans: AuditPlan[];
  assessments: RiskAssessment[];
  resources: Resource[];
  engagements: AuditEngagement[];
  findings: Finding[];
  issues: Issue[];
  onNavigate: (screen: string) => void;
}

export function AuditDashboard({
  userRole,
  plans,
  assessments,
  resources,
  engagements,
  findings,
  issues,
  onNavigate
}: AuditDashboardProps) {
  
  // Calculate metrics
  const activePlans = plans.filter(p => p.status === 'In Progress' || p.status === 'Approved').length;
  const completedPlans = plans.filter(p => p.status === 'Completed').length;
  const highRisks = assessments.filter(r => r.overallRisk === 'High').length;
  const activeEngagements = engagements.filter(e => e.status === 'In Progress' || e.status === 'Planning').length;
  const pendingFindings = findings.filter(f => f.status === 'Open').length;
  const criticalFindings = findings.filter(f => f.severity === 'Critical').length;
  const openIssues = issues.filter(i => i.status === 'Open').length;
  const overdueIssues = issues.filter(i => i.status === 'Overdue').length;
  
  const utilizationRate = resources.length > 0 
    ? Math.round(resources.reduce((sum, r) => sum + r.utilizationRate, 0) / resources.length)
    : 0;

  const getRoleDisplayName = (role: UserRole) => {
    if (!role) return 'Guest';
    if (role === 'manager') return 'Audit Manager';
    if (role === 'supervisor') return 'Audit Supervisor';
    if (role === 'auditor') return 'Auditor';
    return 'Guest';
  };

  return (
    <div className="h-full bg-[#f9fafb] overflow-y-auto">
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[28px] text-[#101828] mb-1">Audit Management Dashboard</h1>
              <p className="text-[14px] text-[#667085]">
                Welcome back, {getRoleDisplayName(userRole)}
              </p>
            </div>
            <Badge className="bg-[#003883] text-white text-[12px] h-7 px-3">
              {getRoleDisplayName(userRole)}
            </Badge>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {/* Active Plans */}
          <Card className="p-5 border border-[#eaecf0] shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[13px] text-[#667085] mb-1">Active Plans</p>
                <p className="text-[28px] text-[#101828]">{activePlans}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-3.5 w-3.5 text-[#027a48]" />
                  <span className="text-[12px] text-[#027a48]">
                    {completedPlans} completed
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#eff8ff] flex items-center justify-center">
                <Calendar className="h-5 w-5 text-[#003883]" />
              </div>
            </div>
          </Card>

          {/* High Risks */}
          <Card className="p-5 border border-[#eaecf0] shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[13px] text-[#667085] mb-1">High Risk Areas</p>
                <p className="text-[28px] text-[#101828]">{highRisks}</p>
                <div className="flex items-center gap-1 mt-2">
                  <AlertTriangle className="h-3.5 w-3.5 text-[#f79009]" />
                  <span className="text-[12px] text-[#f79009]">
                    Requires attention
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#fef3f2] flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-[#b42318]" />
              </div>
            </div>
          </Card>

          {/* Active Engagements */}
          <Card className="p-5 border border-[#eaecf0] shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[13px] text-[#667085] mb-1">Active Engagements</p>
                <p className="text-[28px] text-[#101828]">{activeEngagements}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Clock className="h-3.5 w-3.5 text-[#667085]" />
                  <span className="text-[12px] text-[#667085]">
                    In progress
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#f4f3ff] flex items-center justify-center">
                <FileText className="h-5 w-5 text-[#5925dc]" />
              </div>
            </div>
          </Card>

          {/* Resource Utilization */}
          <Card className="p-5 border border-[#eaecf0] shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[13px] text-[#667085] mb-1">Resource Utilization</p>
                <p className="text-[28px] text-[#101828]">{utilizationRate}%</p>
                <div className="flex items-center gap-1 mt-2">
                  <UsersRound className="h-3.5 w-3.5 text-[#667085]" />
                  <span className="text-[12px] text-[#667085]">
                    {resources.length} resources
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#ecfdf3] flex items-center justify-center">
                <UsersRound className="h-5 w-5 text-[#027a48]" />
              </div>
            </div>
          </Card>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Findings Summary */}
          <Card className="p-5 border border-[#eaecf0] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[16px] text-[#101828]">Findings Summary</h2>
              <AlertCircle className="h-5 w-5 text-[#667085]" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#fef3f2] rounded-lg border border-[#fecdca]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#b42318]" />
                  <span className="text-[14px] text-[#101828]">Critical Findings</span>
                </div>
                <Badge className="bg-[#b42318] text-white text-[12px]">
                  {criticalFindings}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#fff7ed] rounded-lg border border-[#fed7aa]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#f79009]" />
                  <span className="text-[14px] text-[#101828]">Pending Findings</span>
                </div>
                <Badge className="bg-[#f79009] text-white text-[12px]">
                  {pendingFindings}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#f9fafb] rounded-lg border border-[#eaecf0]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#667085]" />
                  <span className="text-[14px] text-[#101828]">Total Findings</span>
                </div>
                <Badge className="bg-[#667085] text-white text-[12px]">
                  {findings.length}
                </Badge>
              </div>
            </div>
          </Card>

          {/* Issues Summary */}
          <Card className="p-5 border border-[#eaecf0] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[16px] text-[#101828]">Issues Summary</h2>
              <ListChecks className="h-5 w-5 text-[#667085]" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#fef3f2] rounded-lg border border-[#fecdca]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#b42318]" />
                  <span className="text-[14px] text-[#101828]">Overdue Issues</span>
                </div>
                <Badge className="bg-[#b42318] text-white text-[12px]">
                  {overdueIssues}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#fff7ed] rounded-lg border border-[#fed7aa]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#f79009]" />
                  <span className="text-[14px] text-[#101828]">Open Issues</span>
                </div>
                <Badge className="bg-[#f79009] text-white text-[12px]">
                  {openIssues}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#f9fafb] rounded-lg border border-[#eaecf0]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#667085]" />
                  <span className="text-[14px] text-[#101828]">Total Issues</span>
                </div>
                <Badge className="bg-[#667085] text-white text-[12px]">
                  {issues.length}
                </Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Access Cards */}
        <div className="mb-4">
          <h2 className="text-[18px] text-[#101828] mb-4">Quick Access</h2>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Card 
            onClick={() => onNavigate('planning')}
            className="p-4 border border-[#eaecf0] shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#eff8ff] flex items-center justify-center mb-3">
                <Calendar className="h-6 w-6 text-[#003883]" />
              </div>
              <h3 className="text-[14px] text-[#101828] mb-1">Audit Planning</h3>
              <p className="text-[12px] text-[#667085]">Create and manage plans</p>
            </div>
          </Card>

          <Card 
            onClick={() => onNavigate('risk-assessment')}
            className="p-4 border border-[#eaecf0] shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#fef3f2] flex items-center justify-center mb-3">
                <AlertTriangle className="h-6 w-6 text-[#b42318]" />
              </div>
              <h3 className="text-[14px] text-[#101828] mb-1">Risk Assessment</h3>
              <p className="text-[12px] text-[#667085]">Evaluate audit risks</p>
            </div>
          </Card>

          <Card 
            onClick={() => onNavigate('engagements')}
            className="p-4 border border-[#eaecf0] shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#f4f3ff] flex items-center justify-center mb-3">
                <FileText className="h-6 w-6 text-[#5925dc]" />
              </div>
              <h3 className="text-[14px] text-[#101828] mb-1">Engagements</h3>
              <p className="text-[12px] text-[#667085]">Track audit progress</p>
            </div>
          </Card>

          <Card 
            onClick={() => onNavigate('reports')}
            className="p-4 border border-[#eaecf0] shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#ecfdf3] flex items-center justify-center mb-3">
                <FileCheck2 className="h-6 w-6 text-[#027a48]" />
              </div>
              <h3 className="text-[14px] text-[#101828] mb-1">Reports</h3>
              <p className="text-[12px] text-[#667085]">Review audit reports</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
