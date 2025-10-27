import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Search, Download, FileText, Filter } from 'lucide-react';
import { BreadcrumbNavigation } from './shared/BreadcrumbNavigation';
import { BreadcrumbItem } from '../App';

interface LOILandingPageProps {
  onStartCase: () => void;
  onBack: () => void;
  breadcrumbs: BreadcrumbItem[];
  onBreadcrumbClick: (screen: any) => void;
}

export function LOILandingPage({
  onStartCase,
  onBack,
  breadcrumbs,
  onBreadcrumbClick
}: LOILandingPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data for requests
  const mockRequests = [
    {
      id: 'LOI2024001',
      date: '2024-01-15',
      customer: 'John Doe',
      accountNumber: '1234567890',
      status: 'approved',
      amount: '₦250,000'
    },
    {
      id: 'LOI2024002',
      date: '2024-01-14',
      customer: 'Jane Smith',
      accountNumber: '9876543210',
      status: 'pending',
      amount: '₦180,000'
    },
    {
      id: 'LOI2024003',
      date: '2024-01-13',
      customer: 'Mike Johnson',
      accountNumber: '5555666677',
      status: 'returned',
      amount: '₦320,000'
    },
    {
      id: 'LOI2024004',
      date: '2024-01-12',
      customer: 'Sarah Wilson',
      accountNumber: '1111222233',
      status: 'saved',
      amount: '₦150,000'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      approved: 'bg-success text-success-foreground',
      pending: 'bg-warning text-warning-foreground',
      returned: 'bg-destructive text-destructive-foreground',
      saved: 'bg-muted text-muted-foreground'
    };

    return (
      <Badge className={variants[status as keyof typeof variants] || variants.saved}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const filteredRequests = mockRequests.filter(request => {
    const matchesSearch = 
      request.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.accountNumber.includes(searchTerm) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Letter of Indebtedness</h2>
            <p className="text-gray-600 mt-1">
              Manage and track Letter of Indebtedness requests
            </p>
          </div>
          <Button onClick={onStartCase} size="lg">
            <FileText className="mr-2 h-5 w-5" />
            Start Case
          </Button>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by Account No. or Customer Name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="returned">Returned</SelectItem>
                  <SelectItem value="saved">Saved</SelectItem>
                </SelectContent>
              </Select>

              {/* Export Buttons */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Excel
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requests Table */}
        <Card>
          <CardHeader>
            <CardTitle>Requests Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Customer</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Account No.</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((request) => (
                    <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{request.date}</td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{request.customer}</div>
                          <div className="text-xs text-gray-500">{request.id}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">{request.accountNumber}</td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">{request.amount}</td>
                      <td className="py-3 px-4">{getStatusBadge(request.status)}</td>
                      <td className="py-3 px-4">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredRequests.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm || statusFilter !== 'all' 
                      ? 'Try adjusting your search or filter criteria.'
                      : 'Get started by creating your first Letter of Indebtedness request.'
                    }
                  </p>
                  {!searchTerm && statusFilter === 'all' && (
                    <Button onClick={onStartCase}>
                      <FileText className="mr-2 h-4 w-4" />
                      Start Case
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}