import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { AlertTriangle, XCircle, Wifi, RotateCcw, ArrowLeft, Phone } from 'lucide-react';
import type { ErrorType } from '../../App';

interface ErrorScreenProps {
  errorType: ErrorType | null;
  onRetry: () => void;
  onCancel: () => void;
}

export function ErrorScreen({ errorType, onRetry, onCancel }: ErrorScreenProps) {
  const getErrorConfig = () => {
    switch (errorType) {
      case 'validation-error':
        return {
          icon: XCircle,
          title: 'Validation Error',
          description: 'There was an error validating the request information.',
          details: [
            'Please check all required fields are completed',
            'Ensure customer information is correct',
            'Verify account number is valid'
          ],
          showRetry: true,
          color: '#ee3148'
        };
      case 'insufficient-balance':
        return {
          icon: AlertTriangle,
          title: 'Insufficient Account Balance',
          description: 'Customer account does not have sufficient balance for service charges.',
          details: [
            'Letter of Indebtedness service charges could not be deducted',
            'Customer needs to fund their account',
            'Contact customer to arrange payment'
          ],
          showRetry: true,
          color: '#ff8200'
        };
      case 'system-error':
        return {
          icon: Wifi,
          title: 'System Error',
          description: 'We are experiencing technical difficulties. Please try again or contact support.',
          details: [
            'This is a temporary system issue',
            'No charges have been applied',
            'Please try again in a few minutes'
          ],
          showRetry: true,
          color: '#ee3148'
        };
      case 'document-error':
        return {
          icon: AlertTriangle,
          title: 'Document Generation Error',
          description: 'Request was approved but there was an error generating the letter document.',
          details: [
            'The approval was recorded successfully',
            'Document generation service is temporarily unavailable',
            'Letter will be generated and sent once service is restored'
          ],
          showRetry: false,
          color: '#ff8200'
        };
      default:
        return {
          icon: XCircle,
          title: 'Unknown Error',
          description: 'An unexpected error occurred.',
          details: ['Please try again or contact support'],
          showRetry: true,
          color: '#ee3148'
        };
    }
  };

  const errorConfig = getErrorConfig();
  const ErrorIcon = errorConfig.icon;

  return (
    <div className="min-h-screen bg-[#f3f3f5] flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <Card className="bg-white border-[#d0d5dd] shadow-sm p-8 text-center">
          <div className="flex flex-col items-center space-y-6">
            {/* Error Icon */}
            <div className="relative">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${errorConfig.color}15` }}
              >
                <ErrorIcon 
                  className="h-8 w-8" 
                  style={{ color: errorConfig.color }}
                />
              </div>
            </div>

            {/* Title and Description */}
            <div className="space-y-2">
              <h2 className="text-[24px] font-semibold text-[#101828]" style={{fontFamily: 'Inter'}}>
                {errorConfig.title}
              </h2>
              <p className="text-[#667085]" style={{fontFamily: 'Inter'}}>
                {errorConfig.description}
              </p>
            </div>

            {/* Error Details */}
            <div className="w-full bg-[#f3f3f5] rounded-lg p-4 text-left">
              <h4 className="font-medium text-[#101828] mb-3" style={{fontFamily: 'Inter'}}>
                What you can do:
              </h4>
              <ul className="space-y-2">
                {errorConfig.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[#526484] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-[14px] text-[#344054]" style={{fontFamily: 'Inter'}}>
                      {detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Error Code */}
            <div className="text-center">
              <p className="text-[12px] text-[#667085]" style={{fontFamily: 'Inter'}}>
                Error Code: {errorType?.toUpperCase().replace('-', '_')}_001 | Timestamp: {new Date().toLocaleString()}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 w-full">
              <Button
                variant="outline"
                onClick={onCancel}
                className="flex-1 h-10 border-[#d0d5dd] text-[#344054] hover:bg-[#f3f3f5]"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              
              {errorConfig.showRetry && (
                <Button
                  onClick={onRetry}
                  className="flex-1 h-10 bg-[#003883] hover:bg-[#002664] text-white"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              )}
            </div>

            {/* Contact Support */}
            <Card className="bg-[#ebeef2] border-[#003883] p-4 w-full">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#003883]" />
                <div className="text-left">
                  <h4 className="font-medium text-[#003883]" style={{fontFamily: 'Inter'}}>
                    Need Help?
                  </h4>
                  <p className="text-[14px] text-[#526484]" style={{fontFamily: 'Inter'}}>
                    Contact Support: +254-700-000-000 | support@accessbank.co.ke
                  </p>
                </div>
              </div>
            </Card>

            {/* Security Notice for System Errors */}
            {(errorType === 'system-error' || errorType === 'notification-error') && (
              <div className="text-center">
                <p className="text-[12px] text-[#21a366]" style={{fontFamily: 'Inter'}}>
                  ✓ Your account security has not been compromised
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}