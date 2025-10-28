'use client';

import React, { useState } from 'react';
import { ServiceCentralLayout } from '../ServiceCentralLayout';
import { BreadcrumbNavigation } from '../shared/BreadcrumbNavigation';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { ArrowLeft, Users, ChevronDown } from 'lucide-react';
import { ServiceRequest, BreadcrumbItem } from './EquipmentTypes';
import { mockBranches } from './MockData';
import { HOPRequestConfirmationModal } from './HOPRequestConfirmationModal';
// import accessLogo from 'figma:asset/3ebf5c44175bf36c1eceb7236d272904dfc164a1.png';

interface HOPManualRequestFormProps {
	userRole: string | null;
	onBack: () => void;
	onSubmit: (data: Partial<ServiceRequest>) => void;
	onLogout: () => void;
	currentUser: string;
	userBranch: string;
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
function MainContent({
	onBack,
	onSubmit,
	userBranch,
}: HOPManualRequestFormProps) {
	const branch = mockBranches.find((b) => b.code === userBranch);

	const [formData, setFormData] = useState({
		branchCode: userBranch,
		branchName: branch?.name || '',
		equipmentType: '',
		urgency: 'Medium' as 'Low' | 'Medium' | 'High',
		dateRequested: new Date().toISOString().split('T')[0],
		reasonForRequest: '',
		comments: '',
	});

	const [showEquipmentDropdown, setShowEquipmentDropdown] = useState(false);
	const [showUrgencyDropdown, setShowUrgencyDropdown] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	const equipmentTypes = [
		'Fire Extinguisher',
		'Fire Alarm',
		'Generator',
		'Air Conditioner',
		'Other',
	];
	const urgencyLevels = ['Low', 'Medium', 'High'];

	const breadcrumbs: BreadcrumbItem[] = [
		{
			label: 'Equipment Servicing',
			screen: 'hop-history',
			icon: null,
			current: false,
			isClickable: true,
		},
		{
			label: 'New Manual Request',
			screen: 'hop-manual-request',
			icon: null,
			current: true,
			isClickable: false,
		},
	];

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.equipmentType) {
			alert('Please select equipment type');
			return;
		}

		if (!formData.reasonForRequest) {
			alert('Please provide reason for request');
			return;
		}

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
					<div className='mb-8'>
						<h1 className='text-[30px] text-[#101828] mb-2'>
							New Manual Servicing Request
						</h1>
						<p className='text-[16px] text-[#475467]'>
							Request equipment servicing for your branch
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
											Branch Code <span className='text-red-500'>*</span>
										</label>
										<Input
											value={formData.branchCode}
											disabled
											className='bg-gray-50 border-[#d0d5dd]'
										/>
									</div>
									<div>
										<label className='text-[14px] text-[#344054] block mb-2'>
											Branch Name <span className='text-red-500'>*</span>
										</label>
										<Input
											value={formData.branchName}
											disabled
											className='bg-gray-50 border-[#d0d5dd]'
										/>
									</div>
								</div>
							</div>

							{/* Section 2: Service Request Details */}
							<div className='mb-8'>
								<div className='flex items-center gap-3 mb-6'>
									<div className='w-8 h-8 rounded-full bg-[#003883] text-white flex items-center justify-center text-[14px]'>
										2
									</div>
									<h2 className='text-[20px] text-[#101828]'>
										Service Request Details
									</h2>
								</div>

								<div className='grid grid-cols-1 gap-6 ml-11'>
									<div className='relative'>
										<label className='text-[14px] text-[#344054] block mb-2'>
											Equipment Type <span className='text-red-500'>*</span>
										</label>
										<div className='bg-white rounded-[8px] border border-[#d0d5dd] shadow-sm'>
											<button
												type='button'
												onClick={() =>
													setShowEquipmentDropdown(!showEquipmentDropdown)
												}
												className='w-full flex items-center justify-between px-[14px] py-[10px]'>
												<span className='text-[16px] text-[#667085]'>
													{formData.equipmentType || 'Select equipment type'}
												</span>
												<ChevronDown className='h-[20px] w-[20px] text-[#667085]' />
											</button>

											{showEquipmentDropdown && (
												<div className='absolute top-full left-0 right-0 mt-1 bg-white border border-[#d0d5dd] rounded-[8px] shadow-lg z-10'>
													{equipmentTypes.map((type) => (
														<button
															key={type}
															type='button'
															onClick={() => {
																setFormData({
																	...formData,
																	equipmentType: type,
																});
																setShowEquipmentDropdown(false);
															}}
															className='w-full px-[14px] py-[10px] text-left hover:bg-[#f9fafb] text-[16px] text-[#667085]'>
															{type}
														</button>
													))}
												</div>
											)}
										</div>
									</div>

									<div className='relative'>
										<label className='text-[14px] text-[#344054] block mb-2'>
											Urgency Level <span className='text-red-500'>*</span>
										</label>
										<div className='bg-white rounded-[8px] border border-[#d0d5dd] shadow-sm'>
											<button
												type='button'
												onClick={() =>
													setShowUrgencyDropdown(!showUrgencyDropdown)
												}
												className='w-full flex items-center justify-between px-[14px] py-[10px]'>
												<span className='text-[16px] text-[#667085]'>
													{formData.urgency}
												</span>
												<ChevronDown className='h-[20px] w-[20px] text-[#667085]' />
											</button>

											{showUrgencyDropdown && (
												<div className='absolute top-full left-0 right-0 mt-1 bg-white border border-[#d0d5dd] rounded-[8px] shadow-lg z-10'>
													{urgencyLevels.map((level) => (
														<button
															key={level}
															type='button'
															onClick={() => {
																setFormData({
																	...formData,
																	urgency: level as 'Low' | 'Medium' | 'High',
																});
																setShowUrgencyDropdown(false);
															}}
															className='w-full px-[14px] py-[10px] text-left hover:bg-[#f9fafb] text-[16px] text-[#667085]'>
															{level}
														</button>
													))}
												</div>
											)}
										</div>
									</div>

									<div>
										<label className='text-[14px] text-[#344054] block mb-2'>
											Date Requested <span className='text-red-500'>*</span>
										</label>
										<Input
											type='date'
											value={formData.dateRequested}
											min={new Date().toISOString().split('T')[0]}
											onChange={(e) =>
												setFormData({
													...formData,
													dateRequested: e.target.value,
												})
											}
											className='border-[#d0d5dd]'
										/>
									</div>

									<div>
										<label className='text-[14px] text-[#344054] block mb-2'>
											Reason for Request <span className='text-red-500'>*</span>
										</label>
										<Textarea
											value={formData.reasonForRequest}
											onChange={(e) =>
												setFormData({
													...formData,
													reasonForRequest: e.target.value,
												})
											}
											placeholder='Describe why this servicing is needed'
											rows={4}
											className='border-[#d0d5dd]'
										/>
									</div>

									<div>
										<label className='text-[14px] text-[#344054] block mb-2'>
											Additional Comments
										</label>
										<Textarea
											value={formData.comments}
											onChange={(e) =>
												setFormData({ ...formData, comments: e.target.value })
											}
											placeholder='Any additional information'
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
								className='border-[#d0d5dd] text-[#344054] hover:bg-gray-50'>
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

export function HOPManualRequestForm(props: HOPManualRequestFormProps) {
	return (
		<>
			<ServiceCentralLayout
				sidebarContent={
					<SidebarContent
						userRole={props.userRole}
						onLogout={props.onLogout}
					/>
				}>
				<MainContent {...props} />
			</ServiceCentralLayout>
		</>
	);
}
