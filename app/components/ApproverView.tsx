import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { CheckCircle, XCircle, FileText, AlertTriangle, Lock, Shield, Users } from 'lucide-react';
import { BreadcrumbNavigation } from './shared/BreadcrumbNavigation';
import { ServiceCentralLayout } from './ServiceCentralLayout';
import { LOIRequest, BreadcrumbItem } from '../App';
import accessLogo from 'figma:asset/3ebf5c44175bf36c1eceb7236d272904dfc164a1.png';

// Helper function to get display names for authorized signatories
const getSignatoryDisplayName = (signatory: string) => {
  const signatoryMap: { [key: string]: string } = {
    'jane-smith': 'Jane Smith - Secretary',
    'david-wilson': 'David Wilson - Treasurer',
    'sarah-davis': 'Sarah Davis - Legal Officer',
    'mary-johnson': 'Mary Johnson - Secretary',
    'john-adams': 'John Adams - Chairman',
    'susan-clark': 'Susan Clark - Director'
  };
  return signatoryMap[signatory] || signatory?.replace('-', ' ') || 'Not selected';
};

interface ApproverViewProps {
  request: LOIRequest | null;
  onSubmit: (data: Partial<LOIRequest>) => void;
  onBack: () => void;
  breadcrumbs: BreadcrumbItem[];
  onBreadcrumbClick: (screen: any) => void;
}

