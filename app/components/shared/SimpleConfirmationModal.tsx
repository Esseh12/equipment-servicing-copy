import { useState } from 'react';
import Modal from '../../imports/Modal-2004-3496';
import { LOIRequest } from '../../App';

interface SimpleConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  request: LOIRequest | null;
}

export function SimpleConfirmationModal({ isOpen, onClose, onConfirm }: SimpleConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 max-w-md w-full mx-4">
        <div className="bg-white rounded-[12px] shadow-xl overflow-hidden">
          <ModalContent onClose={onClose} onConfirm={onConfirm} />
        </div>
      </div>
    </div>
  );
}

// Interactive version of the imported modal
function ModalContent({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-center overflow-clip relative rounded-[12px] shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.03)] w-full">
      {/* Background Pattern - Simplified */}
      <div className="absolute left-[-120px] size-[336px] top-[-120px] opacity-10">
        <div className="absolute left-1/2 size-[336px] top-0 translate-x-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 336 336">
            <g>
              <circle cx="168" cy="168" r="71.5" stroke="#EAECF0" />
              <circle cx="168" cy="168" r="95.5" stroke="#EAECF0" />
              <circle cx="168" cy="168" r="119.5" stroke="#EAECF0" />
              <circle cx="168" cy="168" r="143.5" stroke="#EAECF0" />
              <circle cx="168" cy="168" r="167.5" stroke="#EAECF0" />
            </g>
          </svg>
        </div>
      </div>

      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute box-border content-stretch flex items-center justify-center overflow-clip p-[10px] right-[16px] rounded-[8px] top-[16px] z-10 hover:bg-gray-100"
      >
        <svg className="block size-[24px]" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <path d="M18 6L6 18M6 6L18 18" stroke="#667085" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      </button>

      {/* Header */}
      <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start pb-0 pt-[24px] px-[24px] relative w-full">
          {/* Featured Icon - Changed from save to checkmark */}
          <div className="bg-[#ecfdf3] relative rounded-[28px] shrink-0 size-[48px]">
            <div className="absolute border-8 border-[#f6fef9] border-solid inset-[-4px] pointer-events-none rounded-[32px]" />
            <div className="absolute left-[12px] size-[24px] top-[12px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#027a48" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Text */}
          <div className="content-stretch flex flex-col gap-[4px] items-start not-italic relative shrink-0 w-full">
            <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[28px] relative shrink-0 text-[#101828] text-[18px] w-full">Confirm Submission</p>
            <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[20px] relative shrink-0 text-[#475467] text-[14px] w-full">Submit Request for letter of indebtedness</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[32px] px-0 relative shrink-0 w-full">
        <div className="box-border content-stretch flex gap-[12px] items-start pb-[24px] pt-0 px-[24px] relative w-full">
          <button 
            onClick={onClose}
            className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[8px] border border-[#d0d5dd] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:bg-gray-50"
          >
            <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
              <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[18px] py-[10px] relative w-full">
                <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#344054] text-[16px] text-nowrap whitespace-pre">No, Cancel</p>
              </div>
            </div>
          </button>
          
          <button 
            onClick={onConfirm}
            className="basis-0 bg-[#003883] grow min-h-px min-w-px relative rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:bg-[#002664]"
          >
            <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
              <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[18px] py-[10px] relative w-full">
                <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">Yes</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}