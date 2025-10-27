import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Plus, Download, Eye } from 'lucide-react';
import type { Invoice } from './BusinessAdminTypes';

interface InvoiceManagementProps {
  invoices: Invoice[];
  onUpdateInvoices: (invoices: Invoice[]) => void;
}

export function InvoiceManagement({ invoices }: InvoiceManagementProps) {
  const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;

  const getStatusBadge = (status: string) => {
    const config = {
      'draft': { bg: 'bg-[#f2f4f7]', text: 'text-[#344054]' },
      'sent': { bg: 'bg-[#eff8ff]', text: 'text-[#175cd3]' },
      'paid': { bg: 'bg-[#ecfdf3]', text: 'text-[#027a48]' },
      'overdue': { bg: 'bg-[#fef3f2]', text: 'text-[#b42318]' },
      'cancelled': { bg: 'bg-[#f2f4f7]', text: 'text-[#667085]' }
    };
    const style = config[status as keyof typeof config];
    return <Badge className={`${style.bg} ${style.text} text-[12px]`}>{status}</Badge>;
  };

  return (
    <div className="h-full bg-[#f9fafb] overflow-y-auto">
      <div className="max-w-[1400px] mx-auto px-5 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-[24px] text-[#101828] mb-1">Invoice Management</h1>
            <p className="text-[13px] text-[#667085]">Create and manage customer invoices</p>
          </div>
          <Button className="bg-[#003883] hover:bg-[#002664]">
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </div>

        <div className="bg-white border border-[#eaecf0] rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-[#f9fafb] border-b border-[#eaecf0]">
                <tr>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[110px]">Invoice #</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[180px]">Customer</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[90px]">Issued</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[90px]">Due</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[100px]">Amount</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[80px]">Status</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[70px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaecf0]">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-[#f9fafb]">
                    <td className="px-3 py-2.5 text-[11px] text-[#101828]">{invoice.invoiceNumber}</td>
                    <td className="px-3 py-2.5">
                      <div className="text-[12px] text-[#101828] truncate">{invoice.customer}</div>
                      <div className="text-[10px] text-[#667085] truncate">{invoice.customerEmail}</div>
                    </td>
                    <td className="px-3 py-2.5 text-[11px] text-[#667085]">{invoice.issueDate}</td>
                    <td className="px-3 py-2.5 text-[11px] text-[#667085]">{invoice.dueDate}</td>
                    <td className="px-3 py-2.5 text-[11px] text-[#101828]">{formatCurrency(invoice.total)}</td>
                    <td className="px-3 py-2.5">{getStatusBadge(invoice.status)}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex gap-1.5">
                        <button className="text-[#003883] hover:text-[#002664]">
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button className="text-[#667085] hover:text-[#344054]">
                          <Download className="h-3.5 w-3.5" />
                        </button>
                      </div>
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
