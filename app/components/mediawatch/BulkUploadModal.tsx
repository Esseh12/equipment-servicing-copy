import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Upload, Download, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { Entity, EntityCategory, BulkUploadRow } from './MediaWatchTypes';

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingEntities: Entity[];
  onUpload: (entities: Entity[]) => void;
}

export function BulkUploadModal({ isOpen, onClose, existingEntities, onUpload }: BulkUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [validationResults, setValidationResults] = useState<BulkUploadRow[]>([]);
  const [isValidating, setIsValidating] = useState(false);

  const handleDownloadTemplate = () => {
    const csvContent = 'Entity Name,Category\nSample Entity,Access Holdings\nAnother Entity,Other Organisation';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'entity_upload_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Template downloaded');
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith('.xlsx') && !selectedFile.name.endsWith('.csv')) {
      toast.error('Please upload a valid Excel (.xlsx) or CSV file');
      return;
    }

    setFile(selectedFile);
    setIsValidating(true);

    // Simulate file parsing and validation
    setTimeout(() => {
      const mockResults: BulkUploadRow[] = [
        {
          row: 1,
          entity: 'Access Bank Plc',
          category: 'Access Holdings',
          status: 'Invalid',
          remark: 'Duplicate'
        },
        {
          row: 2,
          entity: 'XYZ Corporation',
          category: 'Other Organisation',
          status: 'Valid',
          remark: '—'
        },
        {
          row: 3,
          entity: 'New Holdings Ltd',
          category: 'Obligor',
          status: 'Valid',
          remark: '—'
        },
        {
          row: 4,
          entity: '',
          category: 'Individual',
          status: 'Invalid',
          remark: 'Missing entity name'
        },
      ];
      
      setValidationResults(mockResults);
      setIsValidating(false);
    }, 1500);
  };

  const handleUpload = () => {
    const validRows = validationResults.filter(row => row.status === 'Valid');
    
    if (validRows.length === 0) {
      toast.error('No valid entities to upload');
      return;
    }

    const newEntities: Entity[] = validRows.map((row, index) => ({
      id: `E${String(existingEntities.length + index + 1).padStart(3, '0')}`,
      name: row.entity,
      category: row.category as EntityCategory,
      createdDate: new Date().toLocaleDateString('en-GB'),
      status: 'Active'
    }));

    onUpload(newEntities);
    toast.success(`${validRows.length} entities uploaded successfully`);
    handleClose();
  };

  const handleClose = () => {
    setFile(null);
    setValidationResults([]);
    setIsValidating(false);
    onClose();
  };

  const validCount = validationResults.filter(r => r.status === 'Valid').length;
  const invalidCount = validationResults.filter(r => r.status === 'Invalid').length;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[700px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-[20px] text-[#101828]">
            Bulk Upload Entities
          </DialogTitle>
          <DialogDescription className="text-[14px] text-[#667085] mt-1">
            Add multiple entities using Excel upload
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4 flex-1 overflow-y-auto">
          {/* Template Download */}
          <div className="bg-[#eff8ff] border border-[#b2ddff] rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Download className="h-5 w-5 text-[#175cd3] mt-0.5" />
              <div className="flex-1">
                <p className="text-[14px] text-[#175cd3] mb-2">
                  Download the template to ensure your file has the correct format
                </p>
                <Button
                  onClick={handleDownloadTemplate}
                  variant="outline"
                  size="sm"
                  className="border-[#175cd3] text-[#175cd3] hover:bg-[#175cd3] hover:text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Template
                </Button>
              </div>
            </div>
          </div>

          {/* File Upload */}
          {!file ? (
            <div className="border-2 border-dashed border-[#d0d5dd] rounded-lg p-8 text-center hover:border-[#003883] transition-colors">
              <input
                type="file"
                accept=".xlsx,.csv"
                onChange={handleFileChange}
                className="hidden"
                id="bulk-upload-input"
              />
              <label htmlFor="bulk-upload-input" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-4 text-[#667085]" />
                <p className="text-[14px] text-[#101828] mb-1">
                  <span className="text-[#003883]">Click to upload</span> or drag and drop
                </p>
                <p className="text-[12px] text-[#667085]">
                  Excel files only (.xlsx)
                </p>
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              {/* File Info */}
              <div className="bg-[#f9fafb] border border-[#eaecf0] rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#003883] rounded-lg flex items-center justify-center">
                      <Upload className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[14px] text-[#101828]">{file.name}</p>
                      <p className="text-[12px] text-[#667085]">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setFile(null);
                      setValidationResults([]);
                    }}
                    className="text-[#667085] hover:text-[#344054]"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Validation Progress */}
              {isValidating && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#003883] mb-3"></div>
                  <p className="text-[14px] text-[#667085]">Validating file...</p>
                </div>
              )}

              {/* Validation Results Summary */}
              {!isValidating && validationResults.length > 0 && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#ecfdf3] border border-[#abefc6] rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="h-4 w-4 text-[#027a48]" />
                        <span className="text-[12px] text-[#027a48]">Valid</span>
                      </div>
                      <p className="text-[24px] text-[#027a48]">{validCount}</p>
                    </div>
                    <div className="bg-[#fef3f2] border border-[#fecdca] rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <XCircle className="h-4 w-4 text-[#b42318]" />
                        <span className="text-[12px] text-[#b42318]">Invalid</span>
                      </div>
                      <p className="text-[24px] text-[#b42318]">{invalidCount}</p>
                    </div>
                  </div>

                  {/* Validation Results Table */}
                  <div className="border border-[#eaecf0] rounded-lg overflow-hidden">
                    <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
                      <table className="w-full">
                        <thead className="bg-[#f9fafb] border-b border-[#eaecf0] sticky top-0">
                          <tr>
                            <th className="px-4 py-2 text-left text-[11px] text-[#667085] uppercase">
                              Row
                            </th>
                            <th className="px-4 py-2 text-left text-[11px] text-[#667085] uppercase">
                              Entity
                            </th>
                            <th className="px-4 py-2 text-left text-[11px] text-[#667085] uppercase">
                              Category
                            </th>
                            <th className="px-4 py-2 text-left text-[11px] text-[#667085] uppercase">
                              Status
                            </th>
                            <th className="px-4 py-2 text-left text-[11px] text-[#667085] uppercase">
                              Remark
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#eaecf0]">
                          {validationResults.map((row) => (
                            <tr key={row.row} className="hover:bg-[#f9fafb]">
                              <td className="px-4 py-2 text-[13px] text-[#667085]">
                                {row.row}
                              </td>
                              <td className="px-4 py-2 text-[13px] text-[#101828]">
                                {row.entity || <span className="text-[#667085]">—</span>}
                              </td>
                              <td className="px-4 py-2 text-[13px] text-[#667085]">
                                {row.category}
                              </td>
                              <td className="px-4 py-2">
                                <div className="flex items-center gap-1.5">
                                  {row.status === 'Valid' ? (
                                    <>
                                      <CheckCircle className="h-3.5 w-3.5 text-[#027a48]" />
                                      <span className="text-[13px] text-[#027a48]">Valid</span>
                                    </>
                                  ) : (
                                    <>
                                      <XCircle className="h-3.5 w-3.5 text-[#b42318]" />
                                      <span className="text-[13px] text-[#b42318]">Invalid</span>
                                    </>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-2 text-[13px] text-[#667085]">
                                {row.remark}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {invalidCount > 0 && (
                    <div className="bg-[#fffaeb] border border-[#fedf89] rounded-lg p-3 flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-[#b54708] mt-0.5" />
                      <p className="text-[13px] text-[#b54708]">
                        {invalidCount} row{invalidCount !== 1 ? 's have' : ' has'} validation errors. Only valid entities will be uploaded.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-[#eaecf0]">
          <Button
            onClick={handleUpload}
            disabled={!file || isValidating || validCount === 0}
            className="flex-1 bg-[#003883] hover:bg-[#002860] text-white h-[40px] disabled:opacity-50"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload {validCount > 0 && `(${validCount} entities)`}
          </Button>
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1 h-[40px] border-[#d0d5dd]"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
