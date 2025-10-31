import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Header from '@/app/components/shared/Header';

async function getUser() {
	// const cookieStore = cookies();
	// const userCookie = cookieStore.get('user');
	// if (!userCookie) {
	// 	return null;
	// }
	// try {
	// 	const user = JSON.parse(userCookie.value);
	// 	return user.role === 'hop' ? user : null;
	// } catch {
	// 	return null;
	// }
}

export default async function HOPLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await getUser();

	return (
		<div className='min-h-screen bg-[#f8f9fa]'>
			<Header
			// user={user}
			// role='hop'
			/>
			<main>{children}</main>
		</div>
	);
}
