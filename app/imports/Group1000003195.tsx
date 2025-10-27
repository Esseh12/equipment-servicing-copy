import svgPaths from "./svg-dee5q1txyl";
import imgImage10 from "figma:asset/8b730d86f808c50b50497cf4129811df2f021894.png";
import imgImage3 from "figma:asset/898c83b0d3bbe8806ecfa5d66a6064f401fdb2c5.png";
import { imgImage9 } from "./svg-6v6aw";

function Check() {
  return (
    <div className="absolute inset-[12.5%]" data-name="check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="check">
          <path d="M10 3L4.5 8.5L2 6" id="Icon" stroke="var(--stroke-0, #003883)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6666" />
        </g>
      </svg>
    </div>
  );
}

function CheckboxBase() {
  return (
    <div className="bg-[rgba(217,217,231,0.51)] relative rounded-[4px] shrink-0 size-[16px]" data-name="_Checkbox base">
      <div className="overflow-clip relative size-[16px]">
        <Check />
      </div>
      <div aria-hidden="true" className="absolute border border-[#003883] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Input() {
  return (
    <div className="box-border content-stretch flex items-center justify-center pb-0 pt-[2px] px-0 relative shrink-0" data-name="Input">
      <CheckboxBase />
    </div>
  );
}

function TextAndSupportingText() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[14px]" data-name="Text and supporting text">
      <div className="font-['Inter:Medium',_sans-serif] font-medium min-w-full relative shrink-0 text-[#344054]" style={{ width: "min-content" }}>
        <p className="leading-[20px]">Confirm Mandate</p>
      </div>
      <div className="font-['Inter:Regular',_sans-serif] font-normal relative shrink-0 text-[#475467] text-nowrap">
        <p className="leading-[20px] whitespace-pre">I confirm I have viewed the customer mandate and understand its contents.</p>
      </div>
    </div>
  );
}

function Checkbox() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-start left-[14px] top-[806px] w-[344px]" data-name="Checkbox">
      <Input />
      <TextAndSupportingText />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#003883] relative rounded-[8px] shrink-0 w-[199px]" data-name="Button">
      <div className="box-border content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[10px] relative w-[199px]">
        <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
          <p className="leading-[24px] whitespace-pre">Validate</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#003883] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function Actions() {
  return (
    <div className="absolute content-stretch flex gap-[12px] items-center left-[14px] top-[867px]" data-name="Actions">
      <Button1 />
    </div>
  );
}

function Group1000001604() {
  return (
    <div className="absolute contents left-[14px] top-[806px]">
      <Checkbox />
      <Actions />
    </div>
  );
}

function HomeLine() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="home-line">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="home-line">
          <path d={svgPaths.p4aa1300} id="Icon" stroke="var(--stroke-0, #667085)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function BreadcrumbButtonBase() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="_Breadcrumb button base">
      <HomeLine />
    </div>
  );
}

function ChevronRight() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="chevron-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="chevron-right">
          <path d="M6 12L10 8L6 4" id="Icon" stroke="var(--stroke-0, #D0D5DD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function BreadcrumbButtonBase1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="_Breadcrumb button base">
      <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#003883] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">Banker’s Confirmation</p>
      </div>
    </div>
  );
}

function Tabs() {
  return (
    <div className="box-border content-stretch flex gap-[12px] items-center pl-[8px] pr-0 py-0 relative shrink-0" data-name="Tabs">
      <BreadcrumbButtonBase />
      <ChevronRight />
      <BreadcrumbButtonBase1 />
    </div>
  );
}

function Breadcrumbs() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[8px] items-start justify-center left-[22px] px-0 py-[8px] top-0 w-[1096px]" data-name="Breadcrumbs">
      <Tabs />
    </div>
  );
}

function TextAndSupportingText1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-start leading-[0] left-[22px] not-italic top-[63px] w-[1091px]" data-name="Text and supporting text">
      <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold relative shrink-0 text-[#101828] text-[30px] w-full">
        <p className="leading-[38px]">Banker’s Confirmation</p>
      </div>
      <div className="font-['Inter:Regular',_sans-serif] font-normal relative shrink-0 text-[#475467] text-[16px] w-full">
        <p className="leading-[24px]">New Request</p>
      </div>
    </div>
  );
}

function Frame1597881770() {
  return (
    <div className="absolute h-[129px] left-0 top-0 w-[927px]">
      <Breadcrumbs />
      <TextAndSupportingText1 />
    </div>
  );
}

function Content() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[12px] top-[10px] w-[475px]" data-name="Content">
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] text-nowrap">
        <p className="leading-[20px] whitespace-pre">2456785577</p>
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center pl-[12px] pr-0 py-[8px] relative shrink-0 w-[531px]" data-name="Content">
      <Content />
    </div>
  );
}

