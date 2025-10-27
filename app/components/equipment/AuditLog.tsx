import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import { Search, Filter, FileText, ArrowLeft } from 'lucide-react';
import { AuditEntry } from './EquipmentTypes';
// import accessLogo from 'figma:asset/3ebf5c44175bf36c1eceb7236d272904dfc164a1.png';

interface AuditLogProps {
	userRole: string | null;
	onBack: () => void;
	onLogout: () => void;
	auditEntries: AuditEntry[];
}

// Header Component
function Header({
	userRole,
	onLogout,
}: {
	userRole: string | null;
	onLogout: () => void;
}) {
	return (
		<div className='bg-white border-b border-[#e2e8f0]'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-16'>
					<div className='flex items-center space-x-4'>
						<img
							src='/'
							alt='Access Bank'
							className='h-8'
						/>
						<h1 className="font-['Inter:Medium',_sans-serif] text-[18px] text-[#1e293b]">
							Service Central
						</h1>
					</div>
					<div className='flex items-center space-x-6'>
						<div className='flex items-center space-x-2'>
							<span className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#64748b]">
								Role:
							</span>
							<span className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#003883]">
								{userRole === 'hop'
									? 'Head of Place (HOP)'
									: userRole === 'facility'
									? 'Facility Management'
									: userRole}
							</span>
						</div>
						<Button
							variant='outline'
							size='sm'
							onClick={onLogout}
							className='border-[#d1d5db] text-[#374151] hover:bg-[#f9fafb]'>
							Logout
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

// Role Badge Component
function RoleBadge({ role }: { role: string }) {
	const roleConfig: Record<string, { bg: string; text: string }> = {
		HOP: { bg: 'bg-[#DBEAFE]', text: 'text-[#1E40AF]' },
		'Facility Management': { bg: 'bg-[#FEF3C7]', text: 'text-[#92400E]' },
		Vendor: { bg: 'bg-[#E0E7FF]', text: 'text-[#3730A3]' },
		System: { bg: 'bg-[#F3F4F6]', text: 'text-[#374151]' },
	};

	const config = roleConfig[role] || roleConfig['System'];

	return (
		<div
			className={`inline-flex items-center px-2 py-1 rounded-full ${config.bg}`}>
			<span
				className={`font-['Inter:Medium',_sans-serif] text-[11px] ${config.text}`}>
				{role}
			</span>
		</div>
	);
}

export function AuditLog({
	userRole,
	onBack,
	onLogout,
	auditEntries,
}: AuditLogProps) {
	const [searchQuery, setSearchQuery] = useState('');
	const [filterRole, setFilterRole] = useState<string>('all');
	const [filterCaseType, setFilterCaseType] = useState<string>('all');

	const filterAuditEntries = () => {
		let filtered = auditEntries;

		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			filtered = filtered.filter(
				(entry) =>
					entry.caseId.toLowerCase().includes(query) ||
					entry.user.toLowerCase().includes(query) ||
					entry.action.toLowerCase().includes(query) ||
					entry.branchCode.toLowerCase().includes(query)
			);
		}

		if (filterRole !== 'all') {
			filtered = filtered.filter((entry) => entry.role === filterRole);
		}

		if (filterCaseType !== 'all') {
			filtered = filtered.filter(
				(entry) => entry.serviceType === filterCaseType
			);
		}

		return filtered.sort(
			(a, b) =>
				new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
		);
	};

	const entries = filterAuditEntries();

	const formatDateTime = (timestamp: string) => {
		const date = new Date(timestamp);
		return {
			date: date.toLocaleDateString('en-US', {
				day: '2-digit',
				month: 'short',
				year: 'numeric',
			}),
			time: date.toLocaleTimeString('en-US', {
				hour: '2-digit',
				minute: '2-digit',
				hour12: false,
			}),
		};
	};

	return (
		<div className='min-h-screen bg-[#f8f9fa]'>
			<Header
				userRole={userRole}
				onLogout={onLogout}
			/>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Back Button */}
				<button
					onClick={onBack}
					className='flex items-center gap-2 mb-6 text-[#003883] hover:text-[#002664] transition-colors'>
					<ArrowLeft className='h-4 w-4' />
					<span className="font-['Inter:Medium',_sans-serif] text-[14px]">
						Back to Dashboard
					</span>
				</button>

				{/* Page Header */}
				<div className='mb-6'>
					<h2 className="font-['Inter:SemiBold',_sans-serif] text-[24px] text-[#1e293b] mb-2">
						Audit Log
					</h2>
					<p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#64748b]">
						Complete timeline of all actions for compliance and transparency
					</p>
				</div>

				{/* Main Content Card */}
				<div className='bg-white rounded-lg border border-[#e2e8f0] shadow-sm'>
					{/* Filters */}
					<div className='p-6 border-b border-[#e2e8f0]'>
						<div className='flex flex-col lg:flex-row gap-4'>
							<div className='relative flex-1'>
								<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#94a3b8]' />
								<Input
									placeholder='Search by User, Case ID, Branch, Action...'
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className='pl-10 border-[#cbd5e1] focus:border-[#003883] focus:ring-[#003883]'
								/>
							</div>
							<div className='flex gap-3'>
								<Select
									value={filterRole}
									onValueChange={setFilterRole}>
									<SelectTrigger className='w-[180px] border-[#cbd5e1]'>
										<SelectValue placeholder='Role' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='all'>All Roles</SelectItem>
										<SelectItem value='HOP'>HOP</SelectItem>
										<SelectItem value='Facility Management'>
											Facility Management
										</SelectItem>
										<SelectItem value='Vendor'>Vendor</SelectItem>
										<SelectItem value='System'>System</SelectItem>
									</SelectContent>
								</Select>
								<Select
									value={filterCaseType}
									onValueChange={setFilterCaseType}>
									<SelectTrigger className='w-[160px] border-[#cbd5e1]'>
										<SelectValue placeholder='Case Type' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='all'>All Types</SelectItem>
										<SelectItem value='Auto'>Automated</SelectItem>
										<SelectItem value='Manual'>Manual</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</div>

					{/* Audit Entries */}
					<div className='p-6'>
						{entries.length === 0 ? (
							<div className='text-center py-12'>
								<FileText className='h-12 w-12 text-[#cbd5e1] mx-auto mb-4' />
								<p className="font-['Inter:Medium',_sans-serif] text-[14px] text-[#64748b] mb-2">
									No audit entries found
								</p>
								<p className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#94a3b8]">
									Try adjusting your search or filters
								</p>
							</div>
						) : (
							<div className='space-y-3'>
								{/* Table Header */}
								<div className='grid grid-cols-12 gap-4 pb-3 border-b border-[#e2e8f0]'>
									<div className='col-span-2'>
										<span className="font-['Inter:SemiBold',_sans-serif] text-[11px] text-[#64748b] uppercase">
											Date & Time
										</span>
									</div>
									<div className='col-span-2'>
										<span className="font-['Inter:SemiBold',_sans-serif] text-[11px] text-[#64748b] uppercase">
											User
										</span>
									</div>
									<div className='col-span-1'>
										<span className="font-['Inter:SemiBold',_sans-serif] text-[11px] text-[#64748b] uppercase">
											Role
										</span>
									</div>
									<div className='col-span-3'>
										<span className="font-['Inter:SemiBold',_sans-serif] text-[11px] text-[#64748b] uppercase">
											Action
										</span>
									</div>
									<div className='col-span-1'>
										<span className="font-['Inter:SemiBold',_sans-serif] text-[11px] text-[#64748b] uppercase">
											Branch
										</span>
									</div>
									<div className='col-span-1'>
										<span className="font-['Inter:SemiBold',_sans-serif] text-[11px] text-[#64748b] uppercase">
											Case Type
										</span>
									</div>
									<div className='col-span-2'>
										<span className="font-['Inter:SemiBold',_sans-serif] text-[11px] text-[#64748b] uppercase">
											Reference ID
										</span>
									</div>
								</div>

								{/* Table Rows */}
								{entries.map((entry) => {
									const { date, time } = formatDateTime(entry.timestamp);
									return (
										<div
											key={entry.id}
											className='grid grid-cols-12 gap-4 py-3 border-b border-[#f1f5f9] hover:bg-[#f8f9fa] transition-colors'>
											<div className='col-span-2'>
												<div className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#1e293b]">
													{date}
												</div>
												<div className="font-['Inter:Regular',_sans-serif] text-[11px] text-[#64748b]">
													{time}
												</div>
											</div>
											<div className='col-span-2'>
												<div className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#475467]">
													{entry.user}
												</div>
											</div>
											<div className='col-span-1'>
												<RoleBadge role={entry.role} />
											</div>
											<div className='col-span-3'>
												<div className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#475467]">
													{entry.action}
												</div>
												{entry.details && (
													<div className="font-['Inter:Regular',_sans-serif] text-[11px] text-[#94a3b8] mt-1">
														{entry.details}
													</div>
												)}
											</div>
											<div className='col-span-1'>
												<div className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#475467]">
													{entry.branchCode}
												</div>
											</div>
											<div className='col-span-1'>
												<div className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#475467]">
													{entry.serviceType}
												</div>
											</div>
											<div className='col-span-2'>
												<div className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#003883]">
													{entry.caseId}
												</div>
											</div>
										</div>
									);
								})}
							</div>
						)}

						{/* Footer */}
						<div className='mt-6 pt-4 border-t border-[#e2e8f0]'>
							<p className="font-['Inter:Regular',_sans-serif] text-[11px] text-[#94a3b8] text-center">
								Logs retained for 12 months. Total entries: {entries.length}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
