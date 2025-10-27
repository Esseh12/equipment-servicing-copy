import React, { useState } from 'react';
import { ServiceCentralLayout } from '../ServiceCentralLayout';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Users, Search, Settings, Database, FileText, Bell } from 'lucide-react';
import { MediaWatchLogin } from './MediaWatchLogin';
import { SearchPage } from './SearchPage';
import { ManualSearchModal } from './ManualSearchModal';
import { SearchSettingsPage } from './SearchSettingsPage';
import { EntitiesManagementPage } from './EntitiesManagementPage';
import { ReportsPage } from './ReportsPage';
import { AlertsPage } from './AlertsPage';
import { SentimentDetailModal } from './SentimentDetailModal';
import accessLogo from 'figma:asset/3ebf5c44175bf36c1eceb7236d272904dfc164a1.png';
import { 
  mockEntities, 
  mockSearchResults, 
  mockAutomationRules, 
  mockSentimentSummary,
  mockAlerts,
  mockEscalations
} from './MockMediaWatchData';
import type { 
  UserRole, 
  Screen, 
  Entity, 
  SearchResult, 
  AutomationRule,
  Alert,
  Escalation
} from './MediaWatchTypes';

interface MediaWatchAppProps {
  onLogout: () => void;
  onBackToSelector: () => void;
}

