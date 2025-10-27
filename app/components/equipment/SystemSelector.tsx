import React from 'react';
import { Button } from '../ui/button';
import { FileText, Wrench, Database, Radio, ClipboardCheck, Building2 } from 'lucide-react';
import accessLogo from 'figma:asset/3ebf5c44175bf36c1eceb7236d272904dfc164a1.png';
import backgroundImage from 'figma:asset/acbc834ce594df91ee608d64274299149f2136d2.png';

interface SystemSelectorProps {
  onSelectSystem: (system: 'loi' | 'equipment' | 'cdms' | 'mediawatch' | 'audit' | 'business-admin') => void;
}

export function SystemSelector({ onSelectSystem }: SystemSelectorProps) {
  return (
    <div 
      className="min-h-screen relative flex items-center justify-center px-4 py-8 lg:py-12"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for better contrast - Netflix style */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/75"></div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-12">
          <img 
            src={accessLogo} 
            alt="Access Bank" 
            className="h-9 lg:h-11 mx-auto mb-4 drop-shadow-2xl brightness-0 invert" 
          />
          <h1 className="text-[28px] lg:text-[36px] text-white mb-2 drop-shadow-2xl tracking-tight">
            Service Central
          </h1>
          <p className="text-[13px] lg:text-[15px] text-white/80 max-w-xl mx-auto drop-shadow-lg">
            Select the system you would like to access
          </p>
        </div>

        {/* System Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-6">
          {/* Letter of Indebtedness System */}
          <button
            onClick={() => onSelectSystem('loi')}
            className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:bg-white/95 hover:border-[#003883]/50 hover:shadow-[0_15px_40px_rgba(0,56,131,0.3)] transition-all duration-300 text-left"
          >
            <div className="mb-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#003883] transition-all duration-300 mb-3">
                <FileText className="h-5 w-5 text-white group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-[15px] text-white group-hover:text-[#1e293b] mb-1.5 transition-colors">
                Letter of Indebtedness
              </h3>
              <p className="text-[11px] text-white/70 group-hover:text-[#64748b] leading-relaxed mb-3 transition-colors line-clamp-2">
                Loan balance aggregation and automated letter generation
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] text-white/60 group-hover:text-[#64748b] transition-colors">
                  <div className="w-1 h-1 rounded-full bg-white/60 group-hover:bg-[#003883]"></div>
                  <span>CCO / Initiator</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-white/60 group-hover:text-[#64748b] transition-colors">
                  <div className="w-1 h-1 rounded-full bg-white/60 group-hover:bg-[#003883]"></div>
                  <span>Credit Operations</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-white/60 group-hover:text-[#64748b] transition-colors">
                  <div className="w-1 h-1 rounded-full bg-white/60 group-hover:bg-[#003883]"></div>
                  <span>Approver</span>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/20 group-hover:border-[#e2e8f0] transition-colors">
              <span className="text-[11px] text-white group-hover:text-[#003883] inline-flex items-center gap-1 transition-colors">
                Access System →
              </span>
            </div>
          </button>

          {/* Equipment Servicing System */}
          <button
            onClick={() => onSelectSystem('equipment')}
            className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:bg-white/95 hover:border-[#003883]/50 hover:shadow-[0_15px_40px_rgba(0,56,131,0.3)] transition-all duration-300 text-left"
          >
            <div className="mb-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#003883] transition-all duration-300 mb-3">
                <Wrench className="h-5 w-5 text-white group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-[15px] text-white group-hover:text-[#1e293b] mb-1.5 transition-colors">
                Equipment Servicing
              </h3>
              <p className="text-[11px] text-white/70 group-hover:text-[#64748b] leading-relaxed mb-3 transition-colors line-clamp-2">
                Automated servicing workflow with vendor assignment
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] text-white/60 group-hover:text-[#64748b] transition-colors">
                  <div className="w-1 h-1 rounded-full bg-white/60 group-hover:bg-[#003883]"></div>
                  <span>Head of Place</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-white/60 group-hover:text-[#64748b] transition-colors">
                  <div className="w-1 h-1 rounded-full bg-white/60 group-hover:bg-[#003883]"></div>
                  <span>Facility Management</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-white/60 group-hover:text-[#64748b] transition-colors">
                  <div className="w-1 h-1 rounded-full bg-white/60 group-hover:bg-[#003883]"></div>
                  <span>Vendor Portal</span>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/20 group-hover:border-[#e2e8f0] transition-colors">
              <span className="text-[11px] text-white group-hover:text-[#003883] inline-flex items-center gap-1 transition-colors">
                Access System →
              </span>
            </div>
          </button>

          {/* CDMS Bulk Portal System */}
          <button
            onClick={() => onSelectSystem('cdms')}
            className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:bg-white/95 hover:border-[#002147]/50 hover:shadow-[0_15px_40px_rgba(0,33,71,0.3)] transition-all duration-300 text-left"
          >
            <div className="mb-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#002147] transition-all duration-300 mb-3">
                <Database className="h-5 w-5 text-white group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-[15px] text-white group-hover:text-[#1e293b] mb-1.5 transition-colors">
                CDMS Bulk Portal
              </h3>
              <p className="text-[11px] text-white/70 group-hover:text-[#64748b] leading-relaxed mb-3 transition-colors line-clamp-2">
                Bulk PND/Hold operations with maker-checker workflow
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] text-white/60 group-hover:text-[#64748b] transition-colors">
                  <div className="w-1 h-1 rounded-full bg-white/60 group-hover:bg-[#002147]"></div>
                  <span>Initiator</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-white/60 group-hover:text-[#64748b] transition-colors">
                  <div className="w-1 h-1 rounded-full bg-white/60 group-hover:bg-[#002147]"></div>
                  <span>Authorizer</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-white/60 group-hover:text-[#64748b] transition-colors">
                  <div className="w-1 h-1 rounded-full bg-white/60 group-hover:bg-[#002147]"></div>
                  <span>Admin</span>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/20 group-hover:border-[#e2e8f0] transition-colors">
              <span className="text-[11px] text-white group-hover:text-[#002147] inline-flex items-center gap-1 transition-colors">
                Access System →
              </span>
            </div>
          </button>

          {/* Online Media Watch System */}
          <button
            onClick={() => onSelectSystem('mediawatch')}
            className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:bg-white/95 hover:border-[#027a48]/50 hover:shadow-[0_15px_40px_rgba(2,122,72,0.3)] transition-all duration-300 text-left"
          >
            <div className="mb-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#027a48] transition-all duration-300 mb-3">
                <Radio className="h-5 w-5 text-white group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-[15px] text-white group-hover:text-[#1e293b] mb-1.5 transition-colors">
                Online Media Watch
              </h3>
              <p className="text-[11px] text-white/70 group-hover:text-[#64748b] leading-relaxed mb-3 transition-colors line-clamp-2">
                Automated sentiment analysis and media monitoring
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] text-white/60 group-hover:text-[#64748b] transition-colors">
                  <div className="w-1 h-1 rounded-full bg-white/60 group-hover:bg-[#027a48]"></div>
                  <span>Risk Officer</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-white/60 group-hover:text-[#64748b] transition-colors">
                  <div className="w-1 h-1 rounded-full bg-white/60 group-hover:bg-[#027a48]"></div>
                  <span>Comms Analyst</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-white/60 group-hover:text-[#64748b] transition-colors">
                  <div className="w-1 h-1 rounded-full bg-white/60 group-hover:bg-[#027a48]"></div>
                  <span>Administrator</span>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/20 group-hover:border-[#e2e8f0] transition-colors">
              <span className="text-[11px] text-white group-hover:text-[#027a48] inline-flex items-center gap-1 transition-colors">
                Access System →
              </span>
            </div>
          </button>

          {/* Audit Management System */}
          <button
            onClick={() => onSelectSystem('audit')}
            className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:bg-white/95 hover:border-[#003883]/50 hover:shadow-[0_15px_40px_rgba(0,56,131,0.3)] transition-all duration-300 text-left"
          >
            <div className="mb-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#003883] transition-all duration-300 mb-3">
                <ClipboardCheck className="h-5 w-5 text-white group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-[15px] text-white group-hover:text-[#1e293b] mb-1.5 transition-colors">
                Audit Management
              </h3>
              <p className="text-[11px] text-white/70 group-hover:text-[#64748b] leading-relaxed mb-3 transition-colors line-clamp-2">
                Risk assessment, audit planning, and issue tracking
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] text-white/60 group-hover:text-[#64748b] transition-colors">
                  <div className="w-1 h-1 rounded-full bg-white/60 group-hover:bg-[#003883]"></div>
                  <span>Audit Manager</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-white/60 group-hover:text-[#64748b] transition-colors">
                  <div className="w-1 h-1 rounded-full bg-white/60 group-hover:bg-[#003883]"></div>
                  <span>Audit Supervisor</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-white/60 group-hover:text-[#64748b] transition-colors">
                  <div className="w-1 h-1 rounded-full bg-white/60 group-hover:bg-[#003883]"></div>
                  <span>Auditor</span>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/20 group-hover:border-[#e2e8f0] transition-colors">
              <span className="text-[11px] text-white group-hover:text-[#003883] inline-flex items-center gap-1 transition-colors">
                Access System →
              </span>
            </div>
          </button>

          {/* Access Business Admin */}
          <button
            onClick={() => onSelectSystem('business-admin')}
            className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:bg-white/95 hover:border-[#003883]/50 hover:shadow-[0_15px_40px_rgba(0,56,131,0.3)] transition-all duration-300 text-left"
          >
            <div className="mb-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#003883] transition-all duration-300 mb-3">
                <Building2 className="h-5 w-5 text-white group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-[15px] text-white group-hover:text-[#1e293b] mb-1.5 transition-colors">
                Business Admin
              </h3>
              <p className="text-[11px] text-white/70 group-hover:text-[#64748b] leading-relaxed mb-3 transition-colors line-clamp-2">
                Complete business operations and administration platform
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] text-white/60 group-hover:text-[#64748b] transition-colors">
                  <div className="w-1 h-1 rounded-full bg-white/60 group-hover:bg-[#003883]"></div>
                  <span>14 Management Modules</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-white/60 group-hover:text-[#64748b] transition-colors">
                  <div className="w-1 h-1 rounded-full bg-white/60 group-hover:bg-[#003883]"></div>
                  <span>Analytics & Reporting</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-white/60 group-hover:text-[#64748b] transition-colors">
                  <div className="w-1 h-1 rounded-full bg-white/60 group-hover:bg-[#003883]"></div>
                  <span>Full Audit Trail</span>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/20 group-hover:border-[#e2e8f0] transition-colors">
              <span className="text-[11px] text-white group-hover:text-[#003883] inline-flex items-center gap-1 transition-colors">
                Access System →
              </span>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 py-2.5 px-5">
          <p className="text-[10px] lg:text-[11px] text-white/60">
            © 2025 Access Bank Plc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
