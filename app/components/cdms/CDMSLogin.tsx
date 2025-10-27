import React from 'react';
import { UserRole } from './CDMSTypes';

interface CDMSLoginProps {
  onLogin: (role: UserRole, ntid: string, fullName: string, unit: string) => void;
  onBackToSelector: () => void;
}

export function CDMSLogin({ onLogin, onBackToSelector }: CDMSLoginProps) {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg border border-[#e2e8f0] shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-[24px] text-[#1e293b] mb-2">
            CDMS Bulk Portal
          </h2>
          <p className="text-[14px] text-[#64748b]">
            Select your role to continue
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => onLogin('Initiator', 'john.adebayo', 'John Adebayo', 'Retail Banking')}
            className="w-full bg-[#003883] hover:bg-[#002664] text-white p-4 rounded-lg transition-colors"
          >
            <div className="text-[14px] font-semibold">Login as Initiator</div>
            <div className="text-[11px] opacity-90">Upload and submit bulk restriction files</div>
          </button>

          <button
            onClick={() => onLogin('Authorizer', 'sarah.okonkwo', 'Sarah Okonkwo', 'Operations')}
            className="w-full bg-[#003883] hover:bg-[#002664] text-white p-4 rounded-lg transition-colors"
          >
            <div className="text-[14px] font-semibold">Login as Authorizer</div>
            <div className="text-[11px] opacity-90">Review and authorize bulk requests</div>
          </button>

          <button
            onClick={() => onLogin('Admin', 'admin.user', 'Admin User', 'IT Department')}
            className="w-full bg-[#003883] hover:bg-[#002664] text-white p-4 rounded-lg transition-colors"
          >
            <div className="text-[14px] font-semibold">Login as Admin</div>
            <div className="text-[11px] opacity-90">Manage users and view audit trail</div>
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-[#e2e8f0]">
          <button
            onClick={onBackToSelector}
            className="w-full text-[12px] text-[#64748b] hover:text-[#1e293b]"
          >
            ← Back to System Selector
          </button>
        </div>
      </div>
    </div>
  );
}
