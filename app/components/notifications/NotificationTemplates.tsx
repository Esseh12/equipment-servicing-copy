import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ArrowLeft, MessageSquare, Mail, Send, Copy, CheckCircle, Building, Shield } from 'lucide-react';
import type { PaymentData } from '../../App';

interface NotificationTemplatesProps {
  paymentData: PaymentData | null;
  onBack: () => void;
}

export function NotificationTemplates({ paymentData, onBack }: NotificationTemplatesProps) {
  const [copiedSMS, setCopiedSMS] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Mock payment data for demonstration if none provided
  const mockPaymentData = {
    eslipNumber: 'KPA123456789',
    amount: '2500.00',
    commission: '50.00',
    exciseDuty: '25.00',
    customerName: 'John Doe',
    dateTime: new Date().toLocaleString(),
    transactionId: 'TXN1703845200001',
    status: 'success' as const
  };

  const data = paymentData || mockPaymentData;
  const totalAmount = parseFloat(data.amount) + parseFloat(data.commission) + parseFloat(data.exciseDuty);

  const smsTemplate = `Your payment of $${totalAmount.toFixed(2)} with reference ${data.eslipNumber} has been successfully processed. Transaction ID: ${data.transactionId}. Thank you for using Access Bank KPA Payment Service.`;

  const emailTemplate = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>KPA Payment Confirmation</title>
    <style>
        body { font-family: Inter, Arial, sans-serif; margin: 0; padding: 20px; background-color: #f3f3f5; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #003883 0%, #526484 100%); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; }
        .success-badge { display: inline-flex; align-items: center; gap: 8px; background: #dcfce7; color: #166534; padding: 8px 16px; border-radius: 20px; font-weight: 500; margin-bottom: 20px; }
        .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .details-table td { padding: 12px 0; border-bottom: 1px solid #f3f3f5; }
        .details-table .label { color: #667085; width: 40%; }
        .details-table .value { color: #101828; font-weight: 500; }
        .amount-breakdown { background: #f3f3f5; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .total-amount { background: #003883; color: white; padding: 15px; border-radius: 6px; text-align: center; margin-top: 10px; }
        .footer { background: #f3f3f5; padding: 20px; text-align: center; color: #667085; font-size: 14px; }
        .support-info { background: #ebeef2; border: 1px solid #003883; padding: 15px; border-radius: 6px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Payment Confirmation</h1>
            <p>Kenya Ports Authority (KPA) Payment Service</p>
        </div>
        
        <div class="content">
            <div class="success-badge">
                ✓ Payment Successful
            </div>
            
            <p>Dear ${data.customerName},</p>
            <p>Thank you for using Access Bank's KPA Payment Service. Your payment has been processed successfully.</p>
            
            <table class="details-table">
                <tr>
                    <td class="label">Transaction ID:</td>
                    <td class="value">${data.transactionId}</td>
                </tr>
                <tr>
                    <td class="label">E-slip Number:</td>
                    <td class="value">${data.eslipNumber}</td>
                </tr>
                <tr>
                    <td class="label">Date & Time:</td>
                    <td class="value">${data.dateTime}</td>
                </tr>
                <tr>
                    <td class="label">Status:</td>
                    <td class="value" style="color: #21a366;">COMPLETED</td>
                </tr>
            </table>
            
            <div class="amount-breakdown">
                <h3>Payment Breakdown</h3>
                <table style="width: 100%; margin-top: 10px;">
                    <tr>
                        <td>Principal Amount:</td>
                        <td style="text-align: right;">$${parseFloat(data.amount).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Bank Commission (2%):</td>
                        <td style="text-align: right;">$${parseFloat(data.commission).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Excise Duty (1%):</td>
                        <td style="text-align: right;">$${parseFloat(data.exciseDuty).toFixed(2)}</td>
                    </tr>
                </table>
                <div class="total-amount">
                    <strong>Total Amount Debited: $${totalAmount.toFixed(2)}</strong>
                </div>
            </div>
            
            <div class="support-info">
                <h4>Important Information:</h4>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>This payment will be processed by KPA within 24 hours</li>
                    <li>Keep this email as proof of payment</li>
                    <li>For any queries, contact our customer service</li>
                </ul>
            </div>
            
            <p>Thank you for choosing Access Bank Kenya.</p>
            <p><strong>Access Bank Customer Service Team</strong></p>
        </div>
        
        <div class="footer">
            <p><strong>Access Bank Kenya Limited</strong><br>
            Westlands Road, Nairobi | customercare@accessbankplc.com | +254-700-000-000</p>
            <p style="font-size: 12px; margin-top: 15px;">
                This is an automated email. Please do not reply to this message.<br>
                © 2024 Access Bank Kenya & Kenya Ports Authority. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>`;

  const handleCopySMS = () => {
    navigator.clipboard.writeText(smsTemplate);
    setCopiedSMS(true);
    setTimeout(() => setCopiedSMS(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailTemplate);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f3f3f5]">
      {/* Header */}
      <div className="bg-white border-b border-[#d0d5dd] px-6 py-4">
        <div className="flex items-center gap-4 max-w-6xl mx-auto">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-[#526484] hover:text-[#003883] hover:bg-[#ebeef2]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Staff Portal
          </Button>
          <div className="flex items-center gap-2 text-[#667085]" style={{fontFamily: 'Inter'}}>
            <span>Staff Portal</span>
            <span>›</span>
            <span className="text-[#101828] font-medium">Notification Templates</span>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-[30px] font-semibold text-[#101828] mb-2" style={{fontFamily: 'Inter'}}>
            Notification Templates
          </h1>
          <p className="text-[#667085]" style={{fontFamily: 'Inter'}}>
            SMS and Email templates for customer notifications
          </p>
        </div>

        {/* Template Preview */}
        <Tabs defaultValue="sms" className="space-y-6">
          <TabsList className="bg-white border border-[#d0d5dd] h-12">
            <TabsTrigger 
              value="sms" 
              className="data-[state=active]:bg-[#003883] data-[state=active]:text-white h-10"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              SMS Template
            </TabsTrigger>
            <TabsTrigger 
              value="email" 
              className="data-[state=active]:bg-[#003883] data-[state=active]:text-white h-10"
            >
              <Mail className="h-4 w-4 mr-2" />
              Email Template
            </TabsTrigger>
          </TabsList>

          {/* SMS Template */}
          <TabsContent value="sms" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* SMS Preview */}
              <Card className="bg-white border-[#d0d5dd] p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-6 w-6 text-[#003883]" />
                    <h2 className="text-[18px] font-semibold text-[#101828]" style={{fontFamily: 'Inter'}}>
                      SMS Preview
                    </h2>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleCopySMS}
                    className="border-[#d0d5dd] text-[#344054] hover:bg-[#f3f3f5]"
                  >
                    {copiedSMS ? (
                      <CheckCircle className="h-4 w-4 mr-2 text-[#21a366]" />
                    ) : (
                      <Copy className="h-4 w-4 mr-2" />
                    )}
                    {copiedSMS ? 'Copied!' : 'Copy'}
                  </Button>
                </div>

                {/* Phone Mock-up */}
                <div className="bg-[#101828] rounded-2xl p-4 max-w-sm mx-auto">
                  <div className="bg-white rounded-xl p-4 h-64 flex flex-col">
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#f3f3f5]">
                      <div className="w-8 h-8 bg-[#003883] rounded-full flex items-center justify-center">
                        <Building className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#101828] text-[14px]" style={{fontFamily: 'Inter'}}>
                          Access Bank
                        </p>
                        <p className="text-[12px] text-[#667085]" style={{fontFamily: 'Inter'}}>
                          +254700000000
                        </p>
                      </div>
                    </div>
                    <div className="flex-1 overflow-auto">
                      <div className="bg-[#f3f3f5] rounded-lg p-3">
                        <p className="text-[12px] text-[#344054]" style={{fontFamily: 'Inter'}}>
                          {smsTemplate}
                        </p>
                        <p className="text-[10px] text-[#667085] mt-2" style={{fontFamily: 'Inter'}}>
                          {new Date().toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* SMS Configuration */}
              <Card className="bg-white border-[#d0d5dd] p-6">
                <h3 className="text-[18px] font-semibold text-[#101828] mb-6" style={{fontFamily: 'Inter'}}>
                  SMS Configuration
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[14px] font-medium text-[#344054]" style={{fontFamily: 'Inter'}}>
                      Character Count
                    </label>
                    <div className="bg-[#f3f3f5] rounded-lg p-3">
                      <p className="text-[16px] font-semibold text-[#101828]" style={{fontFamily: 'Inter'}}>
                        {smsTemplate.length} / 160 characters
                      </p>
                      <p className="text-[12px] text-[#667085]" style={{fontFamily: 'Inter'}}>
                        {smsTemplate.length > 160 ? 'Multi-part SMS (2 messages)' : 'Single SMS message'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[14px] font-medium text-[#344054]" style={{fontFamily: 'Inter'}}>
                      Delivery Settings
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-3 bg-[#f3f3f5] rounded-lg">
                        <CheckCircle className="h-4 w-4 text-[#21a366]" />
                        <span className="text-[14px] text-[#344054]" style={{fontFamily: 'Inter'}}>
                          Immediate delivery
                        </span>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-[#f3f3f5] rounded-lg">
                        <CheckCircle className="h-4 w-4 text-[#21a366]" />
                        <span className="text-[14px] text-[#344054]" style={{fontFamily: 'Inter'}}>
                          Delivery confirmation enabled
                        </span>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-[#f3f3f5] rounded-lg">
                        <CheckCircle className="h-4 w-4 text-[#21a366]" />
                        <span className="text-[14px] text-[#344054]" style={{fontFamily: 'Inter'}}>
                          Failure retry: 3 attempts
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Email Template */}
          <TabsContent value="email" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Email Preview */}
              <Card className="bg-white border-[#d0d5dd] p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Mail className="h-6 w-6 text-[#003883]" />
                    <h2 className="text-[18px] font-semibold text-[#101828]" style={{fontFamily: 'Inter'}}>
                      Email Preview
                    </h2>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleCopyEmail}
                    className="border-[#d0d5dd] text-[#344054] hover:bg-[#f3f3f5]"
                  >
                    {copiedEmail ? (
                      <CheckCircle className="h-4 w-4 mr-2 text-[#21a366]" />
                    ) : (
                      <Copy className="h-4 w-4 mr-2" />
                    )}
                    {copiedEmail ? 'Copied!' : 'Copy HTML'}
                  </Button>
                </div>

                {/* Email Mock-up */}
                <div className="border border-[#d0d5dd] rounded-lg overflow-hidden">
                  <div className="bg-[#f3f3f5] p-3 border-b border-[#d0d5dd] text-[12px]" style={{fontFamily: 'Inter'}}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#667085]">From:</span>
                      <span className="text-[#344054]">noreply@accessbankplc.com</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#667085]">To:</span>
                      <span className="text-[#344054]">john.doe@email.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#667085]">Subject:</span>
                      <span className="text-[#344054]">KPA Payment Confirmation - {data.eslipNumber}</span>
                    </div>
                  </div>
                  
                  <div className="p-4 max-h-96 overflow-auto bg-white">
                    {/* Simplified Email Content */}
                    <div className="text-center mb-4">
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <Shield className="h-8 w-8 text-[#003883]" />
                        <Building className="h-8 w-8 text-[#526484]" />
                      </div>
                      <h1 className="text-[20px] font-semibold text-[#003883] mb-2" style={{fontFamily: 'Inter'}}>
                        Payment Confirmation
                      </h1>
                      <p className="text-[14px] text-[#667085]" style={{fontFamily: 'Inter'}}>
                        Kenya Ports Authority (KPA) Payment Service
                      </p>
                    </div>

                    <div className="bg-[#dcfce7] text-[#166534] p-2 rounded text-center mb-4 text-[14px]" style={{fontFamily: 'Inter'}}>
                      ✓ Payment Successful
                    </div>

                    <p className="text-[14px] mb-3" style={{fontFamily: 'Inter'}}>Dear {data.customerName},</p>
                    <p className="text-[14px] mb-4" style={{fontFamily: 'Inter'}}>Your payment has been processed successfully.</p>

                    <div className="bg-[#f3f3f5] p-4 rounded-lg mb-4">
                      <h3 className="font-semibold mb-2" style={{fontFamily: 'Inter'}}>Payment Details</h3>
                      <div className="text-[12px] space-y-1" style={{fontFamily: 'Inter'}}>
                        <div className="flex justify-between">
                          <span>Transaction ID:</span>
                          <span>{data.transactionId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>E-slip Number:</span>
                          <span>{data.eslipNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Amount:</span>
                          <span>${totalAmount.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-[12px] text-[#667085] text-center" style={{fontFamily: 'Inter'}}>
                      © 2024 Access Bank Kenya & Kenya Ports Authority
                    </div>
                  </div>
                </div>
              </Card>

              {/* Email Configuration */}
              <Card className="bg-white border-[#d0d5dd] p-6">
                <h3 className="text-[18px] font-semibold text-[#101828] mb-6" style={{fontFamily: 'Inter'}}>
                  Email Configuration
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[14px] font-medium text-[#344054]" style={{fontFamily: 'Inter'}}>
                      Email Settings
                    </label>
                    <div className="space-y-2">
                      <div className="flex justify-between p-3 bg-[#f3f3f5] rounded-lg">
                        <span className="text-[14px] text-[#344054]" style={{fontFamily: 'Inter'}}>Format:</span>
                        <span className="text-[14px] text-[#101828] font-medium" style={{fontFamily: 'Inter'}}>HTML</span>
                      </div>
                      <div className="flex justify-between p-3 bg-[#f3f3f5] rounded-lg">
                        <span className="text-[14px] text-[#344054]" style={{fontFamily: 'Inter'}}>Priority:</span>
                        <span className="text-[14px] text-[#101828] font-medium" style={{fontFamily: 'Inter'}}>Normal</span>
                      </div>
                      <div className="flex justify-between p-3 bg-[#f3f3f5] rounded-lg">
                        <span className="text-[14px] text-[#344054]" style={{fontFamily: 'Inter'}}>Read Receipt:</span>
                        <span className="text-[14px] text-[#21a366] font-medium" style={{fontFamily: 'Inter'}}>Enabled</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[14px] font-medium text-[#344054]" style={{fontFamily: 'Inter'}}>
                      Branding Elements
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-3 bg-[#f3f3f5] rounded-lg">
                        <CheckCircle className="h-4 w-4 text-[#21a366]" />
                        <span className="text-[14px] text-[#344054]" style={{fontFamily: 'Inter'}}>
                          Access Bank logo included
                        </span>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-[#f3f3f5] rounded-lg">
                        <CheckCircle className="h-4 w-4 text-[#21a366]" />
                        <span className="text-[14px] text-[#344054]" style={{fontFamily: 'Inter'}}>
                          KPA branding elements
                        </span>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-[#f3f3f5] rounded-lg">
                        <CheckCircle className="h-4 w-4 text-[#21a366]" />
                        <span className="text-[14px] text-[#344054]" style={{fontFamily: 'Inter'}}>
                          Corporate color scheme
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Send Test Notification */}
        <Card className="bg-[#ebeef2] border-[#003883] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Send className="h-6 w-6 text-[#003883]" />
              <div>
                <h3 className="font-medium text-[#003883]" style={{fontFamily: 'Inter'}}>
                  Test Notifications
                </h3>
                <p className="text-[14px] text-[#526484]" style={{fontFamily: 'Inter'}}>
                  Send test SMS and email notifications to verify templates
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-[#003883] text-[#003883] hover:bg-[#003883] hover:text-white"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Test SMS
              </Button>
              <Button
                className="bg-[#003883] hover:bg-[#002664] text-white"
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Test Email
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}