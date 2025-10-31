'use client';

import { useRouter, useParams } from 'next/navigation';
import { useStore } from '@/lib/store';
import { HOPRequestReviewView } from '@/app/components/equipment/HOPRequestReviewView';
import { useEffect } from 'react';

export default function ViewRequestPage() {
	const router = useRouter();
	const params = useParams();
	const { userRole, clearUser, allRequests } = useStore();

	const requestId = params.id as string;
	const request = allRequests.find((r) => r.id === requestId);

	useEffect(() => {
		if (userRole === undefined) return;

		if (userRole !== 'branch_mgr') {
			const timeout = setTimeout(() => {
				router.push('/');
			}, 1500); // add a short delay
			return () => clearTimeout(timeout);
		}
	}, [userRole, router]);

	useEffect(() => {
		if (!request) {
			router.push('/hop');
		}
	}, [request, router]);

	if (!userRole || userRole !== 'branch_mgr' || !request) {
		return null;
	}

	return (
		<HOPRequestReviewView
			userRole={userRole}
			request={request}
			onBack={() => router.push('/hop')}
			onLogout={() => {
				clearUser();
				router.push('/');
			}}
			showActions={false}
		/>
	);
}
