import { useState } from 'react';
import { ServiceCentralLayout } from '../ServiceCentralLayout';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Home, ChevronRight, Smartphone, Send, ArrowDown, CreditCard, Lock } from 'lucide-react';
import accessLogo from 'figma:asset/3ebf5c44175bf36c1eceb7236d272904dfc164a1.png';

interface USSDFlowProps {
  onBack: () => void;
}

type USSDStep = 'menu' | 'eslip' | 'amount' | 'confirm' | 'processing' | 'result';

interface ConversationMessage {
  type: 'sent' | 'received';
  message: string;
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
          {/* Pay KPA */}
          <div 
            onClick={onBack}
            className="h-[44px] rounded-[6px] flex items-center px-[12px] gap-[12px] hover:bg-[#ebeef2] cursor-pointer"
          >
            <CreditCard className="h-[20px] w-[20px] text-[#526484]" />
            <span className="font-['DM_Sans:Bold',_sans-serif] font-bold text-[15px] text-[#526484] leading-[20px] tracking-[0.15px]">
              Pay KPA
            </span>
          </div>

          {/* USSD - Active */}
          <div className="bg-[#ebeef2] h-[44px] rounded-[6px] flex items-center px-[12px] gap-[12px]">
            <div className="h-[20px] w-[20px] text-[#003883]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V3zM2 8a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V8zM7 13a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1H8a1 1 0 01-1-1v-2zM12 8a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8z" fill="currentColor" />
              </svg>
            </div>
            <span className="font-['DM_Sans:Bold',_sans-serif] font-bold text-[15px] text-[#003883] leading-[20px] tracking-[0.15px]">
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

// Header Content
function HeaderContent() {
  return <div className="h-full" />;
}

// Main Content
function MainContent({ onBack }: USSDFlowProps) {
  const [currentStep, setCurrentStep] = useState<USSDStep>('menu');
  const [eslipNumber, setEslipNumber] = useState('');
  const [amount, setAmount] = useState('');
  
  const initialMessage: ConversationMessage = {
    type: 'received',
    message: '*483*7# KPA Payment Service\n\n1. Pay KPA\n2. Check Balance\n3. Transaction History\n4. Exit\n\nReply with option number:'
  };
  
  const [conversation, setConversation] = useState<ConversationMessage[]>([initialMessage]);

  const addMessage = (type: 'sent' | 'received', message: string) => {
    setConversation(prev => [...prev, { type, message }]);
  };

  const handleMenuSelection = (option: string) => {
    addMessage('sent', option);
    
    if (option === '1') {
      addMessage('received', 'KPA Payment\n\nEnter E-slip number (e.g., KPA123456789):');
      setCurrentStep('eslip');
    } else if (option === '2') {
      addMessage('received', 'Account Balance: $5,847.32\n\nPress 0 to return to main menu');
    } else if (option === '3') {
      addMessage('received', 'Last 3 Transactions:\n\nKPA123456: $2,500 - Success\nKPA987654: $1,850 - Success\nKPA555666: $3,200 - Success\n\nPress 0 to return to main menu');
    } else if (option === '4') {
      addMessage('received', 'Thank you for using KPA Payment Service');
    }
  };

  const handleEslipSubmit = (eslip: string) => {
    addMessage('sent', eslip);
    
    if (!eslip.startsWith('KPA')) {
      addMessage('received', 'Invalid E-slip format. Please enter a valid KPA reference number:');
    } else {
      setEslipNumber(eslip);
      addMessage('received', 'Enter payment amount (USD):');
      setCurrentStep('amount');
    }
  };

  const handleAmountSubmit = (amt: string) => {
    addMessage('sent', amt);
    
    const numAmount = parseFloat(amt);
    if (isNaN(numAmount) || numAmount <= 0) {
      addMessage('received', 'Invalid amount. Please enter a valid amount in USD:');
    } else {
      setAmount(amt);
      const commission = (numAmount * 0.02).toFixed(2);
      const duty = (numAmount * 0.01).toFixed(2);
      const total = (numAmount * 1.03).toFixed(2);
      
      addMessage('received', `Payment Summary:\n\nE-slip: ${eslipNumber}\nPrincipal: $${amt}\nCommission: $${commission}\nExcise Duty: $${duty}\nTotal: $${total}\n\n1. Confirm Payment\n2. Cancel\n\nReply with option:`);
      setCurrentStep('confirm');
    }
  };

  const handleConfirmation = (option: string) => {
    addMessage('sent', option);
    
    if (option === '1') {
      addMessage('received', 'Processing payment...');
      setCurrentStep('processing');
      
      setTimeout(() => {
        const success = Math.random() > 0.1; // 90% success rate
        
        if (success) {
          const transactionId = `TXN${Date.now()}`;
          addMessage('received', `Payment Successful!\n\nTransaction ID: ${transactionId}\nE-slip: ${eslipNumber}\nAmount: $${amount}\nStatus: Completed\n\nSMS receipt will be sent shortly.\n\nPress 0 for main menu`);
        } else {
          addMessage('received', `Payment Failed!\n\nReason: Insufficient funds or system error\n\nPlease try again or contact support.\n\nPress 0 for main menu`);
        }
        setCurrentStep('result');
      }, 3000);
    } else if (option === '2') {
      addMessage('received', 'Payment cancelled.\n\nPress 0 to return to main menu');
      setCurrentStep('menu');
    }
  };

  const handleInput = (input: string) => {
    switch (currentStep) {
      case 'menu':
        handleMenuSelection(input);
        break;
      case 'eslip':
        handleEslipSubmit(input);
        break;
      case 'amount':
        handleAmountSubmit(input);
        break;
      case 'confirm':
        handleConfirmation(input);
        break;
    }
  };

  return (
    <div className="w-full h-full bg-white overflow-y-auto">
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        {/* Breadcrumbs */}
        <div className="flex gap-[12px] items-center mb-4 lg:mb-6">
          <div className="flex items-center gap-[12px]">
            <Home className="h-[20px] w-[20px] text-[#667085]" />
            <ChevronRight className="h-[16px] w-[16px] text-[#d0d5dd]" />
            <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[14px] text-[#003883] leading-[20px]">
              USSD Payment
            </div>
          </div>
        </div>

        {/* Page Title */}
        <div className="flex flex-col gap-[4px] mb-6 lg:mb-8">
          <h1 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[24px] lg:text-[30px] text-[#101828] leading-[32px] lg:leading-[38px]">
            USSD Payment Service
          </h1>
          <p className="font-['Inter:Regular',_sans-serif] font-normal text-[14px] lg:text-[16px] text-[#475467] leading-[20px] lg:leading-[24px]">
            Access KPA payment services through your mobile phone using USSD codes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* USSD Simulator */}
          <div className="bg-white border border-[#eaecf0] rounded-[12px] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] p-4 lg:p-6">
            <div className="flex items-center gap-3 mb-6">
              <Smartphone className="h-6 w-6 text-[#003883]" />
              <h2 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[18px] text-[#101828] leading-[28px]">
                USSD Simulator
              </h2>
            </div>

            {/* Phone Screen */}
            <div className="bg-black rounded-2xl p-4 lg:p-6 text-green-400 font-mono text-[12px] lg:text-[14px] min-h-[300px] lg:min-h-[400px] max-h-[400px] lg:max-h-[500px] overflow-y-auto">
              <div className="space-y-4">
                {conversation.map((msg, index) => (
                  <div key={index}>
                    {msg.type === 'received' && (
                      <div className="whitespace-pre-line text-green-400">
                        {msg.message}
                      </div>
                    )}
                    {msg.type === 'sent' && (
                      <div className="text-yellow-300">
                        {msg.message}
                      </div>
                    )}
                  </div>
                ))}
                
                {currentStep === 'processing' && (
                  <div className="text-green-400 animate-pulse">
                    Processing...
                  </div>
                )}
              </div>
            </div>

            {/* Input Area */}
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleInput('1')}
                  className="border-[#d0d5dd] text-[#344054] hover:bg-[#f3f3f5] h-[44px]"
                  disabled={currentStep === 'processing'}
                >
                  1
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleInput('2')}
                  className="border-[#d0d5dd] text-[#344054] hover:bg-[#f3f3f5] h-[44px]"
                  disabled={currentStep === 'processing'}
                >
                  2
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleInput('3')}
                  className="border-[#d0d5dd] text-[#344054] hover:bg-[#f3f3f5] h-[44px]"
                  disabled={currentStep === 'processing'}
                >
                  3
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleInput('4')}
                  className="border-[#d0d5dd] text-[#344054] hover:bg-[#f3f3f5] h-[44px]"
                  disabled={currentStep === 'processing'}
                >
                  4
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleInput('0')}
                  className="border-[#d0d5dd] text-[#344054] hover:bg-[#f3f3f5] h-[44px]"
                  disabled={currentStep === 'processing'}
                >
                  0
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleInput('*')}
                  className="border-[#d0d5dd] text-[#344054] hover:bg-[#f3f3f5] h-[44px]"
                  disabled={currentStep === 'processing'}
                >
                  *
                </Button>
              </div>

              {/* Custom Input for E-slip and Amount */}
              {(currentStep === 'eslip' || currentStep === 'amount') && (
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder={currentStep === 'eslip' ? 'Enter E-slip number' : 'Enter amount'}
                    className="w-full p-3 border border-[#d0d5dd] rounded-lg text-[#101828] placeholder:text-[#667085] font-['Inter:Regular',_sans-serif] text-[16px]"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleInput((e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                  />
                  <p className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#667085] leading-[16px] mt-1">
                    Press Enter to send
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Instructions & Information */}
          <div className="space-y-6">
            {/* How to Access */}
            <div className="bg-white border border-[#eaecf0] rounded-[12px] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] p-4 lg:p-6">
              <h3 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[18px] text-[#101828] leading-[28px] mb-4">
                How to Access USSD Service
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#003883] text-white rounded-full flex items-center justify-center font-semibold text-[12px] shrink-0">1</div>
                  <div>
                    <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#344054] leading-[20px]">
                      Dial <strong>*483*7#</strong> from your registered mobile number
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#526484] text-white rounded-full flex items-center justify-center font-semibold text-[12px] shrink-0">2</div>
                  <div>
                    <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#344054] leading-[20px]">
                      Follow the menu prompts to select "Pay KPA"
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#8094AE] text-white rounded-full flex items-center justify-center font-semibold text-[12px] shrink-0">3</div>
                  <div>
                    <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#344054] leading-[20px]">
                      Enter your E-slip number and payment amount when prompted
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#21a366] text-white rounded-full flex items-center justify-center font-semibold text-[12px] shrink-0">4</div>
                  <div>
                    <p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#344054] leading-[20px]">
                      Confirm your payment and receive instant SMS confirmation
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* USSD Menu Structure */}
            <div className="bg-white border border-[#eaecf0] rounded-[12px] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] p-4 lg:p-6">
              <h3 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[18px] text-[#101828] leading-[28px] mb-4">
                USSD Menu Options
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-[#f3f3f5] rounded-lg">
                  <span className="font-mono text-[#003883] font-semibold">1</span>
                  <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#344054] leading-[20px]">Pay KPA - Make KPA payments</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#f3f3f5] rounded-lg">
                  <span className="font-mono text-[#526484] font-semibold">2</span>
                  <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#344054] leading-[20px]">Check Balance - View account balance</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#f3f3f5] rounded-lg">
                  <span className="font-mono text-[#8094AE] font-semibold">3</span>
                  <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#344054] leading-[20px]">Transaction History - Recent payments</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#f3f3f5] rounded-lg">
                  <span className="font-mono text-[#667085] font-semibold">4</span>
                  <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#344054] leading-[20px]">Exit - End USSD session</span>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-[#ebeef2] border border-[#003883] rounded-[12px] p-4 lg:p-6">
              <h3 className="font-['Inter:Medium',_sans-serif] font-medium text-[#003883] leading-[20px] mb-3">
                USSD Payment Benefits
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#003883] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#526484] leading-[20px]">Works on any mobile phone (no smartphone required)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#003883] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#526484] leading-[20px]">No internet connection needed</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#003883] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#526484] leading-[20px]">Instant confirmation via SMS</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#003883] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#526484] leading-[20px]">Available 24/7</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function USSDFlow({ onBack }: USSDFlowProps) {
  return (
    <ServiceCentralLayout
      sidebarContent={<SidebarContent onBack={onBack} />}
      headerContent={<HeaderContent />}
    >
      <MainContent onBack={onBack} />
    </ServiceCentralLayout>
  );
}