export function MediaWatchApp({ onLogout, onBackToSelector }: MediaWatchAppProps) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isManualSearchOpen, setIsManualSearchOpen] = useState(false);
  const [isSentimentDetailOpen, setIsSentimentDetailOpen] = useState(false);
  const [selectedMention, setSelectedMention] = useState<SearchResult | Alert | null>(null);

  // State management
  const [entities, setEntities] = useState<Entity[]>(mockEntities);
  const [searchResults, setSearchResults] = useState<SearchResult[]>(mockSearchResults);
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>(mockAutomationRules);
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [escalations, setEscalations] = useState<Escalation[]>(mockEscalations);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    // Route based on role
    if (role === 'risk-officer') {
      setCurrentScreen('alerts');
    } else {
      setCurrentScreen('search');
    }
  };

  const handleLogoutClick = () => {
    setUserRole(null);
    setCurrentScreen('login');
    // Don't call onLogout() - that would go back to selector
    // Just reset to login screen within Media Watch system
  };

  const handleManualSearch = (params: { entityIds: string[]; keywords: string; dateRange?: string }) => {
    // In a real app, this would trigger an API call
    // For now, we'll just show the existing results
    console.log('Manual search params:', params);
  };

  const handleViewMentionDetail = (mention: SearchResult | Alert) => {
    setSelectedMention(mention);
    setIsSentimentDetailOpen(true);
  };

  const handleFlagEscalation = (mentionId: string, comments: string) => {
    const newEscalation: Escalation = {
      id: `ESC${String(escalations.length + 1).padStart(3, '0')}`,
      searchResultId: mentionId,
      flaggedBy: 'risk.officer@accessbankplc.com',
      flaggedAt: new Date().toISOString(),
      comments,
      status: 'Pending'
    };
    setEscalations([...escalations, newEscalation]);
  };

  // Sidebar Component
  function SidebarContent() {
    const getRoleDisplayName = (role: UserRole) => {
      if (!role) return 'Guest';
      if (role === 'analyst') return 'Communications Analyst';
      if (role === 'admin') return 'Administrator';
      if (role === 'risk-officer') return 'Risk Officer';
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
              <p className="text-[12px] text-[#526484]">Media Watch</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="px-[16px] py-[16px] border-b border-[#d0d5dd]">
          <div className="text-[18px] text-[#003883]">Media Watch</div>
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
            {/* Alerts - Risk Officer only */}
            {userRole === 'risk-officer' && (
              <button
                onClick={() => setCurrentScreen('alerts')}
                className={`w-full px-4 py-2 rounded-lg text-left transition-colors ${
                  currentScreen === 'alerts'
                    ? 'bg-[#003883] text-white'
                    : 'bg-white hover:bg-[#f8f9fa] border border-[#e2e8f0] text-[#003883]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span className="text-[14px]">Alerts & Mentions</span>
                </div>
              </button>
            )}

            {/* Search Results - All roles */}
            <button
              onClick={() => setCurrentScreen('search')}
              className={`w-full px-4 py-2 rounded-lg text-left transition-colors ${
                currentScreen === 'search'
                  ? 'bg-[#003883] text-white'
                  : 'bg-white hover:bg-[#f8f9fa] border border-[#e2e8f0] text-[#003883]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                <span className="text-[14px]">Search Results</span>
              </div>
            </button>

            {/* Automation Settings - Admin only */}
            {userRole === 'admin' && (
              <button
                onClick={() => setCurrentScreen('settings')}
                className={`w-full px-4 py-2 rounded-lg text-left transition-colors ${
                  currentScreen === 'settings'
                    ? 'bg-[#003883] text-white'
                    : 'bg-white hover:bg-[#f8f9fa] border border-[#e2e8f0] text-[#003883]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span className="text-[14px]">Automation Settings</span>
                </div>
              </button>
            )}

            {/* Entities - All roles (but different access levels) */}
            <button
              onClick={() => setCurrentScreen('entities')}
              className={`w-full px-4 py-2 rounded-lg text-left transition-colors ${
                currentScreen === 'entities'
                  ? 'bg-[#003883] text-white'
                  : 'bg-white hover:bg-[#f8f9fa] border border-[#e2e8f0] text-[#003883]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                <span className="text-[14px]">{userRole === 'risk-officer' ? 'Entities Overview' : 'Entities Management'}</span>
              </div>
            </button>

            {/* Reports - All roles */}
            <button
              onClick={() => setCurrentScreen('reports')}
              className={`w-full px-4 py-2 rounded-lg text-left transition-colors ${
                currentScreen === 'reports'
                  ? 'bg-[#003883] text-white'
                  : 'bg-white hover:bg-[#f8f9fa] border border-[#e2e8f0] text-[#003883]'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="text-[14px]">Reports</span>
              </div>
            </button>
          </div>
        </div>

        {/* Logout */}
        <div className="p-[16px] border-t border-[#d0d5dd]">
          <Button
            onClick={handleLogoutClick}
            variant="outline"
            className="w-full border-[#003883] text-[#003883] hover:bg-[#003883] hover:text-white"
          >
            Logout
          </Button>
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
      <MediaWatchLogin 
        onLogin={handleLogin} 
        onBackToSelector={onBackToSelector}
      />
    );
  }

  // Render main app with layout
  return (
    <>
      <ServiceCentralLayout
        sidebarContent={<SidebarContent />}
        headerContent={<HeaderContent />}
      >
        {currentScreen === 'alerts' && (
          <AlertsPage
            alerts={alerts}
            onViewDetail={handleViewMentionDetail}
            onSettings={() => setCurrentScreen('settings')}
          />
        )}

        {currentScreen === 'search' && (
          <SearchPage
            results={searchResults}
            summary={mockSentimentSummary}
            onManualSearch={() => setIsManualSearchOpen(true)}
            onSettings={() => setCurrentScreen('settings')}
          />
        )}

        {currentScreen === 'settings' && (
          <SearchSettingsPage
            rules={automationRules}
            entities={entities}
            userRole={userRole}
            onBack={() => userRole === 'risk-officer' ? setCurrentScreen('alerts') : setCurrentScreen('search')}
            onUpdateRules={setAutomationRules}
          />
        )}

        {currentScreen === 'entities' && (
          <EntitiesManagementPage
            entities={entities}
            userRole={userRole}
            onBack={() => userRole === 'risk-officer' ? setCurrentScreen('alerts') : setCurrentScreen('search')}
            onUpdateEntities={setEntities}
          />
        )}

        {currentScreen === 'reports' && (
          <ReportsPage
            results={searchResults}
            onBack={() => userRole === 'risk-officer' ? setCurrentScreen('alerts') : setCurrentScreen('search')}
          />
        )}
      </ServiceCentralLayout>

      {/* Manual Search Modal */}
      <ManualSearchModal
        isOpen={isManualSearchOpen}
        onClose={() => setIsManualSearchOpen(false)}
        entities={entities}
        onSearch={handleManualSearch}
      />

      {/* Sentiment Detail Modal */}
      <SentimentDetailModal
        isOpen={isSentimentDetailOpen}
        onClose={() => {
          setIsSentimentDetailOpen(false);
          setSelectedMention(null);
        }}
        mention={selectedMention}
        onFlagEscalation={handleFlagEscalation}
        userRole={userRole || undefined}
      />
    </>
  );
}
