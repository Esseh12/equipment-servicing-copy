'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
	AuditEntry,
	ServiceRequest,
} from '@/app/components/equipment/EquipmentTypes';
import { AuditLog } from '@/app/components/equipment/AuditLog';

export default function AuditLogPage() {
	const router = useRouter();
	const [auditEntries, setAuditEntries] = useState<AuditEntry[]>([]);
	const [userRole, setUserRole] = useState<'hop' | 'facility' | null>(null);

	useEffect(() => {
		const role = localStorage.getItem('userRole') as 'hop' | 'facility' | null;
		setUserRole(role);

		// Load all requests and extract audit entries
		const savedRequests = localStorage.getItem('allRequests');
		if (savedRequests) {
			const allRequests: ServiceRequest[] = JSON.parse(savedRequests);
			const entries: AuditEntry[] = [];

			allRequests.forEach((request) => {
				entries.push(...request.auditLog);
			});

			const sortedEntries = entries.sort(
				(a, b) =>
					new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
			);

			setAuditEntries(sortedEntries);
		}
	}, []);

	const handleBack = () => {
		if (userRole === 'hop') {
			router.push('/hop');
		} else if (userRole === 'facility') {
			router.push('/facility');
		} else {
			router.push('/');
		}
	};

	const handleLogout = () => {
		localStorage.clear();
		router.push('/');
	};

	return (
		<AuditLog
			userRole={userRole}
			onBack={handleBack}
			onLogout={handleLogout}
			auditEntries={auditEntries}
		/>
	);
}
