import React, { useState } from 'react';
import { ServiceCentralLayout } from '../ServiceCentralLayout';
import { BreadcrumbNavigation } from '../shared/BreadcrumbNavigation';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import {
	Search,
	Eye,
	CheckCircle2,
	Clock,
	AlertCircle,
	FileText,
	Users,
	ChevronDown,
	XCircle,
} from 'lucide-react';
import { ServiceRequest, BreadcrumbItem } from './EquipmentTypes';
// import accessLogo from 'figma:asset/3ebf5c44175bf36c1eceb7236d272904dfc164a1.png';

interface FacilityManagementDashboardProps {
	userRole: string | null;
	onViewRequest: (request: ServiceRequest) => void;
	onLogout: () => void;
	allRequests: ServiceRequest[];
}

// Status Badge Component
function StatusBadge({ status }: { status: string }) {
	const statusConfig: Record<
		string,
		{ bg: string; text: string; dot: string }
	> = {
		'Pending Approval': {
			bg: 'bg-[#fff7ed]',
			text: 'text-[#92400E]',
			dot: 'bg-[#ff8200]',
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
		Rejected: {
			bg: 'bg-[#fef3f2]',
			text: 'text-[#b42318]',
			dot: 'bg-[#f04438]',
		},
	};

	const config = statusConfig[status] || statusConfig['Pending Approval'];

	return (
		<span
			className={`inline-flex items-center px-[8px] py-[2px] rounded-[1000px] text-[12px] border ${config.bg} ${config.text}`}>
			<div className={`w-[6px] h-[6px] rounded-full mr-[6px] ${config.dot}`} />
			{status}
		</span>
	);
}

// Sidebar Navigation
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
					<Badge className='bg-[#003883] text-white text-[11px] h-5'>
						Facility Management
					</Badge>
				</div>
			</div>

			<div className='flex-1 overflow-auto p-[16px]'>
				<div className='space-y-2'>
					<div className='px-4 py-2 bg-[#003883] text-white rounded-lg'>
						<div className='text-[14px]'>Servicing Dashboard</div>
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

// Main Content Component
function MainContent({
	userRole,
	onViewRequest,
	allRequests,
}: FacilityManagementDashboardProps) {
	const [activeTab, setActiveTab] = useState<'pending' | 'processed'>(
		'pending'
	);
	const [searchQuery, setSearchQuery] = useState('');
	const [statusFilter, setStatusFilter] = useState('All Statuses');
	const [showStatusDropdown, setShowStatusDropdown] = useState(false);

	const breadcrumbs: BreadcrumbItem[] = [
		{
			label: 'Servicing Dashboard',
			screen: 'facility-dashboard',
			icon: null,
			current: true,
			isClickable: false,
		},
	];

	const statusOptions = [
		'All Statuses',
		'Pending Approval',
		'Assigned',
		'In Progress',
		'Completed',
		'Rejected',
	];

	// FM ONLY sees Manual requests (automated requests don't need FM approval)
	const manualRequests = allRequests.filter(
		(req) => req.serviceType === 'Manual'
	);

	console.log('\n🏢 FM DASHBOARD FILTERING:');
	console.log('Total requests in system:', allRequests.length);
	console.log('Manual requests:', manualRequests.length);
	console.log(
		'Manual requests details:',
		manualRequests.map((r) => ({
			caseId: r.caseId,
			serviceType: r.serviceType,
			status: r.status,
			hopEmail: r.hopEmail,
		}))
	);

	// PENDING TAB: Only "Pending Approval" requests (need FM action)
	const pendingRequests = manualRequests.filter(
		(req) => req.status === 'Pending Approval'
	);

	console.log('Pending Approval requests:', pendingRequests.length);
	console.log(
		'Pending details:',
		pendingRequests.map((r) => ({
			caseId: r.caseId,
			status: r.status,
		}))
	);

	// PROCESSED TAB: Assigned, In Progress, Completed, or Rejected (FM already acted)
	const processedRequests = manualRequests.filter(
		(req) =>
			req.status === 'Assigned' ||
			req.status === 'In Progress' ||
			req.status === 'Completed' ||
			req.status === 'Rejected'
	);

	console.log('Processed requests:', processedRequests.length);
	console.log(
		'Processed details:',
		processedRequests.map((r) => ({
			caseId: r.caseId,
			status: r.status,
		}))
	);

	// Apply filters
	const filterRequests = (requests: ServiceRequest[]) => {
		let filtered = requests;

		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			filtered = filtered.filter(
				(req) =>
					req.caseId.toLowerCase().includes(query) ||
					req.branchCode.toLowerCase().includes(query) ||
					req.branchName.toLowerCase().includes(query) ||
					req.equipmentType.toLowerCase().includes(query) ||
					(req.vendorName && req.vendorName.toLowerCase().includes(query))
			);
		}

		if (statusFilter !== 'All Statuses') {
			filtered = filtered.filter((req) => req.status === statusFilter);
		}

		return filtered;
	};

	const displayedRequests = filterRequests(
		activeTab === 'pending' ? pendingRequests : processedRequests
	);

	console.log('Displayed requests:', displayedRequests.length);

	return (
		<div className='flex-1 flex flex-col overflow-hidden'>
			<div className='h-[65px] border-b border-[#d0d5dd] flex items-center justify-between px-[24px] flex-shrink-0'>
				<BreadcrumbNavigation items={breadcrumbs} />
			</div>

			<div className='flex-1 overflow-y-auto'>
				<div className='max-w-[1400px] mx-auto px-6 lg:px-8 py-6 lg:py-8'>
					<div className='mb-8'>
						<h1 className='text-[30px] text-[#101828] mb-2'>
							Equipment Servicing Dashboard
						</h1>
						<p className='text-[16px] text-[#475467]'>
							Review and approve manual servicing requests from branches
						</p>
					</div>

					{/* Tabs */}
					<div className='mb-6'>
						<div className='bg-white border border-[#d0d5dd] rounded-[8px] shadow-sm overflow-hidden'>
							<div className='flex'>
								<div
									onClick={() => setActiveTab('pending')}
									className={`px-[16px] py-[10px] border-r border-[#d0d5dd] flex-1 lg:flex-none cursor-pointer ${
										activeTab === 'pending'
											? 'bg-[#ebeef2]'
											: 'hover:bg-[#f9fafb]'
									}`}>
									<div
										className={`text-[14px] text-center lg:text-left ${
											activeTab === 'pending'
												? 'text-[#003883] font-semibold'
												: 'text-[#344054]'
										}`}>
										Pending Approval ({pendingRequests.length})
									</div>
								</div>

								<div
									onClick={() => setActiveTab('processed')}
									className={`px-[16px] py-[10px] flex-1 lg:flex-none cursor-pointer ${
										activeTab === 'processed'
											? 'bg-[#ebeef2]'
											: 'hover:bg-[#f9fafb]'
									}`}>
									<div
										className={`text-[14px] text-center lg:text-left ${
											activeTab === 'processed'
												? 'text-[#003883] font-semibold'
												: 'text-[#344054]'
										}`}>
										Processed Requests ({processedRequests.length})
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Filters Bar */}
					<div className='bg-gray-50 rounded-[12px] p-4 lg:p-[20px] mb-6'>
						<div className='flex flex-col lg:flex-row gap-4 lg:gap-[16px]'>
							<div className='flex-1'>
								<label className='text-[14px] text-[#344054] block mb-2'>
									Search
								</label>
								<div className='bg-white rounded-[8px] border border-[#d0d5dd] shadow-sm'>
									<div className='flex items-center px-[14px] py-[10px]'>
										<Search className='h-[20px] w-[20px] text-[#667085] mr-[8px]' />
										<Input
											placeholder='Search by Case ID, Branch, Equipment, or Vendor'
											value={searchQuery}
											onChange={(e) => setSearchQuery(e.target.value)}
											className='flex-1 border-0 outline-none bg-transparent text-[16px] text-[#667085] placeholder:text-[#667085]'
										/>
									</div>
								</div>
							</div>

							<div className='flex-1 lg:flex-initial lg:min-w-[200px] relative'>
								<label className='text-[14px] text-[#344054] block mb-2'>
									Status
								</label>
								<div className='bg-white rounded-[8px] border border-[#d0d5dd] shadow-sm'>
									<button
										onClick={() => setShowStatusDropdown(!showStatusDropdown)}
										className='w-full flex items-center justify-between px-[14px] py-[10px]'>
										<span className='text-[16px] text-[#667085]'>
											{statusFilter}
										</span>
										<ChevronDown className='h-[20px] w-[20px] text-[#667085]' />
									</button>

									{showStatusDropdown && (
										<div className='absolute top-full left-0 right-0 mt-1 bg-white border border-[#d0d5dd] rounded-[8px] shadow-lg z-10'>
											{statusOptions.map((option) => (
												<button
													key={option}
													onClick={() => {
														setStatusFilter(option);
														setShowStatusDropdown(false);
													}}
													className='w-full px-[14px] py-[10px] text-left hover:bg-[#f9fafb] text-[16px] text-[#667085]'>
													{option}
												</button>
											))}
										</div>
									)}
								</div>
							</div>
						</div>
					</div>

					{/* Requests Table */}
					<div className='bg-white rounded-[12px] border border-[#eaecf0] shadow-sm overflow-hidden'>
						<div className='hidden lg:block bg-[#f9fafb] border-b border-[#eaecf0] px-6 py-3'>
							<div className='grid grid-cols-6 gap-4'>
								<div className='text-[12px] text-[#475467] uppercase tracking-[0.05em]'>
									Case ID
								</div>
								<div className='text-[12px] text-[#475467] uppercase tracking-[0.05em]'>
									Branch
								</div>
								<div className='text-[12px] text-[#475467] uppercase tracking-[0.05em]'>
									Equipment
								</div>
								<div className='text-[12px] text-[#475467] uppercase tracking-[0.05em]'>
									Status
								</div>
								<div className='text-[12px] text-[#475467] uppercase tracking-[0.05em]'>
									Date Requested
								</div>
								<div className='text-[12px] text-[#475467] uppercase tracking-[0.05em]'>
									Actions
								</div>
							</div>
						</div>

						<div className='divide-y divide-[#eaecf0]'>
							{displayedRequests.length === 0 ? (
								<div className='text-center py-12 px-4'>
									<div className='w-16 h-16 bg-[#f3f3f5] rounded-full flex items-center justify-center mx-auto mb-4'>
										<FileText className='h-8 w-8 text-[#667085]' />
									</div>
									<h3 className='text-[18px] text-[#101828] mb-2'>
										No requests found
									</h3>
									<p className='text-[14px] text-[#475467]'>
										{searchQuery || statusFilter !== 'All Statuses'
											? 'Try adjusting your search or filters'
											: activeTab === 'pending'
											? 'No pending requests at this time'
											: 'No processed requests yet'}
									</p>
								</div>
							) : (
								displayedRequests.map((request) => {
									const needsAction = request.status === 'Pending Approval';

									return (
										<div
											key={request.id}
											className={`hover:bg-[#f9fafb] ${
												needsAction
													? 'bg-[#fff9f5] border-l-4 border-l-[#ff8200]'
													: ''
											}`}>
											<div className='hidden lg:block px-6 py-4'>
												<div className='grid grid-cols-6 gap-4 items-center'>
													<div className='text-[14px] text-[#101828]'>
														{request.caseId}
														{needsAction && (
															<div className='flex items-center gap-1 mt-1'>
																<AlertCircle className='h-3 w-3 text-[#ff8200]' />
																<span className='text-[10px] text-[#ff8200]'>
																	Action Required
																</span>
															</div>
														)}
													</div>
													<div className='text-[14px] text-[#475467]'>
														{request.branchName}
													</div>
													<div className='text-[14px] text-[#475467]'>
														{request.equipmentType}
													</div>
													<div>
														<StatusBadge status={request.status} />
													</div>
													<div className='text-[14px] text-[#475467]'>
														{request.dateRequested}
													</div>
													<div>
														<Button
															onClick={() => onViewRequest(request)}
															variant='outline'
															size='sm'
															className='h-8 px-3 border-[#003883] text-[#003883] hover:bg-[#003883] hover:text-white'>
															<Eye className='h-3 w-3 mr-1' />
															Review
														</Button>
													</div>
												</div>
											</div>

											<div className='lg:hidden px-4 py-4'>
												<div className='flex flex-col gap-3'>
													<div className='flex items-start justify-between'>
														<div>
															<div className='text-[14px] text-[#101828]'>
																{request.caseId}
															</div>
															<div className='text-[12px] text-[#475467]'>
																{request.branchName}
															</div>
														</div>
														<div className='flex gap-2 items-center'>
															<StatusBadge status={request.status} />
															<Button
																onClick={() => onViewRequest(request)}
																variant='outline'
																size='sm'
																className='h-7 px-2 border-[#003883] text-[#003883] hover:bg-[#003883] hover:text-white'>
																<Eye className='h-3 w-3 mr-1' />
																Review
															</Button>
														</div>
													</div>
													<div className='text-[12px] text-[#475467]'>
														Equipment: {request.equipmentType}
													</div>
													<div className='text-[10px] text-[#667085]'>
														Requested: {request.dateRequested}
													</div>
												</div>
											</div>
										</div>
									);
								})
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export function FacilityManagementDashboard(
	props: FacilityManagementDashboardProps
) {
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
