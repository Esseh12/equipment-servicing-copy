import { useState } from 'react';
import { LOIRequest } from '../../App';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  request: LOIRequest | null;
}

export function ConfirmationModal({ isOpen, onClose, onConfirm }: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 max-w-2xl w-full mx-4">
        <ConfirmationModalContent onClose={onClose} onConfirm={onConfirm} />
      </div>
    </div>
  );
}

// Custom version of the imported modal with interactive buttons
function ConfirmationModalContent({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  return (
    <div className="bg-white overflow-clip relative rounded-[18.235px] w-[542px] h-[729px]">
      {/* Close Button */}
      <div className="absolute box-border content-stretch flex items-center justify-center overflow-clip p-[9.118px] right-[29.9px] rounded-[7.294px] top-[41.95px] z-10">
        <button onClick={onClose} className="block cursor-pointer relative shrink-0 size-[21.882px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
            <path d="M16.4115 5.47051L5.47051 16.4115M5.47051 5.47051L16.4115 16.4115" stroke="#667085" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8235" />
          </svg>
        </button>
      </div>

      {/* Featured Icon */}
      <div className="absolute bg-[#e0e0e0] left-[24.63px] rounded-[25.529px] size-[51.058px] top-[36.5px]">
        <div className="absolute border-[#f1f1f1] border-[9.117px] border-solid inset-[-4.559px] pointer-events-none rounded-[30.088px]" />
        <div className="absolute left-[12.76px] size-[25.529px] top-[12.74px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
            <path d="M12.7669 8.51206V12.7669M12.7669 17.0217H12.7775M23.404 12.7669C23.404 18.6416 18.6416 23.404 12.7669 23.404C6.89219 23.404 2.12979 18.6416 2.12979 12.7669C2.12979 6.89219 6.89219 2.12979 12.7669 2.12979C18.6416 2.12979 23.404 6.89219 23.404 12.7669Z" stroke="#101828" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8235" />
          </svg>
        </div>
      </div>

      {/* Watermark */}
      <div className="absolute flex h-[calc(1px*((551.421875*0.524860143661499)+(18.234375*0.8511884808540344)))] items-center justify-center left-[62.5px] top-[229.76px] w-[calc(1px*((18.234375*0.524860143661499)+(551.421875*0.8511884808540344)))]">
        <div className="flex-none rotate-[31.659deg]">
          <p className="font-black leading-[18.235px] not-italic opacity-20 relative text-[91.173px] text-black text-nowrap whitespace-pre">Watermark</p>
        </div>
      </div>

      {/* Letter Preview Content */}
      <div className="absolute h-[591px] left-[20px] top-[6px] w-[482px]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none bg-white border border-gray-200 rounded p-4">
          <div className="text-sm space-y-4">
            <div className="text-right text-xs text-gray-600">
              ABP/ROG/102024/AF/DC/458<br />
              25 October 2024
            </div>
            
            <div className="space-y-2">
              <div className="font-semibold">HAMIDU GALADIMA</div>
              <div className="text-xs">
                4A KWAMBA FEDERAL LOW COST,<br />
                4A,<br />
                KWAMBA FEDERAL LOW COST<br />
                4A,<br />
                KWAMBA FEDERAL LOW COST<br />
                4A, KWAMBA FEDERAL LOW COST,<br />
                4A, KWAMBA FEDERAL LOW COST,
              </div>
            </div>

            <div className="space-y-2">
              <div>Dear Sir/Madam,</div>
              <div className="font-semibold underline">LETTER OF INDEBTEDNESS - HAMIDU GALADIMA - 1875622465</div>
              <div className="text-xs">
                We hereby confirm that <span className="font-semibold">HAMIDU GALADIMA</span>, with account number 1875622465 is indebted to our Bank as at October 24th 2024 as shown below;
              </div>
            </div>

            <table className="w-full text-xs border border-gray-300">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="border-r border-gray-300 p-1">S/N</th>
                  <th className="border-r border-gray-300 p-1">Facility Type</th>
                  <th className="border-r border-gray-300 p-1">Currency</th>
                  <th className="border-r border-gray-300 p-1">Amount Availed</th>
                  <th className="p-1">Outstanding Amount as at October 24th 2024</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-r border-gray-300 p-1">1</td>
                  <td className="border-r border-gray-300 p-1">PERSONAL LOAN</td>
                  <td className="border-r border-gray-300 p-1">NGN</td>
                  <td className="border-r border-gray-300 p-1">38,678,278.69</td>
                  <td className="p-1">38,678,278.69</td>
                </tr>
              </tbody>
            </table>

            <div className="text-xs space-y-2">
              <div>Please note that interest will continue to accrue on the above amount(s) on a daily basis until the facility is fully liquidated.</div>
              <div>This report is given in strict confidence and without liability on the part of Access Bank Plc or any of its staff or agent.</div>
              <div>Thank you.</div>
              <div>Yours faithfully,</div>
              <div>For: ACCESS BANK PLC</div>
            </div>

            <div className="flex justify-between items-end mt-8">
              <div className="text-center">
                <div className="text-xs mb-2">Abosede Fisher</div>
                <div className="text-xs">AUTHORIZED SIGNATORY</div>
                <div className="h-8 border-b border-black w-24 mt-4"></div>
                <div className="text-xs font-semibold">Ajao Alexander</div>
              </div>
              <div className="text-center">
                <div className="text-xs mb-2">Doyin Coker</div>
                <div className="text-xs">AUTHORIZED SIGNATORY</div>
                <div className="h-8 border-b border-black w-24 mt-4"></div>
                <div className="text-xs font-semibold">Evra Arogundade</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute content-stretch flex gap-[50.145px] items-start left-[37.38px] top-[641.29px] w-[467.719px]">
        <button 
          onClick={onClose}
          className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[7.294px] border border-[#d0d5dd] shadow-[0px_0.912px_1.823px_0px_rgba(16,24,40,0.05)]"
        >
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="box-border content-stretch flex gap-[7.294px] items-center justify-center px-[16.411px] py-[15.499px] relative w-full">
              <p className="font-medium leading-[21.882px] not-italic relative shrink-0 text-[#344054] text-[12.764px] text-nowrap whitespace-pre">Cancel</p>
            </div>
          </div>
        </button>
        
        <button 
          onClick={onConfirm}
          className="bg-[#003883] relative rounded-[7.294px] w-[208.787px] border border-[#003883] shadow-[0px_0.912px_1.823px_0px_rgba(16,24,40,0.05)]"
        >
          <div className="box-border content-stretch flex gap-[7.294px] items-center justify-center overflow-clip px-[16.411px] py-[15.499px] relative rounded-[inherit] w-full">
            <p className="font-medium leading-[21.882px] not-italic relative shrink-0 text-[12.764px] text-nowrap text-white whitespace-pre">Submit</p>
          </div>
        </button>
      </div>
    </div>
  );
}