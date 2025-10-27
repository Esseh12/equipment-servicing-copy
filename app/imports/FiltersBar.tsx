import svgPaths from "./svg-e5dui3gtnu";

function Content() {
  return <div className="box-border content-stretch flex gap-[8px] items-center pl-[12px] pr-0 py-[8px] shrink-0 w-[531px]" data-name="Content" />;
}

function Dropdown() {
  return <div className="box-border content-stretch flex items-center justify-between overflow-clip px-[12px] py-[8px] shrink-0" data-name="Dropdown" />;
}

function Input() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full">
        <Content />
        <Dropdown />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <Input />
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
      <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#344054] text-[14px] text-nowrap whitespace-pre">
        <span>{`Recipient’s Name `}</span>
        <span className="text-[#ee3148]">*</span>
      </p>
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

function Content1() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#667085] text-[16px]">Select</p>
    </div>
  );
}

function Content2() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Content">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center pl-[12px] pr-0 py-[8px] relative w-full">
          <Content1 />
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

function Dropdown1() {
  return (
    <div className="box-border content-stretch flex gap-[4px] items-center overflow-clip px-[12px] py-[8px] relative shrink-0" data-name="Dropdown">
      <ChevronDown />
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full">
        <Content2 />
        <Dropdown1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel2() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <Input1 />
    </div>
  );
}

function InputField1() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input field">
      <InputWithLabel2 />
    </div>
  );
}

function InputWithLabel3() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#344054] text-[14px] text-nowrap whitespace-pre">
        <span>{`Purpose of Letter `}</span>
        <span className="text-[#ee3148]">*</span>
      </p>
      <InputField1 />
    </div>
  );
}

function InputDropdown1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[554px] top-0 w-[531px]" data-name="Input dropdown">
      <InputWithLabel3 />
    </div>
  );
}

function Frame1597881656() {
  return (
    <div className="h-[66px] relative shrink-0 w-full">
      <InputDropdown />
      <InputDropdown1 />
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex gap-[6.967px] items-center relative shrink-0 w-[384.922px]" data-name="Content">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[20.901px] min-h-px min-w-px not-italic relative shrink-0 text-[#667085] text-[13.934px]">Select</p>
    </div>
  );
}

function Content4() {
  return (
    <div className="basis-0 grow h-[40px] min-h-px min-w-px relative shrink-0" data-name="Content">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6.967px] h-[40px] items-center pl-[10.45px] pr-0 py-[6.967px] relative w-full">
          <Content3 />
        </div>
      </div>
    </div>
  );
}

function ChevronDown1() {
  return (
    <div className="relative shrink-0 size-[17.418px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="chevron-down">
          <path d={svgPaths.p87fb500} id="Icon" stroke="var(--stroke-0, #667085)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45147" />
        </g>
      </svg>
    </div>
  );
}

