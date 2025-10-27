import { useState } from 'react';
import { ServiceCentralLayout } from './ServiceCentralLayout';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { BreadcrumbNavigation } from './shared/BreadcrumbNavigation';
import { SimpleConfirmationModal } from './shared/SimpleConfirmationModal';
import { 
  Home, 
  ChevronRight, 
  FileText, 
  Lock, 
  AlertTriangle, 
  Shield, 
  Users,
  Search,
  CheckCircle
} from 'lucide-react';
import accessLogo from 'figma:asset/3ebf5c44175bf36c1eceb7236d272904dfc164a1.png';
import imgImage4 from "figma:asset/7b060d15d84a01f78efaca93b3661876238566a2.png";
import imgImage3 from "figma:asset/898c83b0d3bbe8806ecfa5d66a6064f401fdb2c5.png";
import svgPaths from "../imports/svg-1xhpa9otur";
import svgPathsE5 from "../imports/svg-e5dui3gtnu";
import type { LOIRequest, BreadcrumbItem, Screen } from '../App';

interface InitiatorRequestFormProps {
  request: LOIRequest | null;
  onSubmit: (data: Partial<LOIRequest>) => void;
  onBack: () => void;
  breadcrumbs: BreadcrumbItem[];
  onBreadcrumbClick: (screen: Screen) => void;
  onLogout: () => void;
}

// Sidebar Navigation
function SidebarContent({ onBack, onLogout }: { onBack: () => void; onLogout: () => void }) {
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
          <Badge className="bg-[#003883] text-white text-[11px] h-5">Initiator/CCO</Badge>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-auto p-[16px]">
        <div className="space-y-2">
          <div className="px-4 py-2 bg-[#003883] text-white rounded-lg">
            <div className="text-[14px]">Letter of Indebtedness</div>
          </div>
        </div>
      </div>

      <div className="p-[16px] border-t border-[#d0d5dd]">
        <Button
          onClick={onLogout}
          variant="outline"
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
  return <div className="h-full" />;
}

