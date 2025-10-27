import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { FileText, Eye, Send, X, CreditCard, CheckCircle, XCircle } from 'lucide-react';
import { BreadcrumbNavigation } from './shared/BreadcrumbNavigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
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

interface InitiatorReviewViewProps {
  request: LOIRequest | null;
  onSubmit: (data: Partial<LOIRequest>) => void;
  onBack: () => void;
  breadcrumbs: BreadcrumbItem[];
  onBreadcrumbClick: (screen: any) => void;
}

export function InitiatorReviewView({
  request,
  onSubmit,
  onBack,
  breadcrumbs,
  onBreadcrumbClick
}: InitiatorReviewViewProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const calculateTotalBalance = () => {
    const loanTotal = request?.loanBalances?.reduce((sum, loan) => 
      sum + (parseFloat(loan.amount) || 0), 0) || 0;
    const creditCardTotal = parseFloat(request?.creditCardBalance || '0');
    return loanTotal + creditCardTotal;
  };

  const handlePreviewLetter = () => {
    setShowPreview(true);
  };

  const handleSubmitForApproval = () => {
    const formData: Partial<LOIRequest> = {
      currentStep: 5,
      status: 'pending'
    };
    
    onSubmit(formData);
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) return;
    
    const formData: Partial<LOIRequest> = {
      status: 'rejected',
      rejectionReason: rejectionReason
    };
    
    onSubmit(formData);
    setShowRejectDialog(false);
  };

  const handleRejectClick = () => {
    setShowRejectDialog(true);
    setRejectionReason('');
  };

  const totalBalance = calculateTotalBalance();

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <div className="bg-white border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <img src={accessLogo} alt="Access Bank" className="h-8" />
              <h1 className="font-['Inter:Medium',_sans-serif] text-[18px] text-[#1e293b]">Service Central</h1>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#64748b]">Case ID:</span>
                <span className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#1e293b]">{request?.caseId}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#64748b]">Role:</span>
                <span className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#003883]">CCO - Final Review</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#f1f5f9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <BreadcrumbNavigation
            breadcrumbs={breadcrumbs}
            onBreadcrumbClick={onBreadcrumbClick}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Original Request Details (Read-Only) */}
        <Card className="mb-6">
          <CardHeader className="bg-[#f8fafc] border-b border-[#e2e8f0]">
            <CardTitle className="font-['Inter:Medium',_sans-serif] text-[16px] text-[#1e293b]">
              Customer Information & Request Details
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
                  <label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#64748b] uppercase tracking-wide mb-1 block">Customer Instruction File</label>
                  <div className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#1e293b] bg-white border border-[#d1d5db] rounded px-3 py-2 flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#21a366] rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                        <path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z"/>
                      </svg>
                    </div>
                    <span>{request?.requestDetails?.customerInstructionFile?.name || 'customer_instruction.pdf'}</span>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#64748b] uppercase tracking-wide mb-1 block">Recipient Address</label>
                  <div className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#1e293b] bg-white border border-[#d1d5db] rounded px-3 py-2 min-h-[80px] flex items-start">
                    <div className="whitespace-pre-wrap">
                      {request?.requestDetails?.recipientAddress || 'Address not provided'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Request Metadata */}
            <div className="bg-[#fef3f2] border border-[#fecdca] rounded-lg p-4">
              <h4 className="font-['Inter:Medium',_sans-serif] text-[14px] text-[#374151] mb-3">Request Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#64748b] uppercase tracking-wide mb-1 block">Created By</label>
                  <div className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#1e293b]">
                    {request?.createdBy === 'cco' ? 'CCO/Initiator' : request?.createdBy?.toUpperCase()}
                  </div>
                </div>
                <div>
                  <label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#64748b] uppercase tracking-wide mb-1 block">Created At</label>
                  <div className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#1e293b]">
                    {request?.createdAt ? new Date(request.createdAt).toLocaleString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    }) : 'Not available'}
                  </div>
                </div>
              </div>
            </div>

            {/* Credit Operations Confirmation */}
            <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-lg p-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#21a366] rounded-full flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 8 8">
                    <path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z"/>
                  </svg>
                </div>
                <span className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#1e40af]">Loan balances verified and confirmed by Credit Operations Team</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loan Balances (Read-Only Review) */}
        <Card className="mb-6">
          <CardHeader className="bg-[#f8fafc] border-b border-[#e2e8f0]">
            <CardTitle className="font-['Inter:Medium',_sans-serif] text-[16px] text-[#1e293b]">
              Loan Balances - Credit Operations Review
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

            {/* Total Balance */}
            <div className="mt-6 p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-['Inter:Medium',_sans-serif] text-[16px] text-[#374151]">Total Outstanding Balance:</span>
                <span className="font-['Inter:Bold',_sans-serif] text-[20px] text-[#003883]">₦{totalBalance.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credit Card Information (Read-Only) */}
        <Card className="mb-6">
          <CardHeader className="bg-[#f8fafc] border-b border-[#e2e8f0]">
            <CardTitle className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-[#003883]" />
              <span className="font-['Inter:Medium',_sans-serif] text-[16px] text-[#1e293b]">Credit Card Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <label className="font-['Inter:Medium',_sans-serif] text-[14px] text-[#374151] mb-3 block">Customer Credit Card Status</label>
                <div className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#1e293b] bg-white border border-[#d1d5db] rounded px-3 py-2 flex items-center gap-2">
                  {request?.hasCreditCard ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-[#21a366]" />
                      <span>Has Credit Card - Balance: ₦{parseFloat(request?.creditCardBalance || '0').toLocaleString()}</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 text-[#ef4444]" />
                      <span>No Credit Card</span>
                    </>
                  )}
                </div>
              </div>

              {request?.hasCreditCard && (
                <div className="p-4 bg-[#eff6ff] border border-[#bfdbfe] rounded-lg">
                  <p className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#1e40af] leading-[16px]">
                    ✓ Credit card balance has been verified by Settlement & Reconciliation Team
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Letter Preview */}
        <Card className="mb-6">
          <CardHeader className="bg-[#f8fafc] border-b border-[#e2e8f0]">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#003883]" />
              <span className="font-['Inter:Medium',_sans-serif] text-[16px] text-[#1e293b]">Letter of Indebtedness Preview</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 min-h-[500px] bg-white">
              {!showPreview ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <FileText className="h-16 w-16 text-gray-400 mb-4" />
                  <h3 className="font-medium text-gray-900 mb-2">Letter Preview</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Click the button below to generate and preview the Letter of Indebtedness
                  </p>
                  <Button onClick={handlePreviewLetter} variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview Letter
                  </Button>
                </div>
              ) : (
                <div className="text-sm space-y-4 font-mono">
                   <div className="text-right text-xs text-gray-600">
                     ABP/ROG/{new Date().getMonth().toString().padStart(2, '0')}{new Date().getFullYear()}/AF/DC/{Math.floor(Math.random() * 1000)}<br />
                     {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                   </div>
                   
                   <div className="space-y-2">
                     <div className="font-semibold">{request?.requestDetails?.recipientName?.toUpperCase() || 'RECIPIENT NAME'}</div>
                     <div className="text-xs">
                       {request?.requestDetails?.recipientAddress || 'Recipient Address Line 1,'}<br />
                       {'Recipient Address Line 2,'}<br />
                       {'Recipient Address Line 3,'}<br />
                       {'City, State'}
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
                         <th className="border-r border-gray-300 p-1 text-left">Amount Availed</th>
                         <th className="p-1 text-left">Outstanding Amount as at {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</th>
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

                   <div className="flex justify-between items-end mt-8">
                     <div className="text-center">
                       <div className="text-xs mb-2">{request?.requestDetails?.authorizedSignatory1?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Authorized Signatory 1'}</div>
                       <div className="text-xs">AUTHORIZED SIGNATORY</div>
                       <div className="h-8 border-b border-black w-24 mt-4"></div>
                       <div className="text-xs font-semibold mt-1">Signature & Date</div>
                     </div>
                     <div className="text-center">
                       <div className="text-xs mb-2">{request?.requestDetails?.authorizedSignatory2?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Authorized Signatory 2'}</div>
                       <div className="text-xs">AUTHORIZED SIGNATORY</div>
                       <div className="h-8 border-b border-black w-24 mt-4"></div>
                       <div className="text-xs font-semibold mt-1">Signature & Date</div>
                     </div>
                   </div>
                 </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {showPreview && (
                <Button onClick={handlePreviewLetter} variant="outline" className="w-full border-[#003883] text-[#003883] hover:bg-[#003883] hover:text-white">
                  <Eye className="mr-2 h-4 w-4" />
                  Refresh Preview
                </Button>
              )}
              
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={onBack} 
                  className="flex-1 border-[#d1d5db] text-[#374151] hover:bg-[#f9fafb]"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleRejectClick} 
                  variant="outline"
                  className="flex-1 border-[#ef4444] text-[#ef4444] hover:bg-[#ef4444] hover:text-white"
                  disabled={!showPreview}
                >
                  <X className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button 
                  onClick={handleSubmitForApproval} 
                  className="flex-1 bg-[#003883] hover:bg-[#002660] text-white disabled:bg-[#e5e7eb] disabled:text-[#9ca3af]"
                  disabled={!showPreview}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Submit for Approval
                </Button>
              </div>
              
              {!showPreview && (
                <p className="mt-2 font-['Inter:Regular',_sans-serif] text-[12px] text-[#ef4444] text-center">
                  Please preview the letter before submitting for approval
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rejection Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-['Inter:Medium',_sans-serif] text-[18px] text-[#1e293b]">
              Reject LOI Request
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="rejection-reason" className="font-['Inter:Medium',_sans-serif] text-[14px] text-[#374151] mb-2 block">
                Reason for Rejection *
              </Label>
              <Textarea
                id="rejection-reason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Please provide a detailed reason for rejecting this LOI request..."
                rows={4}
                className="border-[#d1d5db] focus:border-[#003883] focus:ring-[#003883]"
              />
            </div>
            <div className="p-3 bg-[#fef3f2] border border-[#fecdca] rounded-lg">
              <p className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#b42318] leading-[16px]">
                ⚠️ Rejecting this request will notify the initiator and require them to address the issues before resubmission.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowRejectDialog(false)}
              className="border-[#d1d5db] text-[#374151] hover:bg-[#f9fafb]"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleReject}
              disabled={!rejectionReason.trim()}
              className="bg-[#ef4444] hover:bg-[#dc2626] text-white disabled:bg-[#e5e7eb] disabled:text-[#9ca3af]"
            >
              <X className="mr-2 h-4 w-4" />
              Reject Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}