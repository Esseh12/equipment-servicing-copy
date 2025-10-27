import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ArrowLeft, Download, Printer, Share, CheckCircle, Building, Shield } from 'lucide-react';
import type { PaymentData } from '../../App';

interface ReceiptViewProps {
  paymentData: PaymentData | null;
  onBack: () => void;
}

export function ReceiptView({ paymentData, onBack }: ReceiptViewProps) {
  if (!paymentData) return null;

  const totalAmount = parseFloat(paymentData.amount) + parseFloat(paymentData.commission) + parseFloat(paymentData.exciseDuty);

  const handleDownload = () => {
    // Simulate PDF download
    const blob = new Blob(['Receipt content would be here'], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `KPA_Receipt_${paymentData.eslipNumber}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'KPA Payment Receipt',
        text: `Payment receipt for ${paymentData.eslipNumber}`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f3f5]">
      {/* Header */}
      <div className="bg-white border-b border-[#d0d5dd] px-6 py-4 print:hidden">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-[#526484] hover:text-[#003883] hover:bg-[#ebeef2]"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2 text-[#667085]" style={{fontFamily: 'Inter'}}>
              <span>Payment</span>
              <span>›</span>
              <span className="text-[#101828] font-medium">Receipt</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handlePrint}
              className="border-[#d0d5dd] text-[#344054] hover:bg-[#f3f3f5]"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button
              variant="outline"
              onClick={handleShare}
              className="border-[#d0d5dd] text-[#344054] hover:bg-[#f3f3f5]"
            >
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button
              onClick={handleDownload}
              className="bg-[#003883] hover:bg-[#002664] text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Receipt */}
      <div className="p-6 max-w-4xl mx-auto">
        <Card className="bg-white border-[#d0d5dd] shadow-lg print:shadow-none print:border-none">
          <div className="p-8">
            {/* Header */}
            <div className="text-center border-b border-[#d0d5dd] pb-6 mb-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-8 w-8 text-[#003883]" />
                  <div className="text-left">
                    <h2 className="text-[20px] font-semibold text-[#003883]" style={{fontFamily: 'Inter'}}>
                      Access Bank Kenya
                    </h2>
                    <p className="text-[14px] text-[#667085]" style={{fontFamily: 'Inter'}}>
                      Service Central Portal
                    </p>
                  </div>
                </div>
                <div className="w-px h-12 bg-[#d0d5dd]"></div>
                <div className="flex items-center gap-2">
                  <Building className="h-8 w-8 text-[#526484]" />
                  <div className="text-left">
                    <h2 className="text-[20px] font-semibold text-[#526484]" style={{fontFamily: 'Inter'}}>
                      Kenya Ports Authority
                    </h2>
                    <p className="text-[14px] text-[#667085]" style={{fontFamily: 'Inter'}}>
                      Payment Receipt
                    </p>
                  </div>
                </div>
              </div>
              
              <h1 className="text-[24px] font-semibold text-[#101828] mb-2" style={{fontFamily: 'Inter'}}>
                OFFICIAL PAYMENT RECEIPT
              </h1>
              <div className="flex items-center justify-center gap-2 text-[#21a366]">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium" style={{fontFamily: 'Inter'}}>Payment Successful</span>
              </div>
            </div>

            {/* Receipt Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-[16px] font-semibold text-[#101828] mb-3" style={{fontFamily: 'Inter'}}>
                    Transaction Information
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#667085]" style={{fontFamily: 'Inter'}}>Transaction ID:</span>
                      <span className="font-mono text-[#101828]">{paymentData.transactionId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#667085]" style={{fontFamily: 'Inter'}}>E-slip Number:</span>
                      <span className="font-mono text-[#101828]">{paymentData.eslipNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#667085]" style={{fontFamily: 'Inter'}}>Date & Time:</span>
                      <span className="text-[#101828]" style={{fontFamily: 'Inter'}}>{paymentData.dateTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#667085]" style={{fontFamily: 'Inter'}}>Status:</span>
                      <span className="text-[#21a366] font-medium" style={{fontFamily: 'Inter'}}>
                        {paymentData.status === 'success' ? 'PAID' : 'FAILED'}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[16px] font-semibold text-[#101828] mb-3" style={{fontFamily: 'Inter'}}>
                    Customer Information
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#667085]" style={{fontFamily: 'Inter'}}>Customer Name:</span>
                      <span className="text-[#101828]" style={{fontFamily: 'Inter'}}>{paymentData.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#667085]" style={{fontFamily: 'Inter'}}>Payment Channel:</span>
                      <span className="text-[#101828]" style={{fontFamily: 'Inter'}}>Digital Banking</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <h3 className="text-[16px] font-semibold text-[#101828] mb-3" style={{fontFamily: 'Inter'}}>
                  Payment Breakdown
                </h3>
                <div className="bg-[#f3f3f5] rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#667085]" style={{fontFamily: 'Inter'}}>Principal Amount:</span>
                    <span className="text-[#101828]" style={{fontFamily: 'Inter'}}>${parseFloat(paymentData.amount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#667085]" style={{fontFamily: 'Inter'}}>Bank Commission (2%):</span>
                    <span className="text-[#101828]" style={{fontFamily: 'Inter'}}>${parseFloat(paymentData.commission).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#667085]" style={{fontFamily: 'Inter'}}>Excise Duty (1%):</span>
                    <span className="text-[#101828]" style={{fontFamily: 'Inter'}}>${parseFloat(paymentData.exciseDuty).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-[#d0d5dd] pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-[#101828]" style={{fontFamily: 'Inter'}}>Total Amount Debited:</span>
                      <span className="font-semibold text-[#101828] text-[18px]" style={{fontFamily: 'Inter'}}>${totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Information */}
            <div className="border border-[#d0d5dd] rounded-lg p-4 bg-[#f9fafb] mb-6">
              <h4 className="font-semibold text-[#101828] mb-2" style={{fontFamily: 'Inter'}}>
                Important Information:
              </h4>
              <ul className="text-[14px] text-[#344054] space-y-1" style={{fontFamily: 'Inter'}}>
                <li>• This receipt serves as proof of payment to Kenya Ports Authority</li>
                <li>• Payment processing may take up to 24 hours to reflect in KPA systems</li>
                <li>• For any inquiries, contact Access Bank Customer Service: +254-700-000-000</li>
                <li>• Keep this receipt for your records until payment is confirmed by KPA</li>
              </ul>
            </div>

            {/* Footer */}
            <div className="border-t border-[#d0d5dd] pt-6 text-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[12px] text-[#667085]" style={{fontFamily: 'Inter'}}>
                <div>
                  <p className="font-medium text-[#101828] mb-1">Access Bank Kenya</p>
                  <p>Westlands Road, Nairobi</p>
                  <p>customercare@accessbankplc.com</p>
                </div>
                <div>
                  <p className="font-medium text-[#101828] mb-1">Security Features</p>
                  <p>✓ SSL Encrypted Transaction</p>
                  <p>✓ PCI DSS Compliant</p>
                </div>
                <div>
                  <p className="font-medium text-[#101828] mb-1">Support</p>
                  <p>24/7 Customer Support</p>
                  <p>+254-700-000-000</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-[#f3f3f5]">
                <p className="text-[10px] text-[#667085]" style={{fontFamily: 'Inter'}}>
                  This is a computer-generated receipt and does not require a signature. 
                  Receipt ID: RCP-{paymentData.transactionId}-{Date.now()}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}