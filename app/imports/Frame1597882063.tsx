import svgPaths from "./svg-1xhpa9otur";
import imgImage4 from "figma:asset/7b060d15d84a01f78efaca93b3661876238566a2.png";
import imgImage3 from "figma:asset/898c83b0d3bbe8806ecfa5d66a6064f401fdb2c5.png";

function Frame1597881748() {
  return (
    <div className="content-stretch flex flex-col gap-[6.241px] items-start relative self-stretch shrink-0 w-[166.178px]">
      <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[15.604px] not-italic relative shrink-0 text-[#526484] text-[10.923px] text-nowrap whitespace-pre">Customer Image</p>
      <div className="h-[141.993px] relative shrink-0 w-[149.014px]" data-name="image 4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[123.63%] left-[-3.4%] max-w-none top-[-8.9%] w-[111.59%]" src={imgImage4} />
        </div>
      </div>
    </div>
  );
}

function Frame1597881839() {
  return (
    <div className="content-stretch flex flex-col gap-[6.241px] items-start relative self-stretch shrink-0 w-[166.178px]">
      <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[15.604px] not-italic relative shrink-0 text-[#526484] text-[10.923px] text-nowrap whitespace-pre">Signature</p>
      <div className="h-[125.846px] relative shrink-0 w-[166.314px]" data-name="image 3">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage3} />
      </div>
    </div>
  );
}

function InputWithLabel() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Medium',_sans-serif] font-medium gap-[4.681px] items-start not-italic relative shrink-0 w-[125.609px]" data-name="Input with label">
      <p className="leading-[15.604px] relative shrink-0 text-[#526484] text-[10.923px] text-nowrap whitespace-pre">Customer Instruction</p>
      <p className="h-[29.647px] leading-[29.647px] relative shrink-0 text-[#101828] text-[12.483px] w-[131.07px]">Only A should Sign</p>
    </div>
  );
}

function Frame1597881836() {
  return (
    <div className="content-stretch flex gap-[17.944px] items-center relative shrink-0 w-full">
      <InputWithLabel />
    </div>
  );
}

function Frame1597881838() {
  return (
    <div className="content-stretch flex flex-col gap-[31.207px] items-start relative shrink-0 w-[110.786px]">
      <Frame1597881836 />
    </div>
  );
}

function Frame1597881845() {
  return (
    <div className="absolute box-border content-stretch flex gap-[166.178px] items-start left-[6.24px] pl-[20.285px] pr-[12.483px] py-0 top-[calc(50%+17.943px)] translate-y-[-50%] w-[797.344px]">
      <Frame1597881748 />
      <Frame1597881839 />
      <Frame1597881838 />
    </div>
  );
}

function Group1000001574() {
  return (
    <div className="absolute contents left-[6.24px] top-[calc(50%+17.943px)] translate-y-[-50%]">
      <Frame1597881845 />
    </div>
  );
}

function FiltersBar() {
  return (
    <div className="bg-gray-50 h-[266.822px] relative rounded-[9.362px] shrink-0 w-full" data-name="Filters bar">
      <p className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-[30.427px] leading-[21.845px] left-[20.29px] not-italic text-[#101828] text-[14.043px] top-[15.6px] w-[845.715px]">Customer Mandate</p>
      <Group1000001574 />
    </div>
  );
}

function Check() {
  return (
    <div className="absolute inset-[12.52%_12.51%_12.48%_12.49%]" data-name="check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="check">
          <path d={svgPaths.p1b1c1e00} id="Icon" stroke="var(--stroke-0, #003883)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.30025" />
        </g>
      </svg>
    </div>
  );
}

function CheckboxBase() {
  return (
    <div className="bg-[rgba(217,217,231,0.51)] relative rounded-[3.121px] shrink-0 size-[12.483px]" data-name="_Checkbox base">
      <div className="overflow-clip relative rounded-[inherit] size-[12.483px]">
        <Check />
      </div>
      <div aria-hidden="true" className="absolute border-[#003883] border-[0.78px] border-solid inset-0 pointer-events-none rounded-[3.121px]" />
    </div>
  );
}

function Input() {
  return (
    <div className="box-border content-stretch flex items-center justify-center pb-0 pt-[1.56px] px-0 relative shrink-0" data-name="Input">
      <CheckboxBase />
    </div>
  );
}

function TextAndSupportingText() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[14px]" data-name="Text and supporting text">
      <p className="font-['Inter:Medium',_sans-serif] font-medium min-w-full relative shrink-0 text-[#344054] w-[min-content]">Confirm Mandate</p>
      <p className="font-['Inter:Regular',_sans-serif] font-normal relative shrink-0 text-[#475467] text-nowrap whitespace-pre">I confirm I have viewed the customer mandate and understand its contents.</p>
    </div>
  );
}

function Checkbox() {
  return (
    <div className="content-stretch flex gap-[6.241px] items-start relative shrink-0 w-[837.914px]" data-name="Checkbox">
      <Input />
      <TextAndSupportingText />
    </div>
  );
}

function Frame1597882067() {
  return (
    <div className="content-stretch flex flex-col gap-[18.724px] items-start relative shrink-0 w-full">
      <FiltersBar />
      <Checkbox />
    </div>
  );
}

export default function Frame1597882063() {
  return (
    <div className="content-stretch flex flex-col gap-[18.724px] items-center relative size-full">
      <Frame1597882067 />
    </div>
  );
}