'use client';

import React, { useState, useEffect } from 'react';
import { ServiceRequest, AuditEntry } from './EquipmentTypes';
import { mockServiceRequests, mockVendors } from './MockData';
import { HOPHistory } from './HOPHistory';
import { HOPManualRequestForm } from './HOPManualRequestForm';
import { HOPRequestReviewView } from './HOPRequestReviewView';
import { ServiceConfirmationForm } from './ServiceConfirmationForm';
import { FacilityManagementDashboard } from './FacilityManagementDashboard';
import { AuditLog } from './AuditLog';
import { AutomationSetup, AutomationRule } from './AutomationSetup';
import { AutoRequestReview } from './AutoRequestReview';
import { toast } from 'sonner';

type Screen =
	| 'login'
	| 'hop-history'
	| 'hop-manual-request'
	| 'hop-confirmation'
	| 'hop-view-request'
	| 'hop-auto-review'
	| 'automation-setup'
	| 'facility-dashboard'
	| 'facility-review-request'
	| 'audit-log';

interface EquipmentServicingAppProps {}

export function EquipmentServicingApp({}: EquipmentServicingAppProps = {}) {
	const [currentScreen, setCurrentScreen] = useState<Screen>('login');
	const [userRole, setUserRole] = useState<'hop' | 'facility' | null>(null);
	const [currentUser, setCurrentUser] = useState<string>('');
	const [userBranch, setUserBranch] = useState<string>('');

	const [allRequests, setAllRequests] =
		useState<ServiceRequest[]>(mockServiceRequests);
	const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(
		null
	);
	const [automationRules, setAutomationRules] = useState<AutomationRule[]>([]);

	// Login
	const handleLogin = (
		role: 'hop' | 'facility',
		email: string,
		branch?: string
	) => {
		setUserRole(role);
		setCurrentUser(email);

		if (role === 'hop') {
			setUserBranch(branch || 'AB001');
			setCurrentScreen('hop-history');
		} else if (role === 'facility') {
			setCurrentScreen('facility-dashboard');
		}

		console.log(`✅ Logged in as ${role.toUpperCase()}: ${email}`);
	};

	// Logout
	const handleLogout = () => {
		setUserRole(null);
		setCurrentUser('');
		setUserBranch('');
		setCurrentScreen('login');
		setSelectedRequest(null);
		toast.success('Logged out successfully');
	};

	// Auto-generate requests based on automation rules
	useEffect(() => {
		if (userRole === 'hop' && automationRules.length > 0) {
			checkAndGenerateAutoRequests();
		}
	}, [userRole, automationRules]);

	const checkAndGenerateAutoRequests = () => {
		const today = new Date().toISOString().split('T')[0];
		const updatedRules: AutomationRule[] = [];
		const newRequests: ServiceRequest[] = [];

		automationRules.forEach((rule) => {
			if (rule.isActive && rule.nextTrigger <= today) {
				// Generate auto request
				const newCaseId = `SRV-2025-${String(
					allRequests.length + newRequests.length + 1
				).padStart(3, '0')}`;
				const timestamp = new Date().toISOString();

				const autoRequest: ServiceRequest = {
					id: `REQ${String(
						allRequests.length + newRequests.length + 1
					).padStart(3, '0')}`,
					caseId: newCaseId,
					branchCode: rule.branchCode,
					branchName: rule.branchName,
					equipmentType: rule.equipmentType,
					serviceType: 'Auto',
					status: 'Pending',
					urgency: rule.urgency,
					hopName: currentUser
						.split('@')[0]
						.replace('.', ' ')
						.replace(/\b\w/g, (l) => l.toUpperCase()),
					hopEmail: currentUser,
					dateRequested: today,
					reasonForRequest: rule.reasonForRequest,
					comments: rule.comments,
					currentStep: 'hop_request',
					createdBy: 'System (Automation)',
					createdAt: timestamp,
					updatedAt: timestamp,
					auditLog: [
						{
							id: `AUD${Date.now() + newRequests.length}`,
							timestamp,
							user: 'System',
							role: 'System',
							action: 'Auto-generated servicing request',
							caseId: newCaseId,
							branchCode: rule.branchCode,
							serviceType: 'Auto',
							details: `Generated from automation rule: ${rule.equipmentType} - Every ${rule.recurrenceMonths} months`,
						},
					],
				};

				newRequests.push(autoRequest);

				// Update rule with next trigger date
				const nextTrigger = new Date(rule.nextTrigger);
				nextTrigger.setMonth(nextTrigger.getMonth() + rule.recurrenceMonths);

				updatedRules.push({
					...rule,
					lastTriggered: today,
					nextTrigger: nextTrigger.toISOString().split('T')[0],
				});

				console.log(`\n🤖 AUTO-REQUEST GENERATED:`);
				console.log('Case ID:', newCaseId);
				console.log('Equipment:', rule.equipmentType);
				console.log('Next trigger:', nextTrigger.toISOString().split('T')[0]);
			} else {
				updatedRules.push(rule);
			}
		});

		if (newRequests.length > 0) {
			setAllRequests((prev) => [...prev, ...newRequests]);
			setAutomationRules(updatedRules);

			toast.success(
				`${newRequests.length} auto request${
					newRequests.length > 1 ? 's' : ''
				} generated`,
				{
					description: 'Review and submit to proceed with approval',
				}
			);
		}
	};

	// HOP: Submit Manual Request
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

		const updatedRequests = [...allRequests, newRequest];
		setAllRequests(updatedRequests);

		console.log('\n🆕 NEW REQUEST CREATED:');
		console.log('Case ID:', newCaseId);
		console.log('Service Type:', newRequest.serviceType);
		console.log('Status:', newRequest.status);
		console.log('HOP Email:', newRequest.hopEmail);
		console.log('Total requests now:', updatedRequests.length);
		console.log(
			'All requests:',
			updatedRequests.map((r) => ({
				caseId: r.caseId,
				serviceType: r.serviceType,
				status: r.status,
			}))
		);

		toast.success('Request submitted successfully', {
			description: `${newCaseId} has been sent to Facility Management for approval`,
		});

		setCurrentScreen('hop-history');
	};

	// FM: Approve and Assign Vendor
	const handleFacilityApproveRequest = (
		request: ServiceRequest,
		vendorId: string,
		scheduledDate: string
	) => {
		const vendor = mockVendors.find((v) => v.id === vendorId);
		if (!vendor) {
			console.error('❌ Vendor not found:', vendorId);
			return;
		}

		const timestamp = new Date().toISOString();
		const newAuditEntry: AuditEntry = {
			id: `AUD${Date.now()}`,
			timestamp,
			user: 'Facility Management',
			role: 'Facility Management',
			action: 'Approved request and assigned vendor',
			caseId: request.caseId,
			branchCode: request.branchCode,
			serviceType: request.serviceType,
			details: `Assigned to ${vendor.name}, scheduled for ${scheduledDate}`,
		};

		const updatedRequest: ServiceRequest = {
			...request,
			status: 'Assigned',
			vendorName: vendor.name,
			vendorEmail: vendor.email,
			dateScheduled: scheduledDate,
			currentStep: 'vendor_assigned',
			updatedAt: timestamp,
			auditLog: [...request.auditLog, newAuditEntry],
		};

		const updatedRequests = allRequests.map((req) =>
			req.id === request.id ? updatedRequest : req
		);
		setAllRequests(updatedRequests);

		console.log('\n✅ REQUEST APPROVED & VENDOR ASSIGNED:');
		console.log('Case ID:', request.caseId);
		console.log('New Status:', updatedRequest.status);
		console.log('Vendor:', vendor.name);
		console.log('Scheduled Date:', scheduledDate);

		toast.success('Request approved and vendor assigned', {
			description: `${vendor.name} has been assigned - HOP will upload completion form after service`,
		});

		setCurrentScreen('facility-dashboard');
	};

	// FM: Reject Request
	const handleFacilityRejectRequest = (
		request: ServiceRequest,
		reason: string
	) => {
		const timestamp = new Date().toISOString();
		const newAuditEntry: AuditEntry = {
			id: `AUD${Date.now()}`,
			timestamp,
			user: 'Facility Management',
			role: 'Facility Management',
			action: 'Rejected request',
			caseId: request.caseId,
			branchCode: request.branchCode,
			serviceType: request.serviceType,
			details: reason,
		};

		const updatedRequest: ServiceRequest = {
			...request,
			status: 'Rejected',
			updatedAt: timestamp,
			auditLog: [...request.auditLog, newAuditEntry],
		};

		const updatedRequests = allRequests.map((req) =>
			req.id === request.id ? updatedRequest : req
		);
		setAllRequests(updatedRequests);

		console.log('\n❌ REQUEST REJECTED:');
		console.log('Case ID:', request.caseId);
		console.log('Reason:', reason);

		toast.error('Request rejected', {
			description: 'HOP has been notified',
		});

		setCurrentScreen('facility-dashboard');
	};

	// HOP: Upload Completion Form
	const handleConfirmCompletion = (data: any) => {
		if (!selectedRequest) return;

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
			caseId: selectedRequest.caseId,
			branchCode: selectedRequest.branchCode,
			serviceType: selectedRequest.serviceType,
			details: `Vendor: ${selectedRequest.vendorName}`,
		};

		const updatedRequest: ServiceRequest = {
			...selectedRequest,
			status: 'Completed',
			dateCompleted: data.dateCompleted,
			allEquipmentServiced: data.allEquipmentServiced === 'Yes',
			damageIdentified: data.damageIdentified === 'Yes',
			damageDetails: data.damageDetails,
			equipmentNotServicedDetails: data.equipmentNotServicedDetails,
			comments: data.comments,
			jobCompletionFormUrl: `https://example.com/completion-forms/${selectedRequest.caseId}.pdf`,
			currentStep: 'completed',
			updatedAt: timestamp,
			auditLog: [...selectedRequest.auditLog, hopAuditEntry],
		};

		const updatedRequests = allRequests.map((req) =>
			req.id === selectedRequest.id ? updatedRequest : req
		);
		setAllRequests(updatedRequests);
		setSelectedRequest(null);

		console.log('\n✅ SERVICE COMPLETED:');
		console.log('Case ID:', selectedRequest.caseId);
		console.log('Completion Date:', data.dateCompleted);

		toast.success('Service completion confirmed', {
			description: `${selectedRequest.caseId} has been marked as completed`,
		});

		setCurrentScreen('hop-history');
	};

	// HOP: Submit Auto Request
	const handleSubmitAutoRequest = (requestData: Partial<ServiceRequest>) => {
		if (!selectedRequest) return;

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
			caseId: selectedRequest.caseId,
			branchCode: selectedRequest.branchCode,
			serviceType: 'Auto',
			details: requestData.reasonForRequest,
		};

		const updatedRequest: ServiceRequest = {
			...selectedRequest,
			...requestData,
			status: 'Pending Approval',
			currentStep: 'pending_approval',
			updatedAt: timestamp,
			auditLog: [...selectedRequest.auditLog, newAuditEntry],
		};

		const updatedRequests = allRequests.map((req) =>
			req.id === selectedRequest.id ? updatedRequest : req
		);
		setAllRequests(updatedRequests);
		setSelectedRequest(null);

		console.log('\n✅ AUTO REQUEST SUBMITTED:');
		console.log('Case ID:', selectedRequest.caseId);

		toast.success('Auto request submitted successfully', {
			description: `${selectedRequest.caseId} has been sent to Facility Management for approval`,
		});

		setCurrentScreen('hop-history');
	};

	// Automation Setup Handlers
	const handleSaveAutomationRules = (rules: AutomationRule[]) => {
		setAutomationRules(rules);

		console.log('\n⚙️ AUTOMATION RULES SAVED:');
		console.log('Total rules:', rules.length);
		console.log('Active rules:', rules.filter((r) => r.isActive).length);

		toast.success('Automation rules saved', {
			description: `${rules.filter((r) => r.isActive).length} active rule${
				rules.filter((r) => r.isActive).length !== 1 ? 's' : ''
			} configured`,
		});

		setCurrentScreen('hop-history');
	};

	// Get all audit entries
	const getAllAuditEntries = (): AuditEntry[] => {
		const entries: AuditEntry[] = [];
		allRequests.forEach((request) => {
			entries.push(...request.auditLog);
		});
		return entries.sort(
			(a, b) =>
				new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
		);
	};

	// Login Screen
	const LoginScreen = () => (
		<div className='min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4'>
			<div className='bg-white rounded-lg border border-[#e2e8f0] shadow-lg p-8 w-full max-w-md'>
				<div className='text-center mb-8'>
					<h2 className='text-[24px] text-[#1e293b] mb-2'>
						Equipment Servicing System
					</h2>
					<p className='text-[14px] text-[#64748b]'>
						Select your role to continue
					</p>
				</div>

				<div className='space-y-3'>
					<button
						onClick={() =>
							handleLogin('hop', 'john.adebayo@accessbankplc.com', 'AB001')
						}
						className='w-full bg-[#003883] hover:bg-[#002664] text-white p-4 rounded-lg transition-colors'>
						<div className='text-[14px] font-semibold'>Login as HOP</div>
						<div className='text-[11px] opacity-90'>
							Head of Place (Branch Operations)
						</div>
					</button>

					<button
						onClick={() =>
							handleLogin('facility', 'facility@accessbankplc.com')
						}
						className='w-full bg-[#003883] hover:bg-[#002664] text-white p-4 rounded-lg transition-colors'>
						<div className='text-[14px] font-semibold'>
							Login as Facility Management
						</div>
						<div className='text-[11px] opacity-90'>
							Approve requests and assign vendors
						</div>
					</button>
				</div>

				<div className='mt-6 pt-6 border-t border-[#e2e8f0]'>
					<button
						onClick={() => setCurrentScreen('audit-log')}
						className='w-full text-[12px] text-[#003883] hover:text-[#002664]'>
						View Audit Log
					</button>
				</div>
			</div>
		</div>
	);

	return (
		<>
			{currentScreen === 'login' && <LoginScreen />}

			{currentScreen === 'hop-history' && (
				<HOPHistory
					userRole={userRole}
					onStartNewCase={() => setCurrentScreen('hop-manual-request')}
					onViewRequest={(req) => {
						setSelectedRequest(req);
						if (req.serviceType === 'Auto' && req.status === 'Pending') {
							setCurrentScreen('hop-auto-review');
						} else {
							setCurrentScreen('hop-view-request');
						}
					}}
					onUploadCompletion={(req) => {
						setSelectedRequest(req);
						setCurrentScreen('hop-confirmation');
					}}
					onLogout={handleLogout}
					allRequests={allRequests}
					currentUser={currentUser}
				/>
			)}

			{currentScreen === 'hop-manual-request' && (
				<HOPManualRequestForm
					userRole={userRole}
					onBack={() => setCurrentScreen('hop-history')}
					onSubmit={handleSubmitManualRequest}
					onLogout={handleLogout}
					currentUser={currentUser}
					userBranch={userBranch}
				/>
			)}

			{currentScreen === 'hop-confirmation' && selectedRequest && (
				<ServiceConfirmationForm
					request={selectedRequest}
					onBack={() => {
						setSelectedRequest(null);
						setCurrentScreen('hop-history');
					}}
					onSubmit={handleConfirmCompletion}
					onLogout={handleLogout}
				/>
			)}

			{currentScreen === 'hop-view-request' && selectedRequest && (
				<HOPRequestReviewView
					userRole={userRole}
					request={selectedRequest}
					onBack={() => {
						setSelectedRequest(null);
						setCurrentScreen('hop-history');
					}}
					onLogout={handleLogout}
					showActions={false}
				/>
			)}

			{currentScreen === 'facility-dashboard' && (
				<FacilityManagementDashboard
					userRole={userRole}
					onViewRequest={(req) => {
						setSelectedRequest(req);
						setCurrentScreen('facility-review-request');
					}}
					onLogout={handleLogout}
					allRequests={allRequests}
				/>
			)}

			{currentScreen === 'facility-review-request' && selectedRequest && (
				<HOPRequestReviewView
					userRole={userRole}
					request={selectedRequest}
					onBack={() => {
						setSelectedRequest(null);
						setCurrentScreen('facility-dashboard');
					}}
					onApprove={handleFacilityApproveRequest}
					onReject={handleFacilityRejectRequest}
					onLogout={handleLogout}
					showActions={true}
				/>
			)}

			{currentScreen === 'automation-setup' && (
				<AutomationSetup
					userRole={userRole}
					onBack={() => setCurrentScreen('hop-history')}
					onSave={handleSaveAutomationRules}
					onLogout={handleLogout}
					currentUser={currentUser}
					userBranch={userBranch}
					existingRules={automationRules}
				/>
			)}

			{currentScreen === 'hop-auto-review' && selectedRequest && (
				<AutoRequestReview
					request={selectedRequest}
					userRole={userRole}
					onBack={() => setCurrentScreen('hop-history')}
					onSubmit={handleSubmitAutoRequest}
					onLogout={handleLogout}
				/>
			)}

			{currentScreen === 'audit-log' && (
				<AuditLog
					userRole={userRole}
					onBack={() => {
						if (userRole === 'hop') setCurrentScreen('hop-history');
						else if (userRole === 'facility')
							setCurrentScreen('facility-dashboard');
						else setCurrentScreen('login');
					}}
					onLogout={handleLogout}
					auditEntries={getAllAuditEntries()}
				/>
			)}
		</>
	);
}
