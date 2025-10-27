import { useState, useEffect } from 'react';
import { ServiceCentralLayout } from '../ServiceCentralLayout';
import { BreadcrumbNavigation } from '../shared/BreadcrumbNavigation';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Home, ChevronRight, CreditCard, Lock, AlertTriangle } from 'lucide-react';
import accessLogo from 'figma:asset/3ebf5c44175bf36c1eceb7236d272904dfc164a1.png';
import type { BreadcrumbItem, Screen } from '../../App';

interface KPACollectionsFormProps {
  onSubmit: (eslipNumber: string, amount: string) => void;
  onBack: () => void;
  onUSSD?: () => void;
  breadcrumbs: BreadcrumbItem[];
  onBreadcrumbClick: (screen: Screen) => void;
}

// Mock customer database for auto-population
const mockCustomerDatabase = {
  '1234567890': { name: 'John Doe', phone: '+1234567890' },
  '2345678901': { name: 'Mary Johnson', phone: '+2345678901' },
  '3456789012': { name: 'Robert Davis', phone: '+3456789012' },
  '4567890123': { name: 'Sarah Wilson', phone: '+4567890123' },
  '5678901234': { name: 'Michael Brown', phone: '+5678901234' },
};

// Sidebar Navigation
function SidebarContent({ onUSSD }: { onUSSD?: () => void }) {
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

          {/* USSD */}
          <div 
            onClick={onUSSD}
            className="h-[44px] rounded-[6px] flex items-center px-[12px] gap-[12px] hover:bg-[#ebeef2] cursor-pointer"
          >
            <div className="h-[20px] w-[20px] text-[#526484]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V3zM2 8a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V8zM7 13a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1H8a1 1 0 01-1-1v-2zM12 8a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8z" fill="currentColor" />
              </svg>
            </div>
            <span className="font-['DM_Sans:Bold',_sans-serif] font-bold text-[15px] text-[#526484] leading-[20px] tracking-[0.15px]">
              USSD
            </span>
          </div>
        </div>
      </div>

      {/* Security Indicator */}
      <div className="px-[16px] py-[12px] border-t border-[#d0d5dd] bg-[#f9fafb]">
        <div className="flex items-center gap-[8px]">
          <Lock className="h-[16px] w-[16px] text-[#21a366]" />
          <span className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#21a366] leading-[16px]">
            SSL/TLS Secured
          </span>
        </div>
      </div>
    </div>
  );
}

// Header Content (empty for now)
function HeaderContent() {
  return <div className="h-full" />;
}

