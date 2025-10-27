import { CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { ServiceCentralLayout } from '../ServiceCentralLayout';
import { BreadcrumbItem } from '../../App';

interface SuccessScreenProps {
  onReturnHome: () => void;
  breadcrumbs: BreadcrumbItem[];
  onBreadcrumbClick: (screen: any) => void;
  title?: string;
  message?: string;
  caseId?: string;
}

export function SuccessScreen({ 
  onReturnHome, 
  breadcrumbs, 
  onBreadcrumbClick,
  title = "Request Submitted Successfully",
  message = "Your Letter of Indebtedness request has been submitted and is now being processed.",
  caseId
}: SuccessScreenProps) {
  return (
    <ServiceCentralLayout
      showBackButton={false}
      breadcrumbs={breadcrumbs}
      onBreadcrumbClick={onBreadcrumbClick}
    >
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          {/* Success Icon */}
          <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          
          {/* Success Message */}
          <div className="space-y-2">
            <h2 className="text-xl font-medium text-foreground">
              {title}
            </h2>
            <p className="text-muted-foreground">
              {message}
            </p>
            {caseId && (
              <p className="text-sm text-muted-foreground">
                Case ID: <span className="font-medium text-foreground">{caseId}</span>
              </p>
            )}
          </div>
          
          {/* Action Button */}
          <Button 
            onClick={onReturnHome}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    </ServiceCentralLayout>
  );
}