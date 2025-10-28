import React from 'react';
import type { UserRole } from '../App';

interface LoginScreenProps {
	onLogin: (role: UserRole) => void;
	onBackToSelector?: () => void;
}

export function LoginScreen({ onLogin, onBackToSelector }: LoginScreenProps) {
	return (
		<div className='min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4'>
			<div className='bg-white rounded-lg border border-[#e2e8f0] shadow-lg p-8 w-full max-w-md'>
				<div className='text-center mb-8'>
					<h2 className='text-[24px] text-[#1e293b] mb-2'>
						Letter of Indebtedness
					</h2>
					<p className='text-[14px] text-[#64748b]'>
						Select your role to continue
					</p>
				</div>

				<div className='space-y-3'>
					<button
						onClick={() => onLogin('cco')}
						className='w-full bg-[#003883] hover:bg-[#002664] text-white p-4 rounded-lg transition-colors'>
						<div className='text-[14px] font-semibold'>
							Login as CCO / Initiator
						</div>
						<div className='text-[11px] opacity-90'>
							Customer Care Officer - Initiate LOI requests
						</div>
					</button>

					<button
						onClick={() => onLogin('credit-ops')}
						className='w-full bg-[#003883] hover:bg-[#002664] text-white p-4 rounded-lg transition-colors'>
						<div className='text-[14px] font-semibold'>
							Login as Credit Operations
						</div>
						<div className='text-[11px] opacity-90'>
							Process and validate customer balances
						</div>
					</button>

					<button
						onClick={() => onLogin('approver')}
						className='w-full bg-[#003883] hover:bg-[#002664] text-white p-4 rounded-lg transition-colors'>
						<div className='text-[14px] font-semibold'>Login as Approver</div>
						<div className='text-[11px] opacity-90'>
							Review and approve LOI requests
						</div>
					</button>
				</div>

				{onBackToSelector && (
					<div className='mt-6 pt-6 border-t border-[#e2e8f0]'>
						<button
							onClick={onBackToSelector}
							className='w-full text-[12px] text-[#64748b] hover:text-[#1e293b]'>
							← Back to System Selector
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