function Dropdown2() {
  return (
    <div className="box-border content-stretch flex h-[40px] items-center justify-between overflow-clip px-[10.45px] py-[6.967px] relative shrink-0" data-name="Dropdown">
      <ChevronDown1 />
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-white h-[40px] relative rounded-[6.967px] shrink-0 w-full" data-name="Input">
      <div className="content-stretch flex h-[40px] items-start overflow-clip relative rounded-[inherit] w-full">
        <Content4 />
        <Dropdown2 />
      </div>
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[0.871px] border-solid inset-0 pointer-events-none rounded-[6.967px] shadow-[0px_0.871px_1.742px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel4() {
  return (
    <div className="content-stretch flex flex-col gap-[5.225px] h-[40px] items-start relative shrink-0 w-full" data-name="Input with label">
      <Input2 />
    </div>
  );
}

function InputField2() {
  return (
    <div className="content-stretch flex flex-col gap-[5.225px] h-[40px] items-start relative shrink-0 w-[531px]" data-name="Input field">
      <InputWithLabel4 />
    </div>
  );
}

function InputWithLabel5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[5.225px] items-start left-0 top-[0.3px] w-[543px]" data-name="Input with label">
      <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[17.417px] not-italic relative shrink-0 text-[#344054] text-[0px] text-[12.192px] text-nowrap whitespace-pre">
        Select Authorized Signatory 1<span className="font-['Inter:Regular',_sans-serif] font-normal text-[#ee3148]">{`* `}</span>
      </p>
      <InputField2 />
    </div>
  );
}

function Frame1597882024() {
  return (
    <div className="h-[64px] relative shrink-0 w-[531px]">
      <InputWithLabel5 />
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex gap-[6.967px] items-center relative shrink-0 w-[384.922px]" data-name="Content">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[20.901px] min-h-px min-w-px not-italic relative shrink-0 text-[#667085] text-[13.934px]">Select</p>
    </div>
  );
}

function Content6() {
  return (
    <div className="basis-0 grow h-[40px] min-h-px min-w-px relative shrink-0" data-name="Content">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6.967px] h-[40px] items-center pl-[10.45px] pr-0 py-[6.967px] relative w-full">
          <Content5 />
        </div>
      </div>
    </div>
  );
}

function ChevronDown2() {
  return (
    <div className="relative shrink-0 size-[17.418px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="chevron-down">
          <path d={svgPaths.p87fb500} id="Icon" stroke="var(--stroke-0, #667085)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45147" />
        </g>
      </svg>
    </div>
  );
}

function Dropdown3() {
  return (
    <div className="box-border content-stretch flex h-[40px] items-center justify-between overflow-clip px-[10.45px] py-[6.967px] relative shrink-0" data-name="Dropdown">
      <ChevronDown2 />
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-white h-[40px] relative rounded-[6.967px] shrink-0 w-full" data-name="Input">
      <div className="content-stretch flex h-[40px] items-start overflow-clip relative rounded-[inherit] w-full">
        <Content6 />
        <Dropdown3 />
      </div>
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[0.871px] border-solid inset-0 pointer-events-none rounded-[6.967px] shadow-[0px_0.871px_1.742px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel6() {
  return (
    <div className="content-stretch flex flex-col gap-[5.225px] h-[40px] items-start relative shrink-0 w-full" data-name="Input with label">
      <Input3 />
    </div>
  );
}

function InputField3() {
  return (
    <div className="content-stretch flex flex-col gap-[5.225px] h-[40px] items-start relative shrink-0 w-[531px]" data-name="Input field">
      <InputWithLabel6 />
    </div>
  );
}

function InputWithLabel7() {
  return (
    <div className="content-stretch flex flex-col gap-[5.225px] items-start relative shrink-0 w-full" data-name="Input with label">
      <InputField3 />
    </div>
  );
}

function InputField4() {
  return (
    <div className="content-stretch flex flex-col gap-[5.225px] h-[40px] items-start relative shrink-0 w-[531px]" data-name="Input field">
      <InputWithLabel7 />
    </div>
  );
}

function InputWithLabel8() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[5.225px] items-start left-0 top-0 w-[531px]" data-name="Input with label">
      <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[17.417px] not-italic relative shrink-0 text-[#344054] text-[0px] text-[12.192px] text-nowrap whitespace-pre">
        Select Authorized Signatory 2<span className="font-['Inter:Regular',_sans-serif] font-normal text-[#ee3148]">{`* `}</span>
      </p>
      <InputField4 />
    </div>
  );
}

function Frame1597882025() {
  return (
    <div className="h-[64px] relative shrink-0 w-[531px]">
      <InputWithLabel8 />
    </div>
  );
}

function Frame1597882104() {
  return (
    <div className="content-stretch flex gap-[23px] items-start relative shrink-0 w-[1085px]">
      <Frame1597882024 />
      <Frame1597882025 />
    </div>
  );
}

function Content7() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <p className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#667085] text-[16px]">Select</p>
    </div>
  );
}

function Content8() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Content">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center pl-[12px] pr-0 py-[8px] relative w-full">
          <Content7 />
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

function Dropdown4() {
  return (
    <div className="box-border content-stretch flex gap-[4px] items-center overflow-clip px-[12px] py-[8px] relative shrink-0" data-name="Dropdown">
      <ChevronDown3 />
    </div>
  );
}

function Input4() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full">
        <Content8 />
        <Dropdown4 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel9() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <Input4 />
    </div>
  );
}

function InputField5() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input field">
      <InputWithLabel9 />
    </div>
  );
}

function InputWithLabel10() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#344054] text-[14px] text-nowrap whitespace-pre">
        <span>{`Delivery Option `}</span>
        <span className="text-[#ee3148]">*</span>
      </p>
      <InputField5 />
    </div>
  );
}

function InputDropdown2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[531px]" data-name="Input dropdown">
      <InputWithLabel10 />
    </div>
  );
}

