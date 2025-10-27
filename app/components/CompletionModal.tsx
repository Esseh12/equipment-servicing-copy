import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { CheckCircle, Download, Mail, Printer } from 'lucide-react';
import { LOIRequest } from '../App';

interface CompletionModalProps {
  request: LOIRequest | null;
  onClose: () => void;
}

export function CompletionModal({
  request,
  onClose
}: CompletionModalProps) {
  const handleDownload = () => {
    // Simulate download
    console.log('Downloading letter...');
  };

  const handlePrint = () => {
    // Simulate print
    window.print();
  };

  const handleEmail = () => {
    // Simulate email
    console.log('Sending email...');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-xl text-success">Request Completed Successfully!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-gray-600">
              The Letter of Indebtedness has been {request?.status === 'approved' ? 'approved and generated' : 'processed'}.
            </p>
            <div className="text-sm text-gray-500">
              <p>Case ID: {request?.caseId}</p>
              <p>Customer: {request?.customerInfo.customerName}</p>
              <p>Completed: {new Date().toLocaleString()}</p>
            </div>
          </div>

          {request?.status === 'approved' && (
            <>
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Available Actions:</h4>
                <div className="space-y-2">
                  <Button onClick={handleDownload} variant="outline" className="w-full justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                  
                  <Button onClick={handlePrint} variant="outline" className="w-full justify-start">
                    <Printer className="mr-2 h-4 w-4" />
                    Print Letter
                  </Button>
                  
                  <Button onClick={handleEmail} variant="outline" className="w-full justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Customer
                  </Button>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg text-sm">
                <p className="text-blue-800">
                  <strong>Automated Actions Completed:</strong>
                </p>
                <ul className="text-blue-700 mt-1 space-y-1">
                  <li>• Service charge deducted from customer account</li>
                  <li>• Letter generated with digital signatures</li>
                  <li>• Email notification sent to customer</li>
                  <li>• Audit trail updated</li>
                </ul>
              </div>
            </>
          )}

          <div className="flex gap-3">
            <Button onClick={onClose} className="flex-1">
              Return to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}