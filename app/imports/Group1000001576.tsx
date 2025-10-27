import svgPaths from "./svg-d80qv644pw";

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
        <p className="leading-[20px] whitespace-pre">Letter of Indebtness</p>
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

function TextAndSupportingText() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-start leading-[0] left-[22px] not-italic top-[63px] w-[1091px]" data-name="Text and supporting text">
      <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold relative shrink-0 text-[#101828] text-[30px] w-full">
        <p className="leading-[38px]">Letter of Indebtedness</p>
      </div>
      <div className="font-['Inter:Regular',_sans-serif] font-normal relative shrink-0 text-[#475467] text-[16px] w-full">
        <p className="leading-[24px]">View Letter of indebtedness requests</p>
      </div>
    </div>
  );
}

function Frame1597881771() {
  return (
    <div className="absolute h-[129px] left-0 top-0 w-[927px]">
      <Breadcrumbs />
      <TextAndSupportingText />
    </div>
  );
}

function ButtonGroupBase() {
  return (
    <div className="bg-[#ebeef2] box-border content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[10px] relative shrink-0 z-[9]" data-name="_Button group base">
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[0px_1px_0px_0px] border-solid bottom-0 left-0 pointer-events-none right-[-0.5px] top-0" />
      <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#003883] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">Today’s Request</p>
      </div>
    </div>
  );
}

function ButtonGroupBase1() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[10px] relative shrink-0 z-[8]" data-name="_Button group base">
      <div aria-hidden="true" className="absolute border-[#d0d5dd] border-[0px_1px_0px_0px] border-solid bottom-0 left-0 pointer-events-none right-[-0.5px] top-0" />
      <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#344054] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">Historical Request</p>
      </div>
    </div>
  );
}

function ButtonGroup() {
  return (
    <div className="absolute left-0 rounded-[8px] top-0" data-name="Button group">
      <div className="content-stretch flex isolate items-start overflow-clip relative">
        <ButtonGroupBase />
        <ButtonGroupBase1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function TabsAndFilters() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[1089px]" data-name="Tabs and filters">
      <ButtonGroup />
    </div>
  );
}

function TabsAndFilters1() {
  return (
    <div className="absolute h-[40px] left-[20px] top-[146px] w-[1089px]" data-name="Tabs and filters">
      <TabsAndFilters />
    </div>
  );
}

function Plus() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="plus">
          <path d={svgPaths.p17eb400} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#003883] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="box-border content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[10px] relative">
        <Plus />
        <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
          <p className="leading-[24px] whitespace-pre">New Request</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#003883] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function Actions() {
  return (
    <div className="absolute content-stretch flex gap-[12px] items-center left-[962px] top-[55px]" data-name="Actions">
      <Button1 />
    </div>
  );
}

function SearchLg() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="search-lg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="search-lg">
          <path d={svgPaths.p22fdb270} id="Icon" stroke="var(--stroke-0, #667085)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Content() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <SearchLg />
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#667085] text-[16px] text-nowrap">
        <p className="leading-[24px] whitespace-pre">Search</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[14px] py-[10px] relative w-full">
          <Content />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#344054] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">Search</p>
      </div>
      <Input />
    </div>
  );
}

function InputDropdown() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[360px]" data-name="Input dropdown">
      <InputWithLabel />
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

function Input1() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[14px] py-[10px] relative w-full">
          <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#667085] text-[16px] text-nowrap">
            <p className="leading-[24px] whitespace-pre">Pending</p>
          </div>
          <ChevronDown />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel1() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#344054] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">Status</p>
      </div>
      <Input1 />
    </div>
  );
}

function InputDropdown1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Input dropdown">
      <InputWithLabel1 />
    </div>
  );
}

function Actions1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-[718px]" data-name="Actions">
      <InputDropdown />
      <InputDropdown1 />
    </div>
  );
}

function FiltersBar() {
  return (
    <div className="bg-gray-50 relative rounded-[12px] shrink-0 w-full" data-name="Filters bar">
      <div className="relative size-full">
        <div className="box-border content-stretch flex gap-[16px] items-start p-[20px] relative w-full">
          <Actions1 />
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[24px] grow items-start min-h-px min-w-px mr-[-36px] relative shrink-0" data-name="Container">
      <FiltersBar />
    </div>
  );
}

function Frame1597881758() {
  return (
    <div className="box-border content-stretch flex items-center pl-0 pr-[36px] py-0 relative shrink-0 w-full">
      <Container />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Container">
      <Frame1597881758 />
    </div>
  );
}

function TableHeader() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Table header">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#475467] text-[12px] text-nowrap">
        <p className="leading-[18px] whitespace-pre">S/N</p>
      </div>
    </div>
  );
}

