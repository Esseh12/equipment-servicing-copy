import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Plus, FileText, Clock, CheckCircle, Users } from 'lucide-react';
import { BreadcrumbNavigation } from './shared/BreadcrumbNavigation';
import { UserRole, BreadcrumbItem } from '../App';

interface DashboardProps {
  userRole: UserRole;
  onStartNewRequest: () => void;
  onViewLOI: () => void;
  onAuditTrail: () => void;
  breadcrumbs: BreadcrumbItem[];
  onBreadcrumbClick: (screen: any) => void;
  onLogout: () => void;
}

export function Dashboard({
  userRole,
  onStartNewRequest,
  onViewLOI,
  onAuditTrail,
  breadcrumbs,
  onBreadcrumbClick,
  onLogout
}: DashboardProps) {
  const getRoleDisplayName = (role: UserRole): string => {
    switch (role) {
      case 'cco': return 'Customer Care Officer';
      case 'credit-ops': return 'Credit Operations';
      case 'settlement': return 'Settlement & Reconciliation';
      case 'approver': return 'Approver';
      default: return 'User';
    }
  };

  const getMetrics = () => {
    // Mock data - in real system would come from API
    return {
      todayTransactions: 12,
      pendingRequests: 8,
      approvedRequests: 24,
      myQueue: userRole === 'cco' ? 3 : userRole === 'credit-ops' ? 5 : userRole === 'settlement' ? 2 : 6
    };
  };

  const metrics = getMetrics();

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
              <span className="text-sm text-gray-600">{getRoleDisplayName(userRole)}</span>
              <Button variant="outline" size="sm" onClick={onLogout}>
                Logout
              </Button>
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Welcome back!</h2>
          <p className="text-gray-600">
            Manage Letter of Indebtedness requests and workflow processes.
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Transactions</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.todayTransactions}</div>
              <p className="text-xs text-muted-foreground">
                +2 from yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{metrics.pendingRequests}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting action
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Requests</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{metrics.approvedRequests}</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Queue</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{metrics.myQueue}</div>
              <p className="text-xs text-muted-foreground">
                Assigned to me
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Primary Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={onStartNewRequest}
                className="w-full justify-start"
                size="lg"
              >
                <Plus className="mr-2 h-5 w-5" />
                Start New Request
              </Button>
              
              <Button 
                variant="outline"
                onClick={onViewLOI}
                className="w-full justify-start"
                size="lg"
              >
                <FileText className="mr-2 h-5 w-5" />
                View All Requests
              </Button>

              {(userRole === 'approver' || userRole === 'cco') && (
                <Button 
                  variant="outline"
                  onClick={onAuditTrail}
                  className="w-full justify-start"
                  size="lg"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Audit Trail
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">LOI2024001 approved</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">LOI2024002 pending approval</p>
                    <p className="text-xs text-muted-foreground">4 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">LOI2024003 created</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}