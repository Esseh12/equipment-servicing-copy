import React from 'react';
import { Badge } from '../ui/badge';
import type { Store as StoreType } from './BusinessAdminTypes';

interface StoreManagementProps {
  stores: StoreType[];
  onUpdateStores: (stores: StoreType[]) => void;
}

export function StoreManagement({ stores }: StoreManagementProps) {
  const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;

  const getTypeBadge = (type: string) => {
    const config = {
      'physical': { bg: 'bg-[#eff8ff]', text: 'text-[#175cd3]' },
      'online': { bg: 'bg-[#ecfdf3]', text: 'text-[#027a48]' },
      'hybrid': { bg: 'bg-[#f9f5ff]', text: 'text-[#6941c6]' }
    };
    const style = config[type as keyof typeof config];
    return <Badge className={`${style.bg} ${style.text} text-[12px]`}>{type}</Badge>;
  };

  return (
    <div className="h-full bg-[#f9fafb] overflow-y-auto">
      <div className="max-w-[1400px] mx-auto px-5 py-4">
        <div className="mb-4">
          <h1 className="text-[24px] text-[#101828] mb-1">Store Management</h1>
          <p className="text-[13px] text-[#667085]">Manage physical and digital stores</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stores.map((store) => (
            <div key={store.id} className="bg-white border border-[#eaecf0] rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-[16px] text-[#101828]">{store.name}</h3>
                {getTypeBadge(store.type)}
              </div>
              <div className="space-y-1.5 mb-3">
                <div className="flex justify-between text-[13px]">
                  <span className="text-[#667085]">Business:</span>
                  <span className="text-[#101828]">{store.business}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-[#667085]">Location:</span>
                  <span className="text-[#101828]">{store.location}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-[#667085]">Products:</span>
                  <span className="text-[#101828]">{store.productCount}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-[#667085]">Monthly Revenue:</span>
                  <span className="text-[#101828]">{formatCurrency(store.revenue)}</span>
                </div>
              </div>
              <div className="pt-3 border-t border-[#eaecf0]">
                <span className="text-[11px] text-[#667085]">Manager: {store.manager}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
