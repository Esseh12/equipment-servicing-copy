import React, { useState } from 'react';
import { ServiceCentralLayout } from '../ServiceCentralLayout';
import { AuditLogin } from './AuditLogin';
import { AuditDashboard } from './AuditDashboard';
import { AuditPlanningPage } from './AuditPlanningPage';
import { RiskAssessmentPage } from './RiskAssessmentPage';
import { ResourceAllocationPage } from './ResourceAllocationPage';
import { AuditEngagementPage } from './AuditEngagementPage';
import { FieldworkTrackingPage } from './FieldworkTrackingPage';
import { FindingsLogPage } from './FindingsLogPage';
import { ReportReviewPage } from './ReportReviewPage';
import { IssueTrackingPage } from './IssueTrackingPage';
import { Badge } from '../ui/badge';
import accessLogo from 'figma:asset/3ebf5c44175bf36c1eceb7236d272904dfc164a1.png';
import { 
  Users,
  LayoutDashboard,
  Calendar, 
  AlertTriangle, 
  UsersRound, 
  FileText, 
  ClipboardList, 
  AlertCircle, 
  FileCheck2, 
  ListChecks 
} from 'lucide-react';
import type {
  UserRole,
  Screen,
  AuditPlan,
  RiskAssessment,
  Resource,
  AuditEngagement,
  FieldworkProgress,
  Finding,
  AuditReport,
  Issue
} from './AuditTypes';
import {
  mockAuditPlans,
  mockRiskAssessments,
  mockResources,
  mockEngagements,
  mockFieldwork,
  mockFindings,
  mockReports,
  mockIssues
} from './MockAuditData';

interface AuditManagementAppProps {
  onBackToSelector: () => void;
}

