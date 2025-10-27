import React, { useState } from 'react';
import { ServiceCentralLayout } from '../ServiceCentralLayout';
import { BreadcrumbNavigation } from '../shared/BreadcrumbNavigation';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { ArrowLeft, Users, Clock, AlertTriangle } from 'lucide-react';
import { ServiceRequest, BreadcrumbItem } from './EquipmentTypes';
import { HOPRequestConfirmationModal } from './HOPRequestConfirmationModal';
// import accessLogo from 'figma:asset/3ebf5c44175bf36c1eceb7236d272904dfc164a1.png';

interface AutoRequestReviewProps {
	request: ServiceRequest;
	userRole: string | null;
	onBack: () => void;
	onSubmit: (data: Partial<ServiceRequest>) => void;
	onLogout: () => void;
}

// Sidebar
function SidebarContent({
	userRole,
	onLogout,
}: {
	userRole: string | null;
	onLogout: () => void;
}) {
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
					<Badge className='bg-[#003883] text-white text-[11px] h-5'>HOP</Badge>
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

// Main Content
function MainContent({ request, onBack, onSubmit }: AutoRequestReviewProps) {
	const [formData, setFormData] = useState({
		...request,
		dateRequested: new Date().toISOString().split('T')[0],
	});
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	const breadcrumbs: BreadcrumbItem[] = [
		{
			label: 'Equipment Servicing',
			screen: 'hop-history',
			icon: null,
			current: false,
			isClickable: true,
		},
		{
			label: 'Review Auto Request',
			screen: 'auto-review',
			icon: null,
			current: true,
			isClickable: false,
		},
	];

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setShowConfirmModal(true);
	};

	const handleConfirmSubmit = () => {
		setShowConfirmModal(false);
		onSubmit(formData);
	};

	return (
		<div className='flex-1 flex flex-col overflow-hidden'>
			<div className='h-[65px] border-b border-[#d0d5dd] flex items-center justify-between px-[24px] flex-shrink-0'>
				<BreadcrumbNavigation items={breadcrumbs} />
				<Button
					onClick={onBack}
					variant='outline'
					className='border-[#003883] text-[#003883] hover:bg-[#003883] hover:text-white'>
					<ArrowLeft className='h-4 w-4 mr-2' />
					Back
				</Button>
			</div>

			<div className='flex-1 overflow-y-auto p-6 lg:p-[32px]'>
				<div className='max-w-3xl mx-auto'>
					{/* Alert Banner */}
					<div className='bg-[#eff8ff] border border-[#b9e6fe] rounded-[12px] p-4 mb-6 flex items-start gap-3'>
						<Clock className='h-5 w-5 text-[#0086c9] flex-shrink-0 mt-0.5' />
						<div>
							<div className='text-[14px] text-[#026aa2] mb-1'>
								Auto-Generated Service Request
							</div>
							<div className='text-[12px] text-[#026aa2]'>
								This request was automatically generated based on your
								automation rules. Review the details below and submit to proceed
								with approval.
							</div>
						</div>
					</div>

					{/* Header */}
					<div className='mb-8'>
						<div className='flex items-center gap-3 mb-2'>
							<h1 className='text-[30px] text-[#101828]'>
								Review Automated Request
							</h1>
							<Badge className='bg-[#eff8ff] text-[#175cd3] text-[14px] h-7'>
								AUTO
							</Badge>
						</div>
						<p className='text-[16px] text-[#475467]'>
							Case ID: {request.caseId}
						</p>
					</div>

					<form onSubmit={handleSubmit}>
						<div className='bg-white rounded-[12px] border border-[#eaecf0] shadow-sm p-6 lg:p-8 mb-6'>
							{/* Section 1: Branch Information */}
							<div className='mb-8'>
								<div className='flex items-center gap-3 mb-6'>
									<div className='w-8 h-8 rounded-full bg-[#003883] text-white flex items-center justify-center text-[14px]'>
										1
									</div>
									<h2 className='text-[20px] text-[#101828]'>
										Branch Information
									</h2>
								</div>

								<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 ml-11'>
									<div>
										<label className='text-[14px] text-[#344054] block mb-2'>
											Branch Code
										</label>
										<Input
											value={formData.branchCode}
											disabled
											className='bg-gray-50 border-[#d0d5dd]'
										/>
									</div>
									<div>
										<label className='text-[14px] text-[#344054] block mb-2'>
											Branch Name
										</label>
										<Input
											value={formData.branchName}
											disabled
											className='bg-gray-50 border-[#d0d5dd]'
										/>
									</div>
								</div>
							</div>

							{/* Section 2: Service Details */}
							<div className='mb-8'>
								<div className='flex items-center gap-3 mb-6'>
									<div className='w-8 h-8 rounded-full bg-[#003883] text-white flex items-center justify-center text-[14px]'>
										2
									</div>
									<h2 className='text-[20px] text-[#101828]'>
										Service Details
									</h2>
								</div>

								<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 ml-11'>
									<div>
										<label className='text-[14px] text-[#344054] block mb-2'>
											Equipment Type
										</label>
										<Input
											value={formData.equipmentType}
											disabled
											className='bg-gray-50 border-[#d0d5dd]'
										/>
									</div>

									<div>
										<label className='text-[14px] text-[#344054] block mb-2'>
											Urgency Level
										</label>
										<Input
											value={formData.urgency}
											disabled
											className='bg-gray-50 border-[#d0d5dd]'
										/>
									</div>

									<div>
										<label className='text-[14px] text-[#344054] block mb-2'>
											Date Requested
										</label>
										<Input
											type='date'
											value={formData.dateRequested}
											onChange={(e) =>
												setFormData({
													...formData,
													dateRequested: e.target.value,
												})
											}
											min={new Date().toISOString().split('T')[0]}
											className='border-[#d0d5dd]'
										/>
									</div>

									<div>
										<label className='text-[14px] text-[#344054] block mb-2'>
											Service Type
										</label>
										<div className='flex items-center gap-2'>
											<Input
												value='Auto'
												disabled
												className='bg-gray-50 border-[#d0d5dd]'
											/>
											<Badge className='bg-[#eff8ff] text-[#175cd3]'>
												Automated
											</Badge>
										</div>
									</div>

									<div className='lg:col-span-2'>
										<label className='text-[14px] text-[#344054] block mb-2'>
											Reason for Request
										</label>
										<Textarea
											value={formData.reasonForRequest || ''}
											onChange={(e) =>
												setFormData({
													...formData,
													reasonForRequest: e.target.value,
												})
											}
											rows={4}
											className='border-[#d0d5dd]'
										/>
									</div>

									<div className='lg:col-span-2'>
										<label className='text-[14px] text-[#344054] block mb-2'>
											Additional Comments
										</label>
										<Textarea
											value={formData.comments || ''}
											onChange={(e) =>
												setFormData({ ...formData, comments: e.target.value })
											}
											placeholder='Add any additional information'
											rows={3}
											className='border-[#d0d5dd]'
										/>
									</div>
								</div>
							</div>
						</div>

						{/* Action Buttons */}
						<div className='flex justify-end gap-4'>
							<Button
								type='button'
								onClick={onBack}
								variant='outline'
								className='border-[#d0d5dd]'>
								Cancel
							</Button>
							<Button
								type='submit'
								className='bg-[#003883] hover:bg-[#002664] text-white'>
								Submit Request
							</Button>
						</div>
					</form>
				</div>
			</div>

			{/* Confirmation Modal */}
			<HOPRequestConfirmationModal
				isOpen={showConfirmModal}
				onClose={() => setShowConfirmModal(false)}
				onConfirm={handleConfirmSubmit}
				requestData={formData}
			/>
		</div>
	);
}

export function AutoRequestReview(props: AutoRequestReviewProps) {
	return (
		<ServiceCentralLayout
			sidebarContent={
				<SidebarContent
					userRole={props.userRole}
					onLogout={props.onLogout}
				/>
			}>
			<MainContent {...props} />
		</ServiceCentralLayout>
	);
}
