import svgPaths from "./svg-9y91tcndcj";

function BackgroundMask() {
  return <div className="absolute left-1/2 size-[336px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="_Background mask" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 336 336\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(-0.0000017664 16.8 -16.8 -0.0000027601 168 168)\\\'><stop stop-color=\\\'rgba(0,0,0,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(0,0,0,0)\\\' offset=\\\'1\\\'/></radialGradient></defs></svg>')" }} />;
}

function Mask() {
  return (
    <div className="absolute left-1/2 size-[336px] top-0 translate-x-[-50%]" data-name="Mask">
      <BackgroundMask />
    </div>
  );
}

function Content() {
  return (
    <div className="absolute left-1/2 size-[336px] top-0 translate-x-[-50%]" data-name="Content">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 336 336">
        <g id="Content">
          <circle cx="168" cy="168" id="Line" r="47.5" stroke="var(--stroke-0, #EAECF0)" />
          <circle cx="168" cy="168" id="Line_2" r="47.5" stroke="var(--stroke-0, #EAECF0)" />
          <circle cx="168" cy="168" id="Line_3" r="71.5" stroke="var(--stroke-0, #EAECF0)" />
          <circle cx="168" cy="168" id="Line_4" r="95.5" stroke="var(--stroke-0, #EAECF0)" />
          <circle cx="168" cy="168" id="Line_5" r="119.5" stroke="var(--stroke-0, #EAECF0)" />
          <circle cx="168" cy="168" id="Line_6" r="143.5" stroke="var(--stroke-0, #EAECF0)" />
          <circle cx="168" cy="168" id="Line_7" r="167.5" stroke="var(--stroke-0, #EAECF0)" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundPatternDecorative() {
  return (
    <div className="absolute left-[-120px] size-[336px] top-[-120px]" data-name="Background pattern decorative">
      <Mask />
      <Content />
    </div>
  );
}

function Save01() {
  return (
    <div className="absolute left-[12px] size-[24px] top-[12px]" data-name="save-01">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="save-01">
          <path d={svgPaths.p26d4fd00} id="Icon" stroke="var(--stroke-0, #DC6803)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function FeaturedIcon() {
  return (
    <div className="bg-[#fef0c7] relative rounded-[28px] shrink-0 size-[48px]" data-name="Featured icon">
      <div aria-hidden="true" className="absolute border-8 border-[#fffaeb] border-solid inset-[-4px] pointer-events-none rounded-[32px]" />
      <Save01 />
    </div>
  );
}

function TextAndSupportingText() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[0] not-italic relative shrink-0 w-full" data-name="Text and supporting text">
      <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold relative shrink-0 text-[#101828] text-[18px] w-full">
        <p className="leading-[28px]">Confirm Approval</p>
      </div>
      <div className="font-['Inter:Medium',_sans-serif] font-medium relative shrink-0 text-[#475467] text-[14px] w-full">
        <p className="leading-[20px]">Customer would be charged N100 for Confirmation</p>
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start pb-0 pt-[24px] px-[24px] relative w-full">
          <FeaturedIcon />
          <TextAndSupportingText />
        </div>
      </div>
    </div>
  );
}

function XClose() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="x-close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="x-close">
          <path d="M18 6L6 18M6 6L18 18" id="Icon" stroke="var(--stroke-0, #667085)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ButtonCloseX() {
  return (
    <div className="absolute box-border content-stretch flex items-center justify-center overflow-clip p-[10px] right-[16px] rounded-[8px] top-[16px]" data-name="Button close X">
      <XClose />
    </div>
  );
}

function ModalHeader() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="_Modal header">
      <Content1 />
      <ButtonCloseX />
    </div>
  );
}

function Button() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="flex flex-row items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[18px] py-[10px] relative w-full">
          <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#344054] text-[16px] text-nowrap">
            <p className="leading-[24px] whitespace-pre">No, Cancel</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function Button1() {
  return (
    <div className="basis-0 bg-[#003883] grow min-h-px min-w-px relative rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] shrink-0" data-name="Button">
      <div className="flex flex-row items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[18px] py-[10px] relative w-full">
          <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
            <p className="leading-[24px] whitespace-pre">Confirm</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="relative size-full">
        <div className="box-border content-stretch flex gap-[12px] items-start pb-[24px] pt-0 px-[24px] relative w-full">
          <Button />
          <Button1 />
        </div>
      </div>
    </div>
  );
}

function ModalActions() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[32px] px-0 relative shrink-0 w-full" data-name="_Modal actions">
      <Content2 />
    </div>
  );
}

export default function Modal() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-center overflow-clip relative rounded-[12px] shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.03)] size-full" data-name="Modal">
      <BackgroundPatternDecorative />
      <ModalHeader />
      <ModalActions />
    </div>
  );
}