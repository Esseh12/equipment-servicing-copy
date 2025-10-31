'use client';

import { useRouter, useParams } from 'next/navigation';
import { useStore } from '@/lib/store';
import { ServiceConfirmationForm } from '@/app/components/equipment/ServiceConfirmationForm';
import { AuditEntry } from '@/app/components/equipment/EquipmentTypes';
import { toast } from 'sonner';
import { useEffect } from 'react';

export default function CompletionPage() {
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

	const handleConfirmCompletion = (data: any) => {
		if (!request) return;

		const timestamp = new Date().toISOString();
		const hopAuditEntry: AuditEntry = {
			id: `AUD${Date.now()}`,
			timestamp,
			user: currentUser
				.split('@')[0]
				.replace('.', ' ')
				.replace(/\b\w/g, (l) => l.toUpperCase()),
			role: 'HOP',
			action: 'Uploaded completion form and confirmed service',
			caseId: request.caseId,
			branchCode: request.branchCode,
			serviceType: request.serviceType,
			details: `Vendor: ${request.vendorName}`,
		};

		updateRequest(request.id, {
			status: 'Completed',
			dateCompleted: data.dateCompleted,
			allEquipmentServiced: data.allEquipmentServiced === 'Yes',
			damageIdentified: data.damageIdentified === 'Yes',
			damageDetails: data.damageDetails,
			equipmentNotServicedDetails: data.equipmentNotServicedDetails,
			comments: data.comments,
			jobCompletionFormUrl: `https://example.com/completion-forms/${request.caseId}.pdf`,
			currentStep: 'completed',
			updatedAt: timestamp,
			auditLog: [...request.auditLog, hopAuditEntry],
		});

		toast.success('Service completion confirmed', {
			description: `${request.caseId} has been marked as completed`,
		});

		router.push('/hop');
	};

	if (!userRole || userRole !== 'branch_mgr' || !request) {
		return null;
	}

	return (
		<ServiceConfirmationForm
			request={request}
			onBack={() => router.push('/hop')}
			onSubmit={handleConfirmCompletion}
			onLogout={() => {
				clearUser();
				router.push('/');
			}}
		/>
	);
}
