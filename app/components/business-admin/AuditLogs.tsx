import React from 'react';
import { Badge } from '../ui/badge';
import type { AuditLog } from './BusinessAdminTypes';

interface AuditLogsProps {
  logs: AuditLog[];
}

export function AuditLogs({ logs }: AuditLogsProps) {
  const getStatusBadge = (status: string) => {
    const config = {
      'success': { bg: 'bg-[#ecfdf3]', text: 'text-[#027a48]' },
      'failed': { bg: 'bg-[#fef3f2]', text: 'text-[#b42318]' }
    };
    const style = config[status as keyof typeof config];
    return <Badge className={`${style.bg} ${style.text} text-[12px]`}>{status}</Badge>;
  };

  return (
    <div className="h-full bg-[#f9fafb] overflow-y-auto">
      <div className="max-w-[1400px] mx-auto px-5 py-4">
        <div className="mb-4">
          <h1 className="text-[24px] text-[#101828] mb-1">Audit Logs</h1>
          <p className="text-[13px] text-[#667085]">System security and audit trails</p>
        </div>

        <div className="bg-white border border-[#eaecf0] rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-[#f9fafb] border-b border-[#eaecf0]">
                <tr>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[140px]">Timestamp</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[160px]">User</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[140px]">Action</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[160px]">Resource</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[120px]">IP Address</th>
                  <th className="px-3 py-2 text-left text-[10px] text-[#667085] uppercase w-[80px]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaecf0]">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#f9fafb]">
                    <td className="px-3 py-2.5 text-[10px] text-[#667085]">{log.timestamp}</td>
                    <td className="px-3 py-2.5 text-[11px] text-[#101828] truncate">{log.user}</td>
                    <td className="px-3 py-2.5 text-[11px] text-[#667085]">{log.action}</td>
                    <td className="px-3 py-2.5 text-[11px] text-[#667085] truncate">{log.resource}</td>
                    <td className="px-3 py-2.5 text-[10px] text-[#667085]">{log.ipAddress}</td>
                    <td className="px-3 py-2.5">{getStatusBadge(log.status)}</td>
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