function Dropdown() {
  return <div className="box-border content-stretch flex items-center justify-between overflow-clip px-[12px] py-[8px] shrink-0" data-name="Dropdown" />;
}

function Input1() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="content-stretch flex items-start overflow-clip relative w-full">
        <Content1 />
        <Dropdown />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <Input1 />
    </div>
  );
}

function InputField() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input field">
      <InputWithLabel />
    </div>
  );
}

function InputWithLabel1() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#344054] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">
          <span>{`Account Number `}</span>
          <span className="text-[#ee3148]">*</span>
        </p>
      </div>
      <InputField />
    </div>
  );
}

function InputDropdown() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] items-end left-0 top-0 w-[531px]" data-name="Input dropdown">
      <InputWithLabel1 />
    </div>
  );
}

function Content2() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[12px] top-[10px] w-[475px]" data-name="Content">
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] text-nowrap">
        <p className="leading-[20px] whitespace-pre">Oyin Jolayemi</p>
      </div>
    </div>
  );
}

function Content3() {
  return (
    <div className="bg-[rgba(0,0,0,0.03)] box-border content-stretch flex gap-[8px] items-center pl-[12px] pr-0 py-[8px] relative shrink-0 w-[531px]" data-name="Content">
      <Content2 />
    </div>
  );
}

function Dropdown1() {
  return <div className="box-border content-stretch flex items-center justify-between overflow-clip px-[12px] py-[8px] shrink-0" data-name="Dropdown" />;
}

function Input2() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="content-stretch flex items-start overflow-clip relative w-full">
        <Content3 />
        <Dropdown1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel2() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <Input2 />
    </div>
  );
}

function InputField1() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input field">
      <InputWithLabel2 />
    </div>
  );
}

function InputWithLabel3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] items-start left-[554px] top-0 w-[531px]" data-name="Input with label">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#344054] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">Customer Name</p>
      </div>
      <InputField1 />
    </div>
  );
}

function Frame1597881656() {
  return (
    <div className="h-[66px] relative shrink-0 w-full">
      <InputDropdown />
      <InputWithLabel3 />
    </div>
  );
}

function Content4() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[12px] top-[10px] w-[475px]" data-name="Content">
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] text-nowrap">
        <p className="leading-[20px] whitespace-pre">234789876543</p>
      </div>
    </div>
  );
}

function Content5() {
  return (
    <div className="bg-[rgba(0,0,0,0.03)] box-border content-stretch flex gap-[8px] items-center pl-[12px] pr-0 py-[8px] relative shrink-0 w-[531px]" data-name="Content">
      <Content4 />
    </div>
  );
}

function Dropdown2() {
  return <div className="box-border content-stretch flex items-center justify-between overflow-clip px-[12px] py-[8px] shrink-0" data-name="Dropdown" />;
}

function Input3() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="content-stretch flex items-start overflow-clip relative w-full">
        <Content5 />
        <Dropdown2 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel4() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <Input3 />
    </div>
  );
}

function InputField2() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input field">
      <InputWithLabel4 />
    </div>
  );
}

function InputWithLabel5() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#344054] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">BVN</p>
      </div>
      <InputField2 />
    </div>
  );
}

function InputDropdown1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[531px]" data-name="Input dropdown">
      <InputWithLabel5 />
    </div>
  );
}

function Frame1597881709() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <InputDropdown1 />
    </div>
  );
}

function Frame1597881710() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[36px] items-start left-[19px] top-[74px] w-[1085px]">
      <Frame1597881656 />
      <Frame1597881709 />
    </div>
  );
}

function FiltersBar() {
  return (
    <div className="absolute bg-gray-50 h-[280px] left-[2px] rounded-[12px] top-[147px] w-[1117px]" data-name="Filters bar">
      <Frame1597881710 />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] left-[20px] not-italic text-[#101828] text-[18px] top-[20px] w-[1084px]">
        <p className="leading-[28px]">Customer Details</p>
      </div>
    </div>
  );
}

function Content6() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[12px] top-[10px] w-[475px]" data-name="Content">
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] text-nowrap">
        <p className="leading-[20px] whitespace-pre">Tolulope Olaleru</p>
      </div>
    </div>
  );
}

function Content7() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center pl-[12px] pr-0 py-[8px] relative shrink-0 w-[531px]" data-name="Content">
      <Content6 />
    </div>
  );
}

function Dropdown3() {
  return <div className="box-border content-stretch flex items-center justify-between overflow-clip px-[12px] py-[8px] shrink-0" data-name="Dropdown" />;
}

