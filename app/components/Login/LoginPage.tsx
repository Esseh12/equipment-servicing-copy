'use client'; // Mark this as a Client Component

import { signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/app/components/shared/LoadingSpinner';
import { useAuth } from '@/app/core/auth/useAuth';

export default function LoginPage() {
	const router = useRouter();
	const { loading, user } = useAuth();
	// console.log(user);

	useEffect(() => {
		// Automatically trigger the login processx
		signIn('azure-ad', {
			callbackUrl: '/account-statement/new-request', // Redirect to the dashboard after successful login
		}).catch((error: unknown) => {
			// console.error("Login failed:", error);
			// Handle login failure (e.g., redirect to an error page)
			router.push('/signin');
		});
		// router.push("/signin");
	}, [router]);

	return (
		<LoadingSpinner
			isLoading={loading}
			valueClassName='fixed inset-0'
		/>
	);
}
