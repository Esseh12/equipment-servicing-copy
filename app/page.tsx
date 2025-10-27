'use client';

import { useRouter } from 'next/navigation';

export default function LoginPage() {
	const router = useRouter();

	const handleLogin = (
		role: 'hop' | 'facility',
		email: string,
		branch?: string
	) => {
		// Store user info in localStorage
		localStorage.setItem('userRole', role);
		localStorage.setItem('currentUser', email);
		if (branch) {
			localStorage.setItem('userBranch', branch);
		}

		// Navigate to appropriate page
		if (role === 'hop') {
			router.push('/hop/history');
		} else {
			router.push('/facility');
		}
	};

	return (
		<div className='min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4'>
			<div className='bg-white rounded-lg border border-[#e2e8f0] shadow-lg p-8 w-full max-w-md'>
				<div className='text-center mb-8'>
					<h2 className='text-[24px] text-[#1e293b] mb-2'>
						Equipment Servicing System
					</h2>
					<p className='text-[14px] text-[#64748b]'>
						Select your role to continue
					</p>
				</div>

				<div className='space-y-3'>
					<button
						onClick={() =>
							handleLogin('hop', 'john.adebayo@accessbankplc.com', 'AB001')
						}
						className='w-full bg-[#003883] hover:bg-[#002664] text-white p-4 rounded-lg transition-colors'>
						<div className='text-[14px] font-semibold'>Login as HOP</div>
						<div className='text-[11px] opacity-90'>
							Head of Place (Branch Operations)
						</div>
					</button>

					<button
						onClick={() =>
							handleLogin('facility', 'facility@accessbankplc.com')
						}
						className='w-full bg-[#003883] hover:bg-[#002664] text-white p-4 rounded-lg transition-colors'>
						<div className='text-[14px] font-semibold'>
							Login as Facility Management
						</div>
						<div className='text-[11px] opacity-90'>
							Approve requests and assign vendors
						</div>
					</button>
				</div>

				<div className='mt-6 pt-6 border-t border-[#e2e8f0]'>
					<button
						onClick={() => router.push('/audit-log')}
						className='w-full text-[12px] text-[#003883] hover:text-[#002664]'>
						View Audit Log
					</button>
				</div>
			</div>
		</div>
	);
}