function Input4() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="content-stretch flex items-start overflow-clip relative w-full">
        <Content7 />
        <Dropdown3 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel6() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <Input4 />
    </div>
  );
}

function InputField3() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input field">
      <InputWithLabel6 />
    </div>
  );
}

function InputWithLabel7() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#344054] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">
          <span>{`Recipient’s Name `}</span>
          <span className="text-[#ee3148]">*</span>
        </p>
      </div>
      <InputField3 />
    </div>
  );
}

function InputDropdown2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] items-end left-0 top-0 w-[531px]" data-name="Input dropdown">
      <InputWithLabel7 />
    </div>
  );
}

function Content8() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <div className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#667085] text-[16px]">
        <p className="leading-[24px]">Signatory 1, Signatory Two</p>
      </div>
    </div>
  );
}

function Content9() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Content">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center pl-[12px] pr-0 py-[8px] relative w-full">
          <Content8 />
        </div>
      </div>
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-down">
          <path d="M5 7.5L10 12.5L15 7.5" id="Icon" stroke="var(--stroke-0, #667085)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Dropdown4() {
  return (
    <div className="box-border content-stretch flex gap-[4px] items-center overflow-clip px-[12px] py-[8px] relative shrink-0" data-name="Dropdown">
      <ChevronDown />
    </div>
  );
}

function Input5() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="content-stretch flex items-start overflow-clip relative w-full">
        <Content9 />
        <Dropdown4 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel8() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <Input5 />
    </div>
  );
}

function InputField4() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input field">
      <InputWithLabel8 />
    </div>
  );
}

function InputWithLabel9() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#344054] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">
          <span>{`Authorized Signatories `}</span>
          <span className="text-[#ee3148]">*</span>
        </p>
      </div>
      <InputField4 />
    </div>
  );
}

function InputDropdown3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[531px]" data-name="Input dropdown">
      <InputWithLabel9 />
    </div>
  );
}

function Frame1597881712() {
  return (
    <div className="absolute content-stretch flex gap-[23px] items-center left-[554px] top-0">
      <InputDropdown3 />
    </div>
  );
}

function Frame1597881714() {
  return (
    <div className="h-[66px] relative shrink-0 w-full">
      <InputDropdown2 />
      <Frame1597881712 />
    </div>
  );
}

function Content10() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <div className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#667085] text-[16px]">
        <p className="leading-[24px]">Pension</p>
      </div>
    </div>
  );
}

function Content11() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Content">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center pl-[12px] pr-0 py-[8px] relative w-full">
          <Content10 />
        </div>
      </div>
    </div>
  );
}

function ChevronDown1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-down">
          <path d="M5 7.5L10 12.5L15 7.5" id="Icon" stroke="var(--stroke-0, #667085)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Dropdown5() {
  return (
    <div className="box-border content-stretch flex gap-[4px] items-center overflow-clip px-[12px] py-[8px] relative shrink-0" data-name="Dropdown">
      <ChevronDown1 />
    </div>
  );
}

function Input6() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="content-stretch flex items-start overflow-clip relative w-full">
        <Content11 />
        <Dropdown5 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel10() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <Input6 />
    </div>
  );
}

function InputField5() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input field">
      <InputWithLabel10 />
    </div>
  );
}

function InputWithLabel11() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#344054] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">
          <span>{`Purpose of Confirmation `}</span>
          <span className="text-[#ee3148]">*</span>
        </p>
      </div>
      <InputField5 />
    </div>
  );
}

function InputDropdown4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[531px]" data-name="Input dropdown">
      <InputWithLabel11 />
    </div>
  );
}

function Content12() {
  return <div className="absolute h-[24px] left-[12px] top-[8px] w-[475px]" data-name="Content" />;
}

function Content13() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Content">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center pl-[12px] pr-0 py-[8px] relative w-full">
          <Content12 />
        </div>
      </div>
    </div>
  );
}

function Dropdown6() {
  return <div className="box-border content-stretch flex items-center justify-between overflow-clip px-[12px] py-[8px] shrink-0" data-name="Dropdown" />;
}

function Input7() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="content-stretch flex items-start overflow-clip relative w-full">
        <Content13 />
        <Dropdown6 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel12() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] items-start left-0 top-0 w-[531px]" data-name="Input with label">
      <Input7 />
    </div>
  );
}

function MaterialSymbolsLightDeleteRounded() {
  return (
    <div className="absolute left-[496px] size-[24px] top-[8px]" data-name="material-symbols-light:delete-rounded">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-symbols-light:delete-rounded">
          <path d={svgPaths.pb860580} fill="var(--fill-0, #EE3148)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function InputField6() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Input field">
      <InputWithLabel12 />
      <MaterialSymbolsLightDeleteRounded />
    </div>
  );
}

