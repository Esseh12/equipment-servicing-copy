import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { CreditCard, RefreshCw } from 'lucide-react';
import { BreadcrumbNavigation } from './shared/BreadcrumbNavigation';
import { LOIRequest, BreadcrumbItem } from '../App';

interface SettlementViewProps {
  request: LOIRequest | null;
  onSubmit: (data: Partial<LOIRequest>) => void;
  onBack: () => void;
  breadcrumbs: BreadcrumbItem[];
  onBreadcrumbClick: (screen: any) => void;
}

export function SettlementView({
  request,
  onSubmit,
  onBack,
  breadcrumbs,
  onBreadcrumbClick
}: SettlementViewProps) {
  const [creditCardBalance, setCreditCardBalance] = useState(request?.creditCardBalance || '45,250.00');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateBalance = async () => {
    setIsUpdating(true);
    
    // Simulate API call to update balance
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate updated balance
    setCreditCardBalance('45,250.00');
    setIsUpdating(false);
  };

  const handleSubmit = () => {
    const formData: Partial<LOIRequest> = {
      creditCardBalance,
      currentStep: 4,
      status: 'pending'
    };
    
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span className="text-white font-medium">AB</span>
              </div>
              <h1 className="text-lg font-medium text-gray-900">Service Central</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Case ID:</span>
                <span className="text-sm font-medium text-gray-900">{request?.caseId}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Role:</span>
                <span className="text-sm font-medium text-primary">Settlement & Reconciliation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <BreadcrumbNavigation
            items={breadcrumbs}
            onItemClick={onBreadcrumbClick}
          />
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Step 3 of 6: Settlement & Reconciliation</span>
            <span className="text-sm text-gray-600">50% Complete</span>
          </div>
          <Progress value={50} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Customer Info Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Customer Name:</span>
                <div className="font-medium">{request?.customerInfo.customerName}</div>
              </div>
              <div>
                <span className="text-gray-600">Account Number:</span>
                <div className="font-medium">{request?.customerInfo.accountNumber}</div>
              </div>
              <div>
                <span className="text-gray-600">Customer ID:</span>
                <div className="font-medium">{request?.customerInfo.customerId}</div>
              </div>
              <div>
                <span className="text-gray-600">Account Type:</span>
                <div className="font-medium">{request?.customerInfo.accountType}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loan Balances Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Loan Balances (Credit Operations)</CardTitle>
          </CardHeader>
          <CardContent>
            {request?.loanBalances && request.loanBalances.length > 0 ? (
              <div className="space-y-3">
                {request.loanBalances.map((loan, index) => (
                  <div key={loan.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{loan.loanType}</div>
                      <div className="text-sm text-gray-600">{loan.branch}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₦{parseFloat(loan.amount).toLocaleString()}</div>
                      {loan.remarks && (
                        <div className="text-sm text-gray-600">{loan.remarks}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No loan balances recorded.</p>
            )}
          </CardContent>
        </Card>

        {/* Credit Card Balance */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Credit Card Balance Verification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                Please confirm or update the credit card balance for this customer. 
                The system has retrieved the current balance from the credit card system.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="credit-balance">Current Credit Card Balance</Label>
                <div className="flex gap-2 mt-1">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₦</span>
                    <Input
                      id="credit-balance"
                      value={creditCardBalance}
                      onChange={(e) => setCreditCardBalance(e.target.value)}
                      className="pl-8"
                      readOnly
                    />
                  </div>
                  <Button
                    onClick={handleUpdateBalance}
                    variant="outline"
                    size="sm"
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="ml-2 font-medium">{new Date().toLocaleString()}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">System Source:</span>
                  <span className="ml-2 font-medium">Credit Card API</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Status:</span>
                  <span className="ml-2 font-medium text-success">Verified</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Balance Confirmation</h4>
              <p className="text-sm text-gray-600 mb-3">
                By clicking "Update Balance & Return to CCO", you confirm that the credit card balance is accurate 
                and the request can proceed to the next stage.
              </p>
              <div className="text-sm text-gray-500">
                <strong>Note:</strong> This action will route the request back to the Customer Care Officer 
                for final review and submission to the Approver.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button variant="outline" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button 
            onClick={handleSubmit} 
            className="flex-1"
            disabled={isUpdating}
          >
            Update Balance & Return to CCO
          </Button>
        </div>
      </div>
    </div>
  );
}