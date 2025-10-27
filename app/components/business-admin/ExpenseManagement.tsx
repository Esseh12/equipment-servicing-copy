import React from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { Expense } from './BusinessAdminTypes';

interface ExpenseManagementProps {
  expenses: Expense[];
  onUpdateExpenses: (expenses: Expense[]) => void;
}

export function ExpenseManagement({ expenses, onUpdateExpenses }: ExpenseManagementProps) {
  const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;

  const getStatusBadge = (status: string) => {
    const config = {
      'pending': { bg: 'bg-[#fff7ed]', text: 'text-[#f79009]' },
      'approved': { bg: 'bg-[#ecfdf3]', text: 'text-[#027a48]' },
      'rejected': { bg: 'bg-[#fef3f2]', text: 'text-[#b42318]' }
    };
    const style = config[status as keyof typeof config];
    return <Badge className={`${style.bg} ${style.text} text-[12px]`}>{status}</Badge>;
  };

  const handleApprove = (id: string) => {
    const updated = expenses.map(e => 
      e.id === id ? { ...e, status: 'approved' as any, approvedBy: 'Admin', approvalDate: new Date().toLocaleDateString('en-GB') } : e
    );
    onUpdateExpenses(updated);
    toast.success('Expense approved');
  };

  const handleReject = (id: string) => {
    const updated = expenses.map(e => 
      e.id === id ? { ...e, status: 'rejected' as any } : e
    );
    onUpdateExpenses(updated);
    toast.success('Expense rejected');
  };

  return (
    <div className="h-full bg-[#f9fafb] overflow-y-auto">
      <div className="max-w-[1400px] mx-auto px-5 py-4">
        <div className="mb-4">
          <h1 className="text-[24px] text-[#101828] mb-1">Expense Management</h1>
          <p className="text-[13px] text-[#667085]">Track and approve business expenses</p>
        </div>

        <div className="bg-white border border-[#eaecf0] rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-[#f9fafb] border-b border-[#eaecf0]">
                <tr>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[200px]">Title</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[100px]">Category</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[100px]">Amount</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[120px]">Submitted By</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[90px]">Date</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[80px]">Status</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[150px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaecf0]">
                {expenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-[#f9fafb]">
                    <td className="px-3 py-2.5 text-[12px] text-[#101828] truncate">{expense.title}</td>
                    <td className="px-3 py-2.5 text-[11px] text-[#667085]">{expense.category}</td>
                    <td className="px-3 py-2.5 text-[11px] text-[#101828]">{formatCurrency(expense.amount)}</td>
                    <td className="px-3 py-2.5 text-[11px] text-[#667085]">{expense.submittedBy}</td>
                    <td className="px-3 py-2.5 text-[11px] text-[#667085]">{expense.submissionDate}</td>
                    <td className="px-3 py-2.5">{getStatusBadge(expense.status)}</td>
                    <td className="px-3 py-2.5">
                      {expense.status === 'pending' && (
                        <div className="flex gap-1.5">
                          <Button onClick={() => handleApprove(expense.id)} size="sm" className="bg-[#16a34a] hover:bg-[#15803d] h-7 text-[10px] px-2">
                            <CheckCircle2 className="h-3 w-3 mr-0.5" />
                            Approve
                          </Button>
                          <Button onClick={() => handleReject(expense.id)} size="sm" variant="outline" className="h-7 text-[10px] px-2 border-[#dc2626] text-[#dc2626] hover:bg-[#fef2f2]">
                            <XCircle className="h-3 w-3 mr-0.5" />
                            Reject
                          </Button>
                        </div>
                      )}
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
