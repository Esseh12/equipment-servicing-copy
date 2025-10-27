import React from 'react';
import type { UserRole } from './MediaWatchTypes';

interface MediaWatchLoginProps {
  onLogin: (role: UserRole) => void;
  onBackToSelector: () => void;
}

export function MediaWatchLogin({ onLogin, onBackToSelector }: MediaWatchLoginProps) {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg border border-[#e2e8f0] shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-[24px] text-[#1e293b] mb-2">
            Online Media Watch
          </h2>
          <p className="text-[14px] text-[#64748b]">
            Select your role to continue
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => onLogin('risk-officer')}
            className="w-full bg-[#003883] hover:bg-[#002664] text-white p-4 rounded-lg transition-colors"
          >
            <div className="text-[14px] font-semibold">Login as Risk Officer</div>
            <div className="text-[11px] opacity-90">Monitor alerts and flag mentions for escalation</div>
          </button>

          <button
            onClick={() => onLogin('analyst')}
            className="w-full bg-[#003883] hover:bg-[#002664] text-white p-4 rounded-lg transition-colors"
          >
            <div className="text-[14px] font-semibold">Login as Communications Analyst</div>
            <div className="text-[11px] opacity-90">Monitor media sentiment and manage entities</div>
          </button>

          <button
            onClick={() => onLogin('admin')}
            className="w-full bg-[#003883] hover:bg-[#002664] text-white p-4 rounded-lg transition-colors"
          >
            <div className="text-[14px] font-semibold">Login as Administrator</div>
            <div className="text-[11px] opacity-90">Full access to all features and settings</div>
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
