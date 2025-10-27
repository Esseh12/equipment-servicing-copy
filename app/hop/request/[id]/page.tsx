'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { HOPRequestReviewView } from '@/app/components/equipment/HOPRequestReviewView';
import { ServiceRequest } from '@/app/components/equipment/EquipmentTypes';

export default function ViewRequestPage() {
	const router = useRouter();
	const params = useParams();
	const [userRole, setUserRole] = useState<'hop' | 'facility' | null>(null);
	const [request, setRequest] = useState<ServiceRequest | null>(null);

	useEffect(() => {
		const role = localStorage.getItem('userRole') as 'hop' | 'facility' | null;
		if (role !== 'hop') {
			router.push('/');
			return;
		}
		setUserRole(role);

		// Get request from localStorage
		const selectedRequest = localStorage.getItem('selectedRequest');
		if (selectedRequest) {
			setRequest(JSON.parse(selectedRequest));
		}
	}, [router, params.id]);

	const handleLogout = () => {
		localStorage.removeItem('userRole');
		localStorage.removeItem('currentUser');
		localStorage.removeItem('userBranch');
		localStorage.removeItem('selectedRequest');
		router.push('/');
	};

	if (!request) {
		return (
			<div className='min-h-screen bg-[#f8f9fa] flex items-center justify-center'>
				<div className='text-[#64748b]'>Loading request...</div>
			</div>
		);
	}

	return (
		<HOPRequestReviewView
			userRole={userRole}
			request={request}
			onBack={() => router.push('/hop/history')}
			onLogout={handleLogout}
			showActions={false}
		/>
	);
}
