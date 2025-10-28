'use client';

import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { HOPHistory } from '@/app/components/equipment/HOPHistory';
import { useEffect } from 'react';

export default function HOPHistoryPage() {
	const router = useRouter();
	const { userRole, currentUser, clearUser, allRequests } = useStore();

	useEffect(() => {
		if (!userRole || userRole !== 'hop') {
			router.push('/');
		}
	}, [userRole, router]);

	if (!userRole || userRole !== 'hop') {
		return null;
	}

	return (
		<HOPHistory
			userRole={'hop'}
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
	);
}
