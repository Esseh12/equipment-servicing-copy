import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Plus, Eye } from 'lucide-react';
import type { Business } from './BusinessAdminTypes';

interface BusinessManagementProps {
  businesses: Business[];
  onUpdateBusinesses: (businesses: Business[]) => void;
}

export function BusinessManagement({ businesses }: BusinessManagementProps) {
  const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;

  const getVerificationBadge = (status: string) => {
    const config = {
      'verified': { bg: 'bg-[#ecfdf3]', text: 'text-[#027a48]' },
      'pending': { bg: 'bg-[#fff7ed]', text: 'text-[#f79009]' },
      'rejected': { bg: 'bg-[#fef3f2]', text: 'text-[#b42318]' }
    };
    const style = config[status as keyof typeof config];
    return <Badge className={`${style.bg} ${style.text} text-[12px]`}>{status}</Badge>;
  };

  return (
    <div className="h-full bg-[#f9fafb] overflow-y-auto">
      <div className="max-w-[1400px] mx-auto px-5 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-[24px] text-[#101828] mb-1">Business Management</h1>
            <p className="text-[13px] text-[#667085]">Manage business accounts and verification</p>
          </div>
          <Button className="bg-[#003883] hover:bg-[#002664]">
            <Plus className="h-4 w-4 mr-2" />
            Add Business
          </Button>
        </div>

        <div className="bg-white border border-[#eaecf0] rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-[#f9fafb] border-b border-[#eaecf0]">
                <tr>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[160px]">Business</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[160px]">Owner</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[120px]">Category</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[110px]">KYC</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[80px]">Status</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[60px]">Stores</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[100px]">Revenue</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[60px]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaecf0]">
                {businesses.map((business) => (
                  <tr key={business.id} className="hover:bg-[#f9fafb]">
                    <td className="px-3 py-2.5 text-[12px] text-[#101828] truncate">{business.name}</td>
                    <td className="px-3 py-2.5">
                      <div className="text-[11px] text-[#667085] truncate">{business.owner}</div>
                      <div className="text-[10px] text-[#667085] truncate">{business.ownerEmail}</div>
                    </td>
                    <td className="px-3 py-2.5 text-[11px] text-[#667085]">{business.category}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <Progress value={business.kycProgress} className="w-14 h-1.5" />
                        <span className="text-[10px] text-[#667085]">{business.kycProgress}%</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">{getVerificationBadge(business.verificationStatus)}</td>
                    <td className="px-3 py-2.5 text-[11px] text-[#667085] text-center">{business.activeStores}</td>
                    <td className="px-3 py-2.5 text-[11px] text-[#667085]">{formatCurrency(business.monthlyRevenue)}</td>
                    <td className="px-3 py-2.5">
                      <button className="text-[#003883] hover:text-[#002664]">
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