function TableHeaderCell() {
  return (
    <div className="bg-gray-50 box-border content-stretch flex gap-[12px] h-[44px] items-center justify-center px-[24px] py-[12px] relative shrink-0 w-[76px]" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#eaecf0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableHeader />
    </div>
  );
}

function TableCell() {
  return (
    <div className="box-border content-stretch flex h-[72px] items-center justify-center px-[24px] py-[16px] relative shrink-0 w-[83px]" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#eaecf0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#475467] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">1</p>
      </div>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="box-border content-stretch flex h-[72px] items-center justify-center px-[24px] py-[16px] relative shrink-0 w-[83px]" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#eaecf0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#475467] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">2</p>
      </div>
    </div>
  );
}

function TableCell2() {
  return (
    <div className="box-border content-stretch flex h-[72px] items-center justify-center px-[24px] py-[16px] relative shrink-0 w-[83px]" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#eaecf0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#475467] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">3</p>
      </div>
    </div>
  );
}

function TableCell3() {
  return (
    <div className="box-border content-stretch flex h-[72px] items-center justify-center px-[24px] py-[16px] relative shrink-0 w-[83px]" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#eaecf0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#475467] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">4</p>
      </div>
    </div>
  );
}

function TableCell4() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#eaecf0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex h-[72px] items-center justify-center px-[24px] py-[16px] relative w-full">
          <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#475467] text-[14px] text-nowrap">
            <p className="leading-[20px] whitespace-pre">5</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[59px]" data-name="Column">
      <TableHeaderCell />
      <TableCell />
      <TableCell1 />
      <TableCell2 />
      <TableCell3 />
      <TableCell4 />
    </div>
  );
}

function TableHeader1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Table header">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#344054] text-[12px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">Customer Name</p>
      </div>
    </div>
  );
}

function TableHeaderCell1() {
  return (
    <div className="bg-gray-50 h-[44px] relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#eaecf0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[44px] items-center px-[24px] py-[12px] relative w-full">
          <TableHeader1 />
        </div>
      </div>
    </div>
  );
}

function TableCell5() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#eaecf0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex h-[72px] items-center px-[24px] py-[16px] relative w-full">
          <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#475467] text-[14px] text-nowrap">
            <p className="leading-[20px] whitespace-pre">Tolulope Olaleru</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[139px]" data-name="Column">
      <TableHeaderCell1 />
      {[...Array(5).keys()].map((_, i) => (
        <TableCell5 key={i} />
      ))}
    </div>
  );
}

function TableHeader2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Table header">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#344054] text-[12px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">Account Number</p>
      </div>
    </div>
  );
}

function TableHeaderCell2() {
  return (
    <div className="bg-gray-50 h-[44px] relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#eaecf0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[44px] items-center px-[24px] py-[12px] relative w-full">
          <TableHeader2 />
        </div>
      </div>
    </div>
  );
}

function TableCell10() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#eaecf0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex h-[72px] items-center px-[24px] py-[16px] relative w-full">
          <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#475467] text-[14px] text-nowrap">
            <p className="leading-[20px] whitespace-pre">1234567890</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[156px]" data-name="Column">
      <TableHeaderCell2 />
      {[...Array(5).keys()].map((_, i) => (
        <TableCell10 key={i} />
      ))}
    </div>
  );
}

function TableHeader3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Table header">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#344054] text-[12px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">Total Loan (₦)</p>
      </div>
    </div>
  );
}

function TableHeaderCell3() {
  return (
    <div className="bg-gray-50 h-[44px] relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#eaecf0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[44px] items-center px-[24px] py-[12px] relative w-full">
          <TableHeader3 />
        </div>
      </div>
    </div>
  );
}

function TableCell15() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#eaecf0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex h-[72px] items-center px-[24px] py-[16px] relative w-full">
          <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#475467] text-[14px] text-nowrap">
            <p className="leading-[20px] whitespace-pre">3,000,000</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableCell16() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#eaecf0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex h-[72px] items-center px-[24px] py-[16px] relative w-full">
          <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#475467] text-[14px] text-nowrap">
            <p className="leading-[20px] whitespace-pre">1,000,000</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableCell17() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#eaecf0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex h-[72px] items-center px-[24px] py-[16px] relative w-full">
          <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#475467] text-[14px] text-nowrap">
            <p className="leading-[20px] whitespace-pre">500,000</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableCell18() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#eaecf0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex h-[72px] items-center px-[24px] py-[16px] relative w-full">
          <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#475467] text-[14px] text-nowrap">
            <p className="leading-[20px] whitespace-pre">350,000</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableCell19() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#eaecf0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex h-[72px] items-center px-[24px] py-[16px] relative w-full">
          <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#475467] text-[14px] text-nowrap">
            <p className="leading-[20px] whitespace-pre">5,000,000</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[182px]" data-name="Column">
      <TableHeaderCell3 />
      <TableCell15 />
      <TableCell16 />
      <TableCell17 />
      <TableCell18 />
      <TableCell19 />
    </div>
  );
}