function Frame1597881711() {
  return (
    <div className="content-stretch flex gap-[23px] items-center relative shrink-0">
      <InputDropdown2 />
    </div>
  );
}

function Content9() {
  return <div className="absolute h-[24px] left-[12px] top-[8px] w-[475px]" data-name="Content" />;
}

function Content10() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Content">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center pl-[12px] pr-0 py-[8px] relative w-full">
          <Content9 />
        </div>
      </div>
    </div>
  );
}

function Dropdown5() {
  return <div className="box-border content-stretch flex items-center justify-between overflow-clip px-[12px] py-[8px] shrink-0" data-name="Dropdown" />;
}

function Input5() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full">
        <Content10 />
        <Dropdown5 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel11() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] items-start left-0 top-0 w-[531px]" data-name="Input with label">
      <Input5 />
    </div>
  );
}

function UploadCloud02() {
  return (
    <div className="absolute left-[500px] size-[16px] top-[14px]" data-name="upload-cloud-02">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="upload-cloud-02">
          <path d={svgPaths.p16952380} id="Icon" stroke="var(--stroke-0, #667085)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function InputField6() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Input field">
      <InputWithLabel11 />
      <UploadCloud02 />
    </div>
  );
}

function InputWithLabel12() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] items-start left-0 top-0 w-[531px]" data-name="Input with label">
      <InputField6 />
    </div>
  );
}

function InputField7() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Input field">
      <InputWithLabel12 />
    </div>
  );
}

function InputWithLabel13() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#344054] text-[0px] text-[14px] text-nowrap whitespace-pre">
        <span>{`Upload Customer Instruction `}</span>
        <span className="font-['Inter:Light',_sans-serif] font-light">{`Acceptable Documents: PDF, JPG, PNG `}</span>
        <span className="font-['Inter:Light',_sans-serif] font-light text-[#ee3148]">*</span>
      </p>
      <InputField7 />
    </div>
  );
}

function InputDropdown3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[531px]" data-name="Input dropdown">
      <InputWithLabel13 />
    </div>
  );
}

function Frame1597881710() {
  return (
    <div className="content-stretch flex gap-[23px] items-center relative shrink-0">
      <InputDropdown3 />
    </div>
  );
}

function Frame1597881714() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame1597881711 />
      <Frame1597881710 />
    </div>
  );
}

function Content11() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Content">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center pl-[12px] pr-0 py-[8px] w-full" />
      </div>
    </div>
  );
}

function ChevronDown4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="chevron-down"></g>
      </svg>
    </div>
  );
}

function Dropdown6() {
  return (
    <div className="box-border content-stretch flex items-center justify-between overflow-clip px-[12px] py-[8px] relative shrink-0" data-name="Dropdown">
      <ChevronDown4 />
    </div>
  );
}

function Input6() {
  return (
    <div className="bg-white h-[146px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="content-stretch flex h-[146px] items-start overflow-clip relative rounded-[inherit] w-full">
        <Content11 />
        <Dropdown6 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel14() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <Input6 />
    </div>
  );
}

function InputField8() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input field">
      <InputWithLabel14 />
    </div>
  );
}

function InputWithLabel15() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] items-start left-0 top-0 w-[519px]" data-name="Input with label">
      <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#344054] text-[0px] text-[14px] text-nowrap whitespace-pre">
        Recipient Address<span className="font-['Inter:Regular',_sans-serif] font-normal text-[#ee3148]">*</span>
      </p>
      <InputField8 />
    </div>
  );
}

function Frame1597881657() {
  return (
    <div className="absolute h-[172px] left-0 top-0 w-[531px]">
      <InputWithLabel15 />
    </div>
  );
}

function Frame1597881713() {
  return (
    <div className="h-[66px] relative shrink-0 w-full">
      <Frame1597881657 />
    </div>
  );
}

function Frame1597881712() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[36px] items-start left-[19px] top-[74px] w-[1085px]">
      <Frame1597881656 />
      <Frame1597882104 />
      <Frame1597881714 />
      <Frame1597881713 />
    </div>
  );
}

export default function FiltersBar() {
  return (
    <div className="bg-gray-50 relative rounded-[12px] size-full" data-name="Filters bar">
      <Frame1597881712 />
      <p className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[28px] left-[20px] not-italic text-[#101828] text-[18px] top-[20px] w-[1084px]">Request Details</p>
    </div>
  );
}