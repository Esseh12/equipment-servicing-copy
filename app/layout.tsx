import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import SessionProviderWrapper from './components/SessionProviderWrapper';
// import AuthWrapper from './components/AuthWrapper';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Equipment Servicing System',
	description: 'Manage equipment servicing requests',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<SessionProviderWrapper>
				<body className={inter.className}>
					{children}
					<Toaster position='top-right' />
				</body>
				{/* <AuthWrapper>
				
				</AuthWrapper> */}
			</SessionProviderWrapper>
		</html>
	);
}
