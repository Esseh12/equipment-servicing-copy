'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ServiceRequest } from '@/app/components/equipment/EquipmentTypes';
import { FacilityManagementDashboard } from '@/app/components/equipment/FacilityManagementDashboard';

export default function FacilityDashboardPage() {
	const router = useRouter();
	const [allRequests, setAllRequests] = useState<ServiceRequest[]>([]);
	const [userRole, setUserRole] = useState<'hop' | 'facility' | null>(null);

	useEffect(() => {
		const role = localStorage.getItem('userRole') as 'hop' | 'facility' | null;

		if (role !== 'facility') {
			router.push('/');
			return;
		}

		setUserRole(role);

		// Load requests from localStorage
		const savedRequests = localStorage.getItem('allRequests');
		if (savedRequests) {
			setAllRequests(JSON.parse(savedRequests));
		}
	}, [router]);

	const handleLogout = () => {
		localStorage.removeItem('userRole');
		localStorage.removeItem('currentUser');
		router.push('/');
	};

	if (!userRole) {
		return null;
	}

	return (
		<FacilityManagementDashboard
			userRole={userRole}
			onViewRequest={(req) => {
				localStorage.setItem('selectedRequest', JSON.stringify(req));
				router.push(`/facility/request/${req.id}`);
			}}
			onLogout={handleLogout}
			allRequests={allRequests}
		/>
	);
}
