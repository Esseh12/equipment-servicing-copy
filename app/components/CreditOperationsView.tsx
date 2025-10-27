import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Trash2, CreditCard } from 'lucide-react';
import { BreadcrumbNavigation } from './shared/BreadcrumbNavigation';
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

// Loan types options
const loanTypes = [
  'Personal Loan',
  'Auto Loan',
  'Home Loan',
  'Business Loan',
  'SME Loan',
  'Agriculture Loan',
  'Equipment Financing',
  'Working Capital',
  'Term Loan',
  'Overdraft'
];

// Branch options
const branches = [
  'Victoria Island',
  'Ikeja',
  'Lekki',
  'Surulere',
  'Ajah',
  'Yaba',
  'Lagos Island',
  'Ikoyi',
  'Apapa',
  'Festac',
  'Mushin',
  'Alaba',
  'Oshodi',
  'Ketu',
  'Gbagada'
];

interface CreditOperationsViewProps {
  request: LOIRequest | null;
  onSubmit: (data: Partial<LOIRequest>) => void;
  onBack: () => void;
  breadcrumbs: BreadcrumbItem[];
  onBreadcrumbClick: (screen: any) => void;
}

interface LoanBalance {
  id: string;
  loanType: string;
  amount: string;
  branch: string;
  remarks: string;
}

