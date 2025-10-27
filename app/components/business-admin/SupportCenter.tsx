import React from 'react';
import { Badge } from '../ui/badge';
import type { SupportTicket } from './BusinessAdminTypes';

interface SupportCenterProps {
  tickets: SupportTicket[];
  onUpdateTickets: (tickets: SupportTicket[]) => void;
}

export function SupportCenter({ tickets }: SupportCenterProps) {
  const getPriorityBadge = (priority: string) => {
    const config = {
      'low': { bg: 'bg-[#ecfdf3]', text: 'text-[#027a48]' },
      'medium': { bg: 'bg-[#eff8ff]', text: 'text-[#175cd3]' },
      'high': { bg: 'bg-[#fff7ed]', text: 'text-[#f79009]' },
      'urgent': { bg: 'bg-[#fef3f2]', text: 'text-[#b42318]' }
    };
    const style = config[priority as keyof typeof config];
    return <Badge className={`${style.bg} ${style.text} text-[12px]`}>{priority}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const config = {
      'open': { bg: 'bg-[#fff7ed]', text: 'text-[#f79009]' },
      'in-progress': { bg: 'bg-[#eff8ff]', text: 'text-[#175cd3]' },
      'resolved': { bg: 'bg-[#ecfdf3]', text: 'text-[#027a48]' },
      'closed': { bg: 'bg-[#f2f4f7]', text: 'text-[#344054]' }
    };
    const style = config[status as keyof typeof config];
    return <Badge className={`${style.bg} ${style.text} text-[12px]`}>{status}</Badge>;
  };

  return (
    <div className="h-full bg-[#f9fafb] overflow-y-auto">
      <div className="max-w-[1400px] mx-auto px-5 py-4">
        <div className="mb-4">
          <h1 className="text-[24px] text-[#101828] mb-1">Support Center</h1>
          <p className="text-[13px] text-[#667085]">Customer support and help desk</p>
        </div>

        <div className="bg-white border border-[#eaecf0] rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-[#f9fafb] border-b border-[#eaecf0]">
                <tr>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[80px]">Ticket</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[200px]">Title</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[160px]">Customer</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[120px]">Category</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[80px]">Priority</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[90px]">Status</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[90px]">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaecf0]">
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-[#f9fafb]">
                    <td className="px-3 py-2.5 text-[11px] text-[#101828]">{ticket.id}</td>
                    <td className="px-3 py-2.5 text-[12px] text-[#101828] truncate">{ticket.title}</td>
                    <td className="px-3 py-2.5">
                      <div className="text-[11px] text-[#101828] truncate">{ticket.customer}</div>
                      <div className="text-[10px] text-[#667085] truncate">{ticket.email}</div>
                    </td>
                    <td className="px-3 py-2.5 text-[11px] text-[#667085]">{ticket.category}</td>
                    <td className="px-3 py-2.5">{getPriorityBadge(ticket.priority)}</td>
                    <td className="px-3 py-2.5">{getStatusBadge(ticket.status)}</td>
                    <td className="px-3 py-2.5 text-[11px] text-[#667085]">{ticket.createdDate}</td>
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