export function AuditManagementApp({ onBackToSelector }: AuditManagementAppProps) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [userRole, setUserRole] = useState<UserRole>(null);

  // State management
  const [auditPlans, setAuditPlans] = useState<AuditPlan[]>(mockAuditPlans);
  const [riskAssessments, setRiskAssessments] = useState<RiskAssessment[]>(mockRiskAssessments);
  const [resources, setResources] = useState<Resource[]>(mockResources);
  const [engagements, setEngagements] = useState<AuditEngagement[]>(mockEngagements);
  const [fieldwork, setFieldwork] = useState<FieldworkProgress[]>(mockFieldwork);
  const [findings, setFindings] = useState<Finding[]>(mockFindings);
  const [reports, setReports] = useState<AuditReport[]>(mockReports);
  const [issues, setIssues] = useState<Issue[]>(mockIssues);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentScreen('login');
  };

  // Sidebar Component
  function SidebarContent() {
    const getRoleDisplayName = (role: UserRole) => {
      if (!role) return 'Guest';
      if (role === 'manager') return 'Audit Manager';
      if (role === 'supervisor') return 'Audit Supervisor';
      if (role === 'auditor') return 'Auditor';
      return 'Guest';
    };

    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="h-[65px] border-b border-[#d0d5dd] flex items-center px-[16px]">
          <div className="flex items-center gap-[10px]">
            <img src={accessLogo} alt="Access Bank" className="h-8" />
            <div>
              <h1 className="text-[14px] font-bold text-[#003883]">Service Central</h1>
              <p className="text-[12px] text-[#526484]">Audit Management</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="px-[16px] py-[16px] border-b border-[#d0d5dd]">
          <div className="text-[18px] text-[#003883]">Audit Management</div>
          <div className="flex items-center gap-2 mt-1">
            <Users className="h-4 w-4 text-[#526484]" />
            <span className="text-[12px] text-[#526484]">Role:</span>
            <Badge className="bg-[#003883] text-white text-[11px] h-5">
              {getRoleDisplayName(userRole)}
            </Badge>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-auto p-[16px]">
          <div className="space-y-2">
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className={`w-full px-4 py-2 rounded-lg text-left transition-colors ${
                currentScreen === 'dashboard'
                  ? 'bg-[#003883] text-white'
                  : 'bg-white hover:bg-[#f8f9fa] border border-[#e2e8f0] text-[#003883]'
              }`}
            >
              <div className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                <span className="text-[14px]">Dashboard</span>
              </div>
            </button>

            <button
              onClick={() => setCurrentScreen('planning')}
              className={`w-full px-4 py-2 rounded-lg text-left transition-colors ${
                currentScreen === 'planning'
                  ? 'bg-[#003883] text-white'
                  : 'bg-white hover:bg-[#f8f9fa] border border-[#e2e8f0] text-[#003883]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-[14px]">Audit Planning</span>
              </div>
            </button>

            <button
              onClick={() => setCurrentScreen('risk-assessment')}
              className={`w-full px-4 py-2 rounded-lg text-left transition-colors ${
                currentScreen === 'risk-assessment'
                  ? 'bg-[#003883] text-white'
                  : 'bg-white hover:bg-[#f8f9fa] border border-[#e2e8f0] text-[#003883]'
              }`}
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-[14px]">Risk Assessment</span>
              </div>
            </button>

            <button
              onClick={() => setCurrentScreen('resources')}
              className={`w-full px-4 py-2 rounded-lg text-left transition-colors ${
                currentScreen === 'resources'
                  ? 'bg-[#003883] text-white'
                  : 'bg-white hover:bg-[#f8f9fa] border border-[#e2e8f0] text-[#003883]'
              }`}
            >
              <div className="flex items-center gap-2">
                <UsersRound className="h-4 w-4" />
                <span className="text-[14px]">Resource Allocation</span>
              </div>
            </button>

            <button
              onClick={() => setCurrentScreen('engagements')}
              className={`w-full px-4 py-2 rounded-lg text-left transition-colors ${
                currentScreen === 'engagements'
                  ? 'bg-[#003883] text-white'
                  : 'bg-white hover:bg-[#f8f9fa] border border-[#e2e8f0] text-[#003883]'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="text-[14px]">Audit Engagements</span>
              </div>
            </button>

            <button
              onClick={() => setCurrentScreen('fieldwork')}
              className={`w-full px-4 py-2 rounded-lg text-left transition-colors ${
                currentScreen === 'fieldwork'
                  ? 'bg-[#003883] text-white'
                  : 'bg-white hover:bg-[#f8f9fa] border border-[#e2e8f0] text-[#003883]'
              }`}
            >
              <div className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4" />
                <span className="text-[14px]">Fieldwork Tracking</span>
              </div>
            </button>

            <button
              onClick={() => setCurrentScreen('findings')}
              className={`w-full px-4 py-2 rounded-lg text-left transition-colors ${
                currentScreen === 'findings'
                  ? 'bg-[#003883] text-white'
                  : 'bg-white hover:bg-[#f8f9fa] border border-[#e2e8f0] text-[#003883]'
              }`}
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <span className="text-[14px]">Findings & Exceptions</span>
              </div>
            </button>

            <button
              onClick={() => setCurrentScreen('reports')}
              className={`w-full px-4 py-2 rounded-lg text-left transition-colors ${
                currentScreen === 'reports'
                  ? 'bg-[#003883] text-white'
                  : 'bg-white hover:bg-[#f8f9fa] border border-[#e2e8f0] text-[#003883]'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileCheck2 className="h-4 w-4" />
                <span className="text-[14px]">Report Review</span>
              </div>
            </button>

            <button
              onClick={() => setCurrentScreen('issues')}
              className={`w-full px-4 py-2 rounded-lg text-left transition-colors ${
                currentScreen === 'issues'
                  ? 'bg-[#003883] text-white'
                  : 'bg-white hover:bg-[#f8f9fa] border border-[#e2e8f0] text-[#003883]'
              }`}
            >
              <div className="flex items-center gap-2">
                <ListChecks className="h-4 w-4" />
                <span className="text-[14px]">Issue Tracking</span>
              </div>
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <div className="p-[16px] border-t border-[#d0d5dd]">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 rounded-lg bg-white border border-[#e2e8f0] text-[#003883] hover:bg-[#f8f9fa] transition-colors text-[14px]"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  // Header Component
  function HeaderContent() {
    return <div className="h-full" />;
  }

  // Render login screen
  if (currentScreen === 'login') {
    return (
      <AuditLogin 
        onLogin={handleLogin} 
        onBackToSelector={onBackToSelector}
      />
    );
  }

  // Render main app with layout
  return (
    <ServiceCentralLayout
      sidebarContent={<SidebarContent />}
      headerContent={<HeaderContent />}
    >
      {currentScreen === 'dashboard' && (
        <AuditDashboard
          userRole={userRole}
          plans={auditPlans}
          assessments={riskAssessments}
          resources={resources}
          engagements={engagements}
          findings={findings}
          issues={issues}
          onNavigate={setCurrentScreen}
        />
      )}

      {currentScreen === 'planning' && (
        <AuditPlanningPage
          plans={auditPlans}
          userRole={userRole}
          onUpdatePlans={setAuditPlans}
        />
      )}

      {currentScreen === 'risk-assessment' && (
        <RiskAssessmentPage
          assessments={riskAssessments}
          userRole={userRole}
          onUpdateAssessments={setRiskAssessments}
        />
      )}

      {currentScreen === 'resources' && (
        <ResourceAllocationPage
          resources={resources}
          userRole={userRole}
          onUpdateResources={setResources}
        />
      )}

      {currentScreen === 'engagements' && (
        <AuditEngagementPage
          engagements={engagements}
          plans={auditPlans}
          userRole={userRole}
          onUpdateEngagements={setEngagements}
        />
      )}

      {currentScreen === 'fieldwork' && (
        <FieldworkTrackingPage
          fieldwork={fieldwork}
          engagements={engagements}
          userRole={userRole}
          onUpdateFieldwork={setFieldwork}
        />
      )}

      {currentScreen === 'findings' && (
        <FindingsLogPage
          findings={findings}
          engagements={engagements}
          userRole={userRole}
          onUpdateFindings={setFindings}
        />
      )}

      {currentScreen === 'reports' && (
        <ReportReviewPage
          reports={reports}
          userRole={userRole}
          onUpdateReports={setReports}
        />
      )}

      {currentScreen === 'issues' && (
        <IssueTrackingPage
          issues={issues}
          findings={findings}
          userRole={userRole}
          onUpdateIssues={setIssues}
        />
      )}
    </ServiceCentralLayout>
  );
}
