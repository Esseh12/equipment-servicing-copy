import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { AlertCircle } from 'lucide-react';
import { ServiceRequest, Vendor } from './EquipmentTypes';
import { mockVendors } from './MockData';

interface VendorAssignmentModalProps {
  request: ServiceRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (vendorId: string, scheduleDate: string, comments: string) => void;
  onReject: (reason: string) => void;
}

export function VendorAssignmentModal({
  request,
  isOpen,
  onClose,
  onApprove,
  onReject
}: VendorAssignmentModalProps) {
  const [selectedVendor, setSelectedVendor] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [comments, setComments] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!request) return null;

  const availableVendors = mockVendors.filter(vendor =>
    vendor.specialization.includes(request.equipmentType)
  );

  const handleApprove = () => {
    const newErrors: Record<string, string> = {};

    if (!selectedVendor) {
      newErrors.selectedVendor = 'Please select a vendor';
    }
    if (!scheduleDate) {
      newErrors.scheduleDate = 'Please select a schedule date';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onApprove(selectedVendor, scheduleDate, comments);
      resetForm();
    }
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      setErrors({ rejectReason: 'Please provide a reason for rejection' });
      return;
    }
    onReject(rejectReason);
    resetForm();
  };

  const resetForm = () => {
    setSelectedVendor('');
    setScheduleDate('');
    setComments('');
    setRejectReason('');
    setShowRejectForm(false);
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-['Inter:SemiBold',_sans-serif] text-[20px] text-[#1e293b]">
            {showRejectForm ? 'Reject Request' : 'Approve Manual Servicing Request'}
          </DialogTitle>
        </DialogHeader>

        {!showRejectForm ? (
          <div className="space-y-4">
            {/* Request Details */}
            <div className="bg-[#f8f9fa] rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-[10px] text-[#94a3b8] uppercase font-medium mb-1">Case ID</div>
                  <div className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#1e293b]">
                    {request.caseId}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-[#94a3b8] uppercase font-medium mb-1">Branch</div>
                  <div className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#1e293b]">
                    {request.branchName}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-[#94a3b8] uppercase font-medium mb-1">Equipment Type</div>
                  <div className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#1e293b]">
                    {request.equipmentType}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-[#94a3b8] uppercase font-medium mb-1">HOP</div>
                  <div className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#1e293b]">
                    {request.hopName}
                  </div>
                </div>
              </div>
              {request.reasonForRequest && (
                <div>
                  <div className="text-[10px] text-[#94a3b8] uppercase font-medium mb-1">Reason for Request</div>
                  <div className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#475467]">
                    {request.reasonForRequest}
                  </div>
                </div>
              )}
            </div>

            {/* Vendor Selection */}
            <div>
              <Label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#344054] mb-1.5 block">
                Select Vendor <span className="text-[#dc2626]">*</span>
              </Label>
              <Select value={selectedVendor} onValueChange={(value) => {
                setSelectedVendor(value);
                setErrors({ ...errors, selectedVendor: '' });
              }}>
                <SelectTrigger className={`border-[#cbd5e1] ${errors.selectedVendor ? 'border-[#dc2626]' : ''}`}>
                  <SelectValue placeholder="Select vendor" />
                </SelectTrigger>
                <SelectContent>
                  {availableVendors.map((vendor) => (
                    <SelectItem key={vendor.id} value={vendor.id}>
                      <div>
                        <div className="font-['Inter:Medium',_sans-serif]">{vendor.name}</div>
                        <div className="text-[11px] text-[#64748b]">{vendor.phone}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.selectedVendor && (
                <div className="flex items-center gap-1 mt-1 text-[#dc2626]">
                  <AlertCircle className="h-3 w-3" />
                  <span className="font-['Inter:Regular',_sans-serif] text-[11px]">{errors.selectedVendor}</span>
                </div>
              )}
            </div>

            {/* Schedule Date */}
            <div>
              <Label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#344054] mb-1.5 block">
                Schedule Date <span className="text-[#dc2626]">*</span>
              </Label>
              <Input
                type="date"
                value={scheduleDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => {
                  setScheduleDate(e.target.value);
                  setErrors({ ...errors, scheduleDate: '' });
                }}
                className={`border-[#cbd5e1] ${errors.scheduleDate ? 'border-[#dc2626]' : ''}`}
              />
              {errors.scheduleDate && (
                <div className="flex items-center gap-1 mt-1 text-[#dc2626]">
                  <AlertCircle className="h-3 w-3" />
                  <span className="font-['Inter:Regular',_sans-serif] text-[11px]">{errors.scheduleDate}</span>
                </div>
              )}
            </div>

            {/* Comments */}
            <div>
              <Label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#344054] mb-1.5 block">
                Comments (Optional)
              </Label>
              <Textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Add any additional instructions for the vendor..."
                className="border-[#cbd5e1] min-h-[80px]"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-[#fef2f2] border border-[#fecaca] rounded-lg p-4">
              <p className="font-['Inter:Regular',_sans-serif] text-[12px] text-[#991B1B]">
                Are you sure you want to reject this request? This action will notify the HOP.
              </p>
            </div>

            <div>
              <Label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#344054] mb-1.5 block">
                Reason for Rejection <span className="text-[#dc2626]">*</span>
              </Label>
              <Textarea
                value={rejectReason}
                onChange={(e) => {
                  setRejectReason(e.target.value);
                  setErrors({ ...errors, rejectReason: '' });
                }}
                placeholder="Explain why this request is being rejected..."
                className={`border-[#cbd5e1] min-h-[100px] ${errors.rejectReason ? 'border-[#dc2626]' : ''}`}
              />
              {errors.rejectReason && (
                <div className="flex items-center gap-1 mt-1 text-[#dc2626]">
                  <AlertCircle className="h-3 w-3" />
                  <span className="font-['Inter:Regular',_sans-serif] text-[11px]">{errors.rejectReason}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <DialogFooter>
          {!showRejectForm ? (
            <>
              <Button
                variant="outline"
                onClick={() => setShowRejectForm(true)}
                className="border-[#dc2626] text-[#dc2626] hover:bg-[#fef2f2]"
              >
                Reject
              </Button>
              <Button
                variant="outline"
                onClick={handleClose}
                className="border-[#cbd5e1] text-[#374151] hover:bg-[#f9fafb]"
              >
                Cancel
              </Button>
              <Button
                onClick={handleApprove}
                className="bg-[#003883] hover:bg-[#002664] text-white"
              >
                Approve & Assign
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => setShowRejectForm(false)}
                className="border-[#cbd5e1] text-[#374151] hover:bg-[#f9fafb]"
              >
                Back
              </Button>
              <Button
                onClick={handleReject}
                className="bg-[#dc2626] hover:bg-[#b91c1c] text-white"
              >
                Confirm Rejection
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
