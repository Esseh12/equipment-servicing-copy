'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HOPManualRequestForm } from '@/app/components/equipment/HOPManualRequestForm';
import { ServiceRequest } from '@/app/components/equipment/EquipmentTypes';
import { mockServiceRequests } from '@/app/components/equipment/MockData';

export default function NewRequestPage() {
	const router = useRouter();
	const [userRole, setUserRole] = useState<'hop' | 'facility' | null>(null);

	useEffect(() => {
		const role = localStorage.getItem('userRole') as 'hop' | 'facility' | null;
		if (role !== 'hop') {
			router.push('/');
			return;
		}
		setUserRole(role);
	}, [router]);

	const handleSubmitManualRequest = (requestData: Partial<ServiceRequest>) => {
		const newCaseId = `SRV-2025-${String(
			mockServiceRequests.length + 1
		).padStart(3, '0')}`;
		const timestamp = new Date().toISOString();

		const newRequest: ServiceRequest = {
			id: `REQ${String(mockServiceRequests.length + 1).padStart(3, '0')}`,
			caseId: newCaseId,
			branchCode: requestData.branchCode!,
			branchName: requestData.branchName!,
			equipmentType: requestData.equipmentType!,
			serviceType: 'Manual',
			status: 'Pending Approval',
			urgency: requestData.urgency!,
			hopName:
				localStorage
					.getItem('currentUser')
					?.split('@')[0]
					.replace('.', ' ')
					.replace(/\b\w/g, (l) => l.toUpperCase()) || '',
			hopEmail: localStorage.getItem('currentUser') || '',
			dateRequested: requestData.dateRequested!,
			reasonForRequest: requestData.reasonForRequest,
			comments: requestData.comments,
			currentStep: 'pending_approval',
			createdBy: localStorage.getItem('currentUser') || '',
			createdAt: timestamp,
			updatedAt: timestamp,
			auditLog: [
				{
					id: `AUD${Date.now()}`,
					timestamp,
					user:
						localStorage
							.getItem('currentUser')
							?.split('@')[0]
							.replace('.', ' ')
							.replace(/\b\w/g, (l) => l.toUpperCase()) || '',
					role: 'HOP',
					action: 'Created manual servicing request',
					caseId: newCaseId,
					branchCode: requestData.branchCode!,
					serviceType: 'Manual',
					details: requestData.reasonForRequest,
				},
			],
		};

		// Save to localStorage
		const existingRequests = JSON.parse(
			localStorage.getItem('allRequests') || '[]'
		);
		const updatedRequests = [...existingRequests, newRequest];
		localStorage.setItem('allRequests', JSON.stringify(updatedRequests));

		router.push('/hop/history');
	};

	const handleLogout = () => {
		localStorage.removeItem('userRole');
		localStorage.removeItem('currentUser');
		localStorage.removeItem('userBranch');
		router.push('/');
	};

	return (
		<HOPManualRequestForm
			userRole={userRole}
			onBack={() => router.push('/hop/history')}
			onSubmit={handleSubmitManualRequest}
			onLogout={handleLogout}
			currentUser={localStorage.getItem('currentUser') || ''}
			userBranch={localStorage.getItem('userBranch') || ''}
		/>
	);
}
