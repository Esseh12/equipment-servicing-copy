import { Card } from '../ui/card';
import { Loader2, Shield, CheckCircle2 } from 'lucide-react';

interface ValidationScreenProps {
  isLoading: boolean;
}

export function ValidationScreen({ isLoading }: ValidationScreenProps) {
  return (
    <div className="min-h-screen bg-[#f3f3f5] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="bg-white border-[#d0d5dd] shadow-sm p-8 text-center">
          <div className="flex flex-col items-center space-y-6">
            {/* Loading Animation */}
            <div className="relative">
              <div className="w-20 h-20 bg-[#ebeef2] rounded-full flex items-center justify-center">
                {isLoading ? (
                  <Loader2 className="h-8 w-8 text-[#003883] animate-spin" />
                ) : (
                  <CheckCircle2 className="h-8 w-8 text-[#21a366]" />
                )}
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h2 className="text-[24px] font-semibold text-[#101828]" style={{fontFamily: 'Inter'}}>
                {isLoading ? 'Validating Request' : 'Validation Complete'}
              </h2>
              <p className="text-[#667085]" style={{fontFamily: 'Inter'}}>
                {isLoading ? 'Please wait while we validate your request details...' : 'Request details verified successfully'}
              </p>
            </div>

            {/* Validation Steps */}
            <div className="w-full space-y-3">
              <div className="flex items-center gap-3 p-3 bg-[#f3f3f5] rounded-lg">
                <CheckCircle2 className="h-4 w-4 text-[#21a366]" />
                <span className="text-[14px] text-[#344054]" style={{fontFamily: 'Inter'}}>
                  Customer information verified
                </span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-[#f3f3f5] rounded-lg">
                {isLoading ? (
                  <Loader2 className="h-4 w-4 text-[#003883] animate-spin" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-[#21a366]" />
                )}
                <span className="text-[14px] text-[#344054]" style={{fontFamily: 'Inter'}}>
                  Account database lookup
                </span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[#f3f3f5] rounded-lg">
                {isLoading ? (
                  <div className="h-4 w-4 border-2 border-[#d0d5dd] rounded-full" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-[#21a366]" />
                )}
                <span className="text-[14px] text-[#667085]" style={{fontFamily: 'Inter'}}>
                  Customer mandate validation
                </span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[#f3f3f5] rounded-lg">
                {isLoading ? (
                  <div className="h-4 w-4 border-2 border-[#d0d5dd] rounded-full" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-[#21a366]" />
                )}
                <span className="text-[14px] text-[#667085]" style={{fontFamily: 'Inter'}}>
                  Security checks complete
                </span>
              </div>
            </div>

            {/* Security Notice */}
            <div className="flex items-center gap-3 p-4 bg-[#ebeef2] rounded-lg w-full">
              <Shield className="h-5 w-5 text-[#003883]" />
              <div className="text-left">
                <h4 className="font-medium text-[#003883]" style={{fontFamily: 'Inter'}}>
                  Secure Validation
                </h4>
                <p className="text-[12px] text-[#526484]" style={{fontFamily: 'Inter'}}>
                  All validations are performed through encrypted channels
                </p>
              </div>
            </div>

            {/* Progress Indicator */}
            {isLoading && (
              <div className="w-full">
                <div className="flex justify-between text-[12px] text-[#667085] mb-2" style={{fontFamily: 'Inter'}}>
                  <span>Validating...</span>
                  <span>Step 2 of 4</span>
                </div>
                <div className="w-full bg-[#f3f3f5] rounded-full h-2">
                  <div className="bg-[#003883] h-2 rounded-full w-1/2 transition-all duration-1000"></div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}