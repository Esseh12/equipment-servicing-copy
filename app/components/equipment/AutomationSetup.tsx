import React, { useState } from 'react';
import { ServiceCentralLayout } from '../ServiceCentralLayout';
import { BreadcrumbNavigation } from '../shared/BreadcrumbNavigation';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import {
	ArrowLeft,
	Users,
	ChevronDown,
	Plus,
	Trash2,
	Clock,
	Calendar,
} from 'lucide-react';
import { BreadcrumbItem } from './EquipmentTypes';
import { mockBranches } from './MockData';
// import accessLogo from 'figma:asset/3ebf5c44175bf36c1eceb7236d272904dfc164a1.png';

export interface AutomationRule {
	id: string;
	branchCode: string;
	branchName: string;
	equipmentType: string;
	recurrenceMonths: number;
	urgency: 'Low' | 'Medium' | 'High';
	reasonForRequest: string;
	comments: string;
	isActive: boolean;
	lastTriggered?: string;
	nextTrigger: string;
	createdAt: string;
}

interface AutomationSetupProps {
	userRole: string | null;
	onBack: () => void;
	onSave: (rules: AutomationRule[]) => void;
	onLogout: () => void;
	currentUser: string;
	userBranch: string;
	existingRules: AutomationRule[];
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
	onSave,
	userBranch,
	existingRules,
}: AutomationSetupProps) {
	const branch = mockBranches.find((b) => b.code === userBranch);
	const [rules, setRules] = useState<AutomationRule[]>(existingRules);
	const [showNewForm, setShowNewForm] = useState(false);

	const [newRule, setNewRule] = useState({
		branchCode: userBranch,
		branchName: branch?.name || '',
		equipmentType: '',
		recurrenceMonths: 6,
		urgency: 'Medium' as 'Low' | 'Medium' | 'High',
		reasonForRequest: '',
		comments: '',
	});

	const [showEquipmentDropdown, setShowEquipmentDropdown] = useState(false);
	const [showUrgencyDropdown, setShowUrgencyDropdown] = useState(false);

	const equipmentTypes = [
		'Fire Extinguisher',
		'Fire Alarm',
		'Smoke Detector',
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
			label: 'Automation Setup',
			screen: 'automation-setup',
			icon: null,
			current: true,
			isClickable: false,
		},
	];

	const handleAddRule = () => {
		if (!newRule.equipmentType || !newRule.reasonForRequest) {
			alert('Please fill in all required fields');
			return;
		}

		const nextTriggerDate = new Date();
		nextTriggerDate.setMonth(
			nextTriggerDate.getMonth() + newRule.recurrenceMonths
		);

		const rule: AutomationRule = {
			id: `AUTO-${Date.now()}`,
			...newRule,
			isActive: true,
			nextTrigger: nextTriggerDate.toISOString().split('T')[0],
			createdAt: new Date().toISOString(),
		};

		setRules([...rules, rule]);
		setNewRule({
			branchCode: userBranch,
			branchName: branch?.name || '',
			equipmentType: '',
			recurrenceMonths: 6,
			urgency: 'Medium',
			reasonForRequest: '',
			comments: '',
		});
		setShowNewForm(false);
	};

	const handleToggleActive = (id: string) => {
		setRules(
			rules.map((rule) =>
				rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
			)
		);
	};

	const handleDeleteRule = (id: string) => {
		if (confirm('Are you sure you want to delete this automation rule?')) {
			setRules(rules.filter((rule) => rule.id !== id));
		}
	};

	const handleSave = () => {
		onSave(rules);
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
				<div className='max-w-4xl mx-auto'>
					{/* Header */}
					<div className='mb-8'>
						<div className='flex items-center gap-3 mb-2'>
							<Clock className='h-8 w-8 text-[#003883]' />
							<h1 className='text-[30px] text-[#101828]'>
								Automated Servicing Setup
							</h1>
						</div>
						<p className='text-[16px] text-[#475467]'>
							Schedule recurring equipment servicing requests that will be
							automatically generated based on your defined intervals
						</p>
					</div>

					{/* Existing Rules */}
					{rules.length > 0 && (
						<div className='mb-6'>
							<h2 className='text-[20px] text-[#101828] mb-4'>
								Active Automation Rules
							</h2>
							<div className='space-y-3'>
								{rules.map((rule) => (
									<div
										key={rule.id}
										className='bg-white rounded-[12px] border border-[#eaecf0] shadow-sm p-6'>
										<div className='flex items-start justify-between'>
											<div className='flex-1'>
												<div className='flex items-center gap-3 mb-3'>
													<h3 className='text-[18px] text-[#101828]'>
														{rule.equipmentType}
													</h3>
													<Badge
														className={
															rule.isActive
																? 'bg-[#ecfdf3] text-[#027a48]'
																: 'bg-[#f2f4f7] text-[#475467]'
														}>
														{rule.isActive ? 'Active' : 'Paused'}
													</Badge>
												</div>

												<div className='grid grid-cols-2 gap-4 mb-3'>
													<div>
														<div className='text-[12px] text-[#667085] mb-1'>
															Recurrence
														</div>
														<div className='text-[14px] text-[#101828]'>
															Every {rule.recurrenceMonths} months
														</div>
													</div>
													<div>
														<div className='text-[12px] text-[#667085] mb-1'>
															Next Trigger
														</div>
														<div className='text-[14px] text-[#101828] flex items-center gap-2'>
															<Calendar className='h-4 w-4 text-[#667085]' />
															{new Date(rule.nextTrigger).toLocaleDateString(
																'en-US',
																{
																	year: 'numeric',
																	month: 'short',
																	day: 'numeric',
																}
															)}
														</div>
													</div>
													<div>
														<div className='text-[12px] text-[#667085] mb-1'>
															Urgency
														</div>
														<div className='text-[14px] text-[#101828]'>
															{rule.urgency}
														</div>
													</div>
													<div>
														<div className='text-[12px] text-[#667085] mb-1'>
															Branch
														</div>
														<div className='text-[14px] text-[#101828]'>
															{rule.branchName}
														</div>
													</div>
												</div>

												<div className='mb-3'>
													<div className='text-[12px] text-[#667085] mb-1'>
														Reason
													</div>
													<div className='text-[14px] text-[#475467]'>
														{rule.reasonForRequest}
													</div>
												</div>
											</div>

											<div className='flex gap-2 ml-4'>
												<Button
													size='sm'
													variant='outline'
													onClick={() => handleToggleActive(rule.id)}
													className='border-[#d0d5dd]'>
													{rule.isActive ? 'Pause' : 'Activate'}
												</Button>
												<Button
													size='sm'
													variant='outline'
													onClick={() => handleDeleteRule(rule.id)}
													className='border-[#dc2626] text-[#dc2626] hover:bg-[#fef2f2]'>
													<Trash2 className='h-4 w-4' />
												</Button>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Add New Rule Button */}
					{!showNewForm && (
						<Button
							onClick={() => setShowNewForm(true)}
							className='bg-[#003883] hover:bg-[#002664] text-white mb-6'>
							<Plus className='h-4 w-4 mr-2' />
							Add New Automation Rule
						</Button>
					)}

					{/* New Rule Form */}
					{showNewForm && (
						<div className='bg-white rounded-[12px] border border-[#eaecf0] shadow-sm p-6 lg:p-8 mb-6'>
							<h2 className='text-[20px] text-[#101828] mb-6'>
								Create New Automation Rule
							</h2>

							<div className='space-y-6'>
								{/* Branch Info */}
								<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
									<div>
										<label className='text-[14px] text-[#344054] block mb-2'>
											Branch Code
										</label>
										<Input
											value={newRule.branchCode}
											disabled
											className='bg-gray-50 border-[#d0d5dd]'
										/>
									</div>
									<div>
										<label className='text-[14px] text-[#344054] block mb-2'>
											Branch Name
										</label>
										<Input
											value={newRule.branchName}
											disabled
											className='bg-gray-50 border-[#d0d5dd]'
										/>
									</div>
								</div>

								{/* Equipment Type */}
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
												{newRule.equipmentType || 'Select equipment type'}
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
															setNewRule({ ...newRule, equipmentType: type });
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

								{/* Recurrence and Urgency */}
								<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
									<div>
										<label className='text-[14px] text-[#344054] block mb-2'>
											Recurrence (Months){' '}
											<span className='text-red-500'>*</span>
										</label>
										<Input
											type='number'
											min='1'
											max='24'
											value={newRule.recurrenceMonths}
											onChange={(e) =>
												setNewRule({
													...newRule,
													recurrenceMonths: parseInt(e.target.value) || 6,
												})
											}
											className='border-[#d0d5dd]'
										/>
										<p className='text-[12px] text-[#667085] mt-1'>
											Request will be generated every {newRule.recurrenceMonths}{' '}
											month{newRule.recurrenceMonths !== 1 ? 's' : ''}
										</p>
									</div>

									<div className='relative'>
										<label className='text-[14px] text-[#344054] block mb-2'>
											Default Urgency Level{' '}
											<span className='text-red-500'>*</span>
										</label>
										<div className='bg-white rounded-[8px] border border-[#d0d5dd] shadow-sm'>
											<button
												type='button'
												onClick={() =>
													setShowUrgencyDropdown(!showUrgencyDropdown)
												}
												className='w-full flex items-center justify-between px-[14px] py-[10px]'>
												<span className='text-[16px] text-[#667085]'>
													{newRule.urgency}
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
																setNewRule({
																	...newRule,
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
								</div>

								{/* Reason */}
								<div>
									<label className='text-[14px] text-[#344054] block mb-2'>
										Default Reason for Request{' '}
										<span className='text-red-500'>*</span>
									</label>
									<Textarea
										value={newRule.reasonForRequest}
										onChange={(e) =>
											setNewRule({
												...newRule,
												reasonForRequest: e.target.value,
											})
										}
										placeholder='E.g., Routine maintenance as per safety regulations'
										rows={4}
										className='border-[#d0d5dd]'
									/>
								</div>

								{/* Comments */}
								<div>
									<label className='text-[14px] text-[#344054] block mb-2'>
										Additional Comments
									</label>
									<Textarea
										value={newRule.comments}
										onChange={(e) =>
											setNewRule({ ...newRule, comments: e.target.value })
										}
										placeholder='Any additional information'
										rows={3}
										className='border-[#d0d5dd]'
									/>
								</div>
							</div>

							{/* Form Actions */}
							<div className='flex justify-end gap-4 mt-6'>
								<Button
									onClick={() => setShowNewForm(false)}
									variant='outline'
									className='border-[#d0d5dd]'>
									Cancel
								</Button>
								<Button
									onClick={handleAddRule}
									className='bg-[#003883] hover:bg-[#002664] text-white'>
									Add Rule
								</Button>
							</div>
						</div>
					)}

					{/* Save All Changes */}
					{rules.length > 0 && (
						<div className='flex justify-end'>
							<Button
								onClick={handleSave}
								className='bg-[#003883] hover:bg-[#002664] text-white px-8'>
								Save All Changes
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export function AutomationSetup(props: AutomationSetupProps) {
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
