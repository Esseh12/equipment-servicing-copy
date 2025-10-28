'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export const useAuth = () => {
	const { data: session, status } = useSession();

	const user = session?.user || null;
	const userRole = session?.user.role?.join(' '); // "cco | authorizer | teller"
	const loading = status === 'loading';
	const userData = session;

	const handleSignOut = async () => {
		try {
			await signOut({
				redirect: false,
				callbackUrl: '/signin',
			});

			window.location.href = '/';
		} catch (error) {
			console.log('Sign out error:', error);
		}
	};

	return {
		user,
		userRole,
		loading,
		session,
		isLoggedIn: !!user,
		login: () => signIn('azure-ad'), // Example for Azure AD
		logout: () => handleSignOut(),
		userData,
	};
};
