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
		if (!userRole || userRole !== 'hop') {
			router.push('/');
		}
	}, [userRole, router]);

	useEffect(() => {
		if (!request) {
			router.push('/hop');
		}
	}, [request, router]);

	if (!userRole || userRole !== 'hop' || !request) {
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
