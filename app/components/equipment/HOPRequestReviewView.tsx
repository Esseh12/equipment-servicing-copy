import React from 'react';
import { ServiceCentralLayout } from '../ServiceCentralLayout';
import { BreadcrumbNavigation } from '../shared/BreadcrumbNavigation';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import {
	ArrowLeft,
	Lock,
	Shield,
	Users,
	FileText,
	CheckCircle2,
	Download,
} from 'lucide-react';
import { ServiceRequest, BreadcrumbItem, Vendor } from './EquipmentTypes';
import { mockBranches, mockVendors } from './MockData';
// import accessLogo from 'figma:asset/3ebf5c44175bf36c1eceb7236d272904dfc164a1.png';

interface HOPRequestReviewViewProps {
	userRole: string | null;
	request: ServiceRequest;
	onBack: () => void;
	onApprove?: (
		request: ServiceRequest,
		vendorId: string,
		scheduledDate: string
	) => void;
	onReject?: (request: ServiceRequest, reason: string) => void;
	onLogout: () => void;
	showActions?: boolean; // If true, show Approve/Reject buttons (for FM)
}

// Sidebar Navigation
function SidebarContent({
	userRole,
	onLogout,
}: {
	userRole: string | null;
	onLogout: () => void;
}) {
	const isFacilityManager = userRole === 'facility';

	return (
		<div className='h-full flex flex-col'>
			<div className='h-[65px] border-b border-[#d0d5dd] flex items-center px-[16px]'>
				<div className='flex items-center gap-[10px]'>
					<img
						src='/'
						alt='Access Bank'
						className='h-8'
					/>
					<div>
						<h1 className='text-[14px] font-bold text-[#003883]'>
							Service Central
						</h1>
						<p className='text-[12px] text-[#526484]'>Staff Portal</p>
					</div>
				</div>
			</div>

			<div className='px-[16px] py-[16px] border-b border-[#d0d5dd]'>
				<div className='text-[18px] text-[#003883]'>Staff Portal</div>
				<div className='flex items-center gap-2 mt-1'>
					<Users className='h-4 w-4 text-[#526484]' />
					<span className='text-[12px] text-[#526484]'>Role:</span>
					<Badge className='bg-[#003883] text-white text-[11px] h-5'>
						{isFacilityManager ? 'Facility Management' : 'HOP'}
					</Badge>
				</div>
			</div>

			<div className='flex-1 overflow-auto p-[16px]'>
				<div className='space-y-2'>
					<div className='px-4 py-2 bg-[#003883] text-white rounded-lg'>
						<div className='text-[14px]'>Equipment Servicing</div>
					</div>
				</div>
			</div>

			<div className='p-[16px] border-t border-[#d0d5dd]'>
				<Button
					onClick={onLogout}
					variant='outline'
					className='w-full border-[#003883] text-[#003883] hover:bg-[#003883] hover:text-white'>
					Logout
				</Button>
			</div>
		</div>
	);
}

// Header Content
function HeaderContent() {
	return <div className='h-full' />;
}

// Status Badge Component
function StatusBadge({ status }: { status: string }) {
	const statusConfig: Record<
		string,
		{ bg: string; text: string; dot: string }
	> = {
		Pending: {
			bg: 'bg-[#fff7ed]',
			text: 'text-[#92400E]',
			dot: 'bg-[#ff8200]',
		},
		'Pending Approval': {
			bg: 'bg-[#fff7ed]',
			text: 'text-[#92400E]',
			dot: 'bg-[#ff8200]',
		},
		Approved: {
			bg: 'bg-[#ecfdf3]',
			text: 'text-[#027a48]',
			dot: 'bg-[#12b76a]',
		},
		Assigned: {
			bg: 'bg-[#eff8ff]',
			text: 'text-[#175cd3]',
			dot: 'bg-[#175cd3]',
		},
		'In Progress': {
			bg: 'bg-[#f4f3ff]',
			text: 'text-[#5925dc]',
			dot: 'bg-[#5925dc]',
		},
		Completed: {
			bg: 'bg-[#ecfdf3]',
			text: 'text-[#027a48]',
			dot: 'bg-[#12b76a]',
		},
		Overdue: {
			bg: 'bg-[#fef3f2]',
			text: 'text-[#b42318]',
			dot: 'bg-[#f04438]',
		},
		Rejected: {
			bg: 'bg-[#fef3f2]',
			text: 'text-[#b42318]',
			dot: 'bg-[#f04438]',
		},
	};

	const config = statusConfig[status] || statusConfig['Pending'];

	return (
		<span
			className={`inline-flex items-center px-[8px] py-[2px] rounded-[1000px] font-['Inter:Medium',_sans-serif] font-medium text-[12px] leading-[18px] border ${config.bg} ${config.text}`}>
			<div className={`w-[6px] h-[6px] rounded-full mr-[6px] ${config.dot}`} />
			{status}
		</span>
	);
}

