'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ServiceRequest } from '@/app/components/equipment/EquipmentTypes';
import { mockServiceRequests } from '@/app/components/equipment/MockData';
import { HOPHistory } from '@/app/components/equipment/HOPHistory';

export default function HOPHistoryPage() {
	const router = useRouter();
	const [allRequests, setAllRequests] = useState<ServiceRequest[]>([]);
	const [userRole, setUserRole] = useState<'hop' | 'facility' | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const role = localStorage.getItem('userRole') as 'hop' | 'facility' | null;

		if (role !== 'hop') {
			router.push('/');
			return;
		}

		setUserRole(role);

		// Load requests from localStorage or mock data
		const savedRequests = localStorage.getItem('allRequests');
		if (savedRequests) {
			setAllRequests(JSON.parse(savedRequests));
		} else {
			setAllRequests(mockServiceRequests);
		}

		setIsLoading(false);
	}, [router]);

	const handleLogout = () => {
		localStorage.removeItem('userRole');
		localStorage.removeItem('currentUser');
		localStorage.removeItem('userBranch');
		router.push('/');
	};

	if (isLoading) {
		return (
			<div className='min-h-screen bg-[#f8f9fa] flex items-center justify-center'>
				<div className='text-[#64748b]'>Loading...</div>
			</div>
		);
	}

	return (
		<HOPHistory
			userRole={userRole}
			onStartNewCase={() => router.push('/hop/new-request')}
			onViewRequest={(req) => {
				localStorage.setItem('selectedRequest', JSON.stringify(req));
				if (req.serviceType === 'Auto' && req.status === 'Pending') {
					router.push(`/hop/auto-review/${req.id}`);
				} else {
					router.push(`/hop/request/${req.id}`);
				}
			}}
			onUploadCompletion={(req) => {
				localStorage.setItem('selectedRequest', JSON.stringify(req));
				router.push(`/hop/request/${req.id}/complete`);
			}}
			onLogout={handleLogout}
			allRequests={allRequests}
			currentUser={localStorage.getItem('currentUser') || ''}
		/>
	);
}
