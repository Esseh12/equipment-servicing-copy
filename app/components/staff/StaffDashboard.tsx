import { ServiceCentralLayout } from '../ServiceCentralLayout';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Building, Bell, Users, LogOut, Shield, BarChart3, FileText, Clock, Home, ChevronRight, CreditCard, Lock } from 'lucide-react';
import accessLogo from 'figma:asset/3ebf5c44175bf36c1eceb7236d272904dfc164a1.png';

interface StaffDashboardProps {
  onKPACollections: () => void;
  onViewNotifications: () => void;
  onLogout: () => void;
}

// Sidebar Navigation
function SidebarContent({ onKPACollections, onViewNotifications }: { onKPACollections: () => void; onViewNotifications: () => void }) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="h-[65px] border-b border-[#d0d5dd] flex items-center px-[16px]">
        <div className="flex items-center gap-[10px]">
          <img src={accessLogo} alt="Access Bank" className="h-8" />
          <div>
            <h1 className="font-['Inter:Bold',_sans-serif] font-bold text-[18px] text-[#003883] leading-[22px]">
              Service Central
            </h1>
            <p className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#526484] leading-[16px]">
              Staff Portal
            </p>
          </div>
        </div>
      </div>

      {/* User Info with Role Badge */}
      <div className="px-[16px] py-[16px] border-b border-[#d0d5dd]">
        <div className="font-['Inter:Bold',_sans-serif] font-bold text-[18px] text-[#003883] leading-[30px]">
          Staff Portal
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Users className="h-4 w-4 text-[#526484]" />
          <span className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#526484] leading-[16px]">Role:</span>
          <Badge className="bg-[#21a366] text-white text-[11px] h-5">Branch Teller</Badge>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-[12px] py-[8px]">
        <div className="flex flex-col gap-[8px]">
          {/* KPA Collections - Active */}
          <div className="bg-[#ebeef2] h-[44px] rounded-[6px] flex items-center px-[12px] gap-[12px]">
            <Building className="h-[20px] w-[20px] text-[#003883]" />
            <span className="font-['DM_Sans:Bold',_sans-serif] font-bold text-[15px] text-[#003883] leading-[20px] tracking-[0.15px]">
              Dashboard
            </span>
          </div>

          {/* KPA Collections */}
          <div 
            onClick={onKPACollections}
            className="h-[44px] rounded-[6px] flex items-center px-[12px] gap-[12px] hover:bg-[#ebeef2] cursor-pointer"
          >
            <CreditCard className="h-[20px] w-[20px] text-[#526484]" />
            <span className="font-['DM_Sans:Bold',_sans-serif] font-bold text-[15px] text-[#526484] leading-[20px] tracking-[0.15px]">
              KPA Collections
            </span>
          </div>

          {/* Notifications */}
          <div 
            onClick={onViewNotifications}
            className="h-[44px] rounded-[6px] flex items-center px-[12px] gap-[12px] hover:bg-[#ebeef2] cursor-pointer"
          >
            <Bell className="h-[20px] w-[20px] text-[#526484]" />
            <span className="font-['DM_Sans:Bold',_sans-serif] font-bold text-[15px] text-[#526484] leading-[20px] tracking-[0.15px]">
              Notifications
            </span>
          </div>

          {/* Reports */}
          <div className="h-[44px] rounded-[6px] flex items-center px-[12px] gap-[12px] hover:bg-[#ebeef2] cursor-pointer">
            <FileText className="h-[20px] w-[20px] text-[#526484]" />
            <span className="font-['DM_Sans:Bold',_sans-serif] font-bold text-[15px] text-[#526484] leading-[20px] tracking-[0.15px]">
              Daily Reports
            </span>
          </div>
        </div>
      </div>

      {/* Security & Audit Trail Indicator */}
      <div className="px-[16px] py-[12px] border-t border-[#d0d5dd] bg-[#f9fafb]">
        <div className="flex items-center gap-[8px] mb-2">
          <Lock className="h-[16px] w-[16px] text-[#21a366]" />
          <span className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#21a366] leading-[16px]">
            SSL/TLS Secured
          </span>
        </div>
        <div className="flex items-center gap-[8px]">
          <Shield className="h-[16px] w-[16px] text-[#003883]" />
          <span className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#003883] leading-[16px]">
            Audit Trail Active
          </span>
        </div>
      </div>
    </div>
  );
}

// Header Content
function HeaderContent({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="flex items-center justify-end h-full px-4">
      <Button
        onClick={onLogout}
        className="bg-[#003883] hover:bg-[#002664] text-white h-[36px] px-[16px]"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </Button>
    </div>
  );
}

