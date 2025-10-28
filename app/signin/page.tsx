'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ButtonPrimary from '@/app/components/shared/ButtonPrimary';
import InputField from '@/app/components/shared/InputField';
import LoadingDialog from '@/app/components/shared/LoadingDialog';
import { toast } from 'sonner';
import { useAppConfig } from '@/app/hooks/useAppConfig';

const Signin = () => {
	const router = useRouter();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const { config } = useAppConfig();

	useEffect(() => {
		const currentUrl = window.location.href;
		const baseUrl = window.location.origin;
		const cleanUrl = `${baseUrl}/signin`;

		if (currentUrl !== cleanUrl && window.location.search) {
			window.history.replaceState(null, '', cleanUrl);
			console.log('URL cleaned on signin page load');
		}
	}, []);

	const handleSignIn = async (e: any) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const result = await signIn(
				config?.env.NEXT_PUBLIC_CREDENTIALS_MODE === 'production'
					? 'middleware-credentials'
					: 'mock-credentials',
				{
					redirect: false,
					username: username,
					password: password,
				}
			);

			if (result?.error) {
				toast.error(result.error);
				return;
			}

			const session = await getSession();

			if (session) {
				localStorage.setItem(
					'session',
					JSON.stringify({
						user: {
							name: session.user.name,
							email: session.user.email,
							nt: session.user.nt || username.toUpperCase(),
							role: session.user.role || ['teller'],
							branchCode: session.user.branchCode || '170',
						},
						expires: session.expires,
					})
				);

				router.push('/entrust');
			}
		} catch (error) {
			console.error('Login error:', error);
			toast.error('Login failed');
		} finally {
			setIsLoading(false);
		}
	};

	const handleSignInWithSSO = () => {
		setIsLoading(true);

		signIn('azure-ad', { callbackUrl: '/entrust' }).catch((error) => {
			console.error('Error initiating SSO:', error);
			toast.error('Failed to initiate SSO login');
			setIsLoading(false);
		});
	};

	return (
		<div className='bg-white min-h-screen flex flex-col lg:flex-row'>
			{isLoading && <LoadingDialog loading={isLoading} />}

			{/* Background/Branding Section */}
			<div className='flex-1 lg:flex-1 relative overflow-hidden bg-[#003883] order-1 lg:order-1'>
				{/* Mobile: smaller height, Desktop: full height */}
				<div className='h-48 lg:h-full w-full relative'>
					<div className="absolute inset-0 bg-cover bg-no-repeat bg-center bg-[url('/images/login-bg.png')] flex items-center justify-center p-4 sm:p-6 lg:p-12">
						<div className='w-full max-w-xs sm:max-w-sm lg:max-w-md flex flex-col text-white text-center'>
							<div className='w-full max-w-[100px] sm:max-w-[150px] lg:max-w-xs mx-auto'>
								<Image
									src='/images/Access_logo-white.png'
									alt='logo'
									width={400}
									height={200}
									sizes='(max-width: 640px) 100px, (max-width: 1024px) 150px, 200px'
									className='w-full h-auto object-contain'
									priority
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Form Section */}
			<div className='flex-1 lg:flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 order-1 lg:order-2 min-h-[calc(100vh-12rem)] lg:min-h-screen'>
				<div className='w-full max-w-sm sm:max-w-m'>
					<form
						onSubmit={handleSignIn}
						className='flex flex-col gap-4 sm:gap-5 lg:gap-6'>
						{/* Form Header - Add your header content here if needed */}
						<div className='flex flex-col gap-3 text-center lg:text-left'>
							<h1 className='text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800'>
								Welcome Back
							</h1>
							<p className='text-sm sm:text-base text-gray-600'>
								Please sign in to your account
							</p>
						</div>

						{/* Form Fields */}
						<div className='flex flex-col gap-4 sm:gap-5 w-full'>
							<InputField
								name='username'
								label='Username'
								onChange={(e) => setUsername(e.target.value)}
								value={username}
								placeholder='Enter User NT'
								className='border text-sm sm:text-base'
							/>
							<InputField
								name='password'
								label='Password'
								type='password'
								onChange={(e) => setPassword(e.target.value)}
								value={password}
								placeholder='Enter User Password'
								className='border text-sm sm:text-base'
							/>
						</div>

						{/* Login Button */}
						<div className='w-full flex flex-col gap-2 pt-2'>
							<button
								type='submit'
								className='w-full border-2 border-primaryBlue px-4 py-2 bg-blue-900 text-white font-inter font-semibold rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base transition-all duration-200 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed'
								disabled={isLoading}>
								{isLoading ? 'Logging in...' : 'Login'}
							</button>
						</div>

						{/* SSO Button */}
						<div className='w-full flex flex-col gap-2'>
							<ButtonPrimary
								onClick={handleSignInWithSSO}
								noBg
								className='text-primaryBlue text-sm sm:text-base py-2 transition-all duration-200 hover:bg-blue-50'
								disabled={isLoading}>
								Login with SSO
							</ButtonPrimary>
						</div>

						{/* Optional: Additional links
            <div className="text-center pt-4">
              <p className="text-xs sm:text-sm text-gray-500">
                Need help? Contact your system administrator
              </p>
            </div> */}
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signin;
