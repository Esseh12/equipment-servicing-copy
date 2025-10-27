import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Upload, X, AlertCircle, ArrowLeft } from 'lucide-react';
import { ServiceRequest } from './EquipmentTypes';
import { mockBranches } from './MockData';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from '../ui/dialog';
// import accessLogo from 'figma:asset/3ebf5c44175bf36c1eceb7236d272904dfc164a1.png';

interface ServiceConfirmationFormProps {
	request: ServiceRequest;
	onBack: () => void;
	onSubmit: (data: any) => void;
	onLogout: () => void;
}

// Header Component
function Header({ onLogout }: { onLogout: () => void }) {
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
	);
}

export function ServiceConfirmationForm({
	request,
	onBack,
	onSubmit,
	onLogout,
}: ServiceConfirmationFormProps) {
	const [formData, setFormData] = useState({
		branchCode: request.branchCode,
		branchName: request.branchName,
		hopName: request.hopName,
		dateScheduled: request.dateScheduled || '',
		dateCompleted: '',
		vendorName: request.vendorName || '',
		jobCompletionForm: null as File | null,
		allEquipmentServiced: '',
		equipmentNotServicedDetails: '',
		damageIdentified: '',
		damageDetails: '',
		comments: '',
	});

	const [errors, setErrors] = useState<Record<string, string>>({});
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	const validateForm = () => {
		const newErrors: Record<string, string> = {};

		if (!formData.dateCompleted) {
			newErrors.dateCompleted = 'Date servicing completed is required';
		}
		if (!formData.vendorName.trim()) {
			newErrors.vendorName = 'Vendor name is required';
		}
		if (!formData.jobCompletionForm) {
			newErrors.jobCompletionForm = 'Job completion form is required';
		}
		if (!formData.allEquipmentServiced) {
			newErrors.allEquipmentServiced = 'This field is required';
		}
		if (
			formData.allEquipmentServiced === 'No' &&
			!formData.equipmentNotServicedDetails.trim()
		) {
			newErrors.equipmentNotServicedDetails = 'Please provide details';
		}
		if (!formData.damageIdentified) {
			newErrors.damageIdentified = 'This field is required';
		}
		if (formData.damageIdentified === 'Yes' && !formData.damageDetails.trim()) {
			newErrors.damageDetails = 'Please provide damage details';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setShowConfirmModal(true);
	};

	const handleConfirmSubmit = () => {
		setShowConfirmModal(false);
		onSubmit(formData);
	};

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setFormData({ ...formData, jobCompletionForm: e.target.files[0] });
			setErrors({ ...errors, jobCompletionForm: '' });
		}
	};

	const removeFile = () => {
		setFormData({ ...formData, jobCompletionForm: null });
	};

	return (
		<div className='min-h-screen bg-[#f8f9fa]'>
			<Header onLogout={onLogout} />

			<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Back Button */}
				<button
					onClick={onBack}
					className='flex items-center gap-2 mb-6 text-[#003883] hover:text-[#002664] transition-colors'>
					<ArrowLeft className='h-4 w-4' />
					<span className="font-['Inter:Medium',_sans-serif] text-[14px]">
						Back
					</span>
				</button>

				{/* Page Header */}
				<div className='mb-6'>
					<h2 className="font-['Inter:SemiBold',_sans-serif] text-[24px] text-[#1e293b] mb-2">
						Fire Extinguisher Servicing Confirmation Form
					</h2>
					<p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#64748b]">
						Please complete and attach the job completion form.{' '}
						<span className='text-[#dc2626]'>*</span> Required fields marked
						with an asterisk.
					</p>
				</div>

				<form onSubmit={handleSubmit}>
					{/* Form Card */}
					<div className='bg-white rounded-lg border border-[#e2e8f0] shadow-sm'>
						{/* Section 1: Branch Information */}
						<div className='p-6 border-b border-[#e2e8f0]'>
							<div className='flex items-center gap-3 mb-4'>
								<div className='w-8 h-8 rounded-full bg-[#003883] text-white flex items-center justify-center'>
									<span className="font-['Inter:SemiBold',_sans-serif] text-[14px]">
										1
									</span>
								</div>
								<h3 className="font-['Inter:SemiBold',_sans-serif] text-[16px] text-[#1e293b]">
									Branch Information
								</h3>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div>
									<Label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#344054] mb-1.5 block">
										Branch Code <span className='text-[#dc2626]'>*</span>
									</Label>
									<Input
										value={formData.branchCode}
										disabled
										className='bg-[#f9fafb] border-[#e2e8f0] text-[#64748b]'
									/>
								</div>

								<div>
									<Label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#344054] mb-1.5 block">
										Branch Name <span className='text-[#dc2626]'>*</span>
									</Label>
									<Input
										value={formData.branchName}
										disabled
										className='bg-[#f9fafb] border-[#e2e8f0] text-[#64748b]'
									/>
								</div>

								<div>
									<Label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#344054] mb-1.5 block">
										HOP Name <span className='text-[#dc2626]'>*</span>
									</Label>
									<Input
										value={formData.hopName}
										onChange={(e) =>
											setFormData({ ...formData, hopName: e.target.value })
										}
										className='border-[#cbd5e1]'
									/>
								</div>
							</div>
						</div>

						{/* Section 2: Service Details */}
						<div className='p-6 border-b border-[#e2e8f0]'>
							<div className='flex items-center gap-3 mb-4'>
								<div className='w-8 h-8 rounded-full bg-[#003883] text-white flex items-center justify-center'>
									<span className="font-['Inter:SemiBold',_sans-serif] text-[14px]">
										2
									</span>
								</div>
								<h3 className="font-['Inter:SemiBold',_sans-serif] text-[16px] text-[#1e293b]">
									Service Details
								</h3>
							</div>

							<div className='space-y-4'>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<div>
										<Label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#344054] mb-1.5 block">
											Date Servicing Scheduled
										</Label>
										<Input
											type='date'
											value={formData.dateScheduled}
											disabled
											className='bg-[#f9fafb] border-[#e2e8f0] text-[#64748b]'
										/>
									</div>

									<div>
										<Label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#344054] mb-1.5 block">
											Date Servicing Completed{' '}
											<span className='text-[#dc2626]'>*</span>
										</Label>
										<Input
											type='date'
											value={formData.dateCompleted}
											max={new Date().toISOString().split('T')[0]}
											onChange={(e) => {
												setFormData({
													...formData,
													dateCompleted: e.target.value,
												});
												setErrors({ ...errors, dateCompleted: '' });
											}}
											className={`border-[#cbd5e1] ${
												errors.dateCompleted ? 'border-[#dc2626]' : ''
											}`}
										/>
										{errors.dateCompleted && (
											<div className='flex items-center gap-1 mt-1 text-[#dc2626]'>
												<AlertCircle className='h-3 w-3' />
												<span className="font-['Inter:Regular',_sans-serif] text-[11px]">
													{errors.dateCompleted}
												</span>
											</div>
										)}
									</div>
								</div>

								<div>
									<Label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#344054] mb-1.5 block">
										Vendor Name <span className='text-[#dc2626]'>*</span>
									</Label>
									<Input
										value={formData.vendorName}
										onChange={(e) => {
											setFormData({ ...formData, vendorName: e.target.value });
											setErrors({ ...errors, vendorName: '' });
										}}
										className={`border-[#cbd5e1] ${
											errors.vendorName ? 'border-[#dc2626]' : ''
										}`}
									/>
									{errors.vendorName && (
										<div className='flex items-center gap-1 mt-1 text-[#dc2626]'>
											<AlertCircle className='h-3 w-3' />
											<span className="font-['Inter:Regular',_sans-serif] text-[11px]">
												{errors.vendorName}
											</span>
										</div>
									)}
								</div>

								<div>
									<Label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#344054] mb-1.5 block">
										Upload Job Completion Form{' '}
										<span className='text-[#dc2626]'>*</span>
									</Label>
									{!formData.jobCompletionForm ? (
										<div>
											<div
												className={`border-2 border-dashed rounded-lg p-6 text-center ${
													errors.jobCompletionForm
														? 'border-[#dc2626]'
														: 'border-[#cbd5e1]'
												}`}>
												<Upload className='h-8 w-8 text-[#94a3b8] mx-auto mb-2' />
												<p className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#64748b] mb-1">
													Click to upload or drag and drop
												</p>
												<p className="font-['Inter:Regular',_sans-serif] text-[11px] text-[#94a3b8]">
													PDF, DOC, DOCX, JPG or PNG (max. 10MB)
												</p>
												<input
													type='file'
													onChange={handleFileUpload}
													accept='.pdf,.doc,.docx,.jpg,.jpeg,.png'
													className='hidden'
													id='file-upload'
												/>
												<label htmlFor='file-upload'>
													<Button
														type='button'
														variant='outline'
														className='mt-3'
														onClick={() =>
															document.getElementById('file-upload')?.click()
														}>
														Select File
													</Button>
												</label>
											</div>
											{errors.jobCompletionForm && (
												<div className='flex items-center gap-1 mt-1 text-[#dc2626]'>
													<AlertCircle className='h-3 w-3' />
													<span className="font-['Inter:Regular',_sans-serif] text-[11px]">
														{errors.jobCompletionForm}
													</span>
												</div>
											)}
										</div>
									) : (
										<div className='border border-[#cbd5e1] rounded-lg p-4 flex items-center justify-between'>
											<div className='flex items-center gap-3'>
												<div className='w-10 h-10 rounded bg-[#f0fdf4] flex items-center justify-center'>
													<Upload className='h-5 w-5 text-[#003883]' />
												</div>
												<div>
													<p className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#1e293b]">
														{formData.jobCompletionForm.name}
													</p>
													<p className="font-['Inter:Regular',_sans-serif] text-[11px] text-[#64748b]">
														{(formData.jobCompletionForm.size / 1024).toFixed(
															2
														)}{' '}
														KB
													</p>
												</div>
											</div>
											<button
												type='button'
												onClick={removeFile}
												className='text-[#64748b] hover:text-[#dc2626] transition-colors'>
												<X className='h-4 w-4' />
											</button>
										</div>
									)}
								</div>
							</div>
						</div>

						{/* Section 3: Servicing Confirmation */}
						<div className='p-6 border-b border-[#e2e8f0]'>
							<div className='flex items-center gap-3 mb-4'>
								<div className='w-8 h-8 rounded-full bg-[#003883] text-white flex items-center justify-center'>
									<span className="font-['Inter:SemiBold',_sans-serif] text-[14px]">
										3
									</span>
								</div>
								<h3 className="font-['Inter:SemiBold',_sans-serif] text-[16px] text-[#1e293b]">
									Servicing Confirmation
								</h3>
							</div>

							<div className='space-y-4'>
								<div>
									<Label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#344054] mb-2 block">
										Were all {request.equipmentType.toLowerCase()}s serviced?{' '}
										<span className='text-[#dc2626]'>*</span>
									</Label>
									<RadioGroup
										value={formData.allEquipmentServiced}
										onValueChange={(value) => {
											setFormData({ ...formData, allEquipmentServiced: value });
											setErrors({ ...errors, allEquipmentServiced: '' });
										}}>
										<div className='flex items-center space-x-4'>
											<div className='flex items-center space-x-2'>
												<RadioGroupItem
													value='Yes'
													id='all-yes'
												/>
												<Label
													htmlFor='all-yes'
													className="font-['Inter:Regular',_sans-serif] text-[12px] cursor-pointer">
													Yes
												</Label>
											</div>
											<div className='flex items-center space-x-2'>
												<RadioGroupItem
													value='No'
													id='all-no'
												/>
												<Label
													htmlFor='all-no'
													className="font-['Inter:Regular',_sans-serif] text-[12px] cursor-pointer">
													No
												</Label>
											</div>
										</div>
									</RadioGroup>
									{errors.allEquipmentServiced && (
										<div className='flex items-center gap-1 mt-1 text-[#dc2626]'>
											<AlertCircle className='h-3 w-3' />
											<span className="font-['Inter:Regular',_sans-serif] text-[11px]">
												{errors.allEquipmentServiced}
											</span>
										</div>
									)}
								</div>

								{formData.allEquipmentServiced === 'No' && (
									<div>
										<Label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#344054] mb-1.5 block">
											Please provide details{' '}
											<span className='text-[#dc2626]'>*</span>
										</Label>
										<Textarea
											value={formData.equipmentNotServicedDetails}
											onChange={(e) => {
												setFormData({
													...formData,
													equipmentNotServicedDetails: e.target.value,
												});
												setErrors({
													...errors,
													equipmentNotServicedDetails: '',
												});
											}}
											placeholder='Specify which equipment was not serviced and why...'
											className={`border-[#cbd5e1] min-h-[80px] ${
												errors.equipmentNotServicedDetails
													? 'border-[#dc2626]'
													: ''
											}`}
										/>
										{errors.equipmentNotServicedDetails && (
											<div className='flex items-center gap-1 mt-1 text-[#dc2626]'>
												<AlertCircle className='h-3 w-3' />
												<span className="font-['Inter:Regular',_sans-serif] text-[11px]">
													{errors.equipmentNotServicedDetails}
												</span>
											</div>
										)}
									</div>
								)}

								<div>
									<Label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#344054] mb-2 block">
										Was any damage identified?{' '}
										<span className='text-[#dc2626]'>*</span>
									</Label>
									<RadioGroup
										value={formData.damageIdentified}
										onValueChange={(value) => {
											setFormData({ ...formData, damageIdentified: value });
											setErrors({ ...errors, damageIdentified: '' });
										}}>
										<div className='flex items-center space-x-4'>
											<div className='flex items-center space-x-2'>
												<RadioGroupItem
													value='Yes'
													id='damage-yes'
												/>
												<Label
													htmlFor='damage-yes'
													className="font-['Inter:Regular',_sans-serif] text-[12px] cursor-pointer">
													Yes
												</Label>
											</div>
											<div className='flex items-center space-x-2'>
												<RadioGroupItem
													value='No'
													id='damage-no'
												/>
												<Label
													htmlFor='damage-no'
													className="font-['Inter:Regular',_sans-serif] text-[12px] cursor-pointer">
													No
												</Label>
											</div>
										</div>
									</RadioGroup>
									{errors.damageIdentified && (
										<div className='flex items-center gap-1 mt-1 text-[#dc2626]'>
											<AlertCircle className='h-3 w-3' />
											<span className="font-['Inter:Regular',_sans-serif] text-[11px]">
												{errors.damageIdentified}
											</span>
										</div>
									)}
								</div>

								{formData.damageIdentified === 'Yes' && (
									<div>
										<Label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#344054] mb-1.5 block">
											Please provide damage details{' '}
											<span className='text-[#dc2626]'>*</span>
										</Label>
										<Textarea
											value={formData.damageDetails}
											onChange={(e) => {
												setFormData({
													...formData,
													damageDetails: e.target.value,
												});
												setErrors({ ...errors, damageDetails: '' });
											}}
											placeholder='Describe the damage identified...'
											className={`border-[#cbd5e1] min-h-[80px] ${
												errors.damageDetails ? 'border-[#dc2626]' : ''
											}`}
										/>
										{errors.damageDetails && (
											<div className='flex items-center gap-1 mt-1 text-[#dc2626]'>
												<AlertCircle className='h-3 w-3' />
												<span className="font-['Inter:Regular',_sans-serif] text-[11px]">
													{errors.damageDetails}
												</span>
											</div>
										)}
									</div>
								)}
							</div>
						</div>

						{/* Section 4: Additional Comments */}
						<div className='p-6'>
							<div className='flex items-center gap-3 mb-4'>
								<div className='w-8 h-8 rounded-full bg-[#003883] text-white flex items-center justify-center'>
									<span className="font-['Inter:SemiBold',_sans-serif] text-[14px]">
										4
									</span>
								</div>
								<h3 className="font-['Inter:SemiBold',_sans-serif] text-[16px] text-[#1e293b]">
									Additional Comments
								</h3>
							</div>

							<div>
								<Label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#344054] mb-1.5 block">
									Additional Comments (Optional)
								</Label>
								<Textarea
									value={formData.comments}
									onChange={(e) =>
										setFormData({ ...formData, comments: e.target.value })
									}
									placeholder='Add any additional information...'
									className='border-[#cbd5e1] min-h-[80px]'
								/>
							</div>
						</div>
					</div>

					{/* Action Buttons */}
					<div className='flex justify-end gap-3 mt-6'>
						<Button
							type='button'
							variant='outline'
							onClick={onBack}
							className='border-[#cbd5e1] text-[#374151] hover:bg-[#f9fafb]'>
							Cancel
						</Button>
						<Button
							type='submit'
							className='bg-[#003883] hover:bg-[#002664] text-white px-8'>
							Submit Confirmation
						</Button>
					</div>
				</form>
			</div>

			{/* Confirmation Modal */}
			<Dialog
				open={showConfirmModal}
				onOpenChange={setShowConfirmModal}>
				<DialogContent className='max-w-md'>
					<DialogHeader>
						<DialogTitle className="font-['Inter:SemiBold',_sans-serif] text-[20px] text-[#1e293b]">
							Confirm Submission
						</DialogTitle>
					</DialogHeader>

					<div className='py-4'>
						<p className="font-['Inter:Regular',_sans-serif] text-[14px] text-[#475467]">
							Are you sure you want to submit this service completion
							confirmation? This will mark the service request as completed.
						</p>
					</div>

					<DialogFooter>
						<Button
							variant='outline'
							onClick={() => setShowConfirmModal(false)}
							className='border-[#cbd5e1] text-[#374151] hover:bg-[#f9fafb]'>
							Cancel
						</Button>
						<Button
							onClick={handleConfirmSubmit}
							className='bg-[#003883] hover:bg-[#002664] text-white'>
							Yes, Submit
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