function InputWithLabel13() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] items-start left-0 top-0 w-[531px]" data-name="Input with label">
      <InputField6 />
    </div>
  );
}

function InputField7() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[531px]" data-name="Input field">
      <InputWithLabel13 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[0] left-[15px] not-italic text-[14px] text-[rgba(0,0,0,0.7)] text-nowrap top-[10px]">
        <p className="leading-[20px] whitespace-pre">File.pdf</p>
      </div>
    </div>
  );
}

function InputField8() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Input field">
      <InputField7 />
    </div>
  );
}

function InputWithLabel14() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#344054] text-[0px] text-nowrap">
        <p className="leading-[20px] text-[14px] whitespace-pre">
          <span>{`Upload Customer Instruction `}</span>
          <span className="font-['Inter:Light',_sans-serif] font-light not-italic">{`Acceptable Documents: PDF, JPG, PNG `}</span>
          <span className="font-['Inter:Light',_sans-serif] font-light not-italic text-[#ee3148]">*</span>
        </p>
      </div>
      <InputField8 />
    </div>
  );
}

function InputDropdown5() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[531px]" data-name="Input dropdown">
      <InputWithLabel14 />
    </div>
  );
}

function Frame1597881715() {
  return (
    <div className="content-stretch flex gap-[23px] items-center relative shrink-0">
      <InputDropdown5 />
    </div>
  );
}

function Frame1597881716() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <InputDropdown4 />
      <Frame1597881715 />
    </div>
  );
}

function Content14() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[442px]" data-name="Content">
      <div className="basis-0 font-['Inter:Regular',_'Noto_Sans:Regular',_sans-serif] font-normal grow leading-[15px] min-h-px min-w-px not-italic relative shrink-0 text-[#667085] text-[16px]">
        <p className="mb-[3px]">{`Immigration Officer, `}</p>
        <p className="mb-[3px]">{`Immigration Refugees & Citizenship Canada {IRCC} `}</p>
        <p className="mb-[3px]">{`Centralized Intake Office-Start Up `}</p>
        <p className="mb-[3px]">{`Business Class `}</p>
        <p className="mb-[3px]">{`P.O Box 8700 `}</p>
        <p className="mb-[3px]">{`Sydney, NS, B1P 0G2 `}</p>
        <p>Canada.</p>
      </div>
    </div>
  );
}

function Content15() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Content">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center pl-[12px] pr-0 py-[8px] relative w-full">
          <Content14 />
        </div>
      </div>
    </div>
  );
}

function ChevronDown2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-down"></g>
      </svg>
    </div>
  );
}

function Dropdown7() {
  return (
    <div className="box-border content-stretch flex items-center justify-between overflow-clip px-[12px] py-[8px] relative shrink-0" data-name="Dropdown">
      <ChevronDown2 />
    </div>
  );
}

function Input8() {
  return (
    <div className="bg-white h-[146px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="content-stretch flex h-[146px] items-start overflow-clip relative w-full">
        <Content15 />
        <Dropdown7 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel15() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <Input8 />
    </div>
  );
}

function InputField9() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input field">
      <InputWithLabel15 />
    </div>
  );
}

function InputWithLabel16() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] items-start left-0 top-0 w-[519px]" data-name="Input with label">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#344054] text-[0px] text-nowrap">
        <p className="leading-[20px] text-[14px] whitespace-pre">
          Recipient Address<span className="font-['Inter:Regular',_sans-serif] font-normal not-italic text-[#ee3148]">*</span>
        </p>
      </div>
      <InputField9 />
    </div>
  );
}

function Frame1597881657() {
  return (
    <div className="absolute h-[172px] left-0 top-0 w-[531px]">
      <InputWithLabel16 />
    </div>
  );
}

function Content16() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <div className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#667085] text-[16px]">
        <p className="leading-[24px]">Print</p>
      </div>
    </div>
  );
}

function Content17() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Content">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center pl-[12px] pr-0 py-[8px] relative w-full">
          <Content16 />
        </div>
      </div>
    </div>
  );
}

function ChevronDown3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-down">
          <path d="M5 7.5L10 12.5L15 7.5" id="Icon" stroke="var(--stroke-0, #667085)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Dropdown8() {
  return (
    <div className="box-border content-stretch flex gap-[4px] items-center overflow-clip px-[12px] py-[8px] relative shrink-0" data-name="Dropdown">
      <ChevronDown3 />
    </div>
  );
}

