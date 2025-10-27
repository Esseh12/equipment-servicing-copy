import { Button } from '../ui/button';
import { ServiceCentralLayout } from '../ServiceCentralLayout';
import { CreditCard, History, Smartphone, LogOut, Bell, Shield, User, Search } from 'lucide-react';

interface CustomerDashboardProps {
  onPayKPA: () => void;
  onViewHistory: () => void;
  onUSSD: () => void;
  onLogout: () => void;
}

// Sidebar Navigation
function SidebarContent() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="h-[65px] border-b border-[#d0d5dd] flex items-center px-[16px]">
        <div className="flex items-center gap-[10px]">
          <Shield className="h-[32px] w-[32px] text-[#003883]" />
          <div>
            <h1 className="font-['Inter:Bold',_sans-serif] font-bold text-[18px] text-[#003883] leading-[22px]">
              Service Central
            </h1>
            <p className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#526484] leading-[16px]">
              Customer Portal
            </p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="px-[16px] py-[16px] border-b border-[#d0d5dd]">
        <div className="font-['Inter:Bold',_sans-serif] font-bold text-[18px] text-[#003883] leading-[30px]">
          Customer Portal
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-[12px] py-[8px]">
        <div className="flex flex-col gap-[8px]">
          {/* Pay KPA - Active */}
          <div className="bg-[#ebeef2] h-[44px] rounded-[6px] flex items-center px-[12px] gap-[12px]">
            <CreditCard className="h-[20px] w-[20px] text-[#003883]" />
            <span className="font-['DM_Sans:Bold',_sans-serif] font-bold text-[15px] text-[#003883] leading-[20px] tracking-[0.15px]">
              Pay KPA
            </span>
          </div>

          {/* Transaction History */}
          <div className="h-[44px] rounded-[6px] flex items-center px-[12px] gap-[12px] hover:bg-[#ebeef2] cursor-pointer">
            <History className="h-[20px] w-[20px] text-[#526484]" />
            <span className="font-['DM_Sans:Bold',_sans-serif] font-bold text-[15px] text-[#526484] leading-[20px] tracking-[0.15px]">
              Transaction History
            </span>
          </div>

          {/* USSD Access */}
          <div className="h-[44px] rounded-[6px] flex items-center px-[12px] gap-[12px] hover:bg-[#ebeef2] cursor-pointer">
            <Smartphone className="h-[20px] w-[20px] text-[#526484]" />
            <span className="font-['DM_Sans:Bold',_sans-serif] font-bold text-[15px] text-[#526484] leading-[20px] tracking-[0.15px]">
              USSD Access
            </span>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="px-[16px] py-[16px] border-t border-[#d0d5dd]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[8px]">
            <User className="h-[20px] w-[20px] text-[#526484]" />
            <span className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#344054] leading-[20px]">
              John Doe
            </span>
          </div>
          <Button
            variant="ghost"
            className="h-[32px] px-[8px] text-[#526484] hover:bg-[#ebeef2] hover:text-[#003883]"
          >
            <LogOut className="h-[16px] w-[16px]" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// Header Content
function HeaderContent({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="h-full flex items-center justify-between px-[24px]">
      <div className="flex items-center gap-[16px]">
        <div>
          <h2 className="font-['Inter:Bold',_sans-serif] font-bold text-[24px] text-[#101828] leading-[32px]">
            Dashboard
          </h2>
          <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#526484] leading-[20px]">
            Welcome back, John Doe
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-[16px]">
        <div className="flex items-center gap-[8px] px-[12px] py-[6px] bg-[rgba(0,0,0,0.03)] rounded-[6px]">
          <User className="h-[16px] w-[16px] text-[#526484]" />
          <span className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#344054] leading-[20px]">
            Customer
          </span>
        </div>
        <Button
          onClick={onLogout}
          className="h-[36px] px-[16px] py-[8px] bg-white border border-[#d0d5dd] text-[#344054] hover:bg-[#ebeef2] rounded-[6px] font-['Inter:Medium',_sans-serif] font-medium text-[14px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
        >
          <LogOut className="h-[16px] w-[16px] mr-[8px]" />
          Logout
        </Button>
      </div>
    </div>
  );
}

