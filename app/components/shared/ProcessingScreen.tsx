import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { Loader2, ArrowRightLeft, Building, Banknote, FileText } from 'lucide-react';

export function ProcessingScreen() {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: ArrowRightLeft, label: 'Processing debit entries', description: 'Debiting customer account...' },
    { icon: Building, label: 'Processing credit entries', description: 'Crediting collection accounts...' },
    { icon: Banknote, label: 'Recording commission', description: 'Updating commission records...' },
    { icon: FileText, label: 'Finalizing transaction', description: 'Generating receipt and confirmations...' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        clearInterval(stepInterval);
        return prev;
      });
    }, 750);

    return () => clearInterval(stepInterval);
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f3f5] flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <Card className="bg-white border-[#d0d5dd] shadow-sm p-8 text-center">
          <div className="flex flex-col items-center space-y-6">
            {/* Main Loading Animation */}
            <div className="relative">
              <div className="w-24 h-24 bg-[#ebeef2] rounded-full flex items-center justify-center">
                <Loader2 className="h-10 w-10 text-[#003883] animate-spin" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#ff8200] rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h2 className="text-[24px] font-semibold text-[#101828]" style={{fontFamily: 'Inter'}}>
                Processing Payment
              </h2>
              <p className="text-[#667085]" style={{fontFamily: 'Inter'}}>
                Processing debit and credit entries...
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full space-y-2">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-[12px] text-[#667085]" style={{fontFamily: 'Inter'}}>
                <span>Processing...</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>

            {/* Processing Steps */}
            <div className="w-full space-y-3">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-500 ${
                      isActive ? 'bg-[#ebeef2] border border-[#003883]' : 
                      isCompleted ? 'bg-[#f3f3f5]' : 'bg-[#f3f3f5] opacity-50'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      isActive ? 'bg-[#003883]' : 
                      isCompleted ? 'bg-[#21a366]' : 'bg-[#d0d5dd]'
                    }`}>
                      {isActive ? (
                        <Loader2 className="h-4 w-4 text-white animate-spin" />
                      ) : (
                        <StepIcon className={`h-4 w-4 ${
                          isCompleted ? 'text-white' : 'text-[#667085]'
                        }`} />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <p className={`text-[14px] font-medium ${
                        isActive ? 'text-[#003883]' : 
                        isCompleted ? 'text-[#21a366]' : 'text-[#667085]'
                      }`} style={{fontFamily: 'Inter'}}>
                        {step.label}
                      </p>
                      {isActive && (
                        <p className="text-[12px] text-[#526484]" style={{fontFamily: 'Inter'}}>
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Accounting Details */}
            <div className="w-full bg-[#f3f3f5] rounded-lg p-4 space-y-2">
              <h4 className="font-medium text-[#101828] text-center mb-3" style={{fontFamily: 'Inter'}}>
                Transaction Details
              </h4>
              <div className="space-y-1 text-[12px]" style={{fontFamily: 'Inter'}}>
                <div className="flex justify-between">
                  <span className="text-[#667085]">Dr Customer Account</span>
                  <span className="text-[#344054]">Principal + Commission + Duty</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#667085]">Cr Collection Account</span>
                  <span className="text-[#344054]">Principal (USD)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#667085]">Cr Commission GL</span>
                  <span className="text-[#344054]">Commission Amount</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#667085]">Cr Excise Duty GL</span>
                  <span className="text-[#344054]">Duty Amount</span>
                </div>
              </div>
            </div>

            {/* Status Message */}
            <div className="text-center">
              <p className="text-[14px] text-[#667085]" style={{fontFamily: 'Inter'}}>
                Please do not close this window or navigate away
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}