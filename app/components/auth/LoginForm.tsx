'use client';

import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { toast } from 'sonner';

export function LoginForm() {
	const router = useRouter();
	const { setUser } = useStore();

	const handleLogin = async (
		role: 'hop' | 'facility',
		email: string,
		branch?: string
	) => {
		try {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ role, email, branch }),
			});

			if (response.ok) {
				const data = await response.json();
				setUser(data.user);

				if (role === 'hop') {
					router.push('/hop');
				} else {
					router.push('/facility');
				}

				toast.success('Logged in successfully');
			}
		} catch (error) {
			toast.error('Login failed');
		}
	};

	return (
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
				onClick={() => handleLogin('facility', 'facility@accessbankplc.com')}
				className='w-full bg-[#003883] hover:bg-[#002664] text-white p-4 rounded-lg transition-colors'>
				<div className='text-[14px] font-semibold'>
					Login as Facility Management
				</div>
				<div className='text-[11px] opacity-90'>
					Approve requests and assign vendors
				</div>
			</button>
		</div>
	);
}
