import React, { useState } from 'react';
import { ServiceCentralLayout } from '../ServiceCentralLayout';
import { BreadcrumbNavigation } from '../shared/BreadcrumbNavigation';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Upload, FileText, CheckCircle2, XCircle, Download, AlertCircle, Users } from 'lucide-react';
import { ActionType, BulkRecord, BreadcrumbItem } from './CDMSTypes';
import accessLogo from 'figma:asset/3ebf5c44175bf36c1eceb7236d272904dfc164a1.png';

interface BulkUploadPageProps {
  userRole: string;
  userName: string;
  userUnit: string;
  onBack: () => void;
  onSubmit: (data: {
    fileName: string;
    fileSize: number;
    actionType: ActionType;
    records: BulkRecord[];
  }) => void;
  onLogout: () => void;
}

// Sidebar
function SidebarContent({ userRole, onLogout }: { 
  userRole: string; 
  onLogout: () => void;
}) {
  return (
    <div className="h-full flex flex-col">
      <div className="h-[65px] border-b border-[#d0d5dd] flex items-center px-[16px]">
        <div className="flex items-center gap-[10px]">
          <img src={accessLogo} alt="Access Bank" className="h-8" />
          <div>
            <h1 className="text-[14px] font-bold text-[#003883]">Service Central</h1>
            <p className="text-[12px] text-[#526484]">CDMS Portal</p>
          </div>
        </div>
      </div>

      <div className="px-[16px] py-[16px] border-b border-[#d0d5dd]">
        <div className="text-[18px] text-[#003883]">CDMS Portal</div>
        <div className="flex items-center gap-2 mt-1">
          <Users className="h-4 w-4 text-[#526484]" />
          <span className="text-[12px] text-[#526484]">Role:</span>
          <Badge className="bg-[#003883] text-white text-[11px] h-5">
            {userRole === 'Initiator' ? 'Initiator' : userRole === 'Authorizer' ? 'Authorizer' : 'Admin'}
          </Badge>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-[16px]">
        <div className="space-y-2">
          <div className="px-4 py-2 bg-[#003883] text-white rounded-lg">
            <div className="text-[14px]">Bulk Upload</div>
          </div>
        </div>
      </div>

      <div className="p-[16px] border-t border-[#d0d5dd]">
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full border-[#003883] text-[#003883] hover:bg-[#003883] hover:text-white"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

// Main Content
function MainContent({
  userName,
  userUnit,
  onBack,
  onSubmit
}: BulkUploadPageProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [actionType, setActionType] = useState<ActionType | ''>('');
  const [isValidated, setIsValidated] = useState(false);
  const [validationResults, setValidationResults] = useState<BulkRecord[]>([]);
  const [showValidation, setShowValidation] = useState(false);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'CDMS Portal', screen: 'home', icon: null, current: false, isClickable: true },
    { label: 'Bulk Upload', screen: 'upload', icon: null, current: true, isClickable: false }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      setIsValidated(false);
      setShowValidation(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
      setIsValidated(false);
      setShowValidation(false);
    }
  };

  const handleValidate = () => {
    if (!uploadedFile) {
      alert('Please upload a file first');
      return;
    }

    // Mock validation - in real app, this would parse and validate the file
    const mockRecords: BulkRecord[] = [
      {
        accountNumber: '0012345678',
        bvn: '22333444551',
        validationStatus: 'Valid'
      },
      {
        accountNumber: '0012345679',
        bvn: '22333444552',
        validationStatus: 'Valid'
      },
      {
        accountNumber: '0012345680',
        validationStatus: 'Invalid',
        remarks: 'Missing BVN'
      },
      {
        accountNumber: '0012345681',
        bvn: '22333444553',
        validationStatus: 'Valid'
      },
      {
        accountNumber: '0012345682',
        validationStatus: 'Invalid',
        remarks: 'Invalid account format'
      }
    ];

    setValidationResults(mockRecords);
    setIsValidated(true);
    setShowValidation(true);
  };

  const handleSubmitForAuthorization = () => {
    if (!uploadedFile || !actionType || !isValidated) {
      alert('Please complete all required fields and validate the file');
      return;
    }

    onSubmit({
      fileName: uploadedFile.name,
      fileSize: uploadedFile.size,
      actionType: actionType as ActionType,
      records: validationResults
    });
  };

  const validCount = validationResults.filter(r => r.validationStatus === 'Valid').length;
  const invalidCount = validationResults.filter(r => r.validationStatus === 'Invalid').length;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="h-[65px] border-b border-[#d0d5dd] flex items-center justify-between px-[24px] flex-shrink-0">
        <BreadcrumbNavigation items={breadcrumbs} />
        <Button
          onClick={onBack}
          variant="outline"
          className="border-[#003883] text-[#003883] hover:bg-[#003883] hover:text-white"
        >
          Back to Requests
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 lg:p-[32px]">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-[30px] text-[#101828] mb-2">Upload Bulk Restriction File</h1>
            <p className="text-[16px] text-[#475467]">
              Submit bulk PND or Hold actions for authorization
            </p>
          </div>

          {/* Instructions Card */}
          <div className="bg-[#eff8ff] border border-[#b9e6fe] rounded-[12px] p-6 mb-6">
            <h3 className="text-[16px] text-[#026aa2] mb-3">File Upload Guidelines</h3>
            <ul className="space-y-2 text-[14px] text-[#026aa2]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Allowed formats: .xlsx, .csv</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Maximum file size: 10MB</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Required columns: Account Number, BVN</span>
              </li>
              <li className="flex items-start gap-2">
                <Download className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <button className="text-[#026aa2] underline hover:text-[#024a73]">
                  Download sample template
                </button>
              </li>
            </ul>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-[12px] border border-[#eaecf0] shadow-sm p-6 lg:p-8 mb-6">
            <h2 className="text-[20px] text-[#101828] mb-6">Upload File</h2>

            {!uploadedFile ? (
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-2 border-dashed border-[#d0d5dd] rounded-[12px] p-12 text-center hover:border-[#003883] hover:bg-[#f9fafb] transition-colors cursor-pointer"
              >
                <Upload className="h-12 w-12 text-[#667085] mx-auto mb-4" />
                <div className="mb-4">
                  <p className="text-[16px] text-[#344054] mb-1">
                    Drag and drop your file here
                  </p>
                  <p className="text-[14px] text-[#667085]">
                    or click to browse
                  </p>
                </div>
                <input
                  type="file"
                  accept=".xlsx,.csv"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-[#003883] text-[#003883]"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    Browse File
                  </Button>
                </label>
              </div>
            ) : (
              <div className="border border-[#d0d5dd] rounded-[12px] p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#ecfdf3] rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-[#003883]" />
                  </div>
                  <div>
                    <p className="text-[14px] text-[#101828]">{uploadedFile.name}</p>
                    <p className="text-[12px] text-[#667085]">
                      {(uploadedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setUploadedFile(null);
                    setIsValidated(false);
                    setShowValidation(false);
                  }}
                  className="text-[#dc2626] border-[#dc2626] hover:bg-[#fef2f2]"
                >
                  Remove
                </Button>
              </div>
            )}

            {/* File Details */}
            {uploadedFile && (
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[12px] text-[#667085] mb-1 block">Uploaded By</Label>
                  <p className="text-[14px] text-[#101828]">{userName}</p>
                </div>
                <div>
                  <Label className="text-[12px] text-[#667085] mb-1 block">Unit</Label>
                  <p className="text-[14px] text-[#101828]">{userUnit}</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Type Selection */}
          {uploadedFile && (
            <div className="bg-white rounded-[12px] border border-[#eaecf0] shadow-sm p-6 lg:p-8 mb-6">
              <h2 className="text-[20px] text-[#101828] mb-6">Select Action Type</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(['Place PND', 'Lift PND', 'Place Hold', 'Release Hold'] as ActionType[]).map((action) => (
                  <label
                    key={action}
                    className={`flex items-center p-4 border-2 rounded-[8px] cursor-pointer transition-all ${
                      actionType === action
                        ? 'border-[#003883] bg-[#eff6ff]'
                        : 'border-[#d0d5dd] hover:border-[#98a2b3]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="actionType"
                      value={action}
                      checked={actionType === action}
                      onChange={(e) => setActionType(e.target.value as ActionType)}
                      className="h-4 w-4 text-[#003883]"
                    />
                    <span className="ml-3 text-[14px] text-[#101828]">{action}</span>
                  </label>
                ))}
              </div>

              <div className="mt-6">
                <Button
                  onClick={handleValidate}
                  disabled={!actionType}
                  className="bg-[#003883] hover:bg-[#002664] text-white"
                >
                  Validate File
                </Button>
              </div>
            </div>
          )}

          {/* Validation Results */}
          {showValidation && (
            <div className="bg-white rounded-[12px] border border-[#eaecf0] shadow-sm p-6 lg:p-8 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[20px] text-[#101828]">Validation Results</h2>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#12b76a] rounded-full"></div>
                    <span className="text-[14px] text-[#475467]">
                      Valid: <strong>{validCount}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#f04438] rounded-full"></div>
                    <span className="text-[14px] text-[#475467]">
                      Invalid: <strong>{invalidCount}</strong>
                    </span>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#eaecf0]">
                      <th className="text-left py-3 px-4 text-[12px] text-[#667085] font-medium">Account No.</th>
                      <th className="text-left py-3 px-4 text-[12px] text-[#667085] font-medium">BVN</th>
                      <th className="text-left py-3 px-4 text-[12px] text-[#667085] font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-[12px] text-[#667085] font-medium">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {validationResults.slice(0, 10).map((record, index) => (
                      <tr key={index} className="border-b border-[#f2f4f7] hover:bg-[#f9fafb]">
                        <td className="py-3 px-4 text-[14px] text-[#101828]">{record.accountNumber}</td>
                        <td className="py-3 px-4 text-[14px] text-[#475467]">{record.bvn || '—'}</td>
                        <td className="py-3 px-4">
                          {record.validationStatus === 'Valid' ? (
                            <span className="inline-flex items-center gap-1 text-[#027a48] text-[12px]">
                              <CheckCircle2 className="h-4 w-4" />
                              Valid
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[#b42318] text-[12px]">
                              <XCircle className="h-4 w-4" />
                              Invalid
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-[14px] text-[#475467]">{record.remarks || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {validationResults.length > 10 && (
                <p className="text-[12px] text-[#667085] mt-4 text-center">
                  Showing 10 of {validationResults.length} records
                </p>
              )}
            </div>
          )}

          {/* Submit Button */}
          {isValidated && (
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={onBack}
                className="border-[#d0d5dd]"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitForAuthorization}
                className="bg-[#003883] hover:bg-[#002664] text-white px-8"
              >
                Submit for Authorization
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function BulkUploadPage(props: BulkUploadPageProps) {
  return (
    <ServiceCentralLayout
      sidebarContent={<SidebarContent userRole={props.userRole} onLogout={props.onLogout} />}
    >
      <MainContent {...props} />
    </ServiceCentralLayout>
  );
}
