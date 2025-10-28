'use client';

import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { HOPManualRequestForm } from '@/app/components/equipment/HOPManualRequestForm';
import {
	ServiceRequest,
	AuditEntry,
} from '@/app/components/equipment/EquipmentTypes';
import { toast } from 'sonner';
import { useEffect } from 'react';

export default function NewRequestPage() {
	const router = useRouter();
	const {
		userRole,
		currentUser,
		userBranch,
		clearUser,
		allRequests,
		addRequest,
	} = useStore();

	useEffect(() => {
		if (!userRole || userRole !== 'hop') {
			router.push('/');
		}
	}, [userRole, router]);

	const handleSubmitManualRequest = (requestData: Partial<ServiceRequest>) => {
		const newCaseId = `SRV-2025-${String(allRequests.length + 1).padStart(
			3,
			'0'
		)}`;
		const timestamp = new Date().toISOString();

		const newRequest: ServiceRequest = {
			id: `REQ${String(allRequests.length + 1).padStart(3, '0')}`,
			caseId: newCaseId,
			branchCode: requestData.branchCode!,
			branchName: requestData.branchName!,
			equipmentType: requestData.equipmentType!,
			serviceType: 'Manual',
			status: 'Pending Approval',
			urgency: requestData.urgency!,
			hopName: currentUser
				.split('@')[0]
				.replace('.', ' ')
				.replace(/\b\w/g, (l) => l.toUpperCase()),
			hopEmail: currentUser,
			dateRequested: requestData.dateRequested!,
			reasonForRequest: requestData.reasonForRequest,
			comments: requestData.comments,
			currentStep: 'pending_approval',
			createdBy: currentUser,
			createdAt: timestamp,
			updatedAt: timestamp,
			auditLog: [
				{
					id: `AUD${Date.now()}`,
					timestamp,
					user: currentUser
						.split('@')[0]
						.replace('.', ' ')
						.replace(/\b\w/g, (l) => l.toUpperCase()),
					role: 'HOP',
					action: 'Created manual servicing request',
					caseId: newCaseId,
					branchCode: requestData.branchCode!,
					serviceType: 'Manual',
					details: requestData.reasonForRequest,
				},
			],
		};

		addRequest(newRequest);

		toast.success('Request submitted successfully', {
			description: `${newCaseId} has been sent to Facility Management for approval`,
		});

		router.push('/hop');
	};

	if (!userRole || userRole !== 'hop') {
		return null;
	}

	return (
		<HOPManualRequestForm
			userRole={userRole}
			onBack={() => router.push('/hop')}
			onSubmit={handleSubmitManualRequest}
			onLogout={() => {
				clearUser();
				router.push('/');
			}}
			currentUser={currentUser}
			userBranch={userBranch}
		/>
	);
}
