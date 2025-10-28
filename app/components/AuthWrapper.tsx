'use client';

import { useEffect, useState } from 'react';
import { getSession, signOut } from 'next-auth/react';
import { toast } from 'sonner';
import LoadingSpinner from './shared/LoadingSpinner';
import { usePathname, useRouter } from 'next/navigation';

interface AuthWrapperProps {
	children: React.ReactNode;
	excludedPaths?: string[];
}

const AuthWrapper = ({
	children,
	excludedPaths = ['/', '/entrust', '/signin', '/unauthorized'],
}: AuthWrapperProps) => {
	const router = useRouter();
	const pathName = usePathname();
	const [isChecking, setIsChecking] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			// Don't check auth for excluded paths
			if (excludedPaths.includes(pathName)) {
				setIsChecking(false);
				return;
			}

			const session = await getSession();

			try {
				if (session && !(session as any).user.tokenValidated) {
					// console.log("No saved session found");
					router.push('/entrust');
					return;
				}

				// const userRoles = (session as any)?.user.role || [];
				// const hasRequiredRole = userRoles.some((role: any) =>
				//   [
				//     UserRoles.cco,
				//     UserRoles.reviewer,
				//     UserRoles.teller,
				//     UserRoles.branchManager,
				//     UserRoles.chqMgmt,
				//   ].includes(role)
				// );

				if (!session?.user) {
					console.log('No session found, routing to unauthorized');
					router.push('/unauthorized');
					return;
				}

				if (session) {
					setIsChecking(false);
					return;
				}

				if (!session) {
					// console.log("No saved session found");
					router.push('/signin');
					return;
				}

				// Check if localStorage session is valid
				// const expiryDate = new Date(parsedSession.expires);

				// if (expiryDate < new Date()) {
				//   console.log('Session expired');
				//   localStorage.removeItem('session');

				//   // Sign out from NextAuth to clean up
				//   await signOut({ redirect: false });

				//   dispatch(addToast({
				//     message: 'Your session has expired. Please log in again.',
				//     type: 'failed'
				//   }));

				//   router.push('/');
				//   return;
				// }

				// Valid localStorage session but no NextAuth session
				// This is a fallback scenario
				// console.log("Using localStorage session as fallback");
				setIsChecking(false);
			} catch (error) {
				console.error('Error checking authentication:', error);
				localStorage.removeItem('session');

				// Sign out from NextAuth to clean up
				await signOut({ redirect: false });

				toast.error('Authentication error. Please log in again.');

				router.push('/signin');
				return;
			}
		};

		checkAuth();
	}, [excludedPaths, router]);

	// Show loading indicator while checking authentication
	if (isChecking) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<LoadingSpinner isLoading={isChecking} />
			</div>
		);
	}

	return <>{children}</>;
};

export default AuthWrapper;