// Main Content
function MainContent({ onKPACollections, onViewNotifications }: { onKPACollections: () => void; onViewNotifications: () => void }) {
  return (
    <div className="w-full h-full bg-white overflow-y-auto">
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        {/* Breadcrumbs */}
        <div className="flex gap-[12px] items-center mb-4 lg:mb-6">
          <div className="flex items-center gap-[12px]">
            <Home className="h-[20px] w-[20px] text-[#667085]" />
            <ChevronRight className="h-[16px] w-[16px] text-[#d0d5dd]" />
            <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[14px] text-[#003883] leading-[20px]">
              Staff Dashboard
            </div>
          </div>
        </div>

        {/* Page Title */}
        <div className="flex flex-col gap-[4px] mb-6 lg:mb-8">
          <h1 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[24px] lg:text-[30px] text-[#101828] leading-[32px] lg:leading-[38px]">
            Teller Operations Dashboard
          </h1>
          <p className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] lg:text-[16px] text-[#475467] leading-[20px] lg:leading-[24px]">
            Manage KPA collections and view transaction summaries
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[18px] text-[#101828] leading-[28px] mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* KPA Collections Card */}
            <div 
              onClick={onKPACollections}
              className="bg-white border border-[#eaecf0] rounded-[12px] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#003883] rounded-lg">
                  <Building className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[16px] text-[#101828] leading-[24px] mb-1">
                    KPA Collections
                  </h3>
                  <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#667085] leading-[20px]">
                    Process KPA payments at teller
                  </p>
                </div>
              </div>
            </div>

            {/* Notifications Card */}
            <div 
              onClick={onViewNotifications}
              className="bg-white border border-[#eaecf0] rounded-[12px] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#ff8200] rounded-lg">
                  <Bell className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[16px] text-[#101828] leading-[24px] mb-1">
                    Notifications
                  </h3>
                  <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#667085] leading-[20px]">
                    View SMS & Email templates
                  </p>
                </div>
              </div>
            </div>

            {/* Reports Card */}
            <div className="bg-white border border-[#eaecf0] rounded-[12px] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#526484] rounded-lg">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[16px] text-[#101828] leading-[24px] mb-1">
                    Daily Reports
                  </h3>
                  <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#667085] leading-[20px]">
                    Transaction summaries
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Summary */}
        <div className="mb-8">
          <h2 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[18px] text-[#101828] leading-[28px] mb-4">
            Today's Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-[#eaecf0] rounded-[12px] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#667085] leading-[20px]">
                  Today's Transactions
                </h3>
                <BarChart3 className="h-4 w-4 text-[#667085]" />
              </div>
              <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[24px] text-[#101828] leading-[32px]">
                127
              </div>
              <p className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#21a366] leading-[16px]">
                +12% from yesterday
              </p>
            </div>

            <div className="bg-white border border-[#eaecf0] rounded-[12px] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#667085] leading-[20px]">
                  Total Amount
                </h3>
                <Building className="h-4 w-4 text-[#667085]" />
              </div>
              <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[24px] text-[#101828] leading-[32px]">
                $45,230
              </div>
              <p className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#21a366] leading-[16px]">
                +8% from yesterday
              </p>
            </div>

            <div className="bg-white border border-[#eaecf0] rounded-[12px] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#667085] leading-[20px]">
                  Commission Earned
                </h3>
                <BarChart3 className="h-4 w-4 text-[#667085]" />
              </div>
              <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[24px] text-[#101828] leading-[32px]">
                $904.60
              </div>
              <p className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#21a366] leading-[16px]">
                2% of total
              </p>
            </div>

            <div className="bg-white border border-[#eaecf0] rounded-[12px] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#667085] leading-[20px]">
                  Pending Items
                </h3>
                <Clock className="h-4 w-4 text-[#667085]" />
              </div>
              <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[24px] text-[#101828] leading-[32px]">
                3
              </div>
              <p className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#ff8200] leading-[16px]">
                Requires attention
              </p>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mb-8">
          <h2 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[18px] text-[#101828] leading-[28px] mb-4">
            Recent Transactions
          </h2>
          <div className="bg-white border border-[#eaecf0] rounded-[12px] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#f3f3f5] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#21a366] rounded-full"></div>
                  <div>
                    <p className="font-['Inter:Medium',_sans-serif] font-medium text-[#101828] leading-[20px]">KPA67890</p>
                    <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#667085] leading-[20px]">John Smith - $2,500.00</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-[#21a366] text-white">Success</Badge>
                  <p className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#667085] leading-[16px] mt-1">2 mins ago</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#f3f3f5] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#21a366] rounded-full"></div>
                  <div>
                    <p className="font-['Inter:Medium',_sans-serif] font-medium text-[#101828] leading-[20px]">KPA67891</p>
                    <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#667085] leading-[20px]">Mary Johnson - $1,850.00</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-[#21a366] text-white">Success</Badge>
                  <p className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#667085] leading-[16px] mt-1">5 mins ago</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#f3f3f5] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#ffbd18] rounded-full"></div>
                  <div>
                    <p className="font-['Inter:Medium',_sans-serif] font-medium text-[#101828] leading-[20px]">KPA67892</p>
                    <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#667085] leading-[20px]">Robert Davis - $3,200.00</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-[#ffbd18] text-white">Pending</Badge>
                  <p className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#667085] leading-[16px] mt-1">8 mins ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Session Information */}
        <div className="bg-[#ebeef2] border border-[#003883] rounded-[12px] p-4">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-[#003883]" />
            <div>
              <h4 className="font-['Inter:Medium',_sans-serif] font-medium text-[#003883] leading-[20px]">
                Audit Trail Active
              </h4>
              <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#526484] leading-[20px]">
                All teller activities are logged and monitored. Session ID: TLR-2024-0129-001
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StaffDashboard({ onKPACollections, onViewNotifications, onLogout }: StaffDashboardProps) {
  return (
    <ServiceCentralLayout
      sidebarContent={<SidebarContent onKPACollections={onKPACollections} onViewNotifications={onViewNotifications} />}
      headerContent={<HeaderContent onLogout={onLogout} />}
    >
      <MainContent onKPACollections={onKPACollections} onViewNotifications={onViewNotifications} />
    </ServiceCentralLayout>
  );
}