// Sidebar Navigation - Same structure as other roles
function SidebarContent({ userRole, onLogout }: { 
  userRole: string; 
  onLogout: () => void;
}) {
  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'cco': return 'Initiator/CCO';
      case 'credit-ops': return 'Credit Operations';
      case 'settlement': return 'Settlement & Reconciliation';
      case 'approver': return 'Approver';
      default: return 'Staff';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'cco': return 'bg-[#003883] text-white';
      case 'credit-ops': return 'bg-[#21a366] text-white';
      case 'settlement': return 'bg-[#ff8200] text-white';
      case 'approver': return 'bg-[#ee3148] text-white';
      default: return 'bg-[#667085] text-white';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="h-[65px] border-b border-[#d0d5dd] flex items-center px-[16px]">
        <div className="flex items-center gap-[10px]">
          <img src={accessLogo} alt="Access Bank" className="h-8" />
          <div className="flex flex-col">
            <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[14px] text-[#101828] leading-[20px]">
              Service Central
            </span>
            <span className="font-['Inter:Regular',_sans-serif] font-normal text-[12px] text-[#667085] leading-[16px]">
              LOI Management System
            </span>
          </div>
        </div>
      </div>

      {/* User Role Section */}
      <div className="px-[16px] py-[16px] border-b border-[#d0d5dd]">
        <div className="flex items-center gap-[12px]">
          <div className="w-[40px] h-[40px] bg-[#f9fafb] rounded-[20px] flex items-center justify-center">
            <Users className="h-[20px] w-[20px] text-[#667085]" />
          </div>
          <div className="flex-1">
            <div className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#101828] leading-[20px]">
              {getRoleDisplayName(userRole)}
            </div>
            <div className={`inline-flex items-center px-[6px] py-[2px] rounded-[1000px] font-['Inter:Medium',_sans-serif] font-medium text-[12px] leading-[16px] ${getRoleBadgeColor(userRole)}`}>
              {userRole === 'approver' ? 'Final Approval' : 'Active'}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-auto p-[16px]">
        <div className="space-y-2">
          <div className="px-4 py-2 bg-[#003883] text-white rounded-lg">
            <div className="text-[14px]">Letter of Indebtedness</div>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-[16px] border-t border-[#d0d5dd]">
        <Button 
          variant="outline" 
          onClick={onLogout}
          className="w-full border-[#003883] text-[#003883] hover:bg-[#003883] hover:text-white"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

// Header Content
function HeaderContent() {
  return (
    <div className="h-full flex items-center justify-between px-[24px]">
      {/* Empty for now */}
    </div>
  );
}

// Main Content
function MainContent({
  request,
  onSubmit,
  onBack,
  breadcrumbs,
  onBreadcrumbClick
}: ApproverViewProps) {
  const [decision, setDecision] = useState<'approve' | 'reject' | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const calculateTotalBalance = () => {
    const loanTotal = request?.loanBalances?.reduce((sum, loan) => 
      sum + (parseFloat(loan.amount) || 0), 0) || 0;
    const creditCardTotal = parseFloat(request?.creditCardBalance || '0');
    return loanTotal + creditCardTotal;
  };

  const handleApprove = () => {
    setDecision('approve');
  };

  const handleReject = () => {
    setDecision('reject');
  };

  const handleSubmitDecision = () => {
    const formData: Partial<LOIRequest> = {
      currentStep: 6,
      status: decision === 'approve' ? 'approved' : 'rejected',
      ...(decision === 'reject' && { rejectionReason })
    };
    
    onSubmit(formData);
  };

  const totalBalance = calculateTotalBalance();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Breadcrumb */}
      <BreadcrumbNavigation
        breadcrumbs={breadcrumbs}
        onBreadcrumbClick={onBreadcrumbClick}
      />

      {/* Original Request Details (Read-Only) */}
      <Card className="mb-6" id="request-details">
        <CardHeader className="bg-[#f8fafc] border-b border-[#e2e8f0]">
          <CardTitle className="font-['Inter:Medium',_sans-serif] text-[16px] text-[#1e293b]">
            Original Request Details (Submitted by CCO)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Customer Information */}
          <div className="bg-[#fafbfc] border border-[#e2e8f0] rounded-lg p-4">
            <h4 className="font-['Inter:Medium',_sans-serif] text-[14px] text-[#374151] mb-4">Customer Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#64748b] uppercase tracking-wide mb-1 block">Account Number</label>
                <div className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#1e293b] bg-white border border-[#d1d5db] rounded px-3 py-2">
                  {request?.customerInfo.accountNumber}
                </div>
              </div>
              <div>
                <label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#64748b] uppercase tracking-wide mb-1 block">Customer Name</label>
                <div className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#1e293b] bg-white border border-[#d1d5db] rounded px-3 py-2">
                  {request?.customerInfo.customerName}
                </div>
              </div>
              <div>
                <label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#64748b] uppercase tracking-wide mb-1 block">BVN</label>
                <div className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#1e293b] bg-white border border-[#d1d5db] rounded px-3 py-2">
                  {request?.customerInfo.bvn}
                </div>
              </div>
            </div>
          </div>

          {/* Request Details */}
          <div className="bg-[#fafbfc] border border-[#e2e8f0] rounded-lg p-4">
            <h4 className="font-['Inter:Medium',_sans-serif] text-[14px] text-[#374151] mb-4">Request Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#64748b] uppercase tracking-wide mb-1 block">Case ID</label>
                <div className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#1e293b] bg-white border border-[#d1d5db] rounded px-3 py-2">
                  {request?.caseId}
                </div>
              </div>
              <div>
                <label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#64748b] uppercase tracking-wide mb-1 block">Recipient Name</label>
                <div className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#1e293b] bg-white border border-[#d1d5db] rounded px-3 py-2">
                  {request?.requestDetails?.recipientName || 'Not provided'}
                </div>
              </div>
              <div>
                <label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#64748b] uppercase tracking-wide mb-1 block">Purpose of Letter</label>
                <div className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#1e293b] bg-white border border-[#d1d5db] rounded px-3 py-2">
                  {request?.requestDetails?.purposeOfLetter || 'Not provided'}
                </div>
              </div>
              <div>
                <label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#64748b] uppercase tracking-wide mb-1 block">Authorized Signatory 1</label>
                <div className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#1e293b] bg-white border border-[#d1d5db] rounded px-3 py-2">
                  {getSignatoryDisplayName(request?.requestDetails?.authorizedSignatory1 || '')}
                </div>
              </div>
              <div>
                <label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#64748b] uppercase tracking-wide mb-1 block">Authorized Signatory 2</label>
                <div className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#1e293b] bg-white border border-[#d1d5db] rounded px-3 py-2">
                  {getSignatoryDisplayName(request?.requestDetails?.authorizedSignatory2 || '')}
                </div>
              </div>
              <div>
                <label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#64748b] uppercase tracking-wide mb-1 block">Delivery Option</label>
                <div className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#1e293b] bg-white border border-[#d1d5db] rounded px-3 py-2 capitalize">
                  {request?.deliveryOption?.replace('-', ' ')}
                </div>
              </div>
              {request?.thirdPartyEmail && (
                <div>
                  <label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#64748b] uppercase tracking-wide mb-1 block">Third Party Email</label>
                  <div className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#1e293b] bg-white border border-[#d1d5db] rounded px-3 py-2">
                    {request.thirdPartyEmail}
                  </div>
                </div>
              )}
              <div>
                <label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#64748b] uppercase tracking-wide mb-1 block">Recipient Address</label>
                <div className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#1e293b] bg-white border border-[#d1d5db] rounded px-3 py-2">
                  {request?.requestDetails?.recipientAddress || 'Not provided'}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Balance Breakdown */}
      <Card className="mb-6">
        <CardHeader className="bg-[#f8fafc] border-b border-[#e2e8f0]">
          <CardTitle className="font-['Inter:Medium',_sans-serif] text-[16px] text-[#1e293b]">
            Loan Balances - Verified & Approved for LOI
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {request?.loanBalances?.map((loan, index) => (
              <div key={loan.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border border-[#e2e8f0] rounded-lg bg-[#fafbfc]">
                <div>
                  <label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#374151] mb-2 block">Loan Type</label>
                  <div className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#1e293b] bg-white border border-[#d1d5db] rounded px-3 py-2">
                    {loan.loanType}
                  </div>
                </div>
                
                <div>
                  <label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#374151] mb-2 block">Amount (₦)</label>
                  <div className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#1e293b] bg-white border border-[#d1d5db] rounded px-3 py-2">
                    {parseFloat(loan.amount).toLocaleString()}
                  </div>
                </div>
                
                <div>
                  <label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#374151] mb-2 block">Branch</label>
                  <div className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#1e293b] bg-white border border-[#d1d5db] rounded px-3 py-2">
                    {loan.branch}
                  </div>
                </div>
                
                <div>
                  <label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#374151] mb-2 block">Remarks</label>
                  <div className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#1e293b] bg-white border border-[#d1d5db] rounded px-3 py-2 min-h-[40px] flex items-center">
                    {loan.remarks || 'No remarks'}
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="flex items-center gap-2 text-[#21a366]">
                    <CheckCircle className="h-4 w-4" />
                    <span className="font-['Inter:Medium',_sans-serif] text-[12px]">Verified</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Credit Card Balance if applicable */}
          {request?.hasCreditCard && request?.creditCardBalance && (
            <div className="mt-4">
              <h4 className="font-['Inter:Medium',_sans-serif] text-[14px] text-[#374151] mb-3">Credit Card Balance</h4>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border border-[#e2e8f0] rounded-lg bg-[#fafbfc]">
                <div>
                  <label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#374151] mb-2 block">Facility Type</label>
                  <div className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#1e293b] bg-white border border-[#d1d5db] rounded px-3 py-2">
                    Credit Card
                  </div>
                </div>
                
                <div>
                  <label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#374151] mb-2 block">Amount (₦)</label>
                  <div className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#1e293b] bg-white border border-[#d1d5db] rounded px-3 py-2">
                    {parseFloat(request.creditCardBalance).toLocaleString()}
                  </div>
                </div>
                
                <div>
                  <label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#374151] mb-2 block">Branch</label>
                  <div className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#1e293b] bg-white border border-[#d1d5db] rounded px-3 py-2">
                    Card Services
                  </div>
                </div>
                
                <div>
                  <label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#374151] mb-2 block">Remarks</label>
                  <div className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#1e293b] bg-white border border-[#d1d5db] rounded px-3 py-2 min-h-[40px] flex items-center">
                    Verified by Settlement Team
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="flex items-center gap-2 text-[#21a366]">
                    <CheckCircle className="h-4 w-4" />
                    <span className="font-['Inter:Medium',_sans-serif] text-[12px]">Verified</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Total Balance */}
          <div className="mt-6 p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-['Inter:Medium',_sans-serif] text-[16px] text-[#374151]">Total Outstanding Balance:</span>
              <span className="font-['Inter:Bold',_sans-serif] text-[20px] text-[#003883]">₦{totalBalance.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final Approval Decision Section with Letter Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Letter Preview (Always Visible) */}
        <div>
          <Card>
            <CardHeader className="bg-[#f8fafc] border-b border-[#e2e8f0]">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#003883]" />
                <span className="font-['Inter:Medium',_sans-serif] text-[16px] text-[#1e293b]">Letter of Indebtedness Preview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 min-h-[400px] bg-white">
                <div className="text-sm space-y-4 font-mono">
                  <div className="text-right text-xs text-gray-600">
                    ABP/ROG/{new Date().getMonth().toString().padStart(2, '0')}{new Date().getFullYear()}/AF/DC/{Math.floor(Math.random() * 1000)}<br />
                    {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="font-semibold">{request?.requestDetails?.recipientName?.toUpperCase() || 'RECIPIENT NAME'}</div>
                    <div className="text-xs">
                      {request?.requestDetails?.recipientAddress || 'Recipient Address'}<br />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>Dear Sir/Madam,</div>
                    <div className="font-semibold underline">
                      LETTER OF INDEBTEDNESS - {request?.customerInfo.customerName?.toUpperCase()} - {request?.customerInfo.accountNumber}
                    </div>
                    <div className="text-xs">
                      We hereby confirm that <span className="font-semibold">{request?.customerInfo.customerName?.toUpperCase()}</span>, 
                      with account number {request?.customerInfo.accountNumber} is indebted to our Bank as at {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} as shown below;
                    </div>
                  </div>

                  <table className="w-full text-xs border border-gray-300">
                    <thead>
                      <tr className="border-b border-gray-300">
                        <th className="border-r border-gray-300 p-1 text-left">S/N</th>
                        <th className="border-r border-gray-300 p-1 text-left">Facility Type</th>
                        <th className="border-r border-gray-300 p-1 text-left">Currency</th>
                        <th className="border-r border-gray-300 p-1 text-left">Amount</th>
                        <th className="p-1 text-left">Outstanding Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {request?.loanBalances?.map((loan, index) => (
                        <tr key={loan.id}>
                          <td className="border-r border-gray-300 p-1">{index + 1}</td>
                          <td className="border-r border-gray-300 p-1">{loan.loanType.toUpperCase()}</td>
                          <td className="border-r border-gray-300 p-1">NGN</td>
                          <td className="border-r border-gray-300 p-1">{parseFloat(loan.amount).toLocaleString()}</td>
                          <td className="p-1">{parseFloat(loan.amount).toLocaleString()}</td>
                        </tr>
                      ))}
                      {request?.hasCreditCard && (
                        <tr>
                          <td className="border-r border-gray-300 p-1">{(request?.loanBalances?.length || 0) + 1}</td>
                          <td className="border-r border-gray-300 p-1">CREDIT CARD</td>
                          <td className="border-r border-gray-300 p-1">NGN</td>
                          <td className="border-r border-gray-300 p-1">{parseFloat(request?.creditCardBalance || '0').toLocaleString()}</td>
                          <td className="p-1">{parseFloat(request?.creditCardBalance || '0').toLocaleString()}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  <div className="text-xs space-y-2">
                    <div>Please note that interest will continue to accrue on the above amount(s) on a daily basis until the facility is fully liquidated.</div>
                    <div>This report is given in strict confidence and without liability on the part of Access Bank Plc or any of its staff or agent.</div>
                    <div>Thank you.</div>
                    <div>Yours faithfully,</div>
                    <div>For: ACCESS BANK PLC</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Approval Decision */}
        <div>
          <Card className="mb-6" id="approval-section">
            <CardHeader className="bg-[#f8fafc] border-b border-[#e2e8f0]">
              <CardTitle className="font-['Inter:Medium',_sans-serif] text-[16px] text-[#1e293b]">
                Final Approval Decision
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {!decision ? (
                <div className="space-y-6">
                  <div className="p-4 bg-[#eff6ff] border border-[#bfdbfe] rounded-lg">
                    <p className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#1e40af] leading-[16px]">
                      ℹ️ Please review all request details and the letter preview before making your final approval decision.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <Button 
                      onClick={handleApprove}
                      size="lg"
                      className="bg-[#003883] hover:bg-[#002a62] text-white h-12"
                    >
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Approve Request
                    </Button>
                    
                    <Button 
                      onClick={handleReject}
                      variant="outline"
                      size="lg"
                      className="border-[#ef4444] text-[#ef4444] hover:bg-[#ef4444] hover:text-white h-12"
                    >
                      <XCircle className="mr-2 h-5 w-5" />
                      Reject Request
                    </Button>
                  </div>
                </div>
              ) : (
                /* Decision Confirmation */
                <div className="space-y-6">
                  {decision === 'approve' ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-[#ecfdf3] border border-[#abefc6] rounded-lg">
                        <h3 className="font-['Inter:Medium',_sans-serif] text-[14px] text-[#21a366] mb-2">Request Approval</h3>
                        <p className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#374151] leading-[16px]">
                          You are about to approve this Letter of Indebtedness request. 
                          Upon approval, the system will:
                        </p>
                        <ul className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#374151] mt-2 ml-4 list-disc space-y-1 leading-[16px]">
                          <li>Automatically deduct applicable charges from customer account</li>
                          <li>Generate the final letter with digital signatures</li>
                          <li>Deliver the letter via the selected method ({request?.deliveryOption?.replace('-', ' ')})</li>
                          <li>Send notifications to relevant parties</li>
                          <li>Update the request status to "Completed"</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 bg-[#fef3f2] border border-[#fecdca] rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-5 w-5 text-[#ef4444]" />
                          <h3 className="font-['Inter:Medium',_sans-serif] text-[14px] text-[#ef4444]">Request Rejection</h3>
                        </div>
                        <p className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#374151] leading-[16px]">
                          Please provide a reason for rejecting this request. The initiator will be notified.
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="rejection-reason" className="font-['Inter:Medium',_sans-serif] text-[14px] text-[#374151] mb-2 block">
                          Rejection Reason *
                        </Label>
                        <Textarea
                          id="rejection-reason"
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          placeholder="Please provide a detailed reason for rejection..."
                          rows={4}
                          className="border-[#d1d5db] focus:border-[#003883] focus:ring-[#003883]"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setDecision(null)}
                      className="flex-1 border-[#d1d5db] text-[#374151] hover:bg-[#f9fafb]"
                    >
                      Back to Review
                    </Button>
                    <Button 
                      onClick={handleSubmitDecision}
                      disabled={decision === 'reject' && !rejectionReason.trim()}
                      className={
                        decision === 'approve' 
                          ? 'flex-1 bg-[#003883] hover:bg-[#002a62] text-white' 
                          : 'flex-1 bg-[#ef4444] hover:bg-[#dc2626] text-white disabled:bg-[#e5e7eb] disabled:text-[#9ca3af]'
                      }
                    >
                      Confirm {decision === 'approve' ? 'Approval' : 'Rejection'}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function ApproverView(props: ApproverViewProps) {
  return (
    <ServiceCentralLayout
      sidebarContent={<SidebarContent userRole="approver" onLogout={() => {}} />}
      headerContent={<HeaderContent />}
    >
      <MainContent {...props} />
    </ServiceCentralLayout>
  );
}