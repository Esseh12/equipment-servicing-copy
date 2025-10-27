import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { CheckCircle, Download, History, FileText, ArrowLeft, Calculator } from 'lucide-react';
import type { PaymentData, UserRole } from '../../App';

interface ConfirmationScreenProps {
  paymentData: PaymentData | null;
  userRole: UserRole;
  onViewReceipt: () => void;
  onViewHistory: () => void;
  onViewAccounting?: () => void;
  onBackToDashboard: () => void;
}

export function ConfirmationScreen({ 
  paymentData, 
  userRole, 
  onViewReceipt, 
  onViewHistory, 
  onViewAccounting,
  onBackToDashboard 
}: ConfirmationScreenProps) {
  if (!paymentData) return null;

  const totalAmount = parseFloat(paymentData.amount) + parseFloat(paymentData.commission) + parseFloat(paymentData.exciseDuty);

  return (
    <div className="min-h-screen bg-[#f3f3f5]">
      {/* Header */}
      <div className="bg-white border-b border-[#d0d5dd] px-6 py-4">
        <div className="flex items-center gap-4 max-w-6xl mx-auto">
          <Button
            variant="ghost"
            onClick={onBackToDashboard}
            className="text-[#526484] hover:text-[#003883] hover:bg-[#ebeef2]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-2 text-[#667085]" style={{fontFamily: 'Inter'}}>
            <span>{userRole === 'customer' ? 'Customer Portal' : 'Staff Portal'}</span>
            <span>›</span>
            <span className="text-[#101828] font-medium">Payment Confirmation</span>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-20 h-20 bg-[#21a366] rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-[30px] font-semibold text-[#101828] mb-2" style={{fontFamily: 'Inter'}}>
            Payment Successful
          </h1>
          <p className="text-[#667085]" style={{fontFamily: 'Inter'}}>
            Your KPA payment has been processed successfully
          </p>
        </div>

        {/* Payment Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Transaction Summary */}
          <Card className="bg-white border-[#d0d5dd] p-6">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-6 w-6 text-[#003883]" />
              <h2 className="text-[18px] font-semibold text-[#101828]" style={{fontFamily: 'Inter'}}>
                Transaction Summary
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-[#f3f3f5]">
                <span className="text-[#667085]" style={{fontFamily: 'Inter'}}>Transaction ID</span>
                <span className="font-medium text-[#101828]" style={{fontFamily: 'Inter'}}>{paymentData.transactionId}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#f3f3f5]">
                <span className="text-[#667085]" style={{fontFamily: 'Inter'}}>E-slip Number</span>
                <span className="font-medium text-[#101828]" style={{fontFamily: 'Inter'}}>{paymentData.eslipNumber}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#f3f3f5]">
                <span className="text-[#667085]" style={{fontFamily: 'Inter'}}>Customer Name</span>
                <span className="font-medium text-[#101828]" style={{fontFamily: 'Inter'}}>{paymentData.customerName}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#f3f3f5]">
                <span className="text-[#667085]" style={{fontFamily: 'Inter'}}>Date & Time</span>
                <span className="font-medium text-[#101828]" style={{fontFamily: 'Inter'}}>{paymentData.dateTime}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-[#667085]" style={{fontFamily: 'Inter'}}>Status</span>
                <Badge className="bg-[#21a366] text-white">Success</Badge>
              </div>
            </div>
          </Card>

          {/* Amount Breakdown */}
          <Card className="bg-white border-[#d0d5dd] p-6">
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="h-6 w-6 text-[#003883]" />
              <h2 className="text-[18px] font-semibold text-[#101828]" style={{fontFamily: 'Inter'}}>
                Amount Breakdown
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-[#667085]" style={{fontFamily: 'Inter'}}>Principal Amount</span>
                <span className="font-medium text-[#101828]" style={{fontFamily: 'Inter'}}>${parseFloat(paymentData.amount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-[#667085]" style={{fontFamily: 'Inter'}}>Commission (2%)</span>
                <span className="font-medium text-[#101828]" style={{fontFamily: 'Inter'}}>${parseFloat(paymentData.commission).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#f3f3f5]">
                <span className="text-[#667085]" style={{fontFamily: 'Inter'}}>Excise Duty (1%)</span>
                <span className="font-medium text-[#101828]" style={{fontFamily: 'Inter'}}>${parseFloat(paymentData.exciseDuty).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2 bg-[#f3f3f5] rounded-lg px-3">
                <span className="font-semibold text-[#101828]" style={{fontFamily: 'Inter'}}>Total Amount Debited</span>
                <span className="font-semibold text-[#101828] text-[20px]" style={{fontFamily: 'Inter'}}>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button
            onClick={onViewReceipt}
            className="h-12 bg-[#003883] hover:bg-[#002664] text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Receipt
          </Button>
          
          <Button
            onClick={onViewHistory}
            variant="outline"
            className="h-12 border-[#d0d5dd] text-[#344054] hover:bg-[#f3f3f5]"
          >
            <History className="h-4 w-4 mr-2" />
            View History
          </Button>

          {userRole === 'staff' && onViewAccounting && (
            <Button
              onClick={onViewAccounting}
              variant="outline"
              className="h-12 border-[#d0d5dd] text-[#344054] hover:bg-[#f3f3f5]"
            >
              <Calculator className="h-4 w-4 mr-2" />
              View Accounting
            </Button>
          )}
        </div>

        {/* Next Steps */}
        <Card className="bg-white border-[#d0d5dd] p-6">
          <h3 className="text-[18px] font-semibold text-[#101828] mb-4" style={{fontFamily: 'Inter'}}>
            What happens next?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#003883] text-white rounded-full flex items-center justify-center font-semibold text-[14px]">1</div>
              <div>
                <h4 className="font-medium text-[#101828] mb-1" style={{fontFamily: 'Inter'}}>SMS Confirmation</h4>
                <p className="text-[14px] text-[#667085]" style={{fontFamily: 'Inter'}}>You will receive an SMS confirmation shortly</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#526484] text-white rounded-full flex items-center justify-center font-semibold text-[14px]">2</div>
              <div>
                <h4 className="font-medium text-[#101828] mb-1" style={{fontFamily: 'Inter'}}>Email Receipt</h4>
                <p className="text-[14px] text-[#667085]" style={{fontFamily: 'Inter'}}>Detailed receipt will be emailed to your registered address</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#21a366] text-white rounded-full flex items-center justify-center font-semibold text-[14px]">3</div>
              <div>
                <h4 className="font-medium text-[#101828] mb-1" style={{fontFamily: 'Inter'}}>KPA Processing</h4>
                <p className="text-[14px] text-[#667085]" style={{fontFamily: 'Inter'}}>KPA will process your payment within 24 hours</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}