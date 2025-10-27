import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Upload, X, AlertCircle } from 'lucide-react';
import { ServiceRequest } from './EquipmentTypes';

interface VendorUploadModalProps {
  request: ServiceRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { file: File; dateCompleted: string; comments: string }) => void;
}

export function VendorUploadModal({
  request,
  isOpen,
  onClose,
  onSubmit
}: VendorUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [dateCompleted, setDateCompleted] = useState('');
  const [comments, setComments] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!request) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setErrors({ ...errors, file: '' });
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};

    if (!file) {
      newErrors.file = 'Completion form is required';
    }
    if (!dateCompleted) {
      newErrors.dateCompleted = 'Date completed is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0 && file) {
      onSubmit({ file, dateCompleted, comments });
      resetForm();
    }
  };

  const resetForm = () => {
    setFile(null);
    setDateCompleted('');
    setComments('');
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
            Upload Job Completion Form
          </DialogTitle>
        </DialogHeader>

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
                <div className="text-[10px] text-[#94a3b8] uppercase font-medium mb-1">Scheduled Date</div>
                <div className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#1e293b]">
                  {request.dateScheduled}
                </div>
              </div>
            </div>
          </div>

          {/* Upload Form */}
          <div>
            <Label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#344054] mb-1.5 block">
              Job Completion Form <span className="text-[#dc2626]">*</span>
            </Label>
            {!file ? (
              <div>
                <div className={`border-2 border-dashed rounded-lg p-6 text-center ${errors.file ? 'border-[#dc2626]' : 'border-[#cbd5e1]'}`}>
                  <Upload className="h-8 w-8 text-[#94a3b8] mx-auto mb-2" />
                  <p className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#64748b] mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="font-['Inter:Regular',_sans-serif] text-[11px] text-[#94a3b8]">
                    PDF, DOC, DOCX, JPG or PNG (max. 10MB)
                  </p>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    className="hidden"
                    id="vendor-file-upload"
                  />
                  <label htmlFor="vendor-file-upload">
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-3"
                      onClick={() => document.getElementById('vendor-file-upload')?.click()}
                    >
                      Select File
                    </Button>
                  </label>
                </div>
                {errors.file && (
                  <div className="flex items-center gap-1 mt-1 text-[#dc2626]">
                    <AlertCircle className="h-3 w-3" />
                    <span className="font-['Inter:Regular',_sans-serif] text-[11px]">{errors.file}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="border border-[#cbd5e1] rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-[#f0fdf4] flex items-center justify-center">
                    <Upload className="h-5 w-5 text-[#003883]" />
                  </div>
                  <div>
                    <p className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#1e293b]">
                      {file.name}
                    </p>
                    <p className="font-['Inter:Regular',_sans-serif] text-[11px] text-[#64748b]">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="text-[#64748b] hover:text-[#dc2626] transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Date Completed */}
          <div>
            <Label className="font-['Inter:Medium',_sans-serif] text-[12px] text-[#344054] mb-1.5 block">
              Date Completed <span className="text-[#dc2626]">*</span>
            </Label>
            <Input
              type="date"
              value={dateCompleted}
              onChange={(e) => {
                setDateCompleted(e.target.value);
                setErrors({ ...errors, dateCompleted: '' });
              }}
              className={`border-[#cbd5e1] ${errors.dateCompleted ? 'border-[#dc2626]' : ''}`}
            />
            {errors.dateCompleted && (
              <div className="flex items-center gap-1 mt-1 text-[#dc2626]">
                <AlertCircle className="h-3 w-3" />
                <span className="font-['Inter:Regular',_sans-serif] text-[11px]">{errors.dateCompleted}</span>
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
              placeholder="Add any additional notes about the servicing..."
              className="border-[#cbd5e1] min-h-[80px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            className="border-[#cbd5e1] text-[#374151] hover:bg-[#f9fafb]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-[#003883] hover:bg-[#002664] text-white"
          >
            Submit Completion Form
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
