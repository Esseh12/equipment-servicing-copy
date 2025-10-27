import { ReactNode, useState } from 'react';
import { Menu, X } from 'lucide-react';
// import accessLogo from 'figma:asset/3ebf5c44175bf36c1eceb7236d272904dfc164a1.png';

interface ServiceCentralLayoutProps {
	children: ReactNode;
	sidebarContent?: ReactNode;
	headerContent?: ReactNode;
}

export function ServiceCentralLayout({
	children,
	sidebarContent,
	headerContent,
}: ServiceCentralLayoutProps) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<div className='h-screen flex bg-white overflow-hidden'>
			{/* Mobile Sidebar Overlay */}
			{isMobileMenuOpen && (
				<div className='fixed inset-0 z-50 lg:hidden'>
					<div
						className='fixed inset-0 bg-black/50'
						onClick={() => setIsMobileMenuOpen(false)}
					/>
					<div className='fixed left-0 top-0 h-full w-[280px] bg-white border-r border-[#d0d5dd] overflow-y-auto'>
						<div className='flex items-center justify-between p-4 border-b border-[#d0d5dd]'>
							<img
								src='/'
								alt='Access Bank'
								className='h-8'
							/>
							<button
								onClick={() => setIsMobileMenuOpen(false)}
								className='p-2'>
								<X className='h-5 w-5' />
							</button>
						</div>
						{sidebarContent}
					</div>
				</div>
			)}

			{/* Desktop Sidebar */}
			{sidebarContent && (
				<div className='bg-white border-r border-[#d0d5dd] h-full overflow-y-auto shrink-0 w-[290px] hidden lg:block'>
					{sidebarContent}
				</div>
			)}

			{/* Main Content */}
			<div className='flex flex-col flex-1 h-full min-w-0'>
				{/* Header */}
				<div className='bg-white border-b border-[#d0d5dd] h-[65px] shrink-0 flex items-center justify-between px-4 lg:px-6'>
					{/* Mobile Menu Button & Logo */}
					<div className='flex items-center gap-4 lg:hidden'>
						<button
							onClick={() => setIsMobileMenuOpen(true)}
							className='p-2 -ml-2'>
							<Menu className='h-5 w-5' />
						</button>
						<img
							src='/'
							alt='Access Bank'
							className='h-8'
						/>
					</div>

					{/* Header content */}
					<div className='flex-1 lg:flex-none'>{headerContent}</div>
				</div>

				{/* Content Area */}
				<div className='flex-1 overflow-y-auto'>{children}</div>
			</div>
		</div>
	);
}
