'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import InputField from '@/app/components/shared/InputField';
import LoadingDialog from '@/app/components/shared/LoadingDialog';
import { toast } from 'sonner';
import ButtonPrimary from '@/app/components/shared/ButtonPrimary';
import { useStore } from '@/lib/store';

const Entrust = () => {
	const router = useRouter();
	const [token, setToken] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { data: session } = useSession();
	const { setUser } = useStore();

	useEffect(() => {
		if (session?.user?.tokenValidated) {
			const role = session.user.role?.[0];
			console.log('here is the role', role);
			const email = session.user.email;
			const branch = session.user.branch?.branchName || '';

			if (role === 'branch_mgr') {
				setUser('branch_mgr', email, branch);
				router.push('/hop');
			} else {
				router.push('/');
			}
		}
	}, [session, router, setUser]);

	const handleSignIn = async (e: any) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const result = await signIn('entrust', {
				redirect: false,
				token: token,
				nt: session?.user.nt,
				adSession: JSON.stringify(session),
			});

			if (result?.error) {
				toast.error(result.error);
				return;
			}

			// The effect above will handle redirect once session updates
		} catch (error) {
			console.error('Login error:', error);
			toast.error('Login failed');
		} finally {
			setIsLoading(false);
		}
	};

	const handleSignOut = async () => {
		try {
			router.push('/signin');
		} catch (error) {
			console.error('Sign out error:', error);
		} finally {
			await signOut({
				redirect: false,
				callbackUrl: '/signin',
			});
		}
	};

	return (
		<div className='bg-white min-h-screen flex flex-col lg:flex-row'>
			{isLoading && <LoadingDialog loading={isLoading} />}

			{/* Left Section (Branding) */}
			<div className='flex-1 lg:flex-1 relative overflow-hidden bg-[#003883] order-1 lg:order-1'>
				<div className='h-48 lg:h-full w-full relative'>
					<div className="absolute inset-0 bg-cover bg-no-repeat bg-center bg-[url('/images/login-bg.png')] flex items-center justify-center p-4 sm:p-6 lg:p-12">
						<div className='w-full max-w-xs sm:max-w-sm lg:max-w-md flex flex-col text-white text-center'>
							<div className='w-full max-w-[200px] sm:max-w-[250px] lg:max-w-xs mx-auto'>
								<Image
									src='/images/Access_logo-white.png'
									alt='logo'
									width={600}
									height={200}
									sizes='(max-width: 640px) 200px, (max-width: 1024px) 250px, 300px'
									className='w-full h-auto object-contain'
									priority
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Right Section (Form) */}
			<div className='flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 order-1 lg:order-2 min-h-[calc(100vh-12rem)] lg:min-h-screen'>
				<div className='w-full max-w-sm'>
					<form
						onSubmit={handleSignIn}
						className='flex flex-col gap-6'>
						{/* Header */}
						<div className='flex flex-col gap-3 text-center lg:text-left'>
							<h1 className='text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800'>
								Token Verification
							</h1>
							<p className='text-sm sm:text-base text-gray-600'>
								Please enter your Entrust token to continue
							</p>
							{session?.user?.name && (
								<p className='text-xs sm:text-sm text-blue-600 bg-blue-50 p-2 rounded-lg'>
									Welcome back,{' '}
									<span className='font-semibold'>{session.user.name}</span>
								</p>
							)}
						</div>

						{/* Token Input */}
						<InputField
							name='token'
							label='Entrust Token'
							onChange={(e) => setToken(e.target.value)}
							value={token}
							placeholder='Enter your token'
							className='border text-sm sm:text-base'
							autoComplete='off'
						/>

						{/* Buttons */}
						<div className='flex flex-col gap-4 pt-2'>
							<button
								type='submit'
								className={`w-full border-2 px-4 py-2 text-white font-semibold rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base transition-all duration-200 ${
									isLoading
										? 'bg-gray-400 border-gray-400 cursor-not-allowed opacity-50'
										: 'border-primaryBlue bg-blue-800 hover:bg-blue-800 hover:border-blue-800'
								}`}
								disabled={isLoading || !token.trim()}>
								{isLoading ? (
									<>
										<div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
										Verifying...
									</>
								) : (
									'Submit Token'
								)}
							</button>

							<ButtonPrimary
								onClick={handleSignOut}
								noBg
								className='text-primaryBlue text-sm sm:text-base py-2 transition-all duration-200 hover:bg-blue-50'
								disabled={isLoading}>
								Go Back
							</ButtonPrimary>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Entrust;