function Input9() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="content-stretch flex items-start overflow-clip relative w-full">
        <Content17 />
        <Dropdown8 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel17() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <Input9 />
    </div>
  );
}

function InputField10() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input field">
      <InputWithLabel17 />
    </div>
  );
}

function InputWithLabel18() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#344054] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">
          <span>{`Delivery Option `}</span>
          <span className="text-[#ee3148]">*</span>
        </p>
      </div>
      <InputField10 />
    </div>
  );
}

function InputDropdown6() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[531px]" data-name="Input dropdown">
      <InputWithLabel18 />
    </div>
  );
}

function Frame1597881711() {
  return (
    <div className="absolute content-stretch flex gap-[23px] items-center left-[554px] top-0">
      <InputDropdown6 />
    </div>
  );
}

function Frame1597881713() {
  return (
    <div className="h-[66px] relative shrink-0 w-full">
      <Frame1597881657 />
      <Frame1597881711 />
    </div>
  );
}

function Frame1597881717() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[36px] items-start left-[19px] top-[74px] w-[1085px]">
      <Frame1597881714 />
      <Frame1597881716 />
      <Frame1597881713 />
    </div>
  );
}

function FiltersBar1() {
  return (
    <div className="absolute bg-gray-50 h-[488px] left-[2px] rounded-[12px] top-[957px] w-[1117px]" data-name="Filters bar">
      <Frame1597881717 />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] left-[20px] not-italic text-[#101828] text-[18px] top-[20px] w-[1084px]">
        <p className="leading-[28px]">Request Details</p>
      </div>
    </div>
  );
}

function Group91() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] h-[301.703px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[211.125px_98.25px] mask-size-[191px_182px] ml-[-211.125px] mt-[-98.25px] relative w-[877.602px]" data-name="image 9" style={{ maskImage: `url('${imgImage9}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage10} />
      </div>
    </div>
  );
}

function Frame1597881748() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start leading-[0] relative self-stretch shrink-0 w-[213px]">
      <div className="font-['Inter:Medium',_sans-serif] font-medium not-italic relative shrink-0 text-[#526484] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">Customer Image</p>
      </div>
      <Group91 />
    </div>
  );
}

function Frame1597881839() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative self-stretch shrink-0 w-[213px]">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#526484] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">Signature</p>
      </div>
      <div className="h-[161.304px] relative shrink-0 w-[213.174px]" data-name="image 3">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage3} />
      </div>
    </div>
  );
}

function InputWithLabel19() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Medium',_sans-serif] font-medium gap-[6px] items-start leading-[0] not-italic relative shrink-0 w-[161px]" data-name="Input with label">
      <div className="relative shrink-0 text-[#526484] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">Customer Instruction</p>
      </div>
      <div className="h-[38px] relative shrink-0 text-[#101828] text-[16px] w-[168px]">
        <p className="leading-[38px]">Only A should Sign</p>
      </div>
    </div>
  );
}

function Frame1597881836() {
  return (
    <div className="content-stretch flex gap-[23px] items-center relative shrink-0 w-full">
      <InputWithLabel19 />
    </div>
  );
}

function Frame1597881838() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-[142px]">
      <Frame1597881836 />
    </div>
  );
}

function Frame1597881845() {
  return (
    <div className="absolute box-border content-stretch flex gap-[213px] items-start left-[8px] pl-[26px] pr-[16px] py-0 translate-y-[-50%] w-[1022px]" style={{ top: "calc(50% + 23px)" }}>
      <Frame1597881748 />
      <Frame1597881839 />
      <Frame1597881838 />
    </div>
  );
}

function Group1000001574() {
  return (
    <div className="absolute contents left-[8px] translate-y-[-50%]" style={{ top: "calc(50% + 23px)" }}>
      <Frame1597881845 />
    </div>
  );
}

function FiltersBar2() {
  return (
    <div className="bg-gray-50 h-[342px] relative rounded-[12px] shrink-0 w-full" data-name="Filters bar">
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-[39px] leading-[0] left-[26px] not-italic text-[#101828] text-[18px] top-[20px] w-[1084px]">
        <p className="leading-[28px]">Customer Mandate</p>
      </div>
      <Group1000001574 />
    </div>
  );
}

function Frame1597881900() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[342px] items-center left-[4px] top-[452px] w-[1110px]">
      <FiltersBar2 />
    </div>
  );
}

export default function Group1000003195() {
  return (
    <div className="relative size-full">
      <Group1000001604 />
      <Frame1597881770 />
      <FiltersBar />
      <FiltersBar1 />
      <Frame1597881900 />
    </div>
  );
}