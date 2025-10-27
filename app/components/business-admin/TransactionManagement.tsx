import React from 'react';
import { Badge } from '../ui/badge';
import type { Transaction } from './BusinessAdminTypes';

interface TransactionManagementProps {
  transactions: Transaction[];
}

export function TransactionManagement({ transactions }: TransactionManagementProps) {
  const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;

  const getTypeBadge = (type: string) => {
    const config = {
      'credit': { bg: 'bg-[#ecfdf3]', text: 'text-[#027a48]' },
      'debit': { bg: 'bg-[#fef3f2]', text: 'text-[#b42318]' },
      'transfer': { bg: 'bg-[#eff8ff]', text: 'text-[#175cd3]' },
      'refund': { bg: 'bg-[#fff7ed]', text: 'text-[#f79009]' }
    };
    const style = config[type as keyof typeof config];
    return <Badge className={`${style.bg} ${style.text} text-[12px]`}>{type}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const config = {
      'success': { bg: 'bg-[#ecfdf3]', text: 'text-[#027a48]' },
      'pending': { bg: 'bg-[#fff7ed]', text: 'text-[#f79009]' },
      'failed': { bg: 'bg-[#fef3f2]', text: 'text-[#b42318]' }
    };
    const style = config[status as keyof typeof config];
    return <Badge className={`${style.bg} ${style.text} text-[12px]`}>{status}</Badge>;
  };

  return (
    <div className="h-full bg-[#f9fafb] overflow-y-auto">
      <div className="max-w-[1400px] mx-auto px-5 py-4">
        <div className="mb-4">
          <h1 className="text-[24px] text-[#101828] mb-1">Transaction Management</h1>
          <p className="text-[13px] text-[#667085]">Financial transactions and transfers</p>
        </div>

        <div className="bg-white border border-[#eaecf0] rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-[#f9fafb] border-b border-[#eaecf0]">
                <tr>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[140px]">Transaction ID</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[80px]">Type</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[100px]">Amount</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[130px]">From</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[130px]">To</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[80px]">Status</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[110px]">Date</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[130px]">Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaecf0]">
                {transactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-[#f9fafb]">
                    <td className="px-3 py-2.5 text-[11px] text-[#101828]">{txn.id}</td>
                    <td className="px-3 py-2.5">{getTypeBadge(txn.type)}</td>
                    <td className="px-3 py-2.5 text-[11px] text-[#101828]">{formatCurrency(txn.amount)}</td>
                    <td className="px-3 py-2.5 text-[11px] text-[#667085] truncate">{txn.from}</td>
                    <td className="px-3 py-2.5 text-[11px] text-[#667085] truncate">{txn.to}</td>
                    <td className="px-3 py-2.5">{getStatusBadge(txn.status)}</td>
                    <td className="px-3 py-2.5 text-[11px] text-[#667085]">{txn.date}</td>
                    <td className="px-3 py-2.5 text-[10px] text-[#667085]">{txn.reference}</td>
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
