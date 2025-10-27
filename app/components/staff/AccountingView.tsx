import { ServiceCentralLayout } from '../ServiceCentralLayout';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ArrowLeft, Calculator, Building, Banknote, Receipt, Home, ChevronRight, CreditCard, Bell, FileText, Lock, Shield, Users } from 'lucide-react';
import type { PaymentData } from '../../App';
import accessLogo from 'figma:asset/3ebf5c44175bf36c1eceb7236d272904dfc164a1.png';

interface AccountingViewProps {
  paymentData: PaymentData | null;
  onBack: () => void;
}

// Sidebar Navigation
function SidebarContent({ onBack }: { onBack: () => void }) {
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
          {/* Dashboard */}
          <div 
            onClick={onBack}
            className="h-[44px] rounded-[6px] flex items-center px-[12px] gap-[12px] hover:bg-[#ebeef2] cursor-pointer"
          >
            <Building className="h-[20px] w-[20px] text-[#526484]" />
            <span className="font-['DM_Sans:Bold',_sans-serif] font-bold text-[15px] text-[#526484] leading-[20px] tracking-[0.15px]">
              Dashboard
            </span>
          </div>

          {/* KPA Collections */}
          <div className="h-[44px] rounded-[6px] flex items-center px-[12px] gap-[12px] hover:bg-[#ebeef2] cursor-pointer">
            <CreditCard className="h-[20px] w-[20px] text-[#526484]" />
            <span className="font-['DM_Sans:Bold',_sans-serif] font-bold text-[15px] text-[#526484] leading-[20px] tracking-[0.15px]">
              KPA Collections
            </span>
          </div>

          {/* Accounting - Active */}
          <div className="bg-[#ebeef2] h-[44px] rounded-[6px] flex items-center px-[12px] gap-[12px]">
            <Calculator className="h-[20px] w-[20px] text-[#003883]" />
            <span className="font-['DM_Sans:Bold',_sans-serif] font-bold text-[15px] text-[#003883] leading-[20px] tracking-[0.15px]">
              Accounting
            </span>
          </div>

          {/* Notifications */}
          <div className="h-[44px] rounded-[6px] flex items-center px-[12px] gap-[12px] hover:bg-[#ebeef2] cursor-pointer">
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
function HeaderContent() {
  return <div className="h-full" />;
}

// Main Content
function MainContent({ paymentData, onBack }: AccountingViewProps) {
  if (!paymentData) return null;

  const principalAmount = parseFloat(paymentData.amount);
  const commissionAmount = parseFloat(paymentData.commission);
  const exciseDutyAmount = parseFloat(paymentData.exciseDuty);
  const totalAmount = principalAmount + commissionAmount + exciseDutyAmount;

  // Mock account numbers for demonstration
  const accounts = {
    customerAccount: '1234567890',
    subsidiaryCollectionAccount: '9876543210',
    commissionGL: '5555666677',
    exciseDutyGL: '8888999900',
    nbkVostroAccount: '1111222233',
    kpaCollectionAccount: '4444555566'
  };

  return (
    <div className="w-full h-full bg-white overflow-y-auto">
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        {/* Breadcrumbs */}
        <div className="flex gap-[12px] items-center mb-4 lg:mb-6">
          <div className="flex items-center gap-[12px]">
            <Home className="h-[20px] w-[20px] text-[#667085]" />
            <ChevronRight className="h-[16px] w-[16px] text-[#d0d5dd]" />
            <div 
              onClick={onBack}
              className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#667085] leading-[20px] cursor-pointer hover:text-[#003883]"
            >
              Staff Dashboard
            </div>
            <ChevronRight className="h-[16px] w-[16px] text-[#d0d5dd]" />
            <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[14px] text-[#003883] leading-[20px]">
              Accounting Breakdown
            </div>
          </div>
        </div>

        {/* Page Title */}
        <div className="flex flex-col gap-[4px] mb-6 lg:mb-8">
          <h1 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[24px] lg:text-[30px] text-[#101828] leading-[32px] lg:leading-[38px]">
            Internal Accounting Breakdown
          </h1>
          <p className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] lg:text-[16px] text-[#475467] leading-[20px] lg:leading-[24px]">
            Detailed debit and credit entries for transaction {paymentData.transactionId}
          </p>
        </div>

        {/* Transaction Summary */}
        <div className="bg-white border border-[#eaecf0] rounded-[12px] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Receipt className="h-6 w-6 text-[#003883]" />
            <h2 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[18px] text-[#101828] leading-[28px]">
              Transaction Summary
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#f3f3f5] rounded-lg p-4">
              <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#667085] leading-[20px] mb-1">E-slip Number</p>
              <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[#101828] leading-[20px]">{paymentData.eslipNumber}</p>
            </div>
            <div className="bg-[#f3f3f5] rounded-lg p-4">
              <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#667085] leading-[20px] mb-1">Customer</p>
              <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[#101828] leading-[20px]">{paymentData.customerName}</p>
            </div>
            <div className="bg-[#f3f3f5] rounded-lg p-4">
              <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#667085] leading-[20px] mb-1">Transaction Date</p>
              <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[#101828] leading-[20px]">{paymentData.dateTime}</p>
            </div>
          </div>
        </div>

        {/* Accounting Entries */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Debit Entries */}
          <div className="bg-white border border-[#eaecf0] rounded-[12px] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#ee3148] rounded-lg">
                <Calculator className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[18px] text-[#101828] leading-[28px]">
                Debit Entries
              </h3>
            </div>

            <div className="space-y-4">
              {/* Customer Debit */}
              <div className="bg-[#fee2e2] border border-[#fecaca] rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Building className="h-5 w-5 text-[#ee3148]" />
                  <h4 className="font-['Inter:Medium',_sans-serif] font-medium text-[#101828] leading-[20px]">
                    Dr Customer Account
                  </h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#667085] leading-[20px]">Account Number:</span>
                    <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#344054] leading-[20px] font-mono">{accounts.customerAccount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#667085] leading-[20px]">Principal Amount:</span>
                    <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#344054] leading-[20px]">${principalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#667085] leading-[20px]">Commission:</span>
                    <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#344054] leading-[20px]">${commissionAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#667085] leading-[20px]">Excise Duty:</span>
                    <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#344054] leading-[20px]">${exciseDutyAmount.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-[#fecaca] pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[16px] text-[#ee3148] leading-[24px]">Total Debit:</span>
                      <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[16px] text-[#ee3148] leading-[24px]">${totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* NBK Vostro Debit */}
              <div className="bg-[#fee2e2] border border-[#fecaca] rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Banknote className="h-5 w-5 text-[#ee3148]" />
                  <h4 className="font-['Inter:Medium',_sans-serif] font-medium text-[#101828] leading-[20px]">
                    Dr NBK Vostro Account
                  </h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#667085] leading-[20px]">Account Number:</span>
                    <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#344054] leading-[20px] font-mono">{accounts.nbkVostroAccount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#667085] leading-[20px]">Currency:</span>
                    <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#344054] leading-[20px]">USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[16px] text-[#ee3148] leading-[24px]">Principal USD:</span>
                    <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[16px] text-[#ee3148] leading-[24px]">${principalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Credit Entries */}
          <div className="bg-white border border-[#eaecf0] rounded-[12px] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#21a366] rounded-lg">
                <Calculator className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[18px] text-[#101828] leading-[28px]">
                Credit Entries
              </h3>
            </div>

            <div className="space-y-4">
              {/* Subsidiary Collection Account Credit */}
              <div className="bg-[#dcfce7] border border-[#bbf7d0] rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Building className="h-5 w-5 text-[#21a366]" />
                  <h4 className="font-['Inter:Medium',_sans-serif] font-medium text-[#101828] leading-[20px]">
                    Cr Subsidiary Collection Account
                  </h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#667085] leading-[20px]">Account Number:</span>
                    <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#344054] leading-[20px] font-mono">{accounts.subsidiaryCollectionAccount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#667085] leading-[20px]">Currency:</span>
                    <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#344054] leading-[20px]">USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[16px] text-[#21a366] leading-[24px]">Principal USD:</span>
                    <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[16px] text-[#21a366] leading-[24px]">${principalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Commission GL Credit */}
              <div className="bg-[#dcfce7] border border-[#bbf7d0] rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Banknote className="h-5 w-5 text-[#21a366]" />
                  <h4 className="font-['Inter:Medium',_sans-serif] font-medium text-[#101828] leading-[20px]">
                    Cr Commission GL
                  </h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#667085] leading-[20px]">GL Account:</span>
                    <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#344054] leading-[20px] font-mono">{accounts.commissionGL}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[16px] text-[#21a366] leading-[24px]">Commission:</span>
                    <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[16px] text-[#21a366] leading-[24px]">${commissionAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Excise Duty GL Credit */}
              <div className="bg-[#dcfce7] border border-[#bbf7d0] rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Receipt className="h-5 w-5 text-[#21a366]" />
                  <h4 className="font-['Inter:Medium',_sans-serif] font-medium text-[#101828] leading-[20px]">
                    Cr Excise Duty GL
                  </h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#667085] leading-[20px]">GL Account:</span>
                    <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#344054] leading-[20px] font-mono">{accounts.exciseDutyGL}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[16px] text-[#21a366] leading-[24px]">Excise Duty:</span>
                    <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[16px] text-[#21a366] leading-[24px]">${exciseDutyAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* KPA Collection Account Credit */}
              <div className="bg-[#dcfce7] border border-[#bbf7d0] rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Building className="h-5 w-5 text-[#21a366]" />
                  <h4 className="font-['Inter:Medium',_sans-serif] font-medium text-[#101828] leading-[20px]">
                    Cr KPA Collection Account
                  </h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#667085] leading-[20px]">Account Number:</span>
                    <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#344054] leading-[20px] font-mono">{accounts.kpaCollectionAccount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#667085] leading-[20px]">Currency:</span>
                    <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#344054] leading-[20px]">USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[16px] text-[#21a366] leading-[24px]">Principal USD:</span>
                    <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[16px] text-[#21a366] leading-[24px]">${principalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Balance Verification */}
        <div className="bg-[#ebeef2] border border-[#003883] rounded-[12px] p-6">
          <div className="flex items-center gap-3 mb-4">
            <Calculator className="h-6 w-6 text-[#003883]" />
            <h3 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[18px] text-[#003883] leading-[28px]">
              Balance Verification
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-['Inter:Medium',_sans-serif] font-medium text-[#003883] leading-[20px] mb-2">
                Total Debits
              </h4>
              <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[20px] text-[#ee3148] leading-[28px]">
                ${(totalAmount + principalAmount).toFixed(2)}
              </p>
              <p className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#526484] leading-[16px]">
                Customer: ${totalAmount.toFixed(2)} + NBK Vostro: ${principalAmount.toFixed(2)}
              </p>
            </div>
            <div>
              <h4 className="font-['Inter:Medium',_sans-serif] font-medium text-[#003883] leading-[20px] mb-2">
                Total Credits
              </h4>
              <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[20px] text-[#21a366] leading-[28px]">
                ${(totalAmount + principalAmount).toFixed(2)}
              </p>
              <p className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#526484] leading-[16px]">
                Collection: ${principalAmount.toFixed(2)} + Commission: ${commissionAmount.toFixed(2)} + Duty: ${exciseDutyAmount.toFixed(2)} + KPA: ${principalAmount.toFixed(2)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-4 p-3 bg-white rounded-lg">
            <div className="w-2 h-2 bg-[#21a366] rounded-full"></div>
            <span className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#21a366] leading-[20px]">
              ✓ Books are balanced - All entries recorded successfully
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AccountingView({ paymentData, onBack }: AccountingViewProps) {
  return (
    <ServiceCentralLayout
      sidebarContent={<SidebarContent onBack={onBack} />}
      headerContent={<HeaderContent />}
    >
      <MainContent paymentData={paymentData} onBack={onBack} />
    </ServiceCentralLayout>
  );
}