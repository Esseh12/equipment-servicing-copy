'use client';

import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { HOPHistory } from '@/app/components/equipment/HOPHistory';
import { useEffect } from 'react';

export default function HOPHistoryPage() {
	const router = useRouter();
	const { userRole, currentUser, clearUser, allRequests } = useStore();

	useEffect(() => {
		if (userRole === undefined) return; // wait for store hydration

		if (userRole !== 'branch_mgr') {
			const timeout = setTimeout(() => {
				router.push('/');
			}, 1500); // add a short delay
			return () => clearTimeout(timeout);
		}
	}, [userRole, router]);

	return (
		<>
			<HOPHistory
				userRole={'branch_mgr'}
				onStartNewCase={() => router.push('/hop/new-request')}
				onViewRequest={(req) => {
					if (req.serviceType === 'Auto' && req.status === 'Pending') {
						router.push(`/hop/auto-review/${req.id}`);
					} else {
						router.push(`/hop/request/${req.id}`);
					}
				}}
				onUploadCompletion={(req) => {
					router.push(`/hop/completion/${req.id}`);
				}}
				onLogout={() => {
					clearUser();
					router.push('/');
				}}
				allRequests={allRequests}
				currentUser={currentUser}
			/>
		</>
	);
}
