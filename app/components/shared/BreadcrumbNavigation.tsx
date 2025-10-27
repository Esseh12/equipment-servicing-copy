import { Home, ChevronRight } from 'lucide-react';
import type { BreadcrumbItem, Screen } from '../../App';

interface BreadcrumbNavigationProps {
  breadcrumbs?: BreadcrumbItem[];
  items?: BreadcrumbItem[];
  onBreadcrumbClick?: (screen: Screen) => void;
  onItemClick?: (screen: Screen) => void;
}

export function BreadcrumbNavigation({ breadcrumbs, items, onBreadcrumbClick, onItemClick }: BreadcrumbNavigationProps) {
  const breadcrumbsData = breadcrumbs || items || [];
  const handleClick = onBreadcrumbClick || onItemClick;
  return (
    <div className="flex gap-[12px] items-center mb-4 lg:mb-6">
      <div className="flex items-center gap-[12px]">
        <Home className="h-[20px] w-[20px] text-[#667085]" />
        
        {breadcrumbsData.map((breadcrumb, index) => (
          <div key={`${breadcrumb.screen}-${index}`} className="flex items-center gap-[12px]">
            <ChevronRight className="h-[16px] w-[16px] text-[#d0d5dd]" />
            
            {breadcrumb.isClickable && handleClick ? (
              <button
                onClick={() => handleClick(breadcrumb.screen)}
                className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[14px] text-[#667085] leading-[20px] hover:text-[#003883] transition-colors cursor-pointer"
              >
                {breadcrumb.label}
              </button>
            ) : (
              <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[14px] text-[#003883] leading-[20px]">
                {breadcrumb.label}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}