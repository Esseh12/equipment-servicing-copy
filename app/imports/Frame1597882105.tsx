import svgPaths from "./svg-5f43zdhmxh";
import imgSignature2 from "figma:asset/a840fb9eb648092d555c72ad69d6712126eff7c2.png";
import imgSignature3 from "figma:asset/8a09b6c378205abc7e524625a8b38f68cb344545.png";
import imgFrame1597881944 from "figma:asset/913fe73fed1ae88c8df7da1b0ee6380e4f619686.png";

function XClose() {
  return (
    <button className="block cursor-pointer relative shrink-0 size-[21.882px]" data-name="x-close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="x-close">
          <path d={svgPaths.p83e3380} id="Icon" stroke="var(--stroke-0, #667085)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8235" />
        </g>
      </svg>
    </button>
  );
}

function ButtonCloseX() {
  return (
    <div className="absolute box-border content-stretch flex items-center justify-center overflow-clip p-[9.118px] right-[29.9px] rounded-[7.294px] top-[41.95px]" data-name="Button close X">
      <XClose />
    </div>
  );
}

function AlertCircle() {
  return (
    <div className="absolute left-[12.76px] size-[25.529px] top-[12.74px]" data-name="alert-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g id="alert-circle">
          <path d={svgPaths.p88a5000} id="Icon" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8235" />
        </g>
      </svg>
    </div>
  );
}

function FeaturedIcon() {
  return (
    <div className="absolute bg-[#e0e0e0] left-[24.63px] rounded-[25.529px] size-[51.058px] top-[36.5px]" data-name="Featured icon">
      <div aria-hidden="true" className="absolute border-[#f1f1f1] border-[9.117px] border-solid inset-[-4.559px] pointer-events-none rounded-[30.088px]" />
      <AlertCircle />
    </div>
  );
}

function Group1000001591() {
  return (
    <div className="absolute contents left-[20px] top-[574.34px]">
      <div className="absolute bg-black h-[0.912px] left-[20px] top-[574.34px] w-[104.851px]" />
      <p className="absolute font-['Effra_Trial:Bold',_sans-serif] leading-[normal] left-[31.85px] not-italic text-[12.764px] text-black text-nowrap top-[580.73px] whitespace-pre">Ajao Alexander</p>
    </div>
  );
}

function Group1000001592() {
  return (
    <div className="absolute contents left-[352.79px] top-[574.34px]">
      <div className="absolute bg-black h-[0.912px] left-[352.79px] top-[574.34px] w-[104.851px]" />
      <p className="absolute font-['Effra_Trial:Bold',_sans-serif] leading-[normal] left-[356.42px] not-italic text-[12.764px] text-black text-nowrap top-[580.73px] whitespace-pre">Evra Arogundade</p>
    </div>
  );
}

function Group1000001593() {
  return (
    <div className="absolute contents left-[20px] top-[574.34px]">
      <Group1000001591 />
      <Group1000001592 />
    </div>
  );
}

function Group1000001596() {
  return (
    <div className="absolute contents left-[20px] top-[536px]">
      <Group1000001593 />
      <div className="absolute h-[44.777px] left-[37.3px] top-[536px] w-[71.116px]" data-name="signature (2)">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgSignature2} />
      </div>
      <div className="absolute h-[44.777px] left-[363.71px] top-[536px] w-[63.012px]" data-name="signature (3)">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgSignature3} />
      </div>
    </div>
  );
}

function Frame1597881944() {
  return (
    <div className="absolute h-[591px] left-[20px] top-[6px] w-[482px]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[115.41%] left-[0.02%] max-w-none top-[-9.61%] w-[100.06%]" src={imgFrame1597881944} />
      </div>
      <Group1000001596 />
    </div>
  );
}

function LetterModal() {
  return (
    <div className="absolute bg-white h-[729px] left-0 overflow-clip rounded-[18.235px] top-0 w-[542px]" data-name="Letter Modal">
      <ButtonCloseX />
      <FeaturedIcon />
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.524860143661499)+(var(--transform-inner-height)*0.8511884808540344)))] items-center justify-center left-[62.5px] top-[229.76px] w-[calc(1px*((var(--transform-inner-height)*0.524860143661499)+(var(--transform-inner-width)*0.8511884808540344)))]" style={{ "--transform-inner-width": "551.421875", "--transform-inner-height": "18.234375" } as React.CSSProperties}>
        <div className="flex-none rotate-[31.659deg]">
          <p className="font-['Inter:Black',_sans-serif] font-black leading-[18.235px] not-italic opacity-20 relative text-[91.173px] text-black text-nowrap whitespace-pre">Watermark</p>
        </div>
      </div>
      <Frame1597881944 />
    </div>
  );
}

function ButtonBase() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[7.294px] shrink-0" data-name="_Button base">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[7.294px] items-center justify-center px-[16.411px] py-[15.499px] relative w-full">
          <p className="font-['Effra:Medium',_sans-serif] leading-[21.882px] not-italic relative shrink-0 text-[#344054] text-[12.764px] text-nowrap whitespace-pre">Cancel</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[0.912px] border-solid inset-0 pointer-events-none rounded-[7.294px] shadow-[0px_0.912px_1.823px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex items-start relative rounded-[7.294px] shrink-0 w-[208.787px]" data-name="Button">
      <ButtonBase />
    </div>
  );
}

function ButtonBase1() {
  return (
    <div className="[grid-area:1_/_1] bg-[#003883] ml-0 mt-0 relative rounded-[7.294px] w-[208.787px]" data-name="_Button base">
      <div className="box-border content-stretch flex gap-[7.294px] items-center justify-center overflow-clip px-[16.411px] py-[15.499px] relative rounded-[inherit] w-full">
        <p className="font-['Effra:Medium',_sans-serif] leading-[21.882px] not-italic relative shrink-0 text-[12.764px] text-nowrap text-white whitespace-pre">Submit</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#003883] border-[0.912px] border-solid inset-0 pointer-events-none rounded-[7.294px] shadow-[0px_0.912px_1.823px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function Button1() {
  return (
    <div className="basis-0 grid-cols-[max-content] grid-rows-[max-content] grow inline-grid leading-[0] min-h-px min-w-px place-items-start relative shrink-0" data-name="Button">
      <ButtonBase1 />
    </div>
  );
}

function ModalActions() {
  return (
    <div className="content-stretch flex gap-[10.941px] items-start relative shrink-0 w-[208.787px]" data-name="_Modal actions">
      <Button1 />
    </div>
  );
}

function Frame115609() {
  return (
    <div className="absolute content-stretch flex gap-[50.145px] items-start left-[37.38px] top-[641.29px] w-[467.719px]">
      <Button />
      <ModalActions />
    </div>
  );
}

export default function Frame1597882105() {
  return (
    <div className="bg-white overflow-clip relative rounded-[18.235px] size-full">
      <LetterModal />
      <Frame115609 />
    </div>
  );
}