function TableHeader4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Table header">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#344054] text-[12px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">Approver</p>
      </div>
    </div>
  );
}

function TableHeaderCell4() {
  return (
    <div className="bg-gray-50 h-[44px] relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#eaecf0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[44px] items-center px-[24px] py-[12px] relative w-full">
          <TableHeader4 />
        </div>
      </div>
    </div>
  );
}

function TableCell20() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#eaecf0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex h-[72px] items-center justify-center px-[24px] py-[16px] relative w-full">
          <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#475467] text-[14px] text-nowrap">
            <p className="leading-[20px] whitespace-pre">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableCell21() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#eaecf0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex h-[72px] items-center justify-center px-[24px] py-[16px] relative w-full">
          <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#475467] text-[14px] text-nowrap">
            <p className="leading-[20px] whitespace-pre">__</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[158px]" data-name="Column">
      <TableHeaderCell4 />
      <TableCell20 />
      <TableCell21 />
      <TableCell20 />
      <TableCell20 />
      <TableCell20 />
    </div>
  );
}

function TableHeader5() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Table header">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#344054] text-[12px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">Date Submitted</p>
      </div>
    </div>
  );
}

function TableHeaderCell5() {
  return (
    <div className="bg-gray-50 h-[44px] relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#eaecf0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[44px] items-center px-[24px] py-[12px] relative w-full">
          <TableHeader5 />
        </div>
      </div>
    </div>
  );
}

function TableCell25() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#eaecf0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex h-[72px] items-center px-[24px] py-[16px] relative w-full">
          <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#475467] text-[14px] text-nowrap">
            <p className="leading-[20px] whitespace-pre">12/12/25</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[134px]" data-name="Column">
      <TableHeaderCell5 />
      {[...Array(5).keys()].map((_, i) => (
        <TableCell25 key={i} />
      ))}
    </div>
  );
}

function TableHeader6() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Table header">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#475467] text-[12px] text-nowrap">
        <p className="leading-[18px] whitespace-pre">Status</p>
      </div>
    </div>
  );
}

function TableHeaderCell6() {
  return (
    <div className="bg-gray-50 h-[44px] relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#eaecf0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[44px] items-center justify-center px-[24px] py-[12px] relative w-full">
          <TableHeader6 />
        </div>
      </div>
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-[rgba(255,189,24,0.1)] box-border content-stretch flex items-center mix-blend-multiply px-[8px] py-[2px] relative rounded-[16px] shrink-0" data-name="Badge">
      <div aria-hidden="true" className="absolute border border-[#ffbd18] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#ffbd18] text-[12px] text-center text-nowrap">
        <p className="leading-[18px] whitespace-pre">Pending</p>
      </div>
    </div>
  );
}

function TableCell30() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#eaecf0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex h-[72px] items-center justify-center px-[24px] py-[16px] relative w-full">
          <Badge />
        </div>
      </div>
    </div>
  );
}

function Column6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[100px]" data-name="Column">
      <TableHeaderCell6 />
      {[...Array(5).keys()].map((_, i) => (
        <TableCell30 key={i} />
      ))}
    </div>
  );
}

function HelpIcon() {
  return <div className="shrink-0 size-[16px]" data-name="Help icon" />;
}

function TableHeader7() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Table header">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#475467] text-[12px] text-nowrap">
        <p className="leading-[18px] whitespace-pre">Action</p>
      </div>
      <HelpIcon />
    </div>
  );
}

function TableHeaderCell7() {
  return (
    <div className="bg-gray-50 h-[44px] relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden="true" className="absolute border-[#eaecf0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[44px] items-center px-[24px] py-[12px] relative w-full">
          <TableHeader7 />
        </div>
      </div>
    </div>
  );
}

function DotsVertical() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="dots-vertical">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="dots-vertical">
          <g id="Icon">
            <path d={svgPaths.p39a1e780} stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p11974af0} stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p133c1580} stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Dropdown() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Dropdown">
      <DotsVertical />
    </div>
  );
}

function TableCell35() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#eaecf0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[72px] items-center px-[24px] py-[16px] relative w-full">
          <Dropdown />
        </div>
      </div>
    </div>
  );
}