// Main Content
function MainContent({ onPayKPA, onViewHistory, onUSSD }: CustomerDashboardProps) {
  return (
    <div className="p-[24px]">
      {/* Quick Actions */}
      <div className="mb-[32px]">
        <h3 className="font-['Inter:Bold',_sans-serif] font-bold text-[20px] text-[#101828] leading-[30px] mb-[16px]">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
          {/* Pay KPA Card */}
          <div 
            onClick={onPayKPA}
            className="bg-white border border-[#d0d5dd] rounded-[8px] p-[24px] hover:shadow-[0px_4px_6px_-2px_rgba(16,24,40,0.03),0px_12px_16px_-4px_rgba(16,24,40,0.08)] cursor-pointer transition-shadow shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
          >
            <div className="flex items-center gap-[16px]">
              <div className="p-[12px] bg-[#003883] rounded-[8px]">
                <CreditCard className="h-[24px] w-[24px] text-white" />
              </div>
              <div>
                <h4 className="font-['Inter:Bold',_sans-serif] font-bold text-[16px] text-[#101828] leading-[24px] mb-[4px]">
                  Pay KPA
                </h4>
                <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#526484] leading-[20px]">
                  Make KPA payments using E-slip
                </p>
              </div>
            </div>
          </div>

          {/* Transaction History Card */}
          <div 
            onClick={onViewHistory}
            className="bg-white border border-[#d0d5dd] rounded-[8px] p-[24px] hover:shadow-[0px_4px_6px_-2px_rgba(16,24,40,0.03),0px_12px_16px_-4px_rgba(16,24,40,0.08)] cursor-pointer transition-shadow shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
          >
            <div className="flex items-center gap-[16px]">
              <div className="p-[12px] bg-[#526484] rounded-[8px]">
                <History className="h-[24px] w-[24px] text-white" />
              </div>
              <div>
                <h4 className="font-['Inter:Bold',_sans-serif] font-bold text-[16px] text-[#101828] leading-[24px] mb-[4px]">
                  Transaction History
                </h4>
                <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#526484] leading-[20px]">
                  View past payments and receipts
                </p>
              </div>
            </div>
          </div>

          {/* USSD Access Card */}
          <div 
            onClick={onUSSD}
            className="bg-white border border-[#d0d5dd] rounded-[8px] p-[24px] hover:shadow-[0px_4px_6px_-2px_rgba(16,24,40,0.03),0px_12px_16px_-4px_rgba(16,24,40,0.08)] cursor-pointer transition-shadow shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
          >
            <div className="flex items-center gap-[16px]">
              <div className="p-[12px] bg-[#8094AE] rounded-[8px]">
                <Smartphone className="h-[24px] w-[24px] text-white" />
              </div>
              <div>
                <h4 className="font-['Inter:Bold',_sans-serif] font-bold text-[16px] text-[#101828] leading-[24px] mb-[4px]">
                  USSD Access
                </h4>
                <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#526484] leading-[20px]">
                  Mobile payment via USSD
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] mb-[32px]">
        {/* Account Status */}
        <div className="bg-white border border-[#d0d5dd] rounded-[8px] p-[24px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
          <h4 className="font-['Inter:Bold',_sans-serif] font-bold text-[18px] text-[#101828] leading-[28px] mb-[16px]">
            Account Status
          </h4>
          <div className="flex flex-col gap-[12px]">
            <div className="flex items-center justify-between">
              <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#526484] leading-[20px]">Account Type</span>
              <span className="px-[8px] py-[2px] bg-[#21a366] text-white rounded-[12px] font-['Inter:Medium',_sans-serif] font-medium text-[12px] leading-[16px]">
                Active Customer
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#526484] leading-[20px]">Last Login</span>
              <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#344054] leading-[20px]">Today, 10:30 AM</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#526484] leading-[20px]">Security Status</span>
              <div className="flex items-center gap-[4px]">
                <Shield className="h-[16px] w-[16px] text-[#21a366]" />
                <span className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#21a366] leading-[20px]">Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-[#d0d5dd] rounded-[8px] p-[24px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
          <div className="flex items-center justify-between mb-[16px]">
            <h4 className="font-['Inter:Bold',_sans-serif] font-bold text-[18px] text-[#101828] leading-[28px]">
              Recent Activity
            </h4>
            <Bell className="h-[20px] w-[20px] text-[#526484]" />
          </div>
          <div className="flex flex-col gap-[12px]">
            <div className="flex items-center gap-[12px]">
              <div className="w-[8px] h-[8px] bg-[#21a366] rounded-full"></div>
              <div className="flex-1">
                <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#344054] leading-[20px]">
                  Payment KPA12345 completed
                </p>
                <p className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#526484] leading-[16px]">
                  2 hours ago
                </p>
              </div>
            </div>
            <div className="flex items-center gap-[12px]">
              <div className="w-[8px] h-[8px] bg-[#ff8200] rounded-full"></div>
              <div className="flex-1">
                <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#344054] leading-[20px]">
                  Profile updated successfully
                </p>
                <p className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#526484] leading-[16px]">
                  Yesterday, 3:45 PM
                </p>
              </div>
            </div>
            <div className="flex items-center gap-[12px]">
              <div className="w-[8px] h-[8px] bg-[#526484] rounded-full"></div>
              <div className="flex-1">
                <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#344054] leading-[20px]">
                  New security feature enabled
                </p>
                <p className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#526484] leading-[16px]">
                  3 days ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-[#ebeef2] border border-[#003883] rounded-[8px] p-[16px]">
        <div className="flex items-center gap-[12px]">
          <Shield className="h-[20px] w-[20px] text-[#003883]" />
          <div>
            <h4 className="font-['Inter:Bold',_sans-serif] font-bold text-[16px] text-[#003883] leading-[24px]">
              Security Notice
            </h4>
            <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#526484] leading-[20px]">
              Always verify your transaction details before confirming payments. Never share your login credentials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CustomerDashboard({ onPayKPA, onViewHistory, onUSSD, onLogout }: CustomerDashboardProps) {
  return (
    <ServiceCentralLayout
      sidebarContent={<SidebarContent />}
      headerContent={<HeaderContent onLogout={onLogout} />}
    >
      <MainContent onPayKPA={onPayKPA} onViewHistory={onViewHistory} onUSSD={onUSSD} onLogout={onLogout} />
    </ServiceCentralLayout>
  );
}