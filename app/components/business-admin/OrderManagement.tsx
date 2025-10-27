import React from 'react';
import { Badge } from '../ui/badge';
import type { Order } from './BusinessAdminTypes';

interface OrderManagementProps {
  orders: Order[];
  onUpdateOrders: (orders: Order[]) => void;
}

export function OrderManagement({ orders }: OrderManagementProps) {
  const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;

  const getStatusBadge = (status: string) => {
    const config = {
      'pending': { bg: 'bg-[#fff7ed]', text: 'text-[#f79009]' },
      'processing': { bg: 'bg-[#eff8ff]', text: 'text-[#175cd3]' },
      'completed': { bg: 'bg-[#ecfdf3]', text: 'text-[#027a48]' },
      'cancelled': { bg: 'bg-[#fef3f2]', text: 'text-[#b42318]' }
    };
    const style = config[status as keyof typeof config];
    return <Badge className={`${style.bg} ${style.text} text-[12px]`}>{status}</Badge>;
  };

  return (
    <div className="h-full bg-[#f9fafb] overflow-y-auto">
      <div className="max-w-[1400px] mx-auto px-5 py-4">
        <div className="mb-4">
          <h1 className="text-[24px] text-[#101828] mb-1">Order Management</h1>
          <p className="text-[13px] text-[#667085]">Track and manage customer orders</p>
        </div>

        <div className="bg-white border border-[#eaecf0] rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-[#f9fafb] border-b border-[#eaecf0]">
                <tr>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[120px]">Order ID</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[180px]">Customer</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[160px]">Store</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[70px]">Items</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[100px]">Total</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[90px]">Status</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[90px]">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaecf0]">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#f9fafb]">
                    <td className="px-3 py-2.5 text-[11px] text-[#101828]">{order.id}</td>
                    <td className="px-3 py-2.5">
                      <div className="text-[12px] text-[#101828] truncate">{order.customer}</div>
                      <div className="text-[10px] text-[#667085] truncate">{order.customerEmail}</div>
                    </td>
                    <td className="px-3 py-2.5 text-[11px] text-[#667085] truncate">{order.store}</td>
                    <td className="px-3 py-2.5 text-[11px] text-[#667085] text-center">{order.items.length}</td>
                    <td className="px-3 py-2.5 text-[11px] text-[#101828]">{formatCurrency(order.total)}</td>
                    <td className="px-3 py-2.5">{getStatusBadge(order.status)}</td>
                    <td className="px-3 py-2.5 text-[11px] text-[#667085]">{order.date}</td>
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