function Column7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[164px]" data-name="Column">
      <TableHeaderCell7 />
      {[...Array(5).keys()].map((_, i) => (
        <TableCell35 key={i} />
      ))}
    </div>
  );
}

function Content1() {
  return (
    <div className="bg-white content-stretch flex items-start relative shrink-0 w-full" data-name="Content">
      <Column />
      <Column1 />
      <Column2 />
      <Column3 />
      <Column4 />
      <Column5 />
      <Column6 />
      <Column7 />
    </div>
  );
}

function ArrowLeft() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="arrow-left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="arrow-left">
          <path d={svgPaths.p11678e00} id="Icon" stroke="var(--stroke-0, #344054)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0" data-name="Button">
      <div className="box-border content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[14px] py-[8px] relative">
        <ArrowLeft />
        <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#344054] text-[14px] text-nowrap">
          <p className="leading-[20px] whitespace-pre">Previous</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function Content2() {
  return (
    <div className="absolute box-border content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#1d2939] text-[14px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">1</p>
      </div>
    </div>
  );
}

function PaginationNumberBase() {
  return (
    <div className="bg-gray-50 overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content2 />
    </div>
  );
}

function Content3() {
  return (
    <div className="absolute box-border content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#475467] text-[14px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">2</p>
      </div>
    </div>
  );
}

function PaginationNumberBase1() {
  return (
    <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content3 />
    </div>
  );
}

function Content4() {
  return (
    <div className="absolute box-border content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#475467] text-[14px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">3</p>
      </div>
    </div>
  );
}

function PaginationNumberBase2() {
  return (
    <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content4 />
    </div>
  );
}

function Content5() {
  return (
    <div className="absolute box-border content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#475467] text-[14px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">...</p>
      </div>
    </div>
  );
}

function PaginationNumberBase3() {
  return (
    <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content5 />
    </div>
  );
}

function Content6() {
  return (
    <div className="absolute box-border content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#475467] text-[14px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">8</p>
      </div>
    </div>
  );
}

function PaginationNumberBase4() {
  return (
    <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content6 />
    </div>
  );
}

function Content7() {
  return (
    <div className="absolute box-border content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#475467] text-[14px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">9</p>
      </div>
    </div>
  );
}

function PaginationNumberBase5() {
  return (
    <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content7 />
    </div>
  );
}

function Content8() {
  return (
    <div className="absolute box-border content-stretch flex items-center justify-center left-0 p-[12px] rounded-[8px] size-[40px] top-0" data-name="Content">
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#475467] text-[14px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">10</p>
      </div>
    </div>
  );
}

function PaginationNumberBase6() {
  return (
    <div className="overflow-clip relative rounded-[8px] shrink-0 size-[40px]" data-name="_Pagination number base">
      <Content8 />
    </div>
  );
}

function PaginationNumbers() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0" data-name="Pagination numbers">
      <PaginationNumberBase />
      <PaginationNumberBase1 />
      <PaginationNumberBase2 />
      <PaginationNumberBase3 />
      <PaginationNumberBase4 />
      <PaginationNumberBase5 />
      <PaginationNumberBase6 />
    </div>
  );
}

function ArrowRight() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="arrow-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="arrow-right">
          <path d={svgPaths.p3b6ad300} id="Icon" stroke="var(--stroke-0, #344054)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0" data-name="Button">
      <div className="box-border content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[14px] py-[8px] relative">
        <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#344054] text-[14px] text-nowrap">
          <p className="leading-[20px] whitespace-pre">Next</p>
        </div>
        <ArrowRight />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function Pagination() {
  return (
    <div className="relative shrink-0 w-full" data-name="Pagination">
      <div aria-hidden="true" className="absolute border-[#eaecf0] border-[1px_0px_0px] border-solid bottom-0 left-0 pointer-events-none right-0 top-[-1px]" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-between pb-[16px] pt-[12px] px-[24px] relative w-full">
          <Button2 />
          <PaginationNumbers />
          <Button3 />
        </div>
      </div>
    </div>
  );
}

function Table() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-[1091px]" data-name="Table">
      <div className="content-stretch flex flex-col items-start overflow-clip relative w-[1091px]">
        <Content1 />
        <Pagination />
      </div>
      <div aria-hidden="true" className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)]" />
    </div>
  );
}

function Frame1597881657() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[13px] top-[222px] w-[1091px]">
      <Container1 />
      <Table />
    </div>
  );
}

function Group1000001568() {
  return (
    <div className="absolute contents left-[13px] top-[222px]">
      <Frame1597881657 />
    </div>
  );
}

export default function Group1000001576() {
  return (
    <div className="relative size-full">
      <Frame1597881771 />
      <TabsAndFilters1 />
      <Actions />
      <Group1000001568 />
    </div>
  );
}