// Main Content
function MainContent({ request, onSubmit, onBack, breadcrumbs, onBreadcrumbClick }: InitiatorRequestFormProps) {
  const [customerInfo, setCustomerInfo] = useState(request?.customerInfo || {
    accountNumber: '',
    customerName: '',
    bvn: ''
  });
  const [deliveryOption, setDeliveryOption] = useState<'hard-copy' | 'email' | 'third-party-email'>( 
    request?.deliveryOption || 'email'
  );
  const [thirdPartyEmail, setThirdPartyEmail] = useState(request?.thirdPartyEmail || '');

  const [isLoading, setIsLoading] = useState(false);
  const [isAccountValidated, setIsAccountValidated] = useState(false);
  const [mandateConfirmed, setMandateConfirmed] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  
  // Request Details state
  const [recipientName, setRecipientName] = useState('');
  const [purposeOfLetter, setPurposeOfLetter] = useState('');
  const [authorizedSignatory1, setAuthorizedSignatory1] = useState('');
  const [authorizedSignatory2, setAuthorizedSignatory2] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [customerInstructionFile, setCustomerInstructionFile] = useState<File | null>(null);

  const [errors, setErrors] = useState<{
    accountNumber?: string;
    thirdPartyEmail?: string;
    mandateConfirmed?: string;
    recipientName?: string;
    purposeOfLetter?: string;
    authorizedSignatory1?: string;
    authorizedSignatory2?: string;
    recipientAddress?: string;
    customerInstructionFile?: string;
  }>({});

  const handleAccountNumberChange = async (value: string) => {
    setCustomerInfo(prev => ({ ...prev, accountNumber: value }));
    
    // Clear previous errors
    if (errors.accountNumber) {
      setErrors(prev => ({ ...prev, accountNumber: undefined }));
    }
    
    // Simulate auto-fetch when account number is complete (10 digits)
    if (value.length === 10 && /^\d{10}$/.test(value)) {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock customer data - simulate both success and failure
      if (value === '1234567890' || value === '2345678901' || value === '3456789012') {
        const mockCustomerData = {
          accountNumber: value,
          customerName: value === '1234567890' ? 'John Doe' : value === '2345678901' ? 'Mary Johnson' : 'Robert Davis',
          bvn: '22' + value.slice(0, 9)
        };
        
        setCustomerInfo(mockCustomerData);
        setIsAccountValidated(true);
      } else {
        setCustomerInfo(prev => ({
          ...prev,
          customerName: '',
          bvn: ''
        }));
        setIsAccountValidated(false);
        setErrors(prev => ({ ...prev, accountNumber: 'Account number not found' }));
      }
      
      setIsLoading(false);
    } else if (value.length > 0 && (value.length !== 10 || !/^\d{10}$/.test(value))) {
      setIsAccountValidated(false);
      setCustomerInfo(prev => ({
        ...prev,
        customerName: '',
        bvn: ''
      }));
    } else {
      setIsAccountValidated(false);
      setCustomerInfo(prev => ({
        ...prev,
        customerName: '',
        bvn: ''
      }));
    }
  };



  const validateForm = () => {
    const newErrors: any = {};

    // Validate account number
    if (!customerInfo.accountNumber) {
      newErrors.accountNumber = 'Account number is required';
    } else if (!isAccountValidated) {
      newErrors.accountNumber = 'Please enter a valid account number';
    }

    // Validate mandate confirmation
    if (!mandateConfirmed) {
      newErrors.mandateConfirmed = 'Please confirm you have reviewed the customer mandate';
    }

    // Validate request details
    if (!recipientName) {
      newErrors.recipientName = 'Recipient name is required';
    }

    if (!purposeOfLetter) {
      newErrors.purposeOfLetter = 'Purpose of letter is required';
    }

    if (!authorizedSignatory1) {
      newErrors.authorizedSignatory1 = 'Authorized signatory 1 is required';
    }

    if (!authorizedSignatory2) {
      newErrors.authorizedSignatory2 = 'Authorized signatory 2 is required';
    }

    if (deliveryOption === 'third-party-email') {
      if (!thirdPartyEmail) {
        newErrors.thirdPartyEmail = 'Third party email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(thirdPartyEmail)) {
        newErrors.thirdPartyEmail = 'Please enter a valid email address';
      }
    }

    if (!recipientAddress) {
      newErrors.recipientAddress = 'Recipient address is required';
    }

    if (!customerInstructionFile) {
      newErrors.customerInstructionFile = 'Customer instruction document is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setShowConfirmationModal(true);
    }
  };

  const handleConfirmSubmit = () => {
    const formData: Partial<LOIRequest> = {
      customerInfo,
      requestDetails: {
        recipientName,
        purposeOfLetter,
        authorizedSignatory1,
        authorizedSignatory2,
        customerInstructionFile,
        recipientAddress
      },
      deliveryOption,
      thirdPartyEmail: deliveryOption === 'third-party-email' ? thirdPartyEmail : undefined,
      currentStep: 2,
      status: 'pending'
    };
    
    setShowConfirmationModal(false);
    onSubmit(formData);
  };

  const canProceed = isAccountValidated && mandateConfirmed && recipientName && purposeOfLetter && 
    authorizedSignatory1 && authorizedSignatory2 && recipientAddress && customerInstructionFile &&
    (deliveryOption !== 'third-party-email' || thirdPartyEmail);

  return (
    <div className="w-full h-full bg-white overflow-y-auto">
      <div className="w-full max-w-[1400px] mx-auto px-4 lg:px-8 py-6 lg:py-8">
        {/* Breadcrumbs */}
        <BreadcrumbNavigation 
          breadcrumbs={breadcrumbs}
          onBreadcrumbClick={onBreadcrumbClick}
        />

        {/* Page Title */}
        <div className="flex flex-col gap-[4px] mb-6 lg:mb-8">
          <h1 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[24px] lg:text-[30px] text-[#101828] leading-[32px] lg:leading-[38px]">
            New Letter of Indebtedness Request
          </h1>
          <p className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] lg:text-[16px] text-[#475467] leading-[20px] lg:leading-[24px]">
            Create a new request for customer letter of indebtedness
          </p>
        </div>

        <div className="space-y-8">
          {/* Step 1: Customer Information */}
          <div className="bg-white border border-[#eaecf0] rounded-[12px] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-[#003883] text-white rounded-full flex items-center justify-center">
                <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[14px]">1</span>
              </div>
              <h2 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[18px] text-[#101828] leading-[28px]">
                Customer Information
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Account Number */}
              <div className="space-y-2">
                <Label className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#344054] leading-[20px]">
                  Account Number <span className="text-[#ee3148]">*</span>
                </Label>
                <div className="relative">
                  <Input
                    value={customerInfo.accountNumber}
                    onChange={(e) => handleAccountNumberChange(e.target.value)}
                    placeholder="Enter 10-digit account number"
                    maxLength={10}
                    className={`h-[40px] border-[#d0d5dd] bg-white rounded-[8px] px-[12px] py-[8px] font-['Inter:Regular',_sans-serif] text-[16px] ${errors.accountNumber ? 'border-[#ee3148]' : ''}`}
                  />
                  {isLoading && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#003883]"></div>
                    </div>
                  )}
                </div>
                {errors.accountNumber && (
                  <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#ee3148] leading-[20px] flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    {errors.accountNumber}
                  </p>
                )}

              </div>

              {/* Customer Name - Auto-populated */}
              <div className="space-y-2">
                <Label className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#344054] leading-[20px]">
                  Customer Name
                </Label>
                <Input
                  value={customerInfo.customerName}
                  readOnly
                  placeholder="Auto-populated"
                  className="h-[40px] border-[#d0d5dd] bg-[#f9fafb] rounded-[8px] px-[12px] py-[8px] font-['Inter:Regular',_sans-serif] text-[16px] cursor-not-allowed"
                />
              </div>

              {/* BVN - Auto-populated */}
              <div className="space-y-2">
                <Label className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#344054] leading-[20px]">
                  BVN
                </Label>
                <Input
                  value={customerInfo.bvn}
                  readOnly
                  placeholder="Auto-populated"
                  className="h-[40px] border-[#d0d5dd] bg-[#f9fafb] rounded-[8px] px-[12px] py-[8px] font-['Inter:Regular',_sans-serif] text-[16px] cursor-not-allowed"
                />
              </div>


            </div>

            {isAccountValidated && (
              <div className="mt-4 p-3 bg-[#dcfce7] border border-[#bbf7d0] rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#21a366]" />
                  <span className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#21a366] leading-[20px]">
                    Customer account verified successfully
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Customer Mandate Section - Only show when account is validated */}
          {isAccountValidated && (
            <div className="bg-white border border-[#eaecf0] rounded-[12px] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)]">
              {/* Customer Mandate Display */}
              <div className="bg-gray-50 h-[266.822px] relative rounded-t-[12px] p-[20px]">
                <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[#101828] text-[14px] leading-[21px] mb-4">
                  Customer Mandate
                </p>
                
                <div className="flex gap-[40px] items-start mt-8">
                  {/* Customer Image */}
                  <div className="flex flex-col gap-[6px] items-start w-[166px]">
                    <p className="font-['Inter:Medium',_sans-serif] font-medium text-[#526484] text-[11px] leading-[16px]">
                      Customer Image
                    </p>
                    <div className="h-[142px] w-[149px] relative overflow-hidden rounded-[4px]">
                      <img 
                        alt="Customer" 
                        className="absolute h-[124%] left-[-3%] max-w-none top-[-9%] w-[112%] object-cover" 
                        src={imgImage4} 
                      />
                    </div>
                  </div>

                  {/* Signature */}
                  <div className="flex flex-col gap-[6px] items-start w-[166px]">
                    <p className="font-['Inter:Medium',_sans-serif] font-medium text-[#526484] text-[11px] leading-[16px]">
                      Signature
                    </p>
                    <div className="h-[126px] w-[166px] relative">
                      <img 
                        alt="Signature" 
                        className="absolute inset-0 max-w-none object-cover size-full" 
                        src={imgImage3} 
                      />
                    </div>
                  </div>

                  {/* Customer Instruction */}
                  <div className="flex flex-col gap-[5px] items-start w-[126px]">
                    <p className="font-['Inter:Medium',_sans-serif] font-medium text-[#526484] text-[11px] leading-[16px]">
                      Customer Instruction
                    </p>
                    <p className="h-[30px] leading-[30px] text-[#101828] text-[12px] font-['Inter:Medium',_sans-serif] font-medium">
                      Only A should Sign
                    </p>
                  </div>
                </div>
              </div>

              {/* Mandate Confirmation Checkbox */}
              <div className="p-[20px]">
                <div className="flex gap-[6px] items-start">
                  <div className="flex items-center justify-center pt-[1px]">
                    <div 
                      className={`relative size-[12px] rounded-[3px] border border-[#003883] cursor-pointer ${
                        mandateConfirmed ? 'bg-[rgba(217,217,231,0.51)]' : 'bg-white'
                      }`}
                      onClick={() => {
                        setMandateConfirmed(!mandateConfirmed);
                        if (errors.mandateConfirmed) {
                          setErrors(prev => ({ ...prev, mandateConfirmed: undefined }));
                        }
                      }}
                    >
                      {mandateConfirmed && (
                        <div className="absolute inset-[12%]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
                            <path 
                              d={svgPaths.p1b1c1e00} 
                              stroke="#003883" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth="1.30025" 
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col leading-[20px]">
                    <p className="font-['Inter:Medium',_sans-serif] font-medium text-[#344054] text-[14px]">
                      Confirm Mandate
                    </p>
                    <p className="font-['Inter:Regular',_sans-serif] font-normal text-[#475467] text-[14px]">
                      I confirm I have viewed the customer mandate and understand its contents.
                    </p>
                  </div>
                </div>
                {errors.mandateConfirmed && (
                  <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#ee3148] leading-[20px] flex items-center gap-1 mt-2">
                    <AlertTriangle className="h-4 w-4" />
                    {errors.mandateConfirmed}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Request Details */}
          <div className={`bg-white border border-[#eaecf0] rounded-[12px] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] ${!isAccountValidated || !mandateConfirmed ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="flex items-center gap-3 mb-6 p-6 pb-0">
              <div className={`w-8 h-8 ${isAccountValidated && mandateConfirmed ? 'bg-[#003883]' : 'bg-[#d0d5dd]'} text-white rounded-full flex items-center justify-center`}>
                <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[14px]">2</span>
              </div>
              <h2 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[18px] text-[#101828] leading-[28px]">
                Request Details
              </h2>
            </div>

            <div className="bg-gray-50 relative rounded-b-[12px] p-[20px]">
              <div className="space-y-[36px]">
                {/* Row 1: Recipient Name and Purpose of Letter */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[23px]">
                  <div className="space-y-[6px]">
                    <label className="font-['Inter:Medium',_sans-serif] font-medium text-[#344054] text-[14px] leading-[20px]">
                      Recipient's Name <span className="text-[#ee3148]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={recipientName}
                        onChange={(e) => {
                          setRecipientName(e.target.value);
                          if (errors.recipientName) {
                            setErrors(prev => ({ ...prev, recipientName: undefined }));
                          }
                        }}
                        className={`bg-white w-full h-[40px] rounded-[8px] border ${errors.recipientName ? 'border-[#ee3148]' : 'border-[#d0d5dd]'} px-[12px] py-[8px] font-['Inter:Regular',_sans-serif] text-[16px] text-[#667085] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]`}
                        placeholder="Enter recipient name"
                      />
                    </div>
                    {errors.recipientName && (
                      <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#ee3148] leading-[20px] flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4" />
                        {errors.recipientName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-[6px]">
                    <label className="font-['Inter:Medium',_sans-serif] font-medium text-[#344054] text-[14px] leading-[20px]">
                      Purpose of Letter <span className="text-[#ee3148]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={purposeOfLetter}
                        onChange={(e) => {
                          setPurposeOfLetter(e.target.value);
                          if (errors.purposeOfLetter) {
                            setErrors(prev => ({ ...prev, purposeOfLetter: undefined }));
                          }
                        }}
                        className={`bg-white w-full h-[40px] rounded-[8px] border ${errors.purposeOfLetter ? 'border-[#ee3148]' : 'border-[#d0d5dd]'} px-[12px] py-[8px] font-['Inter:Regular',_sans-serif] text-[16px] text-[#667085] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] appearance-none`}
                      >
                        <option value="">Select</option>
                        <option value="loan-application">Loan Application</option>
                        <option value="visa-application">Visa Application</option>
                        <option value="account-closure">Account Closure</option>
                        <option value="legal-proceedings">Legal Proceedings</option>
                        <option value="other">Other</option>
                      </select>
                      <div className="absolute right-[12px] top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                          <path d="M5 7.5L10 12.5L15 7.5" stroke="#667085" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        </svg>
                      </div>
                    </div>
                    {errors.purposeOfLetter && (
                      <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#ee3148] leading-[20px] flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4" />
                        {errors.purposeOfLetter}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2: Authorized Signatories */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[23px]">
                  <div className="space-y-[5px]">
                    <label className="font-['Inter:Medium',_sans-serif] font-medium text-[#344054] text-[12px] leading-[17px]">
                      Select Authorized Signatory 1<span className="text-[#ee3148]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={authorizedSignatory1}
                        onChange={(e) => {
                          setAuthorizedSignatory1(e.target.value);
                          if (errors.authorizedSignatory1) {
                            setErrors(prev => ({ ...prev, authorizedSignatory1: undefined }));
                          }
                        }}
                        className={`bg-white w-full h-[40px] rounded-[7px] border ${errors.authorizedSignatory1 ? 'border-[#ee3148]' : 'border-[#d0d5dd]'} px-[10px] py-[7px] font-['Inter:Regular',_sans-serif] text-[14px] text-[#667085] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] appearance-none`}
                      >
                        <option value="">Select</option>
                        <option value="john-doe">John Doe - Managing Director</option>
                        <option value="jane-smith">Jane Smith - Finance Director</option>
                        <option value="robert-brown">Robert Brown - Operations Manager</option>
                      </select>
                      <div className="absolute right-[10px] top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-[17px] h-[17px]" fill="none" viewBox="0 0 18 18">
                          <path d={svgPathsE5.p87fb500} stroke="#667085" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45147" />
                        </svg>
                      </div>
                    </div>
                    {errors.authorizedSignatory1 && (
                      <p className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#ee3148] leading-[17px] flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        {errors.authorizedSignatory1}
                      </p>
                    )}
                  </div>

                  <div className="space-y-[5px]">
                    <label className="font-['Inter:Medium',_sans-serif] font-medium text-[#344054] text-[12px] leading-[17px]">
                      Select Authorized Signatory 2<span className="text-[#ee3148]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={authorizedSignatory2}
                        onChange={(e) => {
                          setAuthorizedSignatory2(e.target.value);
                          if (errors.authorizedSignatory2) {
                            setErrors(prev => ({ ...prev, authorizedSignatory2: undefined }));
                          }
                        }}
                        className={`bg-white w-full h-[40px] rounded-[7px] border ${errors.authorizedSignatory2 ? 'border-[#ee3148]' : 'border-[#d0d5dd]'} px-[10px] py-[7px] font-['Inter:Regular',_sans-serif] text-[14px] text-[#667085] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] appearance-none`}
                      >
                        <option value="">Select</option>
                        <option value="mary-johnson">Mary Johnson - Secretary</option>
                        <option value="david-wilson">David Wilson - Treasurer</option>
                        <option value="sarah-davis">Sarah Davis - Legal Officer</option>
                      </select>
                      <div className="absolute right-[10px] top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-[17px] h-[17px]" fill="none" viewBox="0 0 18 18">
                          <path d={svgPathsE5.p87fb500} stroke="#667085" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45147" />
                        </svg>
                      </div>
                    </div>
                    {errors.authorizedSignatory2 && (
                      <p className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#ee3148] leading-[17px] flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        {errors.authorizedSignatory2}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 3: Delivery Option and Upload Customer Instruction */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[23px] items-start">
                  <div className="space-y-[6px]">
                    <label className="font-['Inter:Medium',_sans-serif] font-medium text-[#344054] text-[14px] leading-[20px] block min-h-[40px] flex items-center">
                      Delivery Option <span className="text-[#ee3148]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={deliveryOption}
                        onChange={(e) => setDeliveryOption(e.target.value as any)}
                        className="bg-white w-full h-[40px] rounded-[8px] border border-[#d0d5dd] px-[12px] py-[8px] font-['Inter:Regular',_sans-serif] text-[16px] text-[#667085] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] appearance-none"
                      >
                        <option value="">Select</option>
                        <option value="email">Email</option>
                        <option value="hard-copy">Hard Copy</option>
                        <option value="third-party-email">Third Party Email</option>
                      </select>
                      <div className="absolute right-[12px] top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                          <path d="M5 7.5L10 12.5L15 7.5" stroke="#667085" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-[6px]">
                    <label className="font-['Inter:Medium',_sans-serif] font-medium text-[#344054] text-[14px] leading-[20px] block min-h-[40px] flex items-center">
                      Upload Customer Instruction <span className="font-['Inter:Light',_sans-serif] font-light">Acceptable Documents: PDF, JPG, PNG </span><span className="font-['Inter:Light',_sans-serif] font-light text-[#ee3148]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setCustomerInstructionFile(file);
                            if (errors.customerInstructionFile) {
                              setErrors(prev => ({ ...prev, customerInstructionFile: undefined }));
                            }
                          }
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className={`bg-white w-full h-[40px] rounded-[8px] border ${errors.customerInstructionFile ? 'border-[#ee3148]' : 'border-[#d0d5dd]'} px-[12px] py-[8px] flex items-center justify-between font-['Inter:Regular',_sans-serif] text-[16px] text-[#667085] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]`}>
                        <span>{customerInstructionFile ? customerInstructionFile.name : 'Choose file'}</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                          <path d={svgPathsE5.p16952380} stroke="#667085" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </div>
                    </div>
                    {errors.customerInstructionFile && (
                      <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#ee3148] leading-[20px] flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4" />
                        {errors.customerInstructionFile}
                      </p>
                    )}
                  </div>
                </div>

                {/* Third Party Email Input */}
                {deliveryOption === 'third-party-email' && (
                  <div className="space-y-[6px]">
                    <label className="font-['Inter:Medium',_sans-serif] font-medium text-[#344054] text-[14px] leading-[20px]">
                      Third Party Email Address <span className="text-[#ee3148]">*</span>
                    </label>
                    <input
                      type="email"
                      value={thirdPartyEmail}
                      onChange={(e) => {
                        setThirdPartyEmail(e.target.value);
                        if (errors.thirdPartyEmail) {
                          setErrors(prev => ({ ...prev, thirdPartyEmail: undefined }));
                        }
                      }}
                      placeholder="Enter third party email address"
                      className={`bg-white w-full h-[40px] rounded-[8px] border ${errors.thirdPartyEmail ? 'border-[#ee3148]' : 'border-[#d0d5dd]'} px-[12px] py-[8px] font-['Inter:Regular',_sans-serif] text-[16px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]`}
                    />
                    {errors.thirdPartyEmail && (
                      <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#ee3148] leading-[20px] flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4" />
                        {errors.thirdPartyEmail}
                      </p>
                    )}
                  </div>
                )}

                {/* Row 4: Recipient Address */}
                <div className="space-y-[6px]">
                  <label className="font-['Inter:Medium',_sans-serif] font-medium text-[#344054] text-[14px] leading-[20px]">
                    Recipient Address<span className="text-[#ee3148]">*</span>
                  </label>
                  <textarea
                    value={recipientAddress}
                    onChange={(e) => {
                      setRecipientAddress(e.target.value);
                      if (errors.recipientAddress) {
                        setErrors(prev => ({ ...prev, recipientAddress: undefined }));
                      }
                    }}
                    placeholder="Enter recipient address"
                    rows={4}
                    className={`bg-white w-full rounded-[8px] border ${errors.recipientAddress ? 'border-[#ee3148]' : 'border-[#d0d5dd]'} px-[12px] py-[8px] font-['Inter:Regular',_sans-serif] text-[16px] text-[#667085] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] resize-none`}
                  />
                  {errors.recipientAddress && (
                    <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#ee3148] leading-[20px] flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4" />
                      {errors.recipientAddress}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>



          {/* Submit Button */}
          <div className="flex gap-[12px] pt-4">
            <Button
              onClick={onBack}
              variant="outline"
              className="border-[#d0d5dd] text-[#344054] hover:bg-[#f3f3f5] rounded-[8px] px-[16px] py-[10px] h-[44px] w-full lg:w-auto"
            >
              <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[16px] leading-[24px]">
                Cancel
              </span>
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!canProceed}
              className="bg-[#003883] hover:bg-[#002664] text-white rounded-[8px] px-[16px] py-[10px] h-[44px] disabled:opacity-50 disabled:cursor-not-allowed flex-1 lg:flex-none lg:w-auto"
            >
              <FileText className="h-4 w-4 mr-2" />
              <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[16px] leading-[24px]">
                Submit Request
              </span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Confirmation Modal */}
      <SimpleConfirmationModal 
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={handleConfirmSubmit}
        request={request}
      />
    </div>
  );
}

export function InitiatorRequestForm({ request, onSubmit, onBack, breadcrumbs, onBreadcrumbClick, onLogout }: InitiatorRequestFormProps) {
  return (
    <ServiceCentralLayout
      sidebarContent={<SidebarContent onBack={onBack} onLogout={onLogout} />}
      headerContent={<HeaderContent />}
    >
      <MainContent 
        request={request}
        onSubmit={onSubmit}
        onBack={onBack}
        breadcrumbs={breadcrumbs}
        onBreadcrumbClick={onBreadcrumbClick}
      />
    </ServiceCentralLayout>
  );
}