// Main Content Component
function MainContent({
	request,
	userRole,
	onBack,
	onApprove,
	onReject,
	showActions = false,
}: HOPRequestReviewViewProps) {
	const [selectedVendor, setSelectedVendor] = React.useState<string>('');
	const [scheduledDate, setScheduledDate] = React.useState<string>('');
	const [rejectionReason, setRejectionReason] = React.useState<string>('');
	const [showRejectForm, setShowRejectForm] = React.useState(false);

	const isFacilityManager = userRole === 'facility';

	// Breadcrumb setup
	const breadcrumbs: BreadcrumbItem[] = isFacilityManager
		? [
				{
					label: 'Servicing Dashboard',
					screen: 'facility-dashboard',
					icon: null,
					isClickable: true,
				},
				{
					label: 'Review Request',
					screen: 'review-request',
					icon: null,
					current: true,
					isClickable: false,
				},
		  ]
		: [
				{
					label: 'Equipment Servicing',
					screen: 'hop-history',
					icon: null,
					isClickable: true,
				},
				{
					label: 'View Request',
					screen: 'view-request',
					icon: null,
					current: true,
					isClickable: false,
				},
		  ];

	const handleApprove = () => {
		if (!selectedVendor || !scheduledDate) {
			alert('Please select a vendor and scheduled date');
			return;
		}
		if (onApprove) {
			onApprove(request, selectedVendor, scheduledDate);
		}
	};

	const handleReject = () => {
		if (!rejectionReason.trim()) {
			alert('Please provide a reason for rejection');
			return;
		}
		if (onReject) {
			onReject(request, rejectionReason);
		}
	};

	const branchName =
		mockBranches.find((b) => b.code === request.branchCode)?.name ||
		request.branchName;

	return (
		<div className='bg-[#f8fafc] h-full overflow-y-auto'>
			<div className='max-w-4xl mx-auto p-4 lg:p-6'>
				{/* Breadcrumbs */}
				<BreadcrumbNavigation
					breadcrumbs={breadcrumbs}
					onBreadcrumbClick={(screen) => {
						if (screen === 'facility-dashboard' || screen === 'hop-history') {
							onBack();
						}
					}}
				/>

				{/* Back Button */}
				<button
					onClick={onBack}
					className='flex items-center gap-2 mb-6 mt-6 text-[#003883] hover:text-[#002664] transition-colors'>
					<ArrowLeft className='h-4 w-4' />
					<span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[14px] leading-[20px]">
						Back to {isFacilityManager ? 'Dashboard' : 'Requests'}
					</span>
				</button>

				{/* Page Header */}
				<div className='mb-6'>
					<div className='flex items-center justify-between mb-2'>
						<h2 className="font-['Inter:Bold',_sans-serif] font-bold text-[30px] text-[#101828] leading-[38px] tracking-[-0.6px]">
							{showActions
								? 'Review Servicing Request'
								: 'Servicing Request Details'}
						</h2>
						<StatusBadge status={request.status} />
					</div>
					<p className="font-['Inter:Regular',_sans-serif] font-normal text-[16px] text-[#475467] leading-[24px]">
						Request submitted by {request.hopName} on{' '}
						{new Date(request.dateRequested).toLocaleDateString('en-US', {
							month: 'short',
							day: 'numeric',
							year: 'numeric',
						})}
					</p>
				</div>

				{/* Request Details Card */}
				<div className='bg-white rounded-[12px] border border-[#eaecf0] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] mb-6'>
					{/* Section 1: Request Information */}
					<div className='p-6 border-b border-[#eaecf0]'>
						<div className='flex items-center gap-3 mb-6'>
							<div className='w-10 h-10 rounded-full bg-[#003883] text-white flex items-center justify-center shrink-0'>
								<span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[16px] leading-[24px]">
									1
								</span>
							</div>
							<h3 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[18px] text-[#101828] leading-[28px]">
								Request Information
							</h3>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
							<div>
								<Label className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#344054] leading-[20px] mb-[6px] block">
									Case ID
								</Label>
								<Input
									value={request.caseId}
									disabled
									className='h-[44px] bg-[#f9fafb] border-[#d0d5dd] text-[#667085] rounded-[8px]'
								/>
							</div>

							<div>
								<Label className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#344054] leading-[20px] mb-[6px] block">
									Service Type
								</Label>
								<Input
									value={request.serviceType}
									disabled
									className='h-[44px] bg-[#f9fafb] border-[#d0d5dd] text-[#667085] rounded-[8px]'
								/>
							</div>

							<div>
								<Label className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#344054] leading-[20px] mb-[6px] block">
									Date Requested
								</Label>
								<Input
									value={new Date(request.dateRequested).toLocaleDateString(
										'en-US',
										{ month: 'short', day: 'numeric', year: 'numeric' }
									)}
									disabled
									className='h-[44px] bg-[#f9fafb] border-[#d0d5dd] text-[#667085] rounded-[8px]'
								/>
							</div>

							<div>
								<Label className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#344054] leading-[20px] mb-[6px] block">
									Requested By
								</Label>
								<Input
									value={request.hopName}
									disabled
									className='h-[44px] bg-[#f9fafb] border-[#d0d5dd] text-[#667085] rounded-[8px]'
								/>
							</div>
						</div>
					</div>

					{/* Section 2: Branch Information */}
					<div className='p-6 border-b border-[#eaecf0]'>
						<div className='flex items-center gap-3 mb-6'>
							<div className='w-10 h-10 rounded-full bg-[#003883] text-white flex items-center justify-center shrink-0'>
								<span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[16px] leading-[24px]">
									2
								</span>
							</div>
							<h3 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[18px] text-[#101828] leading-[28px]">
								Branch Information
							</h3>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
							<div>
								<Label className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#344054] leading-[20px] mb-[6px] block">
									Branch Code
								</Label>
								<Input
									value={request.branchCode}
									disabled
									className='h-[44px] bg-[#f9fafb] border-[#d0d5dd] text-[#667085] rounded-[8px]'
								/>
							</div>

							<div>
								<Label className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#344054] leading-[20px] mb-[6px] block">
									Branch Name
								</Label>
								<Input
									value={branchName}
									disabled
									className='h-[44px] bg-[#f9fafb] border-[#d0d5dd] text-[#667085] rounded-[8px]'
								/>
							</div>
						</div>
					</div>

					{/* Section 3: Service Details */}
					<div className='p-6 border-b border-[#eaecf0]'>
						<div className='flex items-center gap-3 mb-6'>
							<div className='w-10 h-10 rounded-full bg-[#003883] text-white flex items-center justify-center shrink-0'>
								<span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[16px] leading-[24px]">
									3
								</span>
							</div>
							<h3 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[18px] text-[#101828] leading-[28px]">
								Service Details
							</h3>
						</div>

						<div className='space-y-5'>
							<div>
								<Label className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#344054] leading-[20px] mb-[6px] block">
									Equipment Type
								</Label>
								<Input
									value={request.equipmentType}
									disabled
									className='h-[44px] bg-[#f9fafb] border-[#d0d5dd] text-[#667085] rounded-[8px]'
								/>
							</div>

							<div>
								<Label className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#344054] leading-[20px] mb-[6px] block">
									Urgency Level
								</Label>
								<Input
									value={request.urgency}
									disabled
									className='h-[44px] bg-[#f9fafb] border-[#d0d5dd] text-[#667085] rounded-[8px]'
								/>
							</div>

							<div>
								<Label className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#344054] leading-[20px] mb-[6px] block">
									Reason for Request
								</Label>
								<Textarea
									value={request.reasonForRequest || 'N/A'}
									disabled
									className='min-h-[100px] bg-[#f9fafb] border-[#d0d5dd] text-[#667085] rounded-[8px] resize-none'
								/>
							</div>

							{request.comments && (
								<div>
									<Label className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#344054] leading-[20px] mb-[6px] block">
										Additional Comments
									</Label>
									<Textarea
										value={request.comments}
										disabled
										className='min-h-[80px] bg-[#f9fafb] border-[#d0d5dd] text-[#667085] rounded-[8px] resize-none'
									/>
								</div>
							)}

							{request.supportingDocUrl && (
								<div>
									<Label className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#344054] leading-[20px] mb-[6px] block">
										Supporting Documents
									</Label>
									<div className='flex items-center gap-2 p-3 bg-[#f9fafb] border border-[#d0d5dd] rounded-[8px]'>
										<FileText className='h-5 w-5 text-[#667085]' />
										<span className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#344054] flex-1">
											supporting-document.pdf
										</span>
										<Button
											type='button'
											size='sm'
											variant='ghost'
											className='h-8 px-2 text-[#003883] hover:text-[#002664] hover:bg-[#eff6ff]'>
											<Download className='h-4 w-4' />
										</Button>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Vendor Assignment Section (Only for Facility Manager if Pending Approval) */}
					{showActions &&
						request.status === 'Pending Approval' &&
						!showRejectForm && (
							<div className='p-6'>
								<div className='flex items-center gap-3 mb-6'>
									<div className='w-10 h-10 rounded-full bg-[#003883] text-white flex items-center justify-center shrink-0'>
										<span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[16px] leading-[24px]">
											4
										</span>
									</div>
									<h3 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[18px] text-[#101828] leading-[28px]">
										Vendor Assignment
									</h3>
								</div>

								<div className='space-y-5'>
									<div>
										<Label className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#344054] leading-[20px] mb-[6px] block">
											Select Vendor <span className='text-[#f04438]'>*</span>
										</Label>
										<select
											value={selectedVendor}
											onChange={(e) => setSelectedVendor(e.target.value)}
											className="w-full h-[44px] px-3 bg-white border border-[#d0d5dd] rounded-[8px] font-['Inter:Regular',_sans-serif] text-[16px] text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#003883] focus:border-transparent">
											<option value=''>Select a vendor...</option>
											{mockVendors
												.filter((v) =>
													v.specialization.includes(request.equipmentType)
												)
												.map((vendor) => (
													<option
														key={vendor.id}
														value={vendor.id}>
														{vendor.name} - {vendor.specialization.join(', ')}
													</option>
												))}
										</select>
									</div>

									<div>
										<Label className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#344054] leading-[20px] mb-[6px] block">
											Scheduled Date <span className='text-[#f04438]'>*</span>
										</Label>
										<Input
											type='date'
											value={scheduledDate}
											onChange={(e) => setScheduledDate(e.target.value)}
											min={new Date().toISOString().split('T')[0]}
											className='h-[44px] border-[#d0d5dd] rounded-[8px]'
										/>
									</div>
								</div>
							</div>
						)}

					{/* Rejection Form (Only for Facility Manager if rejecting) */}
					{showActions && showRejectForm && (
						<div className='p-6'>
							<div className='flex items-center gap-3 mb-6'>
								<div className='w-10 h-10 rounded-full bg-[#f04438] text-white flex items-center justify-center shrink-0'>
									<span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[16px] leading-[24px]">
										!
									</span>
								</div>
								<h3 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[18px] text-[#101828] leading-[28px]">
									Rejection Reason
								</h3>
							</div>

							<div>
								<Label className="font-['Inter:Medium',_sans-serif] font-medium text-[14px] text-[#344054] leading-[20px] mb-[6px] block">
									Please provide a reason for rejection{' '}
									<span className='text-[#f04438]'>*</span>
								</Label>
								<Textarea
									value={rejectionReason}
									onChange={(e) => setRejectionReason(e.target.value)}
									placeholder='Enter the reason for rejecting this request...'
									className='min-h-[120px] border-[#d0d5dd] rounded-[8px] resize-none'
								/>
							</div>
						</div>
					)}
				</div>

				{/* Action Buttons */}
				<div className='flex items-center justify-end gap-3'>
					<Button
						onClick={onBack}
						variant='outline'
						className='h-[44px] px-[18px] rounded-[8px] border-[#d0d5dd] text-[#344054] hover:bg-[#f9fafb]'>
						<span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[16px] leading-[24px]">
							Back
						</span>
					</Button>

					{showActions && request.status === 'Pending Approval' && (
						<>
							{!showRejectForm ? (
								<>
									<Button
										onClick={() => setShowRejectForm(true)}
										variant='outline'
										className='h-[44px] px-[18px] rounded-[8px] border-[#f04438] text-[#f04438] hover:bg-[#fef3f2]'>
										<span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[16px] leading-[24px]">
											Reject Request
										</span>
									</Button>
									<Button
										onClick={handleApprove}
										className='h-[44px] px-[18px] rounded-[8px] bg-[#003883] hover:bg-[#002664] text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]'>
										<CheckCircle2 className='h-4 w-4 mr-2' />
										<span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[16px] leading-[24px]">
											Approve & Assign Vendor
										</span>
									</Button>
								</>
							) : (
								<>
									<Button
										onClick={() => setShowRejectForm(false)}
										variant='outline'
										className='h-[44px] px-[18px] rounded-[8px] border-[#d0d5dd] text-[#344054] hover:bg-[#f9fafb]'>
										<span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[16px] leading-[24px]">
											Cancel
										</span>
									</Button>
									<Button
										onClick={handleReject}
										className='h-[44px] px-[18px] rounded-[8px] bg-[#f04438] hover:bg-[#d92d20] text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]'>
										<span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[16px] leading-[24px]">
											Confirm Rejection
										</span>
									</Button>
								</>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export function HOPRequestReviewView(props: HOPRequestReviewViewProps) {
	return (
		<ServiceCentralLayout
			sidebarContent={
				<SidebarContent
					userRole={props.userRole}
					onLogout={props.onLogout}
				/>
			}
			headerContent={<HeaderContent />}>
			<MainContent {...props} />
		</ServiceCentralLayout>
	);
}
