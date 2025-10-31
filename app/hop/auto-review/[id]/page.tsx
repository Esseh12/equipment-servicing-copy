'use client';

import { useRouter, useParams } from 'next/navigation';
import { useStore } from '@/lib/store';
import { AutoRequestReview } from '@/app/components/equipment/AutoRequestReview';
import {
	ServiceRequest,
	AuditEntry,
} from '@/app/components/equipment/EquipmentTypes';
import { toast } from 'sonner';
import { useEffect } from 'react';

export default function AutoReviewPage() {
	const router = useRouter();
	const params = useParams();
	const { userRole, currentUser, clearUser, allRequests, updateRequest } =
		useStore();

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

	const handleSubmitAutoRequest = (requestData: Partial<ServiceRequest>) => {
		if (!request) return;

		const timestamp = new Date().toISOString();
		const newAuditEntry: AuditEntry = {
			id: `AUD${Date.now()}`,
			timestamp,
			user: currentUser
				.split('@')[0]
				.replace('.', ' ')
				.replace(/\b\w/g, (l) => l.toUpperCase()),
			role: 'HOP',
			action: 'Submitted auto-generated request for approval',
			caseId: request.caseId,
			branchCode: request.branchCode,
			serviceType: 'Auto',
			details: requestData.reasonForRequest,
		};

		updateRequest(request.id, {
			...requestData,
			status: 'Pending Approval',
			currentStep: 'pending_approval',
			updatedAt: timestamp,
			auditLog: [...request.auditLog, newAuditEntry],
		});

		toast.success('Auto request submitted successfully', {
			description: `${request.caseId} has been sent to Facility Management for approval`,
		});

		router.push('/hop');
	};

	if (!userRole || userRole !== 'branch_mgr' || !request) {
		return null;
	}

	return (
		<AutoRequestReview
			request={request}
			userRole={userRole}
			onBack={() => router.push('/hop')}
			onSubmit={handleSubmitAutoRequest}
			onLogout={() => {
				clearUser();
				router.push('/');
			}}
		/>
	);
}