export function CreditOperationsView({
  request,
  onSubmit,
  onBack,
  breadcrumbs,
  onBreadcrumbClick
}: CreditOperationsViewProps) {
  const [loanBalances, setLoanBalances] = useState<LoanBalance[]>(
    request?.loanBalances || [{
      id: '1',
      loanType: '',
      amount: '',
      branch: '',
      remarks: ''
    }]
  );
  const [hasCreditCard, setHasCreditCard] = useState<boolean>(request?.hasCreditCard || false);

  const addLoanRow = () => {
    const newLoan: LoanBalance = {
      id: Date.now().toString(),
      loanType: '',
      amount: '',
      branch: '',
      remarks: ''
    };
    setLoanBalances([...loanBalances, newLoan]);
  };

  const removeLoanRow = (id: string) => {
    if (loanBalances.length > 1) {
      setLoanBalances(loanBalances.filter(loan => loan.id !== id));
    }
  };

  const updateLoan = (id: string, field: keyof LoanBalance, value: string) => {
    setLoanBalances(loanBalances.map(loan => 
      loan.id === id ? { ...loan, [field]: value } : loan
    ));
  };

  const handleSubmit = () => {
    const formData: Partial<LOIRequest> = {
      loanBalances,
      hasCreditCard,
      currentStep: 3,
      status: 'pending'
    };
    
    onSubmit(formData);
  };

  const isFormValid = loanBalances.some(loan => 
    loan.loanType && loan.amount && loan.branch
  );

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
                <span className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#003883]">Credit Operations</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#f1f5f9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <BreadcrumbNavigation
            items={breadcrumbs}
            onItemClick={onBreadcrumbClick}
          />
        </div>
      </div>



      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Original Request Details (Read-Only) */}
        <Card className="mb-6">
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

            {/* Customer Mandate Confirmation */}
            <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-lg p-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#21a366] rounded-full flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 8 8">
                    <path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z"/>
                  </svg>
                </div>
                <span className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#1e40af]">Customer mandate reviewed and confirmed by CCO</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loan Balances (Credit Operations Action Required) */}
        <Card className="mb-6">
          <CardHeader className="bg-[#f8fafc] border-b border-[#e2e8f0] flex flex-row items-center justify-between">
            <CardTitle className="font-['Inter:Medium',_sans-serif] text-[16px] text-[#1e293b]">
              Loan Balances - Credit Operations Review
            </CardTitle>
            <Button onClick={addLoanRow} size="sm" variant="outline" className="border-[#003883] text-[#003883] hover:bg-[#003883] hover:text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Row
            </Button>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {loanBalances.map((loan, index) => (
                <div key={loan.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border border-[#e2e8f0] rounded-lg bg-[#fafbfc]">
                  <div>
                    <Label htmlFor={`loan-type-${loan.id}`} className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#374151] mb-2 block">Loan Type *</Label>
                    <Select value={loan.loanType} onValueChange={(value) => updateLoan(loan.id, 'loanType', value)}>
                      <SelectTrigger className="border-[#d1d5db] focus:border-[#003883] focus:ring-[#003883]" id={`loan-type-${loan.id}`}>
                        <SelectValue placeholder="Select loan type" />
                      </SelectTrigger>
                      <SelectContent>
                        {loanTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor={`amount-${loan.id}`} className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#374151] mb-2 block">Amount (₦) *</Label>
                    <Input
                      id={`amount-${loan.id}`}
                      type="number"
                      value={loan.amount}
                      onChange={(e) => updateLoan(loan.id, 'amount', e.target.value)}
                      placeholder="0.00"
                      className="border-[#d1d5db] focus:border-[#003883] focus:ring-[#003883]"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`branch-${loan.id}`} className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#374151] mb-2 block">Branch *</Label>
                    <Select value={loan.branch} onValueChange={(value) => updateLoan(loan.id, 'branch', value)}>
                      <SelectTrigger className="border-[#d1d5db] focus:border-[#003883] focus:ring-[#003883]" id={`branch-${loan.id}`}>
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.map((branch) => (
                          <SelectItem key={branch} value={branch}>
                            {branch}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor={`remarks-${loan.id}`} className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#374151] mb-2 block">Remarks</Label>
                    <Textarea
                      id={`remarks-${loan.id}`}
                      value={loan.remarks}
                      onChange={(e) => updateLoan(loan.id, 'remarks', e.target.value)}
                      placeholder="Optional remarks"
                      rows={1}
                      className="border-[#d1d5db] focus:border-[#003883] focus:ring-[#003883] resize-none"
                    />
                  </div>
                  
                  <div className="flex items-end">
                    <Button
                      onClick={() => removeLoanRow(loan.id)}
                      variant="outline"
                      size="sm"
                      disabled={loanBalances.length === 1}
                      className="w-full border-[#ef4444] text-[#ef4444] hover:bg-[#ef4444] hover:text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {loanBalances.length === 0 && (
              <div className="text-center py-8 text-[#64748b]">
                <p className="mb-4 font-['Inter:Regular',_sans-serif] text-[14px]">No loan balances added yet.</p>
                <Button onClick={addLoanRow} variant="outline" className="border-[#003883] text-[#003883] hover:bg-[#003883] hover:text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Loan
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Credit Card Information */}
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
                <Label className="font-['Inter:Medium',_sans-serif] text-[14px] text-[#374151] mb-3 block">Does customer have a credit card? *</Label>
                <RadioGroup
                  value={hasCreditCard ? 'yes' : 'no'}
                  onValueChange={(value) => setHasCreditCard(value === 'yes')}
                  className="flex gap-6 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="credit-yes" className="border-[#003883] text-[#003883]" />
                    <Label htmlFor="credit-yes" className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#374151]">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="credit-no" className="border-[#003883] text-[#003883]" />
                    <Label htmlFor="credit-no" className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#374151]">No</Label>
                  </div>
                </RadioGroup>
              </div>

              {!hasCreditCard && (
                <div className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg">
                  <p className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#64748b] leading-[16px]">
                    ℹ️ Since the customer does not have a credit card, the request will be returned directly to the CCO for final review.
                  </p>
                </div>
              )}

              {hasCreditCard && (
                <div className="p-4 bg-[#eff6ff] border border-[#bfdbfe] rounded-lg">
                  <p className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#1e40af] leading-[16px]">
                    🔄 Customer has credit card - request will be routed to Settlement Team for credit card balance verification.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                onClick={onBack} 
                className="flex-1 border-[#d1d5db] text-[#374151] hover:bg-[#f9fafb]"
              >
                Back
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={!isFormValid}
                className="flex-1 bg-[#003883] hover:bg-[#002660] text-white disabled:bg-[#e5e7eb] disabled:text-[#9ca3af]"
              >
                {hasCreditCard ? 'Route to Settlement Team' : 'Return to Initiator'}
              </Button>
            </div>
            
            {!isFormValid && (
              <p className="mt-2 font-['Inter:Regular',_sans-serif] text-[12px] text-[#ef4444]">
                Please complete all required loan balance fields (marked with *)
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}