// Main Content
function MainContent({ onSubmit, onBack, breadcrumbs, onBreadcrumbClick }: KPACollectionsFormProps) {
  const [formData, setFormData] = useState({
    accountNumber: '',
    customerName: '',
    phoneNumber: '',
    eslipNumber: '',
    amount: '',
    currency: 'USD'
  });

  const [errors, setErrors] = useState<{
    accountNumber?: string;
    eslipNumber?: string;
    amount?: string;
  }>({});

  const [isAccountValidated, setIsAccountValidated] = useState(false);

  // Auto-populate customer details when account number is entered (10 digits)
  useEffect(() => {
    if (formData.accountNumber.length === 10 && /^\d{10}$/.test(formData.accountNumber)) {
      const customerData = mockCustomerDatabase[formData.accountNumber as keyof typeof mockCustomerDatabase];
      if (customerData) {
        setFormData(prev => ({
          ...prev,
          customerName: customerData.name,
          phoneNumber: customerData.phone
        }));
        setIsAccountValidated(true);
        // Clear account number error if it exists
        if (errors.accountNumber) {
          setErrors(prev => ({ ...prev, accountNumber: undefined }));
        }
      } else {
        setFormData(prev => ({
          ...prev,
          customerName: '',
          phoneNumber: ''
        }));
        setIsAccountValidated(false);
        setErrors(prev => ({ ...prev, accountNumber: 'Account number not found' }));
      }
    } else if (formData.accountNumber.length > 0 && formData.accountNumber.length !== 10) {
      setIsAccountValidated(false);
      setFormData(prev => ({
        ...prev,
        customerName: '',
        phoneNumber: ''
      }));
    } else {
      setIsAccountValidated(false);
      setFormData(prev => ({
        ...prev,
        customerName: '',
        phoneNumber: ''
      }));
    }
  }, [formData.accountNumber]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear errors when user starts typing
    if (field === 'eslipNumber' && errors.eslipNumber) {
      setErrors(prev => ({ ...prev, eslipNumber: undefined }));
    }
    if (field === 'amount' && errors.amount) {
      setErrors(prev => ({ ...prev, amount: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: { accountNumber?: string; eslipNumber?: string; amount?: string } = {};

    // Validate account number
    if (!formData.accountNumber) {
      newErrors.accountNumber = 'Account number is required';
    } else if (formData.accountNumber.length !== 10 || !/^\d{10}$/.test(formData.accountNumber)) {
      newErrors.accountNumber = 'Account number must be exactly 10 digits';
    } else if (!isAccountValidated) {
      newErrors.accountNumber = 'Invalid account number';
    }

    // Validate E-slip number
    if (!formData.eslipNumber) {
      newErrors.eslipNumber = 'E-slip number is required';
    } else if (!formData.eslipNumber.startsWith('KPA')) {
      newErrors.eslipNumber = 'E-slip number must start with "KPA"';
    } else if (formData.eslipNumber.length < 8) {
      newErrors.eslipNumber = 'E-slip number must be at least 8 characters';
    }

    // Validate amount
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData.eslipNumber, formData.amount);
    }
  };

  const canSubmit = isAccountValidated && formData.eslipNumber && formData.amount;

  return (
    <div className="w-full h-full bg-white overflow-y-auto">
      <div className="max-w-4xl mx-auto p-4 lg:p-6">
        {/* Breadcrumbs */}
        <BreadcrumbNavigation 
          breadcrumbs={breadcrumbs}
          onBreadcrumbClick={onBreadcrumbClick}
        />

        {/* Page Title */}
        <div className="flex flex-col gap-[4px] mb-6 lg:mb-8">
          <h1 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[24px] lg:text-[30px] text-[#101828] leading-[32px] lg:leading-[38px]">
            KPA Payment
          </h1>
          <p className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] lg:text-[16px] text-[#475467] leading-[20px] lg:leading-[24px]">
            Pay your KPA collection charges securely
          </p>
        </div>

        <div className="space-y-8">
          {/* Step 1: Account Verification */}
          <div className="bg-white border border-[#eaecf0] rounded-[12px] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-[#003883] text-white rounded-full flex items-center justify-center">
                <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[14px]">1</span>
              </div>
              <h2 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[18px] text-[#101828] leading-[28px]">
                Account Verification
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Account Number */}
              <div className="space-y-2">
                <Label className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#344054] leading-[20px]">
                  Account Number <span className="text-[#ee3148]">*</span>
                </Label>
                <Input
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                  placeholder="Enter 10-digit account number"
                  maxLength={10}
                  className={`h-[40px] border-[#d0d5dd] bg-white rounded-[8px] px-[12px] py-[8px] font-['Inter:Regular',_sans-serif] text-[16px] ${errors.accountNumber ? 'border-[#ee3148]' : ''}`}
                />
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
                  value={formData.customerName}
                  readOnly
                  placeholder="Auto-populated"
                  className="h-[40px] border-[#d0d5dd] bg-[#f9fafb] rounded-[8px] px-[12px] py-[8px] font-['Inter:Regular',_sans-serif] text-[16px] cursor-not-allowed"
                />
              </div>

              {/* Phone Number - Auto-populated */}
              <div className="space-y-2">
                <Label className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#344054] leading-[20px]">
                  Phone Number
                </Label>
                <Input
                  value={formData.phoneNumber}
                  readOnly
                  placeholder="Auto-populated"
                  className="h-[40px] border-[#d0d5dd] bg-[#f9fafb] rounded-[8px] px-[12px] py-[8px] font-['Inter:Regular',_sans-serif] text-[16px] cursor-not-allowed"
                />
              </div>
            </div>

            {isAccountValidated && (
              <div className="mt-4 p-3 bg-[#dcfce7] border border-[#bbf7d0] rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#21a366] rounded-full"></div>
                  <span className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#21a366] leading-[20px]">
                    ✓ Account verified successfully
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Payment Details */}
          <div className={`bg-white border border-[#eaecf0] rounded-[12px] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] p-6 ${!isAccountValidated ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-8 h-8 ${isAccountValidated ? 'bg-[#003883]' : 'bg-[#d0d5dd]'} text-white rounded-full flex items-center justify-center`}>
                <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[14px]">2</span>
              </div>
              <h2 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[18px] text-[#101828] leading-[28px]">
                Payment Details
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* E-slip Number */}
              <div className="space-y-2">
                <Label className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#344054] leading-[20px]">
                  E-slip Number <span className="text-[#ee3148]">*</span>
                </Label>
                <Input
                  value={formData.eslipNumber}
                  onChange={(e) => handleInputChange('eslipNumber', e.target.value)}
                  placeholder="Enter E-slip number (e.g., KPA123SUCCESS)"
                  className={`h-[40px] border-[#d0d5dd] bg-white rounded-[8px] px-[12px] py-[8px] font-['Inter:Regular',_sans-serif] text-[16px] ${errors.eslipNumber ? 'border-[#ee3148]' : ''}`}
                />
                {errors.eslipNumber && (
                  <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#ee3148] leading-[20px] flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    {errors.eslipNumber}
                  </p>
                )}
                <div className="mt-2 p-2 bg-[#f9fafb] rounded-lg">
                  <p className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#667085] leading-[16px]">
                    <strong>Test E-slip Numbers:</strong><br />
                    • KPA123SUCCESS - Successful payment<br />
                    • KPA123FAIL - Insufficient funds error
                  </p>
                </div>
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <Label className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#344054] leading-[20px]">
                  Amount ({formData.currency}) <span className="text-[#ee3148]">*</span>
                </Label>
                <Input
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  placeholder="Enter payment amount"
                  type="number"
                  step="0.01"
                  min="0"
                  className={`h-[40px] border-[#d0d5dd] bg-white rounded-[8px] px-[12px] py-[8px] font-['Inter:Regular',_sans-serif] text-[16px] ${errors.amount ? 'border-[#ee3148]' : ''}`}
                />
                {errors.amount && (
                  <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#ee3148] leading-[20px] flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    {errors.amount}
                  </p>
                )}
              </div>
            </div>

            {/* Payment Summary */}
            {formData.amount && !errors.amount && parseFloat(formData.amount) > 0 && (
              <div className="mt-6 p-4 bg-[#f9fafb] border border-[#d0d5dd] rounded-lg">
                <h3 className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#101828] leading-[20px] mb-3">
                  Payment Summary
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#667085] leading-[20px]">Principal Amount:</span>
                    <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#344054] leading-[20px]">${parseFloat(formData.amount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#667085] leading-[20px]">Commission (2%):</span>
                    <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#344054] leading-[20px]">${(parseFloat(formData.amount) * 0.02).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#667085] leading-[20px]">Excise Duty (1%):</span>
                    <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#344054] leading-[20px]">${(parseFloat(formData.amount) * 0.01).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-[#d0d5dd] pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[#101828] leading-[20px]">Total Amount:</span>
                      <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[#101828] leading-[20px]">${(parseFloat(formData.amount) * 1.03).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
              disabled={!canSubmit}
              className="bg-[#003883] hover:bg-[#002664] text-white rounded-[8px] px-[16px] py-[10px] h-[44px] disabled:opacity-50 disabled:cursor-not-allowed flex-1 lg:flex-none lg:w-auto"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[16px] leading-[24px]">
                Submit Payment
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function KPACollectionsForm({ onSubmit, onBack, onUSSD, breadcrumbs, onBreadcrumbClick }: KPACollectionsFormProps) {
  return (
    <ServiceCentralLayout
      sidebarContent={<SidebarContent onUSSD={onUSSD} />}
      headerContent={<HeaderContent />}
    >
      <MainContent 
        onSubmit={onSubmit} 
        onBack={onBack} 
        onUSSD={onUSSD}
        breadcrumbs={breadcrumbs}
        onBreadcrumbClick={onBreadcrumbClick}
      />
    </ServiceCentralLayout>
  );
}